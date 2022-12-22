<template>
  <div>
    <div :class="['new-basic-model',isShowKeyboardRemark? 'hidden' : '']">
      <div :class="[isShowKeyboardRemark? 'move-top' : '']">
        <div class="info-title">
          <div class="info-title-icon"></div>
          <div class="info-title-text">{{ title }}</div>
        </div>
        <div class="protocol-content">
          <div class="protocol-list">
            <div class="protocols-name-pre">
              <div class="protocolName">
                {{ $t("language.protocols_name") }}
                <input class="input-protocol-name" v-model="$store.getters.protocol.name"
                  @focus="onfocus('name',$store.getters.protocol.name, $event)" maxlength="15"
                  @input="dealInputData('1')" @blur="onblurInput('name')" />
              </div>
              <div class="protocols-packaged">
                {{ $t("language.pre_packaged") }}:
                <div class="check" @click="selectPackage">
                  <img src="../images/protocols/select-pre.png" v-if="$store.getters.protocol.pre_packaged"
                    class="icon-check" />
                </div>
              </div>
            </div>
            <div class="cartridge">
              {{ $t("language.cartridge") }}:
              <div class="tube-img-div tube-img-first" :class="{
                  'selected-tube': $store.getters.protocol.cartridge == 2
                }" @click="selectTube(2)">
                <div class="well">
                  <img src="../images/protocols/缩略图FFPE.png" />
                </div>
                <div>{{ tubesType[0].description }}</div>
              </div>
              <div class="tube-img-div tube-img-second" :class="{
                  'selected-tube': $store.getters.protocol.cartridge == 8
                }" @click="selectTube(8)">
                <div class="well">
                  <img src="../images/protocols/缩略图8ML.png" />
                </div>
                <div>{{ tubesType[1].description }}</div>
              </div>
              <div class="tube-img-div tube-img-third" :class="{
                  'selected-tube': $store.getters.protocol.cartridge == 15
                }" @click="selectTube(15)">
                <div class="well">
                  <img src="../images/protocols/缩略图15ML.png" />
                </div>
                <div>{{ tubesType[2].description }}</div>
              </div>
            </div>
            <div class="protocols-name">
              {{ $t("language.wellA") }}:
              <div class="protocol-tube" @click="openTube(1)">
                {{ $store.getters.protocol.well_a}}
                <div class="img-down">
                  <img src="../images/protocols/down-prto.png" class="img-model" />
                </div>
              </div>
            </div>
            <div class="protocols-name">
              {{ $t("language.wellB") }}:
              <div class="protocol-tube" @click="openTube(2)">
                {{ $store.getters.protocol.well_b }}
                <div class="img-down">
                  <img src="../images/protocols/down-prto.png" class="img-model" />
                </div>
              </div>
            </div>
            <div class="protocols-name">
              {{ $t("language.wellC") }}:
              <div class="protocol-tube" @click="openTube(3)">
                {{ $store.getters.protocol.well_c }}
                <div class="img-down">
                  <img src="../images/protocols/down-prto.png" class="img-model" />
                </div>
              </div>
            </div>
            <div class="protocols-name">
              {{ $t("language.wellD") }}:
              <div class="protocolDTube">
                {{ $t("language.tip")+1 }}
              </div>
            </div>
            <div class="protocols-name">
              {{ $t("language.wellE") }}:
              <div class="protocol-tube" @click.stop="openSelectWellE" ref="welle">
                {{well_e_type}}
                <div class="img-down" v-if="$store.getters.protocol.cartridge!=2">
                  <img src="../images/protocols/down-prto.png" class="img-model" />
                </div>
              </div>
              <div class="select-well-e" v-if="welle_status">
                <div class="well-e-tube" @click="selectWellE('1')">{{$t("language.tip")+"2"}}</div>
                <div class="well-e-tube" @click="selectWellE('2')">{{$t("language.sleeve")}}</div>
              </div>
            </div>
            <div class="protocols-remark">
              {{ $t("language.remark_optional") }}:
              <el-input @focus="onfocus('remark',$store.getters.protocol.remark, $event)" type="textarea" :rows="4"
                v-model="$store.getters.protocol.remark" class="protocols-remark-div" maxlength="50"
                @blur="onblurInput('remark')">
              </el-input>
            </div>
          </div>
          <div class="tube-new-img">
            <img src="../images/protocols/2ML-1.5-2.png" v-if="tube_type==1" />
            <img src="../images/protocols/2ML-5.png" v-if="tube_type==2" />
            <img src="../images/protocols/2ML-10.png" v-if="tube_type==3" />
            <img src="../images/protocols/8ML-1.5-2.png" v-if="tube_type==4" />
            <img src="../images/protocols/8ML-5.png" v-if="tube_type==5" />
            <img src="../images/protocols/8ML-10.png" v-if="tube_type==6" />
            <img src="../images/protocols/15ML-1.5-2.png" v-if="tube_type==7" />
            <img src="../images/protocols/15ML-5.png" v-if="tube_type==8" />
            <img src="../images/protocols/15ML-10.png" v-if="tube_type==9" />
          </div>
        </div>
      </div>

      <!-- 全键盘  name-->
      <div class="keyboardBox" v-if="isShowKeyboard||isShowKeyboardRemark">
        <SimpleKeyboard class="searchKeyboard" v-if="isShowKeyboard" :input="input" @onChange="onChangeName"
          @onKeyPress="onKeyPress" @colseKeyboard="colseKeyboard('name')"
          @mousedown.native="$event.preventDefault();" />

        <!-- 全键盘  remark-->
        <SimpleKeyboard class="searchKeyboard" v-if="isShowKeyboardRemark" :input="input" @onChange="onChangeRemark"
          @onKeyPress="onKeyPress" @colseKeyboard="colseKeyboard('remark')"
          @mousedown.native="$event.preventDefault();" />
      </div>

    </div>

    <Tube
          v-if="is_tube"
          :content_title="tube_title"
          @close="closeTube"
        ></Tube>
  </div>
