<span class="strike text-lg">S</span>

<style>
	@reference 'tailwindcss';
	.strike {
		@apply relative inline-block;
	}

	.strike::after {
		content: '';
		@apply absolute top-1/2 right-0 left-0 h-[1px] bg-red-600;
		transform: translateY(-50%);
	}
</style>
