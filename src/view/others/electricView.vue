<template>
  <div id="eleView">
    <div id="textCont">
      <span>文字说明</span>
    </div>

    <div id="vectorCont"></div>

    <Spin size="large" fix v-if="spinShow">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </div>
</template>

<style>
#eleView {
  width: 96%;
  height: calc(100% - 64px);
  overflow: hidden;
  background: #fff;
  position: absolute;
}
#eleView #textCont {
  width: 100%;
  height: 30%;
  background: lightgray;
}
#eleView #vectorCont {
  width: 100%;
  height: 70%;
  background: lightyellow;
  position: relative;
}
</style>

<script>
export default {
  data() {
    return {
      box: {},
      network: {},
      curUrlIp: "http://132.224.235.201:8282/topology_war_exploded",
      spinShow: false,
      res: {
        status: 1,
        message: "操作成功",
        obj: [
          {
            neId: "7095152F835B952B9F377A3E91BA95CE",
            neName: "2125-苏州城西局城西局-苏州城西",
            clrcultBoardVoList: [
              {
                boardId: "0D8F76AA1E545FCCFF5E25672C4524A8",
                boardModel: "TN52NQ201",
                boardNo: "1_012",
                clrcultPortVoList: [
                  {
                    portId: "DDE76E6934CFA1D8CE4B58570D188C22",
                    portCode: "51",
                    fullname:
                      "2125-苏州城西局城西局-苏州城西-1_0-12-1-52NQ2-51(ODU1LP1/ODU1LP1)",
                    linkId: "ED39FD69380ECCB2FD073542F4A52D8D",
                    odName: "4"
                  }
                ]
              },
              {
                boardId: "BE6DA5C1E98D01D956E6F9079E8C4377",
                boardModel: "999",
                boardNo: "1_014",
                clrcultPortVoList: [
                  {
                    portId: "C22C85794FF6EEFCCEA0051EC42D1386",
                    portCode: "53",
                    fullname:
                      "2125-苏州城西局城西局-苏州城西-1_0-14-1-52NQ2-53(ODU1LP3/ODU1LP3)",
                    linkId: "6D8236779C2CD63F0AE859D3CDFE14B6",
                    odName: "4"
                  }
                ]
              }
            ]
          },
          {
            neId: "ED39FD69380ECCB2FD073542F4A52D8D",
            neName: "2301-苏州河西局河西局-苏州河西",
            clrcultBoardVoList: [
              {
                boardId: "2EAB9993CA7E39F962B34DCE2B3BA534",
                boardModel: "000",
                boardNo: "1_01",
                clrcultPortVoList: [
                  {
                    portId: "DA04AD9320882EB2F868D6B324D38B5F",
                    portCode: "51",
                    fullname:
                      "2301-苏州河西局河西局-苏州河西-1_0-1-1-52NQ2-51(ODU1LP1/ODU1LP1)",
                    linkId: "47786F6293B7D59933EFA5AC5710ED55",
                    odName: "4"
                  }
                ]
              },
              {
                boardId: "6FDEA8921C97A6618A82C29217D6C63E",
                boardModel: "777",
                boardNo: "1_05",
                clrcultPortVoList: [
                  {
                    portId: "7500F7E155080CC5AD05A004D3353AC4",
                    portCode: "53",
                    fullname:
                      "2301-苏州河西局河西局-苏州河西-1_0-5-1-52NQ2-53(ODU1LP3/ODU1LP3)",
                    linkId: "7095152F835B952B9F377A3E91BA95CE",
                    odName: "4"
                  }
                ]
              }
            ]
          },
          {
            neId: "6D8236779C2CD63F0AE859D3CDFE14B6",
            neName: "2112-苏州工业园局工业园局-苏州工业园",
            clrcultBoardVoList: [
              {
                boardId: "137630036982A72DAE98106B8F178BAF",
                boardModel: "5555",
                boardNo: "1_030",
                clrcultPortVoList: [
                  {
                    portId: "B15444FE46D6615479E84E7C0A14E785",
                    portCode: "7",
                    fullname:
                      "2112-苏州工业园局工业园局-苏州工业园-1_0-30-1-52TOM-7(RX5/TX5)-/och=1/dsr=1(CLIENT-1)",
                    linkId: null,
                    odName: null
                  },
                  {
                    portId: "046CA825118802D33A4BD9AAE8210B5E",
                    portCode: "205",
                    fullname:
                      "2112-苏州工业园局工业园局-苏州工业园-1_0-30-1-52TOM-205(ClientLP5/ClientLP5)",
                    linkId: null,
                    odName: null
                  }
                ]
              },
              {
                boardId: "B3EF05E1ACCBA073E484FCD02B8204CE",
                boardModel: "TN5M2NQ201",
                boardNo: "1_05",
                clrcultPortVoList: [
                  {
                    portId: "BDBDE9D5DAABC257C74ECB0A7435E493",
                    portCode: "51",
                    fullname:
                      "2112-苏州工业园局工业园局-苏州工业园-1_0-5-1-52NQ2-51(ODU1LP1/ODU1LP1)",
                    linkId: "7095152F835B952B9F377A3E91BA95CE",
                    odName: "4"
                  }
                ]
              }
            ]
          },
          {
            neId: "47786F6293B7D59933EFA5AC5710ED55",
            neName: "2357-苏州新区科技城局科技城局-苏州东渚科技城",
            clrcultBoardVoList: [
              {
                boardId: "C738EB17FD3F081E89221C88FD1037AF",
                boardModel: "TN5M2TOM01",
                boardNo: "1_022",
                clrcultPortVoList: [
                  {
                    portId: "609FD38E9543330F9B2674BFC50930C1",
                    portCode: "9",
                    fullname:
                      "2357-苏州新区科技城局科技城局-苏州东渚科技城-1_0-22-1-52TOM-9(RX7/TX7)-/och=1/dsr=1(CLIENT-1)",
                    linkId: null,
                    odName: null
                  },
                  {
                    portId: "7287227F4AC6D9D5A0C0CA1D8F55E042",
                    portCode: "207",
                    fullname:
                      "2357-苏州新区科技城局科技城局-苏州东渚科技城-1_0-22-1-52TOM-207(ClientLP7/ClientLP7)",
                    linkId: null,
                    odName: null
                  }
                ]
              },
              {
                boardId: "5B3B221E2107AF31F2D593A6AED3B296",
                boardModel: "TN5M2NQ201",
                boardNo: "1_031",
                clrcultPortVoList: [
                  {
                    portId: "A98990464EC4B244EE45BB491B340A8A",
                    portCode: "53",
                    fullname:
                      "2357-苏州新区科技城局科技城局-苏州东渚科技城-1_0-31-1-52NQ2-53(ODU1LP3/ODU1LP3)",
                    linkId: "ED39FD69380ECCB2FD073542F4A52D8D",
                    odName: "4"
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    init() {
      let me = this;
      me.box = new twaver.ElementBox(); //创建一个box容器
      me.network = new twaver.vector.Network(me.box); //创建画布,并将容器放置于画布中
      setTimeout(() => {
        me.registerImage("./static/images/map_otms_parent.png", "gwy");
      }, 0);
    },
    getEleView() {
      let me = this;
      // me.spinShow = true;
      // me.$http.post(me.curUrlIp+'/clrcult/index/queryclrcult',{id:'025012800008728595'})
      //   .then((res) => {
      //     let resData = res.data.obj;
      //     for(let i in resData){
      //       let _item = resData[i];
      //       me.drawBoard(400*i-200,-80,_item.neName,_item.clrcultBoardVoList);
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   }).finally(function(){
      //     me.spinShow = false;
      // });

      let resData = me.res.obj;
      for (let i in resData) {
        let _item = resData[i];
        me.drawNe(
          i,
          400 * i - 200,
          -80,
          _item.neName,
          _item.clrcultBoardVoList
        );
      }
    },
    drawNe(index, posx, posy, name, clrcultBoardVoList) {
      let me = this;
      twaver.Util.registerImage("rect", {
        w: 300,
        h: 300,
        fill: "#eee",
        v: [
          {
            shape: "rect",
            rect: [-150, -150, 300, 300]
          }
        ]
      });

      let rect = "rect" + index;
      rect = new twaver.Group();
      rect.setImage("rect");
      rect.setName(name);
      console.log(name);
      rect.s("label.yoffset", 10);
      rect.setLocation(posx, posy);
      me.box.add(rect);
      me.drawBoard(clrcultBoardVoList, rect, index);
      setTimeout(() => {
        me.initNetwork();
      }, 0);
      // me.network.setZoomDivVisible(false);
    },
    drawBoard(clrcultBoardVoList, pData, index) {
      let me = this;
      let _xyArr = [
        { x: 100 + index * 400, y: 230 },
        { x: 250 + index * 400, y: 230 }
      ];
      for (let i in clrcultBoardVoList) {
        let _item = clrcultBoardVoList[i];
        let _board = "board" + index + i;
        _board = new twaver.Follower({
          id: _item.boardId,
          location: {
            x: _xyArr[i].x,
            y: _xyArr[i].y
          }
        });
        _board.setImage("gwy");
        _board.setName2(_item.boardModel);
        _board.setName(_item.boardNo);
        _board.setHost(pData);
        me.box.add(_board);
        let _portList = _item.clrcultPortVoList;
        console.log(_portList);
        me.drawPort(_portList, index, i, _board);
        // let link = new twaver.Link('board'+index+i,'board'+index+(i+1));
        // me.box.add(link);
      }
      setTimeout(() => {
        me.initNetwork();
      }, 0);
    },
    drawPort(portList, index1, index2, pData) {
      let me = this;
      twaver.Util.registerImage("circle", {
        w: 10,
        h: 10,
        // fill:'#89BB54',
        line: {
          width: 1,
          color: "#89BB54"
        },
        v: [
          {
            shape: "circle",
            cx: 0,
            cy: 0,
            r: 7
          }
        ]
      });
      console.log(portList.length);
      // let _xyArr = [{x:112+index1*400,y:230},{x:262+index1*400,y:230}];
      for (let i in portList) {
        let _item = portList[i];
        console.log(_item);
        let _port = "port" + index1 + index2;
        _port = new twaver.Node({
          id: _item.portId,
          location: {
            x: 0,
            y: 0
            // x:_xyArr[i].x,
            // y:_xyArr[i].y
          }
        });
        _port.setImage("circle");
        // _port.setName2(_item.fullname);
        _port.setName(_item.portCode);
        // _port.setHost(pData);
        me.box.add(_port);
      }
      setTimeout(() => {
        me.initNetwork();
      }, 0);
    },
    initNetwork() {
      let me = this;
      let contDiv = document.getElementById("vectorCont");
      let view = this.network.getView();
      contDiv.appendChild(view); //将获取到的画布放置到div中
      me.network.adjustBounds({
        x: 0,
        y: 0,
        width: contDiv.clientWidth,
        height: contDiv.clientHeight
      });
      me.network.getToolTip = function(element) {
        let Id = element.getId();
        let name = element.getName();
        return name;
      };
      // me.network.panToCenter();
      // twaver.vector.Network.setVScrollBarVisible(1);
      me.network.setWheelToZoom(false);
    },
    registerImage(url, name) {
      let me = this;
      let image = new Image();
      image.src = url;
      image.onload = function() {
        twaver.Util.registerImage(name, image, image.width, image.height);
        image.onload = null;
        me.network.invalidateElementUIs();
      };
    }
  },
  created() {
    this.init();
    this.getEleView();
  },
  mounted() {}
};
</script>
