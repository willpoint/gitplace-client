import Vue from 'vue'
import HighlightJs from 'highlight.js'

Vue.use({
  install(vue) {
    vue.prototype.$highlight = (body) => {
      const h = HighlightJs.highlightAuto(body, HighlightJs.listLanguages())
      return h.value
    }
  }
})
