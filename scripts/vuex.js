/*
 * @Author: jizhiqiang
 * @Date: 2019-05-16 17:39:43
 * @Last Modified by: jizhiqiang
 * @Last Modified time: 2019-05-17 11:45:22
 */

const fs = require('fs')
const path = require('path')
const basePath = path.resolve(__dirname, '../src')

const dirName = process.argv[2]
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1)
if (!dirName) {
  console.log('文件夹名称不能为空！')
  console.log('示例：yarn vuex ${capPirName}')
  process.exit(0)
}

// vuex 模版
const vuexTep = `import { ${capPirName}State } from '@/types/store/${dirName}.interface'
import { GetterTree, MutationTree, ActionTree } from 'vuex'

const state: ${capPirName}State = {}

// 强制使用getter获取state
const getters: GetterTree<${capPirName}State, any> = {
  // author: (state: ${capPirName}State) => state.author
}

// 更改state
const mutations: MutationTree<${capPirName}State> = {
  // UPDATE_STATE(state: ${capPirName}State, data: ${capPirName}State) {}
}

const actions: ActionTree<${capPirName}State, any> = {
  // UPDATE_STATE_ASYN({ commit, state: ${capPirName}State }, data: ${capPirName}State) {
  //   commit('UPDATE_STATE', data)
  // }
}

export default {
  state,
  getters,
  mutations,
  actions
}
`

// interface 模版
const interfaceTep = `// ${dirName} 参数类型
export interface ${capPirName}State {

}
`

process.chdir(`${basePath}/store/module`) // cd module
fs.writeFileSync(`${dirName}.ts`, vuexTep)

process.chdir(`${basePath}/types/store`) // cd vuex
fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep) // interface 

process.chdir(`${basePath}/store/module`) // cd module


process.exit(0)