</template>

<script>
  import SimpleKeyboard from "@/components/SimpleKeyboard";
  import MixinKeyboard from "@/mixins/keyboard.js";
  import Tube from "@/components/Tube";
  export default {
    components: {
      Tube,
      SimpleKeyboard,
    },
    mixins: [MixinKeyboard],
    data() {
      return {
        title: this.$t("language.basic_information"),
        tubesType: [{
            id: 1,
            description: this.$t("language.cartridge_2mL")
          },
          {
            id: 2,
            description: this.$t("language.cartridge_8mL")
          },
          {
            id: 3,
            description: this.$t("language.cartridge_15mL")
          }
        ],
        is_tube: false,
        isShowKeyboardRemark: false,
        tube_type: null,
        well_e_type: null,
        welle_status: false
      };
    },
    watch: {
      '$store.getters.protocol.well_a': {
        immediate: true,
        handler(newval, oldval) {
          if (newval == 2) {
            var protocol = this.$store.getters.protocol
            protocol.well_e = 0
          } else if (newval == 0) {
            this.$i18n.locale = 'zh-CN'
          }
        }
      }
    },
    mounted() {
      this.getTubeImg()
      document.addEventListener('click', this.closeSelect);
    },
    methods: {
      onfocus(type, val, e) {
        if (type === 'name') {
          this.isShowKeyboardRemark = false;
          this.isShowKeyboard = true;
        }else {
          this.isShowKeyboard
          this.isShowKeyboardRemark = true;
        }
        this.event = e;
        this.input = val && val.toString();
      },
      onblurInput(val) {
        val === 'name' ? this.isShowKeyboard = false : this.isShowKeyboardRemark = false;
        this.onchangeCount = 0
      },
      colseKeyboard(val) {
        setTimeout(() => {
          this.onblurInput(val)
          this.event.target.blur()
        }, 200);
      },
      onChangeName(input) {
        this.onchangeCount++;
        let inputNew = input.replace(/[^\w\u4E00-\u9FA5_]/g, '')
        if (input.length > 15) return
        this.inputValue(inputNew)
      },
      onChangeRemark(input) {
        this.onchangeCount++;
        if (input.length > 50) return
        this.inputValue(input)
      },
      dealInputData(type) {
        if (type == '1') {
          this.$store.getters.protocol.name = this.$store.getters.protocol.name.replace(/[^\w\u4E00-\u9FA5_]/g, '')
        }
      },
      selectPackage() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (this.$store.getters.protocol.pre_packaged == 0) {
          protocol.pre_packaged = 1
        } else if (this.$store.getters.protocol.pre_packaged == 1) {
          protocol.pre_packaged = 0
        }
        this.$store.commit('setProtocol', protocol)
      },
      selectTube(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.cartridge = type;
        this.$store.commit('setProtocol', protocol)
        this.getTubeImg()
      },
      openTube(type) {
        this.tube_title = type
        this.is_tube = true
      },
      closeTube() {
        this.is_tube = false
        this.getTubeImg()
      },
      getTubeImg() {
        let volume = this.$store.getters.protocol.well_a.split('_', 1)[0].substring(0, this.$store.getters
          .protocol.well_a.split('_', 1)[0].length - 2)
        if (this.$store.getters.protocol.cartridge == 2 && (volume == 2 || volume == 1.5)) {
          this.tube_type = 1
        } else if (this.$store.getters.protocol.cartridge == 2 && volume == 5) {
          this.tube_type = 2
        } else if (this.$store.getters.protocol.cartridge == 2 && volume == 10) {
          this.tube_type = 3
        } else if (this.$store.getters.protocol.cartridge == 8 && (volume == 2 || volume == 1.5)) {
          this.tube_type = 4
        } else if (this.$store.getters.protocol.cartridge == 8 && volume == 5) {
          this.tube_type = 5
        } else if (this.$store.getters.protocol.cartridge == 8 && volume == 10) {
          this.tube_type = 6
        } else if (this.$store.getters.protocol.cartridge == 15 && (volume == 2 || volume == 1.5)) {
          this.tube_type = 7
        } else if (this.$store.getters.protocol.cartridge == 15 && volume == 5) {
          this.tube_type = 8
        } else if (this.$store.getters.protocol.cartridge == 15 && volume == 10) {
          this.tube_type = 9
        }
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (this.$store.getters.protocol.cartridge == 2) {
          protocol.well_e = 1
          this.well_e_type = this.$t("language.tip") + "2"
        }
        if(protocol.well_e == 1){
          this.well_e_type = this.$t("language.tip") + "2"
        }else{
          this.well_e_type = this.$t("language.sleeve")
        }
        this.$store.commit('setProtocol', protocol)
      },
      openSelectWellE() {
        if(this.$store.getters.protocol.cartridge==2){
          return
        }
        this.welle_status = !this.welle_status
      },
      closeSelect(event) {
        if (!this.$refs.welle.contains(event.target)) {
          this.welle_status = false;
        }
      },
      selectWellE(type){
         var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if(type=='1'){
          this.well_e_type=this.$t("language.tip")+"2";
          protocol.well_e=1
        }else{
          this.well_e_type=this.$t("language.sleeve");
          protocol.well_e=2
        }
        this.$store.commit('setProtocol',protocol)
      }
    },
    destroyed() {
      document.removeEventListener('click', this.closeSelect);
    }
  };
