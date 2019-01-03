import createWebSocketPlugin from '@/utils/socket.js'
import axios from 'axios'

const URL = new window.URL(window.location.href)

let httpURL = "http://"+URL.host+"/command"
let wsURL = "ws://"+URL.host+"/echo"

// use when in development
if (process.env.mode === 'development') {
  httpURL = "http://localhost:5959/command"
  wsURL = "ws://localhost:5959/echo"
}

const ws = new WebSocket(wsURL)

const dataTypes = [
  'version', 'branches', 'files', 
  'shortlog', 'notification', 'file_history', 
  'diff', 'commit_output', 'logs', 
  'num_commits', 'tags', 'file_content'
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
          if (resp.data.type == 'error') {
            throw new Error('An unexpected error occured')
          }
          commit('SET_DATA', resp.data)
          resolve(resp.data)
        }).catch(err => {
          return reject(err)
        })
      })
    }
  }
  return actions
}
