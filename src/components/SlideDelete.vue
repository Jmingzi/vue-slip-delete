<template>
  <div class="m-slide" :class="{'active': selectedState}" v-slide="">
    <div class="m-slide__top" ref="slideItem" :style="wrapperStyle">
      <slot name="item" v-if="$slots.item" />
      <slot v-else />
    </div>
    <div class="m-slide__del" @click="delClickFn">
      <span>{{ delText }}</span>
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
    },
  },

  data() {
    return {
      open: false,
      offset: 0,
      draging: false,
      componentName: COMPONENT_NAME,
      selectedState: false,
      delAreaWidth: 70,
      threshold: 35,
      delText: '删除'
    }
  },

  props: {
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
      this.selectedState = type
      if(this.selectedState) {
        this.delAreaWidth=120
      } else {
        this.delAreaWidth=70
      }
      this.open = type
      this.offset = type ? -this.delAreaWidth : 0
      this.delText = '删除'
    },

    closeOther() {
      this.$parent.$children.filter(vNode =>
        vNode.$el.classList.contains(this.componentName) &&
        vNode.open &&
        vNode !== this
      )
      .forEach(vNode => {
        vNode.setOpen(false)
      })
    },
    delClickFn() {
      if (this.selectedState) {
        this.$emit('del-click')
      } else {
        this.selectedState = true
        this.offset = -120
        this.delAreaWidth = 120
        this.threshold = 5
        this.delText = '确认删除'
      }
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
            vm.$emit('slip-close', vm);
            console.log('已经关闭')
            vm.selectedState = false;
            vm.delText = '删除'
            vm.delAreaWidth = 70
            vm.threshold = 35
          } else if (
            vm.isAngleLeft(diffX, diffY) &&
            (
              diffX > 0 && diffX <= vm.threshold ||
              diffX < 0 && diffX <= -vm.threshold
            )
          ) {
            vm.open = true
            vm.offset = -vm.delAreaWidth
            vm.closeOther.call(vNode, el)
            vm.$emit('slip-open', vm)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.m-slide.active{
  .m-slide__top{
    /* animation: nextBtn1 .3s linear 1 forwards;
    -webkit-animation: nextBtn1 .3s linear 1 forwards; */
  }
  .m-slide__del{
    background: red;
    color: #fff;
    animation: nextBtn .25s linear 1 forwards;
    -webkit-animation: nextBtn .25s linear 1 forwards;
  }
}
@keyframes nextBtn {
  0%   {width: 70px;}
  100% {width: 120px;}
}
@-webkit-keyframes nextBtn {
  0%   {width: 70px;}
  100% {width: 120px;}
}
@keyframes nextBtn1 {
  /* 0%   {left: 0;}
  100% {left: -50px;} */
  0%   {transform: translateX(-70px)}
  100% {transform: translateX(-120px)}
}
@-webkit-keyframes nextBtn1 {
  /* 0%   {left: 0;}
  100% {left: -50px;} */
  0%   {transform: translateX(-70px)}
  100% {transform: translateX(-120px)}
}
.m-slide {
  position: relative;

  .m-slide__top {
    position: relative;
    top:0;
    left: 0;
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
    color: #666;
    background: #f2f2f2;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    span {
      text-align: center;
    }
  }

  .m-slide__del-red {
    background-color: #f2f2f2;
    text-align: center;
    color: #666666;
  }
}
</style>
