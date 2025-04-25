<script lang="ts">
	import RichTextEditor from '$lib/richtext/RichTextEditor.svelte';
	import { form } from '$app/forms';
	import { Button } from '$lib/components/ui/button';

	let content = $state('');
</script>

<article class="mb-12 h-full">
	<form method="POST" use:form>
		<input type="hidden" name="content" bind:value={content} />
		<RichTextEditor bind:value={content} submit={onSave} />
		<Button type="submit">Save</Button>
	</form>
</article>
