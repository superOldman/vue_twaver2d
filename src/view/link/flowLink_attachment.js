

class LinkAttachment {
  constructor(container) {
    this.box = new twaver.ElementBox();
    this.network = new twaver.vector.Network(this.box);
    this.container = document.getElementById(container);
  }
  init() {
    this.initNetwork();
    this.initDataBox();
    this.registerNormalImage("../../static/images/barLeftbottom.png", "barLeftbottom");
    this.registerNormalImage("../../static/images/barBottomright.png", "barBottomright");
    this.registerNormalImage("../../static/images/barTopleft.png", "barTopleft");
    this.registerNormalImage("../../static/images/barTopright.png", "barTopright");
  }
  registerNormalImage(url, name) {
    let image = new Image();
    let that = this;
    image.src = url;
    image.onload = function() {
      twaver.Util.registerImage(name, image, image.width, image.height);
      image.onload = null;
      that.network.invalidateElementUIs();
    };
  }
  initDataBox() {
    this.nodeToNode("a", "b", 100, 200, 2);
  }
  nodeToNode(name, name2, locx, locy, linkWidth) {
    let nodea = new twaver.Node({
      name: name,
      location: { x: locx, y: locy }
    });
    let nodeb = new twaver.Node({
      name: name2,
      location: { x: locx + 100, y: locy + 100 }
    });

    //link
    let link = new CLink(nodea, nodeb);

    // 连线样式
    // link.setStyle("link.type", "extend.top");
    // link.setStyle("link.type", "extend.right");
    // link.setStyle("link.type", "extend.left");
    // link.setStyle("link.type", "extend.bottom");
    link.setStyle("link.type", "orthogonal");
    // link.setStyle("link.type", "orthogonal.vertical");
    // link.setStyle("link.type", "orthogonal.V.H");
    // link.setStyle("link.type", "orthogonal.H.V");

    link.s("link.width", this.linkWidth);

    //设置自定义管子  边框 颜色
    link.setClient("link.pipe", true);
    link.setClient("link.pipe.border", 1);
    link.setClient("link.pipe.color", "blue");

    // 流水
    link.setStyle("link.pattern", [15, 15]);
    link.setStyle("isLoop", 1);
    link.setStyle("link.flow.color", "#10F000");
    link.setStyle("link.flow", true);
    link.setStyle("link.color", "transparent");

    link.setClient("show.bar", true);
    this.box.add(nodea);
    this.box.add(nodeb);
    this.box.add(link);
  }
  initNetwork() {
    let view = this.network.getView();
    this.container.appendChild(view);
    this.network.adjustBounds({
      x: 0,
      y: 0,
      width: 1300,
      height: 600
    });

    this.network.setZoom(2, { x: 100, y: 100 });
    //线流动
    this.network.setLinkFlowEnabled(true);
    this.network.setLinkFlowInterval(100);

    // 序列化的默认流动颜色
    // twaver.Defaults.NETWORK_LINK_FLOW_COLOR = "#10F000";
  }
}


function getAngle(p1, p2) {
  if (p1.x === p2.x) {
    if (p2.y === p1.y) {
      return 0;
    } else if (p2.y > p1.y) {
      return Math.PI / 2;
    } else {
      return -Math.PI / 2;
    }
  }
  return Math.atan((p2.y - p1.y) / (p2.x - p1.x));
}
/**
 * 自定义的网元以及附件attachment
 */
function CLink(from, to) {
  CLink.superClass.constructor.call(this, from, to);
}

twaver.Util.ext(CLink, twaver.Link, {
  getVectorUIClass: function() {
    return CLinkUI;
  }
});
function CLinkUI(network, element) {
  CLinkUI.superClass.constructor.call(this, network, element);
}
twaver.Util.ext(CLinkUI, twaver.vector.LinkUI, {
  // 添加一个管子的路径
  paintBody: function(ctx) {
    let link = this.getElement();
    if (link.getClient("link.pipe")) {
      let linkBorder = link.getClient("link.pipe.border") * 2;
      let points = this.getLinkPoints();
      let width = link.getStyle("link.width");
      let color = link.getClient("link.pipe.color");
      this.drawLinkBot(ctx, points, width + linkBorder, color);
    }
    CLinkUI.superClass.paintBody.call(this, ctx);
  },
  // 画
  drawLinkBot: function(g, points, linkBorder, color) {
    g.strokeStyle = color;
    g.lineWidth = linkBorder;
    g.beginPath();
    _twaver.g.drawLinePoints(g, points);
    g.stroke();
  },

  checkAttachments: function() {
    CLinkUI.superClass.checkAttachments.call(this);
    this.checkCAttachment();
  },
  checkCAttachment: function() {
    let showTip = this._element.getClient("show.bar");
    if (showTip != null && showTip != false) {
      if (!this._CAttachment) {
        this._CAttachment = new CAttachment(this);
        this.addAttachment(this._CAttachment);
      }
    } else {
      if (this._CAttachment) {
        this.removeAttachment(this._CAttachment);
        this._CAttachment = null;
      }
    }
  }
});
function CAttachment(elementUI, showInAttachmentDiv) {
  CAttachment.superClass.constructor.call(this, elementUI, showInAttachmentDiv);
}

