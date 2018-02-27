<template>
  <m-mask v-show="visible">
    <div class="m-msgBox">
      <div class="m-msgBox_title" v-if="title">{{title}}</div>
      <div class="m-msgBox_content">
        <span>{{msg}}</span>
      </div>
      <div class="m-msgBox_foot">
        <div
          class="m-msgBox_btn"
          v-if="!noCancel"
          @click="doAction('cancel')">{{cancelTxt}}</div>
        <div
          :class="confirmBtnCls"
          @click="doAction('confirm')">{{okTxt}}</div>
      </div>
    </div>
  </m-mask>
</template>

<script>
  import MMask from '../mask'

  export default {
    name: 'msg-box',
    data() {
      return {
        title: '',
        msg: '',
        cancelTxt: '取消',
        okTxt: '确认',
        noCancel: false,
        visible: false
      }
    },
    created() {
    },
    props: {
    },
    computed: {
      confirmBtnCls() {
        return `m-msgBox_btn ${this.noCancel ? 'w100' : ''}`
      }
    },
    methods: {
      doAction(action) {
        this.callback.call(this, action)
        this.visible = false
      }
    },
    components: {
      MMask
    }
  }
</script>

<style lang="scss">
  @import '../theme/var';
  @import '../theme/border';

  .m-msgBox {
    position: absolute;
    width: 300px;
    background-color: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    text-align: center;
    overflow: hidden;
    font-size: 14px;

    .m-msgBox_title {
      font-size: 16px;
      font-weight: bold;
      padding-top: 10px;
    }
    .m-msgBox_content {
      min-height: 50px;
      padding: 20px 20px 20px 20px;
    }
    .m-msgBox_foot {
      font-size: 0;
      @extend %bd-t;
      padding-top: 1px;

      .m-msgBox_btn {
        display: inline-block;
        vertical-align: middle;
        width: 50%;
        font-size: 14px;
        line-height: 40px;
        color: $msgBox-btn;
        &:first-child {
          @extend %bd-r;
        }
        &:active {
          background-size: 1px;
          background-color: $btn-hover-bg;
        }
        &.w100 {
          width: 100%;
        }
      }
    }
  }
</style>
