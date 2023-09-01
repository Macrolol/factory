<script lang="ts">
    import { type Task, taskStore } from './tasks';
    import { beforeUpdate } from 'svelte';
    
    export let task: Task;


    let props = task.data;
    let container: HTMLDivElement;

    export let left = 100;
	export let top = 100;
	
	let moving = false;

    function onMouseDown() {
		moving = true;
	}
	
	function onMouseMove(e: MouseEvent) {
		if (moving) {
			left += e.movementX;
			top += e.movementY;
            console.log(left, top);
		}
	}
	
	function onMouseUp() {
		moving = false;
	}


    function fade() {
        container.classList.add("opacity-0");
        container.classList.add("translate-y-full");
    }

    let positionStyles: string;
    beforeUpdate(() =>{positionStyles = `top:${top}px;left:${left}px;`});
    
</script>
<svelte:window on:mouseup|preventDefault={onMouseUp} on:mousemove|preventDefault={onMouseMove} />

<div bind:this={container} 
     class="absolute {moving ? "shadow-lg" : "shadow-md"} border-2 bg-slate-50 h-fit w-fit rounded-lg transition-opacity duration-200"
     style={positionStyles}>
     
    <!-- Window control bar -->
    <div class="flex-col-reverse">
        <section class="flex flex-row-reverse justify-between items-center p-1" 
                 on:mousedown|preventDefault={onMouseDown}
                 role="button"
                 tabindex="0">
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
                    on:click={() => {
                        fade();
                        setTimeout(() => { taskStore.closeTask(task); }, 200);
                    }}
                    type="button">
                X
            </button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full"
                    type="button">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z"
                          clip-rule="evenodd"/>
                </svg>
            </button>
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full"
                    type="button">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    <path fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 100-20 10 10 0 000 20z"
                          clip-rule="evenodd"/>
                </svg>
            </button>
            <span class='w-full'>
                <p class="text-center">{task.name}</p>
            </span>
        </section>
    </div>
    <svelte:component this={task.component} taskData={props} />
</div>

