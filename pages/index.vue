<template>
<div>
    <h1>Hello world!</h1>
    <input type="text" placeholder="Username" v-model="username"/>
    <input type="text" placeholder="Password" v-model="password"/>
    <button v-on:click="login">Login</button>
    <div v-for="device in deviceList" :key="device.deviceId">
        <div>{{JSON.stringingify(device)}}</div>
    </div>

</div>

</template>
<script>
    import Vue from 'vue'
    import {Client} from  'tplink-smarthome-api'
    const client = new Client();
    client.startDiscovery().on('device-new', (device) => {
        device.getSysInfo().then(console.log);
    });
  export default {
    authenticated:true,
    data:function(){
        return {deviceList:[],username:'user@email.com',password:'***'}
    },
    methods: {
      async login () {
          let myTPLink = await tplink.login(this.usermame, this.password)
          this.deviceList = await myTPLink.getDeviceList()
      },
      logout () {
        // customise the redirrect url
      }
    }
  }
</script> 