<template>
    <div class="chart-container" style="position: relative;" >
        <canvas ref="sleepFlow"></canvas>
    </div>
</template>

<script>
import { setup } from "../../composables/insights/sleepFlowConfig"

export default {
    props: ['records', 'targetYearMon'],
    mounted: function() {
        const ctx = this.$refs.sleepFlow
        setup(this.records, this.targetYearMon).then((config)=> new Chart(ctx, config))
    }
}
</script>