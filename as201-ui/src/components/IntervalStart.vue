<template>
  <div class="interval-start-model">
    <div class="interval">
      <div class="interval-out-circle">
      </div>
      <div class="interval-white-circle">
      </div>
      <div class="interval-in-circle" @click="startInterval">
        {{$t("language.Interval_start")}}
      </div>
    </div>
  </div>
</template>

<script>
import { openUV } from "@/api/run"
  export default {
    props:{
      intervalTime:{
      type: Number,
      default: 0
      }
    },
    data() {
      return {

      }
    },
    mounted() {
    },
    methods: {
      async startInterval() {
        await openUV(this.intervalTime)
        this.$emit("startInterval")
      }
    }
  }
</script>

<style scoped="scoped">
  .interval-start-model {
    position: absolute;
    display: flex;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    width: 1682px;
    height: 968px;
    bottom: 30px;
    right: 34px;
    background-color: rgba(70, 70, 70, 0.5);
  }

  .interval {
    position: relative;
    width: 254px;
    height: 254px;
  }

  .interval-out-circle {
    width: 254px;
    height: 254px;
    border-radius: 127px;
    position: absolute;
    background-color: #E6EBF3;
  }

  .interval-white-circle {
    width: 212px;
    height: 212px;
    border-radius: 106px;
    position: absolute;
    top: 21px;
    left: 21px;
    background-color: white;
  }

  .interval-in-circle {
    width: 184px;
    height: 184px;
    position: absolute;
    top: 35px;
    left: 35px;
    border-radius: 92px;
    line-height: 184px;
    text-align: center;
    font-size: 32px;
    color: white;
    background-color: #538BCB;
  }
</style>
