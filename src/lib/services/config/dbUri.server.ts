import type { DbCreds } from '@/lib/services/config/config';

export function getDbUri(creds: DbCreds) {
	return `mysql://${creds.user}:${creds.password}@${creds.host}:${creds.port}/${creds.database}`;
}