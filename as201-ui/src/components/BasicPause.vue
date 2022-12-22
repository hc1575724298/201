<template>
  <div class="model" v-if="title_type==1">
    <div class="step-name">
      {{$t("language.step")}}:
      <input
        class="input-step-name"
        v-model="pause.step_name"
        @focus="onfocus(pause.step_name, $event)"
        @blur="saveData()"
        @input="pause.step_name=pause.step_name.replace(/[^\w\u4E00-\u9FA5_-]/g,'')"
        maxlength="15"
        />
    </div>
    <div class="step-name">
        {{$t("language.protocol_tips")}}:
        <input
          class="input-step-name"
          @focus="onfocusTip(pause.tips, $event)"
          @blur="saveData()"
          v-model="pause.tips"
          maxlength="16"/>
    </div>
    
    <!-- 键盘 name-->
    <SimpleKeyboard
      class="searchKeyboard"
      v-if="isShowKeyboard"
      :input="input"
      @onChange="onChangeName"
      @onKeyPress="onKeyPress"
      @colseKeyboard="colseKeyboard"
      @mousedown.native="$event.preventDefault();" />
   <!-- 键盘 tips-->
   <SimpleKeyboard
      class="searchKeyboard"
      v-if="isShowKeyboardTip"
      :input="input"
      @onChange="onChangeTip"
      @onKeyPress="onKeyPress"
      @colseKeyboard="colseKeyboardTip"
      @mousedown.native="$event.preventDefault();" />
  </div>
</template>

<script>
  import SimpleKeyboard from "@/components/SimpleKeyboard";
  import MixinKeyboard from '@/mixins/keyboard.js'
  export default {
    props: ['order', 'title_type'],
    components:{  SimpleKeyboard },
    mixins:[ MixinKeyboard ],
    data() {
      return {
        pause: {},
        isShowKeyboardTip: false,
      }
    },
    watch: {
      'order': {
        immediate: true,
        handler(newval, oldval) {
          this.getData()
        }
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      onfocusTip(val,e){
        this.isShowKeyboardTip = true;
      this.event = e;
      this.input = val
      },
      colseKeyboardTip () {
      this.isShowKeyboardTip = false;
      this.onchangeCount = 0;
    },
      onChangeName(input){
        this.onchangeCount++;
        let inputNew = input.replace(/[^\w\u4E00-\u9FA5_-]/g, '')
        if (input.length > 15) return
        this.inputValue(inputNew)
      },
      onChangeTip( input){
        this.onchangeCount++;
        if (input.length > 15) return
        this.inputValue(input)
      },
      getData() {
        this.pause = this.$store.getters.protocol.steps[this.order - 1]
      },
      saveData() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.steps[this.order - 1] = this.pause
        this.$store.commit('setProtocol', protocol)
        this.$emit('changeName')
        this.isShowKeyboard = this.isShowKeyboardTip =false
        this.onchangeCount = 0
      },
    }
  }
</script>

<style scoped="scoped">
.searchKeyboard {
  left: 500px !important;
  bottom: 30px !important;
  transform: scale(.85);
}
  .model {
    font-size: 24px;
    margin-left: 37px;
    margin-top: 26px;
    /* background-color: red; */
    height: 952px;
    overflow-y: auto;
  }

  .step-name {
    position: relative;
    width: 100%;
    height: 54px;
    line-height: 54px;
    margin-bottom: 25px;
  }

  .input-step-name {
    position: absolute;
    width: 310px;
    height: 54px;
    left: 513px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 2px;
    box-sizing: border-box;
    border: solid 1px #c2cbda;
  }

  .select-well {
    position: absolute;
    width: 310px;
    height: 54px;
    left: 513px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    top: 0;
  }

  .arraw-well {
    position: absolute;
    /* margin-left: 269px; */
    top: 35%;
    right: 12px;
  }

  .select-list {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 216px;
    overflow-y: auto;
    width: 310px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
  }

  .select-list-magnet {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 108px;
    width: 310px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
  }

  .select-list-segments {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 270px;
    width: 310px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
  }

  .arrawclass {
    border-top: 1px solid #c2cbda;
    text-align: center;
  }

  .switch {
    position: absolute;
    left: 513px;
  }

  .heating-step {
    position: absolute;
    width: 500px;
    height: 54px;
    left: 513px;
    display: flex;
    align-items: center;
    top: 0;
  }

  .circle {
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    border: solid 1px #5691d3;
    border-radius: 15px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circle-text {
    margin-right: 60px;
  }

  .circle-inner {
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: #ffffff;
  }

  .selected-heating {
    background-color: #5691D3;
  }

  .warning {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #666666;
  }

  .warning-div {
    width: 28px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #5a89c7;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .warning-input {
    width: 170px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #c2cbda;
    position: absolute;
    left: 513px;
    text-indent: 22px;
  }

  .img-ok {
    transform: scale(0.6);
  }

  .expect-div {
    position: absolute;
    width: 310px;
    height: 54px;
    background-color: #e1e1e1;
    border-radius: 2px;
    border: solid 1px #c2cbda;
    left: 513px;
    text-align: center;
    top: 0;
  }
</style>
<style>
  .step-name .el-switch__core {
    height: 30px;
    border-radius: 21px;
  }

  .step-name .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
  }

  .step-name .is-checked .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
    -webkit-transform: translateX(-11px);
  }
</style>
