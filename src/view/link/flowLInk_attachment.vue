<template>
  <div class="warp">
    <div id="div"></div>
    <div id="network"></div>
  </div>
</template>

<script>
import LinkAttachment from './flowLink_attachment.js'
export default {
  data() {
    return {      
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      let linkAttachment = new LinkAttachment('network');
      linkAttachment.init();
    }
  }
};
</script>

<style scoped lang="scss">
//   @import '../styles/vars';
.warp {
  position: relative;
  height: 100%;

  #network {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
</style>






