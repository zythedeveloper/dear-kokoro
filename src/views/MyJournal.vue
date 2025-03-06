<template>
    <main>
    <h1 class="text-center text-3xl p-2 m-2 font-bold">My Journals</h1>
    <Suspense>
      <template #default>
        <searchKey/>
      </template>
      <template #fallback>
        <p class="text-2xl text-center">Loading please wait for few seconds..</p>
      </template>
      
    </Suspense>

  </main>
</template>

<script setup>
import searchKey from "../components/searchKey.vue";
</script>


<style scoped>

@font-face {
        font-family: myFont2;
        src: url(../../public/fonts/Like-Eat.otf) format('opentype');
    }

    @font-face {
        font-family: myFont3;
        src: url(../../public/fonts/nana.ttf) format('truetype');
    }
    body{
        font-family: myFont3;
    }
</style>