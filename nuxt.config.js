module.exports = {
    //plugins: ['~/plugins/vue-google-auth'],
    router: {
        middleware: ['auth']
    },
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth'
    ],
    auth: {
        strategies: {
            google: {
                client_id: '811800195268-dcspgc96q1rt4kdp1sgk7nmemsg745fv.apps.googleusercontent.com'
            },
        }
        /*sessionName: 'TPLink-Webapp',
        secretKey: process.env.SECRET_KEY,
        oauthHost: 'apps.googleusercontent.com',
        oauthClientID: '811800195268-dcspgc96q1rt4kdp1sgk7nmemsg745fv',
        oauthClientSecret: process.env.SECRET,
        authorizationPath:'/login',
        onLogout: (req, res) => {
            // do something after logging out
        },
        fetchUser: (accessToken) => {
            // do something to return the user
            const user = User.findByToken(accessToken)
            return user
        }*/
    },
    plugins: [
        '~/plugins/vue-google-auth'
    ]
}