<template>
  <div :class="['model',isShowNumberKeyboard? 'move-top':'']" v-if="title_type==1">
    <div class="step-name">
      {{$t("language.step")}}:
      <input
        class="input-step-name"
        v-model="discard.step_name"
        @focus="onfocus('name',discard.step_name,$event)"
        @blur="saveData()"
        @input="discard.step_name=discard.step_name.replace(/[^\w\u4E00-\u9FA5_-]/g,'')" />
    </div>
    <div class="step-name">
      {{$t("language.well1c")}}:
      <div class="select-well" @click.stop="is_arraw()" ref="well1">
        {{discard.well}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
      </div>
      <div class="select-list" v-if="arraw_status">
        <div class="arrawclass" @click="selectWell('1')">1</div>
        <div class="arrawclass" @click="selectWell('2')">2</div>
        <div class="arrawclass" @click="selectWell('3')">3</div>
        <div class="arrawclass" @click="selectWell('4')">4</div>
        <div class="arrawclass" @click="selectWell('5')">5</div>
        <div class="arrawclass" @click="selectWell('6')" v-if="$store.getters.protocol.cartridge!=5">6</div>
        <div class="arrawclass" @click="selectWell('7')" v-if="$store.getters.protocol.cartridge!=5">7</div>
        <div class="arrawclass" @click="selectWell('8')" v-if="$store.getters.protocol.cartridge!=5">8</div>
        <div class="arrawclass" @click="selectWell('A')">A</div>
        <div class="arrawclass" @click="selectWell('B')">B</div>
        <div class="arrawclass" @click="selectWell('C')">C</div>
      </div>
    </div>
    <div class="step-name">
      <span>{{$t("language.labware")}}:</span>
      <div class="select-well" @click.stop="is_arraw_first()" ref="well1">
        {{discard.basic_labware}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
      </div>
      <div class="select-first" v-if="arraw_first_status">
        <div class="arrawclass" @click="selectlabware(0)">{{$t("language.d_tip")}}</div>
        <div class="arrawclass" @click="selectlabware(1)" v-if="$store.getters.protocol.well_e==1">
          {{$t("language.e_tip")}}
        </div>
        <div class="arrawclass" @click="selectlabware(2)" v-if="$store.getters.protocol.well_e==2">
          {{$t("language.e_sleeve")}}
        </div>
      </div>
    </div>
    <div class="step-name">
      <span
        v-if="(discard.well==1||discard.well==2)&&$store.getters.protocol.cartridge==2">{{$t("language.volume")}}(5-2000μl):</span>
      <span
        v-else-if="discard.well>=3&&discard.well<=10&&$store.getters.protocol.cartridge==2">{{$t("language.volume")}}(5-1000μl):</span>
      <span
        v-else-if="(discard.well==11||discard.well==12)&&$store.getters.protocol.cartridge==2">{{$t("language.volume")}}(5-200μl):</span>

      <span
        v-else-if="discard.well==1&&$store.getters.protocol.cartridge==8">{{$t("language.volume")}}(5-8000μl):</span>
      <span
        v-else-if="discard.well>=2&&discard.well<=9&&$store.getters.protocol.cartridge==8">{{$t("language.volume")}}(5-1000μl):</span>
      <span
        v-else-if="discard.well==10&&$store.getters.protocol.cartridge==8">{{$t("language.volume")}}(5-200μl):</span>

      <span
        v-else-if="discard.well==1&&$store.getters.protocol.cartridge==15">{{$t("language.volume")}}(5-15000μl):</span>
      <span
        v-else-if="discard.well>=2&&discard.well<=7&&$store.getters.protocol.cartridge==15">{{$t("language.volume")}}(5-1000μl):</span>
      <span
        v-else-if="discard.well==8&&$store.getters.protocol.cartridge==15">{{$t("language.volume")}}(5-200μl):</span>

      <span v-else-if="discard.well=='A'">{{$t("language.volume")}}(5-10000μl):</span>
      <span v-else-if="discard.well=='B'||discard.well=='C'">{{$t("language.volume")}}(5-1000μl):</span>
      <input @focus="onfocus('num',discard.volume,$event)" class="input-step-name" v-model="discard.volume" @blur="saveData()"
        @input="discard.volume = discard.volume.replace(/[^[0-9]\d*$/g, '')" />
    </div>
    <div v-if="discard.basic_labware!=$t('language.e_sleeve')">
      <div class="step-name">
        {{$t("language.segments")}}(1-5):
        <div class="select-well" @click.stop="isMixSegment()" ref="well1">
          {{discard.mix_segments}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
        </div>
        <div class="select-list-segments" v-if="mix_segments_status">
          <div class="arrawclass" @click="selectMixSegments(1)">1</div>
          <div class="arrawclass" @click="selectMixSegments(2)">2</div>
          <div class="arrawclass" @click="selectMixSegments(3)">3</div>
          <div class="arrawclass" @click="selectMixSegments(4)">4</div>
          <div class="arrawclass" @click="selectMixSegments(5)">5</div>
        </div>
      </div>
      <div class="step-name">
        {{$t("language.every_mix_times")}}(1-999):
        <input
          class="input-step-name"
          v-model="discard.every_mix_times"
          @focus="onfocus('num',discard.every_mix_times,$event)"
          @blur="saveData()"
          @input="discard.every_mix_times = discard.every_mix_times.replace(/[^[0-9]\d*$/g, '')" />
      </div>
      <div class="step-name">
        {{$t("language.mix_type")}}:
        <div class="select-well" @click.stop="isMixType()" ref="well1">
          {{discard.mix_type}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
        </div>
        <div class="select-mix-type" v-if="mix_status">
          <div class="arrawclass" @click="selectMixType(0)">{{$t("language.top_bottom")}}</div>
          <div class="arrawclass" @click="selectMixType(1)">{{$t("language.bottom_top")}}</div>
        </div>
      </div>
      <div class="step-name">
        <span
          v-if="(discard.well==1||discard.well==2)&&$store.getters.protocol.cartridge==2">{{$t("language.mix_volume")}}(5-1000μl):</span>
        <span
          v-else-if="discard.well>=3&&discard.well<=10&&$store.getters.protocol.cartridge==2">{{$t("language.mix_volume")}}(5-600μl):</span>
        <span
          v-else-if="(discard.well==11||discard.well==12)&&$store.getters.protocol.cartridge==2">{{$t("language.mix_volume")}}(5-120μl):</span>

        <span
          v-else-if="discard.well==1&&$store.getters.protocol.cartridge==8">{{$t("language.mix_volume")}}(5-1000μl):</span>
        <span
          v-else-if="discard.well>=2&&discard.well<=9&&$store.getters.protocol.cartridge==8">{{$t("language.mix_volume")}}(5-600μl):</span>
        <span
          v-else-if="discard.well==10&&$store.getters.protocol.cartridge==8">{{$t("language.mix_volume")}}(5-120μl):</span>

        <span
          v-else-if="discard.well==1&&$store.getters.protocol.cartridge==15">{{$t("language.mix_volume")}}(5-1000μl):</span>
        <span
          v-else-if="discard.well>=2&&discard.well<=7&&$store.getters.protocol.cartridge==15">{{$t("language.mix_volume")}}(5-600μl):</span>
        <span
          v-else-if="discard.well==8&&$store.getters.protocol.cartridge==15">{{$t("language.mix_volume")}}(5-120μl):</span>

        <span v-else-if="discard.well=='A'">{{$t("language.mix_volume")}}(5-1000μl):</span>
        <span v-else-if="discard.well=='B'||discard.well=='C'">{{$t("language.mix_volume")}}(5-600μl):</span>
        <input @focus="onfocus('num',discard.mix_volume,$event)" class="input-step-name" v-model="discard.mix_volume" @blur="saveData()"
          @input="discard.mix_volume = discard.mix_volume.replace(/[^[0-9]\d*$/g, '')" />
      </div>
      <div class="step-name">
        {{$t("language.mix_speed")}}(1%-150%):
        <input @focus="onfocusTemp('num',discard.mix_speed,$event)" class="input-step-name" v-model="discard.mix_speed" @blur="saveData()"
          @input="discard.mix_speed = discard.mix_speed.replace(/[^[0-9]\d*$/g, '')" />
      </div>
    </div>
    <div v-else>
      <div class="step-name">
        {{$t("language.mix_time")}}(1-999s):
        <input @focus="onfocus('num',discard.mix_time,$event)" class="input-step-name" v-model="discard.mix_time"
          @blur="saveData()" onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))"
          @input="discard.mix_time = discard.mix_time.replace(/[^[0-9]\d*$/g, '')" />
      </div>
      <div class="step-name">
        {{$t("language.mix_speed")}}(1-10Hz):
        <input @focus="onfocus('num',discard.mix_speed,$event)" class="input-step-name" v-model="discard.mix_speed"
          @blur="saveData()" @input="discard.mix_speed = discard.mix_speed.replace(/[^[0-9]\d*$/g, '')" />
      </div>
      <div class="step-name">
        {{$t("language.mix_position")}}(0-20mm):
        <input @focus="onfocus('num',discard.mix_position,$event)" class="input-step-name"
          v-model="discard.mix_position" @blur="saveData()"
          @input="discard.mix_position = discard.mix_position.replace(/[^[0-9]\d*$/g, '')" />
      </div>
      <div class="step-name">
        <span
          v-if="(discard.well==1||discard.well==2)&&$store.getters.protocol.cartridge==2">{{$t("language.mix_volume")}}(5-1000μl):</span>
        <span
          v-else-if="discard.well>=3&&discard.well<=10&&$store.getters.protocol.cartridge==2">{{$t("language.mix_volume")}}(5-600μl):</span>
        <span
          v-else-if="(discard.well==11||discard.well==12)&&$store.getters.protocol.cartridge==2">{{$t("language.mix_volume")}}(5-120μl):</span>

        <span
          v-else-if="discard.well==1&&$store.getters.protocol.cartridge==8">{{$t("language.mix_volume")}}(5-1000μl):</span>
        <span
          v-else-if="discard.well>=2&&discard.well<=9&&$store.getters.protocol.cartridge==8">{{$t("language.mix_volume")}}(5-600μl):</span>
        <span
          v-else-if="discard.well==10&&$store.getters.protocol.cartridge==8">{{$t("language.mix_volume")}}(5-120μl):</span>

        <span
          v-else-if="discard.well==1&&$store.getters.protocol.cartridge==15">{{$t("language.mix_volume")}}(5-1000μl):</span>
        <span
          v-else-if="discard.well>=2&&discard.well<=7&&$store.getters.protocol.cartridge==15">{{$t("language.mix_volume")}}(5-600μl):</span>
        <span
          v-else-if="discard.well==8&&$store.getters.protocol.cartridge==15">{{$t("language.mix_volume")}}(5-120μl):</span>

        <span v-else-if="discard.well=='A'">{{$t("language.mix_volume")}}(5-1000μl):</span>
        <span v-else-if="discard.well=='B'||discard.well=='C'">{{$t("language.mix_volume")}}(5-600μl):</span>
        <input @focus="onfocus('num',discard.mix_volume,$event)" class="input-step-name" v-model="discard.mix_volume"
          @blur="saveData()" @input="discard.mix_volume = discard.mix_volume.replace(/[^[0-9]\d*$/g, '')" />
      </div>
    </div>

     <!-- 全键盘 -->
     <SimpleKeyboard class="searchKeyboard" v-if="isShowKeyboard" :input="input" @onChange="onChange"
      @onKeyPress="onKeyPress" @colseKeyboard="colseKeyboard('name')" @mousedown.native="$event.preventDefault();" />
    <!-- 数字键盘 -->
    <!-- 不可输入小数点 -->
    <NumberKeyboard class="searchKeyboardNumber" v-if="isShowNumberKeyboard" :input="input" @onChange="onChangeNum"
      @onKeyPress="onKeyPressNum" @colseKeyboard="colseKeyboard('num')" @mousedown.native="$event.preventDefault();" />
  </div>
</template>

<script>
  import SimpleKeyboard from "@/components/SimpleKeyboard";
  import NumberKeyboard from "@/components/NumberKeyboard.vue";
  import MixinNumAndKeyboard from "@/mixins/numAndKeyboard.js";
  export default {
    props: ['order', 'title_type'],
    mixins: [MixinNumAndKeyboard],
    components: {
      SimpleKeyboard,
      NumberKeyboard
    },
    data() {
      return {
        arraw_status: false,
        discard: {},
        arraw_first_status: false,
        mix_segments_status: false,
        mix_status: false,
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
      if (this.$refs.well1) {
        document.addEventListener('click', this.closeClick);
      }
    },
    methods: {
      closeClick(event) {
        if (this.$refs.well1) {
          if (!this.$refs.well1.contains(event.target)) {
            this.arraw_status = false
            this.mix_segments_status = false
            this.mix_status = false
            this.arraw_first_status = false
          }
        }
      },
      is_arraw() {
        this.arraw_status = !this.arraw_status
        this.mix_segments_status = false
        this.mix_status = false
        this.arraw_first_status = false
      },
      selectWell(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.discard.well = type
        protocol.steps[this.order - 1].well = type
        this.$store.commit('setProtocol', protocol)
        this.saveData()
      },
      getData() {
        this.discard = JSON.parse(JSON.stringify(this.$store.getters.protocol.steps[this.order - 1]))
        if (this.discard.basic_labware == 0) {
          this.discard.basic_labware = this.$t("language.d_tip")
        } else if (this.discard.basic_labware == 1) {
          this.discard.basic_labware = this.$t("language.e_tip")
        } else if (this.discard.basic_labware == 2) {
          this.discard.basic_labware = this.$t("language.e_sleeve")
        }
        if (this.discard.mix_type == 0) {
          this.discard.mix_type = this.$t("language.top_bottom")
        } else if (this.discard.mix_type == 1) {
          this.discard.mix_type = this.$t("language.bottom_top")
        }
      },
      saveData(type) {
        //volume
        if (this.discard.volume < 5) {
          this.discard.volume = 5
        }
        if (this.discard.mix_volume < 5) {
          this.discard.mix_volume = 5
        }
        if ((this.discard.well == 1 || this.discard.well == 2) && this.$store.getters.protocol.cartridge == 2) {
          //volume
          if (this.discard.volume > 2000) {
            this.discard.volume = 2000
          }
          //mix_volume
          if (this.discard.mix_volume > 1000) {
            this.discard.mix_volume = 1000
          }
        } else if (this.discard.well >= 3 && this.discard.well <= 10 && this.$store.getters.protocol.cartridge == 2) {
          //volume
          if (this.discard.volume > 1000) {
            this.discard.volume = 1000
          }
          //mix_volume
          if (this.discard.mix_volume > 600) {
            this.discard.mix_volume = 600
          }
        } else if (this.discard.well == 12 && this.discard.well == 11 && this.$store.getters.protocol.cartridge == 2) {
          //volume
          if (this.discard.volume > 200) {
            this.discard.volume = 200
          }
          //mix_volume
          if (this.discard.mix_volume > 120) {
            this.discard.mix_volume = 120
          }
        } else if (this.discard.well == 1 && this.$store.getters.protocol.cartridge == 8) {
          //volume
          if (this.discard.volume > 8000) {
            this.discard.volume = 8000
          }
          //mix_volume
          if (this.discard.mix_volume > 1000) {
            this.discard.mix_volume = 1000
          }
        } else if (this.discard.well >= 2 && this.discard.well <= 9 && this.$store.getters.protocol.cartridge == 8) {
          //volume
          if (this.discard.volume > 1000) {
            this.discard.volume = 1000
          }
          //mix_volume
          if (this.discard.mix_volume > 600) {
            this.discard.mix_volume = 600
          }
        } else if (this.discard.well == 10 && this.$store.getters.protocol.cartridge == 8) {
          //volume
          if (this.discard.volume > 200) {
            this.discard.volume = 200
          }
          //mix_volume
          if (this.discard.mix_volume > 120) {
            this.discard.mix_volume = 120
          }
        } else if (this.discard.well == 1 && this.$store.getters.protocol.cartridge == 12) {
          //volume
          if (this.discard.volume > 15000) {
            this.discard.volume = 15000
          }
          //mix_volume
          if (this.discard.mix_volume > 1000) {
            this.discard.mix_volume = 1000
          }
        } else if (this.discard.well >= 2 && this.discard.well <= 7 && this.$store.getters.protocol.cartridge == 12) {
          //volume
          if (this.discard.volume > 1000) {
            this.discard.volume = 1000
          }
          //mix_volume
          if (this.discard.mix_volume > 600) {
            this.discard.mix_volume = 600
          }
        } else if (this.discard.well == 8 && this.$store.getters.protocol.cartridge == 12) {
          //volume
          if (this.discard.volume > 200) {
            this.discard.volume = 200
          }
          //mix_volume
          if (this.discard.mix_volume > 120) {
            this.discard.mix_volume = 120
          }
        } else if (this.discard.well == 'A') {
          //volume
          if (this.discard.volume > 10000) {
            this.discard.volume = 10000
          }
          //mix_volume
          if (this.discard.mix_volume > 1000) {
            this.discard.mix_volume = 1000
          }
        } else if (this.discard.well == 'B' || this.discard.well == 'C') {
          //volume
          if (this.discard.volume > 1000) {
            this.discard.volume = 1000
          }
          //mix_volume
          if (this.discard.mix_volume > 600) {
            this.discard.mix_volume = 600
          }
        }
        if (this.discard.basic_labware == this.$t("language.e_sleeve")) {
          if (this.discard.mix_speed > 10) {
            this.discard.mix_speed = 10
          } else if (this.discard.mix_speed < 1) {
            this.discard.mix_speed = 1
          }
        } else {
          if (this.discard.mix_speed > 150) {
            this.discard.mix_speed = 150
          } else if (this.discard.mix_speed < 1) {
            this.discard.mix_speed = 1
          }
        }
        if (this.discard.mix_time > 999) {
          this.discard.mix_time = 999
        } else if (this.discard.mix_time < 1) {
          this.discard.mix_time = 1
        }
        if (this.discard.mix_position > 20) {
          this.discard.mix_position = 20
        } else if (this.discard.mix_position <= 0) {
          this.discard.mix_position = 0
        }
        if (this.discard.every_mix_times > 999) {
          this.discard.every_mix_times = 999
        } else if (this.discard.every_mix_times < 1) {
          this.discard.every_mix_times = 1
        }
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.steps[this.order - 1] = JSON.parse(JSON.stringify(this.discard))
        protocol.steps[this.order - 1].drying_on = protocol.steps[this.order - 1].drying_on ? 1 : 0
        if (this.discard.basic_labware == this.$t("language.d_tip")) {
          protocol.steps[this.order - 1].basic_labware = 0
        } else if (this.discard.basic_labware == this.$t("language.e_tip")) {
          protocol.steps[this.order - 1].basic_labware = 1
        } else if (this.discard.basic_labware == this.$t("language.e_sleeve")) {
          protocol.steps[this.order - 1].basic_labware = 2
        }
        if (this.discard.mix_type == this.$t("language.top_bottom")) {
          protocol.steps[this.order - 1].mix_type = 0
        } else if (this.discard.mix_type == this.$t("language.bottom_top")) {
          protocol.steps[this.order - 1].mix_type = 1
        }
        this.$store.commit('setProtocol', protocol)
        this.$emit('changeName')
        this.isShowKeyboard = this.isShowNumberKeyboard = this.isShowNumberKeyboardPoint = false;
          this.onchangeCount = 0
      },
      is_arraw_first() {
        this.arraw_first_status = !this.arraw_first_status
        this.mix_segments_status = false
        this.mix_status = false
        this.arraw_status = false
      },
      selectlabware(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (type == 0) {
          this.discard.basic_labware = this.$t("language.d_tip")
        } else if (type == 1) {
          this.discard.basic_labware = this.$t("language.e_tip")
        } else if (type == 2) {
          this.discard.basic_labware = this.$t("language.e_sleeve")
        }
        protocol.steps[this.order - 1].basic_labware = type
        this.$store.commit('setProtocol', protocol)
        this.arraw_first_status = false
      },
      isMixSegment() {
        this.mix_segments_status = !this.mix_segments_status
        this.mix_status = false
        this.arraw_first_status = false
        this.arraw_status = false
      },
      selectMixSegments(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.discard.mix_segments = type
        protocol.steps[this.order - 1].mix_segments = type
        this.$store.commit('setProtocol', protocol)
        this.mix_segments_status = false
      },
      isMixType() {
        this.mix_status = !this.mix_status
        this.arraw_first_status = false
        this.arraw_status = false
        this.mix_segments_status = false
      },
      selectMixType(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (type == 0) {
          this.wash.mix_type = this.$t("language.top_bottom")
        } else if (type == 1) {
          this.wash.mix_type = this.$t("language.bottom_top")
        }
        protocol.steps[this.order - 1].mix_type = type
        this.$store.commit('setProtocol', protocol)
        this.mix_status = false
      },
    },
    destroyed() {
      document.removeEventListener('click', this.closeClick);
    }
  }
</script>

<style scoped="scoped">
.searchKeyboard {
    left: 600px !important;
    bottom: 40px !important;
    width: 1270px !important;
    transform: scaleY(0.95);
  }
  .searchKeyboardNumber {
    left: 800px !important;
    bottom: -20px !important;
    transform: scale(0.78);
  }
 .move-top {
    height: 530px !important;
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
    border: solid 2px #c2cbda;
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

  .img-ok {
    transform: scale(0.6);
  }


  .select-first {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 108px;
    width: 311px;
    border: solid 2px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    overflow-y: auto;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    left: 513px;
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
  .select-mix-type {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 109px;
    width: 310px;
    border: solid 2px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
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
