<template>
  <div id="app">
    <el-container class="h-100">
      <header-bar></header-bar>
      <el-main>
        <router-view v-if="isRouterAlive"></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
// import HeaderBar from '_c/headerBar.vue';
import { Component, Vue, Provide } from 'vue-property-decorator';
import HeaderBar from '@/components/headerBar.vue'

@Component({
  components: {
    HeaderBar,
  },
})
export default class Home extends Vue {
  @Provide() reload: () => void = this.reloadFn

  isRouterAlive: boolean = true

  reloadFn() {
    this.isRouterAlive = false
    this.$nextTick(() => {
      this.isRouterAlive = true
    })
  }

}
</script>

<style lang="scss" scoped>

.el-main {
  padding: 0;
  height: 100%;
  overflow: auto;
}
</style>
