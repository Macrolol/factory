<script lang="ts">
    import TaskIcon from "./TaskIcon.svelte";
    import { taskStore } from "./tasks";
    import TaskContainer from "./TaskContainer.svelte";

    $: tasks = $taskStore.tasks;
    $: task = $taskStore.currentTask;

</script>

{#if task !== null}
    <TaskContainer {task}/>
{/if}
<div class=''>
    {#if tasks.length !== 0}
        <div class="sticky z-50 w-fit h-16 max-w-screen-lg bg-white border border-gray-200 rounded-full bottom-1 dark:bg-gray-700 dark:border-gray-600">
            <div class="flex h-full mx-auto">
                {#each tasks as task}
                    <TaskIcon {task}/>
                {/each}
            </div>
        </div>
    {/if}
</div>
