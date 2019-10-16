import request from '@/utils/request'

// 获取 type list ----------------------------
export function getTypeList() {
  return request({
    url: '/submit/typelist',
    method: 'get'
  })
}

// 获取我的应用列表 ----------------------------
interface GetAppList {
  p: string | number; // 页码
}
export function getAppList(query: GetAppList) {
  return request({
    url: '/submit/applist',
    method: 'get',
    data: query
  })
}

// 获取应用详情 ----------------------------
interface GetAppDetail {
  id: string | number; // 应用id
}
export function getAppDetail(query: GetAppDetail) {
  return request({
    url: '/submit/appDetail',
    method: 'post',
    data: query
  })
}

// 获取cstoken ----------------------------
export function getCstoken() {
  return request({
    url: '/submit/cstoken',
    method: 'post'
  })
}

// 提交应用 ----------------------------
interface SubmitApp {
  app_name: string;            // 应用名称
  official: string;            // 官方网站
  types: string;               // 应用类型
  ms: string;                  // 标语
  contents: string;            // 应用描述
  andr_weburl: string;         // 安卓下载地址
  ios_weburl: string;          // IOS下载地址
  email: string;               // 邮箱
  wx: string;                  // 微信
  telegram: string;            // telegram
  app_logo: string;            // logo
  _cstoken: string;            // cstoken
  id?: string | number;        // 应用id 修改信息时传
  [propName: string]: any;     // 包上传回传数据
}
export function submitApp(query: SubmitApp) {
  return request({
    url: '/submit/submitApp',
    method: 'post',
    data: query
  })
}

// 更新应用包 ----------------------------
interface UpdatePackage {
  id: string | number;        // 应用id
  system: string;             // 系统
  app_name: string;           // 应用名称
  [propName: string]: any;    // 包上传回传数据
}
export function updatePackage(query: UpdatePackage) {
  return request({
    url: '/submit/updatePackage',
    method: 'post',
    data: query
  })
}
