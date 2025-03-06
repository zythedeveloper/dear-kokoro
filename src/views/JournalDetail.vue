  <template>
    <div role="main">
      <div v-if="journal">
      <div class="flex">
        <div>
          <h1 class="inline">{{ journal.createdAt.toDate() }}</h1>
          <button aria-label="edit journal" @click="isEdit=true" type="button" class="mx-4 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
            <PencilSquareIcon class="h-4 w-4 text-blue-500"/>
          </button>
        </div>
        <div v-if="isEdit">
          <button aria-label="delete journal" @click="handleDelete" type="button" class="text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
            <TrashIcon class="h-4 w-4 text-red-500"/>
          </button>
        </div>
      </div>
      <div v-if="journalCoverUrl" class="md:w-8/12 w-full m-auto coverDiv my-2 py-2">
        <img class="w-full" :src= "journalCoverUrl" alt="">
        <div v-if="isEdit" class="delete">
            <button aria-label="delete cover image" @click="handleCoverDelete" type="button" class="bg-white text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                    <TrashIcon class="h-4 w-4 text-red-500"/>
            </button>
        </div>
      </div>

      <div class="mb-6">
        <h1 v-if="!isEdit" class="text-center font-medium text-3xl p-2 m-2">{{ journalTile }}</h1>
        <label v-if="isEdit" for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input v-if="isEdit" v-model="journalTile" :disabled="isEdit ==false" type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-0">
      </div>
      <p v-if="!isEdit" class=" p-2 m-2">{{ journalDescription }}</p>
      <textarea aria-label="description" v-if="isEdit" ref="textarea" v-model="journalDescription" :disabled="isEdit ==false" id="message" rows='10' class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 border-0" ></textarea>
      <div v-if="isEdit" class="flex flex-col w-full mb-6 mt-3 pt-2">
        <div class="my-2 w-full py-2">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Cover Image</label>
          <input @change="handleCoverImage" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file">
          <Alert v-if="journalCoverUrl&& selectedCoverImage" type="info" class="my-2">The existing cover image will be replaced since only one cover image is allowed</Alert>
        </div>
        <p class=" my-2">Images</p>  
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
            <p class="text-xs text-gray-500 dark:text-gray-400"> PNG, JPG Only</p>
            <p v-if="selectedfiles" class="text-xs text-gray-500 dark:text-gray-400"> {{ selectedfiles.length }} Files Selected</p>
          </div>
          <input ref="fileInput" @change="handleChange" id="dropzone-file" type="file" class="hidden" multiple/>
          </label>
        </div>
    </div>
    <div class="m-auto flex justify-center pb-3">
      <Button @click="isEdit=false" v-if="isEdit" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Cancel</Button>
      <button v-if="isEdit && isPending==false" @click="handleUpdate" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">Save</button>
      <button v-if="isPending" disabled type="button" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2">
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
          Loading...
      </button>
    </div>
    <p>{{ error }}</p>
    <Gallery :id="props.id" v-if="journalImageUrls" :filePaths="journalFilePaths" :journalImageurls="journalImageUrls" :isEdit="isEdit" :key="renderKey"/>
    </div>
   
  </template>

  <script setup>
    import { Alert } from 'flowbite-vue'
    import { db } from "../firebase/config"
    import { doc, setDoc,updateDoc ,deleteDoc, collection } from "firebase/firestore"
    import { TrashIcon } from "@heroicons/vue/24/outline";
    import { PencilSquareIcon } from "@heroicons/vue/24/outline";
    import { Input } from 'flowbite-vue'
    import useStorage from '@/composables/useStorage';
    import useDocument from '@/composables/useDocument'
    import getDocument from '@/composables/getDocument.js'
    import getUser from '@/composables/getUser'
    import { useRouter } from 'vue-router';
    import {  onMounted, ref,watch } from 'vue'; 
    import Gallery from "../components/Gallery.vue";
    import sentimentAnalysis from '@/composables/sentimentAnalysis'
    import useSentiment from '../composables/setSentimentalCollection'
    import getSentimentalCollections from "../composables/getSentimentCollection"
    import { getDocs,getDoc } from 'firebase/firestore';
