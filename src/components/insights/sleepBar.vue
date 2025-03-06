<template>
    <div class="chart-container" style="position: relative;" >
        <canvas ref="sleepBar"></canvas>
    </div>
</template>

<script>
import { setup } from "../../composables/insights/sleepBarConfig"

export default {
    props: ['records', 'targetYearMon'],
    mounted: function() {
        const ctx = this.$refs.sleepBar
        setup(this.records, this.targetYearMon).then((config)=> new Chart(ctx, config))
    }
}
</script>