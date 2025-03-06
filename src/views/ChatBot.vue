<template>
    <div role="main" class="chatbot bg-sky-100 rounded-lg border">
        <div class="bg-violet-600 p-4 rounded-t-lg">
            <h1 class="text-xl text-center font-bold text-white">AI Therapist</h1>
        </div>
        <div class="chatbox h-56 flex flex-col overflow-auto" ref="divScroll">
            <template v-for="(chat,index) in chatHistroy" :key="index">
                <ChatbotUserBubble @scrollBottom="scrollToLatestChat" v-if="chat.role=='user'" :message="chat.content" />
                <ChatbotBotBubble @scrollBottom="scrollToLatestChat" v-if="chat.role=='assistant'" :message="chat.content"/>
            </template>
            <ChatbotBotBubble @scrollBottom="scrollToLatestChat" v-if="pending" :message="'Pending...'"/>
        </div>
        <div class="chat-input flex border-t-2 bg-white">
            <textarea v-model="inputValue" @keydown.enter.prevent="getMessages" class="w-full resize-none border-none focus:outline-0 focus:ring-0" placeholder="Enter a message"></textarea>
            <button @click="getMessages" id="send-btn" class="material-symbols-outlined">send</button>
        </div>
    </div>
</template>

<script setup>  
    import { ref } from 'vue';
    import ChatbotUserBubble from '../components/ChatbotUserBubble.vue';
    import ChatbotBotBubble from "../components/ChatbotBotBubble.vue"

    const chatHistroy= ref([])
    const message = ref('')
    const inputValue = ref('')
    const divScroll= ref(null)
    const pending= ref(false);
    const scrollToLatestChat = ()=>{
        divScroll.value.scroll({top:divScroll.value.scrollHeight , behavior: "smooth"})
    }
    const getMessages = async()=>{
        const options={
            method: "POST",
            body: JSON.stringify({
                message: inputValue.value
            }),
            headers:{
                "Content-Type": "application/json"
            }
        }
        try{
            chatHistroy.value.push({role:"user", content: inputValue.value})
            pending.value= true
            inputValue.value =""
            const response= await fetch('https://expressapi-yc7ocl2pnq-uc.a.run.app/chat', options)
            const data= await response.json()
            pending.value= false
            message.value = data.choices[0].message
            chatHistroy.value.push(message.value)
        }
        catch(err){
            console.log(err)
        }
    }
    
</script>

<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}
.chatbox{
    min-height: 500px;
}

</style>