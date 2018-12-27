import Vue from 'vue'
import Convert from 'ansi-to-html'

const convert = new Convert();

Vue.use({
  install(Vue) {
    Vue.prototype.$convert = (words) => convert.toHtml(words)
  }
})
