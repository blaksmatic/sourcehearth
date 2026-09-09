/// <reference types="vite/client" />
export type GameRelease = { version:string; timestamp:string; title:string; sourceUrl?:string; changes:{type:'Added'|'Changed'|'Fixed';text:string}[] };
export type Game = { id:string; title:string; description:string; creator:string; tags:string[]; model:string; art:string; image?:string; playUrl:string; repoUrl:string; releases:GameRelease[] };
export const games = Object.values(import.meta.glob<Game>('../games/*.json', {eager:true, import:'default'})).sort((a,b)=>Date.parse(b.releases[0]?.timestamp||'1970-01-01')-Date.parse(a.releases[0]?.timestamp||'1970-01-01'));
