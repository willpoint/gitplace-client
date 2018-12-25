import Vue from 'vue';
import VeeValidate from 'vee-validate'
import axios from 'axios'
import cfg from '../config/app'
const mode = cfg.isProduction ? "production" : "development"

// check for any issue with validation regarding 
// unique_phone and unique_email validations
const path = `${cfg[mode].apiHost}${cfg[mode].baseURL}/check`
const uniquePhone = value => new Promise((resolve) => {
  axios.get(`${path}/phone/${value}`).then(({data: {errors, store}}) => {
    if (store.valid) {
      return resolve({
        valid: true
      })
    }
    return resolve({
      valid: false,
      data: {
        message: `Phone number already taken by another user.`
      }
    })
  })
})

const uniqueEmail = value => new Promise((resolve) => {
  axios.get(`${path}/email/${value}`).then(({data: {errors, store}}) => {
    if (store.valid) {
      return resolve({
        valid: true
      })
    }
    return resolve({
      valid: false,
      data: {
        message: `Email already taken by another user.`
      }
    })
  })
})

VeeValidate.Validator.extend('unique_phone', {
  validate: uniquePhone,
  getMessage: (field, params, data) => data.message
})

VeeValidate.Validator.extend('unique_email', {
  validate: uniqueEmail,
  getMessage: (field, params, data) => data.message
})

Vue.use(VeeValidate)
