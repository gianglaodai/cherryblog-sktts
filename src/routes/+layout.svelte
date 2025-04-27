<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';

	let { data, children } = $props();
	let { session, supabase, user } = $derived(data);
	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});

	function getFirstPath(pathname: string) {
		const segments = pathname.split('/').filter(Boolean);
		return segments.length > 0 ? '/' + segments[0] : '/';
	}

	let firstPath = $derived(getFirstPath(page.url.pathname));
</script>

<header>
	<nav class="mb-10 px-9 py-8 shadow-[0_0_2em_rgba(0,0,0,0.1)] sm:mx-0">
		<div class="flex items-center justify-between">
			<ul
				class="flex flex-1 flex-row flex-wrap justify-around space-y-2 text-xl *:cursor-pointer *:items-center *:font-bold
			*:underline *:decoration-2 *:underline-offset-4 *:hover:text-black *:hover:no-underline
			sm:justify-center sm:space-x-6">
				<li class={cn('text-orange-600', { '*:decoration-4': firstPath === '/' })}>
					<a href="/" class="block">HOME</a>
				</li>
				<li class={cn('text-blue-700', { '*:decoration-4': firstPath === '/articles' })}>
					<a href="/articles" class="block">ARTICLES</a>
				</li>
				<li class={cn('text-pink-600', { '*:decoration-4': firstPath === '/about' })}>
					<a href="/about" class="block">ABOUT ME</a>
				</li>
				<li class={cn('text-teal-700', { '*:decoration-4': firstPath === '/contact' })}>
					<a href="/contact" class="block">CONTACT</a>
				</li>
			</ul>
			{#if user}
				<form method="POST" action="/logout">
					<Button type="submit" class="ml-4 rounded-full bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
						>Logout</Button>
				</form>
			{/if}
		</div>
	</nav>
</header>
<main class="mt-20">
	{@render children()}
</main>
<footer class="pt-10">
	<div class="mt-10 border-t py-10 md:text-center">© 2024 Cherry's Blog. All rights reserved.</div>
</footer>
