export type GameRelease = { version:string; timestamp:string; title:string; changes:{type:'Added'|'Changed'|'Fixed';text:string}[] };
export type Game = { id:string; title:string; description:string; tags:string[]; model:string; art:string; playUrl:string|null; repoUrl:string|null; releases:GameRelease[] };
// Replace these clearly labelled concepts with reviewed community submissions.
export const games: Game[] = [
 {id:'little-orbit',title:'Little Orbit',description:'A small explorer. A strange planet. Take the scenic route.',tags:['Exploration','3D'],model:'AI concept',art:'orbit',playUrl:null,repoUrl:null,releases:[]},
 {id:'one-more',title:'One More',description:'Find your rhythm in a tiny, one-button arcade concept.',tags:['Arcade','One-shot'],model:'AI concept',art:'tempo',playUrl:null,repoUrl:null,releases:[]},
 {id:'quiet-loops',title:'Quiet Loops',description:'Connect the pieces. Untangle your thoughts.',tags:['Puzzle','One-shot'],model:'AI concept',art:'loops',playUrl:null,repoUrl:null,releases:[]}
];
