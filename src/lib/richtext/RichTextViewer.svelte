<script lang="ts">
	import type { PageProps } from './$types';
	import { Carta, Markdown } from 'carta-md';
	import { underline } from '$lib/richtext/underline';

	let { value = $bindable() }: PageProps = $props();

	const carta = new Carta({
		sanitizer: false,
		extensions: [underline()]
	});
</script>

<Markdown {carta} {value} />
