import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { slug } = params;
	if (!locals.user) {
		throw redirect(303, '/');
	}
	const { data, error: fetchError } = await locals.supabase.from('posts').select('*').eq('slug', slug).single();
	if (fetchError || !data) {
		throw error(404, 'Not found');
	}
	return {
		article: data
	};
};

export const actions: Actions = {
	default: async ({ request, params, locals: { supabase } }) => {
		const { slug } = params;
		const formData = await request.formData();
		const content = formData.get('content') as string;
		const { data: existing } = await supabase.from('posts').select('*').eq('slug', slug).single();
		if (!existing) {
			throw error(404, 'Not found');
		}

		const { error: updateError } = await supabase
			.from('posts')
			.update({
				content,
				updated_at: new Date().toISOString()
			})
			.eq('id', existing.id);

		if (updateError) {
			console.error(updateError);
			return fail(500, { error: 'Internal server error' });
		}
		throw redirect(303, `/articles/${slug}`);
	}
};
