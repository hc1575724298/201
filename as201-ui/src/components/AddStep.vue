<template>
  <div class="add-step-model">
    <div class="add-step-div">
      <div class="add-step-title">
        {{$t("language.add_step")}}
      </div>
      <div class="add-step-content">
        <div v-for="(item,index) in step_imgs" :key="index" class="step-div" @click="changeStep(item.id)">
          <div class="step-img">
            <img :src="item.src" v-if="select_option!=item.id" />
            <img :src="item.select_src" v-if="select_option==item.id" />
          </div>
          <div class="step-div-text">
            {{item.description}}
          </div>
        </div>
        <div  class="step-div" @click="changeStep(loop.id)">
          <div class="step-img">
            <img :src="loop.src" v-if="select_option!=loop.id && $store.getters.protocol.steps.length!=0" />
            <img :src="loop.select_src" v-if="select_option==loop.id && $store.getters.protocol.steps.length!=0" />
            <img src="../images/protocols/cantLoop.png" v-if="$store.getters.protocol.steps.length==0" />
          </div>
          <div class="step-div-text" :class="{'cant-loop':$store.getters.protocol.steps.length==0}">
            {{loop.description}}
          </div>
        </div>
      </div>
      <div class="cancel-ok">
        <div class="ok" @click="okAdd">
          {{$t("language.ok")}}
        </div>
        <div class="cancel" @click="cancelAdd">
          {{$t("language.cancel")}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        step_imgs: [{
          id: 1,
          src: require("../images/protocols/incubator-add.png"),
          description: this.$t("language.incubator"),
          select_src: require("../images/protocols/selected-incubator.png")
        }, {
          id: 2,
          src: require("../images/protocols/transfer-add.png"),
          description: this.$t("language.transfer"),
          select_src: require("../images/protocols/selected-transfer.png")
        }, {
          id: 3,
          src: require("../images/protocols/lysis-add.png"),
          description: this.$t("language.lysis"),
          select_src: require("../images/protocols/selected-lysis.png")
        }, {
          id: 4,
          src: require("../images/protocols/blind-add.png"),
          description: this.$t("language.bind"),
          select_src: require("../images/protocols/selected-bind.png")
        }, {
          id: 5,
          src: require("../images/protocols/wash-add.png"),
          description: this.$t("language.wash"),
          select_src: require("../images/protocols/selected-wash.png")
        }, {
          id: 6,
          src: require("../images/protocols/elution-add.png"),
          description: this.$t("language.elution"),
          select_src: require("../images/protocols/selected-elution.png")
        }, {
          id: 7,
          src: require("../images/protocols/discard-add.png"),
          description: this.$t("language.discard"),
          select_src: require("../images/protocols/selected-discard.png")
        }, {
          id: 8,
          src: require("../images/protocols/pause-add.png"),
          description: this.$t("language.pause"),
          select_src: require("../images/protocols/selected-pause.png")
        }, {
          id: 9,
          src: require("../images/protocols/custom-add.png"),
          description: this.$t("language.custom"),
          select_src: require("../images/protocols/selected-custom.png")
        }],
        loop:{
          id: 10,
          src: require("../images/protocols/loop.png"),
          description: this.$t("language.loop"),
          select_src: require("../images/protocols/loopSelected.png")
        },
        select_option: 1,
        type:'incubator'
      }
    },
    mounted() {

    },
    methods: {
      changeStep(id) {
        if(this.$store.getters.protocol.steps.length==0&&id==10){
          return
        }
        this.select_option = id;
      },
      okAdd() {
        if (this.select_option == 1) {
          this.type = 'incubator'
        } else if (this.select_option == 2) {
           this.type = 'transfer'
        } else if (this.select_option == 3) {
           this.type = 'lysis'
        } else if (this.select_option == 4) {
           this.type = 'bind'
        } else if (this.select_option == 5) {
           this.type = 'wash'
        } else if (this.select_option == 6) {
           this.type = 'elution'
        } else if (this.select_option == 7) {
           this.type = 'discard'
        } else if (this.select_option == 8) {
           this.type = 'pause'
        } else if (this.select_option == 9) {
           this.type = 'custom'
        }else if (this.select_option == 10) {
           this.type = 'loop'
        }
        this.$emit('okAdd', this.type)
      },
      cancelAdd() {
        this.$emit('close')
      },
    },
  }
</script>

<style scoped="scoped">
  .add-step-model {
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

  .add-step-div {
    width: 997px;
    height: 780px;
    background-color: #ffffff;
    border-radius: 10px;
    position: relative;
  }

  .add-step-title {
    border-bottom: solid 1px #c2cbda;
    width: 967px;
    height: 74px;
    box-sizing: border-box;
    margin-left: 27px;
    font-size: 28px;
    color: #4171bb;
    line-height: 74px;
  }

  .add-step-content {
    width: 843px;
    margin-left: 77px;
    height: 567px;
    /* background-color: #4171bb; */
    margin-top: 45px;
  }

  .step-div {
    height: 147px;
    width: 110px;
    float: left;
    margin-right: 130px;
    flex-direction: row;
    margin-bottom: 60px;
  }

  .step-div:nth-child(4n+0) {
    margin-right: 0px;
    float: right;
  }

  .step-img {
    width: 110px;
    height: 105px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-bottom: 12px;
  }

  .step-div-text {
    font-size: 26px;
    width: 100%;
    text-align: center;
  }

  .cancel-ok {
    position: absolute;
    width: 100%;
    height: 58px;
    bottom: 30px;
    font-size: 24px;
  }

  .cancel {
    width: 180px;
    height: 100%;
    float: right;
    margin-right: 30px;
    border: solid 1px #4c7cb2;
    line-height: 58px;
    text-align: center;
    border-radius: 6px;
  }

  .ok {
    float: right;
    width: 180px;
    height: 100%;
    margin-right: 34px;
    line-height: 58px;
    text-align: center;
    background-color: #548CCC;
    color: white;
    border-radius: 6px;
  }
  .cant-loop{
    color: #d1d1d1;
  }
</style>
