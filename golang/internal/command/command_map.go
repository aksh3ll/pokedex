package command

import (
	"fmt"
	"github.com/aksh3ll/pokedex/internal/pokedexApi"
)


func commandMap(direction string, config *Config) error {
	var url string
	if direction == "next" {
		if config.MapNext == "" {
			config.MapNext = "https://pokeapi.co/api/v2/location-area/?offset=0&limit=20"
		}
		url = config.MapNext
	} else if direction == "back" {
		if config.MapPrevious == "" {
			return nil
		}
		url = config.MapPrevious
	}

	pagedArea, err := pokedexApi.GetApi[pokedexApi.PagedArea](config.Cache, url)
	if err != nil {
		return err
	}
	printPagedArea(pagedArea)
	config.MapNext = pagedArea.Next
	config.MapPrevious = pagedArea.Previous

	return nil
}

func commandMapForward(config *Config, parameters []string) error {
	return commandMap("next", config)
}

func commandMapBackward(config *Config, parameters []string) error {
	return commandMap("back", config)
}

func printPagedArea(pagedArea *pokedexApi.PagedArea) {
	for _, area := range pagedArea.Results {
		fmt.Println(area.Name)
	}
}
