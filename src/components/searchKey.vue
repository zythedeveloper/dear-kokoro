<script setup>
import getSearchKey from "../composables/search"
import algoliasearch from 'algoliasearch/lite';
import { AisInstantSearch, AisSearchBox } from 'vue-instantsearch/vue3/es';
import { ref,watch } from "vue";
import getUser from '../composables/getUser'
import JournalCard from "./JournalCard.vue";

const {user} = getUser()
const {searchClient} = await getSearchKey(user.value.uid);


</script>

<template>
    <ais-instant-search :search-client="searchClient" index-name="journals">
    <ais-search-box/>
    <ais-hits class="gridywrap" >
            <template v-slot:item="{ item }">
                <JournalCard v-if="item" :journal="item"/>
            </template>
    </ais-hits>
  </ais-instant-search>
</template>

<style>

.ais-Hits-item{
    box-shadow:none !important;
    background-color: #FFFBF6 !important;
   
}   
/* ////////main part//////// */

.gridywrap {
    margin-top: 5%;
    margin: auto
}

.gridywrap div[class*=gridy] {
    background: #eee;
    box-shadow: inset 0 0 0 1px #ddd;
    position: relative;
}



</style>