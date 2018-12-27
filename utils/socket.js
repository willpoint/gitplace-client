export default function createWebSocketPlugin (socket) {
  return store => {
    socket.addEventListener('message', ({data}) => {
      store.commit('SET_DATA', JSON.parse(data))
    })

    store.subscribe(mutation => {
      if (mutation.type === 'GET_DATA') {
        const { type, body } = mutation.payload
        socket.send(type + ' ' + body)
      }
    })
  }
}
