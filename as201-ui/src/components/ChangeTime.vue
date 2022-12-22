<template>
  <div>
    <div class="language-div" @click="changSysTime()">
      {{$store.getters.systemTime}}
      <div class="system-time">
        <img src="../images/setting/more.png" />
      </div>
    </div>
    <TimeInput @backTime="time_input_status=false" v-if="time_input_status"></TimeInput>
  </div>
</template>

<script>
  import TimeInput from '@/components/TimeInput'
  export default {
    components: {
      TimeInput
    },
    data() {
      return {
        current_time: null,
        time_input_status: false
      }
    },
    mounted() {},
    methods: {
      changSysTime() {
        this.time_input_status = true;
      }
    }
  }
</script>

<style scoped="scoped">
  .language-div {
    width: 1466px;
    height: 90px;
    line-height: 90px;
    font-size: 26px;
    text-indent: 32px;
    background-color: white;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    margin-top: 30px;
    color: #333333;
    margin-left: 30px;
  }

  .system-time {
    display: flex;
    height: 100%;
    float: right;
    align-items: center;
    margin-right: 32px;
  }

  .system-time>img {
    float: right;
    align-items: center;
  }
</style>
