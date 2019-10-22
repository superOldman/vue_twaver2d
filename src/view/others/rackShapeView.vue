<template>
  <div id="rackView">
    <div id="main">
      <Button type="primary" @click="openLegendDiv" id="legendBtn">查看图例说明</Button>

      <div id="legend" v-if="lengendFlag" :class="{'animated':true,'fadeOutRight':legendAniOutClass,'fadeInRight':legendAniInClass}">
        <ul>
          <li v-for="(item ,index) in rightList" :key="'lg'+index">
            <img :src="item.imgSrc" v-if="item.imgSrc" alt="">
            <span :style="{background: item.color}" v-else :class="{'right-span':true}"></span>
            <span v-html="item.text">{{item.text}}</span>
          </li>
        </ul>
      </div>

      <div id="leftDiv"></div>

      <!--头部 tab-->
      <div id="topDiv">
        <ul>
          <li v-for="(item,index) in tabs" :key="item.val" @click="refreshData(index,item)" :class="activeClass === index ? 'li_active':''" :title="item.text">
            <span>{{item.text}}</span>
          </li>
        </ul>
      </div>
      <!--画布  机框-->
      <div id="centerDiv">
        <div v-if="proConsFlag" id="center_sel" :class="{'animated':proConsFlag, 'bounce':proConsFlag}">
          <Select v-model="proConsVal" class="col_item" @on-change="selFrontOrBeh(proConsVal)">
            <Option  v-for="(item,index) in proConsList" :value="item.code" :key="'cd'+index">{{item.name}}</Option>
          </Select>
        </div>
      </div>

      <!--端口-->
      <div id="rightDiv" v-if="showPortInfo">
        <div id="closePort"><Icon type="ios-close-circle" size="36" @click="closePort"/></div>
        <div id="boardName">
          <span>端口信息：</span>
        </div>

        <div id="portTree"></div>
      </div>
    </div>

    <Spin size="large" fix v-if="spinShow">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>正在加载数据...</div>
    </Spin>
  </div>
</template>

<style>
  body{
    margin: 0;
    padding: 0;
  }
  #rackView{
    width:96%;
    height: calc(100% - 64px);
    overflow: hidden;
    background: #fff;
    position: absolute;
  }
  #main{
    height:100%;
    position: relative;
  }
  #legendBtn{
    width: 2rem;
    height: 8rem;
    position: fixed;
    z-index:999;
    top:30%;
    right:calc(1.92% - 3px);
    white-space: normal!important;
    display: flex;
    justify-content: center;
  }
  #legend{
    width: 16rem;
    height: calc(100% - 128px);
    position: fixed;
    right:calc(1.92% - 3px);
    z-index:888;
    background: #fff;
    border:1px solid rgba(0,0,0,0.1);
    box-shadow: -2px 0 4px 0 rgba(0,0,0,0.1);
  }
  #legend ul{
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.2rem;
  }
  #legend ul li{
    width: 100%;
    margin-top: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #legend ul li img{
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 1rem;
  }
  #topDiv{
    height: 5rem!important;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  #centerDiv{
    width:100%!important;
    height:calc(100% - 5rem)!important;
  }
#rackView #rightDiv{
  width: 20%;
  height: calc(100% - 128px - 5rem);
  position: fixed;
  z-index:777;
  right:calc(1.92% - 3px);
  top:calc(60px + 5rem + 4%);
  background: #f7f7f7;
  padding: 1.5rem;
  border:1px solid #999;
}
  #rackView #rightDiv #closePort{
    position: absolute;
    right: .2rem;
    top: .2rem;
  }
#rackView #rightDiv #boardName{
  font-size: 1rem;
  text-align: left;
}
  #rackView #rightDiv #portTree{
    width: 100%;
    height: calc(100% - 1rem);
  }
  #rackView #topDiv ul{
    overflow: hidden;
    font-size: 1.2rem;
    height: 100%;
  }
  #rackView #topDiv ul li{
    width: 10rem;
    height: 100%;
    float: left;
    margin-left: 4rem;
    color:#2d8cf0!important;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  #rackView #topDiv ul li span{
    width: 100%;
    height: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #center_sel {
    width: 12rem;
    height: 8rem;
    background: lightgreen;
    position: absolute;
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
  .li_active{
    border-bottom:2px solid #2d8cf0;
  }
  .right-span{
    width:1.4rem;
    height:1.4rem;
    border-radius: 50%;
    margin-right: 1rem;
  }
</style>

