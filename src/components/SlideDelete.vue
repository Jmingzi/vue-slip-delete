<template>
    <div class="m-slide" v-slide="">
      <div class="m-slide__top">
        <slot name="item">
        </slot>
      </div>
      <div :class="`m-slide__del ${delCls}`" @click="$emit('del-click')">
        <span>
          <slot name="del">删除</slot>
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
    props: {
      threshold: {
        type: Number,
        default: 35
      },
      delCls: {
        type: String,
        default: 'm-slide__del-red'
      }
    },

    methods: {
      getTouch(touch) {
        return touch.changedTouches[0] || touch.targetTouches[0]
      },
      setTranslateX(node, num) {
        node.style.transform = `translateX(${num}px)`
      },
      setTransition(node, s = 0.3) {
        // transition: transform .3s linear;
        node.style.transition = `transform ${s}s ease`
      }
    },

    directives: {
      slide: {
        bind(el, binding, vNode) {
          let startX, diffX
          let vm = vNode.context
          let childSlideTop = el.childNodes[0]

          el.addEventListener('touchstart', (e)=> {
            startX = vm.getTouch(e).clientX
          })

          el.addEventListener('touchmove', (e)=> {
            diffX = vm.getTouch(e).clientX - startX

            if (
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
            diffX = vm.getTouch(e).clientX - startX
            if (diffX > 0 && !vm.open) {
              return void 0
            }

            diffX = diffX > 0 ? vm.delAreaWidth - diffX : diffX
            vm.setTransition(childSlideTop)
            if (Math.abs(diffX) < vm.threshold) {
              // 未超过阀值，重置
              vm.open = false
              vm.setTranslateX(childSlideTop, 0)
            } else {
              // 直接最大化
              vm.open = true
              vm.setTranslateX(childSlideTop, -vm.delAreaWidth)
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
      }
    }

    .m-slide__del-red {
      background-color: #f23030;
    }
  }
</style>
