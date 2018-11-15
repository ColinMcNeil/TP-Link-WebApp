<template>
  <div>
    <div class="deviceList">
      <div class="deviceListing title">
        Your Devices
        <button @click="$store.dispatch('toggleLogin')">
          {{ $store.state.TPLink ? "Logout" : "Login" }}
        </button>
      </div>
      <div
        v-for="device in $store.state.deviceList"
        :key="device.deviceId"
        class="deviceListing"
        @click="select(device)"
      >
        <div v-if="device.deviceName.includes('Bulb')" class="deviceIcon">
          <font-awesome-icon icon="lightbulb" />
        </div>
        <div v-if="device.deviceName.includes('Plug')" class="deviceIcon">
          <font-awesome-icon icon="plug" />
        </div>
        <div class="name">{{ device.alias }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return { deviceList: [], selected: {} }
  },
  methods: {
    async select(device) {
      let model = device.deviceModel.split("(")[0]
      let alias = device.alias
      let state = this.$store.state
      switch (model) {
        case "HS100":
          this.$store.commit("select", state.TPLink.getHS100(alias))
          break
        case "LB100":
          this.$store.commit("select", state.TPLink.getLB100(alias))
          break
      }
    }
  }
}
</script>
<style scoped>
.deviceList {
  flex: 0 0 40%;
  min-width: 300px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: white;
  border-radius: 3px;
  padding: 0.4em;
}
.title {
  border-bottom: solid rgb(230, 230, 230) 2px;
}
.title button {
  margin-left: 1em;
  outline: none;
  border: solid black 2px;
  padding: 0.5em 1em;
  font-size: 16px;
}
.deviceListing {
  font-size: 2em;
  display: flex;
  padding: 0.4em;
  transition: ease 0.3s all;
}
.deviceListing:hover {
  background-color: rgb(230, 230, 230);
  cursor: pointer;
}
.deviceListing * {
  margin-right: 5px;
}
.deviceListing.title:hover {
  background-color: white;
  cursor: default;
}
</style>
