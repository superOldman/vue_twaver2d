<template>
  <div class="warp">
    <div id="div"></div>
    <div id="network"></div>
  </div>
</template>

<script>
function FlowLink() {
  FlowLink.superClass.constructor.apply(this, arguments);
}
twaver.Util.ext(FlowLink, twaver.Link, {
  getVectorUIClass: function() {
    return FlowLinkUI;
  }
});
function FlowLinkUI() {
  FlowLinkUI.superClass.constructor.apply(this, arguments);
}

twaver.Util.ext(FlowLinkUI, twaver.vector.LinkUI, {
  paintBody: function(ctx) {
    FlowLinkUI.superClass.paintBody.call(this, ctx);
    let link = this.getElement();
    let fillColor = link.getClient("fillColor");
    let shadowColor = link.getClient("shadowColor");
    let tail = link.getClient("tail");
    let percent = link.getClient("percent");
    let paths = this.getLinkPoints();
    let offset = this.getLineLength() * percent;
    let point;
     console.log(paths)
    //尾巴
    for (let i = 0, count = tail; i < count; i++) {
      let v = i / count;
      point = _twaver.math.calculatePointInfoAlongLine(
        paths,
        true,
        offset - (count - i) * 1.5,
        0
      ).point;

      console.log(point)
      ctx.globalAlpha = v * v;
      ctx.shadowBlur = 5;
      ctx.shadowColor = shadowColor;
      ctx.beginPath();
      ctx.fillStyle = fillColor;
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }
});

class FlowlinkPoint {
  constructor(container) {
    this.box = new twaver.ElementBox();
    this.network = new twaver.vector.Network(this.box);
    this.flowLinks = new Array();
    this.container = document.getElementById(container);
  }
  init() {
    this.initData();
    this.initNetwork();
  }
  initData() {
    let fromPoint = new twaver.Node();
    fromPoint.setName("fromPoint");
    fromPoint.setLocation(200, 400);
    this.box.add(fromPoint);

    let toPoint = new twaver.Node();
    toPoint.setLocation(600, 200);
    toPoint.setName("toPoint");
    this.box.add(toPoint);

    this.fromPoint = fromPoint;
    this.toPoint = toPoint;
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
  initNetwork() {
    this.createPane();
    //createLink
    //linkColor,linkWidth,pointFillColor,shadowColor,tail
    this.flowCurve("#A5D8F0", 1, "red", "#FEFF6F", 5);
    let network = this.network;
    this.container.appendChild(network.getView());
    this.network.adjustBounds({
      x: 0,
      y: 0,
      width: 1000,
      height: 800
    });
    // network.setZoom(0.9);
    this.network.setLinkPathFunction(function(linkUI, defaultPoints) {
      let link = linkUI._element;
      if (
        link.getClient("link.type") === "flowLink" &&
        link.getClient("isCurve")
      ) {
        let f = linkUI.getFromPoint();
        let t = linkUI.getToPoint();

        let points = new twaver.List();
        points.add(f);
        points.add(t);

        let lineLength = _twaver.math.getDistance(f, t);

        let offset = -lineLength / 5;
        let m = {
          x: (f.x + t.x) / 2 + offset,
          y: (f.y + t.y) / 2 + offset
        };
        let cps = new twaver.List();
        cps.add(m);
        cps.add(t);

        points.removeAt(1);
        points.add(cps);
         console.log(points);
        return points;
      } else {
        return defaultPoints;
      }
    });
    this.box.getDatas().forEach(function(ele) {
      if (ele instanceof twaver.Link) {
        let from = ele.getFromNode();

        let linkui = new twaver.vector.LinkUI(network, ele);
        // console.log(linkui)
        let points = linkui.getLinkPoints();
        // console.log(points)
        let point = _twaver.math.calculatePointInfoAlongLine(points, true, 1, 0)
          .point;
        //    console.log(linkui.getLineLength())
      }
    });
  }

  initToolbar() {
    let toolbar = document.getElementById("div");
    let box = this.box;
    let network = this.network;
    let addButton = this.addButton;
    let that = this;
    addButton(toolbar, "直线", () => {
      box.getDatas().forEach(function(ele) {
        if (ele instanceof twaver.Link) {
          ele.setClient("isCurve", false);
        }
      });
    });

    addButton(toolbar, "曲线", () => {
      box.getDatas().forEach(ele => {
        if (ele instanceof twaver.Link) {
          ele.setClient("isCurve", true);
        }
      });
    });
    addButton(toolbar, "圆点一次", () => {
      this.createAnimate({
        from: 0,
        to: 1,
        repeat: 1,
        reverse: false,
        delay: 1000,
        dur: 3000,
        easing: "easeOutStrong",
        onUpdate: value => {
          this.flowLinks[0].setClient("percent", value);
          network.invalidateElementUIs();
        }
      }).play();
    });
    addButton(toolbar, "圆点无限次", () => {
      this.createAnimate({
        from: 0,
        to: 1,
        repeat: Number.POSITIVE_INFINITY,
        reverse: false,
        delay: 1000,
        dur: 3000,
        easing: "easeOutStrong",
        onUpdate: value => {
          this.flowLinks[0].setClient("percent", value);
          network.invalidateElementUIs();
        }
      }).play();
    });
    addButton(toolbar, "设置样式", function() {
      //linkColor,linkWidth,pointFillColor,shadowColor,tail
      //  flowCurve("#A5D8F0", 5, "blue", "#FEFF6F", 10);

      box.getDatas().forEach(function(ele) {
        if (ele instanceof twaver.Link) {
          ele.setStyle("link.color", "blue");
          ele.setStyle("link.width", 5);

          //填充颜色
          ele.setClient("fillColor", "#000");
          //阴影颜色
          ele.setClient("shadowColor", "yellow");
          //尾巴长度
          ele.setClient("tail", 20);
        }
      });
    });

    return toolbar;
  }

  createAnimate(options) {
    return new twaver.Animate(options);
  }

  addButton(toolbar, label, handler) {
    let button = document.createElement("input");
    button.value = label;
    button.onclick = handler;
    button.type = "button";
    toolbar.appendChild(button);
  }

  flowCurve(linkColor, linkWidth, pointFillColor, shadowColor, tail) {
    let fromPoint = this.fromPoint,
      toPoint = this.toPoint;

    let link = new FlowLink(fromPoint, toPoint);
    link.setLayerId("link");
    link.setStyle("link.color", linkColor);
    link.setStyle("link.width", linkWidth);

    //填充颜色
    link.setClient("fillColor", pointFillColor);
    //阴影颜色
    link.setClient("shadowColor", shadowColor);
    //尾巴长度
    link.setClient("tail", tail);
    //设置流动
    link.setClient("link.type", "flowLink");
    this.box.add(link);

    this.flowLinks.length = 0;
    this.flowLinks.push(link);
  }
}
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let run = new FlowlinkPoint("network");
      run.init();
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

