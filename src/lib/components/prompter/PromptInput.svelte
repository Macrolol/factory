<script lang="ts">
    import Toolbar from '$lib/components/prompter/Toolbar.svelte';

    export let prompt: string = '';
</script>

<div class="mb-0 pb-0">
    <div class="w-full mb-0 pb-0 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <Toolbar />
        <div class="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
            <label for="editor" class="sr-only">Prompt</label>
            <textarea 
                id="editor" 
                rows="8" 
                class="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                placeholder="Enter your prompt here..."
                required
                bind:value={prompt}
                />
        </div>
    </div>
    <button type="submit" class="px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
        Prompt
    </button>
</div>