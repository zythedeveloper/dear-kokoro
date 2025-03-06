<template>
    <div class="chart-container" style="position: relative;" >
        <canvas ref="sleepGrade"></canvas>
    </div>
</template>

<script>
import { setup } from "../../composables/insights/sleepGradeConfig"

export default {
    props: ['records'],
    mounted: function() {
        const ctx = this.$refs.sleepGrade;
        setup(this.records).then( (config) => new Chart(ctx, config) )
    }
}
</script>