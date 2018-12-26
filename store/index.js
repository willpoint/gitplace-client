import createWebSocketPlugin from '@/utils/socket.js'

const url = process.env.socketUrl
const ws = new WebSocket(url)

export const state = () => ({
  version: 'Unknown version',
  data: '',
})

export const plugins = [createWebSocketPlugin(ws)]

export const getters = {
  version(state) { return state.version },
  output(state) { return state.data }
}

export const mutations = {
  SET_DATA(state, {type, data}) { 
    if (type === 'version') {
      state.version = data
    } else {
      state.data = data 
    }
  },
  GET_DATA(state, payload) {}
}

