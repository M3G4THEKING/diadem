import { parse } from 'toml';
import type { Config } from '@/lib/types/config';
import { env } from '$env/dynamic/private';

let config: Config;

export async function readConfig() {
	let configFile;
	let read: ((asset: string) => Response) | undefined;
	let rawToml: string = '';

	try {
		const server = await import('$app/server');
		read = server.read;
	} catch (e) {
		rawToml = env.CONFIG_TOML ?? '';
	}

	if (read) {
		try {
			configFile = await import('./server/config.toml?raw');
		} catch (e) {
			console.error('Please copy config.example.toml to config.toml! Starting with default config');
			configFile = await import('./server/config.example.toml?raw');
		}

		rawToml = configFile.default;
	}

	config = parse(rawToml);
	return config.client;
}

export function getServerConfig() {
	return config.server;
}
