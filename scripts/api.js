/*
 * @Author: jizhiqiang
 * @Date: 2019-05-16 17:39:43
 * @Last Modified by: jizhiqiang
 * @Last Modified time: 2019-05-17 11:10:50
 */

const fs = require('fs')
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const dirName = process.argv[2]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1)
if (!dirName) {
  console.log('文件夹名称不能为空！')
  console.log('示例：yarn tep ${capPirName}')
  process.exit(0)
}

// api 接口模版
const apiTep = `import request from '@/utils/request'
import { ${capPirName} } from '@/types/api/${dirName}.interface'

//  ----------------------------
export function ${dirName}(query: ${capPirName}) {
  return request({
    url: '',
    method: 'get',
    data: query
  })
}
`

// interface 模版
const interfaceTep = `// ${dirName} 参数类型
export interface ${capPirName} {

}
`

process.chdir(`${basePath}/api`) // cd api
fs.writeFileSync(`${dirName}.ts`, apiTep) // ts 

process.chdir(`${basePath}/types/api`) // cd api
fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep) // interface 

process.exit(0)