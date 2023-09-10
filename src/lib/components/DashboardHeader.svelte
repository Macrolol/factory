<script lang="ts">
	import type { Route } from '$lib';
	export let currentRoute: Route | undefined; 
</script>

{#if currentRoute !== undefined}
				<div class="border-gray border-y-2 border-opacity-100 p-1 m-1 w-full">
					<h1 class="font-extrabold flex space-x-5">
						{#if typeof currentRoute.icon === 'string'}
							{@html currentRoute.icon}
						{:else}
							<svelte:component this={currentRoute.icon} class="w-6 h-6" />
						{/if}
						<span>{currentRoute.name}</span>
						{#if currentRoute.nested_paths !== undefined}
						<span class="w-5">
							<!-- SPACE -->
						</span>
							{#each currentRoute.nested_paths as nested}
								<div class='flex space-x-1 m-0 px-2 bg-sky-600 rounded-md font-medium text-white hover:text-blue-800'>
									{#if typeof nested.icon === 'function' }
										<svelte:component this={nested.icon} class="w-6 h-6 p-0" />
									{/if}
									<a href={nested.path}>{nested.name}</a>
								</div>
							{/each}
						{/if}
					</h1>
				</div>
				{/if}
