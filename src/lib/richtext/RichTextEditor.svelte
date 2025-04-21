<script lang="ts">
	import { Carta, MarkdownEditor } from 'carta-md';
	import { onMount } from 'svelte';
	import './RichTextEditor.css';
	import Heading2Icon from '$lib/richtext/icons/Heading2Icon.svelte';
	import Heading1Icon from '$lib/richtext/icons/Heading1Icon.svelte';
	import Heading3Icon from '$lib/richtext/icons/Heading3Icon.svelte';
	import Heading4Icon from '$lib/richtext/icons/Heading4Icon.svelte';
	import Heading5Icon from '$lib/richtext/icons/Heading5Icon.svelte';
	import Heading6Icon from '$lib/richtext/icons/Heading6Icon.svelte';
	import BoldIcon from '$lib/richtext/icons/BoldIcon.svelte';
	import ItalicIcon from '$lib/richtext/icons/ItalicIcon.svelte';
	import StrikethroughIcon from '$lib/richtext/icons/StrikethroughIcon.svelte';
	import UnderlineIcon from '$lib/richtext/icons/UnderlineIcon.svelte';
	import { underline } from '$lib/richtext/underline';
	import ImageIcon from '$lib/richtext/icons/ImageIcon.svelte';

	const carta = new Carta({
		sanitizer: false,
		disableIcons: ['heading', 'bold', 'italic', 'strikethrough'],
		extensions: [
			{
				icons: [
					{
						id: 'heading-1',
						action: (input) => input.toggleLinePrefix('#'),
						label: 'Heading 1',
						component: Heading1Icon
					},
					{
						id: 'heading-2',
						action: (input) => input.toggleLinePrefix('##'),
						label: 'Heading 2',
						component: Heading2Icon
					},
					{
						id: 'heading-3',
						action: (input) => input.toggleLinePrefix('###'),
						label: 'Heading 3',
						component: Heading3Icon
					},
					{
						id: 'heading-4',
						action: (input) => input.toggleLinePrefix('####'),
						label: 'Heading 4',
						component: Heading4Icon
					},
					{
						id: 'heading-5',
						action: (input) => input.toggleLinePrefix('#####'),
						label: 'Heading 5',
						component: Heading5Icon
					},
					{
						id: 'heading-6',
						action: (input) => input.toggleLinePrefix('######'),
						label: 'Heading 6',
						component: Heading6Icon
					},
					{
						id: 'bold',
						action: (input) => input.toggleSelectionSurrounding('**'),
						label: 'Bold',
						component: BoldIcon
					},
					{
						id: 'italic',
						action: (input) => input.toggleSelectionSurrounding('*'),
						label: 'Italic',
						component: ItalicIcon
					},
					{
						id: 'strikethrough',
						action: (input) => input.toggleSelectionSurrounding('~~'),
						label: 'Strikethrough',
						component: StrikethroughIcon
					},
					{
						id: 'underline',
						action: (input) => input.toggleSelectionSurrounding('++'),
						label: 'Underline',
						component: UnderlineIcon
					},
					{
						id: 'image',
						action: (input) => {
							input.toggleSelectionSurrounding(['![', ']']);
							const position = input.getSelection().end + 1;
							input.insertAt(position, '(url)');
							input.textarea.setSelectionRange(position + 1, position + 4);
						},
						label: 'Image',
						component: ImageIcon
					}
				]
			},
			underline()
		]
	});
	let { value = $bindable() } = $props();
	let wrapperEl: HTMLDivElement;
	onMount(() => {
		const renderer = wrapperEl.querySelector('.carta-renderer');
		if (renderer && !renderer.classList.contains('prose')) {
			renderer.classList.add('prose', 'prose-lg', 'dark:prose-invert', 'prose-a:text-blue-500', 'max-w-full');
		}
	});
</script>

<div bind:this={wrapperEl}>
	<MarkdownEditor {carta} mode="tabs" bind:value theme="cherry" />
</div>

<style>
	@reference 'tailwindcss';
	:global(.carta-font-code) {
		font-family: '...', monospace;
		font-size: 1.1rem;
		line-height: 1.1rem;
		letter-spacing: normal;
		@apply caret-black;
	}
</style>
