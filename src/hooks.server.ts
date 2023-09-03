import type { Cookies, Handle } from '@sveltejs/kit';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import { DB_URL, DB_KEY } from '$env/static/private';
import type { Json, Database } from '$lib/server/database.types';

function initSupabase(event: any) {
    return {
        supabase: createSupabaseServerClient<Database>({
            supabaseUrl: DB_URL,
            supabaseKey: DB_KEY,
            event
        }),
        getSession: async () => {
            const {
                data: { session },
              } = await event.locals.supabase.auth.getSession()
              return session
        }
    }
}



export const handle: Handle = async ({ event, resolve }) => {
    event.locals = initSupabase(event);

    // From supabase docs: "We need to tell SvelteKit that supabase needs the content-range header."
    return resolve(event, {
        filterSerializedResponseHeaders(name) {
          return name === 'content-range'
        },
    })
};