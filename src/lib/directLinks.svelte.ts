import type { MapObjectType } from '@/lib/types/mapObjectData/mapObjects';

type DirectLinkCoordnates = {
	lat: number | undefined
	lon: number | undefined
}
type DirectLinkObject = {
	type: MapObjectType
	id: string
}

let directLinkCoordinates: DirectLinkCoordnates | undefined = $state(undefined)
let directLinkObject: DirectLinkObject | undefined = $state(undefined)

export function getDirectLinkCoordinates() {
	return directLinkCoordinates
}

export function getDirectLinkObject() {
	return directLinkObject
}

export function setDirectLinkCoordinates(data: DirectLinkCoordnates | undefined) {
	directLinkCoordinates = data
}

export function setDirectLinkObject(data: DirectLinkObject | undefined) {
	directLinkObject = data
}