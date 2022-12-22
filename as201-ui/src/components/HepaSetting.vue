<template>
  <div class="hepa-div">
    <div class="hepa-option-div">
      <div class="title-option-div">
        {{titleName}}
      </div>
      <div class="option-circle-div" v-if="optionType==1">
        <div class="option-circle-model">
          <div class="option-circle" @click="selectHepa(1)" :class="{'select-option':option_temp==1||option_temp==4}">
            <div class="selected-option"></div>
          </div>
          <div style="margin-left: 32px;">{{$t("language.switch_during")}}</div>
        </div>
        <div class="option-circle-model">
          <div class="option-circle" @click="selectHepa(2)" :class="{'select-option':option_temp==2}">
            <div class="selected-option"></div>
          </div>
          <div style="margin-left: 32px;">{{$t("language.switch_on")}}</div>
        </div>
        <div class="option-circle-model">
          <div class="option-circle" @click="selectHepa(3)" :class="{'select-option':option_temp==3}">
            <div class="selected-option"></div>
          </div>
          <div style="margin-left: 32px;">{{$t("language.switch_off")}}</div>
        </div>
      </div>
      <div class="option-circle-div" v-if="optionType==2">
        <div class="option-circle-model">
          <div class="option-circle" @click="selectHepa(1)" :class="{'select-option':option_temp==1}">
            <div class="selected-option"></div>
          </div>
          <div style="margin-left: 32px;">{{$t("language.switch_during_immediately")}}</div>
        </div>
        <div class="option-circle-model">
          <div class="option-circle" @click="selectHepa(4)" :class="{'select-option':option_temp==4}">
            <div class="selected-option"></div>
          </div>
          <div style="margin-left: 32px;">{{$t("language.switch_during_open")}}</div>
        </div>
      </div>
      <div class="ok-cancel-div">
        <div class="ok-cancel-model ok" @click="okHepa()">{{$t("language.ok")}}</div>
        <div class="ok-cancel-model cancel" @click="cancelHepa()">{{$t("language.cancel")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {saveSetting} from '@/api/setting.js'
  export default {
    props: ['optionType', 'option'],
    data() {
      return {
        titleName: null,
        option_temp:null,
        setting: [{
          key: 'hepa_filter',
          value: null
        }]
      }
    },
    mounted() {
      this.getContent()
    },
    methods: {
      getContent() {
        if (this.optionType == 1) {
          this.titleName = this.$t("language.hepa_filter_setting")
        }else if(this.optionType == 2){
          this.titleName = this.$t("language.switch_off_run")
        }
        this.option_temp = this.option
      },
      cancelHepa(){
        this.$emit('close')
      },
      selectHepa(type){
        this.option_temp = type
        if(type==1){
           this.setting[0].value = 3
        }else if(type==2){
          this.setting[0].value = 1
        }else if(type==3){
          this.setting[0].value = 2
        }else if(type==4){
          this.setting[0].value = 4
        }
      },
      okHepa(){
        saveSetting({setting:JSON.stringify(this.setting)}).then((res=>{
        }))
        this.$emit('close')
      }
    }
  }
</script>

<style scoped="scoped">
  .hepa-div {
    position: absolute;
    height: 100%;
    z-index: 1000;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0%;
    left: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .hepa-option-div {
    position: relative;
    width: 640px;
    height: 360px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 1px #707070;
  }

  .title-option-div {
    margin-left: 20px;
    width: 600px;
    height: 70px;
    font-size: 26px;
    line-height: 70px;
    border-bottom: 1px solid;
    color: #4c7cb2;
  }

  .option-circle-div {
    margin-top: 28px;
    margin-left: 89px;
  }

  .option-circle {
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    border: solid 1px #5691d3;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
  }

  .option-circle-model {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #282828;
    margin-bottom: 30px;
  }

  .selected-option {
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: #ffffff;
  }

  .ok-cancel-div {
    position: absolute;
    height: 50px;
    width: 100%;
    bottom: 26px;
  }

  .ok-cancel-model {
    float: right;
    width: 150px;
    height: 100%;
    line-height: 50px;
    border-radius: 6px;
    text-align: center;
    font-size: 18px;
  }
  .cancel{
    margin-right: 24px;
    color: #333333;
    border: solid 1px #2d60c7;
  }
  .ok{
    background-color: #538BC9;
    color: white;
    margin-right: 42px;
  }
  .select-option{
    background-color: #5691d3;
  }
</style>
