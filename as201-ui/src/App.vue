<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  import {
    mapState as mapProtocolsState
  } from "vuex";
  import {
    getDoorState
  } from "@/api/run";
  export default {
    name: "App",
    computed: {
      ...mapProtocolsState("protocols", [
        "protocalInfo",
        "pathName",
        "initPathName"
      ])
    },
    mounted() {

      // this.screenScale(document.getElementById('app'));
      // window.onresize=()=>{        //   // console.log('浏览器大小变化')        //   this.screenScale(document.getElementById('app'));
      //
      this.screenScale(document.getElementsByTagName('body')[0]);
      window.onresize = () => {
        // console.log('浏览器大小变化')
        this.screenScale(document.getElementsByTagName('body')[0]);
      }
    },
    watch: {
      $route(to, from) {
        if (to.path === "/system/run" || to.path === "/system/list") {
          this.getDoorState();
          this.$store.commit("protocols/clearRecord", []);
        } else if (to.path === "/system/run/protocols/viewrunstep") {
          this.$store.commit("protocols/clearRecord", []);
          this.$store.commit("protocols/updatedInitPathName", this.pathName);
        }
      },
      '$store.getters.languageCode': {
        immediate: true,
        handler(newval, oldval) {
          if (newval == 1) {
            this.$i18n.locale = 'en-US'
          } else if (newval == 0) {
            this.$i18n.locale = 'zh-CN'
          }
        }
      }
    },
    methods: {
      screenScale(element) {
        let width = '1920';
        let height = '1200';
        let offsetWidth = window.innerWidth;
        let offsetHeight = window.innerHeight;
        let top = 0;
        let left = 0;
        let scaleX = offsetWidth / width;
        let scaleY = offsetHeight / height;
        // let scale = Math.min(scaleX, scaleY);
        let transform = '';
        top = (offsetHeight - height) / 2;
        left = (offsetWidth - width) / 2;
        //核心代码
        transform = `translate(${left}px, ${top}px) scaleX(${scaleX}) scaleY(${scaleY})`;
        element.style.width = width + 'px';
        element.style.height = height + 'px';
        element.style.transformOrigin = 'center center';
        element.style.transform = transform;
        element.parentElement.width = offsetWidth + 'px';
        element.parentElement.style.height = offsetHeight + 'px';
      },
      async getDoorState() {
        const {
          data
        } = await getDoorState();
        this.$store.commit("protocols/updatedDoorState", data);
      }
    }
  };
</script>

<style>
  @import "./style/base.css";

  #app {
    font-family: "ArialMT", "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

* {
  padding: 0;
  margin: 0;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  touch-action: none;
}

  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #e8eef3 !important;
    border: 1px solid #dcdcdc;
  }

  *::-webkit-scrollbar-track {
    background: #ffffff;
  }

  .el-table__header thead>tr {
    background-color: #4c7cb2;
  }

.el-table__header thead > tr .gutter {
  background-color: transparent;
  border-bottom: 1px solid #ebeef5;
  border-bottom-width: 1px !important;
}

body {
  padding: 0 !important;
}
</style>
