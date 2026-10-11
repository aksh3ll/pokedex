package pokedexApi

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/aksh3ll/pokedex/internal/pokecache"
)

func GetApi[T any](c *pokecache.Cache, url string) (*T, error) {
	body, ok := c.Get(url)
	if !ok {
		res, err := http.Get(url)
		if err != nil {
			return nil, err
		}
		body, err = io.ReadAll(res.Body)
		res.Body.Close()
		if res.StatusCode > 299 {
			return nil, fmt.Errorf("Response failed with status code: %d and\nbody: %s\n", res.StatusCode, body)
		}
		if err != nil {
			return nil, err
		}
	}

	var result T
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}
	if !ok {
		c.Add(url, body)
	}
	return &result, nil
}
