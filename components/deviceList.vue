<template>
  <div>
      <div class="deviceList" >
            <div class="deviceListing title">
                Your Devices
            </div>
            <div class="deviceListing" v-for="device in $store.state.deviceList" :key="device.deviceId" v-on:click="select(device)">
                <div class="deviceIcon" v-if="device.deviceName.includes('Bulb')"><font-awesome-icon  icon="lightbulb" /></div>
                <div class="deviceIcon" v-if="device.deviceName.includes('Plug')"><font-awesome-icon  icon="plug" /></div>
                <div class="name">{{device.alias}}</div>
            </div>
            
        </div>
  </div>
</template>
<script>
export default {
    data:function(){
        return {deviceList:[],selected:{}}
    },
    methods: {
        async select(device){
            let model =device.deviceModel.split('(')[0];
            let alias = device.alias;
            let state = this.$store.state;
            switch(model){
                case 'HS100':
                    this.$store.commit('select', state.TPLink.getHS100(alias));
                    break;
                case 'LB100':
                    this.$store.commit('select', state.TPLink.getLB100(alias));
                    break;
            }
            }
        }
}
</script>
<style scoped>
    .deviceList{
        position: absolute;
        width:40%;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        background-color:white;
        margin-left:1em;
        border-radius: 3px;
    }
    .title{
        border-bottom: solid rgb(230,230,230) 2px;
    }
    .deviceListing{
        font-size:2em;
        display:flex;
        padding:5px;
        transition:ease 0.3s all;
    }
    .deviceListing:hover{
        background-color:rgb(230,230,230);
        cursor: pointer;
    }
    .deviceListing *{
        margin-right:5px;
    }
</style>


