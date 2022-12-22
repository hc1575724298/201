<template>
  <div class="model">
    <div :class="['liquid-parameters',
    (isShowNumberKeyboard ||isShowNumberKeyboardPoint) &&parameters.mix_before_aspirating_on?'move-top': '',
    (isShowNumberKeyboard ||isShowNumberKeyboardPoint) && !parameters.mix_before_aspirating_on?'move': '',
    ]">
      <div class="liquid-title">
        {{$t("language.liquid")}}
      </div>
      <div class="aspirate-speed">
        <div class="aspirate-dispense">
          <div class="aspirate-list">
            {{$t("language.aspirate_speed")}}(20-2000μl/s):
            <input @focus="onfocus('num',parameters.aspirate_speed,$event)" class="input-parameters" v-model="parameters.aspirate_speed" @blur="checkData"
              @input="parameters.aspirate_speed = parameters.aspirate_speed.replace(/[^[0-9]\d*$/g, '')" />
          </div>
          <div class="aspirate-list dispense-div">
            {{$t("language.dispense_speed")}}:
            <input @focus="onfocus('num',parameters.dispense_speed,$event)" class="input-parameters" v-model="parameters.dispense_speed" @blur="checkData"
              @input="parameters.dispense_speed = parameters.dispense_speed.replace(/[^[0-9]\d*$/g, '')" />
          </div>
        </div>
        <div class="aspirate-dispense">
          <div class="aspirate-list">
            {{$t("language.aspirate_acceleration")}}:
            <input @focus="onfocus('num',parameters.aspirate_acceleration,$event)" class="input-parameters" v-model="parameters.aspirate_acceleration" @blur="checkData"
              @input="parameters.aspirate_acceleration = parameters.aspirate_acceleration.replace(/[^[0-9]\d*$/g, '')" />
          </div>
          <div class="aspirate-list dispense-div">
            {{$t("language.dispense_acceleration")}}:
            <input @focus="onfocus('num',parameters.dispense_acceleration,$event)" class="input-parameters" v-model="parameters.dispense_acceleration" @blur="checkData"
              @input="parameters.dispense_acceleration = parameters.dispense_acceleration.replace(/[^[0-9]\d*$/g, '')" />
          </div>
        </div>
        <div class="aspirate-dispense">
          <div class="aspirate-list">
            {{$t("language.aspiration_delay")}}:
            <input @focus="onfocus('point',parameters.aspirate_delay, $event)"  class="input-parameters" v-model="parameters.aspirate_delay" @blur="checkData" />
          </div>
          <div class="aspirate-list dispense-div">
            {{$t("language.dispense_delay")}}:
            <input  @focus="onfocus('point',parameters.dispense_delay, $event)" class="input-parameters" v-model="parameters.dispense_delay" @blur="checkData" />
          </div>
        </div>
        <div class="aspirate-dispense">
          <div class="aspirate-list">
            {{$t("language.aspiration_position")}}(0-20mm):
            <input @focus="onfocus('num',parameters.aspirate_position,$event)" class="input-parameters" v-model="parameters.aspirate_position" @blur="checkData"
              @input="parameters.aspirate_position = parameters.aspirate_position.replace(/[^[0-9]\d*$/g, '')" />
          </div>
          <div class="aspirate-list dispense-div">
            {{$t("language.dispense_position")}}(0-20mm):
            <input @focus="onfocus('num',parameters.dispense_position,$event)" class="input-parameters" v-model="parameters.dispense_position" @blur="checkData"
              @input="parameters.dispense_position = parameters.dispense_position.replace(/[^[0-9]\d*$/g, '')" />
          </div>
        </div>
      </div>
      <!-- pre开头 -->
      <div class="pre-div">
        <div class="aspirate-dispense">
          <div class="aspirate-list">
            {{$t("language.prewetting")}}:
            <input @focus="onfocus('num',parameters.prewetting,$event)" class="input-parameters" v-model="parameters.prewetting" @blur="checkData"
              @input="parameters.prewetting = parameters.prewetting.replace(/[^[0-9]\d*$/g, '')" />
          </div>
        </div>
        <div class="aspirate-dispense">
          <div class="aspirate-list">
            {{$t("language.blow_liquid")}}:
            <input @focus="onfocus('num',parameters.blow_liquid_volume,$event)" class="input-parameters" v-model="parameters.blow_liquid_volume" @blur="checkData"
              @input="parameters.blow_liquid_volume = parameters.blow_liquid_volume.replace(/[^[0-9]\d*$/g, '')" />
          </div>
        </div>
        <div class="aspirate-dispense">
          <div class="aspirate-list">
            {{$t("language.air_gap")}}:
            <input @focus="onfocus('num',parameters.air_gap_volume,$event)" class="input-parameters" v-model="parameters.air_gap_volume" @blur="checkData"
              @input="parameters.air_gap_volume = parameters.air_gap_volume.replace(/[^[0-9]\d*$/g, '')" />
          </div>
        </div>
        <div class="aspirate-dispense">
          <div class="aspirate-list">
            {{$t("language.mix_before_aspirating")}}:
            <div class="elswitch">
              <el-switch active-color="#13ce66" inactive-color="#DCDFE6" :width="66"
                v-model="parameters.mix_before_aspirating_on">
              </el-switch>
            </div>
          </div>
        </div>
        <div v-if="parameters.mix_before_aspirating_on">
          <div class="aspirate-dispense">
            <div class="aspirate-list">
              <span style="margin-left: 18px;">{{$t("language.segments")}}(1-5):</span>
              <input  @focus="onfocus('num',parameters.segments,$event)" class="input-parameters" v-model="parameters.segments" @blur="checkData"
                @input="parameters.segments = parameters.segments.replace(/[^[0-9]\d*$/g, '')" />
            </div>
          </div>
          <div class="aspirate-dispense">
            <div class="aspirate-list">
              <span style="margin-left: 18px;">{{$t("language.every_mix_times")}}(1-999):</span>
              <input  @focus="onfocus('num',parameters.every_mix_times,$event)" class="input-parameters" v-model="parameters.every_mix_times" @blur="checkData"
                @input="parameters.every_mix_times = parameters.every_mix_times.replace(/[^[0-9]\d*$/g, '')" />
            </div>
          </div>
          <div class="aspirate-dispense">
            <div class="aspirate-list">
              <span style="margin-left: 18px;">{{$t("language.mix_volume")}}(5-1000ul):</span>
              <input  @focus="onfocus('num',parameters.mix_volume,$event)" class="input-parameters" v-model="parameters.mix_volume" @blur="checkData"
                @input="parameters.mix_volume = parameters.mix_volume.replace(/[^[0-9]\d*$/g, '')" />
            </div>
          </div>
          <div class="aspirate-dispense">
            <div class="aspirate-list">
              <span style="margin-left: 18px;">{{$t("language.mix_speed")}}(1-10):</span>
              <input @focus="onfocus('num',parameters.mix_speed,$event)" class="input-parameters" v-model="parameters.mix_speed" @blur="checkData"
                @input="parameters.mix_speed = parameters.mix_speed.replace(/[^[0-9]\d*$/g, '')" />
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <div class="button-div ok" @mousedown="okSave">{{$t("language.ok")}}</div>
        <div class="button-div cancel" @mousedown="backTo">{{$t("language.cancel")}}</div>
      </div>
    </div>

    <!-- 数字键盘 -->
    <NumberKeyboard
      class="searchKeyboardNumber"
      v-if="isShowNumberKeyboard "
      :input="input"
      @onChange="onChangeNum"
      @onKeyPress="onKeyPressNum"
      @colseKeyboard="colseKeyboard('num')"
      @mousedown.native="$event.preventDefault();" />
      <!-- 小数 -->
      <NumberKeyboard
      class="searchKeyboardNumber"
      v-if="isShowNumberKeyboardPoint"
      :input="input"
      @onChange="onChangeNumPoint"
      @onKeyPress="onKeyPressNum"
      @colseKeyboard="colseKeyboard('num')"
      @mousedown.native="$event.preventDefault();" />
  </div>
