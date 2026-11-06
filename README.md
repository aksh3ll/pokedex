# Pokedex

A command-line Pokedex, built as part of the boot.dev "Build a Pokedex" courses, in both [Go](https://www.boot.dev/courses/build-pokedex-cli-golang) and [TypeScript](https://www.boot.dev/courses/build-pokedex-cli-typescript).

## Concept

This project is an interactive REPL (Read-Eval-Print Loop) that runs in your terminal and works like a Pokedex. In the Pokemon universe, a Pokedex is a fictional gadget for looking up details about Pokemon, such as their name, types and base stats. You don't need to know anything about Pokemon to use it.

All the data comes from [PokéAPI](https://pokeapi.co/), a free public REST API, which the app queries with simple HTTP `GET` requests. Responses are kept in an in-memory cache, so a page you've already visited loads instantly the second time.

In the REPL you can:

- browse the location areas of the Pokemon world, page by page
- explore an area to see which Pokemon live there
- try to catch a Pokemon (catching isn't guaranteed)
- inspect the Pokemon you've caught (height, weight, stats, types)
- list everything in your Pokedex

## Commands

| Command             | Description                                        |
| ------------------- | -------------------------------------------------- |
| `help`              | List all available commands                        |
| `map`               | Show the next 20 location areas                    |
| `mapb`              | Show the previous 20 location areas                |
| `explore <area>`    | List the Pokemon found in a location area          |
| `catch <pokemon>`   | Try to catch a Pokemon                             |
| `inspect <pokemon>` | Show the details of a Pokemon you have caught      |
| `pokedex`           | List all the Pokemon you have caught               |
| `exit`              | Quit the Pokedex                                   |

Example session:

```
Pokedex > map
Pokedex > explore pastoria-city-area
Pokedex > catch pikachu
Pokedex > inspect pikachu
Pokedex > pokedex
Pokedex > exit
```

## Implementations

The project has been written twice, in two separate folders that offer the same features.

### Go (`golang/`)

Course: [Build a Pokedex in Go](https://www.boot.dev/courses/build-pokedex-cli-golang)

Requires Go 1.27 or later.

```sh
cd golang
go run .
```

You can also build a binary and run it:

```sh
cd golang
go build -o pokedex
./pokedex
```

Run the tests:

```sh
cd golang
go test ./...
```

### TypeScript (`typescript/`)

Course: [Build a Pokedex in TypeScript](https://www.boot.dev/courses/build-pokedex-cli-typescript)

Requires Node.js 22 (the exact version is pinned in `typescript/.nvmrc`, so `nvm use` selects it).

```sh
cd typescript
nvm use        # optional, if you use nvm
npm install
npm run dev    # compiles with tsc, then starts the REPL
```

Other scripts:

| Script          | What it does                                        |
| --------------- | --------------------------------------------------- |
| `npm run build` | Compile the TypeScript sources into `dist/`         |
| `npm start`     | Run the already compiled app (`dist/main.js`)       |
| `npm test`      | Run the test suite with Vitest                      |
| `npm run log`   | Compile, run, and save the session to `repl.log`    |
