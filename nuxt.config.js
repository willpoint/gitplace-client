module.exports = {
  head: {
    title: 'GitPlace',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The Git Place' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: { 
    color: 'gold',
    height: '30px;'
  },
  css: [
    {src: '~/assets/css/material-icons.css'},
    {src: '~/assets/css/buefy-overrides.scss', lang: 'sass'},
    {src: '~/node_modules/highlight.js/styles/atom-one-light.css'},
    {src: '~/assets/css/main.css'},
  ],
  plugins: [
    {src: '~plugins/buefy'},
    {src: '~plugins/ansi-to-html'},
    {src: '~plugins/highlight'}
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
  },
  env: {
    mode: "development"
  }
}
