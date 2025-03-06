<template>
    <div class="chart-container" style="position: relative;" >
        <canvas ref="moodFlow"></canvas>
    </div>
</template>

<script>
import { setup } from "../../composables/insights/moodFlowConfig"

export default {
    props: ['records', 'targetYearMon'],
    data() {
        return { chart: null}
    },
    mounted: function() {
        const ctx = this.$refs.moodFlow
        setup(this.records, this.targetYearMon).then((config)=> new Chart(ctx, config))
    },
    
}
</script>