<template>
  <div class="warp">
    <div id="div"></div>
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
      var flowLinks = new Array();

      var fromPoint = new twaver.Node();
      fromPoint.setName("fromPoint");
      fromPoint.setLocation(200, 400);
      box.add(fromPoint);

      var toPoint = new twaver.Node();
      toPoint.setLocation(600, 200);
      toPoint.setName("toPoint");
      box.add(toPoint);
      var toolbar = document.getElementById("div");

      function initToolbar() {
        addButton(toolbar, "直线", function() {
          box.getDatas().forEach(function(ele) {
            if (ele instanceof twaver.Link) {
              ele.setClient("isCurve", false);
            }
          });
        });

        addButton(toolbar, "曲线", function() {
          box.getDatas().forEach(function(ele) {
            if (ele instanceof twaver.Link) {
              ele.setClient("isCurve", true);
            }
          });
        });
        addButton(toolbar, "圆点一次", function() {
          createAnimate({
            from: 0,
            to: 1,
            repeat: 1,
            reverse: false,
            delay: 1000,
            dur: 3000,
            easing: "easeOutStrong",
            onUpdate: function(value) {
              flowLinks[0].setClient("percent", value);
              network.invalidateElementUIs();
            }
          }).play();
        });
        addButton(toolbar, "圆点无限次", function() {
          createAnimate({
            from: 0,
            to: 1,
            repeat: Number.POSITIVE_INFINITY,
            reverse: false,
            delay: 1000,
            dur: 3000,
            easing: "easeOutStrong",
            onUpdate: function(value) {
              flowLinks[0].setClient("percent", value);
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
      }

      function createAnimate(options) {
        return new twaver.Animate(options);
      }

      function addButton(toolbar, label, handler) {
        var button = document.createElement("input");
        button.value = label;
        button.onclick = handler;
        button.type = "button";
        toolbar.appendChild(button);
      }

      function flowCurve(
        linkColor,
        linkWidth,
        pointFillColor,
        shadowColor,
        tail
      ) {
        var link = new FlowLink(fromPoint, toPoint);
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
        box.add(link);

        flowLinks.length = 0;
        flowLinks.push(link);
      }

      //FlowLink
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
          var link = this.getElement();
          var fillColor = link.getClient("fillColor");
          var shadowColor = link.getClient("shadowColor");
          var tail = link.getClient("tail");
          var percent = link.getClient("percent");
          var paths = this.getLinkPoints();
          var offset = this.getLineLength() * percent;
          var point;
          //  console.log(paths)
          //尾巴
          for (var i = 0, count = tail; i < count; i++) {
            var v = i / count;
            point = _twaver.math.calculatePointInfoAlongLine(
              paths,
              true,
              offset - (count - i) * 1.5,
              0
            ).point;
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

      (function() {
        initToolbar();

        //createLink
        //linkColor,linkWidth,pointFillColor,shadowColor,tail
        flowCurve("#A5D8F0", 1, "red", "#FEFF6F", 5);

        document.getElementById("network").appendChild(network.getView());
        network.adjustBounds({
          x: 0,
          y: 0,
          width: 1000,
          height: 800
        });
        network.setZoom(0.9);
        network.setLinkPathFunction(function(linkUI, defaultPoints) {
          var link = linkUI._element;
          if (
            link.getClient("link.type") === "flowLink" &&
            link.getClient("isCurve")
          ) {
            var f = linkUI.getFromPoint();
            var t = linkUI.getToPoint();

            var points = new twaver.List();
            points.add(f);
            points.add(t);

            var lineLength = _twaver.math.getDistance(f, t);

            var offset = -lineLength / 5;
            var m = {
              x: (f.x + t.x) / 2 + offset,
              y: (f.y + t.y) / 2 + offset
            };
            var cps = new twaver.List();
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
        box.getDatas().forEach(function(ele) {
          if (ele instanceof twaver.Link) {
            var from = ele.getFromNode();

            var linkui = new twaver.vector.LinkUI(network, ele);
            // console.log(linkui)
            var points = linkui.getLinkPoints();
            // console.log(points)
            var point = _twaver.math.calculatePointInfoAlongLine(
              points,
              true,
              1,
              0
            ).point;
            //    console.log(linkui.getLineLength())
          }
        });
      })();
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

