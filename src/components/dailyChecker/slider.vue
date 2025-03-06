<template>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Audiowide">
    <div id="expectedSleepHoursFrame" class="bg-sky-800">
        <p>How many hours do you expected to sleep tonight?</p>
        <div class="container">
            <label for="range" id="rangeValue" ref="rangeValue">{{ (this.expectedHours)? this.expectedHours : 12 }}</label>
            <input id="range" v-model="hours" type="range" ref="range" name="range" min="0" max="24" @mousemove="handleMouseMove(hours)" @change="handleMouseMove(hours)"/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            expectedHours: 0
        }
    },
    methods: {
        handleMouseMove(value) {
            this.expectedHours = value
        },
        getExpectedSleepHours() {
            return this.expectedHours
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Monoton');
#expectedSleepHoursFrame {
    width: 800px;
    height: 500px;
}
.container{
    display: flex;
    margin-top: 100px;
    align-items: center;
    flex-direction: column;
}
.fillArea{
    width: 100vw;
    height: 100vh;
    background: #E7E8ED;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    pointer-events: none;
    /* box-shadow: 3px 3px 5px -1px; */
}
label{
    font-size: 8rem;
    position: static;
    z-index: 1;
    color: #92afd1;
    margin: -3rem 0 2rem; /*height*/
    font-family: "Monoton"
}

label::after{
    content: 'hrs';
    font-size: 4rem;
}
input[type=range]{
    position: static;
    z-index: 2;
    width: 600px;
    height: 1rem;
    background: rgba(214, 224, 236, 1);
    appearance: none;
    border: none;
    outline: #0f0b00;
    border-radius: 0.5rem;
    box-shadow: inset 3px 3px 5px -1px #4779b3;
}
input[type=range]::-webkit-slider-thumb{
    width: 50px;
    height: 50px;
    background: #eee;
    appearance: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 5px 5px 8px -1px #000;
    transition: box-shadow 0.3s ease-in-out;
}

p { 
    font-family: "Audiowide", sans-serif;
    color: rgb(172, 197, 224); 
    font-size: 35px;
    text-align: center;
    }
</style>