import Vue from "vue";
import VueRouter from "vue-router";
import home from '../veiws/Home.vue'
import user from '../veiws/User.vue'
import main from '../veiws/Main.vue'
import mall from '../veiws/Mall.vue'
import pageone from '../veiws/PageOne.vue'
import pagetwo from '../veiws/PageTwo.vue'
import login from '../veiws/Login.vue'
import Cookie from 'js-cookie'

Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
      redirect: '/home',
      children: [
        // { path: '/home', name: 'home', component: home }, // 首页
        // { path: '/user', name: 'user', component: user },  //用户管理
        // { path: '/mall', name: 'mall', component: mall },  //商品管理
        // { path: '/page1', name: 'page1', component: pageone },  //商品管理
        // { path: '/page2', name: 'page2', component: pagetwo },  //商品管理
      ]
    },
    {
      path: '/login', name: 'login', component: login
    }

  ]
})



//保存下来push方法 将来我们还会用到原push方法进行路由跳转
let originPush = VueRouter.prototype.push;

//接下来我们重写push|replace方法  
//第一个参数location参数像原push方法声明跳转的地方 resolve和reject传递成功与失败

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //如果成功 调用原来的push方法  
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}

//全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token是否存在
  const token = Cookie.get('token')
  //如果token不存在 说明当前用户未登录
  if (!token && to.name !== 'login') {
    next('/login')
  } else if (token && to.name === 'login') {   //如果token存在 说明用户登录 直接跳转首页
    next('/home')
  } else {
    next()
  }
})




export default router