import { date } from '../composables/DateTime';

    const props = defineProps(['id'])
    const {uploadImage,error}= useStorage()
    const router = useRouter()
    const {user} = getUser()
    const {deleteDocument,updateDocument}= useDocument('journals',props.id)
    const {deleteImage}= useStorage()
    const isEdit= ref(false)
    const isPending = ref(false)
    const selectedfiles= ref(null)
    const uploadRes =ref(null)
    const journalTile= ref(null)
    const journalDescription= ref(null)
    const journalUserId= ref(null)
    const errors = ref(null)
    const fileError= ref(null)
    const fileInput = ref(null)
    const renderKey= ref(0)
    const textarea =ref(null)
    const journalCoverUrl= ref(null)
    const journalCoverPath= ref(null)
    const selectedCoverImage= ref(null)
    const coverUploadRes= ref(null)
    const journalCreatedAt = ref(null)
    let datemonth;
    let journalDetail;
    


    const{error:journalError, document: journal}= getDocument('journals',props.id);
    const journalFilePaths= ref(null)
    const journalImageUrls= ref(null)

    watch(journal,(newvalue,oldvalue)=>{
      journalUserId.value = journal.value.userId
      journalTile.value = journal.value.title
      journalCreatedAt.value = journal.value.createdAt
      journalDescription.value = journal.value.description
      journalFilePaths.value = journal.value.filePaths
      journalImageUrls.value = journal.value.imageUrls
      journalCoverUrl.value = journal.value.coverUrl
      journalCoverPath.value = journal.value.coverFilePath
      error.value = journalError.value
    })
    onMounted(async()=>{
      const docSnapshot = await getDoc(doc(db,'journals',props.id))
      journalDetail= docSnapshot.data()
      console.log(journalDetail)
      datemonth= date(journalDetail.createdAt.toDate())
      console.log("datemonth ",datemonth)
      //getSentimentalCollections(user.value.uid,datemonth)
    })
    
    
    
    const handleDelete = async()=>{
        const docSnapshot = await getDoc(doc(db,'journals',props.id))
        journalDetail= docSnapshot.data()
        console.log(journalDetail)
        datemonth= date(journalDetail.createdAt.toDate())
        console.log("datemonth ",datemonth)

        let oldData= await getSentimentalCollections(user.value.uid,datemonth)
        const { deleteSentiment}=useSentiment(user.value.uid,oldData,datemonth )
        isPending.value= true;
        await deleteSentiment(journalDetail.sentimentPositiveWords);
        await deleteImage(journalCoverPath.value)
        for(let i=0;i<journalFilePaths.value.length;i++){
          await deleteImage(journalFilePaths.value[i])
        }
        await deleteDocument()
        isPending.value=false;
        router.push({name:'home'})
    }
    const allowFiletypes=['image/png', 'image/jpeg']

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
    const handleCoverDelete = async()=>{
        await deleteImage(journalCoverPath.value)
        updateDocument({
            coverUrl: '',
            coverFilePath: '',
        })
      }
    
    const handleUpdate= async()=>{
      isPending.value=true
      let oldData= await getSentimentalCollections(user.value.uid,datemonth)
      let {deleteSentiment}=useSentiment(user.value.uid,oldData,datemonth )
      deleteSentiment(journalDetail.sentimentPositiveWords)
        // delete exisiting cover Image
        if(selectedCoverImage.value){
        try{
          await deleteImage(journalCoverPath.value)
        }
        catch(err){
          error.value= error.value+ " "+ err
        }
        try{
          updateDocument({
            title: journalTile.value,
            description: journalDescription.value,
            coverUrl: '',
            coverFilePath: '',
          })
        }
        catch(err){
          error.value = error.value+ " "+ err
        }
        // upload new cover Image
        try{
          
          coverUploadRes.value = await uploadImage(selectedCoverImage.value[0],props.id)
        } catch(err){
          error.value = error.value+ " "+ err
        }
          journalCoverPath.value = coverUploadRes.value.filePath
          journalCoverUrl.value = coverUploadRes.value.url
          // update document with file paths and urls
          try{
          await updateDocument({
            title: journalTile.value,
            description: journalDescription.value,
            coverUrl: journalCoverUrl.value,
            coverFilePath: journalCoverPath.value
          })
        }
        catch(err){
          error.value = error.value+ " "+ err
        }
      }
      const filePathSet = new Set(journalFilePaths.value)
      const imageUrlsSet = new Set(journalImageUrls.value)
      const updatedDocument= ref({})

      let sentimentComparative
      let sentimentScore
      let sentimentPositiveWords= []

      // sentimental analysis
      const results= await sentimentAnalysis(journalDescription.value)
      sentimentScore= results.score
      sentimentComparative = results.comparative
      sentimentPositiveWords= results.positiveCalculation
      
    
      isPending.value = true
      

      try{
        for (let i=0; i<selectedfiles.value.length;i++){
          uploadRes.value =await uploadImage(selectedfiles.value[i],props.id)
          filePathSet.add(uploadRes.value.filePath)
          imageUrlsSet.add(uploadRes.value.url)
        }
      }catch(err){
        
      }
        updatedDocument.value ={
        coverUrl: journalCoverUrl.value,
        coverFilePath: journalCoverPath.value,
        imageUrls: Array.from(imageUrlsSet),
        description: journalDescription.value,
        filePaths: Array.from(filePathSet),
        title: journalTile.value,
        sentimentScore: sentimentScore,
        sentimentComparative: sentimentComparative,
        sentimentPositiveWords: sentimentPositiveWords
      }

      oldData= await getSentimentalCollections(user.value.uid,datemonth)
      let {setSentiment}=useSentiment(user.value.uid,oldData ,datemonth)
      // push to sentiment collection
      await setSentiment({
        sentimentPositiveWords: sentimentPositiveWords
      })
    
  
      await updateDocument(updatedDocument.value)
      


      isPending.value=false
      // reset file input and re-render gallery component
      fileInput.value=null
      selectedfiles.value=null
      isEdit.value=false
      renderKey.value +=1


  }
</script>

<style scoped>
  [disabled]{
    cursor:default
  }
  .delete{
    position: absolute;
    bottom: 20px;
    right: 10px;
  }
  .coverDiv{
    position: relative;
  }
</style>