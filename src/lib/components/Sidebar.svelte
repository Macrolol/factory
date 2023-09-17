<script lang="ts">
import { isOpenSidebar } from "$lib/stores/dashboardStore";
import { page } from '$app/stores';
import { Settings } from "$lib";
import NavDropdownLink from "./NavDropdownLink.svelte";
import type { SidebarOption } from "$lib/components/sidebar";
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import { onMount } from "svelte";

export let options: SidebarOption[]


const x_translate = tweened(!$isOpenSidebar ? 0 : -100, {
    duration: 500,
    easing: cubicOut
});


let routeId: any;

$: routeId = $page.url.pathname;

</script>

<aside class="overflow-y-auto overflow-x-hidden h-full fixed translate-x-{x_translate} md:translate-x-0 md:static z-20 md:block {!$isOpenSidebar ? 'w-fit' : 'w-60 md:w-56 lg:w-64'} bg-white flex-shrink-0 border-r">
    <div class="py-6 relative">
        
        
        <a href="/" class="px-4 text-2xl font-bold text-primary-700">{!$isOpenSidebar ? Settings.SITE_SHORT_NAME : Settings.SITE_NAME}</a>
        <ul class="mt-5 {!$isOpenSidebar ? 'text-center' : ''}">
            {#each options as link }
                <li>
                    {#if link.path }
                        <a href={link.path} class="px-4 py-4 border-l-4 border-transparent flex items-center space-x-3 text-lg font-bold
                                                  {link.path == routeId ?
                                                            'border-l-primary-700 bg-primary-100 text-primary-700 hover:text-primary-700'
                                                            : 
                                                            'text-gray-500'}
                                                hover:bg-gray-50 hover:text-black font-medium block duration-10000">
                            
<!--   {@html link.icon} -->{#if link.icon instanceof Function} 
                                <svelte:component this={link.icon} class="w-6 h-6 {$isOpenSidebar ? '' : 'translate-x-1'}"/>
                            {:else if link.icon}
                                <i class="far fa-fw {link.icon} text-lg {isOpenSidebar ? '' : 'mr-3'}"></i>
                            {/if}
                            <span class="{!$isOpenSidebar ? 'hidden' : ''}">{link.name}</span>
                    </a>
                    {:else}
                        <NavDropdownLink nestedLinks={link?.nested_links} {link} {routeId} isMinimalize={!$isOpenSidebar} />
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
    <div class="absolute inset-x-0 bottom-0 flex p-1">
        <p class="font-extralight text-md w-2/3 p-0 {$isOpenSidebar ? '': 'hidden'} "> © 2023 <br/> Michael Dormon </p>
            <button class="bg-sky-600 rounded-md font-medium text-white hover:text-blue-800 {$isOpenSidebar ? 'w-1/3': 'w-full'} p-3 "
                    on:click={()=> {isOpenSidebar.set(!$isOpenSidebar)}}
                    type="button">
            {$isOpenSidebar ? "<<" : ">>"}
        </button>
    </div>
</aside>