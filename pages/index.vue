<template>
  <div>
    <a href="https://github.com/colinmcneil/TP-Link-WebApp/">
      <img
        style="position: absolute; top: 0; left: 0; border: 0;" 
        src="https://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png" 
        alt="Fork me on GitHub"
      />
    </a>
    <div class="controls">
      <device-list />
      <transition name="slide">
        <deviceControl v-if="$store.state.selected.device" />
      </transition>
    </div>
    <loginPopup v-if="$store.state.loginShown" />
  </div>
</template>
<script>
import loginPopup from "~/components/loginPopup"
import deviceList from "~/components/deviceList"
import deviceControl from "~/components/deviceControl"
export default {
  authenticated: true,
  components: { loginPopup, deviceList, deviceControl },
  methods: {}
}
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Josefin+Sans");
html,
body {
  margin: 0;
  background-color: #efefef;
  width: 100%;
  height: 100%;
  font-family: "Josefin Sans";
}
</style>
<style scoped>
.controls {
  width: 100%;
  max-width: 1200px;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8em;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.controls * {
  margin-top: 10px;
  flex: 0 0 40%;
  max-width: 500px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all ease 0.3s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(3000px);
}
</style>
