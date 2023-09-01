
<script lang="ts">
  	import "../app.postcss";
  	import "../app.postcss";
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Header from '$lib/components/Header.svelte';
	import Taskbar from "$lib/components/taskbar/Taskbar.svelte";
	import { Settings } from '$lib';
	import { routes  } from '$lib';
	import { page } from '$app/stores';
	const { SITE_NAME } = Settings

$: routeId = $page.url.pathname;

$: currentRoute = routes.find((route) => {
	if (routeId !== '/' && route.path.includes($page.url.pathname)){
		console.log(route);
		return true;
	}
	return false;
});

</script>

<svelte:head>
	<title>{SITE_NAME}</title>
</svelte:head>

<section id="body">
	<div class="flex h-screen overflow-hidden">
		<Sidebar options={routes}/>
		<div class="flex flex-col flex-auto w-full">
			<Header {currentRoute}/>
			<main class="h-full overflow-hidden px-0 pt-0 pb-0">
				<slot />
			</main>
			<Taskbar/>
		</div>
	</div>
</section>