twaver.Util.ext(CAttachment, twaver.vector.Attachment, {
  validate: function() {
    CAttachment.superClass.validate.call(this);
    let eleUI = this.getElementUI();
    let ele = eleUI.getElement();

    let iconArr = [];
    let iconOffsetArr = [];
    eleUI.getLinkPoints().forEach(function(item) {
      if (item instanceof twaver.List) {
        iconArr.push("");
        iconOffsetArr.push(item.get(0));
      }
    });
    if (iconOffsetArr.length == 0) {
      ele.setClient("icons.names", "");
      return;
    }

    this.locations = iconOffsetArr;

    let from = ele.getFromNode();
    let fromLocation = from.getLocation();
    let to = ele.getToNode();
    let toLocation = to.getLocation();
    let nodeAngleArr = [];
    nodeAngleArr.push(fromLocation);
    nodeAngleArr.push(toLocation);
    let an = getAngle(nodeAngleArr[0], nodeAngleArr[1]);

    let linkTypes = [
      { "extend.top": ["barBottomright", "barLeftbottom"] },
      { "extend.left": ["barBottomright", "barTopright"] },
      { "extend.right": ["barLeftbottom", "barTopleft"] },
      { "extend.bottom": ["barTopright", "barTopleft"] }
    ];

    let linkTp = ele.getStyle("link.type");
    if (linkTp.indexOf("extend") !== -1) {
      for (let i = 0; i < linkTypes.length; i++) {
        if (linkTypes[i].hasOwnProperty(linkTp)) {
          this.barIcon = linkTypes[i][linkTp];
          if (
            fromLocation.x > toLocation.x &&
            (linkTp == "extend.top" || linkTp == "extend.bottom")
          ) {
            //top
            this.barIcon.reverse();
          } else if (
            fromLocation.y > toLocation.y &&
            (linkTp == "extend.right" || linkTp == "extend.left")
          ) {
            this.barIcon.reverse();
          }
        }
      }

      if (an !== 0) {
        ele.setClient("icons.names", this.barIcon);
      } else {
        ele.setClient("icons.names", "");
      }
    } else if (linkTp.indexOf("orthogonal") !== -1) {
      if (iconOffsetArr.length === 1) {
        if (linkTp == "orthogonal.H.V") {
          if (an > 0) {
            if (fromLocation.x > toLocation.x) {
              iconArr[0] = "barTopright";
            } else {
              iconArr[0] = "barLeftbottom";
            }
          } else {
            if (fromLocation.x > toLocation.x) {
              iconArr[0] = "barBottomright";
            } else {
              iconArr[0] = "barTopleft";
            }
          }
        }
        if (linkTp == "orthogonal.V.H") {
          if (an > 0) {
            if (fromLocation.x > toLocation.x) {
              iconArr[0] = "barLeftbottom";
            } else {
              iconArr[0] = "barTopright";
            }
          } else {
            if (fromLocation.x > toLocation.x) {
              iconArr[0] = "barTopleft";
            } else {
              iconArr[0] = "barBottomright";
            }
          }
        }
      } else {
        if (an > 0) {
          //2 4
          if (fromLocation.x < toLocation.x) {
            if (iconOffsetArr[0].x === iconOffsetArr[1].x) {
              iconArr[0] = "barLeftbottom";
              iconArr[1] = "barTopright";
            } else {
              iconArr[0] = "barTopright";
              iconArr[1] = "barLeftbottom";
            }
          } else {
            if (iconOffsetArr[0].x === iconOffsetArr[1].x) {
              iconArr[1] = "barLeftbottom";
              iconArr[0] = "barTopright";
            } else {
              iconArr[1] = "barTopright";
              iconArr[0] = "barLeftbottom";
            }
          }
        } else if (an < 0) {
          //1 3
          if (fromLocation.x < toLocation.x) {
            if (iconOffsetArr[0].x === iconOffsetArr[1].x) {
              iconArr[1] = "barBottomright";
              iconArr[0] = "barTopleft";
            } else {
              iconArr[0] = "barBottomright";
              iconArr[1] = "barTopleft";
            }
          } else {
            if (iconOffsetArr[0].x === iconOffsetArr[1].x) {
              iconArr[0] = "barBottomright";
              iconArr[1] = "barTopleft";
            } else {
              iconArr[1] = "barBottomright";
              iconArr[0] = "barTopleft";
            }
          }
        }
      }

      if (an !== 0) {
        ele.setClient("icons.names", iconArr);
      } else {
        ele.setClient("icons.names", "");
      }
    }
  },
  paint: function(ctx) {
    if (this.locations && this.locations.length > 0) {
      let iconsNames = this.getElement().getClient("icons.names");
      for (let i = 0; i < iconsNames.length; i++) {
        let imageAsset = _twaver.getImageAsset(iconsNames[i]),
          $width = 8,
          $height = 8,
          xoffset = $width / 2,
          yoffset = $height / 2,
          rect = {
            width: $width,
            height: $height,
            x: this.locations[i].x - xoffset,
            y: this.locations[i].y - yoffset
          };
        if (imageAsset) {
          twaver.Util.drawImage(
            ctx,
            imageAsset.getImage(),
            null,
            rect,
            this._element,
            this._network
          );
        }
      }
    }
  }
});
let myjson;

//序列化之前保存 自定义的属性
twaver.SerializationSettings.setClientType("link.pipe", true);
twaver.SerializationSettings.setClientType("link.pipe.border", 1);
twaver.SerializationSettings.setClientType("link.pipe.color", "blue");
twaver.SerializationSettings.setClientType("show.bar", true);
function getJSON() {
  let datas = new twaver.JsonSerializer(box).serialize();
  myjson = datas;
  console.log(datas);
}

function getView() {
  new twaver.JsonSerializer(box).deserialize(myjson);
}



export default LinkAttachment

