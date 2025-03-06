<template>
    <main>
        <div class="intro bg-[url('../assets/agile_header-1.png')]">
            <div class="slideshow_container">
                <img class="slideshow_image xl:w-3/5" src="../assets/5.png" alt="banner-image-1">
                <img class="slideshow_image2 w-2/4 lg:w-1/4 lg:left-1/4  xl:w-1/4 xl:left-1/4" src="../assets/background_header.png" alt="banner-image-2">
                <img class="slideshow_image3 top-2/4 w-2/4 left-2/3 md:left-2/4  xl:w-1/4 xl:left-2/4" src="../assets/background_header2.png" alt="banner-image-3">
            </div>
            <div class="header_intro text-center text-xl lg:text-2xl font-semibold py-2 my-2 bg-white/75">
                <h1>
                    Ever think of writing a letter to yourself,
                    <br> Here is a place where you can find the true you!
                </h1>
                <router-link :to="{name:'CreateJournal'}">
                    <Button size="lg" gradient="teal-lime" pill class="font-semibold py-3 my-3">Create Journal</Button>
                </router-link>
            </div>
        </div>
        <div class="md:flex md:flex-row">
            <div class="basis-1/2">
                <img src="../assets/questionnaire2.png" alt="daily checker image">
            </div>
            <div class="basis-1/2 flex flex-col text-center justify-center">
                <h2 class="text-lg lg:text-2xl font-semibold my-2 py-2">Daily Checker</h2>
                <p class="lg:text-lg my-2 py-2"> "Welcome to your Daily Mood Check! Are you ready to start each day with a fun and insightful journey into your emotional world? Our daily checker is here to accompany you on this exciting adventure. Get ready to check in, reflect, and discover the power
                    of self-awareness as we navigate the highs and lows of your emotional landscape together!"</p>
                <router-link :to="{name:'DailyChecker'}">
                    <Button size="lg" gradient="pink-orange" pill class="font-semibold py-3 my-3">Check in</Button>
                </router-link>
            </div>
        </div>
        <div class="md:flex md:flex-row md:flex-row-reverse">
            <div class="basis-1/2">
                <img src="../assets/analysistracker2.png" alt="Analysis Tracker image">
            </div>
            <div class="basis-1/2 flex flex-col text-center justify-center">
                <h2 class="text-lg lg:text-2xl font-semibold my-2 py-2">Analysis Tracker</h2>
                <p class="lg:text-lg my-2 py-2"> "Welcome to the world of emotional intelligence! Are you ready to uncover the hidden depths of your emotions? Through a series of thought-provoking questions, we'll unravel the mysteries of your emotional landscape and provide valuable insights into your
                            depression levels. Get ready to dive deep and conquer the emotional rollercoaster with us!"</p>
                <div>
                    <router-link :to="{name:'Insights'}">
                        <Button gradient="purple-pink" size="lg" pill class="font-semibold py-3 my-3">View Insights</Button>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="md:flex md:flex-row">
            <div class="basis-1/2">
                <img src="../assets/journal2.png" alt="journal image">
            </div>
            <div class="basis-1/2 flex flex-col text-center justify-center">
                <h2 class="text-lg lg:text-2xl font-semibold my-2 py-2">Journal</h2>
                <p class="lg:text-lg my-2 py-2"> "Welcome to the vibrant world of journaling! Unleash your creativity, organize your thoughts, and embark on a journey of self-discovery with our fantastic journal function. Our journal function is your ultimate companion. Let's dive in and unlock the
                            power of journaling together!"</p>
                <div>
                    <router-link :to="{name:'CreateJournal'}">
                    <Button size="lg" gradient="teal-lime" pill class="font-semibold py-3 my-3">Create Journal</Button>
                </router-link>
                </div>
            </div>
        </div>
        <div class="md:flex md:flex-row md:flex-row-reverse">
            <div class="max-w-xl m-auto basis-1/2">
                <img src="../assets/dailyquote2.png" alt="Daily quote image">
            </div>
            <div class="flex flex-col text-center justify-center basis-1/2">
                <h2 class="text-lg lg:text-2xl font-semibold my-2 py-2">Daily Quote</h2>
                <p class="lg:text-lg my-2 py-2"> "Welcome to your Daily Dose of Inspiration! Are you ready to start each day on a positive note and uplift your spirits? Our daily quote feature is here to sprinkle a little magic into your day. Get ready to be inspired, motivated, and enchanted as we
                            serve you a fresh dose of wisdom, joy, and hope to brighten your path!"</p>
                <router-link :to="{name:'Quote'}">
                    <Button size="lg" gradient="red-yellow" pill class="font-semibold py-3 my-3">Get motivated</Button>
                </router-link>
            </div>
        </div>
        <div class="md:flex md:flex-row">
            <div class="basis-1/2">
                <img src="../assets/AI_Chat_Artwork.png" alt="AI Chatbot image">
            </div>
            <div class="basis-1/2 flex flex-col text-center justify-end">
                <h2 class="text-lg lg:text-2xl font-semibold my-2 py-2">AI Therapist Chatbot</h2>
                <p class="lg:text-lg my-2 py-2"> Welcome to Our AI Therapist Chatbot, your 24/7 companion for emotional support and well-being. Step into a world of emotional well-being and support. Our AI Therapist Chatbot is your friendly companion on your journey to better mental health. Share your thoughts and feelings, and let's work together towards a healthier and happier you.</p>
                <div>
                    <router-link :to="{name:'ChatBot'}">
                        <Button size="lg" gradient="purple-blue" pill class="font-semibold py-3 my-3">Chat Now </Button>
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { Button } from 'flowbite-vue'
</script>

<style scoped>
    img{
  margin-left: auto;
  margin-right: auto;
}
    div .slideshow_container {
    position: relative;
    height: auto;
    display: block;
    z-index: 1000;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}

.slideshow_image {
    border-radius: 12% / 50%;
    background: none;
}

.slideshow_image2 {
    position: absolute;
    display: block;
    top: 0%;
}

.slideshow_image3 {
    position: absolute;
    display: block;
    transform: rotate(45deg);
}
.intro{
    background-position: center;
    background-repeat: repeat;
    width: 100%;
    display: block;
    top: 130px;
    background-size: 25%;
}
</style>