import { parse } from 'toml';
import type { Config, DbCreds } from '@/lib/types/config';
import configFile from '@/lib/server/config.toml?raw'

const config: Config = parse(configFile);

export function getServerConfig() {
	return config.server;
}

export function getClientConfig() {
	return config.client
}

export function getDbUri(creds: DbCreds) {
	return `mysql://${creds.user}:${creds.password}@${creds.host}:${creds.port}/${creds.database}`;
}
