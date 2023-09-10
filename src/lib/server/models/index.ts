import { OPENAI_API_KEY } from '$env/static/private';
import type { BaseLanguageModel } from 'langchain/dist/base_language';
import { OpenAI } from "langchain/llms/openai";


interface ModelWrapper{
    name: string;
    description: string;
    model: BaseLanguageModel;
    route: string;
}


export async function getModels(): Promise<ModelWrapper[]>{
    return [{
                name: "GPT-3",
                description: "GPT-3 is a language model developed by OpenAI. It is the third-generation language prediction model in the GPT-n series created by OpenAI, a San Francisco-based artificial intelligence research laboratory.",
                // Defaults to "text-davinci-003" if no model provided.            
                model: new OpenAI({ openAIApiKey: OPENAI_API_KEY }),
                route: "./gpt3"
        },
        {
                name: "GPT-4",
                description: "GPT-4 is a language model developed by OpenAI. It is the fourth-generation language prediction model in the GPT-n series created by OpenAI, a San Francisco-based artificial intelligence research laboratory.",
                model: new OpenAI({ openAIApiKey: OPENAI_API_KEY, modelName: "gpt-4" }),
                route: "./gpt4"
    }];
}



