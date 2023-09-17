<script lang="ts">
  import type { ActionData } from "./$types";
	
	export let form: ActionData;
</script>

<section class="bg-gray-200 h-screen flex justify-center items-center">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-semibold mb-4">Log In</h1>
      {#if form?.status === 400 }
        <div class="text-red-500 text-sm mb-4">
          <span>{form?.body.error}</span>
        </div>
      {/if}
      <form method="POST">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
          <input type="email" id="email" name="email" class="mt-1 p-2 w-full border rounded-md">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <input type="password" id="password" name="password" class="mt-1 p-2 w-full border rounded-md">
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200">
          Log In
        </button>
      </form>
    </div>
  </section>