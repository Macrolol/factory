<script lang="ts">
    import { onMount } from 'svelte';
  
    export let items: any = [];
    let zoomLevel = 1;
    let container: HTMLElement;
    let fullscreen = false;
  
    function handleDrop(event: any) {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const item = JSON.parse(event.dataTransfer.getData('text/plain'));
      items = [...items, { ...item, x, y }];
    }
  
    function zoom(increment: number) {
      zoomLevel += increment;
      container.style.transform = `scale(${zoomLevel})`;
    }
  
    onMount(() => {
      container.style.transformOrigin = 'top left';
    });
    let size = {
        width: '[800px]',
        height: '[600px]'
    }
    $: size = fullscreen ? {
        width: 'full',
        height: 'full'
    } : {
        width: '[800px]',
        height: '[600px]'
    }
    
  </script>
  
  <!-- Zoom Controls -->
  <button on:click={() => zoom(0.1)}
          type="button">Zoom In</button>
  <button on:click={() => zoom(-0.1)}
          type="button">Zoom Out</button>
  
  <!-- Scrollable Canvas Container -->
  <div class="w-{size.width} h-{size.height} overflow-auto relative">
    <div bind:this={container} 
         on:drop={handleDrop}
         on:dragover={(e) => e.preventDefault()}
         role="group"
         class="relative bg-gray-200 w-[2000px] h-[2000px]">
      {#each items as item (item.id)}
        <div style="left: {item.x}px; top: {item.y}px;"
             class="absolute bg-red-500 w-32 h-32 p-4 m-4">
             {item.label}
        </div>
      {/each}
    </div>
  </div>