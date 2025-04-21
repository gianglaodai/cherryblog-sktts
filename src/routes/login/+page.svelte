<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { onMount } from 'svelte';

	onMount(async () => {
		const {
			data: { session }
		} = await supabase.auth.getSession();
		if (session) {
			window.location.href = '/articles';
		}
	});
	let mail: string;
	let password: string;

	async function signInWithEmail() {
		const { error } = await supabase.auth.signInWithPassword({ email: mail, password: password });
		if (error) {
			console.log(error);
		}
	}
</script>

<div>
	<form onsubmit={signInWithEmail}>
		<input type="text" placeholder="Username" name="username" bind:value={mail} />
		<input type="password" placeholder="Password" name="password" bind:value={password} />
		<button type="submit">Login</button>
	</form>
</div>
