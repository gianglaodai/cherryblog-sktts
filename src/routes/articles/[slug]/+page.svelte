<script lang="ts">
	import RichTextViewer from '$lib/richtext/RichTextViewer.svelte';
	import RichTextEditor from '$lib/richtext/RichTextEditor.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	export let data;
	let article = $state(data.article);
	let isEditing = $state(true);
	let metaTitle = $state('');
	let metaDescription = $state('');

	async function onSave(content: string) {
		const { data, error } = await supabase.from('posts').upsert({...article, content}).select();
		if(error){
			console.error(error);
			return;
		}
		article = data[0];

		const meta = extractMeta(article);
		metaTitle = meta.metaTitle;
		metaDescription = meta.metaDescription;
	}

	function extractMeta(content: string): { metaTitle: string, metaDescription: string } {
		const lines: string[] = content.split('\n');
		const titleLine = lines.find(line => line.startsWith('## '));
		const metaTitle = titleLine ? titleLine.replace(/^##\s*/, '').trim() : '';
		const restLines = lines.filter(line => line !== titleLine);
		const rawText = restLines.join(' ')
			.replace(/[#>*_\[\]()\-`]/g, '')
			.replace(/\s+/g, ' ')
			.trim();
		const metaDescription = rawText.length > 160
			? rawText.substring(0, 160) + '...'
			: rawText;
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


{#if isEditing}
	<article class="mb-12 h-full">
		<RichTextEditor bind:value={article.content} submit={onSave} />
	</article>
{:else}
	<article
		class="prose prose-lg dark:prose-invert prose-h2:mt-0 prose-h2:text-title prose-h2:font-black
	prose-h2:leading-none prose-h2:text-blue-700 prose-a:text-blue-500 max-w-full">
		<RichTextViewer value={article.content} />
	</article>
{/if}

