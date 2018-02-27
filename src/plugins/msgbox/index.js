import Vue from 'vue'
import Main from './main.vue'

const defaultOptions = {
  title: '',
  msg: '这是一段提示',
  cancelTxt: '取消',
  okTxt: '确认',
  noCancel: false,
  visible: false
}
const msgBoxConstructor = Vue.extend(Main)
const instance = new msgBoxConstructor({
  el: document.createElement('div'),
})

const defaultCallback = function(action) {
  if (action === 'confirm') {
    this.resolve(action)
  } else {
    this.reject(action)
  }
}

const msgBox = function(options, callback) {
  let mergeOptions = { ...defaultOptions, ...options }
  for (let prop in mergeOptions) {
    if (mergeOptions.hasOwnProperty(prop)) {
      instance[prop] = mergeOptions[prop]
    }
  }

  if (callback === undefined) {
    callback = defaultCallback
  }
  instance.callback = callback

  // 合并默认参数
  document.body.appendChild(instance.$el)

  return new Promise((resolve, reject)=> {
    // 回传状态
    instance.resolve = resolve
    instance.reject = reject

    Vue.nextTick(()=> {
      instance.visible = true
    })
  })
}

msgBox.alert = function(msg, options = {}) {
  if (typeof msg === 'object') {
    options = msg
  } else {
    options.msg = msg
  }
  options.noCancel = true
  return msgBox(options)
}

msgBox.confirm = function(msg, options = {}) {
  if (typeof msg === 'object') {
    options = msg
  } else {
    options.msg = msg
  }
  return msgBox(options)
}

msgBox.close = function() {
  instance.visible = false
}

export default msgBox
