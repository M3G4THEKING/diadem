import type { MasterFile } from '@/lib/types/masterfile';
import { getUserSettings } from '@/lib/userSettings.svelte';

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
