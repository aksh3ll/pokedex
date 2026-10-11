package main

import (
	"fmt"
	"time"

	"github.com/aksh3ll/pokedex/internal/command"
	"github.com/aksh3ll/pokedex/internal/repl"
	"github.com/aksh3ll/pokedex/internal/pokecache"
	"github.com/aksh3ll/pokedex/internal/pokedexApi"
)

func main() {
	config := &command.Config{
		Commands: command.GetCommands(),
		MapNext:    "",
		MapPrevious: "",
		Cache: pokecache.NewCache(5 * time.Second),
		Pokedex: make(map[string]pokedexApi.Pokemon),
	}
    fmt.Println("Welcome to the Pokedex!")
    repl.REPL(config)
}
