<template>
    <div>
        <div class="headerBar">
            <div class="accountControl" v-on:click="showLogin" v-bind:class="{loggedIn:loggedIn,expanded:loginShown}">

                <div class="loginButton">{{loggedIn?'Logout':'Login'}}</div>
                <div v-show="loginShown" class="loginFields">
                    <input class="loginField username" type="text" placeholder="Username" v-model="username"/>
                    <input class="loginField password" type="password" placeholder="Password" v-model="password"/>
                    <font-awesome-icon icon="check-square" class="check" v-on:click="login"/>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import tplink from 'tplink-cloud-api';
import uuidv4 from 'uuid/v4'
export default {
    mounted(){
            let UUID=this.$cookie.get('TPLUUID')
            if(UUID){
                this.UUID=UUID;
            }
            else{
                let newUUID=uuidv4();
                this.$cookie.set('TPLUUID',newUUID , '1M');
                this.UUID=newUUID;
            }
        },
    
    data:function(){
        return {deviceList:[],username:'',password:'',loggedIn:false,loginShown:false}
    },
    methods:{
        async login () {
            let myTPLink = await tplink.login(this.username, this.password,this.UUID)
            let deviceList = await myTPLink.getDeviceList();
            this.$store.commit('TPLinkLogin', {TPLink:myTPLink,deviceList:deviceList})
            this.deviceList=this.$store.state.deviceList;
            this.loginShown=false;
            this.loggedIn=true;
        },
        logout () {
            this.loggedIn=false;
            this.username=''
            this.password=''
            this.$store.commit('TPLinkLogout')
        },
        showLogin(){
            if(this.loggedIn)return this.logout()
            this.loginShown=true;
        },
  }
}
</script>


<style scoped>
    
    .headerBar{
        background: rgb(21,17,89);
        background: linear-gradient(90deg, #0c695e 0%, #00796a 100%);
        position:fixed;
        width: 100%;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        color:white;
        margin-top:0;
        
    }
    .accountControl{
        transition:ease 0.3s all;
        font-size:2em;
        background-color:#009688;
        padding: 0.2em;
        transform:translate(0.5em,0.5em);
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        display:flex;
        width:33%;
        flex-wrap:wrap;
        min-width: 200px;
        margin-right:1em;
    }
    .accountControl:hover{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        cursor: pointer;
    }
    .loggedIn{
        background-color:red;
    }
    .loginFields{
        position: relative;
        padding:5px;
    }
    .loginField{
        background-color:rgba(255,255,255,0.2);
        border:none;
        outline:none;
        padding:5px;
        font-size:1.1rem;
        margin-right:5px;
        min-width: 120px;
        
    }
    .loginField:focus{
        background-color:rgba(255,255,255,0.3);
    }
    .loginButton{
        flex-basis:25%;
        width:25%;
        padding:5px;
    }
    .check{
        font-size:1.5rem;
        color:rgb(0,50,0);
        position: absolute;
        transform:translateY(20%);
        transition:ease 0.3s all;
    }
    .check:hover{
        
        font-size:1.9rem;
        transform:translateY(10%);
        color:rgb(0,80,0);
        cursor: pointer;
    }
    @media only screen and (max-width: 1200px) {
        .expanded .loginButton{
            display:none;
        }
    }
    
</style>