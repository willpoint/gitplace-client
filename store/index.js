import createWebSocketPlugin from '@/utils/socket.js'
import axios from 'axios'

const httpURL = "http://localhost:12345/command"
const wsURL = process.env.socketUrl
const ws = new WebSocket(wsURL)

const dataTypes = [
  'version', 'branches', 'files', 
  'shortlog', 'notification', 'file_history', 
  'diff', 'commit_output', 'logs', 
  'num_commits', 'tags'
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

export const actions = {
  ...genActions(dataTypes)
}

function genState(types) {
  const states = {}
  for (let i = 0; i <types.length; i++) { states[types[i]] = '' }
  return states
}

function genGetters(types) {
  const getters = {}
  for (let i = 0; i < types.length; i++) {
    getters[types[i]] = (state) => state[types[i]]
  }
  return getters
}

function genActions(types) {
  const actions = {}
  for (let i = 0; i < types.length; i++) {
    actions[types[i]] = ({commit}, data) => {
      return new Promise((resolve, reject) => {
        axios({
          url: httpURL,
          method: 'post',
          data: data,
          headers: {
            "Content-Type": "application/json"
          }
        }).then((resp) => {
          commit('SET_DATA', resp.data)
          resolve(resp.data)
        }).catch(reject)
      })
    }
  }
  return actions
}
