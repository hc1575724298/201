<template>
  <div class="tube-back" @click='closeTube'>
    <div class="tube-model">
      <div class="tube-title">
        {{tube_title}}
      </div>
      <div class="tube-content">
        <div class="tube-option">
          <div class="tube-brand">{{$t("language.volume_ml")}}:</div>
          <div class="tube-volume">
            <template>
              <div class="radio-5" style="margin-right: 20px;">
                <el-radio :label="1.5" v-model="volume">1.5ml</el-radio>
              </div>
              <div class="radio-10">
                <el-radio :label="2" v-model="volume">2ml</el-radio>
              </div>
              <div class="radio-10">
                <el-radio :label="5" v-model="volume">5ml</el-radio>
              </div>
              <div class="radio-10">
                <el-radio :label="10" v-model="volume">10ml</el-radio>
              </div>
            </template>
          </div>
          <div class="tube-brand">{{$t("language.brand")}}:</div>
          <div class="brand-tube brand" @click="Tube" ref="tube">{{brand}}
            <div class="img-down">
              <img src="../images/protocols/down-prto.png" class="img-model" />
              <div class="lists" v-if="lists_status">
                <div class="list-one" v-for="(item,index) in tube_lists" :key="index" @click="selectList(index)">
                  {{tube_lists[index].brand}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tube-img">
          <img src="../images/protocols/2ml.png" class="img-tube" v-if="volume==2" />
          <img src="../images/protocols/选择弹框-5或10.png" class="img-tube" v-else-if="volume==5" />
          <img src="../images/protocols/选择弹框-1.5ml.png" class="img-tube" v-else />
        </div>
      </div>
      <div class="tube-info-button">
        <div class="button-div save" @click.stop="okTube">{{this.$t("language.ok")}}</div>
        <div class="button-div factory" @click.stop="cancel">{{this.$t("language.cancel")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    searchLabwares
  } from '@/api/setting.js'
  export default {
    props: ['content_title'],
    data() {
      return {
        tube_title: null,
        tube_type: null,
        brand: null,
        volume: null,
        tube_lists: [],
        lists_status: false
      }
    },
    mounted() {
      this.getData()
    },
    watch:{
      'volume': {
        immediate: true,
        handler(newval, oldval) {
          searchLabwares({'volume':this.volume}).then((res)=>{
            this.tube_lists= res.data
            this.brand = this.tube_lists[0].brand
          })
        }
      }
    },
    methods: {
      closeTube(event) {
        if (!this.$refs.tube.contains(event.target)) {
          this.lists_status = false;
        }
      },
      getData() {
        if (this.content_title == 1) {
          this.tube_title = this.$t("language.wellA")
          this.volume = this.$store.getters.protocol.well_a.split('_', 1)[0].substring(0, this.$store.getters
            .protocol.well_a.split('_', 1)[0].length - 2)
          this.volume = Number(this.volume)
          this.brand = this.$store.getters.protocol.well_a.substring(this.$store.getters.protocol
            .well_a.split('_', 1)[0].length + 1)
        } else if (this.content_title == 2) {
          this.tube_title = this.$t("language.wellB")
          this.volume = this.$store.getters.protocol.well_b.split('_', 1)[0].substring(0, this.$store.getters
            .protocol.well_b.split('_', 1)[0].length - 2)
          this.volume = Number(this.volume)
          this.brand = this.$store.getters.protocol.well_b.substring(this.$store.getters.protocol
            .well_b.split('_', 1)[0].length + 1)
        } else if (this.content_title == 3) {
          this.tube_title = this.$t("language.wellC")
          this.volume = this.$store.getters.protocol.well_c.split('_', 1)[0].substring(0, this.$store.getters
            .protocol.well_c.split('_', 1)[0].length - 2)
          this.volume = Number(this.volume)
          this.brand = this.$store.getters.protocol.well_c.substring(this.$store.getters.protocol
            .well_c.split('_', 1)[0].length + 1)
        }
        searchLabwares({'volume':this.volume}).then((res)=>{
          this.tube_lists= res.data
        })
      },
      cancel() {
        this.$emit('close')
      },
      Tube() {
        this.lists_status = !this.lists_status;
      },
      selectList(index) {
        this.brand = this.tube_lists[index].brand
      },
      okTube() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (this.content_title == 1) {
          protocol.well_a = this.volume + "ml_" + this.brand;
        } else if (this.content_title == 2) {
          protocol.well_b = this.volume + "ml_" + this.brand;
        } else if (this.content_title == 3) {
          protocol.well_c = this.volume + "ml_" + this.brand;
        }
        this.$store.commit('setProtocol', protocol)
        this.$emit('close')
      },
    }
  }
</script>

<style scoped="scoped">
  .tube-back {
    position: absolute;
    display: flex;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.5);
    color: #333333;
  }

  .tube-model {
    width: 780px;
    position: relative;
    height: 570px;
    background-color: #ffffff;
    border-radius: 10px;
    font-size: 24px;
  }

  .tube-title {
    height: 66px;
    width: 740px;
    line-height: 65px;
    color: #4171bb;
    margin-left: 20px;
    border-bottom: solid 1px #c2cbda;
  }

  .brand-tube {
    width: 375px;
    height: 56px;
    background-color: #ffffff;
    border-radius: 2px;
    text-indent: 20px;
    line-height: 56px;
    border: solid 1px #c2cbda;
    position: relative;
  }

  .tube-content {
    width: 700px;
    margin-left: 80px;
    height: 280px;
  }

  .tube-option {
    float: left;
    width: 52%;
    height: 280px;
  }

  .tube-img {
    float: left;
    width: 48%;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .brand {
    margin-bottom: 48px;
  }

  .tube-brand {
    margin-top: 38px;
    margin-bottom: 18px;
  }

  .volume {
    background-color: #e4e4e4;
  }

  .img-tube {
    margin-top: 30px;
  }

  .tube-info-button {
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 30px;
  }

  .button-div {
    width: 150px;
    height: 100%;
    border-radius: 6px;
    line-height: 50px;
    font-size: 18px;
    text-align: center;
  }

  .save {
    float: right;
    margin-right: 81px;
    color: white;
    border-radius: 6px;
    background-color: #5187C3;
  }

  .factory {
    float: left;
    margin-left: 80px;
    border: solid 1px #2d60c7;
  }

  .sample-div {
    margin-top: 100px;
  }

  .radio-10 {
    float: left;
    margin-left: 60px;
  }

  .radio-5 {
    float: left;
  }

  .lists {
    z-index: 1000;
    position: absolute;
    height: 200px;
    width: 100%;
    bottom: -202px;
    background-color: #FFF;
    left: -1px;
    border: solid 1px #c2cbda;
    border-top: 0;
    overflow-y: auto;
    scroll-button: no-button;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .list-one {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #c2cbda;

  }

  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-thumb {
    width: 10px;
    height: 200px;
    background-color: #c2cbda !important;
    border-radius: 8px;
  }

  *::-webkit-scrollbar-track {
    background: #FFFFFF;
  }

  .list-one:hover {
    background-color: #deedfc;
    color: #5A89C7;
  }

  .tube-volume {
    height: fit-content;
    width: fit-content;
    margin-bottom: 100px;
  }
</style>
<style>
  .tube-option .el-radio__inner {
    border: 1px solid #DCDFE6;
    display: inline-block;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    background-color: #FFF;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .tube-option .el-radio__inner::after {
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-color: #FFF;
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
  }

  .tube-option .el-radio__label {
    position: absolute;
    display: inline-block;
    font-size: 24px;
    margin-top: 5px;
  }

  .img-down {
    float: right;
    margin-right: 16px;
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 16px;
  }

  .lists,
  .lists div {
    touch-action: pan-y;
  }
</style>
