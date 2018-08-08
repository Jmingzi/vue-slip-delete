<template>
    <div id="app">
        <div class="wrapper" v-page="{ wrapperCls: 'wrapper-item', callback: getList }">
            <div class="wrapper-item">
                <slide-del
                  v-for="(item, i) in list"
                  :key="i"
                  ref="slipDel"
                  del-text="删除商品"
                  @slip-open="slipOpen"
                >
                  <div class="demo-item">{{item.title}}</div>
                  <div slot="del">删除icon可编辑</div>
                </slide-del>
            </div>
        </div>
    </div>
</template>

<script>
  import page from '../m-dist/mPage'
  import SlideDel from '../m-dist/mSlideDelete'
  // import SlideDel from './components/SlideDelete'

  export default {
    name: 'app',
    data() {
      return {
        mockData: [],
        list: [],
      }
    },
    mixins: [page],
    created() {
      // this.$box.alert('呵呵').then(()=> {
      //   this.$box.confirm('heheheh')
      // })
      // this.mockData = new Array(100).fill(1).map((item, i)=> {
      //   return { title: i + ' this is a simple question' }
      // })
      for (let i = 0; i < 100; i++) {
        this.mockData.push({ title: i + 1 + ' this is a simple question' })
      }
      this.getList()
    },
    methods: {
      getList(pageCb) {
        console.log('currentPage', this.currentPage)
        let currIndex = this.pageSize * (this.currentPage - 1)
        let res = this.mockData.slice(currIndex, currIndex + this.pageSize)
        this.list = this.list.concat(res)
        pageCb && pageCb(res)
      },
      slipOpen(vm) {
      }
    },
    components: {
      SlideDel
    }
  }
</script>

<style>
    .demo-item {
        padding: 20px 0;
        border-bottom: 1px #ccc solid;
    }
    .wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        bottom: 0;
        overflow: auto;
    }
</style>
