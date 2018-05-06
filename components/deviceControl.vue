<template>
  <div>
      <div class="device">
            <div class="header">
                <div class="deviceIcon" v-if="state.type.type==='plug'"><font-awesome-icon  icon="plug" /></div>
                <div class="deviceIcon" v-if="state.type.type==='bulb'"><font-awesome-icon  icon="lightbulb" /></div>
                <h1>{{state.selected.device.alias}}</h1>
                
            </div>
            <div class="control" v-if="state.type.model==='LB100'">
                <p>LB100 Smart Bulb</p>
                <input type="range" min="1" max="100" value="50" class="brightness" id="myRange" v-model="brightness">
                <div class="setContainer">
                    <div v-if="!on" class="offOn on"  v-on:click="turnOn">turn on</div>
                    <div v-if="on" class="offOn off"  v-on:click="turnOff">turn off</div>
                    <div class="setBrightness" v-bind:style="{backgroundColor:getBackgroundColor()}" v-on:click="setBrightness">Set Brightness to {{brightness}}</div>
                </div>
            </div>
            <div class="control" v-if="state.type.model==='LB130'">
                <p>LB130 Smart Bulb</p>
                <div class="setContainer">
                    <div v-if="!on" class="offOn on"  v-on:click="turnOn">turn on</div>
                    <div v-if="on" class="offOn off"  v-on:click="turnOff">turn off</div>
                    <!--
                    <div class="setBrightness" v-bind:style="{backgroundColor:getBackgroundColor()}" v-on:click="setBrightness">Set Brightness to {{brightness}}</div>
                    <div class="setBrightness" v-bind:style="{backgroundColor:getBackgroundColor()}" v-on:click="setBrightness">Set Brightness to {{brightness}}</div>
                    <div class="setBrightness" v-bind:style="{backgroundColor:getBackgroundColor()}" v-on:click="setBrightness">Set Brightness to {{brightness}}</div>
                    !-->
                </div>
                
            </div>
            <div class="control" v-if="state.type.model==='HS100'">
                <p>HS100 Smart Plug</p>
                <div class="setContainer">
                    <div v-if="!on" class="offOn on"  v-on:click="turnOn">turn on</div>
                    <div v-if="on" class="offOn off"  v-on:click="turnOff">turn off</div>
                </div>
            </div>
            <div class="control" v-if="state.type.model==='HS110'">
                <p>HS110 Smart Plug</p>
            </div>
        </div>
  </div>

</template>
<script>
import tplink from 'tplink-cloud-api';
export default {
    
    data:function(){
        let selected=this.$store.state.selected
        let state = this.$store.state
        return {
            state:state,
            info:'',
            brightness:50,
            on:false,
        }
    },
    methods:{
        getBackgroundColor(){
            return `rgb(${90+this.brightness/100*205},${90+this.brightness/100*205}, 50)`
        },
        getHoverColor(){

        },
        async turnOn(){
            if(this.state.type.model=='LB100')this.state.selected.transition_light_state(1, undefined);
            else if(this.state.type.model=='LB130')this.state.selected.transition_light_state(1, undefined,undefined,undefined);
            else if(this.state.type.model='HS100')this.state.selected.powerOn();
            this.on=true;
        },
        async turnOff(){
            if(this.state.type.model=='LB100')this.state.selected.transition_light_state(0, undefined);
            else if(this.state.type.model=='LB130')this.state.selected.transition_light_state(0, undefined,undefined,undefined);
            else if(this.state.type.model='HS100')this.state.selected.powerOff();
            this.on=false;
        },
        setBrightness(){
            this.state.selected.transition_light_state(1, parseInt(this.brightness));
            this.on=true;
        }
    }
  
}
</script>
<style scoped>
input[type=range].brightness {
  -webkit-appearance: none;
  width: 70%;
  margin: 5.3px 0;
}
input[type=range].brightness:focus {
  outline: none;
}
input[type=range].brightness::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(13, 13, 13, 0.4);
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid rgba(1, 1, 1, 0);
}
input[type=range].brightness::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.33), 0px 0px 1px rgba(13, 13, 13, 0.33);
  border: 0px solid rgba(0, 0, 0, 0);
  height: 19px;
  width: 34px;
  border-radius: 2px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -5.5px;
}
input[type=range].brightness:focus::-webkit-slider-runnable-track {
  background: #367ebd;
}
input[type=range].brightness::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(13, 13, 13, 0.4);
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid rgba(1, 1, 1, 0);
}
input[type=range].brightness::-moz-range-thumb {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.33), 0px 0px 1px rgba(13, 13, 13, 0.33);
  border: 0px solid rgba(0, 0, 0, 0);
  height: 19px;
  width: 34px;
  border-radius: 2px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range].brightness::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range].brightness::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid rgba(1, 1, 1, 0);
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(13, 13, 13, 0.4);
}
input[type=range].brightness::-ms-fill-upper {
  background: #3071a9;
  border: 0.2px solid rgba(1, 1, 1, 0);
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(13, 13, 13, 0.4);
}
input[type=range].brightness::-ms-thumb {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.33), 0px 0px 1px rgba(13, 13, 13, 0.33);
  border: 0px solid rgba(0, 0, 0, 0);
  height: 19px;
  width: 34px;
  border-radius: 2px;
  background: #ffffff;
  cursor: pointer;
  height: 8.4px;
}
input[type=range].brightness:focus::-ms-fill-lower {
  background: #3071a9;
}
input[type=range].brightness:focus::-ms-fill-upper {
  background: #367ebd;
}

</style>

<style scoped>
    
    .device{
        position: absolute;
        width:40%;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        background-color:white;
        padding:10px;
        right: 1em;
    }
    .header{
        display:flex;
    }
    .deviceIcon{
        font-size:2em;
        margin-right: 5px;
    }
    .header h1{
        margin: 5px;

    }
    .setContainer{
        display:flex;
    }

    .offOn{
        padding:5px;
        transition:ease 0.3s all;
        margin-right:2em;
    }
    .offOn:hover{
        cursor: pointer;
    }
    .on{
        background-color:rgb(68, 122, 59);
    }
    .on:hover{
        background-color:rgb(87, 163, 75);
    }
    .off{
        background-color:rgb(173, 39, 39);
    }
    .off:hover{
        background-color:rgb(204, 55, 55);
    }

    .setBrightness{
        padding:5px;
    }
    .setBrightness:hover{
        cursor: pointer;
    }
</style>

