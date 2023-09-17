<script lang="ts">
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";
</script>

<section class="bg-gray-200 h-screen flex flex-col justify-center items-center text-gray-900">
      
    <LoadSpinner color='teal' message=''/>

    <div class="text-center border-gray border-y-2 border-opacity-100 p-1 m-1 w-full max-w-md">
      <h1 class="text-3xl font-extrabold mb-4">Welcome to Our Platform</h1>
    </div>
  
    <div class="flex space-x-4">
      <a href="/login" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Log In
      </a>
      <a href="/signup" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Sign Up
      </a>
    </div>
  
  </section>
