<template>
  <div class="warp">
    <div id="btns"></div>
    <div id="network"></div>
  </div>
</template>

<script>
      class InteractionTest {
        constructor(container,btns) {
          this.container = document.getElementById(container);
          this.btns = document.getElementById(btns);
          this.box = new twaver.ElementBox();
          this.network = new twaver.vector.Network(this.box);
          this.popupMenu = new twaver.controls.PopupMenu(this.network);
        }
        init() {
          this.initListener();
          this.initDataBox();

          this.initNetwork();
          this.initToolbar();

          this.initpopupMenu();
        }
        initNetwork() {
          let view = this.network.getView();
          this.container.appendChild(view);
          this.network.adjustBounds({ x: 0, y: 0, width: 1300, height: 600 });
        }
        initpopupMenu() {
          this.popupMenu.onMenuShowing(true);

          this.popupMenu.setMenuItems([{ label: "dffd", group: "Group" }]);
        }
        initToolbar() {
          let touth = false;
          let toolbar = this.createButtom("createNode", null, ()=> {
            if (!touth) {
              this.network.setCreateElementInteractions(MyElement);
              touth = true;
            } else {
              // 设置默认交互
              this.network.setDefaultInteractions();
              touth = false;
            }
          });

          let networkPane = new twaver.controls.BorderPane(network, toolbar);

          networkPane.setTopHeight(25);

          let view = networkPane.getView();
          view.style.left = "0px";
          view.style.top = "0px";
          view.style.right = "0px";
          view.style.bottom = "0px";

          console.log(view)
          console.log(this.container)
          // this.container.appendChild(view);
          let odiv = document.getElementById('network');
          
          this.btns.innerHTML(view);
          window.onresize = function() {
            networkPane.invalidate();
          };
        }

        initDataBox() {
          this.box.setName("databox");

          let node1 = new twaver.Node({
            name: "node1",
            location: {
              x: 300,
              y: 200
            }
          });
          this.box.add(node1);

          let node2 = new twaver.Node({
            name: "node2",
            location: {
              x: 200,
              y: 200
            }
          });
          this.box.add(node2);

          // let link = new twaver.Link(node1,node2);
          // box.add(link)
          // network.setCreateElementInteractions()
          // network.setCreateLinkInteractions();
          // 设置默认交互
          //network.setDefaultInteractions();
          // box.moveToTop(node2);
          // box.clear();
        }

        createButtom(name, src, callback) {
          let div = document.createElement('div');
          let button = document.createElement("input");
          button.setAttribute("type", src ? "image" : "button");
          button.setAttribute("title", name);
          button.style.verticalAlign = "top";
          if (src) {
            button.style.padding = "4px 4px 4px 4px";
            if (src.indexOf("/") < 0) {
              src = "../images/toolbar/" + src + ".png";
            }
            button.setAttribute("src", src);
          } else {
            button.value = name;
          }
          button.addEventListener("click", callback, false);
           div.appendChild(button);
          return div;
        }

        initListener() {
          this.box.addPropertyChangeListener(function(e) {
            console.log("PropertyChange:");
            console.log(e);
          });

          this.box.addDataBoxChangeListener(function(e) {
            console.log("DataBoxChange:");
            console.log(e);
          });

          this.box.addDataPropertyChangeListener(function(e) {
            console.log("DataPropertyChange:");
            console.log(e);
          });

          this.box.addHierarchyChangeListener(function(e) {
            console.log("HierarchyChange:");
            console.log(e);
          });
        }
      }

       function MyElement(id) {
        MyElement.superClass.constructor.call(this, id);
        this.setStyle("body.type", "vector");
        this.setStyle("vector.shape", "rectangle");
        this.setStyle("vector.gradient", "none");
        this.setStyle("vector.fill.color", "#C0C0C0");

        this.setStyle("vector.deep", 8);
        this.setWidth(160);
        this.setHeight(160);
      };
      twaver.Util.ext(MyElement, twaver.Node);


      
export default {
  mounted() {
      this.init();
  },
  methods: {
    init() {
      console.log()
      let interactionTest = new InteractionTest("network");
      interactionTest.init();
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