module.exports = {
  //plugins: ['~/plugins/vue-google-auth'],
  router: {
    //middleware: ['auth'],
    base: process.env.DEPLOY_ENV === "GH_PAGES" ? "/TP-Link-WebApp/" : ""
  },
  modules: [
    "@nuxtjs/axios",
    //'@nuxtjs/auth',
    "nuxt-fontawesome"
  ],
  auth: {
    strategies: {
      google: {
        client_id:
          "811800195268-dcspgc96q1rt4kdp1sgk7nmemsg745fv.apps.googleusercontent.com"
      }
    },
    redirect: {
      callback:
        process.env.DEPLOY_ENV === "GH_PAGES" ? "/TP-Link-WebApp/login" : ""
    }
  },
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
        set: "@fortawesome/fontawesome-free-solid"
      }
    ]
  }
}
