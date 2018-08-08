# vue-slip-delete
<p>
  <a href="https://www.npmjs.com/package/vue-slip-delete"><img src="https://img.shields.io/npm/dm/vue-slip-delete.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-slip-delete"><img src="https://img.shields.io/npm/v/vue-slip-delete.svg" alt="Version"></a>
</p>

vue left slip，左滑删除组件

> 持续维护中，如果该轮子确实帮助到了你，请:star: star :star: 谢谢。

# demo

<img src="./src/assets/demo.gif" width="300px">

# usage
```
npm install vue-slip-delete --save
```

```vue
<template>
  <slip-del
    v-for="(item, i) in list"
    :key="i"
    ref="slipDel"
    del-text="删除商品"
    @slip-open="slipOpen"
    @del-click="del"
  >
    <div class="demo-item">delete item</div>
    <div slot="del">删除icon可编辑</div>
  </slip-del>
</template>

<script>
import SlipDel from 'vue-slip-delete'

export default {
  components: {
    SlipDel
  },
  methods: {
    slipOpen(vm) {
      // 无需手动关闭
    },
    del() {
      // 删除回调
    }
  }
}
</script>
```
# feature
- [x] 滑动角度判断
- [x] 滑动结束回调
- [x] 低版本兼容

# props
名称|类型|默认值|描述
----|----|----|----
threshold|Number|35|滑动的阀值
del-cls|String|m-slide__del-red|删除按钮的类名
del-text|String|删除|删除文案

# event
名称|描述
----|----
del-click|点击删除的回调
slip-open|滑动打开后的回调

# method
名称|描述
----|----
setOpen|手动打开或关闭 删除

# slots
name|描述
----|----
default|条目内容
item `compatible` |条目内容(不推荐)
del|删除



