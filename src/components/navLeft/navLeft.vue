<template>
  <div>
    <!-- 默认打开 -->
    <el-col>
      <el-menu :default-active="$route.path" router>
        <template v-for="(item,index) in routes">
          <el-submenu :index="index+''" :key="item.name" v-if="!item.leaf">
            <!--遍历的其中一个菜单项,设置有单节点的。-->
            <!-- 导航头 -->
            <template slot="title">
              <i :class="item.iconCls"></i>
              {{item.name}}
            </template>
            <!-- 子项 -->
            <el-menu-item
              v-for="child in routeChildren(item)"
              :index="child.path"
              :key="child.path"
            >{{child.name}}</el-menu-item>
          </el-submenu>
          <!-- 如果 设置 leaf 作为不扩展导航-->
          <el-menu-item
            v-if="item.leaf&&item.children.length>0"
            :key="item.name"
            :index="item.children[0].path"
          >
            <i :class="item.iconCls"></i>
            {{item.children[0].name}}
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>


<script>
export default {
  name: "navLeft",
  computed: {
    routes: function() {
      return this.$router.options.routes.filter(function(item) {
        return !item.hidden;
      });
    },
    // 利用闭包实现计算属性传参。
    routeChildren: function(route) {
      return function(route) {
        return route.children.filter(function(child) {
          return !child.hidden;
        });
      };
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>



