import { getServerConfig } from '@/lib/services/config/config.server';

function getHeaders() {
	const headers: HeadersInit = {}
	if (getServerConfig().dragonite.secret) {
		headers['X-Dragonite-Admin-Secret'] = getServerConfig().dragonite.secret ?? ""
	}
	if (getServerConfig().dragonite.basicAuth) {
		headers['Authorization'] = `Basic ${btoa(getServerConfig().dragonite.basicAuth ?? '')}`;
	}
	return headers
}

export async function addScoutEntries(username: string, locations: number[][]) {
	const url = new URL("scout/v2", getServerConfig().dragonite.url)

	const requestData = {
		username,
		locations,
		options: {
			routes: true,
			showcases: true,
			pokemon: true,
			gmf: true
		}
	}

	const response = await fetch(url, { headers: getHeaders(), method: "POST", body: JSON.stringify(requestData) })

	return response.ok
}

export async function getScoutQueue(): Promise<number | undefined> {
	const url = new URL("scout/queue", getServerConfig().dragonite.url)
	const response = await fetch(url, { headers: getHeaders() })

	if (response.ok) {
		const data = await response.json()
		return data?.queue ?? undefined
	}
}
