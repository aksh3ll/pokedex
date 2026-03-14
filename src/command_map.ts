import { State } from "./state.js";

export async function getCommandMap(state: State, direction: "next" | "previous") {
    const firstCommand = state.nextLocationsURL === null && state.prevLocationsURL === null;
    const url: string | null = direction === "next" ? state.nextLocationsURL : state.prevLocationsURL;
    if (!firstCommand && direction === "next" && url === null) {
        console.log("\nYou're on the last page.");
        return;
    }
    if (direction === "previous" && url === null) {
        console.log("\nYou're on the first page.");
        return;
    }
    try {
        const locations = await state.pokeApi.fetchLocations(url);
        state.nextLocationsURL = locations.next;
        state.prevLocationsURL = locations.previous;
        for (const loc of locations.results) {
            console.log(loc.name);
        }
    } catch (error) {
        console.error(`Error fetching locations:`, error);
    }
}

