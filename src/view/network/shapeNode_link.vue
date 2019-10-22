<template>
  <div class="warp">
    <div id="network"></div>
  </div>
</template>

<script type='text/ecmascript-6'>
class ShapeNodeLink {
  constructor(container) {
    this.box = new twaver.ElementBox();
    this.network = new twaver.vector.Network(this.box);
    this.container = document.getElementById(container);
  }
  init() {
    this.initNetwork();
    this.initData();
  }
  initData() {
    //预设设线的点
    let points = new twaver.List([{ x: 10, y: 10 }, { x: 206, y: 205 },{x:204,y:303}]);
    let shapeNode = new twaver.ShapeNode();

    shapeNode.setPoints(points);
    // shapeNode.setSegments(new twaver.List(
    //     ['moveto',
    //     'lineto',
    //     ]
    // ));
    shapeNode
      .setStyle("vector.outline.color", "#333333")
      .setStyle("vector.outline.width", 1)
      .setStyle("vector.outline.pattern", [6, 3]); //虚线属性

    this.box.add(shapeNode);
  }
  initNetwork() {
    let view = this.network.getView();
    this.container.appendChild(view);
    this.network.adjustBounds({
      x: 0,
      y: 0,
      width: 600,
      height: 980
    });
  }
}

export default {
  data() {
    return {};
  },
  mounted() {
      this.init()
  },
  methods: {
      init(){
          let run = new ShapeNodeLink('network');
          run.init();
      }
  }
};
</script>

<style lang='scss' scoped >
.warp {
  width: 100%;
  height: 100%;
  #network {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>