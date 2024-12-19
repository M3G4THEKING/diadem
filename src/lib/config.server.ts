import {parse} from "toml"
import {readFile} from 'node:fs/promises'
import type {Config} from '@/lib/types/config';

let config: Config

async function readName(name: string){
	return await readFile(name, "utf-8")
}

export async function readConfig() {
	let rawToml: string

	try {
		rawToml = await readName("config.toml")
	} catch(e) {
		console.error("Please copy config.example.toml to config.toml! Starting with default config")
		rawToml = await readName("config.example.toml")
	}

	config = parse(rawToml)
	return config.client
}

export function getServerConfig() {
	return config.server
}
