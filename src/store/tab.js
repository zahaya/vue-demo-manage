import Cookie from "js-cookie"

export default {
  state: {
    isCollapse: false,   //控制菜单的展开状态
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ],     //面包屑
    menu: []
  },
  mutations: {
    //修改菜单展开的状态
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    },
    //更新 面包屑 数据
    selectMenu(state, item) {
      // 如果点击的不在面包屑数据中,则添加
      const index = state.tabList.findIndex(val => { return val.name === item.name })
      if (index === -1) {
        state.tabList.push(item)
      }
    },
    // 删除指定的 tag 数据
    closeTag(state, item) {
      const index = state.tabList.findIndex(val => val.name === item.name)
      state.tabList.splice(index, 1)
    },
    //设置menu的数据
    setMenu(state, val) {
      state.menu = val
      Cookie.set('menu', JSON.stringify(val))
    },
    //动态注册路由
    addMenu(state, router) {
      //判断 缓存中 是否有数据
      if (!Cookie.get('menu')) return
      const menu = JSON.parse(Cookie.get('menu'))
      state.menu = menu
      //组装动态路由的数据
      const menuArr = []
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`../veiws/${item.url}`)
            return item
          })
          menuArr.push(...item.children)
        } else {
          item.component = () => import(`../veiws/${item.url}`)
          menuArr.push(item)
        }
      });
      // 路由的动态添加
      menuArr.forEach(item => {
        router.addRoute('main', item)
      })

    }


  }
}