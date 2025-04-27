import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, locals }) => {
	const { slug } = params;
	const { data, error: fetchError } = await locals.supabase.from('posts').select('*').eq('slug', slug).single();
	if (fetchError || !data) {
		throw error(404, 'Not found');
	}
	return {
		article: data
	};
};
