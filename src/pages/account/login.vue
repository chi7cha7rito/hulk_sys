<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="75px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account" label="账号">
      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号" @keyup.enter.native="handleSubmit2"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass" label="密码">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码" @keyup.enter.native="handleSubmit2"></el-input>
    </el-form-item>
    <el-form-item prop="verifyCode" label="验证码">
       <el-col :span="12">
          <el-input type="text" v-model="ruleForm2.verifyCode" auto-complete="off" placeholder="验证码" @keyup.enter.native="handleSubmit2"></el-input>
       </el-col>
       <el-col :span="12">
          <img src="http://localhost:3000/common/genVerifyCodeImg" alt="验证码" style="margin-left:10px;cursor:pointer" @click="refreshCode">
       </el-col>
    </el-form-item>
    <el-form-item style="width:100%;" label-width="0">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import api from '../../fetch/api'
  import md5 from 'md5'
  import {
    mapActions
  } from 'vuex'
  
  
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: '',
          verifyCode:'',
          count:0,
        },
        rules2: {
          account: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          checkPass: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        }
      };
    },
    methods: {
      ...mapActions({
        setUserInfo: 'setUserInfo'
      }),
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = {
              phoneNo: this.ruleForm2.account,
              password: md5(this.ruleForm2.checkPass),
              verifyCode:this.ruleForm2.verifyCode
            };
  
            if (this.logining) {
              api.Login(loginParams)
                .then(res => {
                  this.setUserInfo(res)
                  this.$router.replace('/')
                })
                .catch(error => {
                  this.logining = false;
                  this.$message({
                    message: error.message,
                    type: 'error',
                    duration: 1000
                  });
                })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      refreshCode:function(e){
        e.target.src=e.target.src+"?t="+new Date().valueOf();
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>