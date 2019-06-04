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
    var fill = this.getStyle("grid.fill");
    var gridDeep = this.getStyle("grid.deep");
    var cellDeep = this.getStyle("grid.cell.deep");

    if (!fill && gridDeep === 0 && cellDeep === 0) {
      var row = this.getStyle("grid.row.count");
      var col = this.getStyle("grid.column.count");
      var ele = this.getElement();
      var gridBorderColor = ele.getClient("grid.border.color");
      for (var r = 0; r < row; r++) {
        for (var c = 0; c < col; c++) {
          var rect = this._getZoomCellRect(r, c); //this._element.getCellRect(r, c);
          if (rect != null) {
            ctx.beginPath();
            drowRect(
              ctx,
              rect.x,
              rect.y,
              rect.width,
              rect.height,
              gridBorderColor
            );
            function drowRect(g, x, y, width, height, gridBorderColor) {
              g.strokeStyle = gridBorderColor;
              g.beginPath();
              g.moveTo(x, y);
              g.lineTo(x, y + height);
              g.moveTo(x, y);
              g.lineTo(x + width, y);
              g.closePath();
              g.stroke();

              g.beginPath();
              g.moveTo(x, y + height);
              g.lineTo(x + width, y + height);
              g.moveTo(x + width, y);
              g.lineTo(x + width, y + height);
              g.closePath();
              g.stroke();
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
    grid.s("grid.column.count", 2);
    grid.s("grid.row.count", 5);
    grid.setSize(300, 200);
    grid.setLocation(20, 30);

    //必须
    //设置网格 和 单元格深度为0
    grid.s("grid.deep", 0);
    grid.s("grid.cell.deep", 0);
    //不填充
    grid.s("grid.fill", false);
    //设置自定义颜色
    grid.setClient("grid.border.color", "blue");

    this.box.add(grid);
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