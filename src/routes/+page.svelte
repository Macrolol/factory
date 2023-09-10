<script lang="ts">
    import {onMount} from "svelte";
    import {page} from "$app/stores";

    onMount(() => {
        const conveyorBelt = document.getElementById('conveyor-belt');

        if (!conveyorBelt) return;

        let position = 0;

        setInterval(() => {
            const block = document.createElement('div');
            block.className = 'bg-blue-500 h-10 w-10 absolute';
            block.style.left = `${position}px`;

            conveyorBelt.appendChild(block);

            const animationDuration = 2000;
            block.animate([
            { transform: 'translateX(0px)' },
            { transform: 'translateX(400px)' }
            ], {
            duration: animationDuration,
            easing: 'linear'
            });

            setTimeout(() => {
            block.remove();
            }, animationDuration);

            position += 20;
            if (position > 400) position = 0;
        }, 200);
    });

</script>

<section class="bg-gray-200 h-screen flex flex-col justify-center items-center text-gray-900">

    <div class="relative">
        <div id="conveyor-belt" class="bg-gray-600 h-12 w-96">
        </div>
    </div>

      
      
      
  
    <div class="text-center border-gray border-y-2 border-opacity-100 p-1 m-1 w-full max-w-md">
      <h1 class="text-3xl font-extrabold mb-4">Welcome to Our Platform</h1>
    </div>
  
    <div class="flex space-x-4">
      <a href="/login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Log In
      </a>
      <a href="/signup" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign Up
      </a>
    </div>
  
  </section>
