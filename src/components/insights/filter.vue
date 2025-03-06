<template>
    <label for="targetYearMon">Specific Date:</label>
    <input type="date" ref="targetYearMon" id="targetYearMon" name="targetYearMon">
    <Button color="default" @click="this.getYearMon" class="p-2 m-2" >Select</button>
</template>

<script>
import { Button } from 'flowbite-vue'
export default {
    components: {
    Button
  },
    methods: {
        getYearMon() {
            const yearMon = this.$refs.targetYearMon.value
            this.$emit("filterYearMon", yearMon)
        }
    },
    mounted: function() {
        
    }
}
</script>