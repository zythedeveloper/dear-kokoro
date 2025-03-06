<template>
    <div class="chart-container" style="position: relative;" >
        <canvas ref="weatherBar"></canvas>
    </div>
</template>

<script>
import { setup } from "../../composables/insights/weatherBarConfig"

export default {
    props: ['records'],
    mounted: function() {
        const ctx = this.$refs.weatherBar
        setup(this.records).then((config)=> new Chart(ctx, config))
    }
}
</script>