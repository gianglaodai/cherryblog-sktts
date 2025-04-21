<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';
	let { children } = $props();
	function getFirstPath(pathname: string) {
		const segments = pathname.split('/').filter(Boolean);
		return segments.length > 0 ? '/' + segments[0] : '/';
	}
	let firstPath = $derived(getFirstPath(page.url.pathname));
</script>

<header>
	<nav class="mb-10 px-9 py-8 shadow-[0_0_2em_rgba(0,0,0,0.1)] sm:mx-0">
		<ul
			class="flex flex-row flex-wrap justify-around space-y-2 text-xl *:cursor-pointer *:items-center *:font-bold
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
	</nav>
</header>
<main class="mt-20">
	{@render children()}
</main>
<footer class="pt-10">
	<div class="mt-10 border-t py-10 md:text-center">© 2024 Cherry's Blog. All rights reserved.</div>
</footer>
