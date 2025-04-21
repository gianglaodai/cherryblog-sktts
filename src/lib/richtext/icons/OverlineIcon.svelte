<div class="strike text-lg">O</div>

<style>
	.strike {
		@apply relative inline-block;
	}
	.strike::after {
		content: '';
		@apply absolute top-[0.25em] right-0 left-0 h-[1px] bg-red-600;
	}
</style>
