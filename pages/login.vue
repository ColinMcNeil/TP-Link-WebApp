<template>
    <div>
  <h1>Login!</h1>
  <button v-on:click="login">Login</button>
    </div>
</template>
<script>
    import Vue from 'vue'
    export default {
        auth: false,
        mounted(){
            //Vue.googleAuth().load()
            //const { accessToken } = this.$store.state.oauth
        },
        methods: {
        login () {
            this.$auth.loginWith('google')
            return
            // defaults to redirecting back to the current page
            let cookies = this.$cookies;
            let router = this.$nuxt.$router;
            Vue.googleAuth().signIn(function (authorizationCode) { 
            // things to do when sign-in succeeds
            })
        },
        logout () {
            // customise the redirrect url
        }
    }
  }
</script> 