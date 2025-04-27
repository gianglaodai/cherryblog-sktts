<script lang="ts">
	const { data, children } = $props();
	const { user } = $derived(data);
</script>

{#if $user}
	{@render children()}
{/if}
