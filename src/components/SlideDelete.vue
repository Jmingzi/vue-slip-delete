<template>
    <div class="m-slide" v-slide="">
      <div class="m-slide__top" ref="slideItem">
        <slot name="item">
        </slot>
      </div>
      <div :class="`m-slide__del ${delCls}`" @click="$emit('del-click')">
        <span>
          <slot name="del">{{ delText }}</slot>
        </span>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'm-slide',
    data() {
      return {
        delAreaWidth: 70,
        open: false
      }
    },
    watch: {
      open: function (val) {
        this.setTranslateX(this.$refs.slideItem, val ? -this.delAreaWidth : 0)
        return val
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
      setTranslateX(node, num) {
        if (node) {
          node.style.transform = `translateX(${num}px)`
          node.style.WebkitTransform = `translateX(${num}px)`
          node.style.msTransform = `translateX(${num}px)`
        }
      },
      setTransition(node, s = 0.3) {
        if (node) {
          node.style.transition = `transform ${s}s ease`
          node.style.WebkitTransition = `transform ${s}s ease`
          node.style.msTransition = `transform ${s}s ease`
        }
      },
      // 倾斜角度 向左小于45度时才认为是左滑操作
      // 也就是y < x
      isAngleLeft(y, x) {
        return Math.abs(y) < Math.abs(x)
      },
      setOpen(type = false) {
        this.open = type
      }
    },

    directives: {
      slide: {
        bind(el, binding, vNode) {
          let startX, startY, diffX, diffY
          let vm = vNode.context
          let childSlideTop = el.childNodes[0]

          el.addEventListener('touchstart', (e)=> {
            e.stopPropagation()
            startX = vm.getTouch(e).clientX
            startY = vm.getTouch(e).clientY
          })

          el.addEventListener('touchmove', (e)=> {
            e.stopPropagation()
            diffX = vm.getTouch(e).clientX - startX
            diffY = vm.getTouch(e).clientY - startY

            if (
              vm.isAngleLeft(diffY, diffX) &&
              Math.abs(diffX) <= vm.delAreaWidth &&
              (
                diffX < 0 && !vm.open ||
                diffX > 0 && vm.open
              )
            ) {
              // 左滑时，没有打开
              // 右滑时，已打开
              vm.setTransition(childSlideTop, 0)
              vm.setTranslateX(childSlideTop, vm.open ? diffX - vm.delAreaWidth : diffX)
            }
          })

          el.addEventListener('touchend', (e)=> {
            e.stopPropagation()
            diffX = vm.getTouch(e).clientX - startX
            diffY = vm.getTouch(e).clientY - startY

            vm.setTransition(childSlideTop)
            if (
              diffX > 0 && diffX > vm.threshold ||
              diffX < 0 && diffX > -vm.threshold
            ) {
              vm.open = false
              vm.setTranslateX(childSlideTop, 0)
            } else if (
              vm.isAngleLeft(diffY, diffX) &&
              (
                diffX > 0 && diffX <= vm.threshold ||
                diffX < 0 && diffX <= -vm.threshold
              )
            ) {
              vm.open = true
              vm.setTranslateX(childSlideTop, -vm.delAreaWidth)
              vm.$emit('slip-open', childSlideTop)
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
