import { Cache } from './pokecache.js';
import { test, expect, it } from "vitest";

test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 2));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});

it("Test that stopReapLoop works", async () => {
  const cache = new Cache(500); // 1/2 second
  const key: string = "Key1";
  const val: string = "data1";
  
  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  cache.stopReapLoop();
  await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1 second

  const stillCached = cache.get(key);
  expect(stillCached).toBe(val);
});


it("Test that cache works", async () => {
  const cache = new Cache(500); // 1/2 second
  const key: string = "Key1";
  const val: string = "data1";
  
  // add to cache
  cache.add(key, val);

  // wait a bit and check that it's still there
  await new Promise((resolve) => setTimeout(resolve, 250)); // wait half the interval
  expect(cache.get(key)).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, 500)); // wait the full interval
  expect(cache.get(key)).toBe(null);
});
