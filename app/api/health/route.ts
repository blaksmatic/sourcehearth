import { env } from 'cloudflare:workers';
import { database } from '@/db/raw';
export async function GET() {
 try {
  await database().prepare('SELECT id FROM feedback LIMIT 1').all();
  return Response.json({status:'ok',revision:env.SOURCE_REVISION || 'preview'}, {headers:{'Cache-Control':'no-store'}});
 } catch {
  return Response.json({status:'unavailable'}, {status:503,headers:{'Cache-Control':'no-store'}});
 }
}
