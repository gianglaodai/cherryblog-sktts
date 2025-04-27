<script lang="ts">
	import RichTextViewer from '$lib/richtext/RichTextViewer.svelte';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';

	const { data } = $props();
	let article = $state(data.article);
	let user = $derived(data.user);
	let metaTitle = $state('');
	let metaDescription = $state('');

	function extractMeta(content: string): { metaTitle: string; metaDescription: string } {
		const lines: string[] = content.split('\n');
		const titleLine = lines.find((line) => line.startsWith('## '));
		const metaTitle = titleLine ? titleLine.replace(/^##\s*/, '').trim() : '';
		const restLines = lines.filter((line) => line !== titleLine);
		const rawText = restLines
			.join(' ')
			.replace(/[#>*_\[\]()\-`]/g, '')
			.replace(/\s+/g, ' ')
			.trim();
		const metaDescription = rawText.length > 160 ? rawText.substring(0, 160) + '...' : rawText;
		return { metaTitle, metaDescription };
	}

	onMount(() => {
		const meta = extractMeta(article.content);
		metaTitle = meta.metaTitle;
		metaDescription = meta.metaDescription;
	});
</script>

<svelte:head>
	{#if metaTitle}
		<title>{metaTitle}</title>
		<meta name="description" content={metaDescription} />
	{/if}
</svelte:head>

<article
	class="prose prose-lg dark:prose-invert prose-h2:mt-0 prose-h2:text-title prose-h2:font-black
	prose-h2:leading-none prose-h2:text-blue-700 prose-a:text-blue-500 mx-auto max-w-5xl">
	<RichTextViewer value={article.content} />
	{#if user}
		<Button>Edit</Button>
	{/if}
</article>
