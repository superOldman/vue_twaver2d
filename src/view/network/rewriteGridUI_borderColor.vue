<template>
  <div class="warp">
    <div id="network"></div>
  </div>
</template>

<script>
function MyGrid(id) {
  MyGrid.superClass.constructor.call(this, id);
}
twaver.Util.ext(MyGrid, twaver.Grid, {
  getVectorUIClass: function() {
    return MyGridUI;
  }
});

function MyGridUI(network, element) {
  MyGridUI.superClass.constructor.call(this, network, element);
}
twaver.Util.ext(MyGridUI, twaver.vector.GridUI, {
  drawGridBody: function(ctx) {
    let fill = this.getStyle("grid.fill");
    let gridDeep = this.getStyle("grid.deep");
    let cellDeep = this.getStyle("grid.cell.deep");
    if (!fill && gridDeep === 0 && cellDeep === 0) {
      let row = this.getStyle("grid.row.count");
      let col = this.getStyle("grid.column.count");
      let ele = this.getElement();
      let gridBorderColor = ele.getClient("grid.border.color");
      for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
          let rect = this._getZoomCellRect(r, c); //this._element.getCellRect(r, c);
          if (rect != null) {
            // ctx.globalCompositeOperation = 'destination-over'
            ctx.beginPath();
            drowRect(
              ctx,
              rect.x,
              rect.y,
              rect.width,
              rect.height,
              gridBorderColor
              // "rgba('13,"+(5+r*c)+",21,1')"
            );
             
            function drowRect(g, x, y, width, height, gridBorderColor) {
              g.strokeStyle = gridBorderColor;
              g.beginPath();
              g.strokeRect(x, y, width, height);
            }
            ctx.closePath();
          }
        }
      }
      return;
    } else {
      MyGridUI.superClass.drawGridBody.call(this, ctx);
    }
  }
});

class GridUI_test {
  constructor(container) {
    this.box = new twaver.ElementBox();
    this.network = new twaver.vector.Network(this.box);
    this.container = document.getElementById(container);
  }
  init() {
    this.initNetwork();
    this.createPane();
    this.initData();
  }
  initNetwork() {
    this.view = this.network.getView();
    this.network.adjustBounds({ x: 0, y: 20, width: 1300, height: 600 });
    this.container.appendChild(this.view);
  }
  initData() {
    let grid = new MyGrid();
    grid.setName("Grid");
    grid.s("grid.border", 0);
    grid.s("grid.padding", 0);
    grid.s("grid.padding", 0);
    grid.s("grid.column.count", 10);
    grid.s("grid.row.count", 10);
    grid.setSize(300, 200);
    grid.setLocation(20, 30);

    //必须
    //设置网格 和 单元格深度为0
    grid.s("grid.deep", 0);
    grid.s("grid.cell.deep", 0);
    //不填充
    grid.s("grid.fill", false);
    //设置自定义颜色
    grid.setClient("grid.border.color", 'rgba(51,204, 255,0.5)');

    this.box.add(grid);
  }
  createPane() {
    let toolbar = this.initToolbar();
    let pane = new twaver.controls.BorderPane(
      this.network,
      toolbar,
      null,
      null,
      null
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
  }
  initToolbar() {
    let toolbar = document.createElement("div");

    let that = this;
    this.addButton(toolbar, "Zoom In", function() {
      that.network.zoomIn();
    });
    this.addButton(toolbar, "Zoom Out", function() {
      that.network.zoomOut();
    });
    this.addButton(toolbar, "Zoom Overview", function() {
      that.network.zoomOverview();
    });
    this.addButton(toolbar, "Zoom Reset", function() {
      that.network.zoomReset();
    });
    this.addButton(toolbar, "setColor", function() {
      that.box.getDatas().forEach(element => {
        if (element instanceof MyGrid) {
          console.log("set border color => red");
          element.setClient("grid.border.color", "red");
        }
      });
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
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let g = new GridUI_test("network");
      g.init();
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