module.exports = {
  router: {
    //May need to change this depending on your deployment
    base: process.env.NODE_ENV === "development" ? "" : "/TP-Link-WebApp/"
  },
  modules: ["@nuxtjs/axios", "nuxt-fontawesome"],
  plugins: ["~/plugins/vue-cookie"],
  build: {
    extend(config) {
      config.node = {
        fs: "empty"
      }
    }
  },
  fontawesome: {
    imports: [
      {
        set: "@fortawesome/free-solid-svg-icons",
        icons: ["fas"]
      }
    ]
  }
}
