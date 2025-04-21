<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	onMount(async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.log(error);
		}
		window.location.href = '/';
	});
</script>
