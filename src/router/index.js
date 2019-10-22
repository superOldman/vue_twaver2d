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
        { path: '/demo', component: () => import('../view/link/demo.vue'), name: 'demo' }
      ]
    },
    {
      path: '/',
      component: () => import('../view/home.vue'),
      name: 'network',
      iconCls: 'el-icon-menu', // 图标样式class
      // leaf:true,
      children: [
        { path: '/main', component: () => import('../view/network/main.vue'), name: 'main' },
        { path: '/rewriteGridUI_borderColor', component: () => import('../view/network/rewriteGridUI_borderColor.vue'), name: 'Grid边框颜色' },
        { path: '/shapeNode_link', component: () => import('../view/network/shapeNode_link.vue'), name: '只有线shapeNode'},
        { path: '/tooltip', component: () => import('../view/network/tooltip.vue'), name: '删除tooltip/重写'},
        { path: '/layerTopBottom', component: () => import('../view/network/layerTopBottom.vue'), name: '利用图层改group上线的bug'}
      ]
    },

    {
      path: '/',
      component: () => import('../view/home.vue'),
      name: 'tree',
      iconCls: 'el-icon-guide',
      children: [
        { path: '/tree_expand', component: () => import('../view/tree/tree_expand.vue'), name: 'tree异步加载节点' },
        { path: '/handlePressSelection', component: () => import('../view/tree/handlePressSelection.vue'), name: '取消联动' }
      ]
    },

    {
      path: '/',
      component: () => import('../view/home.vue'),
      name: '',
      iconCls: 'fa fa-address-card',
      leaf: true,
      children: [
        { path: '/alarm_color', component: () => import('../view/alarm/alarm_color.vue'), name: '告警仅提示无颜色' }
      ]
    },
    {
      path:'/',
      component: () => import('../view/home.vue'),
      name:'others',
      iconCls: 'el-icon-menu',
      children:[
        {path: '/UI_getViewRect',component: ()=> import('../view/others/UI_getViewRect.vue'),name:'获取UI的视图=>null'},
        {path: '/insteractions',component: ()=> import('../view/others/insteractions.vue'),name:'交互/监听动作'},
        {path: '/toolBar',component: ()=> import('../view/others/toolBar.vue'),name:'自定义工作条'},
        {path: '/electricView',component: ()=> import('../view/others/electricView.vue'),name:'electricView'},
        {path: '/electricView2',component: ()=> import('../view/others/electricView2.vue'),name:'electricView2'},
        // {path: '/UI_getViewRect',component: ()=> import('../view/others/UI_getViewRect.js'),name:'获取UI的视图=>null'}
      ]
    },
    {
      path:'/',
      component: () => import('../view/home.vue'),
      name:'3d',
      iconCls: 'el-icon-menu',
      children:[
        {path: '/import_obj_build',component: ()=> import('../view/3d/import_obj_build.vue'),name:'导入obj大楼'},
        {path: '/import_obj_plane',component: ()=> import('../view/3d/import_obj_plane.vue'),name:'导入obj飞机'},

      ]
    }

  ]
})
