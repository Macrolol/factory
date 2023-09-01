<script lang="ts">
    import { onMount } from 'svelte';
    import Canvas from '$lib/components/builder/Canvas.svelte';
    let items: any = [];
</script>

<Canvas {items} />