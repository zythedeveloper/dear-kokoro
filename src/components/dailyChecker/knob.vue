<template>
  <div id="sleepQualityFrame">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Sofia">
      <!-- <link rel="stylesheet" href="./src/css/style.css"> -->
      <link rel="stylesheet" href="./extra/customize-presets.css">
      <link rel="stylesheet" href="./extra/p1.css">

      <p class="text-center text-pink-950">How would you rate your sleep quality?</p>
      <input aria-label="sleep quality" id="p1" class="present1" type="range" data-width="250" data-height="250" data-angleOffset="270" data-angleRange="180" data-labels="1,2,3,4,5" min="0" max="5" @mousemove="handleMouseMove()" @change="handleMouseMove()">
  </div>
</template>

<style scoped>
#sleepQualityFrame {
  width: 800px;
  height: 500px;
  background-color: #f5cfcf;
  font-family: 'Titillium Web', sans-serif;
  color: #574742;
}

h2 {
background: #843434;
color: #fff;
padding: 3px 0 0 10px;
font-family: 'Lekton', sans-serif;
font-style: italic;
}

h3 {
font-family: 'Lekton', sans-serif;
font-style: italic;
color: #843434;
}

p {
padding: 0 0 0 10px;;
}

ul {
list-style: none;
padding: 0;
}

li:not(:first-child) {
border-left: solid 1px #843434;
}
</style>

<script>
export default {
  data() {
      return {
          sleepQuality: 3
      }
  },
  methods: {
      getSleepQuality() {
          return this.sleepQuality
      },
      handleMouseMove() {
          const p1 = document.getElementById('p1');
          this.sleepQuality = parseInt(p1.value) + 1
      }
  },
  mounted() {
      const p1 = document.getElementById('p1');
      new Knob(p1, new Ui.P1());
  }
}
</script>