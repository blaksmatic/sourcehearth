import { readdirSync, readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const ids=new Set();
const https=(value)=>{try{return new URL(value).protocol==='https:'}catch{return false}};
for(const file of readdirSync('games').filter(f=>f.endsWith('.json'))){
 const g=JSON.parse(readFileSync(`games/${file}`,'utf8'));
 for(const k of ['id','title','description','creator','model','art']) assert.equal(typeof g[k],'string',`${file}: ${k} is required`);
 assert.match(g.id,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);assert.equal(file,`${g.id}.json`);assert(!ids.has(g.id),'Duplicate game ID');ids.add(g.id);
 assert(https(g.playUrl)&&https(g.repoUrl),`${file}: HTTPS play and source URLs required`);
 assert(Array.isArray(g.tags)&&g.tags.length>0&&g.tags.every(t=>typeof t==='string'),`${file}: tags required`);
 if(g.image){assert.match(g.image,/^\/images\/[a-zA-Z0-9_/-]+\.(png|jpg|jpeg|webp|avif)$/);assert(!g.image.includes('..'));assert(existsSync(`public${g.image}`),`${file}: missing cover`);}
 assert(Array.isArray(g.releases),`${file}: releases required`);
 let previous=Infinity;const versions=new Set();
 for(const r of g.releases){assert(typeof r.version==='string'&&r.version.length>0);assert(!versions.has(r.version),'Duplicate release');versions.add(r.version);assert(typeof r.title==='string');assert(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/.test(r.timestamp)&&Number.isFinite(Date.parse(r.timestamp)));assert(Date.parse(r.timestamp)<=previous,'Newest release must be first');previous=Date.parse(r.timestamp);if(r.sourceUrl)assert(https(r.sourceUrl));assert(Array.isArray(r.changes)&&r.changes.length>0);for(const c of r.changes){assert(['Added','Changed','Fixed'].includes(c.type));assert(typeof c.text==='string'&&c.text.length>0);}}
 console.log(`Valid: ${g.id}`);
}
assert(ids.size>0,'At least one game required');
