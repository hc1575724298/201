<template>
  <div style="width: 488px;">
    <div class="temperature-option-name">
      {{ $t("language.temperature")}}({{degree}}°C)
    </div>
    <div class="adj-sv">
      <div class="sv">SV</div>
      <div class="adj">ADJ</div>
    </div>
    <div class="temperature-info-div">
      <div v-for="(item,index) in temperature_options" class="temperature-info" :key="index">
        <div class="adj-info">{{type}}{{item.description}}</div>
        <div class="sv-info">{{item.value}}</div>
        <input
         @focus="onfocusNum(item.adj_value,$event)"
         class="adj-input"
         v-model="item.adj_value"
         @blur="dealTem(index)"
         onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))"/>
      </div>
    </div>
    <div class="start-cali" @click="startCali()"
      :class="{'unselected':$store.getters.temOption!=notifyObj.running&&$store.getters.isNotify}">
      <div v-if="type+degree!=notifyObj.running">{{$t("language.start_cali")}}</div>
      <div v-else>{{$t("language.stop_cali")}}</div>
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
  import {
    testCali
  } from '@/api/setting.js'
  import {
    stopCali
  } from '@/api/setting.js'
  export default {
    props: ['degree', 'type'],
    components: { NumberKeyboard },
    mixins:[MixinNumberKeyboard],
    data() {
      return {
        temperature_options: [{
          id: 1,
          description: "(1-8):",
          value: '--',
          adj_value: null
        }, {
          id: 2,
          description: "(9-16):",
          value: '--',
          adj_value: null
        }, {
          id: 3,
          description: "(17-24):",
          value: '--',
          adj_value: null
        }],
        start_stop: false,
        notifyObj: {
          running: null
        },
      }
    },
    watch: {
      'temperature_options': {
        deep: true,
        handler(newval, oldval) {
          var setting = JSON.parse(JSON.stringify(this.$store.getters.setting))
          for (var i = 0; i < this.$store.getters.setting.temperature_calibration.length; i++) {
            if ((this.type + this.degree) == (this.$store.getters.setting.temperature_calibration[i].position + this
                .$store.getters.setting.temperature_calibration[i].temperature)) {
              for (var j = 0; j < newval.length; j++) {
                setting.temperature_calibration[i].adj_info['adj' + (j + 1)] = newval[j].adj_value;
              }
            }
          }
          this.$store.commit('setSetting', setting)
        }
      }
    },
    mounted() {
      this.getTemData()
      this.EventBus.on(this.Notify.CODE_START_TEMPERATURE_CALIBRATION, (notify) => {
        if ((this.type + this.degree) == (notify.Data.position + notify.Data.temperature)) {
          this.temperature_options[0].value = notify.Data.sv1;
          this.temperature_options[1].value = notify.Data.sv2
          this.temperature_options[2].value = notify.Data.sv3
          this.notifyObj.running = notify.Data.position + notify.Data.temperature;
        }
        this.$emit('getTemperature', this.temperature_options, this.degree, this.type)
      })
    },
    methods: {
      dealTem(index) {
        if (this.temperature_options[index].adj_value < Number(this.temperature_options[index].value) - 5) {
          this.temperature_options[index].adj_value = Number(this.temperature_options[index].value - 5).toFixed(1)
        }else if(this.temperature_options[index].adj_value > Number(this.temperature_options[index].value) + 5){
          this.temperature_options[index].adj_value = Number(this.temperature_options[index].value + 5).toFixed(1)
        }else{
          this.temperature_options[index].adj_value = Number(this.temperature_options[index].adj_value).toFixed(1)
        }
        this.isShowNumberKeyboard = false
      },
      startCali() {
         var adjInputs= document.getElementsByClassName("adj-input")
        if (this.$store.getters.temOption != this.notifyObj.running && this.$store.getters.isNotify) {
          return
        }
        if (this.type + this.degree == this.notifyObj.running) {
          stopCali().then((res) => {
            this.notifyObj.running = null
            this.$store.commit('setIsNotify', false)
          })
          for(var i=0;i<adjInputs.length;i++){
            adjInputs[i].disabled=false
            adjInputs[i].style.color="#333333"
          }
        } else {
          for(var i=0;i<adjInputs.length;i++){
            adjInputs[i].disabled="disabled"
              adjInputs[i].style.color="#c2cbda"
          }
          testCali({
            'position': this.type,
            'temperature': this.degree
          }).then((res) => {
            this.notifyObj.running = this.type + this.degree;
            this.$store.commit('setTemOption', this.type + this.degree)
            this.$store.commit('setIsNotify', true)
          })
        }
      },
      getTemData() {
        for (var i = 0; i < this.$store.getters.setting.temperature_calibration.length; i++) {
          if ((this.type + this.degree) == (this.$store.getters.setting.temperature_calibration[i].position + this
              .$store
              .getters.setting.temperature_calibration[i].temperature)) {
            this.temperature_options[0].adj_value = Number(this.$store.getters.setting.temperature_calibration[i]
              .adj_info.adj1).toFixed(1);
            this.temperature_options[1].adj_value = Number(this.$store.getters.setting.temperature_calibration[i]
              .adj_info.adj2).toFixed(1)
            this.temperature_options[2].adj_value = Number(this.$store.getters.setting.temperature_calibration[i]
              .adj_info.adj3).toFixed(1)
          }
        }
        if (this.degree == '40' && this.type == "T1") {
          this.temperature_options[0].value = this.$store.getters.temperatureSv[0].value
          this.temperature_options[1].value = this.$store.getters.temperatureSv[1].value
          this.temperature_options[2].value = this.$store.getters.temperatureSv[2].value
        } else if (this.degree == '100' && this.type == "T1") {
          this.temperature_options[0].value = this.$store.getters.temperatureSv[3].value
          this.temperature_options[1].value = this.$store.getters.temperatureSv[4].value
          this.temperature_options[2].value = this.$store.getters.temperatureSv[5].value
        } else if (this.degree == '120' && this.type == "T1") {
          this.temperature_options[0].value = this.$store.getters.temperatureSv[6].value
          this.temperature_options[1].value = this.$store.getters.temperatureSv[7].value
          this.temperature_options[2].value = this.$store.getters.temperatureSv[8].value
        } else if (this.degree == '40' && this.type == "T2") {
          this.temperature_options[0].value = this.$store.getters.temperatureSv[9].value
          this.temperature_options[1].value = this.$store.getters.temperatureSv[10].value
          this.temperature_options[2].value = this.$store.getters.temperatureSv[11].value
        } else if (this.degree == '100' && this.type == "T2") {
          this.temperature_options[0].value = this.$store.getters.temperatureSv[12].value
          this.temperature_options[1].value = this.$store.getters.temperatureSv[13].value
          this.temperature_options[2].value = this.$store.getters.temperatureSv[14].value
        } else if (this.degree == '120' && this.type == "T2") {
          this.temperature_options[0].value = this.$store.getters.temperatureSv[15].value
          this.temperature_options[1].value = this.$store.getters.temperatureSv[16].value
          this.temperature_options[2].value = this.$store.getters.temperatureSv[17].value
        }
      },
      onChangeNum (input) {
      this.onchangeCount++;
      let inputNew = input.replace(/[^\d.\d]/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.');
      this.inputValue(inputNew)
    },
    },
    destroyed() {}
  }
</script>

<style scoped="scoped">
.searchKeyboard {
  transform: scale(.9);
  bottom: 0 !important;
}
  .temperature-option-name {
    font-size: 26px;
    margin-left: 30px;
  }

  .adj-sv {
    font-size: 26px;
    width: 100%;
    margin-top: 70px;
  }

  .adj {
    width: 160px;
    float: right;
    text-align: center;
    margin-left: 151px;
    margin-right: 30px;
  }

  .sv {
    width: 100px;
    height: 100%;
    margin-right: 20px;
    text-align: center;
    float: right;
  }

  .temperature-info-div {
    float: left;
    height: fit-content;
    width: 100%;
    margin-top: 40px;
    font-size: 26px;
  }

  .temperature-info:nth-child(1) {
    margin-top: 0;
  }

  .temperature-info {
    height: 55px;
    width: 100%;
    line-height: 55px;
    margin-top: 60px;
  }

  .adj-info {
    float: left;
    margin-left: 41px;
  }

  .adj-input {
    width: 160px;
    height: 100%;
    float: right;
    background-color: #ffffff;
    font-size: 24px;
    text-align: center;
    border-radius: 4px;
    margin-right: 30px;
    box-sizing: border-box;
    border: solid 1px #c2cbda;
  }

  .sv-info {
    float: right;
    width: 100px;
    height: 100%;
    margin-right: 20px;
    text-align: center;
  }

  .start-cali {
    float: left;
    margin-top: 77px;
    margin-left: 144px;
    width: 200px;
    height: 60px;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    font-size: 24px;
    text-align: center;
    line-height: 60px;
    color: #4c7cb2;
  }

  .unselected {
    background-color: #c8c8c8;
    color: white;
  }
</style>
