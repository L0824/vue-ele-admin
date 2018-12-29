import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router) //注册vue-router

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/login', component: _import('login/index'), name: 'login',hidden: true ,meta: { title: '登录' } },
  { path: '/404', component: _import('404'), name: '404',meta: { title: '404未找到' } }
  
]

// 主路由
const mainRoutes = {
  path:'/',
  component: _import('layout/Layout'),
  redirect: { name: 'home' },
  name: 'layout',
  meta: { title: '主入口整体布局' },
  children: [
    { path: '/home', component: _import('dashboard/index'), name: 'home', meta: { title: '首页' } }
  ],
  beforeEnter (to, from, next) {
    // axios.get('http://192.168.1.37:8080/rmis_new/maintain/security/organ/tree_ajax1').then(function (response) {
    //   console.log(response);
    // }).catch(function (response) {
    //   // alert(response);
    // })
      // let token = Vue.cookie.get('token')
      // console.log(token)
      // if (!token || !/\S/.test(token)) {
      //   next({ name: 'login' })
      // }
      next()
  }
}

  const router = new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
    routes: globalRoutes.concat(mainRoutes)
  })

  router.beforeEach((to, from, next) => {
    // 添加动态(菜单)路由
    // 1. 已经添加 or 全局路由, 直接访问
    // 2. 获取菜单列表, 添加并保存本地存储
    if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to) === 'global') {
      next()
    } else {
      http({
        url: http.adornUrl('/sys/menu/nav'),
        method: 'get',
        params: http.adornParams()
      }).then(({data}) => {
        if (data && data.code === 0) {
          fnAddDynamicMenuRoutes(data.menuList)
          console.log(data.menuList);
          router.options.isAddDynamicMenuRoutes = true
          sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
          sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
          next({ ...to, replace: true })//??
        } else {
          sessionStorage.setItem('menuList', '[]')
          sessionStorage.setItem('permissions', '[]')
          next()
        }
      })
    }
  })

  /**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if(menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true
          // ,
          // iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      // if (isURL(menuList[i].url)) {
      //   route['path'] = `i-${menuList[i].menuId}`
      //   route['name'] = `i-${menuList[i].menuId}`
      //   route['meta']['iframeUrl'] = menuList[i].url
      // } else {
      //   try {
      //     route['component'] = _import(`modules/${menuList[i].url}`) || null
      //   } catch (e) {}
      // }
      try {
        route['component'] = _import(`modules/${menuList[i].url}`) || null
      } catch (e) {}
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes)
  } else {
    mainRoutes.name = 'main-dynamic'
    mainRoutes.children = routes
    router.addRoutes([
      mainRoutes,
      { path: '*', redirect: { name: '404' } }//??
    ])
    sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
    console.log('\n')
    console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
    console.log(globalRoutes)
    console.log(mainRoutes)
    console.log(mainRoutes.children)
    console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
  }
}

export default router

// export default new Router({
//   // mode: 'history', //后端支持可开
//   scrollBehavior: () => ({ y: 0 }),
//   routes: mainRoutes
// })

