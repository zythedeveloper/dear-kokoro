<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

</script>

<template>
  <Navbar />
  <div class="content" role="article">
    <RouterView />
  </div>
  <Footer/>
</template>

<style>
    .content {
    margin: 0 auto;
    max-width: 1500px;
    padding: 0 20px;
    }
    body{
      background-color: #FFFBF6;
    }
    html,body{
      overflow-x:hidden;
      overflow-x: clip;
    }
    
</style>
