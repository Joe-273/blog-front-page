import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { setTitle } from '@/utils'

// 静态方法，启动vue-router插件
if (!window.VueRouter) {
  Vue.use(VueRouter)
}

// 创建一个路由实例
const router = new VueRouter({
  // 路由配置：

  // 路由模式
  mode: 'history',
  // 路由匹配规则
  routes,
})

router.afterEach((to, from) => {
  if (to.meta.title) {
    setTitle.setRouteTitle(to.meta.title)
  }
})

export default router
