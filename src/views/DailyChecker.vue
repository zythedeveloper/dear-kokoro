<script setup>
    import Knob from '../components/dailyChecker/knob.vue'
    import Mood from '../components/dailyChecker/mood.vue'
    import Slider from '../components/dailyChecker/slider.vue'
    import TimePicker from '../components/dailyChecker/timePicker.vue'
    import Weather from '../components/dailyChecker/weather.vue'
    import { ref, onMounted } from 'vue'
    import { handleSubmit } from '../composables/dailyChecker/handleSubmit'
    import getUser from '@/composables/getUser'
    import { useRouter } from 'vue-router'
    // const parentComponent = new Vue({
    //     el: '#app',
    //     components: {
    //         'Knob': Knob,
    //         'Mood': Mood,
    //         'Slider': Slider,
    //         'TimePicker': TimePicker,
    //         'Weather': Weather
    //     }
    // })
    const KnobRef = ref(null)
    const MoodRef = ref(null)
    const SliderRef = ref(null)
    const TimePickerRef = ref(null)
    const WeatherRef = ref(null)
    const {user}= getUser()
    const router = useRouter()

    onMounted(() => {
        const slider = document.querySelector('.slider');
        const sliderList = slider.querySelector('.slider-list');
        const sliderItems = slider.querySelectorAll('.slider-item');
        const sliderNav = slider.querySelector('.slider-nav');
        const sliderNavItems = slider.querySelectorAll('.slider-nav-item');
        const sliderPrev = slider.querySelector('.slider-prev');
        const sliderNext = slider.querySelector('.slider-next');

        var currentIndex = 0;
        var timer = null;


        function init() {

        sliderList.style.width = sliderItems.length * 100 + '%';

        for (var i = 0; i < sliderItems.length; i++) {
            sliderItems[i].style.width = 100 / sliderItems.length + '%';
        }

        sliderNav.addEventListener('click', handleNavClick);
        sliderPrev.addEventListener('click', handlePrevClick);
        sliderNext.addEventListener('click', handleNextClick);

        sliderList.addEventListener('click', function() {
                    stopAutoPlay();
                });
        // startAutoPlay();
        }

        function handleNavClick(event) {
        if (event.target.classList.contains('slider-nav-item')) {
            var index = Array.prototype.indexOf.call(sliderNavItems, event.target);
            goToSlide(index);
        }
        }

        function handlePrevClick(event) {
        goToSlide(currentIndex - 1);
        }

        function handleNextClick(event) {
        goToSlide(currentIndex + 1);
        }

        function goToSlide(index) {
        if (index < 0) {
            index = sliderItems.length - 1;
        } else if (index >= sliderItems.length) {
            index = 0;
        }
        currentIndex = index;
        sliderList.style.transform = 'translateX(-' + currentIndex * 100 / sliderItems.length + '%)';
        updateNav();
        }

        function updateNav() {
        for (var i = 0; i < sliderNavItems.length; i++) {
            if (i === currentIndex) {
            sliderNavItems[i].classList.add('active');
            } else {
            sliderNavItems[i].classList.remove('active');
            }
        }
        }

        function startAutoPlay() {
        timer = setInterval(function() {
            goToSlide(currentIndex + 1);
        }, 10000);
        }

        function stopAutoPlay() {
        clearInterval(timer);
        timer = null;
        }

        init()
    })
    const handleFinishEvent = () => {
        const obj = {
            sleepQuality: parseInt(KnobRef.value.getSleepQuality()),
            mood: MoodRef.value.getMood(),
            expectedSleepHour: SliderRef.value.getExpectedSleepHours(),
            weather: WeatherRef.value.getWeather(),
            sleepTime: TimePickerRef.value.getSleepWakeTime().sleepTime,
            wakeTime: TimePickerRef.value.getSleepWakeTime().wakeTime,
        }
        handleSubmit(obj,user.value.uid)
        router.push('/insights')
    }
    
</script>

<template>
    <link defer rel="stylesheet" type="text/css" href="/extra/cards.css">
    <link defer rel="stylesheet" type="text/css" href="/extra/q&a.css">
    <div role="main">
    <h1 class="text-center text-4xl p-2 m-2">Daily Checker</h1>
    <div class="slider m-auto overflow-x-scroll">
    <ul class="slider-list">
        <li class="slider-item">
            <Knob ref="KnobRef"></Knob>
        </li>
        <li class="slider-item">
            <Mood ref="MoodRef"></Mood>
        </li>
        <li class="slider-item">
            <Slider ref="SliderRef"></Slider>
        </li>
        <li class="slider-item">
            <TimePicker ref="TimePickerRef"></TimePicker>
        </li>
        <li class="slider-item">
            <Weather @handleFinishBtn="handleFinishEvent" ref="WeatherRef"></Weather>
        </li>
    </ul>
    <div class="slider-nav">
        <span class="slider-nav-item active"></span>
        <span class="slider-nav-item"></span>
        <span class="slider-nav-item"></span>
        <span class="slider-nav-item"></span>
        <span class="slider-nav-item"></span>
    </div>
        <a href="#" class="slider-prev" style="display: none">&lt;</a>
        <a href="#" class="slider-next" style="display: none">></a>
    </div>
</div>
</template>

<style scoped>
#sleepQualityFrame {
    width: 800px;
    height: 500px;
    border: none;
    overflow: hidden
}

#moodFrame {
    width: 800px;
    height: 500px;
    border: none;
    overflow: hidden 
}

#expectedSleepHoursFrame {
    width: 800px;
    height: 500px;
    border: none;
    overflow: hidden;
    display: flex; 
    align-items: center;
}

#timePickerFrame {
    width: 800px;
    height: 500px;
    border: none;
    overflow: hidden
}

#weatherFrame {
    transform: scale(1, 1);
    width: 800px;
    height: 500px;
    border: none;
    overflow: hidden;
}
</style>
