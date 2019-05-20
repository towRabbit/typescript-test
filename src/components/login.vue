<template>
  <el-dialog
    :visible="Account.showLogin"
    :title="$t('Login')"
    width="460px"
    center
    @close="loginclose"
    :close-on-click-modal="false"
    class="submit-tip loginsubmit"
  >
    <el-form :model="loginForm" ref="loginForm">
      <el-form-item prop="phone" :style="{marginBottom: '48px'}" :error="loginerror.phone">
        <el-input v-model="loginForm.phone" :placeholder="$t('p_input_phone')"></el-input>
      </el-form-item>
      <el-form-item prop="passworld" :style="{marginBottom: '38px'}" :error="loginerror.pwd">
        <el-input type="password" v-model="loginForm.pwd" :placeholder="$t('p_input_password')"></el-input>
      </el-form-item>
      <el-button
        type="primary"
        :disabled="!loginStatus"
        @click="loginSubmit"
        :loading="loading"
      >{{ $t('Login')}}</el-button>
      <div class="d-flex justify-content-center align-items-center text-box">
        <div class="text-blue" @click="toRegister('forget')">{{ $t('forget_password') }}</div>
        <span class="text-line"></span>
        <div class="text-blue" @click="toRegister('register')">{{ $t('register') }}</div>
      </div>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import { ForgetData } from '@/types/components/forget.interface';
import Base64 from 'base-64';
import { LoginForm, LoginError } from '@/types/components/headerBar.interface';
import { LoginQuery } from '@/types/api/login.interface';
import { AccountState, UserInfo } from '@/types/store/account.interface';
import { State, Getter, Mutation } from 'vuex-class';
import { login } from '@/api/login';

@Component({})
export default class About extends Vue {

  get loginStatus(): boolean {
    let status = true;
    Object.keys(this.loginForm).map((key: string) => {
      if (!this.loginForm[key] && key !== 'lan') {
        status = false;
      }
    });
    return status;
  }
  @State('account')readonly Account!: AccountState;
  @Mutation changeLoginStatus!: (status: boolean) => void;
  @Mutation setUserInfo!: (userinfo?: UserInfo) => void;
  @Mutation setLocale!: (lang: string) => void;

  loading: boolean = false;
  loginForm: LoginForm = {
    phone: '',
    pwd: ''
  };
  loginerror: LoginError = {
    phone: '',
    pwd: ''
  };

  loginclose() {
    this.changeLoginStatus(false);
    Object.keys(this.loginForm).map(key => {
      this.loginForm[key] = '';
    });
  }

  async loginSubmit() {
    this.loading = true;
    const { result, message, userinfo }: any = await login(this.loginForm);

    if (result === 1) {
      this.loginclose();
      this.setUserInfo(userinfo);
    }
    if (result === 2) {
      this.$message.error(message);
    }
    this.loading = false;
  }

  @Emit('showRegister') toRegister(type: string): string {
    this.changeLoginStatus(false)
    return type
  }   
}
</script>

<style lang="scss" scoped>
.text-box {
  padding: 8px 0 10px;

  .text-blue {
    color: #51a0f1;
    cursor: pointer;
  }
  .text-line {
    height: 12px;
    width: 1px;
    background: #51a0f1;
    margin: 0 8px;
  }
}
</style>

