export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      noData: false
    }
  },
  directives: {
    page: {
      bind(el, binding, vNode) {
        // check wrapper class
        let wrapperHeight, childNodeWrapperHeight
        let { wrapperCls, callback } = binding.value
        let childNode = el.childNodes[0]
        let vm = vNode.context
        if (
          wrapperCls &&
          childNode &&
          childNode.classList.contains(wrapperCls)
        ) {
          el.addEventListener('scroll', vm.throttle((e)=> {
            wrapperHeight = el.offsetHeight
            childNodeWrapperHeight = childNode.offsetHeight
            if (
              wrapperHeight + e.target.scrollTop >= childNodeWrapperHeight &&
              !vm.noData
            ) {
              vm.currentPage ++
              callback && callback((data)=> {
                if (data instanceof Array) {
                  vm.noData = data.length === 0
                  // if (vm.noData) {
                  //   console.log(vm.currentPage === 2 ? 'no data' : 'no more data')
                  // }
                } else {
                  console.error('params type must be an Array for page callback')
                }
              })
            }
          }, 10))
        } else {
          console.log('you should give wrapper class name')
        }
      }
    }
  },
  methods: {
    throttle(fn, time) {
      let now, timer, args, context
      let previousTime = 0
      let later = function () {
        clearTimeout(timer)
        fn.apply(context, args)
        timer = context = args = null
      }

      return function () {
        args = arguments
        context = this
        now = Date.now()

        if (!timer && previousTime === 0) {
          previousTime = now
        }

        let remainTime = time - (now - previousTime)
        // 判断时间间隔
        if (remainTime <= 0) {
          previousTime = now
          if (timer) {
            clearTimeout(timer)
            timer = null
          }
          fn.apply(context, args)
          context = args = null
        } else if (!timer) {
          timer = setTimeout(later, remainTime)
        }
      }
    }
  }
}
