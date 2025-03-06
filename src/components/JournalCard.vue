<template>
    <div class="gridy-2 gridyhe-1 cursor-pointer" @click="router.push({name:'JournalDetail', params:{id: props.journal.objectID}})">
            <div class="gridimg" :style="{backgroundImage: `url(${journal.coverUrl})`}">&nbsp;</div>

            <div class="gridinfo">
                <h2 class="text-xl md:text-3xl">{{ journal.title }}</h2>
                <div class="gridmeta">
                    <p class="gridwhen"><i class="fa fa-clock-o"></i> {{ journalDate }}</p>
                </div>
                <p class="gridexerpt hidden md:block text-lg">{{ cutString }}... Read more</p>
            </div>
        </div>
</template>

<script setup>
    import getUser from '../composables/getUser'
    import {ref} from 'vue'
    import { useRouter } from 'vue-router'
    const {user} = getUser()

    const props = defineProps(['journal'])
    const cutString= ref(null)
    const journalDate= ref(null)
    const router = useRouter()
    cutString.value = props.journal.description.substring(0, 200)
    journalDate.value= new Date( props.journal.createdAt)
    console.log(props.journal.objectID)
    console.log(props.journal.createdAt)
</script>

<style scoped>

/* ////////main part//////// */

.gridywrap {
    width: 90%;
    margin-top: 5%;
    margin-left: 1%;
}

.gridywrap div[class*=gridy] {
    background: #eee;
    box-shadow: inset 0 0 0 1px #ddd;
    padding: 15px;
    float: left;
    position: relative;
}

.gridywrap .gridy-1,
.gridywrap .gridy-2,
.gridywrap .gridy-3 {
    width: 320px;
    overflow: hidden;
}

.gridywrap .gridy-1 {
    width: 100%;
}

.gridywrap .gridy-2 {
    width: 100%;
}

.gridywrap .gridy-3 {
    width: 100%;
}

.gridywrap .gridyhe-1 {
    height: 320px;
}

.gridywrap .gridyhe-2 {
    height: 320px;
}


/*styling*/

.gridywrap .gridimg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background-position: center center;
    background-size: cover;
}

.gridywrap .gridimg  {
    width: 100%;
}

.gridywrap .gridinfo {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    text-align: center;
    transition: all 0.8s;
}

.gridywrap .gridinfo h2 {
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    margin: 130px 0 20px;
    position: relative;
    font-family: myFont2;
}

.gridywrap .gridinfo h2:after {
    content: '';
    width: 25px;
    border-top: 4px solid #fff;
    display: block;
    margin: 0 auto;
    margin-top: 25px;
}

.gridywrap .gridinfo .gridmeta {
    transition-delay: 0.25s;
}

.gridywrap .gridinfo .gridmeta p {
    display: inline-block;
    color: #fff;
    margin-bottom: 15px;
}

.gridywrap .gridinfo .gridmeta p i {
    margin-right: 5px;
}

.gridywrap .gridinfo .gridmeta p.gridwho {
    margin-left: 25px;
}

.gridywrap .gridinfo p.gridexerpt {
    width: 60%;
    margin: 0 auto;
    line-height: 22px;
    margin-bottom: 25px;
    color: #fff;
    transition-delay: 0.5s;
    font-family: myFont3;
}

.gridywrap .gridinfo * {
    opacity: 0;
    transition: all 0.8s;
}

.gridywrap .gridinfo h2 {
    opacity: 1;
}

.gridywrap .gridinfo .grid-btn {
    color: #fff;
    text-decoration: none;
    margin: 0 auto;
    width: 35px;
    height: 35px;
    line-height: 35px;
    border-radius: 25px;
    border: 1px solid #fff;
    display: block;
    overflow: hidden;
}

.gridywrap .gridinfo .grid-btn:hover {
    width: 75px;
    background: rgba(0, 0, 0, 0.3);
}

.gridywrap .gridinfo .grid-btn span {
    opacity: 0;
    display: none;
    transition: opacity 0.8s;
}

.gridywrap .gridinfo .grid-btn:hover span {
    opacity: 1;
    display: inline;
}

.gridywrap .gridinfo .grid-btn:hover i {
    opacity: 0;
    display: none;
}

.gridywrap .gridinfo:hover * {
    opacity: 0.7;
    font-family: myFont2;
}

.gridywrap .gridinfo:hover p {
    opacity: 1;
}

.gridywrap .gridinfo:hover {
    background: rgba( 63, 126, 43, 0.7);
}

.gridywrap .gridinfo:hover h2 {
    margin-top: 70px;
    opacity: 1;
}


/* /////////////////////////// */
</style>