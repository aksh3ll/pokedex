package command

import (
	"fmt"
	"strings"
)

func commandInspect(config *Config, parameters []string) error {
	if parameters == nil || len(parameters) == 0 {
		return fmt.Errorf("no Pokemon ID provided")
	}
	pokemonName := strings.ToLower(parameters[0])

	pokemon, exists := config.Pokedex[pokemonName]
	if !exists {
		fmt.Printf("You have not caught that Pokemon.\n")
		return nil
	}

	fmt.Printf("Name: %s\n", pokemon.Name)
	fmt.Printf("Height: %d\n", pokemon.Height)
	fmt.Printf("Weight: %d\n", pokemon.Weight)
	fmt.Printf("Stats:\n")
	for _, stat := range pokemon.Stats {
		fmt.Printf("  -%s: %d\n", stat.Stat.Name, stat.BaseStat)
	}
	fmt.Printf("Types:\n")
	for _, t := range pokemon.Types {
		fmt.Printf("  -%s\n", t.Type.Name)
	}

	return nil
}
