import { database } from '@/db/raw';
import { games } from '@/lib/games';

const reply = (body: unknown, status = 200) => Response.json(body, {status, headers:{'Cache-Control':'no-store'}});
export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin || origin !== new URL(request.url).origin) return reply({error:'Please send feedback from SourceHearth.'},403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply({error:'Expected a feedback form.'},415);
  // Bound the body while streaming, including requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply({error:'Feedback is required.'},400);
  let raw = ''; let bytes = 0;
  const decoder = new TextDecoder();
  while (true) {
    const {done,value} = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > 12000) {await reader.cancel(); return reply({error:'Feedback is too long.'},413);}
    raw += decoder.decode(value,{stream:true});
  }
  raw += decoder.decode();
  let data: unknown;
  try {data = JSON.parse(raw);} catch {return reply({error:'Invalid feedback.'},400);}
  if (!data || typeof data !== 'object' || Array.isArray(data)) return reply({error:'Invalid feedback.'},400);
  const {gameId,name,text} = data as Record<string,unknown>;
  if (typeof gameId !== 'string' || !games.some(g=>g.id===gameId)) return reply({error:'Game not found.'},404);
  if (typeof text !== 'string' || text.trim().length<3 || text.length>2000) return reply({error:'Write between 3 and 2,000 characters.'},400);
  if (name !== undefined && (typeof name !== 'string' || name.length>60)) return reply({error:'Names must be 60 characters or fewer.'},400);
  try {
    const now = Date.now();
    // Daily digest for short-window abuse control; raw visitor addresses are never saved.
    const identity = `${new URL(request.url).hostname}|${Math.floor(now/86400000)}|${request.headers.get('cf-connecting-ip') || 'local'}`;
    const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(identity))),x=>x.toString(16).padStart(2,'0')).join('');
    // One atomic statement prevents simultaneous requests bypassing the per-minute limit.
    const result = await database().prepare(`INSERT INTO feedback (id, game_id, name, body, status, created_at, visitor_hash)
      SELECT ?, ?, ?, ?, 'pending', ?, ?
      WHERE (SELECT COUNT(*) FROM feedback WHERE visitor_hash = ? AND created_at > ?) < 3`)
      .bind(crypto.randomUUID(),gameId,typeof name==='string'&&name.trim()?name.trim():'Anonymous',text.trim(),now,hash,hash,now-60000).run();
    if (!result.meta.changes) return reply({error:'Please wait a minute before sending more feedback.'},429);
    return reply({saved:true},201);
  } catch {return reply({error:'Feedback could not be saved. Please try again shortly.'},503);}
}
