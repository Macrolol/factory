<script lang="ts">
    import { type  Task, taskStore } from './tasks';

    export let task: Task;
    $: current = $taskStore.currentTask === task;

    let hover = false;
</script>

<button class="inline-flex flex-col items-center justify-center px-3 m-1 rounded-md only-of-type:rounded-full last-of-type:rounded-r-full transition-all duration-500 first:rounded-l-full
               {current ? 'bg-blue-500 hover:bg-blue-700 text-white -translate-y-1' :
                          'bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'}"
        on:click={() => {current ? taskStore.unfocusTask() : taskStore.focusTask(task)}}
        on:mouseenter={() => {hover = true}}
        on:mouseleave={() => {hover = false}}
        type="button">
    <svelte:component this={task.icon} class="w-6 h-6" />
    <span class="sr-only">{task.name}</span>
    <div role="tooltip"
         class="absolute bottom-full z-10 px-3 text-sm font-medium text-white transition-opacity duration-300
                bg-gray-900 rounded-lg shadow-sm opacity-{hover ? 100 : 0} dark:bg-gray-700">
        {task.name}
    </div>
</button>

