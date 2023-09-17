<script lang="ts">
    import type { DOMAttributes } from 'svelte/elements';
    const sizes = {
        xSmall: {
            inner: 'h-2 w-2',
            outer: 'h-4 w-4',
        },
        small: {
            inner: 'h-4 w-4',
            outer: 'h-6 w-6',
        },
        medium: {
            inner: 'h-8 w-8',
            outer: 'h-10 w-10',
        },
        large: {
            inner: 'h-16 w-16',
            outer: 'h-20 w-20',
        },
        xLarge: {
            inner: 'h-32 w-32',
            outer: 'h-36 w-36',
        },
    };
    type Size = keyof typeof sizes;

    export let size: Size = 'xLarge';
    export let message: string = 'Loading...';
    

</script>

<div {...$$restProps}>
    <div class="flex justify-center items-center {sizes[size]['outer']} relative">
        <div id='gear' class="border-dashed border-8 absolute animate-spin-slow rounded-full bg-sky-600 {sizes[size]['inner']} z-0"></div>
        <span class="text-white text-xl font-bold z-10">{message}</span>
    </div>
</div>
  


