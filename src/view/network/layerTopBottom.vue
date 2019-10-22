<template>
  <div class="warp">
    <div id="network"></div>
  </div>
</template>

<script type='text/ecmascript-6'>
class LayerDemo {
  constructor(container) {
    this.container = document.getElementById(container);
    this.box = new twaver.ElementBox();
    this.network = new twaver.vector.Network(this.box);
    this.layerBox = this.box.getLayerBox();
    this.layer1 = new twaver.Layer("layer1");
    // this.layer2 = new twaver.Layer("layer2");
    this.layerBox.add(this.layer1);
    this.layerBox.moveUp(this.layer1)
    // this.layerBox.add(this.layer2);
  }
  init() {
    this.initNetwork();
    this.initDataBox();
  }
  initNetwork() {
    let view = this.network.getView();
    this.container.appendChild(view);
    this.network.adjustBounds({ x: 0, y: 0, width: 1300, height: 800 });
    twaver.Styles.setStyle("select.color", twaver.Colors.green_light);

    //边缘检测
    // this.network.setEdgeDetect(true);

    //缩放等级
    // this.network.setZoom(3)
    // 监听
    this.network.addInteractionListener(function(e){
      console.log(e)
    })
  }
  initDataBox() {
    let box = this.box;
    let node1 = new twaver.Group();
    node1.setName("Hello");
    node1.setLocation(100, 100);
    // node1.setLayerId("layer2");
    box.add(node1);

    let node1_1 = new twaver.Node();
    node1_1.setName("Hello233");
    node1_1.setLocation(10, 100);
    // node1_1.setLayerId("layer2");
    box.add(node1_1);

    let node1_2 = new twaver.Node();
    node1_2.setName("Hello666");
    node1_2.setLocation(100, 10);
    box.add(node1_2);
    // node1_2.setLayerId("layer2");

    node1.addChild(node1_1);
    node1.addChild(node1_2);

    let node2 = new twaver.Node({
      name: "Vector",
      location: {
        x: 600,
        y: 400
      }
    });
    box.add(node2);

    let link = new twaver.Link(node1, node2);
    link.setStyle("arrow.to", true);
    link.setStyle("arrow.from", true);
    link.setStyle("link.type", "triangle");
    link.setStyle("link.color", twaver.Colors.blue_light);
    link.setLayerId('layer1')
    // link.setLayerId("layer1");
    box.add(link);
  }
}

export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let run = new LayerDemo("network");
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