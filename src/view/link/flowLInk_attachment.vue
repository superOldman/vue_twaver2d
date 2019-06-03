<template>
  <div class="warp">
    <div id="div"></div>
    <div id="network"></div>
  </div>
</template>

 <script>
      var box = new twaver.ElementBox();
      var network = new twaver.vector.Network(box);
      var tree = new twaver.controls.Tree(box);
      var toolbar = document.createElement("div");

            function initBox() {
        var from = new twaver.Group();
        from.setName("From");
        //设定tree
        from.setClient("hasChild", true);
        from.setLocation(100, 100);

        box.add(from);

        var to = new twaver.Group();
        to.setName("To");
        to.setLocation(300, 300);
        to.setClient("hasChild", true);
        box.add(to);

        var link = new twaver.Link(from, to);
        link.setName("Link");
        box.add(link);
      }

      function initToolbar() {
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
      }

      function addButton(toolbar, label, handler) {
        var button = document.createElement("input");
        button.type = "button";
        button.value = label;
        button.onclick = handler;
        toolbar.appendChild(button);
      }
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
  mounted() {
    this.init();
  },
  methods: {
    init() {
        twaver.Styles.setStyle("select.style", "border");
        initToolbar();
        var pane = new twaver.controls.BorderPane(
          network,
          toolbar,
          null,
          null,
          tree
        );
        pane.setTopHeight(25);
        pane.setLeftWidth(250);
        var view = pane.getView();
        view.style.left = "0px";
        view.style.top = "0px";
        view.style.right = "0px";
        view.style.bottom = "0px";
        document.getElementById("network").appendChild(view);
        window.onresize = function() {
          pane.invalidate();
        };

        /*
         *   重写 tree 的展开图标
         *   如果展开（isExpanded）返回默认的展开图标 （getExpandIcon）
         *   否则 获取teaver默认的展开图标 （getCollapseIcon）
         */
        tree.getToggleImage = function(data) {
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
        tree.expand = function(data) {
          if (!data.getClient("loaded")) {
            setTimeout(function() {
              data.setClient("loaded", true);
              for (var i = 0, n = Math.random() * 5 + 2; i < n; i++) {
                var child = new twaver.Node();
                child.setName("Child" + i);
                child.setCenterLocation(data.getCenterLocation());
                data.addChild(child);
                data.setExpanded(true);
                box.add(child);
              }
            }, 1000);
          }
          // 对应的tree 原始默认事件
          twaver.controls.Tree.prototype.expand.call(this, data);
        };

        initBox();
        // 所有tree节点展开 （需要在所有数据加载之后才能生效）
        //   tree.expandAll();
        // 获取tree节点 的展开图标
        //   console.log(tree.getExpandIcon())
      


    }
  }
};
</script>

<style scoped lang="scss">
//   @import '../styles/vars';
.warp {
  position: relative;
  height: 100%;

  #network {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>






