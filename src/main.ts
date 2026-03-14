// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { State, initState } from "./state.js";
import { Cache } from './pokecache.js';

function main() {
  const cache: Cache = new Cache(1000 * 60 * 60); // 1 hour
  const state: State = initState(cache);
  startREPL(state);
}

main();
