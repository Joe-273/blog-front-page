<template>
  <div class="test-container">
    <div class="item" v-for="t in types" :key="t">
      <Icon :type="t" />
      <label>{{ t }}</label>
    </div>
  </div>
</template>

<script>
import '@/styles/global.less'
import Icon, { types } from './'
export default {
  components: {
    Icon,
  },
  data() {
    return {
      types,
    }
  },
}
</script>

<style scoped>
.test-container {
  display: flex;
  justify-content: center;
  margin: 30px auto;
  width: 580px;
  flex-wrap: wrap;
}
.item {
  margin: 1em;
  text-align: center;
}
.icon-container {
  display: block;
}
.iconfont {
  font-size: 2em;
  margin-bottom: 5px;
}
</style>
