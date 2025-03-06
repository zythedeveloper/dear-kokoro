<template>
    <div class="chart-container" style="position: relative;" >
        <canvas ref="moodBar"></canvas>
    </div>
</template>

<script>
import { setup } from "../../composables/insights/moodBarConfig"

export default {
    props: ['records'],
    mounted: function() {
        const ctx = this.$refs.moodBar
        setup(this.records).then((config)=> new Chart(ctx, config))
    }
}
</script>