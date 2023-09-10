<script lang="ts">
    import Sidebar from "$lib/components/Sidebar.svelte";
    import { routes } from "$lib";
</script>

<section id="body">
	<div class="flex h-screen overflow-hidden">
		<Sidebar options={routes} />
		<div class="flex flex-col flex-auto w-full">
			<slot/>
		</div>
	</div>
</section>