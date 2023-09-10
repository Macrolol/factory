import type { PageServerLoad } from './$types';
import { getModels } from "$lib/server/models";


export const load: PageServerLoad = async () =>  {
    return{
        props: {
            models: getModels()
        }
    }
}