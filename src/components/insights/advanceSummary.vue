<template>
    <div class="chart-container" style="position: relative;" >
        <canvas ref="advanceSummary"></canvas>
        <div class="m-auto">
            <Button @click="this.changeMode" color="purple">switch</button>
        </div>
    </div>
</template>

<script>
import { setup } from "../../composables/insights/advanceSummaryConfig"
import { Button } from 'flowbite-vue'

export default {
    components: {
        Button
    },
    props: ['records'],
    data() {
        return {
            mode: false,
            chart: null
        }
    },
    methods: {
        changeMode() {
            this.mode = !this.mode
            const ctx = this.$refs.advanceSummary;
            this.chart.destroy()
            setup(this.records, this.mode).then((config) => this.chart = new Chart(ctx, config))
        }
    },
    mounted: function() {
        const ctx = this.$refs.advanceSummary;
        setup(this.records, this.mode).then((config) => this.chart = new Chart(ctx, config))
    }
}
</script>