<script>
export default{
    data(){
        return {
          box1:{},
          box2:{},
          box3:{},
          network:{},
          tree1:{},
          tree3:{},
          curUrlIp:'http://132.224.235.201:8282/topology_war_exploded',
          tabs:[],
          activeClass:0,
          proConsFlag:false,
          proConsVal:0,
          proConsList:[
            {
              code:0,
              name:'正面'
            },
            {
              code:1,
              name:'反面'
            }
          ],
          lengendFlag:false,
          legendAniOutClass:false,
          legendAniInClass:false,
          rightList:[
            {
              imgSrc:'../static/images/nh.png',
              text:'内环回&emsp;'//使用v-html进行解析
            },
            {
              imgSrc:'../static/images/wh.png',
              text:'外环回&emsp;'
            },
            {
              color:'#FA503D',
              text:'严重告警'
            },
            {
              color:'#FA8E47',
              text:'重要告警'
            },
            {
              color:'#FACD2C',
              text:'次要告警'
            },
            {
              color:'#D2A6D2',
              text:'警告告警'
            },
            {
              color:'#89BB54 ',
              text:'正常&emsp;&emsp;'
            },
            {
              imgSrc:'../static/images/bkbh.png',
              text:'板卡保护'
            },
            {
              imgSrc:'../static/images/bkgz.png',
              text:'板卡工作'
            },
          ],
          res:{},
          showPortInfo:false,
          spinShow:false,
          boardName:'暂无端口名称',
        }
    },
    methods:{
        init(_params){
          let me = this;
          me.box1 = new twaver.ElementBox();
          me.box2 = new twaver.ElementBox();
          me.box3 = new twaver.ElementBox();
          me.network = new twaver.vector.Network(me.box2);
          me.tree1 = new twaver.controls.Tree(me.box1);
          me.tree3 = new twaver.controls.Tree(me.box3);
          let toolbar = document.getElementById("toolbar");
          me.initPane();
          me.popupMenu();
          me.getRackTree(_params);
          me.getRootRackInfo(_params);
        },
        initPane(){
          let centerPane = document.getElementById('centerDiv');
          let topPane = document.getElementById('topDiv');
          let rightPane = document.getElementById('rightDiv');
          let borderPane = new twaver.controls.BorderPane(centerPane,topPane,rightPane,null,null);
          borderPane.setRightWidth(300);
          let splitPaneLeft = document.getElementById('leftDiv');
          splitPaneLeft.style.background=twaver.Colors.white;
          let splitPane = new twaver.controls.SplitPane(splitPaneLeft,borderPane);
          splitPane.getView().style.position = 'absolute';
          splitPane.getView().style.left = '0px';
          splitPane.getView().style.top = '0px';
          splitPane.getView().style.right = '0px';
          splitPane.getView().style.bottom = '0px';
          splitPane.setPosition(0.15);
          splitPane.setDividerWidth(1);
          document.getElementById('main').appendChild(splitPane.getView());
          this.initTree(splitPaneLeft);
          window.onresize = function (e) {
            splitPane.invalidate();
          };
        },
      initTree3(){
        let me = this;
        let treeDom = me.tree3.getView();
        treeDom.style.width = 'calc(100% - 3rem)';
        treeDom.style.height = 'calc(100% - 3rem)';
        document.getElementById('portTree').appendChild(treeDom);
        me.tree3.setVisibleFunction(function (element) {
          return element instanceof twaver.Node;
        });
      },
      initNetwork(){
        let contDiv = document.getElementById('centerDiv');
        let view = this.network.getView();
        let me = this;
        contDiv.appendChild(view);//将获取到的画布放置到div中
        this.network.adjustBounds({
          x: 0,
          y: 0,
          width: contDiv.clientWidth,
          height: contDiv.clientHeight
        });
        // me.network.addInteractionListener(function(e) {
        //   if (e.kind == "clickElement") {
        //     me.box2.getDatas().forEach(function(data) {
        //       if (data instanceof twaver.Follower) {
        //         if (data !== e.element) {
        //           data.setHost(e.element);
        //         }
        //       }
        //     });
        //   }
        // });

        me.network.setZoom(1.5);//设置画布初始化大小
        twaver.Styles.setStyle('label.color','#ec6c00');
        twaver.Styles.setStyle('label2.color','#57ab9a');
        twaver.Styles.setStyle('select.color','yellow');
        twaver.Styles.setStyle('group.fill','false');
        twaver.Styles.setStyle('group.fill.color','#fff');
        twaver.Styles.setStyle('link.width','0.6');
      },
      initTree(treeDiv){
        let me = this;
        let treeDom = this.tree1.getView();
        treeDom.style.width = '100%';
        treeDom.style.height = '100%';
        treeDiv.appendChild(treeDom);//将tree放入左侧Div
        me.tree1.setVisibleFunction(function (element) {
          return element instanceof twaver.Node;
        });

        me.tree1.getView().addEventListener('dblclick',function(e){//双击树
            let node = me.tree1.getDataAt(e);
            let _type = node.getClient('isCode'),_id = node._id;
            if(_type){
              me.getRootRackInfo({id:_id,type:_type});
            }else{
              //...
            }
        })
      },
      getExpandImg(){
        let me = this;
        me.tree1.getToggleImage = function(data) {
          if (data.getClient("hasChild")) {
            return this.isExpanded(data)? this.getExpandIcon(): this.getCollapseIcon();
          }
          return null;
        };
        me.tree3.getToggleImage = function(data) {
          if (data.getClient("hasChild")) {
            return this.isExpanded(data)? this.getExpandIcon(): this.getCollapseIcon();
          }
          return null;
        };
        // me.tree3.expandAll();
      },
      expandTree(){
        let me = this;
        me.tree1.expand = function(data) {
          if (!data.getClient("loaded")) {
            setTimeout(function() {
              data.setClient("loaded", true);
              me.getChilrenTree(data._id,data.getClient('type'),data);
            }, 1000);
          }
          // 对应的tree 原始默认事件
          twaver.controls.Tree.prototype.expand.call(this, data);
        };
      },
      openLegendDiv(){
          let me = this;
          if(me.legendAniInClass && !me.legendAniOutClass){
            me.lengendFlag = true;
            me.legendAniInClass = false;
            me.legendAniOutClass = true;
          }else{
            me.lengendFlag = true;
            me.legendAniInClass = true;
            me.legendAniOutClass = false;
          }
      },
      getRackTree(_params){
        let me = this;
        me.box1.clear();
        me.$http.post(me.curUrlIp+'/rack/index/queryTree',{id:_params.id,type:_params.type})
          .then((res) => {
              if(res.data.obj){
                  let _obj = res.data.obj;
                  let _group = new twaver.SubNetwork({
                    id:_obj.id,
                    name:_obj.code,
                    icon:_obj.icon?_obj.icon:'./static/images/msap-2.png',
                  });
                if(Number(_obj.isParent) === 1){
                  _group.setClient('hasChild', true);
                }
                _group.setClient('isCode',_obj.iscode);
                _group.setClient('type',_obj.type);
                _group.setVisible(false);
                me.box1.add(_group);
                me.getExpandImg();
                me.expandTree();
              }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getChilrenTree(id,type,pData){
        let me = this;
        me.$http.post(me.curUrlIp+'/rack/index/queryTree',{id:id,type:type})
          .then((res) => {
            if(res.data && res.data.obj){
              let _obj = res.data.obj;
              for(let i in _obj){
                  let _item = _obj[i];
                  let _curTreeItem = 'child'+i;
                  _curTreeItem = new twaver.SubNetwork({
                    id:_item.id,
                    name:_item.code,
                    icon:_item.icon?_item.icon:'./static/images/msap-2.png',
                  });
                  if(Number(_item.isParent) === 1){
                    _curTreeItem.setClient('hasChild',true);
                  }
                  _curTreeItem.setParent(pData);
                  _curTreeItem.setClient('isCode',_item.iscode);
                  _curTreeItem.setClient('type',_item.type);
                  _curTreeItem.setVisible(false);
                  me.box1.add(_curTreeItem);
                  me.getExpandImg();
                  me.expandTree();
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      getRootRackInfo(_params){
        let me = this;
        me.box2.clear();
        me.tabs = [];
        me.$http.post(me.curUrlIp+'/board/index/queryport',{id:_params.id,type:_params.type})
          .then((res) => {
            if(res.data && res.data.obj){
              me.res = res.data;
              let _obj = res.data.obj;
              for(let i in _obj){
                let _objItem = _obj[i];
                me.tabs.push({val:i,text:_objItem.shelfno+'子框',neId:_objItem.neId,shelfno:_objItem.shelfno});
                if(_objItem.isParent === 1){//启用正反面
                  me.proConsFlag = true;
                }else{
                  me.proConsFlag = false;
                }
              }
              me.drawRackView(0,0,_obj[0],me.tabs[0]);//TODO
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      drawRackView(proConsFlag,curIndex,curData,item){
        let me = this;
        me.box2.clear();
        console.log(curData)
        let _smVo = curData.shelfModelVo;
        let _bVo = curData.boardVoList;
        for(let i in _smVo){
          let _eachItem = _smVo[i];
          if(proConsFlag === _eachItem.shleflocation){//正反面
            //获得当前填充色
            let _fillColor = '#B2B2B2';
            let _id = '';
            let _rackName = '';
            let _x = 0,_y = 0,_cx = 0,_cy = 0;
            let _textAlign = 'center';
            let _color = '#fff';
            let _borderWidth = .5;
            for(let j in _bVo){
              let _curNumArr = _bVo[j].num.split(',');
              if(_curNumArr.length > 1){
                  // for(let n in _curNumArr){
                  //   if(_curNumArr[n] === _eachItem.slotno){
                  //
                  //   }
                  // }
              }else{
                if(_curNumArr[0] === _eachItem.slotno){
                  _fillColor = '#E7E1CD';
                  _id = _bVo[j].boarid;
                  // _eachItem.slotno = _bVo[j].num;
                  _color = '#000';
                  if(_eachItem.width > _eachItem.high){//横着
                    if(_eachItem.width - 6 > _eachItem.high){
                      _textAlign = 'left';
                    }
                    _rackName = _bVo[j].code;
                  }else{
                    _rackName = _bVo[j].code.split('').join('\n');
                  }
                  break;
                }else{
                  if(_eachItem.width - 6 > _eachItem.high){//横着
                    _textAlign = 'left';
                  }
                }
              }
            }
            if(_eachItem.width - 6 > _eachItem.high) {//横着
              _x = -(_eachItem.width/2);
              _cx = -40;
              _cy = 0;
            }else{
              _y = (_eachItem.high/2)-10;
              _cx = 0;
              _cy = -(_eachItem.high/2) + 10;
            }

            twaver.Util.registerImage('circle', {
              w: 10,
              h: 10,
              fill:'#89BB54',
              line: {
                width: 1,
                color:'#89BB54'
              },
              v: [
                {
                  shape: 'circle',
                  cx:  _cx,
                  cy:  _cy,
                  r: 7
                },
              ]
            });

            let _imgName = 'rect'+i;
            twaver.Util.registerImage(_imgName, {
              w: _eachItem.width,
              h: _eachItem.high,
              v: [
                {
                  shape: 'rect',
                  rect: { x: -(_eachItem.width/2) , y: -(_eachItem.high/2),w:_eachItem.width,h:_eachItem.high},
                  fill:_fillColor,
                  line: {
                    width: _borderWidth,
                    color: '#898989'
                  }
                },
                {
                  shape: 'text',
                  text: _rackName,
                  textAlign: 'center',
                  textBaseline: 'center',
                  font:'10px arial',
                  x: 0,
                  y: 0
                },
                {
                  shape: 'text',
                  text:_eachItem.slotno,
                  textAlign: _textAlign,
                  textBaseline: 'center',
                  fill:_color,
                  x: _x,
                  y: _y
                },
                {
                  shape:'vector',
                  name:'circle',
                  x:0,
                  y:0
                }
              ],
              onDoubleClick: function (data, view) {
                me.showPortInfo = true;
                setTimeout(()=>{
                  me.initTree3();
                },0);
                //TODO
                let _id = data.getClient('curId');
                if(_id){
                  me.showPortinfo(_id);
                }else{
                  me.showPortInfo = false;
                  me.$Modal.warning({
                    title: '温馨提示：',
                    content: '当前槽位无端口信息哦',
                    className:'vertical-center-modal'
                  });
                }
              },
            });

            var rect = new twaver.Node({
              name: '',
              location: {
                x: _eachItem.xpos,
                y: _eachItem.ypos
              },
              image: _imgName
            });
            rect.setClient('curId',_id);
            me.box2.add(rect);
            setTimeout(()=>{
              me.initNetwork();
              me.network.panToCenter();
            },0);
          }
        }
        me.drawAlarmInfo(item);
      },
      drawAlarmInfo(item){//TODO
          let me = this;
          me.$http.post(me.curUrlIp+'/board/index/queryBoardAlarm',{id:item.neId,type:item.shelfno})
          .then((res) => {
            if(res.data && res.data.obj){

            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      refreshData(index,item){
        let me = this;
        me.proConsFlag = false;
        me.proConsVal = 0;
        me.activeClass = index;
        if(me.res.obj[index].isParent === 1){
          setTimeout(() => {
            me.proConsFlag = true;
          },200)
        }else{
          setTimeout(() => {
            me.proConsFlag = false;
          },200);
        }
        let _curObj = me.res.obj[index];
        me.drawRackView(me.res.obj[index].isParent,index,_curObj,item);//TODO
      },
      selFrontOrBeh(index){
          let me = this;
          let _curLiIndex = me.activeClass;
          let _curObj = me.res.obj[_curLiIndex];
        },
      popupMenu(){//右键弹窗
        let me = this;
        let popupMenu = new twaver.controls.PopupMenu(me.network);
        popupMenu.setMenuItems([
          { label: '板卡详情',group:'Node'},
        ]);
        popupMenu.onMenuItemRendered = function (div, menuItem) {
          div.childNodes[1].style['font-family']="'Microsoft Yahei', 'Open Sans',sans-serif";
          div.childNodes[1].style['font-size']='12px';
        };

        let lastData, lastPoint, magnifyInteraction;
        popupMenu.onMenuShowing = function (e) {
          lastData = me.network.getSelectionModel().getLastData();
          lastPoint = me.network.getLogicalPoint(e);
          return true;
        };

        popupMenu.onAction = function(menuItem) {
          let _label = menuItem.label;
          if (_label === "板卡信息") {

          }
        };

        // 设置右键菜单是否可见
        popupMenu.isVisible = function(menuItem) {
          if(lastData){
            if (lastData instanceof twaver.SubNetwork && menuItem.group === 'SubNetwork') {
              return true;
            }
            if(lastData instanceof twaver.Node && menuItem.group === 'Node' && lastData.getClient('hasChild') === undefined){
              return true;
            }
            if (lastData instanceof twaver.Group && menuItem.group === 'Group') {
              return true;
            }
            if (lastData instanceof twaver.Link && menuItem.group === 'Link') {
              return true;
            }
            return menuItem.group === 'Element';//这个是公共的弹出
          }else{
            return menuItem.group === 'none';
          }
        };
      },
      showPortinfo(id){
        let me = this;
        me.box3.clear();
        // me.spinShow=true;
        me.$http.post(me.curUrlIp+'/port/index/queryport',{id : id})
          .then((res) => {
            if(res.data && res.data.obj.portlist){
              let _obj = res.data.obj;
              let _group = new twaver.SubNetwork({
                id:'',
                name:_obj.boardName,
                icon:_obj.icon?_obj.icon:'./static/images/msap-2.png',
              });
              if(_obj.portlist.length > 0) {
                _group.setClient('hasChild',true);
              }
              me.box3.add(_group);

              //创建树（最多3层）
              if(_obj.portlist.length > 0){//第二层
                  for(let i in _obj.portlist){
                    let _subGroup = 'subGroup'+i;
                    let _subItem = _obj.portlist[i];
                    _subGroup = new twaver.SubNetwork({
                      id:_subItem.portId,
                      name:'端口：'+_subItem.code,
                      icon:'./static/images/msap-2.png',
                    });
                    if(_subItem.list.length > 0){
                      _subGroup.setClient('hasChild',true);
                    }
                    _subGroup.setClient('portNo',_subItem.portNo);
                    _subGroup.setParent(_group);
                    me.box3.add(_subGroup);

                    if(_subItem.list.length > 0){//第三层
                      for(let j in _subItem.list) {
                        let _thirdGroup = '_thirdGroup' + j;
                        let _thirdItem = _subItem.list[j];
                        _thirdGroup = new twaver.SubNetwork({
                          id: _thirdItem.portId+i,
                          name: '端口：' + _thirdItem.code,
                          icon: './static/images/msap-2.png',
                        });
                        _thirdGroup.setClient('portNo', _thirdItem.portNo);
                        _thirdGroup.setParent(_subGroup);
                        me.box3.add(_thirdGroup);
                      }
                    }
                  }
              }
              me.getExpandImg();
            }else{
              me.$Modal.warning({
                title: '温馨提示：',
                content: '暂无端口数据...',
                className:'vertical-center-modal'
              });
              me.showPortInfo = false;
            }
          })
          .catch(function (error) {
            console.log(error);
            me.showPortInfo = false;
          }).finally(function(){
          // me.spinShow=false;
        });
      },
      closePort(){
          let me = this;
          me.showPortInfo = false;
      }
    },
    mounted(){
      let me = this;
      let _params = me.$route.query;
      me.init(_params);
    }
}
</script>
