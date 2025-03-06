<template>
  <nav class="border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <router-link :to="{name:'home'}" class="flex items-center">
        <img src="../assets/logo2.png" class="h-8 mr-3" alt="Flowbite Logo" />
    </router-link>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div class="hidden w-full lg:block lg:w-auto" id="navbar-default">
      <template v-if="user">
        <ul class="navbar text-md flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  lg:flex-row md:space-x-8 lg:mt-0 lg:border-0">
          <li class="block py-2 pl-3 pr-4 text-gray-900  lg:border-0 lg:p-0">Hi, {{ user.displayName }} !</li>
          <li>
            <router-link :to="{name:'Quote'}" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">Quotes</router-link>
          </li>
          <li>
            <router-link :to="{name:'CreateJournal'}" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">Create Journal</router-link>
          </li>
          <li>
            <router-link :to="{name:'MyJournal'}" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">My Journals</router-link>
          </li>
          <li>
            <router-link :to="{name:'ChatBot'}" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent lg:border-0 md:hover:text-blue-700 lg:p-0">AI Therapist</router-link>
          </li>
          <li>
            <router-link :to="{name:'DailyChecker'}" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0">Daily Checker</router-link>
          </li>
          <li>
            <router-link :to="{name:'Insights'}" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent lg:border-0 md:hover:text-blue-700 lg:p-0">Insights</router-link>
          </li>
          <li>
            <a @click="handleLogout" href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent lg:border-0 md:hover:text-blue-700 lg:p-0">Logout</a>
          </li>
        </ul>
      </template>
      <template v-if="!user">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li>
            <router-link :to="{name:'Signup'}" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Signup</router-link>
          </li>
          <li>
            <router-link :to="{name:'Login'}" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</router-link>
          </li>
        </ul>
      </template>
    </div>
  </div>
</nav>
 
</template>
  
  <script setup>
    import { useRouter } from 'vue-router';
    import useLogout from '@/composables/useLogout';
    import getUser from '@/composables/getUser';
    import { ref,onMounted } from 'vue';

    const {user}= getUser();
    const {error,logout}= useLogout()
    const router = useRouter()
    onMounted(() => {
    initFlowbite();
    })

    const handleLogout= async()=>{
        await logout();
        console.log('user logged out')
        router.push({name:'Login'})
        console.log(user)
        user.value=null
    }

  
  </script>

  <style scoped>
    .router-link-active {
    color: #2710de
  }

  li{
    background-color: #FFFBF6;
  }

  </style>