</script>

<style scoped="scoped">
  .keyboardBox {
    position: absolute;
    bottom: 30px;
    left: 2px;
    width: 100%;
    height: 458px;
    background-color: #fff;
  }

  .searchKeyboard {
    position: absolute !important;
    bottom: -25px !important;
    left: 90px !important;
  }

  .searchKeyboardNumber {
    left: 125px !important;
    bottom: 20px !important;
  }

  .new-basic-model {
    position: relative;
    width: 1685px;
    height: 1048px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    font-size: 24px;
    color: #666666;
  }

  .hidden {
    overflow: hidden;
  }

  .move-top {
    position: relative;
    bottom: 455px;
  }

  .info-title {
    height: 79px;
    width: 1625px;
    margin-left: 31px;
    border-bottom: solid 1px #c2cbda;
    display: flex;
    align-items: center;
  }

  .info-title-icon {
    width: 4px;
    height: 28px;
    background-color: #4c7cb2;
  }

  .info-title-text {
    font-size: 25px;
    margin-left: 18px;
    line-height: 28px;
    color: #333333;
    font-weight: 600;
  }

  .protocol-list {
    float: left;
    height: 100%;
    width: 1193px;
    margin-left: 40px;
  }

  .protocols-name {
    width: 100%;
    position: relative;
    height: 58px;
    margin-bottom: 32px;
    line-height: 58px;
  }

  .protocolName {
    width: 65%;
    position: relative;
    height: 58px;
    margin-bottom: 32px;
    line-height: 58px;
  }

  .protocol-tube,
  .input-protocol-name {
    width: 405px;
    height: 100%;
    position: absolute;
    text-indent: 22px;
    left: 264px;
    top: 0;
    color: #333333;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #c2cbda;
  }

  .protocolDTube {
    width: 405px;
    height: 100%;
    position: absolute;
    left: 264px;
    top: 0;
    color: #333333;
    background-color: #ffffff;
  }

  .protocols-packaged {
    width: 30%;
    position: relative;
    height: 32px;
    margin-bottom: 32px;
    line-height: 32px;
  }

  .check {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 264px;
    top: 0;
    height: 32px;
    width: 32px;
    border: 0;
    border-radius: 3px;
    border: solid 1px #c2cbda;
  }

  .icon-check {
    width: 28px;
    height: 20px;
  }

  .cartridge {
    height: 177px;
    width: 100%;
    position: relative;
    margin-bottom: 32px;
  }

  .tube-img-div {
    position: absolute;
    top: 0;
    width: 240px;
    height: 177px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    font-size: 20px;
    text-align: center;
  }

  .tube-img-first {
    left: 264px;
  }

  .tube-img-second {
    left: 543px;
  }

  .tube-img-third {
    left: 823px;
  }

  .well {
    width: 100%;
    height: 123px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .selected-tube {
    background-color: #f5faff;
    border: solid 1px #4c7cb2;
  }

  .img-down {
    float: right;
    margin-right: 16px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 16px;
  }

  .tube-span {
    display: inline-block;
    position: absolute;
    left: 754px;
  }

  .tube-volume {
    width: 281px;
    height: 58px;
    background-color: #ffffff;
    border-radius: 2px;
    position: absolute;
    right: 236px;
    text-indent: 22px;
    border: solid 1px #c2cbda;
  }

  .protocols-remark {
    height: 158px;
    width: 100%;
    position: relative;
  }

  .protocols-remark-div {
    width: 799px;
    position: absolute;
    left: 264px;
    top: 0;
    color: #333333;
    font-size: 24px;
    text-indent: 22px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #c2cbda;
  }

  .protocols-name-pre {
    margin-top: 28px;
    display: flex;
    width: 100%;
    align-items: center;
  }

  .tube-new-img {
    float: left;
    height: 100%;
    width: 451px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid #c2cbda;
  }

  .protocol-content {
    height: 969px;
    width: 100%;
  }

  .select-well-e {
    z-index: 1000;
    position: absolute;
    width: 405px;
    height: 116px;
    left: 264px;
    top: 62px;
    color: #333333;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    border: solid 1px #c2cbda;
    border-top: none;
    background-color: white;
    text-indent: 22px;
  }

  .well-e-tube {
    width: 100%;
    height: 58px;
  }

  .well-e-tube:first-child {
    border-bottom: solid 1px #c2cbda;
  }
</style>
<style>
  .protocols-remark-div .el-textarea__inner {
    color: #333333;
    font-family: Arial;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
  }

  .new-basic-model .move-top,
  .new-basic-model .move-top div,
  .new-basic-model .move-top img,
  .new-basic-model .move-top input,
  .new-basic-model .move-top span,
  .new-basic-model .move-top textarea {
    touch-action: pan-y !important;
  }
</style>
