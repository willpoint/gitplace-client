import createWebSocketPlugin from '@/utils/socket.js'

const url = process.env.socketUrl
const ws = new WebSocket(url)

const dataTypes = [
  'version', 'branches', 'files'
]

export const state = () => ({
  data: '',
  ...genState(dataTypes)
})

export const plugins = [createWebSocketPlugin(ws)]

export const getters = {
  output(state) { return state.data },
  ...genGetters(dataTypes)
}

export const mutations = {
  SET_DATA(state, {type, data}) { 
    state[type] = data 
  },
  GET_DATA(state, payload) {}
}

function genState(types) {
  const states = {}
  for (let i = 0; i <types.length; i++) {
    states[types[i]] = ''
  }
  return states
}

function genGetters(types) {
  const getters = {}
  for (let i = 0; i < types.length; i++) {
    getters[types[i]] = (state) => state[types[i]]
  }
  return getters
}
