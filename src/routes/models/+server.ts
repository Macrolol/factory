import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";
import { getModels } from "$lib/server/models";



export const POST: RequestHandler = async ({ request, params }) => {
    const { modelName,
            prompt,
            maxTokens,
            temperature
        } = await request.json();
    console.log(modelName, prompt, maxTokens, temperature);
    
    const models = await getModels();
    const model = models.find(model => model.name === modelName);
    if(!model){
        throw error(400, "Model not found");
    }
    return json({
        status: 200,
        body: {
            result: await model.model.generate(prompt, maxTokens, temperature)
        }
    });
};