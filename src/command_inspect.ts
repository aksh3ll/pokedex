import { State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string) {
    const pokemon = state.pokedex[pokemonName];
    if (pokemon) {
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Weight: ${pokemon.weight}`);
        console.log('Stats:');
        for (const stat of pokemon.stats) {
            console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
        }
        console.log('Types:');
        for (const type of pokemon.types) {
            console.log(`  -${type.type.name}`);
        }
    } else {
        console.log(`${pokemon} is not present in your pokedex or does not exists.`);
    }
}