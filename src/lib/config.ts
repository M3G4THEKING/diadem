import type { ClientConfig } from '@/lib/types/config';

let config: ClientConfig

export function setConfig(newConfig: ClientConfig) {
	console.log(newConfig)
	config = newConfig
}

export function getConfig() {
	return config
}
