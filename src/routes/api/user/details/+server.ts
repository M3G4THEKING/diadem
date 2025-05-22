import { json } from '@sveltejs/kit';
import { getUserInfo } from '@/lib/server/auth/discordDetails';
import type { UserData } from '@/lib/user/userDetails.svelte';

export async function GET({ locals }) {
	if (!locals.user) return json({});

	const data = await getUserInfo(locals.session.discordToken);
	return json({
		details: data,
		permissions: locals.user.permissions
	} as UserData);
}
