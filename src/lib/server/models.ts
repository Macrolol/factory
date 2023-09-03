import { OPENAI_API_KEY } from '$env/static/private';
import type { LLM } from "langchain";
import { OpenAI } from "langchain/llms/openai";

interface Model<T extends LLM> {
    name: string;
    description: string;
    model: T
}

interface ClientModel {
    name: string;
    description: string;
    modelPath: string;
}


export async function getModels(){
    return [{
        name: "GPT-3",
        description: "GPT-3 is a language model developed by OpenAI. It is the third-generation language prediction model in the GPT-n series created by OpenAI, a San Francisco-based artificial intelligence research laboratory.",
        // Defaults to "text-davinci-003" if no model provided.            
        model: new OpenAI({ openAIApiKey: OPENAI_API_KEY}),
    }]
}

export async function getClientModels(){
    return [{
        name: "GPT-3",
        description: "GPT-3 is a language model developed by OpenAI. It is the third-generation language prediction model in the GPT-n series created by OpenAI, a San Francisco-based artificial intelligence research laboratory.",
        // Defaults to "text-davinci-003" if no model provided.            
        modelPath: "openai",
    }]
}