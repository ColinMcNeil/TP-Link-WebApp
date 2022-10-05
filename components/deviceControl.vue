<template>
  <div>
    <div class="device">
      <div class="header">
        <div v-if="state.type.type === 'plug'" class="deviceIcon">
          <font-awesome-icon icon="plug" />
        </div>
        <div v-if="state.type.type === 'bulb'" class="deviceIcon">
          <font-awesome-icon icon="lightbulb" />
        </div>
        <h1>{{ state.selected.device.alias }}</h1>
      </div>
      <transition name="fade" mode="out-in">
        <div v-if="state.type.model === 'LB100'" class="control">
          <p>LB100 Smart Bulb</p>
          <input
            id="myRange"
            v-model="brightness"
            type="range"
            min="1"
            max="100"
            value="50"
            class="brightness"
          />
          <div class="setContainer">
            <div v-if="!on" class="offOn on" @click="turnOn">turn on</div>
            <div v-if="on" class="offOn off" @click="turnOff">turn off</div>
            <div
              :style="{ backgroundColor: getBackgroundColor() }"
              class="setBrightness"
              @click="setBrightness"
            >
              Set Brightness to {{ brightness }}
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <div v-if="state.type.model === 'KL110'" class="control">
          <p>KL110 Smart Bulb</p>
          <input
            id="myRange"
            v-model="brightness"
            type="range"
            min="1"
            max="100"
            value="50"
            class="brightness"
          />
          <div class="setContainer">
            <div v-if="!on" class="offOn on" @click="turnOn">turn on</div>
            <div v-if="on" class="offOn off" @click="turnOff">turn off</div>
            <div
              :style="{ backgroundColor: getBackgroundColor() }"
              class="setBrightness"
              @click="setBrightness"
            >
              Set Brightness to {{ brightness }}
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <div v-if="state.type.model === 'LB130'" class="control">
          <p>LB130 Smart Bulb</p>
          <div class="setContainer">
            <div v-if="!on" class="offOn on" @click="turnOn">turn on</div>
            <div v-if="on" class="offOn off" @click="turnOff">turn off</div>
            <!--
              <div class="setBrightness" v-bind:style="{backgroundColor:getBackgroundColor()}" v-on:click="setBrightness">Set Brightness to {{brightness}}</div>
              <div class="setBrightness" v-bind:style="{backgroundColor:getBackgroundColor()}" v-on:click="setBrightness">Set Brightness to {{brightness}}</div>
              <div class="setBrightness" v-bind:style="{backgroundColor:getBackgroundColor()}" v-on:click="setBrightness">Set Brightness to {{brightness}}</div>
              !
            -->
          </div>
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <div v-if="deviceType === 'IOT.SMARTPLUGSWITCH'" class="control">
          <p>{{ state.selected.device.deviceName }}</p>
          <div class="setContainer">
            <div v-if="!on" class="offOn on" @click="turnOn">turn on</div>
            <div v-if="on" class="offOn off" @click="turnOff">turn off</div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    let state = this.$store.state
    return {
      state,
      info: "",
      brightness: 50,
      on: false
    }
  },
  computed: {
    deviceType() {
      return this.state.selected.device.deviceType
    }
  },
  async mounted() {
    this.on = await this.state.selected.isOn()
  },
  methods: {
    getBackgroundColor() {
      return `rgb(${90 + (this.brightness / 100) * 205},${90 +
        (this.brightness / 100) * 205}, 50)`
    },
    async turnOn() {
      if (this.deviceType === "IOT.SMARTBULB") {
        if (this.state.type.model == "LB130")
          this.state.selected.transition_light_state(
            1,
            undefined,
            undefined,
            undefined
          )
        else this.state.selected.transition_light_state(1, undefined)
      } else {
        this.state.selected.powerOn()
      }
      this.on = true
    },
    async turnOff() {
      if (this.deviceType === "IOT.SMARTBULB") {
        if (this.state.type.model == "LB130")
          this.state.selected.transition_light_state(
            0,
            undefined,
            undefined,
            undefined
          )
        else this.state.selected.transition_light_state(0, undefined)
      } else {
        this.state.selected.powerOff()
      }
      this.on = false
    },
    setBrightness() {
      this.state.selected.transition_light_state(1, parseInt(this.brightness))
      this.on = true
    }
  }
}
</script>
<style scoped>
input[type="range"].brightness {
  -webkit-appearance: none;
  width: 70%;
  margin: 5.3px 0;
}
input[type="range"].brightness:focus {
  outline: none;
}
input[type="range"].brightness::-webkit-slider-runnable-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(13, 13, 13, 0.4);
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid rgba(1, 1, 1, 0);
}
input[type="range"].brightness::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.33),
    0px 0px 1px rgba(13, 13, 13, 0.33);
  border: 0px solid rgba(0, 0, 0, 0);
  height: 19px;
  width: 34px;
  border-radius: 2px;
  background: #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -5.5px;
}
input[type="range"].brightness:focus::-webkit-slider-runnable-track {
  background: #367ebd;
}
input[type="range"].brightness::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(13, 13, 13, 0.4);
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid rgba(1, 1, 1, 0);
}
input[type="range"].brightness::-moz-range-thumb {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.33),
    0px 0px 1px rgba(13, 13, 13, 0.33);
  border: 0px solid rgba(0, 0, 0, 0);
  height: 19px;
  width: 34px;
  border-radius: 2px;
  background: #ffffff;
  cursor: pointer;
}
input[type="range"].brightness::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type="range"].brightness::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid rgba(1, 1, 1, 0);
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(13, 13, 13, 0.4);
}
input[type="range"].brightness::-ms-fill-upper {
  background: #3071a9;
  border: 0.2px solid rgba(1, 1, 1, 0);
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4), 0px 0px 1px rgba(13, 13, 13, 0.4);
}
input[type="range"].brightness::-ms-thumb {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.33),
    0px 0px 1px rgba(13, 13, 13, 0.33);
  border: 0px solid rgba(0, 0, 0, 0);
  height: 19px;
  width: 34px;
  border-radius: 2px;
  background: #ffffff;
  cursor: pointer;
  height: 8.4px;
}
input[type="range"].brightness:focus::-ms-fill-lower {
  background: #3071a9;
}
input[type="range"].brightness:focus::-ms-fill-upper {
  background: #367ebd;
}
</style>

<style scoped>
.device {
  flex: 0 0 40%;
  align-self: flex-end;
  min-width: 300px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 3px;
  background-color: white;
  padding: 10px;
}
.header {
  display: flex;
  border-bottom: solid rgb(230, 230, 230) 2px;
}
.deviceIcon {
  font-size: 2em;
  margin-right: 5px;
}
.header h1 {
  margin: 5px;
}
.setContainer {
  display: flex;
}

.offOn {
  padding: 5px;
  transition: ease 0.3s all;
  margin-right: 2em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 1px;
}
.offOn:hover {
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.on {
  background-color: rgb(68, 122, 59);
}
.on:hover {
  background-color: rgb(87, 163, 75);
}
.off {
  background-color: rgb(173, 39, 39);
}
.off:hover {
  background-color: rgb(204, 55, 55);
}

.setBrightness {
  padding: 5px;
  transition: ease 0.3s all;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 1px;
}
.setBrightness:hover {
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.fade-enter-active,
.fade-leave-active {
  transition: ease opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
