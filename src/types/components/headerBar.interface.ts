// LoginForm 参数类型
export interface LoginForm {
  phone: string | number;
  pwd: string;
  [key: string]: any;
}

// ForgetForm 参数类型
export interface ForgetForm {
  status: string;
  phone: string;
  pic_v: string;
  phone_v: string;
  password: string;
  confirm: string;
  [key: string]: any;
}

// ForgetRules 参数类型
export interface ForgetRules {
  phone: object[];
  pic_v: object[];
  confirm: object[];
}

// LoginError 参数类型
export interface LoginError {
  phone: string;
  pwd: string;
}

// LanguageItem 参数类型
export interface LanguageItem {
  name: string;
  value: string;
}

// 获取手机验证参数 参数类型
export interface LanguageItem {
  name: string;
  value: string;
}

// 数据返回格式 参数类型
export interface CallBack {
  result: number;
  message: string;
  userinfo?: object;
  data?: object | object[];
}

// PhoneCode 参数类型
export interface PhoneCode {
  status: boolean;
  msg: string;
}
