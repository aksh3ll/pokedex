package command

import (
	"fmt"
)

func commandPokedex(config *Config, parameters []string) error {
	if len(config.Pokedex) == 0 {
		fmt.Printf("You have not caught any Pokemon yet.\n")
		return nil
	}

	fmt.Printf("Your Pokedex:\n")
	for _, pokemon := range config.Pokedex {
		fmt.Printf(" - %s\n", pokemon.Name)
	}

	return nil
}
