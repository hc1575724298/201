<template>
  <div class="head-right">
    <div class="right-img">
      <img src="../images/system/light.png" class="light" @click="changeLight(1)" v-if="$store.getters.lightstatus==1">
      <img src="../images/system/unlight.png" class="light" @click="changeLight(0)"
        v-if="$store.getters.lightstatus==0">
    </div>
    <div class="line"></div>
    <div class="system-time">{{$store.getters.systemTime}}</div>
  </div>
</template>

<script>
  import moment from "moment"
  import {
    getSystemTime
  } from '@/api/setting.js'
  import {
    closeLight
  } from '@/api/system.js'
  import {
    openLight
  } from '@/api/system.js'
  export default {
    data() {
      return {
        time: "",
        timer: null
      }

    },
    mounted() {
      this.EventBus.on(this.Notify.CODE_SYSTEM_TIME, (notify) => {
        this.time = moment(notify.Data * 1000).format('MM/DD/YYYY HH:mm:ss');
        this.$store.commit('setSystemTime', this.time)
      })
    },
    methods: {
      changeLight(type) {
        if (type == 1) {
          closeLight().then((res) => {
            if (res.code == 0) {
              this.$store.commit('setLightstatus', 0)
            }
          })
        } else if (type == 0) {
          openLight().then((res) => {
            if (res.code == 0) {
              this.$store.commit('setLightstatus', 1)
            }
          })
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .head-right {
    float: right;
    height: 90px;
    align-items: center;
    width: fit-content;
    flex-shrink: 0;
  }

  .right-img {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 79px;
    float: right;
  }

  .light {
    width: 27px;
    flex-shrink: 0;
    height: 40px;
  }

  .system-time {
    height: 100%;
    line-height: 90px;
    width: 239px;
    font-size: 26px;
    margin-right: 30px;
    float: right;
    color: white;
  }

  .line {
    float: right;
    height: 30px;
    margin-top: 30px;
    width: 4px;
    background-color: #C2CBDA;
  }
</style>
