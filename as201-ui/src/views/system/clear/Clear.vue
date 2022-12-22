<template>
  <div>
    <div class="clear-info">
      <div class="clear-info-title">
        <div class="clear-info-title-icon"></div>
        <div class="clear-info-title-text">{{$t("language.clear_title")}}</div>
      </div>
      <div class="clear-time">
        <div class="clear-time-text">{{$t("language.clear_time_text")}}</div>
          <div class="clear-hours">
            <input
              @focus="onfocusNum(interval_set.hours, $event)"
              class="clear-hours-input"
              v-model="interval_set.hours"
              @blur="inputOnBlur($event,'hour')"
              oninput="if(value>23)value=23" />
          </div>
          <div class="clear-icon">:</div>
          <div class="clear-minutes">
            <input
              @focus="onfocusNum(interval_set.minutes, $event)"
              class="clear-minutes-input"
              oninput="if(value>59)value=59"
              v-model="interval_set.minutes"
              @blur="inputOnBlur($event,'minute')" />
          </div>
      </div>
    </div>
    <div class="clear-tube">
      <div class="clear-tube-serial">
        <div v-for="(item,index) in tube_lists" :key="index"
          :class="{'tube-serial-first':item.id==1,'tube-serial-seventh':item.id==7
        ,'tube-serial-A':item.id==8,'tube-serial-B':item.id==9,'tube-serial-C':item.id==10,'tube-serial-D':item.id==11}">
          {{item.serial}}
        </div>
      </div>
      <div v-for="(item,index) in tube_icons" :key="index" class="one-tube"
        :class="{'one-tube-first':item.id==1,'one-tube-other':item.id==9||item.id==17}">
        <div class="tube-square">
          <div class="tube-circle" style="margin-top: 97px;"></div>
          <div class="tube-circle" style="margin-top: 86px;"></div>
          <div class="tube-circle" ></div>
          <div class="tube-circle"></div>
          <div class="tube-circle"></div>
          <div class="tube-circle"></div>
          <div class="tube-circle" style="margin-top: 15px;"></div>
        </div>
        <div class="tube-first-circle"></div>
        <div class="tube-second-circle"></div>
        <div class="tube-third-circle"></div>
        <div style="margin-left: -3px;"><img src="../../../images/setting/tubeDE.png"></div>
      </div>
    </div>
    <Interval v-if="interval_status" @intervalEnd="intervalEnd()" :interval="interval_set"></Interval>
    <IntervalStart v-if="interval_start_status" @startInterval="startInterval()" :intervalTime = "interval_set.hours*3600+interval_set.minutes*60"></IntervalStart>
    <div class="clear-warn-model" v-if="warning_stauts">
      <div class="clear-warn-div">
        <div class="clear-warning-img">
          <img src="../../../images/setting/sug.png" />
        </div>
        <div class="clear-warning-text">
          {{$t("language.clear_warning")}}
        </div>
      </div>
      <div class="warning-button">
        <div class="ok-button" @click="closeWarning">
          {{$t("language.ok")}}
        </div>
      </div>
    </div>

    <!-- 键盘 -->
    <NumberKeyboard
      class="searchKeyboard"
      v-if="isShowNumberKeyboard"
      :input="input"
      @onChange="onChangeNum"
      @onKeyPress="onKeyPressNum"
      @colseKeyboard="colseKeyboardNum"
      @mousedown.native="$event.preventDefault();"
    />
  </div>
</template>

