<template>
  <div>
    <form class="container" autocomplete="on" @submit.prevent="login">
      <button class="closeBar" @click="$store.commit('hideLogin')">X</button>
      <label for="email">Email</label>
      <input
        v-model="username"
        class="loginField username"
        type="email"
        name="email"
        autocomplete="email"
        placeholder="Email"
      />
      <label for="password">Password</label>
      <input
        v-model="password"
        class="loginField password"
        type="password"
        name="password"
        placeholder="Password"
      />
      <input type="submit" class="loginButton" value="Login" />
    </form>
  </div>
</template>
<script>
import { login } from "tplink-cloud-api"
import uuidv4 from "uuid/v4"
export default {
  data: () => ({
    deviceList: [],
    username: "",
    password: "",
    loggedIn: false,
    loginShown: false
  }),
  mounted() {
    let UUID = this.$cookie.get("TPLUUID")
    if (UUID) {
      this.UUID = UUID
    } else {
      let newUUID = uuidv4()
      this.$cookie.set("TPLUUID", newUUID, "1M")
      this.UUID = newUUID
    }
  },
  methods: {
    async login() {
      let myTPLink = await login(this.username, this.password, this.UUID)
      let deviceList = await myTPLink.getDeviceList()
      this.$store.commit("TPLinkLogin", {
        TPLink: myTPLink,
        deviceList: deviceList
      })
      this.deviceList = this.$store.state.deviceList
      this.loginShown = false
      this.loggedIn = true
    },
    logout() {
      this.loggedIn = false
      this.username = ""
      this.password = ""
      this.$store.commit("TPLinkLogout")
    },
    showLogin() {
      if (this.loggedIn) return this.logout()
      this.loginShown = true
    }
  }
}
</script>

<style scoped>
.container {
  background: rgb(21, 17, 89);
  background: linear-gradient(90deg, #0c695e 0%, #00796a 100%);
  position: fixed;
  width: 50%;
  height: 50%;
  min-width: 300px;
  top: 50%;
  left: 50%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  color: white;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3em;
}

.container * {
  margin-bottom: 1em;
}

.container label {
  font-size: 1.5rem;
  margin-bottom: 0.3em;
}

.closeBar {
  margin-bottom: 1em;
  width: 100%;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.accountControl {
  transition: ease 0.3s all;
  font-size: 2em;
  background-color: #009688;
  padding: 0.2em;
  margin: 0.5em, 0, 0, 0.5em;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  display: flex;
  width: 33%;
  flex-wrap: wrap;
  min-width: 200px;
  margin-right: 1em;
}

.accountControl:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  cursor: pointer;
}
.loggedIn {
  background-color: #b25555;
}
.loginField {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  outline: none;
  padding: 5px;
  font-size: 1.1rem;
  margin-right: 5px;
  min-width: 120px;
}
.loginField:focus {
  background-color: rgba(255, 255, 255, 0.3);
}
.loginButton {
  padding: 5px;
  font-size: 2rem;
  display: flex;
  border: none;
  outline: none;
  justify-content: center;
  transition: ease 0.2s all;
  background-color: rgb(255, 255, 255);
  width: 100%;
  color: #0c695e;
}
.loginButton:hover {
  cursor: pointer;
  color: rgb(134, 255, 134);
  background-color: rgb(139, 139, 139);
}
@media only screen and (max-width: 1200px) {
  .expanded .loginButton {
    display: none;
  }
}
</style>
