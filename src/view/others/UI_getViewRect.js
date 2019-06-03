import Vue from 'vue'

var box = new twaver.ElementBox();
var network = new twaver.vector.Network(box);

function initNetwork() {
  var view = network.getView();
  network.adjustBounds({ x: 0, y: 20, width: 200, height: 200 });

//   var Profile = Vue.extend({
//     template: "<div>{{firstName}}</div>",
//     data: function() {
//       return {
//         firstName: view.toString(),
//         lastName: "White",
//         alias: "Heisenberg"
//       };
//     }
//   });
//   console.log(new Profile());
//   new Profile().$mount("#network");
  //  document.getElementById("network").appendChild(view);

  setTimeout(function() {
    console.log(network.getElementUI(node2).getViewRect());
    network.makeVisible(node2);
  });
}
var node2;
function initData() {
  var node1 = new twaver.Node({
    name: "from",
    location: { x: 100, y: 100 }
  });
  box.add(node1);

  node2 = new twaver.Node({
    name: "to",
    location: { x: 300, y: 100 }
  });
  box.add(node2);
  var link = new twaver.Link(node1, node2);
  box.add(link);
}

function theData() {
  initData();
  initNetwork();
};
theData();


// 获得最终显示的 dom 
console.log(network.getView())
//想用组件的方式把这个 dom 变为一个模块 这样就不用 appendChild
  Vue.component('mynetWork',
    '<p>qqq</p>',

  
  )


export default network.getView()