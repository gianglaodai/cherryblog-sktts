<script>
	import RichTextViewer from '$lib/richtext/RichTextViewer.svelte';
	import RichTextEditor from '$lib/richtext/RichTextEditor.svelte';

	let article = $state({
		id: 1,
		uid: '1',
		slug: 'my-experience-attending-at-css-day-2024',
		content: `
## My experience attending at CSS Day 2024
I’ve written and rewritten this post about five times now. This version seems to be the one to finally stick, though it’s taken a bit of a different direction than I was originally planning. In it, I talk about my experience attending CSS Day, both as an attendee, which was the original plan, but also as a well-known figure.

[Last week, I posted about my experience speaking at CSS Day 2024](#)

**The _best_ part about being a speaker, though, was finally being able to attend CSS Day!**
`,
		meta_title: '',
		meta_description: '',
		created_at: new Date(),
		updated_at: new Date()
	});
</script>

<article
	class="prose prose-lg dark:prose-invert prose-h2:mt-0 prose-h2:text-title prose-h2:font-black
prose-h2:leading-none prose-h2:text-blue-700 prose-a:text-blue-500 max-w-full">
	<RichTextViewer value={article.content} />
</article>

<article class="mb-12">
	<RichTextEditor bind:value={article.content} />
</article>
