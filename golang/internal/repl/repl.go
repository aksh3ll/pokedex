package repl

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
    "strings"
	"github.com/aksh3ll/pokedex/internal/command"
)

func cleanInput(text string) []string {
	re_space_split := regexp.MustCompile(`\s+`)
	temp := strings.ToLower(strings.TrimSpace(text))
	if temp == "" {
		return []string{}
	}
	split := re_space_split.Split(temp, -1)
	return split
}

func REPL(config *command.Config) {
	scanner := bufio.NewScanner(os.Stdin)
	for {
		fmt.Print("Pokedex > ")
		if scanner.Scan() {
			line := scanner.Text()
			words := cleanInput(line)
			if len(words) == 0 {
				fmt.Println("No command entered.")
				continue
			}
			command := config.Commands[words[0]]
			if command.Callback != nil {
				err := command.Callback(config, words[1:])
				if err != nil {
					fmt.Println("Error executing command:", err)
				}
			} else {
				fmt.Println("Unknown command:", words[0])
			}
		}
	}
}
