<script lang="ts">
	import RichTextViewer from '$lib/richtext/RichTextViewer.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$lib/utils';

	const { data } = $props();
	const articles = data.articles;
</script>

<div class="mx-auto max-w-5xl">
	<h1 class="text-title leading-none font-black text-blue-700">My Articles</h1>
	<div class="articles">
		{#each articles as article (article.id)}
			{#key article.id}
				<article
					class="prose prose-lg dark:prose-invert prose-h2:text-5xl prose-h2:font-bold
	prose-h2:text-neutral-600 prose-p:text-xl prose-a:text-blue-500 max-w-full">
					<RichTextViewer value={article.content} />
					<Button
						variant="default"
						onclick={goto('/articles/' + article.slug)}
						size="lg"
						class="rounded-full text-lg shadow-lg"
						>READ MORE
					</Button>
					<Button variant="destructive" size="lg" class="rounded-full text-lg shadow-lg">DELETE</Button>
				</article>
			{/key}
		{/each}
	</div>
</div>

<style lang="postcss">
	@reference 'tailwindcss';

	.articles > article:first-of-type {
		@apply mt-20;
	}

	.articles > article:not(:last-child) {
		@apply mt-3;
	}

	.articles > article:not(:last-child)::after {
		@apply relative top-0 right-0 bottom-0 left-0 my-24 block border-b-2 border-solid border-b-neutral-300;
		content: '';
	}
</style>
