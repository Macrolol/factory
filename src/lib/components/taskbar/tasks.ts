import type { ComponentType } from "svelte";
import { tick } from "svelte";
import { writable, type Subscriber } from "svelte/store";
import CarbonBot from '~icons/carbon/bot';
import Carbon3dCurveManual from '~icons/carbon/3d-curve-manual'
import Builder from "../builder/Builder.svelte";
import type { PrompterTaskData,  MessageData, PrompterTask } from "../prompter/types";
import Prompter from "../prompter/Prompter.svelte";


export type TaskData = PrompterTaskData | FactoryTaskData;

export interface Task{
    name: string;
    icon: ComponentType;
    component: ComponentType;
    data: TaskData;
}

export function prompter(name: string, modelEndpoint: string, messages: MessageData[]): PrompterTask{
    return {
        name,
        icon: CarbonBot,
        component: Prompter,
        data: {modelEndpoint, messages}
    }
}

export type FactoryTaskData = {models: any};
export interface FactoryTask extends Task{
    icon: ComponentType<Carbon3dCurveManual>;
    component: ComponentType<Builder>;
    data: FactoryTaskData;
}
export function factory(name: string, models: any): FactoryTask{
    return {
        name,
        icon: Carbon3dCurveManual,
        component: Builder,
        data: {models}
    }
}

interface ActiveTasks{
    tasks: Task[];
    currentTask: Task | null;
}

function createTaskStore(){
    const tasks = writable<ActiveTasks>({tasks: [], currentTask: null});

    function focusTask(task: Task): void{
        tasks.update(tasks => {
            tasks.currentTask = task;
            return tasks;
        });
    }
    
    async function addTask(task: Task, focus: boolean = true): Promise<void>{
        tasks.update(tasks => {
            tasks.tasks.push(task);
            return tasks;
        });
        if(focus){
            await tick();
            focusTask(task);
        }
    };
    function closeTask(task: Task): void{
        tasks.update(tasks => {
            tasks.tasks = tasks.tasks.filter(t => t !== task);
            return tasks;
        });
    };
    tasks.subscribe((tasks) => {
        if(tasks.currentTask === null) return;

        if(!tasks.tasks.includes(tasks.currentTask)){
            tasks.currentTask = null;
        }
    });

    return {
        subscribe: tasks.subscribe,
        addTask,
        closeTask,
        focusTask,
        unfocusTask: () => tasks.update((tasks) => {
            tasks.currentTask = null;
            return tasks;
        })
    }
}

export const taskStore = createTaskStore();