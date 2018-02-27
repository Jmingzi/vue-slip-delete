<template>
  <div class="m-mask" @touchstart="">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'm-mask'
  }
</script>

<style lang="scss">
  @import './theme/common';
</style>

