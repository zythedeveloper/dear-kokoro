<template>
    <div id="myDataViz" ref="myDataViz"></div>
</template>

<script>
import { generateLayout } from '../../composables/insights/wordcloudConfig';

export default {
    props: ['words', 'targetYearMon'],
    data() {
        return {
            elementWidth: 0,
            elementHeight: 0
        }
    }, 
    methods: {
        updateElementDimensions() {
            const element = this.$refs.myDataViz
            this.elementWidth = element.offsetWidth
            this.elementHeight = element.offsetHeight

            generateLayout(this.words, this.elementWidth, this.elementHeight).then()
        }
    }, 
    beforeDestroy() {
        window.removeEventListener('resize', this.updateElementDimensions);
    },
    mounted: function() {
        this.updateElementDimensions()
        window.addEventListener('resize', this.updateElementDimensions);
    }
}
</script>