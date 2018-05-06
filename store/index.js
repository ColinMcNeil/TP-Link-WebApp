import Vuex from 'vuex'

const createStore = () => {
    return new Vuex.Store({
        state: {
            TPLink: {},
            deviceList: [],
            selected: {},
            selectedType:{}
        },
        mutations: {
            TPLinkLogin(state, payload) {
                state.TPLink = payload.TPLink;
                state.deviceList = payload.deviceList;
                
            },
            TPLinkLogout(state) {
                state.TPLink = {};
                state.deviceList = [];
                state.selected = {};

            },
            select(state, selected) {
                state.selected = selected;
                state.type= {
                    type: state.selected.device.deviceName.includes('Plug') ? 'plug' : 'bulb',
                    model: state.selected.device.deviceModel.split('(')[0]
                }
            }
        }
    })
}

export default createStore