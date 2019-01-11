import Vue from 'vue'
import HighlightJs from 'highlight.js'

Vue.use({
  install(vue) {
    vue.prototype.$highlight = (body, ext) => {
      let lang = []

      if (typeof ext == 'undefined') {
        lang = HighlightJs.listLanguages()
      } else {
        let t = HighlightJs.getLanguage(ext.slice(1))
        lang = t ? t.aliases : HighlightJs.listLanguages()
      }
      const h = HighlightJs.highlightAuto(body, lang || HighlightJs.listLanguages())
      return h.value
    }
  }
})
