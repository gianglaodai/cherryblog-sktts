<script lang="ts">
	import RichTextEditor from '$lib/richtext/RichTextEditor.svelte';
	import { supabase } from '$lib/supabaseClient.js';

	const { data } = $props();
	let article = $state(data.article);

	async function onSave(content: string) {
		const { data, error } = await supabase
			.from('posts')
			.upsert({ ...article, content })
			.select();
		if (error) {
			console.error(error);
			return;
		}
		article = data[0];
	}
</script>

<article class="mb-12 h-full">
	<RichTextEditor bind:value={article.content} submit={onSave} />
</article>
