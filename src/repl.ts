import { CLICommand, State } from './state.js';


export function cleanInput(input: string): string[] {
  return input.trim().split(/\s+/).filter(line => line.length > 0).map(line => line.toLowerCase());
}

export function startREPL(state: State) {
  state.rl.on('line', async (input: string) => {
    const args = cleanInput(input);
    if (args.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = args[0];
    const command = state.commands[commandName];

    if (command) {
      try {
        await command.callback(state, ...args.slice(1));
      } catch (error) {
        console.error(`Error executing command '${commandName}':`, error);
      }
    } else {
      console.log(`Unknown command: ${commandName}`);
    }

    state.rl.prompt();
  });
  state.rl.prompt();
}
