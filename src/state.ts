import { createInterface, type Interface } from "readline";
import { commandExit } from './command_exit.js';
import { PokeAPI, Pokemon } from "./pokeapi.js";
import { getCommandMap } from "./command_map.js";
import { Cache } from "./pokecache.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";

export type CallbackType = (state: State, ...args: string[]) => Promise<void>;

export type CLICommand = {
  name: string;
  description: string;
  callback: CallbackType;
};

export type State = {
  rl: Interface;
  pokeApi: PokeAPI;
  pokedex: Record<string, Pokemon>;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  commands: Record<string, CLICommand>;
}

export function getCommands(): Record<string, CLICommand> {
  return {
    catch: {
      name: "catch",
      description: "Catches a Pokemon",
      callback: async (state, ...args: string[]) => {
        if (args === null || !Array.isArray(args) || args.length == 0) {
          console.log("the name of the pokemon to catch is mandatory.")
          return;
        }
        const pokemonName: string = args[0].trim();
        await commandCatch(state, pokemonName);
      }
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    explore: {
      name: "explore",
      description: "Explore the location",
      callback: async (state, ...args: string[]) => {
        if (args === null || !Array.isArray(args) || args.length == 0) {
          console.log("the area to explore is mandatory.")
          return;
        }
        const locationName: string = args[0].trim();
        await commandExplore(state, locationName);
      },
    },
    help: {
      name: "help",
      description: "Lists all available commands",
      callback: async (state) => {
        console.log("\nWelcome to the Pokedex!\n\nUsage:");
        for (const cmd in state.commands) {
          console.log(`- ${cmd}: ${state.commands[cmd].description}`);
        }
      },
    },
    inspect: {
      name: "inspect",
      description: "Inspect a Pokemon",
      callback: async (state, ...args: string[]) => {
        if (args === null || !Array.isArray(args) || args.length == 0) {
          console.log("the name of the pokemon to inspect is mandatory.")
          return;
        }
        const pokemonName: string = args[0].trim();
        await commandInspect(state, pokemonName);
      }
    },
    map: {
      name: "map",
      description: "Displays the map of the Pokemon world",
      callback: async (state) => {await getCommandMap(state, "next")},
    },
    mapb: {
      name: "mapb",
      description: "Displays the map of the Pokemon world (previous page)",
      callback: async (state) => {await getCommandMap(state, "previous")},
    },
    pokedex: {
      name: 'pokedex',
      description: 'Pokedex list all the pokemons you have catched',
      callback: async (state) => {
        console.log('Your Pokedex:');
        for (const pokemon in state.pokedex) {
          console.log(`  -${pokemon}`);
        }
      }
    }
  };
}

export function initState(cache: Cache) {
    return {
        rl: createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'Pokedex > '
        }),
        pokeApi: new PokeAPI(cache),
        pokedex: {},
        nextLocationsURL: null,
        prevLocationsURL: null,
        commands: getCommands()
    };
}
