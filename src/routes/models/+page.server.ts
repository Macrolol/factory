import type { PageServerLoad } from './$types';
import { getClientModels } from "$lib/server/models";


export const load: PageServerLoad = () =>  {
    return{
        props: {
            models: getClientModels()
        }
    }
}


