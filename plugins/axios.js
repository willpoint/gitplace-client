export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
  })

  $axios.onError(err => {
    if (err.response.status === 401) {
      throw Error('You are not unauthorized to perform this action')
    }
  })

}
