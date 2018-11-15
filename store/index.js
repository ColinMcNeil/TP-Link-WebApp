import Vuex from "vuex"

const createStore = () => {
  return new Vuex.Store({
    state: {
      TPLink: false,
      deviceList: [],
      selected: {},
      selectedType: {},
      loginShown: false
    },
    mutations: {
      TPLinkLogin(state, payload) {
        state.TPLink = payload.TPLink
        state.deviceList = payload.deviceList
        state.loginShown = false
      },
      TPLinkLogout(state) {
        state.TPLink = false
        state.deviceList = []
        state.selected = {}
      },
      select(state, selected) {
        state.selected = selected
        state.type = {
          type: state.selected.device.deviceName.includes("Plug")
            ? "plug"
            : "bulb",
          model: state.selected.device.deviceModel.split("(")[0]
        }
      },
      showLogin(state) {
        state.loginShown = true
      },
      hideLogin(state) {
        state.loginShown = false
      }
    },
    actions: {
      toggleLogin(context) {
        if (context.state.TPLink) return context.commit("TPLinkLogout")
        context.commit("showLogin")
      }
    }
  })
}

export default createStore
