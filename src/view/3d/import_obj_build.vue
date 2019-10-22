<template>
  <div class="warp">
    <canvas id="monoCanvas"></canvas>
  </div>
</template>

<script>
var box;
var network;
function init() {
  //创建数据容器，容纳所有3d对象
   box = new mono.DataBox();
  //创建3d画布，显示3d场景。monoCanvas是html页面中canvas标签对象的id值
   network = new mono.Network3D(box, camera, monoCanvas);
  //当页面调整大小时，自动调整network画布宽度，铺满整个页面
  mono.Utils.autoAdjustNetworkBounds(
    network,
    document.documentElement,
    "clientWidth",
    "clientHeight"
  );

  //相机
  var camera = network.getCamera();
  camera.setPosition(1000, 800, 1200);
  camera.lookat(10, 200, 0);
  camera.setFar(30000);

  network.setClearColor("#333");
  //在坐标1000、1000、1000处放置一个颜色为0xFFFFFF色、强度为1.5的点光源
  var pointLight = new mono.PointLight(0xffffff, 1.0);
  pointLight.setPosition(2000, 2000, 2000);
  box.add(pointLight);

  network.setShowAxis(true);

  var pointLight = new mono.PointLight("blue", 2);
  pointLight.setPosition(0, 100, 100);
  box.add(pointLight);

  //在场景中增加颜色为0x888888的环境光
  box.add(new mono.AmbientLight(0x888888));

  var objurl = "../../../static/dalou/dalou.obj";
  var mtlurl = "../../../static/dalou/dalou.mtl";
  var imgUrl = "../../../static/dalou/";

  var loader = new mono.OBJMTLLoader();

  loader.load(objurl, mtlurl, imgUrl, function(object) {
    network.getDataBox().addByDescendant(object);
    console.log("加载完成");
    console.log(object);
    //设置位置
    var position = new mono.Vec3(0, 0, 0);
    object.setPosition(position);
    // 缩放
    // object.setScale(0.001, 0.001, 0.001);
  });

  var objurl2 = "../../../static/dalou/dalou1.obj";
  var mtlurl2 = "../../../static/dalou/dalou1.mtl";
  var imgUrl2 = "../../../static/dalou/";

  var loader2 = new mono.OBJMTLLoader();

  loader2.load(objurl2, mtlurl2, imgUrl2, function(object) {
    network.getDataBox().addByDescendant(object);
    console.log("加载完成");
    console.log(object);
    //设置位置
    var position = new mono.Vec3(2000, 0, 0);
    object.setPosition(position);
    // 缩放
    // object.setScale(0.001, 0.001, 0.001);
  });
}

export default {
  data() {
    return {};
  },
  mounted() {
    init();
  },
  beforeDestroy() {
    if (network !== null && network !== undefined) {
     
      box.clear();
      box = null;
      // document.querySelector('.warp').innerHTML = ''
      // this.$ref.canvas.body.removeChild(network.getRootView());

      network.dispose();
      network = null;
       console.log(network);
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
//   @import '../styles/lets';
.warp {
  height: 100%;
  #monoCanvas {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>






