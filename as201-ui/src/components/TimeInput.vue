<template>
  <div class="time-change-model">
    <div :class="['time-change-div',isShowNumberKeyboard? 'move-top':'']">
      <div class="time-change-title">
        <div class="time-change-title-text">
          {{ $t("language.time") }}
        </div>
      </div>
      <div class="date-model">
        <div class="date-text">{{ $t("language.date") }}</div>
        <div
          :class="{ 'hour-minute-second': $store.getters.languageCode == 0 }"
        >
          <input
            @focus="onfocusNum(month,$event)"
            type="text"
            style="margin-right: 5px;"
            v-model="month"
            @blur="check('month')"
          />:<input
            @focus="onfocusNum(day,$event)"
            type="text"
            style="margin-left: 5px;margin-right: 5px;"
            v-model="day"
            @blur="check('day')"
          />:<input
            @focus="onfocusNum(year,$event)"
            type="text"
            style="margin-left:5px;"
            v-model="year"
            @blur="check('year')"
          />
        </div>
      </div>
      <div class="date-model" style="margin-top: 31px;margin-bottom: 40px;">
        <div class="date-text" style="margin-right: 13px;">
          {{ $t("language.timeInput") }}
        </div>
        <div
          :class="{ 'hour-minute-second': $store.getters.languageCode == 0 }"
        >
          <input
            @focus="onfocusNum(hour,$event)"
            type="text"
            style="margin-right: 5px;"
            v-model="hour"
            min="1"
            max="23"
            @blur="check('hour')"
          />:<input
            @focus="onfocusNum(minute,$event)"
            type="text"
            style="margin-left: 5px;margin-right: 5px;"
            v-model="minute"
            @blur="check('minute')"
          />:<input
            @focus="onfocusNum(seconds,$event)"
            type="text"
            style="margin-left:5px;"
            v-model="seconds"
            @blur="check('seconds')"
          />
        </div>
      </div>
      <div class="buttons">
        <div class="cancel" @click="backToParent()">
          {{ $t("language.cancel") }}
        </div>
        <div class="ok" @click="changeTimeOk()">{{ $t("language.ok") }}</div>
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
import { updateSystem } from "@/api/setting.js";
export default {
  data() {
    return {
      year: null,
      month: null,
      day: null,
      hour: null,
      minute: null,
      seconds: null,
    };
  },
  components: { NumberKeyboard },
  mixins:[MixinNumberKeyboard],
  mounted() {},
  methods: {
    backToParent() {
      this.$emit("backTime");
    },
    changeTimeOk() {
      if (
        this.year == null ||
        this.month == null ||
        this.day == null ||
        this.hour == null ||
        this.minute == null ||
        this.seconds == null
      ) {
        if(this.$store.getters.languageCode==0){
          this.$message.error("不能为空");
        }else{
          this.$message.error("Cannot Be Null");
        }
      } else {
        if (
          (this.year % 4 == 0 && this.year % 100 != 0) ||
          this.year % 400 == 0
        ) {
          if (this.month == 2) {
            if (this.day > 29) {
              if(this.$store.getters.languageCode==0){
                return this.$message.error("日期格式有误");
              }else{
                return this.$message.error("Date Error");
              }
            }
          }
        } else {
          if (this.day > 28) {
            if(this.$store.getters.languageCode==0){
              return this.$message.error("日期格式有误");
            }else{
              return this.$message.error("Date Error");
            }
          }
        }
        if (
          this.month == 4 ||
          this.month == 6 ||
          this.month == 9 ||
          this.month == 11
        ) {
          if (this.day > 31) {
            if(this.$store.getters.languageCode==0){
              return this.$message.error("日期格式有误");
            }else{
              return this.$message.error("Date Error");
            }
          }
        }
        let timeString =
          "" +
          this.year +
          "-" +
          this.month +
          "-" +
          this.day +
          " " +
          this.hour +
          ":" +
          this.minute +
          ":" +
          this.seconds;
        let time_stamp = Number(new Date(timeString));
        updateSystem({
          system_time: time_stamp
            .toString()
            .substring(0, time_stamp.toString().length - 3)
        }).then(res => {
          this.$store.commit("setSystemTime", res.data);
        });
        this.$emit("backTime");
      }
    },
    check(type) {
      let objRegExp1 = /^[0-9]\d*$/;
      if (type == "month") {
        if (!objRegExp1.test(this.month)) {
          return (this.month = null);
        }
        if (this.month == 0) {
          return (this.month = null);
        }
        if (this.month < 10 && this.month >= 1) {
          this.month = "0" + Number(this.month);
        } else if (this.month >= 10 && this.month <= 12) {
          this.month = Number(this.month);
        } else if (this.month > 12) {
          this.month = 12;
        }
      } else if (type == "day") {
        if (!objRegExp1.test(this.day)) {
          return (this.day = null);
        }
        if (this.day == 0) {
          return (this.day = null);
        }
        if (this.day < 10 && this.day >= 1) {
          this.day = "0" + Number(this.day);
        } else if (this.day >= 10 && this.day <= 31) {
          this.day = Number(this.day);
        } else if (this.day > 31) {
          this.day = 31;
        }
      } else if (type == "year") {
        if (!objRegExp1.test(this.year)) {
          return (this.year = null);
        }
        if (this.year == 0) {
          return (this.year = null);
        }
        if (this.year.toString().length > 4) {
          return (this.year = null);
        }
      } else if (type == "hour") {
        if (!objRegExp1.test(this.hour)) {
          return (this.hour = null);
        }
        if (this.hour == "") {
          return (this.hour = null);
        }
        if (this.hour.toString().length > 2) {
          return (this.hour = null);
        }
        if (this.hour < 10 && this.hour >= 0) {
          this.hour = "0" + this.hour;
        } else if (this.hour >= 10 && this.hour <= 23) {
          this.hour = Number(this.hour);
        } else if (this.hour > 23) {
          this.hour = 23;
        }
      } else if (type == "minute") {
        if (!objRegExp1.test(this.minute)) {
          return (this.minute = null);
        }
        if (this.minute == "") {
          return (this.minute = null);
        }
        if (this.minute.toString().length > 2) {
          return (this.minute = null);
        }
        if (this.minute < 10) {
          this.minute = "0" + this.minute;
        } else if (this.minute >= 10 && this.minute <= 59) {
          this.minute = Number(this.minute);
        } else if (this.minute > 59) {
          this.minute = 59;
        }
      } else if (type == "seconds") {
        if (!objRegExp1.test(this.seconds)) {
          return (this.seconds = null);
        }
        if (this.seconds == "") {
          return (this.seconds = null);
        }
        if (this.seconds.toString().length > 2) {
          return (this.seconds = null);
        }
        if (this.seconds < 10) {
          this.seconds = "0" + this.seconds;
        } else if (this.seconds >= 10 && this.seconds <= 59) {
          this.seconds = Number(this.seconds);
        } else if (this.seconds > 59) {
          this.seconds = 59;
        }
      }
    },
  }
};
</script>

