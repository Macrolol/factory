import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';


export const actions = {
	default: async (event) => {
        console.debug('login event', event)
		const supabase = event.locals.supabase
		const request = event.request
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		if (!email || !password) {
			return {
				status: 400,
				body: {
					error: 'Email and password are required',
				},
			}
		}
		
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
		if (error) {
            return {
                status: 400,
                body: {
                    error: error.message,
                },
            }
        }
        console.debug('LOGIN SUCCESS', data);
        throw redirect(303, '/dashboard');
	},
} satisfies Actions;