<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
export default defineComponent({
  inject: {
    operator: {from: 'operatorConfig'},
    config: {from: 'config'}
  },
  computed:{
    isLabor(){
      return this.config?.appInfo?.indexOf('abor') > 0
    }   
  }
})
</script>

<template>
  <header class="jp-menu-header">
    <div :class="{'jp-menu-header__logo-labor': isLabor}" class="jp-menu-header__logo"></div>
    <div class="jp-menu-header__title">{{operator.headerTitle}}</div>
  </header>
</template>

<style lang="stylus" scoped>
.jp-logo
  text-align center
  display flex
  flex-direction column
  align-items center
  padding 12px 0
  margin 0 auto

.jp-logo > img
  height 184px
  width 150px
  display block

.jp-logo > h1
  color #3c3c3c
  margin 6px

.jp-menu-header__logo-labor
  background-image: url('/assets/img/logo_labor.png');
</style>
