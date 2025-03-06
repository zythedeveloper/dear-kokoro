<template>
    <div class="md:w-1/2 mx-auto top-2/4 h-full" role="main">
      <form @submit.prevent="handleSubmit">
        <div class="flex">
          <div class="mt-6 basis-4/6"><h1 class="text-lg">Create new Journal</h1></div>
          <div class="mt-6 m-auto basis-2/6"><Button @click="handleRandomQuestion" gradient="teal-lime" pill>Generate a question</Button></div>
        </div>
        <div class="mb-6 mt-3 pt-2">
          <label for="title" class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input v-model="title" id="title" name="title" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        </div>
        <div>
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
          <textarea v-model="description" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
        </div>
        <div class="mt-3">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Cover Image</label>
          <input @change="handleCoverImage" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
        </div>
        <label class=" mt-3 block text-sm font-medium text-gray-900 dark:text-white" for="dropzone-file">Upload Images</label>
        <div class="flex items-center justify-center w-full mb-6 mt-3 pt-2">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG Only</p>
            <p v-if="selectedfiles" class="text-xs text-gray-500 dark:text-gray-400"> {{ selectedfiles.length }} Files Selected</p>
          </div>
          <input @change="handleChange" id="dropzone-file" type="file" class="hidden" multiple/>
          </label>
        </div>
      <div class="m-auto text-center flex justify-center">
        <Toast v-if="error" type="warning" class="text-rose-500">
          {{ error }}
        </Toast>
        <Toast v-if="fileError" type="warning" class="text-rose-500">
          {{ fileError }}
        </Toast>
      </div>
      <div class="m-auto flex justify-center">
        <button @click="$router.push('/')" type="button" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button> 
        <button v-if="!isPending" type="submit" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Create</button>
        <button v-if="isPending" disabled type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">
          <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
          </svg>
          Loading...
        </button>
      </div>
    </form>
  </div>
</template>
  
  <script setup>
    import { Toast, Button } from 'flowbite-vue'
    import {  ref,onMounted} from 'vue';
    import useStorage from '@/composables/useStorage'
    import useCollection from '@/composables/useCollection'
    import getUser from '@/composables/getUser'
    import { timestamp } from '@/firebase/config'
    import { useRouter } from 'vue-router'
    import useDocument from '@/composables/useDocument'
    import sentimentAnalysis from '@/composables/sentimentAnalysis'
    import useSentiment from '../composables/setSentimentalCollection'
    import getRandomQuestion from '../composables/getJournalQuestions';
    import getSentimentalCollections from '../composables/getSentimentCollection';
    import { date } from '../composables/DateTime';

    const {uploadImage}= useStorage()
    const {error, addDocument}= useCollection('journals')
    const {user}= getUser()
    const title = ref('')
    const description = ref('')
    const fileError= ref(null)
    const isPending = ref(false)
    const router= useRouter();
    const selectedfiles= ref(null)
    const filePaths =ref([])
    const urls= ref([])
    const uploadRes =ref(null)
    const selectedCoverImage= ref(null)
    const coverFilePath= ref(null)
    const coverUrl = ref(null)
    const coverUploadRes= ref(null)


    const handleRandomQuestion= (e)=>{
      title.value = getRandomQuestion();
      e.preventDefault();
    }

    onMounted(async()=>{
    
    })

    const handleSubmit= async()=>{
        const oldSentimentData=await getSentimentalCollections(user.value.uid, date())
        console.log("before submit",oldSentimentData)
        isPending.value = true
        let sentimentComparative
        let sentimentScore
        let sentimentPositiveWords= []

        // sentimental analysis
        const results= await sentimentAnalysis(description.value)
        sentimentScore= results.score
        sentimentComparative = results.comparative
        sentimentPositiveWords= results.positiveCalculation

        // push to database
        const res = await addDocument({
              title: title.value,
              description: description.value,
              userId: user.value.uid,
              userName: user.value.displayName,
              imageUrls: '',
              filePaths: '',
              coverUrl: '',
              coverFilePath: '',
              createdAt: timestamp,
              sentimentScore: sentimentScore,
              sentimentComparative: sentimentComparative,
              sentimentPositiveWords: sentimentPositiveWords
        })
        
        // push to sentiment collection
        const {setSentiment}=useSentiment(user.value.uid,oldSentimentData,date() )
        await setSentiment({
          sentimentPositiveWords: sentimentPositiveWords
        })

        // push to storage
        const {updateDocument}= useDocument('journals',res.id)
        // cover image
        try{
          coverUploadRes.value = await uploadImage(selectedCoverImage.value[0],res.id)
          coverFilePath.value = coverUploadRes.value.filePath
          coverUrl.value = coverUploadRes.value.url
        }
        catch(err){

        }
        // images
        try{
          for (let i=0; i<selectedfiles.value.length;i++){
            uploadRes.value =await uploadImage(selectedfiles.value[i],res.id)
            filePaths.value.push(uploadRes.value.filePath)
            urls.value.push(uploadRes.value.url)
          }
        }
        catch(err){

        }
        
        // update document with file paths and urls
        await updateDocument({
          imageUrls: urls.value,
          filePaths:filePaths.value,
          coverUrl: coverUrl.value,
          coverFilePath: coverFilePath.value,
        })

        isPending.value= false 
        if (!error.value){
            router.push({name:'JournalDetail', params:{id:res.id}})
          }
    }

    //allow file types
    const allowFiletypes=['image/png', 'image/jpeg']

    const handleCoverImage= async (e)=>{
      selectedCoverImage.value = await e.target.files
      if(selectedCoverImage.value[0] && allowFiletypes.includes(selectedCoverImage.value[0].type)){
        fileError.value= null
      }
      else{
        selectedCoverImage.value = ''
        fileError.value= 'Please reselect an image file (png or jpg)'
      }
    }

    const handleChange= async(e)=>{
      selectedfiles.value= await e.target.files
      for(var i=0; i<selectedfiles.value.length;i++){
        if(selectedfiles.value[i] && allowFiletypes.includes(selectedfiles.value[i].type)){
          fileError.value = null
        }
        else{
          selectedfiles.value= ''
          fileError.value= 'Please reselect an image file (png or jpg)'
        }
      }
    }
  </script>