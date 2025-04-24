import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;
	const { data, error: fetchError } = await supabase.from('posts').select('*').eq('slug', slug).single();
	if (fetchError || !data) {
		throw error(404, 'Not found');
	}
	return {
		article: data
	};
};
