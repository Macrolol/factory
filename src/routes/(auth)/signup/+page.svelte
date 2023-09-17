<script lang="ts">
    import { enhance } from '$app/forms'
    import { goto } from '$app/navigation';
    import type { SubmitFunction } from '@sveltejs/kit';
    import type { PageData, ActionData } from './$types';

    const beforeSubmit: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
        console.debug('beforeSubmit')
        switch (action.pathname) {
            case '/signup': {
                return
            }
            case '/login': {
                if (!(formData.get('email') || formData.get('password'))) {
                    cancel()
                    console.debug('beforeSubmit', 'redirecting to /login')
                    goto('/login')
                }
            }             
        }
    }
        	
	export let data: PageData;
	
	export let form: ActionData;
</script>

<section class="bg-gray-200 h-screen flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-semibold mb-4">Sign Up</h1>
      {#if form?.status === 400 }
        <div class="text-red-500 text-sm mb-4">
            <span>{form?.body.error}</span>
        </div>
        {/if}
        {#if form?.status === 200 }
        <div class="text-green-500 text-sm mb-4">
            <span>{form?.body.message}</span>
        </div>
        {/if}
      <form method="POST" use:enhance={beforeSubmit}>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
          <input type="email" id="email" name="email"
                 class="mt-1 p-2 w-full border rounded-md 
                      invalid:border-pink-500 invalid:text-pink-600"/>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <input type="password" id="password" name="password" 
                 class="mt-1 p-2 w-full border rounded-md 
                      invalid:border-pink-500 invalid:text-pink-600"/>
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md 
                                   hover:bg-blue-600 focus:outline-none focus:border-blue-700 
                                     focus:ring focus:ring-blue-200">
                              
          Sign Up
        </button>
        <div class="text-center font-extralight p-2">
            <span>Already have an account?</span>
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md 
                                   hover:bg-blue-600 focus:outline-none focus:border-blue-700 
                                     focus:ring focus:ring-blue-200"
                              formaction="./login">
          Log In
        </button>
      </form>
    </div>
</section>