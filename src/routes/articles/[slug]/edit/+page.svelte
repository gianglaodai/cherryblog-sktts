<script lang="ts">
	import RichTextEditor from '$lib/richtext/RichTextEditor.svelte';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';

	const { data } = $props();
	let article = $state(data.article);
</script>

<article class="mb-12 h-full">
	<form method="POST" use:enhance>
		<RichTextEditor bind:value={article.content} />
		<Button type="submit">Save</Button>
	</form>
</article>
