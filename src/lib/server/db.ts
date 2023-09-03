import { createClient, type AuthResponse, type User, type Session } from '@supabase/supabase-js'
import { error, json } from '@sveltejs/kit';
import { DB_URL, DB_KEY } from '$env/static/private';
import type { Json, Database } from './database.types';

// Create a single supabase client for interacting with your database
const supabase = createClient<Database>(DB_URL, DB_KEY);

const userStore = writable();

supabase.auth.getSession().then(({ data }) => {
	userStore.set(data.session?.user);
});

supabase.auth.onAuthStateChange((event, session) => {
	if (event == 'SIGNED_IN' && session) {
		userStore.set(session.user);
	} else if (event == 'SIGNED_OUT') {
		userStore.set(null);
	}
});

export interface SignUpParams {
  email: string;
  password: string;
  data?: Map<string, string>;
}

type EmailSignInParams = {email: string, redirect_to: string};
type PhoneSignInParams = {phone: string};
export type SignInParams = EmailSignInParams | PhoneSignInParams;
export function signIn(params:SignInParams) {
    return supabase.auth.signInWithOtp(params);
}