<style scoped="scoped">
.move-top {
   top: 260px;
}
.time-change-model {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  z-index: 1000;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0%;
  left: 0%;
}

.time-change-div {
  position: absolute;
  width: 690px;
  height: 340px;
  background-color: #ffffff;
  border-radius: 10px;
}

.time-change-title {
  width: 95%;
  float: right;
  font-size: 25px;
  margin-bottom: 38px;
  height: 69px;
  color: #4473bc;
  border-bottom: 2pt solid #c2cbda;
}

.time-change-title-text {
  float: left;
  line-height: 69px;
}

.date {
  width: fit-content;
}

.date-model {
  position: relative;
  width: 100%;
  height: 42px;
  display: flex;
  align-items: center;
  font-size: 24px;
}

.date-text {
  margin-left: 69px;
  margin-right: 55px;
}

input {
  width: 96px;
  height: 42px;
  font-size: 22px;
  background-color: #ffffff;
  text-align: center;
  border-radius: 4px;
  border: solid 1px #999999;
}

.buttons {
  display: flex;
  position: absolute;
  /*    height: 80px; */
  width: fit-content;
  font-size: 18px;
  right: 0;
  bottom: 26px;
}

.cancel,
.ok {
  width: 150px;
  height: 50px;
  margin-right: 30px;
  line-height: 50px;
  flex-shrink: 0;
  border-radius: 8px;
  text-align: center;
}

.cancel {
  border: 2px solid #93ade2;
  color: black;
}

.ok {
  background-image: linear-gradient(to bottom, #588dcf, #4d7db4);
  color: white;
}
.hour-minute-second {
  position: absolute;
  left: 200px;
}
</style>
