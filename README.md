# vue-slip-delete
<p>
  <a href="https://www.npmjs.com/package/vue-slip-delete"><img src="https://img.shields.io/npm/dm/vue-slip-delete.svg" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/vue-slip-delete"><img src="https://img.shields.io/npm/v/vue-slip-delete.svg" alt="Version"></a>
</p>

vue left slip，左滑删除组件

# Usage
```
npm install vue-slip-delete --save
```

```vue
<template>
  <slip-del
    @del-click="">
    <div slot="item" class="demo-item">delete item</div>
  </slip-del>
</template>

<script>  
import SlipDel from 'vue-slip-delete'

export default {
  componnets: {
    SlipDel
  }
}
</script>
```

# props  
名称|类型|默认值|描述
----|----|----|----
threshold|Number|35|滑动的阀值
del-cls|String|m-slide__del-red|删除按钮的类名 

# Event
名称|描述
----|----
del-click|点击删除的回调
