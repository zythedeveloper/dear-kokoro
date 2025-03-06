<template>
    <div class="chart-container" style="position: relative;" >
        <canvas ref="weatherFlow"></canvas>
    </div>
</template>

<script>
import { setup } from "../../composables/insights/weatherFlowConfig"

export default {
    props: ['records', 'targetYearMon'],
    mounted: function() {
        const ctx = this.$refs.weatherFlow;
        setup(this.records, this.targetYearMon).then((config)=> new Chart(ctx, config))
    }
}
</script>