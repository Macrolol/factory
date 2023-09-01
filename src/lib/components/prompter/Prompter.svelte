<script lang="ts">
    import PromptInput from "./PromptInput.svelte";
    import OutputDisplay from "./OutputDisplay.svelte";
    import type { PrompterTaskData } from "./types";

    export let taskData: PrompterTaskData;
    let { messages, modelEndpoint } = taskData;
    let prompt = "";

    function handleSubmit() {
        messages = [...messages, { type: "input", content: prompt }];
        fetch(modelEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(messages),
        })
        .then((res) => res.json())
        .then((res) => {
            messages = [...messages, { type: "output", content: res.output }];
        });
        prompt = "";
    }
</script>


<form class="flex flex-col w-full h-full" on:submit|preventDefault={handleSubmit} >
    <div class='h-1/2 m-0 p-0'>
        <OutputDisplay messages={messages}/>
    </div>
    <div class='h-fit m-0 p-0'>
        <PromptInput bind:prompt={prompt}/>
    </div>
</form>
