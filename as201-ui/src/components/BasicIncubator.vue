<template>
  <div class="model">
    <div class="step-name">
      {{ $t("language.step") }}:
      <input @focus="onfocus('name',incubator.step_name,$event)" class="input-step-name" v-model="incubator.step_name"
        @blur="saveData()" @input="incubator.step_name=incubator.step_name.replace(/[^\w\u4E00-\u9FA5_-]/g,'')" />
    </div>
    <div class="step-name">
      {{ $t("language.well1x") }}:
      <div class="select-well" @click.stop="is_arraw()" ref="well1">
        {{incubator.well}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
      </div>
      <div class="select-list" v-if="arraw_status">
        <div class="arrawclass" @click="selectWell(1)">1</div>
        <div class="arrawclass" @click="selectWell(2)" v-if="$store.getters.protocol.cartridge==2">2</div>
        <div class="arrawclass" @click="selectWell(8)" v-if="$store.getters.protocol.cartridge==10">8</div>
        <div class="arrawclass" @click="selectWell(10)" v-if="$store.getters.protocol.cartridge==8">10</div>
        <div class="arrawclass" @click="selectWell(12)" v-if="$store.getters.protocol.cartridge==2">12</div>
      </div>
    </div>
    <div class="step-name">
      {{ $t("language.temp10100") }}:
      <input @focus="onfocus('point',incubator.incubator_temperature,$event)" class="input-step-name"
        v-model="incubator.incubator_temperature" @blur="saveData('1')"
        onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))" />
    </div>
    <div class="step-name">
      {{ $t("language.time999") }}:
      <input @focus="onfocus('point',incubator.incubator_time,$event)" class="input-step-name"
        v-model="incubator.incubator_time" @blur="saveData('2')"
        onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))" />
    </div>

    <!-- 全键盘 -->
    <SimpleKeyboard class="searchKeyboard" v-if="isShowKeyboard" :input="input" @onChange="onChange"
      @onKeyPress="onKeyPress" @colseKeyboard="colseKeyboard('name')" @mousedown.native="$event.preventDefault();" />
    <!-- 数字键盘 -->
    <NumberKeyboard class="searchKeyboardNumber" v-if="isShowNumberKeyboardPoint" :input="input"
      @onChange="onChangeNumPoint" @onKeyPress="onKeyPressNum" @colseKeyboard="colseKeyboard('num')"
      @mousedown.native="$event.preventDefault();" />
  </div>
</template>

<script>
  import SimpleKeyboard from "@/components/SimpleKeyboard";
  import NumberKeyboard from "@/components/NumberKeyboard.vue";
  import MixinNumAndKeyboard from "@/mixins/numAndKeyboard.js";
  export default {
    props: ["order"],
    data() {
      return {
        arraw_status: false,
        incubator: {}
      };
    },
    components: {
      SimpleKeyboard,
      NumberKeyboard
    },
    mixins: [MixinNumAndKeyboard],
    watch: {
      order: {
        immediate: true,
        handler(newval, oldval) {
          this.getData();
        }
      }
    },
    mounted() {
      this.getData();
      if (this.$refs.well1) {
        document.addEventListener("click", this.closeClick);
      }
    },
    methods: {
      closeClick(event) {
        if (this.$refs.well1) {
          if (!this.$refs.well1.contains(event.target)) {
            this.arraw_status = false;
          }
        }
      },
      is_arraw() {
        this.arraw_status = !this.arraw_status
      },
      selectWell(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.incubator.well = type
        protocol.steps[this.order - 1].well = type
        this.$store.commit('setProtocol', protocol)
      },
      getData() {
        this.incubator = this.$store.getters.protocol.steps[this.order - 1]
        this.incubator.incubator_temperature = Number(this.incubator.incubator_temperature).toFixed(1);
        this.incubator.incubator_time = Number(this.incubator.incubator_time).toFixed(1);
      },
      saveData(type) {
        if (type == 1) {
          if (this.incubator.incubator_temperature > 120.0) {
            this.incubator.incubator_temperature = 120.0
          } else if (this.incubator.incubator_temperature <= 37.0) {
            this.incubator.incubator_temperature = 37.0
          }
          this.incubator.incubator_temperature = Number(this.incubator.incubator_temperature).toFixed(1);
        } else if (type == 2) {
          if (this.incubator.incubator_time > 999.0) {
            this.incubator.incubator_time = 999.0
          } else if (this.incubator.incubator_time <= 0.0) {
            this.incubator.incubator_time = 0.0
          }
          this.incubator.incubator_time = Number(this.incubator.incubator_time).toFixed(1);
        }
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.steps[this.order - 1].step_name = this.incubator.step_name
        protocol.steps[this.order - 1].incubator_temperature = this.incubator.incubator_temperature
        protocol.steps[this.order - 1].incubator_time = this.incubator.incubator_time
        this.$store.commit('setProtocol', protocol)
        this.$emit('changeName')
        this.isShowKeyboard = this.isShowNumberKeyboardPoint = false;
        this.onchangeCount = 0
      }
    },
  };
</script>

<style scoped="scoped">
  .searchKeyboardNumber {
    left: 780px !important;
    bottom: 50px !important;
  }

  .searchKeyboard {
    left: 600px !important;
    bottom: 80px !important;
    width: 1270px !important;
  }

  .keyBoard>>>li.hg-candidate-box-list-item {
    width: 54px !important;
  }

  .model {
    font-size: 24px;
    margin-left: 37px;
    margin-top: 26px;
  }

  .model {
    font-size: 24px;
    margin-left: 37px;
    margin-top: 26px;
  }

  .step-name {
    position: relative;
    width: 100%;
    height: 54px;
    line-height: 54px;
    margin-bottom: 30px;
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
    height: 108px;
    width: 310px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
    overflow-y: auto;
  }

  .arrawclass {
    border-top: 1px solid #c2cbda;
    text-align: center;
  }
</style>
<style>


  .select-list,
  .select-list div,
  .select-list span {
    touch-action: pan-y !important;
  }
</style>
