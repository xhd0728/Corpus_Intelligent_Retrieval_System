<template>
    <div class="container">
        <div class="login_box">
            <div class="avatar_box">
                <img src="@/assets/logo.jpg" alt="">
            </div>
            <el-form label-width="70px" class="login_form" v-model="form" :rules="rules" ref="login_form">
                <!-- 用户名 -->
                <el-form-item label="账号" prop="username">
                    <el-input prefix-icon="iconfont icon-user" v-model="form.username" spellcheck="false"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item label="密码" prop="password">
                    <el-input prefix-icon="iconfont icon-password" v-model="form.password" show-password
                        spellcheck="false"></el-input>
                </el-form-item>
                <!-- 验证码 -->
                <div style="position:relative;width: 100%; height: 50px;">
                    <el-form-item label="验证码" prop="code" style="width:50%;position: absolute;">
                        <el-input v-model="form.code" spellcheck="false"></el-input>
                    </el-form-item>
                    <div style="30px;height:35px;position: absolute; top:0;right:0;cursor:pointer" @click="getimg()">
                        <img :src="'data:image/png;base64,' + form.img" alt="">
                    </div>
                </div>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="lllgoin()">登录</el-button>
                    <el-button type="info" @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';

// import { request } from 'http';
import  JSEncrypt  from '@/utils/jsencrypt.min.js';
// import { send } from 'process';


export default {
    name: 'MyLogin',
    created() {
        this.getimg();
        this.get_public_key();
    },
    data() {
        return {
            public_key:'',
            form: {
                username: '',
                password: '',
                code: '',
                img: ''
            },
            rules: {
                username: [
                    { message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { message: '请输入密码', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        get_public_key()
        {
            this.$axios.request({
                method:'GET',
                url: "api/user/cas"
            }).then((res)=>{
                this.public_key=res.data.public_key;
            })
        },
        getimg() {
            // console.log(111);
            this.$axios.request({
                method: 'GET',
                url: "api/user/login"
            }).then((res) => {
                // console.log(res.data);
                this.form.img = res.data.img;
            })


        },
        resetForm() {
            this.form.code = "";
            this.form.username = "";
            this.form.password = "";
        },

        lllgoin() {
            if (this.form.username.length == 0) {
                return this.$message({
                    message: '请输入用户名',
                    type: 'error '
                })
            }
            if (this.form.password.length == 0) {
                return this.$message({
                    message: '请输入密码',
                    type: 'error '
                })
            }
            if (this.form.code.length == 0) {
                return this.$message({
                    message: '请输入验证码',
                    type: 'error '
                })
            }
            this.getimg();
            this.login();
        },
        async login() {

            var jsencrypt = new JSEncrypt();
            jsencrypt.setPublicKey(this.public_key);
            let send_form = new FormData();


            send_form.append("username",this.form.username);
            send_form.append("password",jsencrypt.encrypt(this.form.password));
            send_form.append("code",this.form.code);
            send_form.append("img",this.form.img);
            send_form.append("public_key",this.public_key);
            
            this.$axios.post("/api/user/login", send_form).then((res) => {
                // console.log(res.data);
                if (res.status != 200) {
                    return this.$message({
                        message: res.detail,
                        type: 'error '
                    })
                } else {
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    })
                    window.localStorage.setItem("token", res.data.token);


                    this.$router.push('/manage')
                }
            }).catch((res) => {
                // console.log(res.response.data);
                this.$message({
                    message: res.response.data.detail,
                    type: 'error'
                })
            })

        }
    }
}
</script>

<style lang="less" scoped>
.container {
    background-color: #2b4b6b;
    height: 100%;
}

.login_box {
    height: 300px;
    width: 450px;
    background-color: white;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        height: 100px;
        width: 100px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;

        img {
            height: 100%;
            width: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }

    .btns {
        // 弹性盒模型
        display: flex;
        justify-content: flex-end;
    }

    .login_form {
        position: absolute;
        bottom: 0;
        width: 100%;
        transform: translate(-10px);
    }
}
</style>