</template>

<script>
  import NumberKeyboard from "@/components/NumberKeyboard.vue";
  import MixinNumAndKeyboard from "@/mixins/numAndKeyboard.js";
  export default {
    props: ['liquid_type', 'step_order'],
    components:{ NumberKeyboard},
    mixins: [MixinNumAndKeyboard],
    data() {
      return {
        parameters: {

        }
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        this.parameters = JSON.parse(JSON.stringify(this.$store.getters.protocol.steps[this.step_order - 1].liquid))
        this.parameters.mix_before_aspirating_on = this.parameters.mix_before_aspirating_on == 1 ? true : false
      },
      checkData() {
        if (this.parameters.aspirate_speed < 20) {
          this.parameters.aspirate_speed = 20
        } else if (this.parameters.aspirate_speed > 2000) {
          this.parameters.aspirate_speed = 2000
        }
        if (this.parameters.aspirate_acceleration < 100) {
          this.parameters.aspirate_acceleration = 100
        } else if (this.parameters.aspirate_acceleration > 5000) {
          this.parameters.aspirate_acceleration = 5000
        }
        if (this.parameters.aspirate_delay < 0.1) {
          this.parameters.aspirate_delay = 0.1
        } else if (this.parameters.aspirate_delay > 10) {
          this.parameters.aspirate_delay = 10
        } else {
          this.parameters.aspirate_delay = Number(this.parameters.aspirate_delay).toFixed(1)
        }
        if (this.parameters.aspirate_position < 0) {
          this.parameters.aspirate_position = 0
        } else if (this.parameters.aspirate_position > 20) {
          this.parameters.aspirate_position = 20
        }
        if (this.parameters.dispense_speed < 20) {
          this.parameters.dispense_speed = 20
        } else if (this.parameters.dispense_speed > 2000) {
          this.parameters.dispense_speed = 2000
        }
        if (this.parameters.dispense_acceleration < 100) {
          this.parameters.dispense_acceleration = 100
        } else if (this.parameters.dispense_acceleration > 5000) {
          this.parameters.dispense_acceleration = 5000
        }
        if (this.parameters.dispense_delay < 0.1) {
          this.parameters.dispense_delay = 0.1
        } else if (this.parameters.dispense_delay > 10) {
          this.parameters.dispense_delay = 10
        } else {
          this.parameters.dispense_delay = Number(this.parameters.dispense_delay).toFixed(1)
        }
        if (this.parameters.dispense_position < 0) {
          this.parameters.dispense_position = 0
        } else if (this.parameters.dispense_position > 20) {
          this.parameters.dispense_position = 20
        }
        if (this.parameters.prewetting < 0) {
          this.parameters.prewetting = 0
        } else if (this.parameters.prewetting > 10) {
          this.parameters.prewetting = 10
        }
        if (this.parameters.blow_liquid_volume < 0) {
          this.parameters.blow_liquid_volume = 0
        } else if (this.parameters.blow_liquid_volume > 20) {
          this.parameters.blow_liquid_volume = 20
        }
        if (this.parameters.air_gap_volume < 0) {
          this.parameters.air_gap_volume = 0
        } else if (this.parameters.air_gap_volume > 20) {
          this.parameters.air_gap_volume = 20
        }
        if (this.parameters.segments < 1) {
          this.parameters.segments = 1
        } else if (this.parameters.segments > 5) {
          this.parameters.segments = 5
        }
        if (this.parameters.every_mix_times < 1) {
          this.parameters.every_mix_times = 1
        } else if (this.parameters.every_mix_times > 999) {
          this.parameters.every_mix_times = 999
        }
        if (this.parameters.mix_volume < 5) {
          this.parameters.mix_volume = 5
        } else if (this.parameters.mix_volume > 1000) {
          this.parameters.mix_volume = 1000
        }
        if (this.parameters.mix_speed < 1) {
          this.parameters.mix_speed = 1
        } else if (this.parameters.mix_speed > 10) {
          this.parameters.mix_speed = 10
        }
        this.isShowNumberKeyboard = this.isShowNumberKeyboardPoint = false;
        this.onchangeCount = 0
      },
      backTo() {
        this.$emit('close')
      },
      okSave() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        var temp = JSON.parse(JSON.stringify(this.parameters))
        temp.mix_before_aspirating_on = temp.mix_before_aspirating_on ? 1 : 0
        protocol.steps[this.step_order - 1].liquid = temp
        protocol.steps[this.step_order - 1].liquid_info = JSON.stringify(temp)
        this.$store.commit('setProtocol', protocol)
        this.$emit('close')
      }
    }
  }
