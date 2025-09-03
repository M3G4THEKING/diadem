import { defineConfig } from 'drizzle-kit';
import { getInternalDbUri } from './src/lib/services/config/configNode.server';

export default defineConfig({
	schema: './src/lib/server/db/internal/schema.ts',
	dialect: 'mysql',
	dbCredentials: { url: getInternalDbUri() },
	verbose: true,
	strict: true
});
