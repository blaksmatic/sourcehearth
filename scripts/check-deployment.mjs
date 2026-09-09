import { setTimeout } from 'node:timers/promises';
const url=process.env.SITE_URL || 'https://sourcehearth.com';
const expected=process.env.SOURCE_REVISION;
if(!expected) throw Error('SOURCE_REVISION is required');
let lastError;
let healthy=false;
for(let i=0;i<18;i++){
 try {
  const r=await fetch(`${url}/api/health`,{signal:AbortSignal.timeout(10000),cache:'no-store'});
  const data=await r.json();
  if(!r.ok||data.status!=='ok'||data.revision!==expected)throw Error(`Health returned ${r.status}; revision ${data.revision}`);
  const homepage=await fetch(url,{signal:AbortSignal.timeout(10000)});
  if(!homepage.ok)throw Error(`Homepage returned ${homepage.status}`);
  console.log(`Verified homepage, D1, and revision ${expected} at ${url}`);healthy=true;break;
 }catch(error){lastError=error;console.log(`Waiting for deployment (${i+1}/18)`);if(i<17)await setTimeout(10000);}
}
if(!healthy)throw lastError;
