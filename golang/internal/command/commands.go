package command

import (
	"github.com/aksh3ll/pokedex/internal/pokecache"
	"github.com/aksh3ll/pokedex/internal/pokedexApi"
)

type Config struct {
	// Add any configuration fields you need here
	Commands   map[string]CliCommand
	MapNext    string
	MapPrevious string
	Cache      *pokecache.Cache
	Pokedex    map[string]pokedexApi.Pokemon
}

type CliCommand struct {
	Name        string
	Description string
	Callback    func(*Config, []string) error
}

func GetCommands() map[string]CliCommand {
    return map[string]CliCommand{
		"exit": {
			Name:        "exit",
			Description: "Exit the Pokedex",
			Callback:    commandExit,
		},
		"help": {
			Name:        "help",
			Description: "Display available commands",
			Callback:    commandHelp,
		},
		"map": {
			Name:        "map",
			Description: "Display the names of 20 next location areas in the Pokemon world",
			Callback:    commandMapForward,
		},
		"mapb": {
			Name:        "mapb",
			Description: "Display the names of 20 previous location areas in the Pokemon world",
			Callback:    commandMapBackward,
		},
		"explore": {
			Name:        "explore",
			Description: "List all pokemons from a specific location area by ID",
			Callback:    commandExplore,
		},
		"catch": {
			Name:        "catch",
			Description: "Catch a specific Pokemon by ID",
			Callback:    commandCatch,
		},
		"inspect": {
			Name:        "inspect",
			Description: "Inspect a specific Pokemon by ID",
			Callback:    commandInspect,
		},
		"pokedex": {
			Name:        "pokedex",
			Description: "Display all caught Pokemon",
			Callback:    commandPokedex,
		},
    }
}
