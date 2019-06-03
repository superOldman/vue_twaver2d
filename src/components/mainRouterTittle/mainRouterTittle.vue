<template>
  <el-row>
    <el-col :span="24" class="breadcrumb-container">
      <strong class="title">{{$route.name}}</strong>
      <el-breadcrumb separator="/" class="breadcrumb-inner">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
  </el-row>
</template>
<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.breadcrumb-container {
  height: 20px;
  position: relative;
  line-height: 20px;
  .title {
    width: 200px;
    float: left;
    color: #475669;
  }

  .breadcrumb-inner {
    float: right;
  }
}

.content-wrapper {
  background-color: #fff;
  box-sizing: border-box;
}
</style>
