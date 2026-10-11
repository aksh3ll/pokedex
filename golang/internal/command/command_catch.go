package command

import (
	"fmt"
	"math/rand"
	"strings"
	"github.com/aksh3ll/pokedex/internal/pokedexApi"
)

func commandCatch(config *Config, parameters []string) error {
	if parameters == nil || len(parameters) == 0 {
		return fmt.Errorf("no Pokemon ID provided")
	}
	pokemonName := strings.ToLower(parameters[0])
	fmt.Printf("Throwing a Pokeball at %s...\n", pokemonName)
	url := fmt.Sprintf("https://pokeapi.co/api/v2/pokemon/%s/", pokemonName)
	pokemon, err := pokedexApi.GetApi[pokedexApi.Pokemon](config.Cache, url)
	if err != nil {
		return err
	}
	catchRate := 0.5 + float64(pokemon.BaseExperience)/512.0 // Adjust catch rate based on base experience
	catched := (rand.Float64() < catchRate)
	if catched {
		fmt.Printf("%s was caught!\n", pokemon.Name)
		if _, exists := config.Pokedex[pokemon.Name]; exists {
			fmt.Printf("%s is already in your Pokedex.\n", pokemon.Name)
		}
		config.Pokedex[pokemon.Name] = *pokemon
	} else {
		fmt.Printf("%s escaped!\n", pokemon.Name)
	}
	return nil
}
