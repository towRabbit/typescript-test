// 登录
export interface LoginQuery {
  phone: string | number; // 手机号码
  pwd: string;            // 密码a
}

// 注册
export interface RegisterQuery {
  phone: string | number; // 手机号码
  pwd: string;            // 密码
  code: string | number;  // 手机验证码
}

// 忘记密码
export interface ForgetPasswordQuery {
  phone: string | number; // 手机号码
  code: string | number;  // 手机验证码
  pwd1: string;           // 密码
  pwd2: string;           // 密码确认
}

// 手机验证码
type pwdStatus = 0 | 1;
export interface AlidayuQuery {
  phone: string | number;  // 手机号码
  is_pwd: pwdStatus;       // 是否忘记密码 1找回密码 0注册
  identify: string;        // 验证码
}