<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div>
	<form method="POST" action="?/login" use:enhance>
		<input type="email" placeholder="Email" name="email" />
		<input type="password" placeholder="Password" name="password" />
		<button type="submit">Login</button>
	</form>
</div>
