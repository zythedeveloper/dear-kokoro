<template>
    <p v-if="!isReady">Loading...</p>
    <div v-else role="main">
        <h1 class="text-center text-3xl p-2 m-2">Insights</h1>
        <!-- Filter -->
        <filterYearMon @filterYearMon="handleFilter"></filterYearMon>
        
        <!-- wordCloud-->
        <section>
            <div class="flex flex-col m-auto py-2 my-2">
                <h2>Monthy WordCloud</h2>
                <div class="cloudcontainer">
                    <wordCloud id="wordCloud" :words="words" :targetYearMon="targetYearMon"></wordCloud>
                </div>
            </div>
        </section>

        <!-- Sleep Quality -->
        <section>
            <div class="py-2 my-2">
                <h2>Sleep</h2>
                <div class="flex flex-col md:flex-row justify-center">
                    <div class="basis-1/2 py-2 my-2">
                        <sleepFlow id="sleepFlow" :records="records" :targetYearMon="targetYearMon"></sleepFlow>
                    </div>
                    <div class="basis-1/2 overflow-x-scroll py-2 my-2">
                        <sleepHoursInfo class="w-full h-full" id="sleepHoursInfo" :records="records"></sleepHoursInfo>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row py-2 my-2">
                    <div class="md:basis-1/2 py-2 my-2">
                        <sleepGrade id="sleepGrade" :records="records"></sleepGrade>
                    </div>
                    <div class="md:basis-1/2 py-2 my-2">
                        <sleepBar id="sleepBar" :records="records" :targetYearMon="targetYearMon"></sleepBar>
                    </div>
                </div>
            </div>
        </section>


        <!-- Attendance -->
        <section>
            <div class="flex flex-col">
                <h2>Attendance</h2>
                <div class="flex md:flex-row flex-col md:flex-wrap m-auto attendance-container m-4 p-4 md:w-full justify-center">
                    <moodAttendance  id="moodAttendance" :records="records"></moodAttendance>
                    <sleepQualityAttendance  id="sleepQualityAttendance" :records="records"></sleepQualityAttendance>
                    <weatherAttendance  id="weatherAttendance" :records="records"></weatherAttendance>
                </div>
            </div>
        </section>
        

        <!-- Mood & Weather -->
        <section>
            <div class="flex flex-col  lg:flex-row  m-auto justify-center py-2 my-2">
                    <!-- Mood -->
                    <div class="flex-col basis-1/2">
                        <h2>Mood</h2>
                        <moodFlow  id="moodFlow" :records="records" :targetYearMon="targetYearMon"></moodFlow>
                        <moodBar  id="moodBar" :records="records"></moodBar>
                    </div>
                    <!-- Weather -->
                    <div class="flex-col basis-1/2">
                        <h2>Weather</h2>
                        <weatherFlow id="weatherFlow" :records="records" :targetYearMon="targetYearMon"></weatherFlow>
                        <weatherBar  id="weatherBar" :records="records"></weatherBar>
                    </div>
            </div>
        </section>
        
        <!-- Advance Analysis -->
        <section>
            <div class="container">
                <h2>Advance</h2>
                <advanceSummary id="advanceSummary" :records="records"></advanceSummary>
            </div>
        </section>
    </div>
</template>

<script setup>
    import moodFlow from '../components/insights/moodFlow.vue'
    import moodBar from '../components/insights/moodBar.vue'
    import moodAttendance from '../components/insights/moodAttendance.vue'
    import sleepQualityAttendance from '../components/insights/sleepQualityAttendance.vue'
    import sleepBar from '../components/insights/sleepBar.vue'
    import sleepGrade from '../components/insights/sleepGrade.vue'
    import sleepFlow from '../components/insights/sleepFlow.vue'
    import sleepHoursInfo from '../components/insights/sleepHoursInfo.vue'
    import wordCloud from '../components/insights/wordcloud.vue'
    import weatherFlow from '../components/insights/weatherFlow.vue'
    import weatherBar from '../components/insights/weatherBar.vue'
    import weatherAttendance from '../components/insights/weatherAttendance.vue'
    import advanceSummary from '../components/insights/advanceSummary.vue'
    import filterYearMon from '../components/insights/filter.vue'
    import { getCollection, getSentimentalWords }  from '../composables/getDailyTrackerCollection'
    import getUser from '@/composables/getUser'
    import { ref } from 'vue'

    let records = ref(null);
    let words = ref(null)
    let isReady = ref(false);
    let targetYearMon = ref(null)
    const {user} = getUser()

    getSentimentalWords(user.value.uid)
    .then((w) => { return initializeWord(w) })

    getCollection(user.value.uid)
    .then((r) => { return initializeData(r) })
    .then((isLoading) => { if (!isLoading) isReady.value = true })
    
    const initializeWord = (w) => {
        return new Promise( (resolve) => {
            words.value = w
            if (records) resolve(false)
        })
    }

    const initializeData = (r) => {
        return new Promise( (resolve) => {
            records.value = r
            if (records) resolve(false)
        })
    }

    const handleFilter = (yearMon) => {
        isReady.value = false;
        targetYearMon.value = yearMon

        getSentimentalWords(user.value.uid, new Date(targetYearMon.value))
        .then((w) => { return initializeWord(w) })

        getCollection(user.value.uid, new Date(targetYearMon.value))
        .then((r) => { return initializeData(r) })
        .then((isLoading) => { if (!isLoading) isReady.value = true })
    }
</script>

<style scoped>

.attendance-container{
    border: 2.5px solid #c7c4c4;
    background-color: rgb(245, 247, 252);
}
#wordCloud {
    width: 100%;
    height: 400px;
    border: 2.5px solid #c7c4c4;
    background-color: rgb(245, 247, 252);
}

#advanceSummary {
    /* width: 925px; */
    border: 2.5px solid #c7c4c4;
    padding: 5px 5px;
    background-color: rgb(245, 247, 252);
}

#moodFlow, #weatherFlow {
    /* width: 450px; */
    border: 2.5px solid #c7c4c4;
    padding: 5px 5px;
    margin-bottom: 5px;
    width:95%;
    background-color: rgb(245, 247, 252);
}

#moodBar, #weatherBar {
    /* width: 450px; */
    border: 2.5px solid #c7c4c4;
    padding: 5px 5px;
    width:95%;
    background-color: rgb(245, 247, 252);
}

#moodAttendance, #sleepQualityAttendance, #weatherAttendance {
    /* width: 1010px; */
    margin: 5px 40px;
    /* background-color: rgb(249, 239, 254); */
    background-color: rgb(245, 247, 252);
}


#sleepBar {
    /* width: 600px; */
    border: 2.5px solid #c7c4c4;
    background-color: rgb(245, 247, 252);
    padding: 5px 5px;
    width:95%
}

#sleepGrade {
    /* width: 300px; */
    border: 2.5px solid #c7c4c4;
    background-color: rgb(245, 247, 252);
    padding: 5px 5px;
    padding-top: 12.5px;
    width:95%
}

#sleepFlow {
    /* width: 500px; */
    border: 2.5px solid #c7c4c4;
    padding: 5px 5px;
    width:95%;
    background-color: rgb(245, 247, 252);
}

#sleepHoursInfo {
    border: 2.5px solid #c7c4c4;
    padding: 0px 2.5px;
    background-color: rgb(245, 247, 252);
}
</style>
