import type { ComponentType } from "svelte";
import type CarbonBot from '~icons/carbon/bot';
import type Prompter from "./Prompter.svelte";


export type PrompterTaskData = {modelEndpoint: string; messages: MessageData[]};
export interface PrompterTask {
    name: string;
    icon: ComponentType<CarbonBot>;
    component: ComponentType<Prompter>;
    data: PrompterTaskData;
}

export interface MessageData {
    type: 'input' | 'output';
    content: string | PromptData;
}

export interface PromptData {
    prompt: string;
    attachments: any;
}