<script lang="ts">
    import Taskbar from "$lib/components/taskbar/Taskbar.svelte";
    import DashboardHeader from "$lib/components/DashboardHeader.svelte";
	import { routes } from "$lib";
	import { page } from "$app/stores";
    
    $: routeId = $page.url.pathname;

    $: currentRoute = routes.find((route) => {
        if (routeId !== "/" && route.path.includes($page.url.pathname)) {
            console.log(route);
            return true;
        }
        return false;
    });
</script>


<DashboardHeader {currentRoute} />
<main class="h-full overflow-hidden px-0 pt-0 pb-0">
	<slot />
</main>
<Taskbar />