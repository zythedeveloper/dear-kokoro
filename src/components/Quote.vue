<template>
    <div role="main">
        <div class="flex" aria-labelledby="category">
        <form @submit.prevent="handleSubmit" class="m-auto flex">
            <label for="category" class=" m-2 text-sm font-medium text-gray-900 my-auto">Category</label>
        <select v-model="category" name="category" id="category" class="m-2 p-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="happiness">Happiness</option>
            <option value="inspirational">Inspirational</option>
            <option value="forgiveness">Forgiveness</option>
        </select>
        <Button @click="getQuote" gradient="purple-pink" pill class="m-2">Fetch quote</Button>
        </form>
    </div>
    <div class="p-4 m-4 m-auto text-center text-lg lg:text-2xl" >
        <h1>{{ quoteData[0].quote}}</h1>
        <p>- {{ quoteData[0].author}} </p>
    </div>
    </div>
</template>

<script setup async>
import { ref } from 'vue';
import { Button } from 'flowbite-vue'

const category= ref('happiness')
const quoteData= ref(null)
const options={
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        }
let quoteResponse = await fetch('https://expressapi-yc7ocl2pnq-uc.a.run.app/quote?category=happiness', options)
quoteData.value= await quoteResponse.json()

const getQuote=async()=>{
    quoteResponse = await fetch('https://expressapi-yc7ocl2pnq-uc.a.run.app/quote'+`?category=${category.value}`, options)
    quoteData.value= await quoteResponse.json()
}

</script>