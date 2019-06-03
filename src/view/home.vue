<template>
  <el-container class="container">
    <el-header class="header"></el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <navLeft></navLeft>
      </el-aside>
      <el-main class="main">
        <mainRouterTittle></mainRouterTittle>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

 <script>
export default {
  data() {
    return {
      sysName: "twaver2d",
      collapsed: false,
      sysUserName: "",
      sysUserAvatar: "",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  computed: {},
  methods: {}
};
</script>

<style scoped lang="scss">
//   @import '../styles/vars';

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;

  .header {
    height: 60px;
    line-height: 60px;
    //   background: $color-primary;
    background: #20a0ff;
    color: #fff;

    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;

      .userinfo-inner {
        cursor: pointer;
        color: #fff;

        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }

    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;

      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }

      .txt {
        color: #fff;
      }
    }

    .logo-width {
      width: 230px;
    }

    .logo-collapse-width {
      width: 60px;
    }

    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .aside {
    height: 100%;
    background-color: rgb(238, 241, 246);
    text-align: left;
    // background: rgb(164, 144, 167);
    // border-right: 1px solid #e6e6e6;
  }
  .main {
    height: 100%;
    // background: #354;
  }
}
</style>






