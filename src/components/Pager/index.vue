<template>
  <div class="pager-container" v-if="totalPageNumber > 1">
    <span @click="handlerClick(1)" :class="{ disabled: current === 1 }">首页</span>
    <span @click="handlerClick(current - 1)" :class="{ disabled: current === 1 }">上一页</span>
    <span @click="handlerClick(item)" v-for="(item, index) in PageArray" :class="{ active: item === current }"
      :key="index">{{ item }}</span>
    <span @click="handlerClick(current + 1)" :class="{ disabled: current === totalPageNumber }">下一页</span>
    <span @click="handlerClick(totalPageNumber)" :class="{ disabled: current === totalPageNumber }">尾页</span>
  </div>
</template>

<script>
export default {
  props: {
    // 当前所在的页数
    current: {
      type: Number,
      default: 1,
    },
    // 每一页显示多少数据
    limit: {
      type: Number,
      default: 10,
    },
    // 总的数据量
    total: {
      type: Number,
      default: 0,
    },
    // 可见的页码数
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    handlerClick(newPage) {
      if (newPage < 1 || newPage > this.totalPageNumber) {
        return
      }
      if (newPage === this.current) return
      // 发送页面跳转信号
      this.$emit('pageChanged', newPage)
    },
  },
  computed: {
    totalPageNumber() {
      return Math.ceil(this.total / this.limit)
    },
    PageArray() {
      let min = this.current - Math.floor(this.visibleNumber / 2)
      // offsetNumber 指的是当前页码到左边的页码距离多少页码
      // 从而得出最小的页码是多少
      // 有最小的页码就可以得出最大的页码
      let offsetNumber = this.totalPageNumber - (this.visibleNumber - 1)
      if (offsetNumber < 1) {
        offsetNumber = 1
      }
      // 两种边界情况
      if (min < 1) {
        min = 1
      } else if (min > offsetNumber) {
        min = offsetNumber
      }

      // 判断数组长度
      let arrayLength;
      if (this.totalPageNumber > this.visibleNumber) {
        arrayLength = this.visibleNumber
      } else {
        arrayLength = this.totalPageNumber
      }

      let pageArray = new Array(arrayLength).fill(0).map(() => min++)
      return pageArray
    },
  },
}
</script>

<style lang="less" scoped>
@import '~@/styles/var.less';
@import '~@/styles/common.less';

.pager-container {
  height: 80px;
  .flex-center();
  margin-top: 40px;

  span {
    color: @words;
    font-size: 14px;
    .flex-center();
    .border-style(6px, @lightWords);
    background-color: @white;
    flex-shrink: 0;
    margin: 0 5px;
    padding: 0 15px;
    height: 40px;
    user-select: none;
    cursor: pointer;
    .hover-style(15px);

    &.disabled {
      background-color: #eee;
      color: #ccc;
      cursor: not-allowed;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    }

    &.active {
      background-color: @primary;
      cursor: auto;

      &:hover {
        transform: none;
        box-shadow: none;
      }
    }
  }
}
</style>
