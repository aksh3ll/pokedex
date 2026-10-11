package command

import "fmt"

func commandHelp(config *Config, parameters []string) error {
	commands := GetCommands()
	fmt.Println("Available commands:")
	for _, command := range commands {
		fmt.Printf("  %s: %s\n", command.Name, command.Description)
	}
	return nil
}