<script>
  import NumberKeyboard from "@/components/NumberKeyboard.vue";
  import MixinNumberKeyboard from "@/mixins/numberkeyboard.js";
  import Interval from "@/components/Interval"
  import IntervalStart from "@/components/IntervalStart"
  import {
    searchSetting
  } from '@/api/setting.js'
  export default {
    components: {
      Interval,
      IntervalStart,
      NumberKeyboard
    },
    mixins:[MixinNumberKeyboard],
    data() {
      return {
        interval_status: false,
        interval_start_status: true,
        remain_time: null,
        interval_set: {
          hours: '00',
          minutes: '15'
        },
        tube_lists: [{
          id: 1,
          serial: 1
        }, {
          id: 2,
          serial: 2
        }, {
          id: 3,
          serial: 3
        }, {
          id: 4,
          serial: 4
        }, {
          id: 5,
          serial: 5
        }, {
          id: 6,
          serial: 6
        }, {
          id: 7,
          serial: 7
        }, {
          id: 8,
          serial: "A"
        }, {
          id: 9,
          serial: "B"
        }, {
          id: 10,
          serial: "C"
        }, {
          id: 11,
          serial: "D"
        }, {
          id: 12,
          serial: "E"
        }],
        tube_icons: [{
          id: 1
        }, {
          id: 2
        }, {
          id: 3
        }, {
          id: 4
        }, {
          id: 5
        }, {
          id: 6
        }, {
          id: 7
        }, {
          id: 8
        }, {
          id: 9
        }, {
          id: 10
        }, {
          id: 11
        }, {
          id: 12
        }, {
          id: 13
        }, {
          id: 14
        }, {
          id: 15
        }, {
          id: 16
        }, {
          id: 17
        }, {
          id: 18
        }, {
          id: 19
        }, {
          id: 20
        }, {
          id: 21
        }, {
          id: 22
        }, {
          id: 23
        }, {
          id: 24
        }],
        warning_stauts: false
      }
    },
    mounted() {
      this.getWarning()
    },
    methods: {
      startInterval() {
        this.interval_start_status = false;
        this.interval_status = true;
      },
      intervalEnd() {
        this.interval_status = false;
        this.interval_start_status = true;
        this.interval_set= {
          hours: '00',
          minutes: '15'
        }
      },
      inputOnBlur(event, type) {
        let objRegExp1 = /^[0-9]\d*$/;
        let value = event.target.value;
        this.isShowNumberKeyboard = false;
        if (type == "hour") {
          if (!objRegExp1.test(this.interval_set.hours)) {
            return this.interval_set.hours = '00';
          }
          if (this.interval_set.hours == '' || this.interval_set.hours == 0) {
            return this.interval_set.hours = '00';
          }
          if (this.interval_set.hours < 10 && this.interval_set.hours > 0) {
            this.interval_set.hours = '0' + this.interval_set.hours;
          } else if (this.interval_set.hours >= 10 && this.interval_set.hours <= 23) {
            this.interval_set.hours = Number(this.interval_set.hours);
          }
        }
        if (type == "minute") {
          if (!objRegExp1.test(this.interval_set.minutes)) {
            return this.interval_set.minutes = '15';
          }
          if (this.interval_set.minutes == '' || this.interval_set.minutes == 0) {
            return this.interval_set.minutes = '15';
          }
          if (this.interval_set.minutes < 10 && this.interval_set.minutes > 0) {
            this.interval_set.minutes = '0' + this.interval_set.minutes;
          } else if (this.interval_set.minutes >= 10 && this.interval_set.minutes <= 59) {
            this.interval_set.minutes = Number(this.interval_set.minutes);
          }
        }

      },
      closeWarning() {
        this.warning_stauts = false
      },
      getWarning() {
        searchSetting().then((res) => {
          if (res.data.uv_remain_time >= res.data.uv_life_time && res.data.uv_alarm == 1) {
            this.warning_stauts = true
          }
        })
      }
    },

  }
</script>

