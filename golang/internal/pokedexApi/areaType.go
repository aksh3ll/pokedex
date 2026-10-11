package pokedexApi

type Link struct {
	Name string `json:"name"`
	Url  string `json:"url"`
}

type EncounterMethodRate struct {
	EncounterMethod Link           `json:"encounter_method"`
	VersionDetails []VersionDetail `json:"version_details"`
}

type VersionDetail struct {
	Rate    int  `json:"rate"`
	Version Link `json:"version"`
}

type Name struct {
	Name     string `json:"name"`
	Language Link   `json:"language"`
}

type PokemonEncounter struct {
	Pokemon        Link            `json:"pokemon"`
	VersionDetails []VersionDetail `json:"version_details"`
}

type Area struct {
	ID   int      `json:"id"`
	Name string   `json:"name"`
	GameIndex int `json:"game_index"`
	EncounterMethodRates []EncounterMethodRate `json:"encounter_method_rates"`
	Location Link `json:"location"`
	Names []Name `json:"names"`
	PokemonEncounters []PokemonEncounter `json:"pokemon_encounters"`
}

type PagedArea struct {
	Count    int    `json:"count"`
	Next     string `json:"next"`
	Previous string `json:"previous"`
	Results  []Area `json:"results"`
}
