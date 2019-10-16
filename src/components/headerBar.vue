<template>
  <div class="header-bar h-100">
    <el-header :class="{nohome: nohome}">
      <el-row type="flex" class="h-100 content" justify="space-between">
        <el-col :span="4" class="d-flex align-items-center">
          <router-link to="/" tag="h1">
            <img src="~@/assets/svg/logo.svg" class="cursor-pointer" alt>
          </router-link>
        </el-col>
        <el-col :span="20">
          <div class="d-flex align-items-center h-100 justify-content-end">
            <router-link to="/">{{ $t('Home') }}</router-link>
            <div class="line"></div>
            <router-link to="/Submission">{{ $t('Application_Listing') }}</router-link>
            <div class="line"></div>
            <div class="account">
              <div
                class="login cursor-pointer d-flex align-items-center tobule"
                v-if="!Account.isLogin"
                @click="changeLoginStatus(true)"
              >
                <i class="byb-icon-login mr-2"></i>
                {{ $t('Login') }}
              </div>
              <div class="logout" v-else>
                <el-dropdown>
                  <span class="el-dropdown-link d-flex align-items-center tobule cursor-pointer">
                    <i class="byb-icon-login mr-2"></i>
                    <span>{{ username }}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <router-link to="/myApplication" tag="div" class="d-flex align-items-center">
                        <i class="byb-icon-application"></i>
                        <span>{{ $t('my_app') }}</span>
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <div class="d-flex align-items-center" @click="logout">
                        <i class="byb-icon-off"></i>
                        <span>{{ $t('logout') }}</span>
                      </div>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="line"></div>
            <div class="d-flex align-items-center contract">
              <a href="https://twitter.com/CoinPlayShop" class="mr-3 tobule" target="_bank">
                <i class="byb-icon-twitter"></i>
              </a>
              <a href="https://t.me/CoinPlayshop" target="_bank" class="mr-3 tobule">
                <i class="byb-icon-telegram"></i>
              </a>
              <el-dropdown placement="bottom" style="height: 26px">
                <i class="byb-icon-wechat tobule cursor-pointer"></i>
                <el-dropdown-menu slot="dropdown" class="p-0">
                  <el-dropdown-item class="p-3">
                    <img src="~@/assets/images/wchat-code.png" alt width="150px">
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

            <div class="line"></div>
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link d-flex align-items-center tobule cursor-pointer">
                <i class="byb-icon-language mr-2"></i>
                <span>{{ langName }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="item in language" :key="item.value" :command="item.value">
                  <span :class="item.value">{{item.name}}</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <!-- login -->
    <Login @showRegister="showRegister"/>

    <!-- forget -->
    <ForgetPassworld :type="type" v-model="registerStatus"/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { filter } from 'lodash';
import { login, alidayu, register, forgetPassword } from '@/api/login';

import {
  LoginForm,
  ForgetForm,
  ForgetRules,
  LoginError,
  LanguageItem,
  CallBack
} from '@/types/components/headerBar.interface';
import {
  LoginQuery,
  RegisterQuery,
  ForgetPasswordQuery,
  AlidayuQuery
} from '@/types/api/login.interface';
import { AccountState, UserInfo } from '@/types/store/account.interface';
import { State, Getter, Mutation } from 'vuex-class';
import Login from './login.vue';
import ForgetPassworld from './forget.vue';

let verfyObj: object = {};
@Component({
  components: {Login, ForgetPassworld},
})
export default class HeaderBar extends Vue {
  @State('account')readonly Account!: AccountState;
  @Getter readonly username!: string;
  @Mutation changeLoginStatus!: (status: boolean) => void;
  @Mutation setUserInfo!: (userinfo?: UserInfo) => void;
  @Mutation setLocale!: (lang: string) => void;

  nohome: boolean = false;
  locale: string = 'en';
  type: string = '';
  registerStatus: boolean = false;
  language: LanguageItem[] = [
    { name: '简体中文', value: 'zh' },
    { name: 'ENGLISH', value: 'en' }
  ];
  
  get langName(): string {
    const filterItem: LanguageItem = filter(
      this.language,
      (o: LanguageItem) => o.value === this.$i18n.locale
    )[0];
    return filterItem.name;
  }

  @Watch('$route')
  onChildChanged(val: { [propName: string]: any }) {
    this.nohome = val.name !== 'home';
  }

  logout() {
    this.setUserInfo();
    this.$router.push('/');
  }

  handleCommand(command: string) {
    this.$i18n.locale = command;
    localStorage.setItem('lang', command);

    const title: HTMLElement | null = document.querySelector('title');
    if (title) {
      if (command === 'zh') {
        title.innerHTML = '币用宝|全球首款区块链应用商店';
      } else {
        title.innerHTML = 'CoinPlay|The world\'s first blockchain app store';
      }
    }
  }
  
  showRegister(type: string) {
    this.registerStatus = true
    this.type = type
  }
  
  mounted() {
    const localeLang = localStorage.getItem('lang') || navigator.language;
    if (localeLang === 'en' || localeLang === 'en-US') {
      this.locale = 'en';
      this.$i18n.locale = 'en';
    }
    if (localeLang === 'zh' || localeLang === 'zh-CN') {
      this.locale = 'zh';
      this.$i18n.locale = 'zh';
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;

  .el-dropdown-link {
    color: #fff;
  }
}
.el-dropdown,
a,
[class^="byb-icon"] {
  color: #fff;
}
.line {
  background: rgba(255, 255, 255, 0.2);
}

.el-dropdown-menu [class^="byb-icon"] {
  color: rgba(51, 51, 51, 0.5);
}
.nohome {
  color: rgba(51, 51, 51, 0.7);
  background: #fff;
  box-shadow: 0 0 10px 0 rgba(81, 160, 241, 0.1);
  .el-dropdown-link {
    color: rgba(51, 51, 51, 0.7);
  }
  .el-dropdown,
  a,
  [class^="byb-icon"] {
    color: rgba(51, 51, 51, 0.7);
  }
  .line {
    background: #eee;
  }
}
@each $name in zh, en {
  .#{$name} {
    display: flex;
    align-items: center;

    &::before {
      content: "";
      float: left;
      height: 20px;
      width: 20px;
      margin-right: 8px;
      background-image: url("~@/assets/svg/#{$name}.svg");
    }
  }
}

.line {
  height: 30px;
  width: 1px;
  margin: 0 20px;
}
.contract {
  a {
    height: 26px;
  }
}
.byb-icon-login,
.byb-icon-application,
.byb-icon-off {
  font-size: 18px;
}


.tobule:hover {
  &,
  * {
    color: #51a0f1 !important;
  }
}
</style>
