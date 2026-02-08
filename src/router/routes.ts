import { RouteRecordRaw } from 'vue-router'
import asyncLayout from "@/views/layout/asyncDefault.vue"
import adminLayout from "@/views/layout/adminDefault.vue"

// 公共路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/async'
  },
  {
    path: '/noPermission',
    name: '无权限',
    meta: { next: false },
    component: () => import('@/views/error/noPermission.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { next: false },
    component: () => import('@/views/error/notFound.vue')
  },
  {
    path: '/405',
    name: '405',
    meta: { next: false },
    component: () => import('@/views/error/notErrlog.vue')
  },
  // {
  //   path: '/:pathMatch(.*)',
  //   name: '404',
  //   meta: { next: false },
  //   component: () => import('@/views/error/notFound.vue')
  // },
]

// 无需权限
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/async',
    redirect: '/home',
    component: asyncLayout,
    children: [
      {
        path: '/home',
        name: '首页监控',
        meta: { next: false },
        component: () => import('@/views/async/home/index.vue'),
        children: []
      },
      // 虚拟电厂
      {
        path: '/devices',
        name: '设备监控',
        meta: { next: false },
        component: () => import('@/views/async/devices/index.vue'),
        children: []
      },
      {
        path: '/detail',
        name: '设备详情',
        meta: { next: false },
        component: () => import('@/views/async/detail/index.vue'),
        children: []
      },
      {
        path: '/predicts',
        name: '资源预测',
        meta: { next: false },
        component: () => import('@/views/async/predicts/index.vue'),
        children: []
      },
      {
        path: '/demands',
        name: '需求侧响应',
        meta: { next: false },
        component: () => import('@/views/async/demands/index.vue'),
        children: []
      },
      {
        path: '/markets',
        name: '市场行情',
        meta: { next: false },
        component: () => import('@/views/async/markets/index.vue'),
        children: []
      },
      {
        path: '/demand',
        name: '响应总览',
        meta: { next: false },
        component: () => import('@/views/async/demand/index.vue'),
        children: []
      },
      {
        path: '/demand2',
        name: '邀约下发',
        meta: { next: false },
        component: () => import('@/views/async/demand2/index.vue'),
        children: []
      },
      {
        path: '/demand3',
        name: '客户管理',
        meta: { next: false },
        component: () => import('@/views/async/demand3/index.vue'),
        children: []
      },
      // 源网荷储
      {
        path: '/devices2',
        name: '源网荷储-设备监控',
        meta: { next: false },
        component: () => import('@/views/async/devices2/index.vue'),
        children: []
      },
      {
        path: '/devices2/photovoltaic',
        name: '源网荷储-光伏',
        meta: { next: false },
        component: () => import('@/views/async/devices2/photovoltaic/index.vue'),
        children: []
      },
      {
        path: '/devices2/energy',
        name: '源网荷储-储能',
        meta: { next: false },
        component: () => import('@/views/async/devices2/energy/index.vue'),
        children: []
      },
      {
        path: '/devices2/charge',
        name: '源网荷储-充电',
        meta: { next: false },
        component: () => import('@/views/async/devices2/charge/index.vue'),
        children: []
      },
      {
        path: '/devices2/wind',
        name: '源网荷储-风机',
        meta: { next: false },
        component: () => import('@/views/async/devices2/wind/index.vue'),
        children: []
      },
      {
        path: '/devices2/airconditioner',
        name: '源网荷储-空调',
        meta: { next: false },
        component: () => import('@/views/async/devices2/airconditioner/index.vue'),
        children: []
      },
      {
        path: '/devices2/meter',
        name: '源网荷储-电表',
        meta: { next: false },
        component: () => import('@/views/async/devices2/meter/index.vue'),
        children: []
      },
      {
        path: '/devices2/centralair',
        name: '源网荷储-中央空调',
        meta: { next: false },
        component: () => import('@/views/async/devices2/centralair/index.vue'),
        children: []
      },
      {
        path: '/devices2/mock',
        name: '源网荷储-风光模拟',
        meta: { next: false },
        component: () => import('@/views/async/devices2/mock/index.vue'),
        children: []
      },
      {
        path: '/systest2',
        name: '源网荷储-系统测试',
        meta: { next: true },
        component: () => import('@/views/async/systest2/index.vue'),
        children: []
      },
      {
        path: '/systestdetail2',
        name: '源网荷储-测试结果',
        meta: { next: true },
        component: () => import('@/views/async/systestdetail2/index.vue'),
        children: []
      },
      {
        path: '/systestlog2',
        name: '源网荷储-测试日志',
        meta: { next: true },
        component: () => import('@/views/async/systestlog2/index.vue'),
        children: []
      },
      {
        path: '/inspect2',
        name: '源网荷储-站点巡视',
        meta: { next: false },
        component: () => import('@/views/async/inspect2/index.vue'),
        children: []
      },
      {
        path: '/consumpt2',
        name: '源网荷储-数据能耗',
        meta: { next: false },
        component: () => import('@/views/async/consumpt2/index.vue'),
        redirect:"/consumpt2/current",
        children: [
          {
            path:"current",
            name: '实时数据1',
            meta: { next: false },
            component:()=>import('@/views/async/consumpt2/current/index.vue'),
          },
          {
            path:"history",
            name: '历史数据1',
            meta: { next: false },
            component:()=>import('@/views/async/consumpt2/history/index.vue'),
          },
          {
            path:"report",
            name: '数据报表',
            meta: { next: false },
            component:()=>import('@/views/async/consumpt2/report/index.vue'),
          },
          {
            path:"energysum",
            name: '用能概括',
            meta: { next: false },
            component:()=>import('@/views/async/consumpt2/energysum/index.vue'),
          },
          {
            path:"electcheck",
            name: '用电监测',
            meta: { next: false },
            component:()=>import('@/views/async/consumpt2/electcheck/index.vue'),
          },
          {
            path:"watercheck",
            name: '用水监测',
            meta: { next: false },
            component:()=>import('@/views/async/consumpt2/watercheck/index.vue'),
          },
          {
            path:"productcheck",
            name: '产线监测',
            meta: { next: false },
            component:()=>import('@/views/async/consumpt2/productcheck/index.vue'),
          },
          {
            path:"aircheck",
            name: '空调监测',
            meta: { next: false },
            component:()=>import('@/views/async/consumpt2/aircheck/index.vue'),
          },
          {
            path:"energydiagnosis",
            name: '用能诊断',
            meta: { next: false },
            component:()=>import('@/views/async/consumpt2/energydiagnosis/index.vue'),
          },
          {
            path:"energygraph",
            name: '能流图',
            meta: { next: false },
            component:()=>import('@/views/async/consumpt2/energygraph/index.vue'),
          },
          {
            path:"graphdata",
            name: '能耗一次图',
            meta: { next: false },
            component:()=>import('@/views/async/consumpt2/graphData.vue'),
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    meta: { next: true },
    component: () => import('@/views/async/login/index.vue')
  },
  {
    path: '/test',
    name: '测试',
    meta: { next: true },
    component: () => import('@/views/async/test/index.vue')
  },
  {
    path: '/three',
    name: 'three',
    meta: { next: true },
    component: () => import('@/views/async/three/index.vue')
  },
  {
    path: '/three2',
    name: 'three2',
    meta: { next: true },
    component: () => import('@/views/async/three/index2.vue')
  },
  {
    path: '/three3',
    name: 'three3',
    meta: { next: true },
    component: () => import('@/views/async/three/index3.vue')
  },
  {
    path: '/juhe/user',
    name: '空调聚合平台',
    meta: { isroute: true, icon: 'i-ep-menu' },
    component: () => import('@/views/async/juhe/index.vue'),
    redirect: '/juhe/user/home', 
    children: [
      {
        path: 'home',
        name: '首页',
        meta: { isroute: true },
        component: () => import('@/views/async/juhe/home/index.vue'),
      },
      {
        path: 'user',
        name: '用户管理',
        meta: { isroute: true, title: '用户管理' },
        component: () => import('@/views/async/juhe/user/index.vue'),
      },
      {
        path: 'equip',
        name: '设备管理',
        meta: { isroute: true, title: '设备管理' },
        component: () => import('@/views/async/juhe/equip/index.vue'),
      },
      {
        path: 'load',
        name: '负载管理',
        meta: { isroute: true, title: '负载管理' },
        component: () => import('@/views/async/juhe/load/index.vue'),
        children: []
      },
      {
        path: 'demand',
        name: '需求管理',
        meta: { isroute: true, title: '需求管理' },
        component: () => import('@/views/async/juhe/demand/index.vue'),
        children: []
      },
      {
        path: 'more',
        name: '用户详情',
        meta: { isroute: true, title: '用户详情' },
        component: () => import('@/views/async/juhe/user/more/index.vue'),
      },
    ]
  },
]

// 必需权限
export const adminRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: '/admin',
  //   name: '系统管理',
  //   meta: { isroute: true, icon: 'i-ep-menu' },
  //   component: adminLayout,
  //   redirect: '/user',
  //   children: [
  //     {
  //       path: '/user',
  //       name: '用户列表',
  //       meta: { isroute: true, icon: 'r1' },
  //       component: () => import('@/views/admin/user/index.vue'),
  //       children: []
  //     }
  //   ]}
  ]
