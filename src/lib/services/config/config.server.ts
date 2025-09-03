import { parse } from 'toml';
import type { Config } from '@/lib/services/config/config';
import configFile from '@/lib/server/config.toml?raw';

const config: Config = parse(configFile);

export function getServerConfig() {
	return config.server;
}

export function getClientConfig() {
	return config.client;
}

export function isAuthRequired() {
	return config.server.auth.enabled && !config.server.auth.optional
}