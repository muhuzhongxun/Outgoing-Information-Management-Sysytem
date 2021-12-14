import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '仪表板', icon: 'dashboard' }
    }]
  },

  {
    path: '/datamanage',
    component: Layout,
    alwaysShow: true,
    redirect: '/datamanage/userList',
    name: 'Datamanage',
    meta: { title: '数据管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'userList',
        name: 'UserList',
        component: () => import('@/views/datamanage/userList/index'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'enterpriseList',
        name: 'EnterpriseList',
        component: () => import('@/views/datamanage/enterpriseList/index'),
        meta: { title: '企业列表', icon: 'table' }
      },
      {
        path: 'OGList',
        name: 'OGList',
        component: () => import('@/views/datamanage/OGList/index'),
        meta: { title: '外发信息列表', icon: 'table' }
      },
      {
        path: 'IGList',
        name: 'IGList',
        component: () => import('@/views/datamanage/IGList/index'),
        meta: { title: '承接信息列表', icon: 'table' }
      },
      {
        path: 'orderList',
        name: 'OrderList',
        component: () => import('@/views/datamanage/orderList/index'),
        meta: { title: '订单列表', icon: 'table' }
      }
    ]
  },

  {
    path: '/service',
    component: Layout,
    alwaysShow: true,
    name: 'service',
    meta: { title: '业务审核', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'identical',
        name: 'Identical',
        component: () => import('@/views/service/identical/index'),
        meta: { title: '实名认证', icon: 'table' }
      },
      {
        path: 'OGReview',
        name: 'OGReview',
        component: () => import('@/views/service/OGReview/index'),
        meta: { title: '外发信息审核', icon: 'table' }
      },
      {
        path: 'IGReview',
        name: 'IGReview',
        component: () => import('@/views/service/IGReview/index'),
        meta: { title: '承接信息审核', icon: 'table' }
      },
      {
        path: 'complaint',
        name: 'complaint',
        component: () => import('@/views/service/complaint/index'),
        meta: { title: '投诉处理', icon: 'table' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    alwaysShow: true,
    name: 'system',
    meta: { title: '系统管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('@/views/system/notice/index'),
        meta: { title: '公告管理', icon: 'table' }
      },
      {
        path: 'advertisement',
        name: 'Advertisement',
        component: () => import('@/views/system/advertisement/index'),
        meta: { title: '广告管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/dictionary',
    component: Layout,
    alwaysShow: true,
    name: 'dictionary',
    meta: { title: '数据字典', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'location',
        name: 'Location',
        component: () => import('@/views/dictionary/location/index'),
        meta: { title: '地点地区管理', icon: 'table' }
      },
      {
        path: 'item',
        name: 'Item',
        component: () => import('@/views/dictionary/item/index'),
        meta: { title: '物品类别管理', icon: 'table' }
      },
      {
        path: 'industry',
        name: 'Industry',
        component: () => import('@/views/dictionary/industry/index'),
        meta: { title: '行业分类管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/maintenance',
    component: Layout,
    alwaysShow: true,
    name: 'maintenance',
    meta: { title: '系统维护', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/maintenance/tree/index'),
        meta: { title: '管理树', icon: 'table' }
      },
      {
        path: 'distribution',
        name: 'Distribution',
        component: () => import('@/views/maintenance/distribution/index'),
        meta: { title: '送货表单模板', icon: 'table' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
