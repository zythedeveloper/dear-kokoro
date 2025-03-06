<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
    <link href='https://unpkg.com/css.gg@2.0.0/icons/css/sun.css' rel='stylesheet'>
    <!-- <link rel="stylesheet" type="text/css" href="./src/css/timePicker.css"> -->
    <div id="timePickerFrame">
        <p>What time did you sleep yesterday and wake up today?</p>
        <div class="time-picker-wrapper">

            <i class="fas fa-moon" style="margin-right: 10px;"></i>

            <!-- First Time Picker -->
            <div class="time-picker time-picker-1">
                <div class="tp-col tp-hr">  
                    <!-- <span class="noselect" tabindex="0">00</span> -->
                    <label for="sleepHours">
                        <input aria-label="sleepHours" type="number" id="sleepHours" value="0" min="0" max="12" oninput="if(parseInt(this.value,10)>12)this.value='12';">
                    </label>
                </div>
                <div class="tp-col">
                    <span>:</span>
                </div>
                <div class="tp-col tp-min">
                    <!-- <span tabindex="0">00</span> -->
                    <label for="sleepMinutes">
                        <input aria-label="sleepMinutes" type="number" id="sleepMinutes" value="00" min="00" max="30" step="30" oninput="(parseInt(this.value,10)>0)?this.value='30':this.value='00';">
                    </label>
                </div>
                <div class="tp-col">
                    <span id="sleepPrefix" class="tp-am-pm !text-emerald-800" ref="sleepPrefix" @click="handlePrefix(1)">PM</span>
                </div>
            </div>

            <span class="to-text">To</span>

            <i class="gg-sun">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                    <circle cx="50%" cy="50%" r="6" fill="#1d9462" />
                </svg>
            </i>
            
            <!-- Second Time Picker -->
            <div class="time-picker time-picker-2">
                <div class="tp-col tp-hr">  
                    <!-- <span class="noselect" tabindex="0">00</span> -->
                    <label for="wakeHours">
                        <input aria-label="wakeHours" type="number" id="wakeHours" value="0" min="0" max="12" oninput="if(parseInt(this.value,10)>12)this.value='12';">
                    </label>
                </div>
                <div class="tp-col">
                    <span>:</span>
                </div>
                <div class="tp-col tp-min">
                    <!-- <span tabindex="0">00</span> -->
                    <label for="wakeMinutes">
                        <input aria-label="wakeMinutes" type="number" id="wakeMinutes" value="00" min="00" max="30" step="30" oninput="(parseInt(this.value,10)>0)?this.value='30':this.value='00';">
                    </label>
                </div>
                <div class="tp-col">
                    <span id="wakePrefix" class="tp-am-pm !text-emerald-800" ref="wakePrefix" @click="handlePrefix(2)">AM</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    methods: {
        getSleepWakeTime() {
            const sleepPrefix = document.getElementById('sleepPrefix').innerHTML
            const sleepHours = () => {
                let hrs = document.getElementById('sleepHours').value
                hrs = (sleepPrefix == 'AM') ? hrs : (parseInt(hrs)+12).toString()
                return (hrs.length < 2) ? '0' + hrs : hrs
            }
            const sleepMinutes = document.getElementById('sleepMinutes').value

            const wakePrefix = document.getElementById('wakePrefix').innerHTML
            const wakeHours = () => {
                let hrs = document.getElementById('wakeHours').value
                hrs = (wakePrefix == 'AM') ? hrs : (parseInt(hrs)+12).toString()
                return (hrs.length < 2) ? '0' + hrs : hrs
            }
            const wakeMinutes = document.getElementById('wakeMinutes').value
            return { sleepTime: sleepHours() + sleepMinutes, wakeTime: wakeHours() + wakeMinutes }
        },
        handlePrefix(value) {
            if(value == 1){
                (this.$refs.sleepPrefix.innerHTML == 'AM') ? this.$refs.sleepPrefix.innerHTML='PM' : this.$refs.sleepPrefix.innerHTML='AM';
            } else {
                (this.$refs.wakePrefix.innerHTML == 'AM') ? this.$refs.wakePrefix.innerHTML='PM' : this.$refs.wakePrefix.innerHTML='AM';
            }
        }
    },
    mounted() {}
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');
#timePickerFrame {
  font-family: 'Poppins', sans-serif;
  height: 500px;
  padding:50px;
  font-size:16pt;
  background-color: #e9f5e7;
}
.noselect {
    -khtml-user-select: none; /* Konqueror HTML */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}
.time-picker {
  display:flex;
  align-items:center;
  margin:0 auto;
  width:10.75em;
  height:3.25em; /*border size change*/
  justify-content:space-evenly;
  border:3px solid #b8e0cf;
  border-radius:30px; /*curve rect*/
  padding:25px;
}
.tp-col {
  display:flex;
  flex-direction:column;
  align-items: inherit;
  
}
.tp-hr>span,.tp-min>span {
  border:2px solid #b8e0cf;
  padding:8px 8px ;
  border-radius:4px;
  width:25px;
  text-align:center;
  font-size:18pt;
}

.tp-am-pm {
  cursor:pointer;
  display:block;
  padding:1px 3px;
  border-radius:5px;
}
.tp-am-pm:hover {
  background:#eaeaea;
}

.time-picker-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 40px; /*height*/
    color:#1d9462
    }

.time-picker {
    margin: 0 30px; /* space between time pickers */
}
.to-text {
    margin: 0 12px;
    align-self: center;
    font-size: larger;
    color: #1d9462;
    
}
.gg-sun svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

p {
  font-family: Comic Sans ms, cursive;
  /* position: absolute; */
  top: 20px;
  left: 0;
  margin: 20px; 
  color:#1d9462;
  font-size: 30px;
}

input {
    width: 3em;
    height: 2em;
    border: 2px solid #b8e0cf;
    border-radius: 5px;
    box-sizing: border-box;
    padding: auto 15px;
    text-align: center;
    color: #1d9462;
    background-color: #e9f5e7;
    font-size: 25px
  }
</style>