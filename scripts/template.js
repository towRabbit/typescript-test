/*
 * @Author: jizhiqiang 
 * @Date: 2019-05-16 17:45:33 
 * @Last Modified by: levi-ji
 * @Last Modified time: 2019-05-17 16:08:35
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
  import { ${capPirName}Data } from '@/types/views/${dirName}.interface'

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
const interfaceTep = `// ${dirName} 接口定义文件
export interface ${capPirName}Data {
  pageName: string
}

`

// fs.mkdirSync(`${basePath}/views/${dirName}`) // mkdir

process.chdir(`${basePath}/views`); // cd views
fs.writeFileSync(`${dirName}.vue`, VueTep) // vue

process.chdir(`${basePath}/types/views`); // cd types
fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep) // interface

process.exit(0)