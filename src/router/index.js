import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '../view/home'
import tree from '../view/tree/tree_expand'
import flowLink_attachment from '../view/link/flowLink_attachment'
import flowLink_point from '../view/link/flowLink_point'
// import navTop from '../components/navTop/navTop'



Vue.use(Router)
// el-icon-menu
export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../view/home.vue'),
      name: 'Link',//一级导航名
      iconCls: 'el-icon-edit', // 图标样式class
      children: [
        { path: '/flowLink_attachment', component: () => import('../view/link/flowLink_attachment.vue'), name: '连线上的附件', hidden: false },
        { path: '/flowLink_point', component: () => import('../view/link/flowLink_point.vue'), name: '移动的点' },
        { path: '/demo', component: () => import('../view/link/demo.vue'), name: 'demo' },
      ]
    },
    {
      path: '/',
      component: () => import('../view/home.vue'),
      name: 'netWork',
      iconCls: 'el-icon-menu', // 图标样式class
      leaf:true,
      children: [
        { path: '/network', component: () => import('../view/network/main.vue'), name: 'network' }
      ]
    },

    {
      path: '/',
      component: () => import('../view/home.vue'),
      name: 'tree',
      iconCls: 'el-icon-guide',
      children: [
        { path: '/tree_expand', component: () => import('../view/tree/tree_expand.vue'), name: 'tree_expand' }
      ]
    },

    {
      path: '/',
      component: () => import('../view/home.vue'),
      name: '',
      iconCls: 'fa fa-address-card',
      leaf: true,
      children: [
        { path: '/page6', component: () => import('../components/HelloWorld.vue'), name: '导航三' }
      ]
    },
    {
      path:'/',
      component: () => import('../view/home.vue'),
      name:'others',
      iconCls: 'el-icon-menu',
      children:[
        {path: '/UI_getViewRect',component: ()=> import('../view/others/UI_getViewRect.vue'),name:'获取UI的视图=>null'}
        // {path: '/UI_getViewRect',component: ()=> import('../view/others/UI_getViewRect.js'),name:'获取UI的视图=>null'}
      ]
    }
  ]
})