</script>

<style scoped="scoped">
.move {
  position: absolute;
  top: 25px;
}
  .move-top {
    position: absolute;
    top: -75px;
    left: 248px;
    transform: scaleY(.8);
  }
  .searchKeyboardNumber {
    transform: scale(.85);
    left: 338px !important;
    bottom: -31px !important;
  }
  .model {
    z-index: 1000;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .liquid-parameters {
    width: 1430px;
    height: fit-content;
    background-color: #ffffff;
    border-radius: 10px;
  }

  .liquid-title {
    height: 66px;
    width: 1390px;
    margin-left: 20px;
    color: #4171bb;
    line-height: 66px;
    font-size: 24px;
    box-sizing: border-box;
    border-bottom: 1px solid #c2cbda;
    font-size: 24px;
  }

  .aspirate-speed {
    height: 244px;
    width: 1306px;
    margin-left: 62px;
    margin-top: 31px;
  }

  .pre-div {
    height: fit-content;
    width: 1306px;
    margin-left: 62px;
    margin-top: 31px;
  }

  .aspirate-dispense {
    display: flex;
    width: 100%;
    height: 46px;
    margin-bottom: 20px;
  }

  .aspirate-list {
    width: 614px;
    height: 100%;
    line-height: 46px;
  }

  .input-parameters {
    width: 200px;
    height: 46px;
    background-color: #ffffff;
    border-radius: 5px;
    border: solid 1px #707070;
    box-sizing: border-box;
    float: right;
    text-align: center;
    line-height: 46px;
  }

  .dispense-div {
    margin-left: 75px;
  }

  .elswitch {
    float: right;
    margin-right: 133px;
  }

  .buttons {
    height: 50px;
    width: 100%;
    margin-top: 21px;
  }

  .button-div {
    height: 100%;
    width: 150px;
    font-size: 19px;
    border-radius: 6px;
    text-align: center;
    line-height: 50px;
    float: right;
    margin-bottom: 20px;
  }

  .ok {
    color: white;
    background-color: #5186c2;
    margin-right: 63px;
  }

  .cancel {
    border: solid 1px #2d60c7;
    color: #333333;
    margin-right: 59px;
  }
</style>
<style>
  .elswitch .el-switch__core {
    height: 30px;
    border-radius: 21px;
  }

  .elswitch .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
  }

  .elswitch .is-checked .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
    -webkit-transform: translateX(-11px);
  }
</style>
