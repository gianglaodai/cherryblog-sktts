import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { SupabaseClient } from '@supabase/supabase-js';

export const load: PageServerLoad = async ({ locals: { user } }) => {
	if (!user) {
		throw redirect(303, '/');
	}
};

function extractTitle(content: string): string | null {
	const line = content.split('\n').find((line) => line.startsWith('## '));
	return line ? line.replace(/^##\s*/, '').trim() : null;
}

function slugify(title: string): string {
	return title
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '') // normalize vietnamese
		.toLowerCase()
		.replace(/[^a-z0-9-]/g, '-') // replace symbol character by -
		.replace(/^-+|-+$/g, ''); // remove - from start and end
}

async function generateUniqueSlug(baseSlug: string, supabase: SupabaseClient) {
	let slug = baseSlug;
	let suffix = 1;
	while (true) {
		const { data } = await supabase.from('posts').select('slug').eq('slug', slug).maybeSingle();
		if (!data) break;
		slug = baseSlug + '-' + suffix++;
	}
	return slug;
}

export const actions = {
	default: async ({ request, locals: { supabase, user } }) => {
		const formData = await request.formData();
		const content = formData.get('content') as string;
		if (!content) return fail(400, { error: 'Content is required' });
		const title = extractTitle(content);
		if (!title) return fail(400, { error: 'Title is required' });

		const slug = await generateUniqueSlug(slugify(title), supabase);

		if (!user?.id) return fail(401, { error: 'Unauthorized' });
		const { data, error } = await supabase.from('posts').insert({ content, slug, user_id: user.id }).select().single();
		if (error) {
			console.error(error);
			return fail(500, { error: 'Internal server error' });
		}
		throw redirect(303, `/articles/${data.slug}/edit`);
	}
} satisfies Actions;
