<template>
  <div class="warp">
    <div id="btns"></div>
    <div id="network"></div>
  </div>
</template>

<script> 
 var box = new twaver.ElementBox();
    var network = new twaver.vector.Network(box);
    var toolbar = document.createElement("div");



    function initNetwork(container) {
      var networkPane = new twaver.controls.BorderPane(network, toolbar);
      networkPane.setTopHeight(25);
      var view = networkPane.getView();
      view.style.left = "0px";
      view.style.top = "0px";
      view.style.right = "0px";
      view.style.bottom = "0px";
      document.getElementById(container).appendChild(view);
      window.onresize = function() {
        networkPane.invalidate();
      };
    }

    function initBox() {
      var from = new twaver.Node();
      from.setName("From");
      from.setLocation(100, 100);
      box.add(from);
      var to = new twaver.Node();
      to.setName("To");
      to.setLocation(300, 300);
      box.add(to);
      var link = new twaver.Link(from, to);
      link.setName("Link");
      box.add(link);
    }

    function initToolbar() {
      addButton(toolbar, "自定义", null, function() {});
      addCheckBox(toolbar, "自定义", false, function() {});
      addSelect(toolbar)
    }

    function addButton(toolbar, label, src, handler) {
      var button = document.createElement("input");
      button.value = label;
      button.onclick = handler;
      button.setAttribute("type", src ? "image" : "button");
      if (src) {
        button.style.padding = "4px 4px 4px 4px";
        if (src.indexOf("/") < 0) {
          src = "../images/toolbar/" + src + ".png";
        }
        button.setAttribute("src", src);
      } else {
        button.value = label;
      }
      toolbar.appendChild(button);
    }

    function addCheckBox(div, name,checked, callback) {
      var checkBox = document.createElement("input");
      checkBox.id = name;
      checkBox.type = "checkbox";
      checkBox.style.padding = "4px 4px 4px 4px";
      checkBox.checked = checked;
      if (callback) checkBox.addEventListener("click", callback, false);
      div.appendChild(checkBox);
      var label = document.createElement("label");
      label.htmlFor = name;
      label.innerHTML = name;
      div.appendChild(label);
      return checkBox;
    }

    function addSelect(toolbar) {
      var select = document.createElement("select");
      var items = [
        "option1",
        "option2",
        "option3",
        "option4",
        "option5",
        "option6"
      ];
      items.forEach(function(item) {
        var option = document.createElement("option");
        option.appendChild(document.createTextNode(item));
        option.setAttribute("value", item);
        select.appendChild(option);
      });
      select.addEventListener(
        "change",
        function() {
         // code here..
        },
        false
      );
      toolbar.appendChild(select);
    }

    function addButton(div, name, src, callback) {
      var button = document.createElement("input");
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
      return button;
    }     
export default {
  mounted() {
      this.init();
  },
  methods: {
    init() {
       
      initToolbar();
      initNetwork('network');
      initBox();
    
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