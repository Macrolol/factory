import { json } from '@sveltejs/kit';
import { validate } from '$lib/server/auth.js';


export async function POST({ request, params, cookies }) {
	const { input } = await request.json();
	const { id } = params;
	if (!validate(cookies)) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	
}
