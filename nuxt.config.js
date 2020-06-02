import config from "./modules/config"
import {
  getRoutes,
  getPostRoute,
  getPostRoutes
} from "./modules/contenter"

export default {
  mode: "universal",

  head: {
    title: config.indexTitle,
    titleTemplate: `%s » ${config.baseTitle}`,
    meta: config.headMeta,
    link: config.headLinks
  },

  loading: {
    color: "#06ba77",
    height: "4px",
    throttle: 0,
  },

  css: [
    "@vonagevolta/volta2/dist/css/volta.min.css",
    "@vonagevolta/volta2/dist/css/volta-error-page.min.css",
    "@vonagevolta/volta2/dist/css/volta-templates.min.css",
    "@/assets/css/volta-prism-dark.css",
    "@/assets/css/main.css",
  ],

  plugins: [
    { src: "@/plugins/vue-moment.js" },
    { src: "@/plugins/vue-fragment.js" },
    { src: "@/plugins/filters.js" },
    { src: "@/plugins/vue-instantsearch.js" },
    { src: "@/plugins/vue-disqus.js" },
    { src: "@/plugins/vue-pluralize.js" },
  ],

  modules: [
    "@nuxt/content",
    // "@nuxtjs/feed"
  ],

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        document.type = document.dir.replace(/(^\/|\/$)/, "")

        const { time } = require('reading-time')(document.text)
        document.readingTime = time

        document.route = getPostRoute(document)
        document.routes = getPostRoutes(document)
      }
    }
  },

  generate: {
    fallback: true,
    routes: getRoutes(),
  },

  buildModules: [
    '@nuxtjs/dotenv'
  ],

  build: {
    transpile: ["vue-instantsearch", "instantsearch.js/es"]
  }
}
