<script lang="ts">
	import RichTextViewer from '$lib/richtext/RichTextViewer.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { goto } from '$lib/utils';

	let value = `
## My experience attending at CSS Day 2024
I’ve written and rewritten this post about five times now. This version seems to be the one to finally stick, though it’s taken a bit of a different direction than I was originally planning. In it, I talk about my experience attending CSS Day, both as an attendee, which was the original plan, but also as a well-known figure.

[Last week, I posted about my experience speaking at CSS Day 2024](#)

**The _best_ part about being a speaker, though, was finally being able to attend CSS Day!**
	`;
	let value2 = `
## My experience attending at CSS Day 2024
So, it’s been a minute (or like, 3 years...) since I last posted something here, and it probably will be a while before I post again to be honest. This post turned out to be way too long to include as the introduction to my newsletter, so I broke it off here.

I’ll have a follow-up at one point about my experience attending it as well: [my recent experience at CSS Day 2024](#).
	`;
</script>

<h1 class="text-title leading-none font-black text-blue-700">My Articles</h1>
<div class="articles">
	<article
		class="prose prose-lg dark:prose-invert prose-h2:text-5xl prose-h2:font-bold
	prose-h2:text-neutral-600 prose-p:text-xl prose-a:text-blue-500 max-w-full">
		{#key value}
			<RichTextViewer {value} />
		{/key}
		<Button variant="default" onclick={goto('/articles/slug-content')} size="lg" class="rounded-full text-lg shadow-lg"
			>READ MORE</Button>
		<Button variant="destructive" size="lg" class="rounded-full text-lg shadow-lg">DELETE</Button>
	</article>

	<!-- Article 2 -->
	<article class="prose prose-lg dark:prose-invert prose-a:text-blue-500 mb-12 max-w-full">
		<RichTextViewer value={value2} />
		<Button variant="default" onclick={goto('/articles/slug-content')}>READ MORE</Button>
		<Button variant="destructive">DELETE</Button>
	</article>
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
