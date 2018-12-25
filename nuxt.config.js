module.exports = {
  head: {
    title: 'GIT-PLACE',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The Git Place' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { color: '#3B8070' },
  css: [
    {src: '~/assets/css/material-icons.css'},
    {src: '~/assets/css/buefy-overrides.scss', lang: 'sass'},
    {src: 'quill/dist/quill.snow.css'},
  ],
  plugins: [
    {src: '~plugins/buefy'},
    {src: '~plugins/nuxt-quill-plugin.js', ssr: false},
    {src: '~plugins/vue-frappe', ssr: false}
  ],
  mode: 'spa',
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    }
  },
  render: {
    resourceHints: false
  }
}
