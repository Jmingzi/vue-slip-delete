<template>
    <div :class="componentName" v-slide="">
      <div class="m-slide__top" ref="slideItem" :style="wrapperStyle">
        <slot name="item" v-if="$slots.item" />
        <slot v-else />
      </div>
      <div :class="`m-slide__del ${delCls}`" @click="$emit('del-click')">
        <slot name="del" v-if="$slots.del" />
        <span v-else>{{ delText }}</span>
      </div>
    </div>
</template>

<script>
  const COMPONENT_NAME = 'm-slide'

  export default {
    name: COMPONENT_NAME,

    computed: {
      wrapperStyle() {
        return {
          transform: `translate3d(${this.offset}px, 0, 0)`,
          transition: this.draging ? 'none' : '.6s cubic-bezier(0.18, 0.89, 0.32, 1)'
        }
      }
    },

    data() {
      return {
        delAreaWidth: 70,
        open: false,
        offset: 0,
        draging: false,
        componentName: COMPONENT_NAME
      }
    },

    props: {
      threshold: {
        type: Number,
        default: 35
      },
      delCls: {
        type: String,
        default: 'm-slide__del-red'
      },
      delText: {
        type: String,
        default: '删除'
      }
    },

    methods: {
      getTouch(touch) {
        return touch.changedTouches[0] || touch.targetTouches[0]
      },

      isAngleLeft(diffX, diffY) {
        const x = Math.abs(diffX)
        const y = Math.abs(diffY)
        return !(x < 5 || (x >= 5 && y >= x * 1.73))
      },

      setOpen(type = false) {
        this.open = type
        this.offset = type ? -this.delAreaWidth : 0
      },

      closeOther() {
        this.$parent.$children
          .filter(vNode =>
            vNode.$el.classList.contains(this.componentName) &&
            vNode.open &&
            vNode !== this
          )
          .forEach(vNode => {
            vNode.setOpen(false)
          })
      }
    },

    directives: {
      slide: {
        bind(el, binding, vNode) {
          let startX, startY, diffX, diffY
          let vm = vNode.context

          el.addEventListener('touchstart', (e)=> {
            const { clientX, clientY } = vm.getTouch(e)
            startX = clientX
            startY = clientY
            vm.draging = true
          })

          el.addEventListener('touchmove', (e)=> {
            const { clientX, clientY } = vm.getTouch(e)
            diffX = clientX - startX
            diffY = clientY - startY

            if (
              vm.isAngleLeft(diffX, diffY) &&
              Math.abs(diffX) <= vm.delAreaWidth &&
              (
                diffX < 0 && !vm.open ||
                diffX > 0 && vm.open
              )
            ) {
              event.preventDefault()
              vm.offset = vm.open ? diffX - vm.delAreaWidth : diffX
            }
          })

          el.addEventListener('touchend', (e)=> {
            const { clientX, clientY } = vm.getTouch(e)
            diffX = clientX - startX
            diffY = clientY - startY
            vm.draging = false

            if (
              diffX > 0 && diffX > vm.threshold ||
              diffX < 0 && diffX > -vm.threshold
            ) {
              vm.open = false
              vm.offset = 0
            } else if (
              vm.isAngleLeft(diffX, diffY) &&
              (
                diffX > 0 && diffX <= vm.threshold ||
                diffX < 0 && diffX <= -vm.threshold
              )
            ) {
              vm.open = true
              vm.offset = -vm.delAreaWidth
              vm.closeOther.call(vm, el)
              vm.$emit('slip-open', vm)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .m-slide {
    position: relative;

    .m-slide__top {
      position: relative;
      width: 100%;
      z-index: 1;
      background-color: #fff;
    }

    .m-slide__del {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 70px;
      color: #fff;
      z-index: 0;

      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }
    }

    .m-slide__del-red {
      background-color: #f23030;
    }
  }
</style>
