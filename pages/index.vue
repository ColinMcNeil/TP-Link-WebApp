<template>
<div>
    <loginheader/>
    
    <div class="controls">
        <device-list/>
        <deviceControl v-if="$store.state.selected.device" />
        
        
    </div>
    

</div>

</template>
<script>
    import Vue from 'vue'
    import loginheader from '../components/header'
    import deviceList from '../components/deviceList'
    import deviceControl from '../components/deviceControl'
    export default {
        authenticated:true,
        components:{loginheader, deviceList,deviceControl},
        methods: {

        }
    }
</script> 
<style>
html,body{
        margin: 0;
        background-color: #e2e1e0;
        width: 100%;
        height: 100%;
    }
</style>
<style scoped>
    .controls{
        width:100%;
        margin-top:3em;
        position: absolute;
        padding-top:3em;
        display:flex;
    }



    
</style>
