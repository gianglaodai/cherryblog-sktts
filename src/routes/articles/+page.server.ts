import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data: articles, error } = await supabase
		.from('posts')
		.select('id, slug, content, created_at, updated_at')
		.order('created_at', { ascending: false });
	if (error) {
		console.error('Cannot get articles', error);
		return { articles: [] };
	}
	return { articles };
};

export const actions: Actions = {
	delete: async ({ request, locals: { supabase } }) => {
		const form = await request.formData();
		const id = form.get('id');
		if (!id) {
			throw error(400, 'Invalid request');
		}

		const { error: deleteError } = await supabase.from('posts').delete().eq('id', id);

		if (deleteError) {
			throw error(500, 'Internal server error');
		}
		throw redirect(303, '/articles');
	}
};
