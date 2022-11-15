<template>
    <div class="auth-layout-wrap" :style="`background-image: url(${bg})`">
    <div class="auth-content">
        <div class="card o-hidden">
            <div class="row">
                <div class="col-md-6">
                    <div class="p-4">
                        <div class="auth-logo text-center mb-4"><img src="~@/assets/dist-assets/images/logo.png" alt=""></div>
                        <h1 class="mb-3 text-18">Sign In</h1>
                        <form>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input class="form-control form-control-rounded" v-model="email" id="email" type="email">
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input class="form-control form-control-rounded" v-model="password" id="password" type="password">
                            </div>
                            <button @click="login()" class="btn btn-rounded  btn-primary btn-block mt-2">Sign In</button>
                        </form>
                        <div class="mt-3 text-center"><a class="text-muted" href="forgot.html">
                                <u>Forgot Password?</u></a></div>
                    </div>
                </div>
                <div class="col-md-6 text-center" :style="`background-size: cover;background-image: url(${bg2})`">
                    <div class="pr-3 auth-right"><a class="btn btn-rounded btn-outline-primary btn-outline-email btn-block btn-icon-text" href="signup.html"><i class="i-Mail-with-At-Sign"></i> Sign up with Email</a><a class="btn btn-rounded btn-outline-google btn-block btn-icon-text"><i class="i-Google-Plus"></i> Sign up with Google</a><a class="btn btn-rounded btn-block btn-icon-text btn-outline-facebook"><i class="i-Facebook-2"></i> Sign up with Facebook</a></div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import bg from '../assets/dist-assets/images/photo-wide-4.jpg'
import bg2 from '../assets/dist-assets/images/photo-long-3.jpg'
import HTTP from '@/common/http-common'
export default {
    name:"loginCom",
    data(){
        return{
            bg:bg,
            bg2:bg2,
            email:'',
            password:''
        }
    },
    methods:{
        login(){
            console.log('login called!')
            HTTP.post('login',{
                email:this.email,
                password:this.password
            }).then(response =>{
                if(response.data.status == 'success'){
                    localStorage.setItem('access_token',response.data.token)
                    this.$router.push('/')
                }else{
                    alert('Something went wrong')
                }
            }).catch(err => {
                console.log(err.response.data.message)
            })
        }
        
    },
   
        created(){
        if(localStorage.getItem('access_token')){
            this.$router.push('/')
        }
    }
}
</script>