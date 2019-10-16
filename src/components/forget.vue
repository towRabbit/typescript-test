<template>
  <el-dialog
    :visible="forgetshow"
    :title="$t(type == 'forget'? 'forget_password': 'register')"
    width="460px"
    center
    class="submit-tip"
    :close-on-click-modal="false"
    @close="forgetcloase"
  >
    <el-form :model="forgetForm" ref="forgetForm" :rules="forgetRules">
      <el-form-item>
        <el-select v-model="forgetForm.status" filterable>
          <el-option
            v-for="item in areaCode"
            :key="item.value"
            :label="item.value"
            :value="item.key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input v-model="forgetForm.phone" :placeholder="$t('phone')"></el-input>
      </el-form-item>
      <el-form-item prop="pic_v">
        <div class="pic_verit d-flex align-items-end">
          <el-input
            class="flex-1"
            v-model="forgetForm.pic_v"
            :placeholder="$t('graphic_verification_code')"
          ></el-input>
          <div class="vericode" id="vericode"></div>
          <a class="underline" @click="changePic">{{ $t('change_one')}}</a>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="d-flex">
          <el-input v-model="forgetForm.phone_v" :placeholder="$t('phone_verification_code')"></el-input>
          <el-button
            class="ml-3 mt-0"
            style="width: 120px"
            v-if="!phone_code.status"
            disabled
          >{{ phone_code.msg }}</el-button>
          <el-button
            v-else
            class="ml-3 mt-0"
            style="width: 120px"
            @click="getPhoneCode"
          >{{ $t("get_verification_code") }}</el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-form :model="forgetForm" ref="password" :rules="forgetRules">
      <el-form-item>
        <el-input type="password" v-model="forgetForm.password" :placeholder="$t('new_password')"></el-input>
      </el-form-item>
      <el-form-item prop="confirm" v-if="type == 'forget'">
        <el-input type="password" v-model="forgetForm.confirm" :placeholder="$t('p_input_confirm')"></el-input>
      </el-form-item>

      <el-button
        type="primary"
        :disabled="!forgetStatus"
        @click="forgetSubmit"
        class="mt-2"
        v-if="type == 'forget'"
        :loading="loading"
      >{{ $t('submit')}}</el-button>
      <el-button
        type="primary"
        :disabled="!forgetStatus"
        @click="registerSubmit"
        class="mt-2"
        v-if="type == 'register'"
        :loading="loading"
      >{{ $t('register')}}</el-button>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
  Model,
  Emit
} from 'vue-property-decorator';
import { ForgetData } from '@/types/components/forget.interface';
import Base64 from 'base-64';
import {
  PhoneCode,
  ForgetForm,
  ForgetRules,
  LanguageItem
} from '@/types/components/headerBar.interface';
import {
  RegisterQuery,
  ForgetPasswordQuery,
  AlidayuQuery
} from '@/types/api/login.interface';
import { AccountState, UserInfo } from '@/types/store/account.interface';
import { State, Getter, Mutation } from 'vuex-class';
import { alidayu, register, forgetPassword } from '@/api/login';
import areaCode from '@/utils/areaCode';
import { watch } from 'fs';
import verfyCpde from '@/utils/verfyCpde.ts';

let verfyObj: any;
@Component({})
export default class Forget extends Vue {
  get forgetStatus(): boolean {
    let status = true;
    Object.keys(this.forgetForm).map(key => {
      if (!this.forgetForm[key]) {
        if (!(this.type === 'register' && key === 'confirm')) {
          status = false;
        }
      }
    });
    return status;
  }
  @State('account') readonly Account!: AccountState;
  @Getter readonly username!: string;
  @Mutation changeLoginStatus!: (status: boolean) => void;
  @Mutation setUserInfo!: (userinfo?: UserInfo) => void;
  @Mutation setLocale!: (lang: string) => void;

  @Prop(String) readonly type!: string;
  @Model('changeStatus', { default: false }) readonly showStatus!: boolean;

  areaCode: string[] = [];
  forgetshow: boolean = this.showStatus;
  phone_code: PhoneCode = { status: true, msg: '' };
  loading: boolean = false;
  forgetForm: ForgetForm = {
    status: '86',
    phone: '',
    pic_v: '',
    phone_v: '',
    password: '',
    confirm: ''
  };
  forgetRules: ForgetRules = {
    phone: [
      {
        required: true,
        trigger: 'change',
        message: this.getMsg('p_input_phone')
      }
    ],
    pic_v: [
      { required: true, trigger: 'change', message: this.getMsg('p_input_pic') },
      { validator: this.validatePass, trigger: 'blur' }
    ],
    confirm: [
      { validator: this.validateConfirm, trigger: 'blur' }
    ]
  };