<style scoped="scoped">
.searchKeyboard {
  left: 1087px !important;
  bottom: 530px !important;
  z-index: 1111;
  transform: scale(.85);
}
  .clear-info {
    width: 1682px;
    margin-top: 25px;
    margin-left: 34px;
    height: 59px;
  }

  .clear-info-title {
    float: left;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 28px;
    color: black;
  }

  .clear-info-title-icon {
    width: 5px;
    height: 28px;
    background-color: #4C7CB2;
  }

  .clear-info-title-text {
    margin-left: 20px;
  }

  .clear-time {
    display: flex;
    float: right;
    height: 100%;
    font-size: 22px;
    align-items: center;
    text-align: center;
  }

  .clear-time-text {
    line-height: 59px;
  }

  .clear-hours,
  .clear-minutes {
    width: 79px;
    height: 59px;
    font-size: 25px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
  }

  .clear-icon {
    font-size: 23px;
    width: 23px;
    height: 31px;
    font-weight: 600;
  }

  .clear-hours-input,
  .clear-minutes-input {
    height: 100%;
    width: 100%;
    padding: 0;
    border: none;
    text-align: center;
  }

  .clear-tube {
    width: 1569px;
    height: 882px;
    display: flex;
    border-radius: 4px;
    border: dashed 1px #688197;
    margin-top: 68px;
    margin-left: 90px;
  }

  .clear-tube-serial {
    width: 73px;
    height: 100%;
    font-size: 26px;
    text-align: center;
    border-right: 1px solid #9298a2;
  }

  .tube-serial-first {
    height: fit-content;
    width: 100%;
    margin-top: 147px;
    margin-bottom: 85px;
    font-size: 26px;
  }

  .tube-serial-seventh {
    margin-top: 22px;
    margin-bottom: 65px;
  }

  .tube-serial-A {
    margin-bottom: 39px;
  }

  .tube-serial-B {
    margin-bottom: 43px;
  }

  .tube-serial-C {
    margin-bottom: 48px;
  }

  .tube-serial-D {
    margin-bottom: 16px;
  }

  .one-tube {
    width: 42px;
    height: 100%;
    margin-left: 14px;
  }

  .one-tube-first {
    margin-left: 50px;
  }

  .one-tube-other {
    margin-left: 53px;
  }

  .tube-square {
    width: 100%;
    height: 449px;
    border-radius: 2px;
    border: solid 1px #688197;
    box-sizing: border-box;
    margin-top: 46px;
    margin-bottom: 36px;
  }

  .tube-first-circle {
    width: 34px;
    height: 34px;
    margin-left: 4px;
    border-radius: 17px;
    border: solid 1px #688197;
    margin-bottom: 36px;
  }

  .tube-circle {
    width: 30px;
    height: 30px;
    margin-left: 4px;
    border-radius: 17px;
    border: solid 1px #688197;
  }

  .tube-second-circle {
    width: 34px;
    height: 34px;
    margin-left: 4px;
    border-radius: 17px;
    border: solid 1px #688197;
    margin-bottom: 36px;
  }

  .tube-third-circle {
    width: 100%;
    height: 42px;
    border-radius: 21px;
    border: solid 1px #688197;
    margin-bottom: 36px;
  }

  .tube-fourth-circle {
    width: 100%;
    height: 88px;
    border-radius: 18px;
    border: solid 1px #688197;
  }

  .clear-warn-model {
    position: absolute;
    top: 485px;
    left: 700px;
    z-index: 1000;
    width: 666px;
    height: 356px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .clear-warn-div {
    margin-left: 120px;
    margin-top: 100px;
    width: 420px;
    height: 86px;
  }

  .clear-warning-text {
    font-size: 26px;
  }

  .clear-warning-img {
    float: left;
    margin-right: 30px;
  }

  .clear-warning-text {
    float: left;
    width: 300px;
    line-height: 43px;
    height: 100%;
  }

  .warning-button {
    width: 100%;
    height: 64px;
    margin-top: 60px;
    display: flex;
    justify-content: center;
  }

  .ok-button {
    width: 200px;
    height: 100%;
    text-align: center;
    line-height: 64px;
    background-color: #4E81BB;
    color: white;
    font-size: 26px;
    border-radius: 6px;
  }
</style>
