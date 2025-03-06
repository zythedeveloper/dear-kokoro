<template>
    <div id="moodAttendance"></div>
</template>

<script>
import CalHeatmap from "cal-heatmap";
import Legend from 'cal-heatmap/plugins/Legend'
import { setup } from "../../composables/insights/moodAttendanceConfig";
import 'cal-heatmap/cal-heatmap.css';

    export default {
    props: ['records'],
    mounted: function() {
        const cal = new CalHeatmap();
        setup(this.records).then( (config) => cal.paint( config, 
            [
                [
                    Legend,
                    {
                        enabled: true,
                        width: 250,
                        itemSelector: '#moodAttendance',
                        label: 'mood',
                        includeBlank: true
                    }
                ]
            ] 
        ) )
    }
}
</script>

<style>
.ch-domain-text {
    font-size: 1.75em !important;
}

.ch-subdomain-text {
    font-size: 1.25em !important;
}
</style>