import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const generated=JSON.parse(readFileSync('dist/server/wrangler.json','utf8'));
const production=JSON.parse(readFileSync('deploy/cloudflare.json','utf8'));
const revision=process.env.SOURCE_REVISION || execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
if(!/^[a-f0-9]{40}$/.test(revision)) throw Error('Expected a full Git commit SHA');
// Keep the framework's generated module and static-asset configuration.
// A separate file leaves the Sites preview build and its database unchanged.
const config={...generated,...production,vars:{...generated.vars,SOURCE_REVISION:revision},observability:{enabled:true,head_sampling_rate:0.1}};
delete config.topLevelName;
writeFileSync('dist/server/wrangler.production.json',JSON.stringify(config,null,2)+'\n');
console.log(`Prepared Cloudflare deployment for ${revision}`);
