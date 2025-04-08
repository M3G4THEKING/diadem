import type { MasterFile } from '@/lib/types/masterfile';
import { getUserSettings } from '@/lib/userSettings.svelte';
import * as m from "@/lib/paraglide/messages"
import type { PokemonData } from '@/lib/types/mapObjectData/pokemon';

const url = "https://raw.githubusercontent.com/WatWowMap/pogo-translations/refs/heads/master/static/locales/{}.json"

let remoteLocales: { [key: string]: { [key: string]: string } } = {}

export async function loadRemoteLocale(languageTag: string) {
	if (Object.keys(remoteLocales).includes(languageTag)) return

	const result = await fetch(url.replaceAll("{}", languageTag))
	console.log(url.replaceAll("{}", languageTag))
	const data = await result.json()
	remoteLocales[languageTag] = data
}

export function ingame(key: string): string {
	let locale = remoteLocales[getUserSettings().languageTag]

	if (!locale) {
		const allRemoteLocales = Object.values(remoteLocales)

		if (allRemoteLocales) {
			locale = allRemoteLocales[0]
		} else {
			return ""
		}
	}

	return locale[key] ?? ""
}

export function pokemonName(data: Partial<PokemonData>) {
	if (!data.pokemon_id) return m.unknown_pokemon()

	let key = "poke_" + data.pokemon_id
	if (data.temp_evolution_id) key += "_e" + data.temp_evolution_id

	let name = ingame(key)
	if (!name) return m.unknown_pokemon()

	if (data.shiny) name += " ✨"

	const formName = data.form ? ingame("form_" + data.form) : ""
	if (formName && formName !== ingame("form_29")) name += " (" + formName + ")"

	return name
}
