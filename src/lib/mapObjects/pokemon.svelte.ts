import { addMapObject, delMapObject, getMapObjects } from '@/lib/mapObjects/mapObjects.svelte.js';
import maplibre, {type LngLatBounds} from 'maplibre-gl';
import { getNormalizedBounds } from '@/lib/mapObjects/utils';

export async function updatePokemon(map: maplibre.Map, removeOld: boolean = true) {
	const body = getNormalizedBounds(map)
	const response = await fetch("/api/pokemon", { method: "POST",  body: JSON.stringify(body)})
	const data = await response.json()

	if (removeOld) {
		for (const key in getMapObjects()) {
			if (key.startsWith("pokemon-")) {
				delMapObject(key)
			}
		}
	}

	for (const pokemon of data) {
		pokemon.type = "pokemon"
		pokemon.mapId = "pokemon-" + pokemon.id
		addMapObject(pokemon.mapId, pokemon)
	}
}