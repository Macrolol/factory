<script lang="ts">
    import type { PageData } from './$types';
    import { prompter, taskStore } from '$lib/components/taskbar/tasks';
    import Card from '$lib/components/Card.svelte';

    export let data: PageData;
</script>

<div class="flex flex-grow">
    {#await data.props.models}
    <div class="flex flex-grow justify-center items-center">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        <p>Loading...</p>
    </div>
    {:then models} 
        {#each models as model}
        <Card>
            <h2>{model.name}</h2>
            <p>{model.description}</p>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    on:click={() => taskStore.addTask(prompter(model.name, model.modelPath, []))}
                    type="button">
                Prompt
            </button>
                
            <a href={`/models/${model.modelPath}`}>Model</a>
        </Card>        
        {/each}
    {:catch error}
        <div class="flex flex-grow justify-center items-center">
            <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    {/await}
</div>