import { createClient } from '@supabase/supabase-js'
import { json } from '@sveltejs/kit';
import { DB_URL, DB_KEY } from '$env/static/private';

// Create a single supabase client for interacting with your database
const supabase = createClient(DB_URL, DB_KEY)
