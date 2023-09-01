<script lang="ts">
    import Message from "./Message.svelte";
    import type { MessageData } from "./types";

    export let messages: MessageData[];
</script>

<div class="flex flex-col h-full w-full bg-slate-200 rounded-md">
    {#if messages.length === 0}
        <p class="text-center">No messages</p>
    {/if}
    {#each messages as message}
        <Message {message} />
    {/each}
</div>