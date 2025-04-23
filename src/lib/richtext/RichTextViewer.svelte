<script lang="ts">
	import { Carta, Markdown } from 'carta-md';
	import { underline } from '$lib/richtext/underline';

	let { value = $bindable() } = $props<{ value?: string }>();

	const carta = new Carta({
		sanitizer: false,
		extensions: [underline()]
	});
</script>

{#key value}
	<Markdown {carta} {value} />
{/key}
