<template>
  <div class="warp">
    <div id="network"></div>
  </div>
</template>

<script>
class GetViewRect {
  constructor(container) {
    this.box = new twaver.ElementBox();
    this.network = new twaver.vector.Network(this.box);
    this.container = document.getElementById(container);
  }
  init() {
    this.initData();
    this.initNetwork();
  }
  initNetwork() {
    this.view = this.network.getView();
    this.network.adjustBounds({ x: 100, y: 100, width: 200, height: 200 });
    this.container.appendChild(this.view);

    //getViewRect 目前只能在 过一会之后。。才能拿到 (用setTimeout解决)
    let node2Ui = this.network.getElementUI(this.node2);
    console.log(node2Ui.getViewRect());//null
    let that = this;
    setTimeout(function() {
      console.log(node2Ui.getViewRect());//{}
      that.network.makeVisible(that.node2);
    }, 100);
  }
  initData() {
    let node1 = new twaver.Node({
      name: "from",
      location: { x: 100, y: 100 }
    });
    this.box.add(node1);

    this.node2 = new twaver.Node({
      name: "to",
      location: { x: 300, y: 100 }
    });
    this.box.add(this.node2);
    let link = new twaver.Link(node1, this.node2);
    this.box.add(link);
  }
}

export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let getViewRect = new GetViewRect("network");
      getViewRect.init();
    }
  }
};
</script>

<style scoped lang="scss">
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