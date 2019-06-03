<template>
  <div class="warp">
    <div id="network"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var box = new twaver.ElementBox();
      var network = new twaver.vector.Network(box);

      function initNetwork() {
        var view = network.getView();
        network.adjustBounds({ x: 0, y: 20, width: 200, height: 200 });

        document.getElementById("network").appendChild(view);

        setTimeout(function() {
          console.log(network.getElementUI(node2).getViewRect());
          network.makeVisible(node2);
        });
      }
      var node2;
      function initData() {
        var node1 = new twaver.Node({
          name: "from",
          location: { x: 100, y: 100 }
        });
        box.add(node1);


        node2 = new twaver.Node({
          name: "to",
          location: { x: 300, y: 100 }
        });
        box.add(node2);
        var link = new twaver.Link(node1, node2);
        box.add(link);
      }

      initData();
      initNetwork();
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