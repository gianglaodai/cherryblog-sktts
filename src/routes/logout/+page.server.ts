import { type Actions, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ locals }) => {
		await locals.supabase.auth.signOut();
		throw redirect(303, '/');
	}
};
