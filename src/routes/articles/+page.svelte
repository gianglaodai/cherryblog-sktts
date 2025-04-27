<script lang="ts">
	import RichTextViewer from '$lib/richtext/RichTextViewer.svelte';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$lib/utils';
	import { onMount } from 'svelte';

	const { data } = $props();
	const { articles, user } = $derived(data);

	onMount(() => {
		console.log(user);
	});

	function confirmDelete({ cancel }) {
		const confirmed = confirm('Are you sure you want to delete this post?');
		if (!confirmed) {
			cancel();
			return;
		}
	}
</script>

<div class="mx-auto max-w-5xl">
	<h1 class="text-title leading-none font-black text-blue-700">My Articles</h1>
	<Button onclick={goto('/articles/new')}>New Post</Button>
	<div class="articles">
		{#each articles as article (article.id)}
			{#key article.id}
				<article
					class="prose prose-lg dark:prose-invert prose-h2:text-5xl prose-h2:font-bold
	prose-h2:text-neutral-600 prose-p:text-xl prose-a:text-blue-500 max-w-full">
					<RichTextViewer value={article.content} />
					<div class="flex flex-col gap-2 sm:flex-row">
						<Button
							variant="default"
							onclick={goto('/articles/' + article.slug)}
							size="lg"
							class="w-full rounded-full text-lg shadow-lg sm:w-fit"
							>READ MORE
						</Button>
						{#if user}
							<form method="POST" action="?/delete" use:enhance={confirmDelete}>
								<input type="hidden" name="id" value={article.id} />
								<Button
									variant="destructive"
									size="lg"
									class="w-full rounded-full text-lg shadow-lg sm:w-fit"
									type="submit"
									>DELETE
								</Button>
							</form>
						{/if}
					</div>
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
