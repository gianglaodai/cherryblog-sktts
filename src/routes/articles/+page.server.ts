import type { PageServerLoad } from './$types';

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
