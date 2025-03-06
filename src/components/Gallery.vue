<template>

<JustifiedGrid
    class="container m-auto"
    v-bind:gap="gap"
    v-bind:defaultDirection="defaultDirection"
    v-bind:columnRange="columnRange"
    v-bind:rowRange="rowRange"
    v-bind:sizeRange="sizeRange"
    v-bind:isCroppedSize="isCroppedSize"
    v-bind:displayedRow="displayedRow"
  >
    <div v-for="image in urls" :key="image" class="image">
        <img class="rounded-lg" :src="image" alt="">
        <div v-if="isEdit" class="delete">
            <button aria-label="delete image" @click="handleDelete(image)" type="button" class="bg-white text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500">
                    <TrashIcon class="h-4 w-4 text-red-500"/>
            </button>
        </div>
    </div>
  </JustifiedGrid>
</template>

<script setup>
    import { MasonryGrid, JustifiedGrid, FrameGrid, PackingGrid } from "@egjs/vue-grid";
    import { TrashIcon } from "@heroicons/vue/24/outline";
    import getDocument from '@/composables/getDocument';
    import useStorage from '@/composables/useStorage';
    import useDocument from '@/composables/useDocument';
    import { ref, watch, toRaw } from 'vue';

    const gap=20
    const defaultDirection= "end"
    const columnRange= [1,8]
    const rowRange= 0
    const sizeRange= [100,500]
    const isCroppedSize= false
    const displayedRow= -1

    const props = defineProps(['id','filePaths','journalImageurls','isEdit'])
    const{deleteImage}= useStorage()
    const {updateDocument}= useDocument('journals',props.id)
    const paths= toRaw(props.filePaths)
    const urls= toRaw(props.journalImageurls)

    const handleDelete = async(url)=>{

        // remove the item from paths and urls array
        for(let i=0; i<urls.length;i++){
            if(url== urls[i]){
                await deleteImage(paths[i])
                paths.splice(i,1)
                urls.splice(i,1)
            }
        }

        updateDocument({
            imageUrls: urls,
            filePaths: paths
        })
       
    }

    
   
</script>


<style scoped>
html,
body {
  position: relative;
  height: 100%;
  padding: 0 !important;
  margin: 0 !important;
}
.container {
  overflow: hidden;
}
.item {
  position: absolute;
  width: 100px;
  color: white;
  text-align: center;
}

.item:nth-child(6n + 1) {
  background: #f55;
  height: 200px;
}

.item:nth-child(6n + 2) {
  background: #7e7;
  height: 300px;
}

.item:nth-child(6n + 3) {
  background: #66e;
  height: 200px;
}

.item:nth-child(6n + 4) {
  background: #4af;
  height: 100px;
}

.item:nth-child(6n + 5) {
  background: #ed5;
  height: 150px;
}
.item:nth-child(6n + 6) {
  background: #d5e;
  height: 130px;
}

.image {
  position: relative;
  width: 100%;
  font-size: 0;
}
.image img {
  width: 100%;
}

.title {
  height: 35px;
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
}

.delete {
    position: absolute;
    bottom: 5px;
    right: 5px;
}
@media (prefers-color-scheme: dark) {
  .title {
    color: white;
  }
}

@media (prefers-color-scheme: light) {
  .title {
    color: black;
  }
}
</style>