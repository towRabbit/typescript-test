/*
 * @Author: jizhiqiang
 * @Date: 2019-05-16 17:39:43
 * @Last Modified by: levi-ji
 * @Last Modified time: 2019-05-17 16:08:50
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

/**
 * @msg: vue页面模版
 */
const VueTep = `<template>
  <div class="${dirName}-wrap"></div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator"
  import { Getter, Action } from 'vuex-class'
  import { ${capPirName} } from '@/types/components/${dirName}.interface'

  @Component
  export default class ${capPirName} extends Vue {

  }
</script>

<style lang="scss">
  @import "@/style/variables.scss";

  .${dirName}-wrap {

  }
</style>

`

// interface 模版
const interfaceTep = `// 
export interface ${capPirName} {

}

`

process.chdir(`${basePath}/components`) // cd components
fs.writeFileSync(`${dirName}.vue`, VueTep) // vue 

process.chdir(`${basePath}/types/components`) // cd components
fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep) // interface 

process.exit(0)