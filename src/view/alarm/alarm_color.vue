<template>
  <div class="warp">
    <div id="network"></div>
  </div>
</template>

<script>
import { constants } from "fs";
class AlarmColor {
  constructor(container) {
    this.box = new twaver.ElementBox();
    this.network = new twaver.vector.Network(this.box);
    this.container = document.getElementById(container);
  }
  init() {
    this.initData();
    this.initNetwork();
  }
  initNetwork() {
    this.view = this.network.getView();
    this.network.adjustBounds({ x: 100, y: 100, width: 500, height: 300 });
    this.container.appendChild(this.view);

    let that = this;
    //改变网元告警颜色
    this.network.getInnerColor = function(data) {
      //判断是否为网元
      if (data.IElement) {
        var severity = data.getAlarmState().getHighestNativeAlarmSeverity();
        // console.log(severity)
        if (severity) {
          //设置边框颜色
          that.node2.s("outer.color", "green");
        }
        return data.getStyle("inner.color"); //返回本来颜色
      }
      return null;
    };
  }
  initData() {
    let node1 = new twaver.Node({
      name: "from",
      location: { x: 100, y: 100 }
    });
    this.box.add(node1);

    let node2 = new twaver.Node({
      name: "to",
      location: { x: 300, y: 100 }
    });

    this.node2 = node2;
    this.box.add(node2);
    let link = new twaver.Link(node1, node2);
    this.box.add(link);
    //告警盒子
    this.alarmBox = this.box.getAlarmBox();

    this.addAlarm("alarm 1", node1.getId(), twaver.AlarmSeverity.CRITICAL);

    this.addAlarm("alarm 2", node2.getId(), twaver.AlarmSeverity.CRITICAL);
  }
  addAlarm(alarmID, elementID, alarmSeverity) {
    //告警id ‘str’ ， 告警元素id，alarm级别，
    var alarm = new twaver.Alarm(alarmID, elementID, alarmSeverity);
    this.alarmBox.add(alarm);
  }
}

export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let alarmColor = new AlarmColor("network");
      alarmColor.init();
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