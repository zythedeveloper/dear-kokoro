<template>
    <div id="moodFrame">
        <!-- <link rel="stylesheet" type="text/css" href="./src/css/mood.css"> -->
        
        <div class="container"> 
            <div class="p !text-emerald-800">What is your mood today?</div>
            <span class="text-sm">{{ feeling }}</span>
            <div class="btn-container">
    
                <div class="btn-row">
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Calm.png" @click="setMood(2, 'calm')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Anxious.png" @click="setMood(1, 'anxious')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Content.png" @click="setMood(3, 'content')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Disturbed.png" @click="setMood(1, 'disturbed')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Doubtful.png" @click="setMood(1, 'doubtful')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
                    
                </div>
    
    
                <div class="btn-row">
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Gloomy.png" @click="setMood(1, 'gloomy')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Happy.png" @click="setMood(3, 'happy')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Irritated.png" @click="setMood(1, 'irritated')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Lonely.png" @click="setMood(1, 'lonely')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Lost.png" @click="setMood(1, 'lost')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                </div>
    
    
                <div class="btn-row">
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Nervous.png" @click="setMood(1, 'nervous')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Offended.png" @click="setMood(1 , 'offended')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Peace.png" @click="setMood(3 , 'peace')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Proud.png" @click="setMood(3 , 'proud')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Relief.png" @click="setMood(3 , 'relief')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                </div>
    
                <div class="btn-row">
                    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Stress.png" @click="setMood(1 , 'stress')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Troubled_.png" @click="setMood(1 , 'troubled')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Frustrated.png" @click="setMood(1 , 'frustrated')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Vengeful.png" @click="setMood(1 , 'vengeful')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
    
                    <div class="btn btn__secondary">
                        <img class="btn__icon" src="../../assets/mood/Worry.png" @click="setMood(1 , 'worry')" alt="Your Image" style="width: 100%; height: 100%;">
                    </div>
                </div>
    
            </div>
        </div>
    </div>
    </template>
    
    <script>
    export default {
        methods: {
            setMood(value,feeling) {
                this.mood = value
                this.feeling = feeling
            },
            getMood() {
                return this.mood
            }
        },
        data () {
            return {
                mood : 1,
                feeling : ""
            }
        }
    }
    </script>
    
    <style scoped>
    @media screen and (min-width: 1000px) {
        html {
            font-size: 75%;
            /* background: var(--greyLight-1); */
    
        }
    }
    
    :root {
        --primary-light: #8abdff;
        --white: #FFFFFF;
        --greyLight-1: #E4EBF5;
        --greyLight-2: #c8d0e7;
        --greyLight-3: #bec8e4;
        --greyDark: #9baacf;
    }
    
    *, *::after {
        margin: 0;
        padding: 0;
        box-sizing: inherit;
    
    }
    
    #moodFrame {
        background-color: #E4EBF5;
    }
    
    .container {
    /* min-height: 100vh; */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-family: 'Poppins', sans-serif;
    background-color: #E4EBF5;
    
    } 
    
    .p {
    margin-top: 30px; 
    font-size: 1.8rem;
    text-align: center; /* Center the text */
    color:#93c3b9;
    font-family: Georgia, 'Times New Roman', Times, serif;
    }
    
    
    .switch { 
    grid-column: 1 / 2;
    display: grid;
    grid-template-columns: repeat(2, min-content);
    grid-gap: 3rem;
    justify-self: center;
    }
    
    .switch input {
    display: none;
    }
    
    .switch__2 {
    width: 6rem;
    }
    
    .switch label {
    display: flex;
    align-items: center;
    width: 100%;
    height: 5rem;
    box-shadow: .3rem .3rem .6rem #c8d0e7, -.2rem -.2rem .5rem #FFFFFF;
    background: rgba(255, 255, 255, 0);
    position: relative;
    cursor: pointer;
    border-radius: 1.6rem;
    }
    
    .switch label::after {
    content: "";
    position: absolute;
    left: .4rem;
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    background-color: #9baacf;
    transition: all .4s ease;
    }
    
    .switch input:checked ~ label::after {
    left: 57%;
    background: #E4EBF5;
    }
    
    .btn {
    width: 8rem;
    height: 4.5rem;
    border-radius: 1rem;
    box-shadow: .3rem .3rem .6rem #c8d0e7, -.2rem -.2rem .5rem #FFFFFF;
    justify-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: .3s ease;
    }
    
    
    .btn__secondary {
    grid-column: 1 / 2;
    /* grid-row: 5 / 6;  */
    color: #9baacf;
    }
    
    .btn__secondary:hover {
    color: var(--primary);
    }
    
    .btn__secondary:active {
    box-shadow: inset .2rem .2rem .5rem #c8d0e7, inset -.2rem -.2rem .5rem #FFFFFF;
    }
    
    .btn-row {
        /* display: flex; */
        justify-content: start;
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: 1rem;
        margin-top: 1rem;
        width:80%;
        gap: 13px;/*button spacing*/
    }
    
    .btn p {
    font-size: 1.6rem;
    }
    </style>