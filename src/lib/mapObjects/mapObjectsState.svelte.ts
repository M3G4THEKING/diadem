import type { MapData, MapObjectType } from "@/lib/types/mapObjectData/mapObjects";
import { makeMapObject } from "@/lib/mapObjects/makeMapObject";
import { getDirectLinkObject } from '@/lib/features/directLinks.svelte';
import { getMap } from '@/lib/map/map.svelte';
import { Coords } from '@/lib/utils/coordinates';
import { getCurrentSelectedData } from '@/lib/mapObjects/currentSelectedState.svelte';

export type MapObjectsStateType = {
	[key: string]: MapData;
};

let mapObjectsState: MapObjectsStateType = $state({});

export function getMapObjects() {
	return mapObjectsState;
}

export function addMapObjects(mapObjects: MapData[], type: MapObjectType) {
	const newState: MapObjectsStateType = {};
	for (let data of mapObjects) {
		data = makeMapObject(data, type)
		newState[data.mapId] = data;
	}
	mapObjectsState = { ...mapObjectsState, ...newState };
}

export function delMapObject(key: string) {
	delete mapObjectsState[key];
}

export function clearMapObjects(type: MapObjectType) {
	for (const key in getMapObjects()) {
		// skip selected data
		if (getCurrentSelectedData()?.mapId === key) continue

		if (key.startsWith(type + "-")) {
			delMapObject(key);
		}
	}
}

export function clearAllMapObjects() {
	mapObjectsState = {};
}