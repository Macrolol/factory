<script lang="ts">
    import type { MessageData } from "./types";
    export let message: MessageData;
    const { type, content } = message;
    const text = typeof content === 'string'? content : content.prompt;
     
    const inputClasses = {
        light: {
            text: 'text-gray-900',
            bg: 'bg-gray-50'
        },
        dark: {
            text: 'text-white',
            bg: 'bg-gray-700'
        }
    };
    const outputClasses = {
        light: {
            text: 'text-gray-1000',
            bg: 'bg-gray-100'
        },
        dark: {
            text: 'text-white',
            bg: 'bg-gray-800'
        }
    }
    const classes = type === 'input'? inputClasses : outputClasses;
</script>

<blockquote class="p-4 my-4 border-l-4 border-gray-300 {classes.light.bg} dark:border-gray-500 dark:{classes.dark.bg}">
    <p class="text-sm italic font-medium leading-relaxed {classes.light.text} dark:{classes.dark.text}">{text}</p>
</blockquote>