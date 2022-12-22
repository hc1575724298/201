<template>
  <div :class="['model']" @click="closeClick">
    <div >
      <div class="step-name" style="margin-top: 26px;">
        <span style="margin-left: 37px;">{{$t("language.step")}}:</span>
        <input @focus="onfocus('name',transfer.step_name,$event)" class="input-step-name" @blur="saveData()"
          v-model="transfer.step_name"
          @input="transfer.step_name=transfer.step_name.replace(/[^\w\u4E00-\u9FA5_-]/g,'')" />
      </div>
      <div class="step-name">
        <span style="margin-left: 37px;">{{$t("language.labware")}}:</span>
        <div class="select-well" @click.stop="is_arraw_first()" ref="well1">
          {{transfer.basic_labware}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
        </div>
        <div class="select-first" v-if="arraw_first_status">
          <div class="arrawclass" @click="selectlabware(0)">{{$t("language.d_tip")}}</div>
          <div class="arrawclass" @click="selectlabware(1)" v-if="$store.getters.protocol.well_e==1">{{$t("language.e_tip")}}</div>
          <div class="arrawclass" @click="selectlabware(2)" v-if="$store.getters.protocol.well_e==2">{{$t("language.e_sleeve")}}</div>
        </div>
      </div>
      <div class="step-name">
        <span style="margin-left: 37px;">{{$t("language.source_well_1c")}}:</span>
        <div class="select-well" @click.stop="is_arraw()" ref="well1">
          {{transfer.well}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
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
        <span style="margin-left: 37px;">{{$t("language.destination_well_1c")}}:</span>
        <div class="select-well" @click.stop="is_arraw_second()" ref="well1">
          {{transfer.destination_well}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
        </div>
        <div class="select-list" v-if="arraw_status_second">
          <div class="arrawclass" @click="selectWellSecond('1')">1</div>
          <div class="arrawclass" @click="selectWellSecond('2')">2</div>
          <div class="arrawclass" @click="selectWellSecond('3')">3</div>
          <div class="arrawclass" @click="selectWellSecond('4')">4</div>
          <div class="arrawclass" @click="selectWellSecond('5')">5</div>
          <div class="arrawclass" @click="selectWellSecond('6')" v-if="$store.getters.protocol.cartridge!=5">6</div>
          <div class="arrawclass" @click="selectWellSecond('7')" v-if="$store.getters.protocol.cartridge!=5">7</div>
          <div class="arrawclass" @click="selectWellSecond('8')" v-if="$store.getters.protocol.cartridge!=5">8</div>
          <div class="arrawclass" @click="selectWellSecond('A')">A</div>
          <div class="arrawclass" @click="selectWellSecond('B')">B</div>
          <div class="arrawclass" @click="selectWellSecond('C')">C</div>
        </div>
      </div>
      <div class="step-name">
        <span style="margin-left: 37px;"
          v-if="(transfer.well==1||transfer.well==2)&&$store.getters.protocol.cartridge==2">{{$t("language.volume")}}(5-2000μl):</span>
        <span style="margin-left: 37px;"
          v-else-if="transfer.well>=3&&transfer.well<=10&&$store.getters.protocol.cartridge==2">{{$t("language.volume")}}(5-1000μl):</span>
        <span style="margin-left: 37px;"
          v-else-if="(transfer.well==11||transfer.well==12)&&$store.getters.protocol.cartridge==2">{{$t("language.volume")}}(5-200μl):</span>

        <span style="margin-left: 37px;" v-else-if="transfer.well==1&&$store.getters.protocol.cartridge==8">{{$t("language.volume")}}(5-8000μl):</span>
        <span style="margin-left: 37px;"
          v-else-if="transfer.well>=2&&transfer.well<=9&&$store.getters.protocol.cartridge==8">{{$t("language.volume")}}(5-1000μl):</span>
        <span style="margin-left: 37px;" v-else-if="transfer.well==10&&$store.getters.protocol.cartridge==8">{{$t("language.volume")}}(5-200μl):</span>

        <span style="margin-left: 37px;"
          v-else-if="transfer.well==1&&$store.getters.protocol.cartridge==15">{{$t("language.volume")}}(5-15000μl):</span>
        <span style="margin-left: 37px;"
          v-else-if="transfer.well>=2&&transfer.well<=7&&$store.getters.protocol.cartridge==15">{{$t("language.volume")}}(5-1000μl):</span>
        <span style="margin-left: 37px;" v-else-if="transfer.well==8&&$store.getters.protocol.cartridge==15">{{$t("language.volume")}}(5-200μl):</span>

        <span style="margin-left: 37px;" v-else-if="transfer.well=='A'">{{$t("language.volume")}}(5-10000μl):</span>
        <span style="margin-left: 37px;" v-else-if="transfer.well=='B'||transfer.well=='C'">{{$t("language.volume")}}(5-1000μl):</span>
        <input @focus="onfocus('num',transfer.volume,$event)" class="input-step-name" @blur="saveData('1')"
          v-model="transfer.volume" @input="transfer.volume = transfer.volume.replace(/[^[0-9]\d*$/g, '')" />
      </div>
      <div class="step-name">
        <span style="margin-left: 37px;">{{$t("language.liquid")}}:</span>
        <div class="select-well" ref="well1">
          {{transfer.liquid.type}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
        </div>
        <div style="float: right;margin-right: 371px;margin-top: 5px;"><img
            src="../images/protocols/liquid_parameters.png" @click="liquid_status = true" />
        </div>
      </div>
    </div>
    <!-- 全键盘 -->
    <SimpleKeyboard class="searchKeyboard" v-if="isShowKeyboard" :input="input" @onChange="onChange"
      @onKeyPress="onKeyPress" @colseKeyboard="colseKeyboard('name')" @mousedown.native="$event.preventDefault();" />
    <!-- 数字键盘 -->
    <NumberKeyboard class="searchKeyboardNumber" v-if="isShowNumberKeyboard" :input="input" @onChange="onChangeNum"
      @onKeyPress="onKeyPressNum" @colseKeyboard="colseKeyboard('num')" @mousedown.native="$event.preventDefault();" />
   <LiquidParameters :liquid_type='transfer.liquid.type' v-if="liquid_status" @close='liquid_status=false'
      :step_order='order'></LiquidParameters>
  </div>
</template>

<script>
  import SimpleKeyboard from "@/components/SimpleKeyboard";
  import NumberKeyboard from "@/components/NumberKeyboard.vue";
  import MixinNumAndKeyboard from "@/mixins/numAndKeyboard.js";
  import LiquidParameters from "@/components/LiquidParameters";
  export default {
    props: ['order'],
    components: {
      SimpleKeyboard,
      NumberKeyboard,
      LiquidParameters
    },
    mixins: [MixinNumAndKeyboard],
    data() {
      return {
        arraw_status: false,
        arraw_status_second: false,
        transfer: {},
        liquid_status: false,
        arraw_first_status: false
      }
    },
    created() {
      this.getData();
    },
    mounted() {
      if (this.$refs.well1) {
        document.addEventListener('click', this.closeClick);
      }
    },
    methods: {
      closeClick(event) {
        if (!this.$refs.well1.contains(event.target)) {
          this.arraw_status = false;
          this.arraw_status_second = false;
          this.arraw_first_status = false
        }
      },
      is_arraw() {
        this.arraw_status = !this.arraw_status
        this.arraw_status_second = false
        this.arraw_first_status = false
      },
      selectWell(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.transfer.well = type
        protocol.steps[this.order - 1].well = type
        this.$store.commit('setProtocol', protocol)
        this.saveData()
      },
      selectlabware(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (type == 0) {
          this.transfer.basic_labware = this.$t("language.d_tip")
        } else if (type == 1) {
          this.transfer.basic_labware = this.$t("language.e_tip")
        } else if (type == 2) {
          this.transfer.basic_labware = this.$t("language.e_sleeve")
        }
        protocol.steps[this.order - 1].basic_labware = type
        this.$store.commit('setProtocol', protocol)
      },
      is_arraw_second() {
        this.arraw_status_second = !this.arraw_status_second
        this.arraw_status = false
        this.arraw_first_status = false
      },
      is_arraw_first() {
        this.arraw_first_status = !this.arraw_first_status
        this.arraw_status = false
        this.arraw_status_second = false
      },
      selectWellSecond(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.transfer.destination_well = type
        protocol.steps[this.order - 1].destination_well = type
        this.$store.commit('setProtocol', protocol)
        this.saveData()
      },
      getData() {
        this.transfer = JSON.parse(JSON.stringify(this.$store.getters.protocol.steps[this.order - 1]))
        if (this.transfer.basic_labware == 0) {
          this.transfer.basic_labware = this.$t("language.d_tip")
        } else if (this.transfer.basic_labware == 1) {
          this.transfer.basic_labware = this.$t("language.e_tip")
        } else if (this.transfer.basic_labware == 2) {
          this.transfer.basic_labware = this.$t("language.e_sleeve")
        }
      },
      saveData(type) {
         //volume
         if (this.transfer.volume < 5) {
           this.transfer.volume = 5
         }
         if ((this.transfer.well == 1 || this.transfer.well == 2) && this.$store.getters.protocol.cartridge == 2) {
           //volume
           if (this.transfer.volume > 2000) {
             this.transfer.volume = 2000
           }
         } else if (this.transfer.well >= 3 && this.transfer.well <= 10 && this.$store.getters.protocol.cartridge == 2) {
           //volume
           if (this.transfer.volume > 1000) {
             this.transfer.volume = 1000
           }
         } else if (this.transfer.well == 12 && this.transfer.well == 11 && this.$store.getters.protocol.cartridge == 2) {
           //volume
           if (this.transfer.volume > 200) {
             this.transfer.volume = 200
           }
           //mix_volume
           if (this.transfer.mix_volume > 120) {
             this.transfer.mix_volume = 120
           }
         } else if (this.transfer.well == 1 && this.$store.getters.protocol.cartridge == 8) {
           //volume
           if (this.transfer.volume > 8000) {
             this.transfer.volume = 8000
           }
         } else if (this.transfer.well >= 2 && this.transfer.well <= 9 && this.$store.getters.protocol.cartridge == 8) {
           //volume
           if (this.transfer.volume > 1000) {
             this.transfer.volume = 1000
           }
         } else if (this.transfer.well == 10 && this.$store.getters.protocol.cartridge == 8) {
           //volume
           if (this.transfer.volume > 200) {
             this.transfer.volume = 200
           }
         } else if (this.transfer.well == 1 && this.$store.getters.protocol.cartridge == 12) {
           //volume
           if (this.transfer.volume > 15000) {
             this.transfer.volume = 15000
           }
         } else if (this.transfer.well >= 2 && this.transfer.well <= 7 && this.$store.getters.protocol.cartridge == 12) {
           //volume
           if (this.transfer.volume > 1000) {
             this.transfer.volume = 1000
           }
         } else if (this.transfer.well == 8 && this.$store.getters.protocol.cartridge == 12) {
           //volume
           if (this.transfer.volume > 200) {
             this.transfer.volume = 200
           }
         } else if (this.transfer.well == 'A') {
           //volume
           if (this.transfer.volume > 10000) {
             this.transfer.volume = 10000
           }
         } else if (this.transfer.well == 'B' || this.transfer.well == 'C') {
           //volume
           if (this.transfer.volume > 1000) {
             this.transfer.volume = 1000
           }
         }
          if (type == '2') {
          if (this.transfer.mix_number_before_aspirating > 10) {
            this.transfer.mix_number_before_aspirating = 10
          } else if (this.transfer.mix_number_before_aspirating <= 0) {
            this.transfer.mix_number_before_aspirating = 0
          }
        } else if (type == '3') {
          if (this.transfer.mix_speed > 10) {
            this.transfer.mix_speed = 10
          } else if (this.transfer.mix_speed < 1) {
            this.transfer.mix_speed = 1
          }
        } else if (type == '4') {
          if (this.transfer.aspirate_position > 100) {
            this.transfer.aspirate_position = 100
          } else if (this.transfer.aspirate_position <= 0) {
            this.transfer.aspirate_position = 0
          }
        } else if (type == '5') {
          if (this.transfer.dispense_position > 100) {
            this.transfer.dispense_position = 100
          } else if (this.transfer.dispense_position <= 0) {
            this.transfer.dispense_position = 0
          }
        }
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.steps[this.order - 1].step_name = this.transfer.step_name
        protocol.steps[this.order - 1].mix_number_before_aspirating = this.transfer.mix_number_before_aspirating
        protocol.steps[this.order - 1].mix_speed = this.transfer.mix_speed
        protocol.steps[this.order - 1].aspirate_position = this.transfer.aspirate_position
        protocol.steps[this.order - 1].dispense_position = this.transfer.dispense_position
        this.$store.commit('setProtocol', protocol)
        this.$emit('changeName')
        this.isShowKeyboard = this.isShowNumberKeyboard = false;
        this.onchangeCount = 0
      },
    },
    destroyed() {
      document.removeEventListener('click', this.closeClick);
    }
  }
</script>

<style scoped="scoped">
  .searchKeyboardNumber {
    left: 800px !important;
    bottom: 8px !important;
    transform: scale(.85);
  }

  .move-top {
    position: relative;
    top: -250px;
  }

  .hidden {
    overflow: hidden;
  }

  .searchKeyboard {
    left: 600px !important;
    bottom: 31px !important;
    width: 1270px !important;
  }

  .keyBoard>>>li.hg-candidate-box-list-item {
    width: 54px !important;
  }

  .model {
    font-size: 24px;
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
    height: 216px;
    width: 311px;
    border: solid 2px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    overflow-y: auto;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    left: 513px;
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

  .arrawclass {
    border-top: 1px solid #c2cbda;
    text-align: center;
  }
</style>
<style>
  .select-list,
  .select-list div,
  .arrawclass,
  .select-first,
  .select-first div {
    touch-action: pan-y !important;
  }
</style>
