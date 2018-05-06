<template>
    <div>
        <div class="headerBar">
            <div class="accountControl" v-on:click="showLogin" v-bind:class="{loggedIn:loggedIn,expanded:loginShown}">{{loggedIn?'Logout':'Login'}}</div>
            <div v-show="loginShown" class="loginFields">
                <input class="loginField username" type="text" placeholder="Username" v-model="username"/>
                <input class="loginField password" type="text" placeholder="Password" v-model="password"/>
                <font-awesome-icon icon="check-square" class="check" v-on:click="login"/>
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
            this.deviceList=[];
            this.loggedIn=false;
            this.username=''
            this.password=''
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
        background: linear-gradient(90deg, rgba(21,17,89,1) 0%, rgba(0,147,255,1) 100%);
        position:fixed;
        height: 3em;
        width: 100%;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        display:flex;
        margin-top:0;
    }
    .accountControl{
        transition:ease 0.3s all;
        font-size:2em;
        background-color:green;
        width:3em;
        transform:translate(0.5em,0.5em);
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        /*flex: 0 0 4em;*/
        width:80%;
        max-width: 4em;
        margin-right:1em;
    }
    .accountControl:hover{
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        cursor: pointer;
    }
    .loggedIn{
        background-color:red;
    }
    .loggedIn:hover{

        
    }
    .expanded{
        /*flex: 0 0 20em;*/
        max-width: 20em;
    }
    .loginFields{
        position: relative;
        transform: translate(-120%,50%);

    }
    .loginField{
        background-color:rgba(255,255,255,0.2);
        border:none;
        outline:none;
        padding:5px;
        font-size:1.1rem;
        margin-right:5px;
    }
    .loginField:focus{
        background-color:rgba(255,255,255,0.3);
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
    
</style>