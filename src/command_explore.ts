import { State } from "./state.js";

export async function commandExplore(state: State, locationName: string) {
    try {
        const location = await state.pokeApi.fetchLocation(locationName);
        if (!location) {
            console.log(`Location '${locationName}' not found.`);
            return;
        }
        console.log(`Exploring location: ${locationName}`);
        for (const loc of location.pokemon_encounters) {
            console.log(`- ${loc.pokemon.name}`);
        }
    } catch (error) {
        if (error instanceof Error && error.message.includes("Not Found")) {
            console.log(`Location '${locationName}' not found.`);
            return;
        }
        console.error(`Error fetching locations:`, error);
    }
}
