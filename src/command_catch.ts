import { State } from "./state.js";

export async function commandCatch(state: State, pokemonName: string) {
    try {
        console.log(`Throwing a Pokeball at ${pokemonName}...`);
        const pokemon = state.pokeApi.fetchPokemon(pokemonName);
        // Simulate catching the Pokemon with a random chance
        // Base experience varie from 0 to 255, so we can use it to determine the catch rate
        const pokemonData = await pokemon;
        const catchRate = 0.5 + pokemonData.base_experience / 512; // Adjust catch rate based on base experience
        const catched: boolean = Math.random() < catchRate;
        if (catched) {
            console.log(`${pokemonName} was caught!`);
            state.pokedex[pokemonName] = pokemonData;
        } else {
            console.log(`${pokemonName} escaped!`);
        }
    } catch (error) {
        if (error instanceof Error && error.message.includes("Not Found")) {
            console.log(`Pokémon '${pokemonName}' not found.`);
            return;
        }
        console.error(`Error catching Pokémon:`, error);
    }
}
