<template>
  <el-row class="login" type="flex" justify="center" align="middle">
    <el-col :span="6">
      <el-form :rules="rules" ref="loginForm" :model="loginForm" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item type="flex" align="middle" label-width="0px">
          <el-button class="login_btn" type="primary" @click="loginBtn">登录</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击登录
    loginBtn () {
      this.$refs.loginForm.validate(async valid => {
        // 前端校验未通过时则直接return
        if (!valid) return
        // 获取返回数据
        let res = await this.$axios.post('login', this.loginForm)
        // 取出需要的数据
        const { data, meta } = res.data
        // 当返回状态码为200时则登录成功,否则登录失败
        if (meta.status === 200) {
          // 将token保存到localStorage中
          localStorage.setItem('token', data.token)
          // 跳转到首页
          this.$router.push('/index')
          this.$message.success(meta.msg)
        } else {
          this.$message.error(meta.msg)
        }
      })
    },
    // 点击重置表单
    resetForm () {
      this.$refs.loginForm.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: url(https://img.tukuppt.com/bg_grid/00/07/00/agQBclomvp.jpg!/fh/350)
    no-repeat;
  background-size: 100% 100%;
  .el-col {
    background: #fff;
    padding: 40px 30px 10px 20px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  }
  .el-col::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    filter: blur(20px);
    margin: -30px;
  }
  .login_btn {
    margin-right: 50px;
  }
}
.login /deep/ .el-form-item__label {
  color: rgb(53, 49, 49);
}
</style>
