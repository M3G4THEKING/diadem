import type { ShinyRateRequest, ShinyRateResponse } from "@/lib/server/api/queries";
import TTLCache from "@isaacs/ttlcache";
import { SHINY_RATE_CACHE_DURATION } from "@/lib/constants";

const shinyCache: TTLCache<string, ShinyRateResponse | undefined> = new TTLCache({
	max: 2000,
	ttl: SHINY_RATE_CACHE_DURATION
});

export async function getShinyRate(
	pokemonId: number,
	formId: number
): Promise<ShinyRateResponse | undefined> {
	const cacheKey = `${pokemonId}-${formId}`;
	const cacheValue = shinyCache.get(cacheKey);
	if (cacheValue) return cacheValue;

	const body: ShinyRateRequest = { pokemonId, formId };
	const response = await fetch("/api/shiny-rate", { method: "POST", body: JSON.stringify(body) });
	const data = await response.json();

	if (data.error) {
		console.error(data.error);
		return undefined;
	}

	const result = data.result[0];
	shinyCache.set(cacheKey, result);
	return result;
}

export function getCachedShinyRate(pokemonId: number, formId: number): ShinyRateResponse | undefined | false {
	const cacheKey = `${pokemonId}-${formId}`;
	const cacheValue = shinyCache.get(cacheKey);
	if (!cacheValue) return false;
	return cacheValue
}
