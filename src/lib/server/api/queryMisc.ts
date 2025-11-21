import type { Bounds } from '@/lib/mapObjects/mapBounds';
import type { FilterStation } from '@/lib/features/filters/filters';
import { query } from '@/lib/server/db/external/internalQuery';
import type { ShinyRateResponse } from '@/lib/server/api/queries';

export async function queryShinyRate(pokemonId: number, formId: number) {
	// TODO: timeframe

	return await query<ShinyRateResponse>(
		"SELECT SUM(count) as shinies, SUM(total) as total, COUNT(*) as days " +
		"FROM pokemon_shiny_stats " +
		"WHERE pokemon_id = ? " +
		"AND form_id = ? " +
		"AND fence = 'world'",
		[pokemonId, formId]
	);
}