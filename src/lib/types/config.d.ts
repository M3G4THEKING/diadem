import type { MapObjectType } from '@/lib/types/mapObjectData/mapObjects';

export type UiconSet = {
	id: string
	name: string
	url: string
	use: MapObjectType[]
	scale: number
}

export type Area = {
	name: string
	center: number[]
	zoom: number
}

export type ClientConfig = {
	mapStyles: {
		id: string
		name: string
		url: string
	}[]
	uiconSets: UiconSet[]
	areas: Area[]
}

export type ServerConfig = {
	golbat: {
		url: string
		auth: string
	}
}

export type Config = {
	server: ServerConfig
	client: ClientConfig
}