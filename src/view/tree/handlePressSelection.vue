<template>
  <div class="warp">
    <div id="div"></div>
    <div id="network"></div>
  </div>
</template>

<script>
class ExpandAync {
  constructor(container) {
    this.box = new twaver.ElementBox();
    this.network = new twaver.vector.Network(this.box);
    this.tree = new twaver.controls.Tree(this.box);
    this.container = document.getElementById(container);

    // 从tree上取消联动
    this.tree._handlePressSelection = function(){}
  }
  init() {
    this.initBox();
    this.initNetwork();
  }
  initBox() {
    let from = new twaver.Group();
    from.setName("From");
    //设定tree
    from.setClient("hasChild", true);
    from.setLocation(100, 100);
    this.box.add(from);

    //使用subNetwork 分层  该分层展开使用  network.setCurrentSubNetwork(server1)
    let server1 = new twaver.SubNetwork();
    server1.setName("From2");
    server1.setClient("hasChild", true);
    server1.setLocation(200, 100);
    this.box.add(server1);
    let server2 = new twaver.SubNetwork();
    server2.setName("From3");
    server2.setClient("hasChild", true);
    server2.setLocation(300, 100);
    this.box.add(server2);

    let to = new twaver.Group();
    to.setName("To");
    to.setLocation(300, 300);
    to.setClient("hasChild", true);
    // to.setIcon('')


    this.box.add(to);

    let link = new twaver.Link(from, to);
    link.setName("Link");
    this.box.add(link);
  }
  initNetwork() {
    let toolbar = this.initToolbar(),
      network = this.network,
      tree = this.tree,
      box = this.box;
    twaver.Styles.setStyle("select.style", "border");

    let pane = new twaver.controls.BorderPane(
      this.network,
      this.toolbar,
      null,
      null,
      this.tree
    );
    pane.setTopHeight(25);
    pane.setLeftWidth(250);
    let view = pane.getView();
    view.style.left = "0px";
    view.style.top = "0px";
    view.style.right = "0px";
    view.style.bottom = "0px";
    this.container.appendChild(view);
    window.onresize = function() {
      pane.invalidate();
    };

    /*
     *   重写 tree 的展开图标
     *   如果展开（isExpanded）返回默认的展开图标 （getExpandIcon）
     *   否则 获取teaver默认的展开图标 （getCollapseIcon）
     */
    this.tree.getToggleImage = function(data) {
      if (data.getClient("hasChild")) {
        return this.isExpanded(data)
          ? this.getExpandIcon()
          : this.getCollapseIcon();
      }
      return null;
    };

    /*
     *   重写tree 展开事件  可以对 group 做延迟加载 它的子节点
     *   data 为点击展开图标的 对应的 group
     *   该方法需要点击‘+’号 或者双击 tree 上的 group 触发
     */
    this.tree.expand = function(data) {
      if (!data.getClient("loaded")) {
        setTimeout(function() {
          data.setClient("loaded", true);
          for (let i = 0, n = Math.random() * 5 + 2; i < n; i++) {
            let child = new twaver.Node();
            child.setName("Child" + i);
            child.setCenterLocation(data.getCenterLocation());
            data.addChild(child);
            try {
              data.setExpanded(true);
            } catch (err) {
              console.log(err);
              //如果是SubNetwork
              network.setCurrentSubNetwork(data);
            }

            box.add(child);
          }
        }, 1000);
      }
      // 对应的tree 原始默认事件
      twaver.controls.Tree.prototype.expand.call(this, data);
    };
  }
  initToolbar() {
    let addButton = this.addButton,
      network = this.network;
    let toolbar = document.getElementById("div");

    addButton(toolbar, "Zoom In", function() {
      network.zoomIn();
    });
    addButton(toolbar, "Zoom Out", function() {
      network.zoomOut();
    });
    addButton(toolbar, "Zoom Overview", function() {
      network.zoomOverview();
    });
    addButton(toolbar, "Zoom Reset", function() {
      network.zoomReset();
    });
    return toolbar;
  }

  addButton(toolbar, label, handler) {
    let button = document.createElement("input");
    button.type = "button";
    button.value = label;
    button.onclick = handler;
    toolbar.appendChild(button);
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
      let run = new ExpandAync("network");
      run.init();
    }
  }
};
</script>

<style scoped lang="scss">
//   @import '../styles/lets';
.warp {
  height: 100%;
  #network {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>






