<script lang="ts">
	import "../app.postcss";
	import "../app.postcss";
	import { Settings } from "$lib";
	import { invalidate } from "$app/navigation";
	import { onMount } from "svelte";
	import type { LayoutData } from "./$types";
	const { SITE_NAME } = Settings;

	export let data: LayoutData;

	//Supabase event listener
	$: ({ supabase, session } = data);
	onMount(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>{SITE_NAME}</title>
</svelte:head>

<slot/>