  @Watch('showStatus') onShowStatus(value: boolean) {
    if (value) {
      setTimeout(() => {
        this.changePic();
        this.forgetshow = value;
      }, 300);
    } else {
      this.forgetshow = false;
    }
  }

  getMsg(str: string) {
    return this.$i18n.t(str)
  }

  validatePass(rule: any, value: string, callback: any) {
    if (verfyObj && !verfyObj.validate(value)) {
      callback(new Error(this.getMsg('p_input_pic_v') as string));
    } else {
      callback();
    }
  };
  validateConfirm(rule: any, value: string, callback: any) {
    if (value !== this.forgetForm.password) {
      callback(new Error(this.getMsg('p_input_confirm_v') as string));
    } else {
      callback();
    }
  };

  changePic() {
    verfyObj = new verfyCpde({ id: 'vericode' }).init();
  }

  @Emit('changeStatus') forgetcloase() {
    Object.keys(this.forgetForm).map(key => {
      this.forgetForm[key] = '';
    });
    const ForgetFormEle: any = this.$refs.forgetForm;
    ForgetFormEle.resetFields();
    this.forgetForm.status = '86';
    return false;
  }

  // 获取手机验证码
  getPhoneCode() {
    this.phone_code.status = false;
    const forgetEle: any = this.$refs.forgetForm;
    forgetEle.validate((valid: boolean) => {
      let new_phone: string = '';
      if (this.forgetForm.status === '86') {
        new_phone = this.forgetForm.phone;
      } else {
        new_phone = this.forgetForm.status + '-' + this.forgetForm.phone;
      }
      if (valid) {
        const params: AlidayuQuery = {
          phone: new_phone,
          is_pwd: this.type === 'register' ? 0 : 1,
          identify: Base64.encode(this.forgetForm.pic_v)
        };
        alidayu(params).then(({ result, message }: any) => {
          if (result === 1) {
            let count = 60;
            this.phone_code.msg = count + ' s';
            setInterval(() => {
              if (count === 0) {
                this.phone_code.status = true;
              } else {
                this.phone_code.msg = --count + ' s';
              }
            }, 1000);
          } else {
            this.$message.error(message);
            this.phone_code.status = true;
          }
        });
      } else {
        this.phone_code.status = true;
        return false;
      }
    });
  }
  // 注册
  registerSubmit() {
    this.loading = true;
    let new_phone = '';
    if (this.forgetForm.status === '86') {
      new_phone = this.forgetForm.phone;
    } else {
      new_phone = this.forgetForm.status + '-' + this.forgetForm.phone;
    }
    const params = {
      phone: new_phone,
      pwd: this.forgetForm.password,
      code: this.forgetForm.phone_v,
      lan: this.$i18n.locale === 'en' ? 'en' : ''
    };
    register(params).then((item: any) => {
      if (item.result === 1) {
        this.forgetcloase();
        setTimeout(() => {
          this.changeLoginStatus(true);
        }, 300);
      } else {
        this.$message.error(item.message);
      }
      this.loading = false;
    });
  }
  // 忘记密码
  forgetSubmit() {
    const pwEle: any = this.$refs.password;
    pwEle.validate((valid: boolean) => {
      if (valid) {
        this.loading = true;
        const params = {
          phone: this.forgetForm.phone,
          pwd1: this.forgetForm.password,
          pwd2: this.forgetForm.confirm,
          code: this.forgetForm.phone_v,
          lan: this.$i18n.locale === 'en' ? 'en' : ''
        };
        forgetPassword(params).then((item: any) => {
          if (item.result === 1) {
            this.forgetcloase();
            setTimeout(() => {
              this.changeLoginStatus(true);
            }, 300);
          } else {
            this.$message.error(item.message);
          }
          this.loading = false;
        });
      } else {
        return false;
      }
    });
  }

  getareaCode(locale: string) {
    this.areaCode = (areaCode as any)[locale];
    this.setLocale(locale);
  }

  mounted() {
    this.getareaCode(this.$i18n.locale);
    console.log(this);
  }
}
</script>

<style lang="scss">
.pic_verit {
  .vericode {
    width: 82px;
    height: 46px;
    margin: 0 4px 0 12px;
    border-radius: 5px;
    overflow: hidden;
  }
  .underline {
    font-size: 12px;
    color: #51a0f1;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>

