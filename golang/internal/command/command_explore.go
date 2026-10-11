package command

import (
	"fmt"
	"github.com/aksh3ll/pokedex/internal/pokedexApi"
)

func commandExplore(config *Config, parameters []string) error {
	if parameters == nil || len(parameters) == 0 {
		return fmt.Errorf("no area ID provided")
	}
	url := fmt.Sprintf("https://pokeapi.co/api/v2/location-area/%s/", parameters[0])
	area, err := pokedexApi.GetApi[pokedexApi.Area](config.Cache, url)
	if err != nil {
		return err
	}
	printPokemonInArea(area)
	return nil
}

func printPokemonInArea(area *pokedexApi.Area) {
	for _, encounter := range area.PokemonEncounters {
		fmt.Println(encounter.Pokemon.Name)
	}
}
