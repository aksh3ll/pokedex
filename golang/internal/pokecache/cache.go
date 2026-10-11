package pokecache

import (
	"sync"
	"time"
)

// I used a Cache struct to hold a map[string]cacheEntry and a mutex to protect the map across goroutines.
type Cache struct {
	// mutex to protect the map across goroutines.
	mu sync.Mutex
	entries map[string]cacheEntry
	ticker *time.Ticker

}

type cacheEntry struct {
	createdAt time.Time // A time.Time that represents when the entry was created.
	val       []byte    // A []byte that represents the cached value.
}

func NewCache(interval time.Duration) *Cache {
	c := &Cache{
		entries: make(map[string]cacheEntry),
		ticker: time.NewTicker(interval),
	}
	go func() {
		c.reapLoop(interval)
	}()
	return c
}

func (c *Cache) Add(key string, value []byte) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.entries[key] = cacheEntry{
		createdAt: time.Now(),
		val:       value,
	}
}

func (c *Cache) Get(key string) ([]byte, bool) {
	c.mu.Lock()
	defer c.mu.Unlock()
	entry, exists := c.entries[key]
	if !exists {
		return nil, false
	}
	return entry.val, true
}

func (c *Cache) reapLoop(interval time.Duration) {
	// Implement the logic for periodically cleaning up expired cache entries here.
	for range c.ticker.C {
		c.mu.Lock()
		for key, entry := range c.entries {
			if time.Since(entry.createdAt) > interval {
				delete(c.entries, key)
			}
		}
		c.mu.Unlock()
	}
}

func (c *Cache) Close() {
	c.ticker.Stop()
	c.mu.Lock()
	defer c.mu.Unlock()
	c.entries = make(map[string]cacheEntry)
}
