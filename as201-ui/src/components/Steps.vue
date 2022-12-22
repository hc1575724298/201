<template>
  <div class="step-div">
    <div class="step-list">
      <div class="step-list-title">
        {{$t("language.step_list")}}
      </div>
      <div class="steps-lists">
        <div v-for="(item,index) in steps" :key="index" class="steps-all"
          :class="{'selected-step':select_step==item.id}" @click="changeStep(item.id)">
          <img src="../images/protocols/cantsave.png" v-if="judgeSave(item)" style="margin-left: 10px;" />
          <div class="item-id">{{item.id}}.</div>
          <div class="img-step-div"><img :src="item.src" class="img-step"></div>
          <div class="img-des">
            {{item.description}}
          </div>
        </div>
      </div>
      <div class="deal-step">
        <img src="../images/protocols/add-protocol.png" style="margin-left: 24px;" @click="isOpenAdd" />
        <img src="../images/protocols/delete-protocol.png" style="margin-left: 29px;" @click="deleteStep" />
        <img src="../images/protocols/rise-no.png" style="margin-left: 29px;" v-if="select_step==1" />
        <img src="../images/protocols/rise.png" style="margin-left: 29px;" v-else @click="riseStep" />
        <img src="../images/protocols/down-no.png" style="margin-left: 29px;" v-if="select_step==steps.length" />
        <img src="../images/protocols/down-sort.png" style="margin-left: 29px;" v-else @click="downStep" />
      </div>
    </div>
    <div class="step-model">
      <div class="step-title">
        <div v-if="$store.getters.protocol.steps.length!=0">
          <div class="step-title-basic" :class="{'selected':selected_title==1}" @click="changeOption(1)">
            {{$t("language.basic")}}
          </div>
          <div class="step-title-magnetic" :class="{'selected':selected_title==2}" @click="changeOption(2)"
            v-if="step_in.step_type=='lysis'||step_in.step_type=='bind'||step_in.step_type=='custom'||step_in.step_type=='wash'||step_in.step_type=='elution'">
            {{$t("language.magnetic")}}
          </div>
        </div>
      </div>
      <AddStep v-if="add_step_status" @close='closeAdd' @okAdd='newStep'></AddStep>
      <BasicIncubator v-if="step_in.step_type=='incubator'&&selected_title==1" :order='select_step'
        @changeName="changeStepName"></BasicIncubator>
      <BasicBind v-if="step_in.step_type=='bind'&&selected_title==1" :order='select_step' @changeName="changeStepName"
        :title_type='selected_title'>
      </BasicBind>
      <BasicBind v-if="step_in.step_type=='bind'&&selected_title==2" :order='select_step' @changeName="changeStepName"
        :title_type='selected_title'>
      </BasicBind>
      <BasicLysis v-if="step_in.step_type=='lysis'&&selected_title==1" :order='select_step' :title_type='selected_title'
        @changeName="changeStepName">
      </BasicLysis>
      <BasicLysis v-if="step_in.step_type=='lysis'&&selected_title==2" :order='select_step' :title_type='selected_title'
        @changeName="changeStepName">
      </BasicLysis>
      <BasicTransfer v-if="step_in.step_type=='transfer'&&selected_title==1" :order='select_step'
        :title_type='selected_title' @changeName="changeStepName">
      </BasicTransfer>
      <BasicWash v-if="step_in.step_type=='wash'&&selected_title==1" :order='select_step' @changeName="changeStepName"
        :title_type='selected_title'>
      </BasicWash>
      <BasicWash v-if="step_in.step_type=='wash'&&selected_title==2" :order='select_step' @changeName="changeStepName"
        :title_type='selected_title'>
      </BasicWash>
      <BasicElution v-if="step_in.step_type=='elution'&&selected_title==1" :order='select_step'
        @changeName="changeStepName" :title_type='selected_title'>
      </BasicElution>
      <BasicElution v-if="step_in.step_type=='elution'&&selected_title==2" :order='select_step'
        @changeName="changeStepName" :title_type='selected_title'>
      </BasicElution>
      <BasicDiscard v-if="step_in.step_type=='discard'&&selected_title==1" :order='select_step'
        @changeName="changeStepName" :title_type='selected_title'>
      </BasicDiscard>
      <BasicCustom v-if="step_in.step_type=='custom'&&selected_title==1" :order='select_step'
        @changeName="changeStepName" :title_type='selected_title'>
      </BasicCustom>
      <BasicCustom v-if="step_in.step_type=='custom'&&selected_title==2" :order='select_step'
        @changeName="changeStepName" :title_type='selected_title'>
      </BasicCustom>
      <BasicPause v-if="step_in.step_type=='pause'&&selected_title==1" :order='select_step' @changeName="changeStepName"
        :title_type='selected_title'>
      </BasicPause>
      <BasicLoop v-if="step_in.step_type=='loop'&&selected_title==1" :order='select_step' @changeName="changeStepName"
        :title_type='selected_title'></BasicLoop>
    </div>
  </div>
</template>

<script>
  import BasicBind from '@/components/BasicBind'
  import BasicIncubator from '@/components/BasicIncubator'
  import BasicLysis from '@/components/BasicLysis'
  import BasicTransfer from '@/components/BasicTransfer'
  import BasicWash from '@/components/BasicWash'
  import BasicElution from '@/components/BasicElution'
  import BasicCustom from '@/components/BasicCustom'
  import BasicDiscard from '@/components/BasicDiscard'
  import BasicPause from '@/components/BasicPause'
  import AddStep from '@/components/AddStep'
  import BasicLoop from '@/components/BasicLoop'
  export default {
    components: {
      BasicBind,
      BasicIncubator,
      BasicLysis,
      BasicTransfer,
      BasicWash,
      BasicElution,
      BasicCustom,
      BasicDiscard,
      BasicPause,
      AddStep,
      BasicLoop
    },
    data() {
      return {
        selected_title: 1,
        steps: [],
        select_step: 1,
        step_in: {},
        add_step_status: false,
        step: {
          aspirate_position: 0,
          beat_speed: 0,
          cycle: 0,
          destination_well: null,
          discard_mix_height: 0,
          discard_mix_time: 0,
          discard_mix_volume: 0,
          dispense_position: 0,
          drying_position: 0,
          drying_time: 0,
          every_magnetic_time: 0,
          expected_magnetic_total_time: 0,
          incubator_temperature: 0,
          incubator_time: 0,
          interval_stay_time: 0,
          liquid_level_magnetic_time: 0,
          lowest_magnetic_position: 0,
          magnet_on: 0,
          magnet_type: null,
          magnetic_speed: 0,
          mix_height: 0,
          mix_number_before_aspirating: 0,
          mix_speed: 0,
          mix_time: 0,
          mix_volume: 0,
          order: 0,
          pre_cooling: 0,
          pre_heating: 0,
          pre_heating_seconds: 0,
          segments: 0,
          step_name: null,
          step_run_time: 0,
          temperature: 0,
          temperature_on: 0,
          tips: null,
          type: null,
          volume: 0,
          well: null,
        },
      }
    },
    mounted() {
      this.getSteps()
    },
    watch: {
      'steps': {
        handler(newVal) {
          let haveError = false;
          for (let i = 0; i < newVal.length; i++) {
            if (this.judgeSave(newVal[i])) {
              haveError = true;
            }
          }
          if (haveError == true) {
            this.$store.commit('setSaveProrocolStatus', 0)
          } else {
            this.$store.commit('setSaveProrocolStatus', 1)
          }
        },
        deep: true,
      }
    },
    methods: {
      changeOption(type) {
        this.selected_title = type
      },
      getSteps() {
        if (this.$store.getters.protocol.steps.length != 0) {
          this.steps = [];
          for (var i = 0; i < this.$store.getters.protocol.steps.length; i++) {
            let step_info = {};
            step_info.id = this.$store.getters.protocol.steps[i].order + 1;
            step_info.description = this.$store.getters.protocol.steps[i].step_name;
            step_info.type = this.$store.getters.protocol.steps[i].type;
            step_info.flag_times = 0;
            if (this.$store.getters.protocol.steps[i].type == 'incubator') {
              step_info.src = require("../images/protocols/incubator.png")
            } else if (this.$store.getters.protocol.steps[i].type == 'transfer') {
              step_info.src = require("../images/protocols/transfer.png")
            } else if (this.$store.getters.protocol.steps[i].type == 'lysis') {
              step_info.src = require("../images/protocols/lysis.png")
            } else if (this.$store.getters.protocol.steps[i].type == 'bind') {
              step_info.src = require("../images/protocols/bind.png")
            } else if (this.$store.getters.protocol.steps[i].type == 'elution') {
              step_info.src = require("../images/protocols/elution.png")
            } else if (this.$store.getters.protocol.steps[i].type == 'custom') {
              step_info.src = require("../images/protocols/custom.png")
            } else if (this.$store.getters.protocol.steps[i].type == 'wash') {
              step_info.src = require("../images/protocols/wash.png")
            } else if (this.$store.getters.protocol.steps[i].type == 'discard') {
              step_info.src = require("../images/protocols/discard.png")
            } else if (this.$store.getters.protocol.steps[i].type == 'pause') {
              step_info.src = require("../images/protocols/pause.png")
            } else if (this.$store.getters.protocol.steps[i].type == 'loop') {
              step_info.src = require("../images/protocols/loopList.png")
            }
            this.steps.push(step_info)
          }
          if (this.$store.getters.protocol.steps.length != 0) {
            this.step_in.step_type = this.$store.getters.protocol.steps[0].type
          }
        }
      },
      changeStep(type) {
        this.select_step = type
        this.selected_title = 1
        this.step_in.step_type = JSON.parse(JSON.stringify(this.$store.getters.protocol.steps[type - 1].type))
      },
      changeStepName() {
        this.steps[this.select_step - 1].description = this.$store.getters.protocol.steps[this.select_step - 1]
          .step_name;
      },
      isOpenAdd() {
        this.add_step_status = true
      },
      closeAdd() {
        this.add_step_status = false
      },
      newStep(type) {
        this.add_step_status = false
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (protocol.steps.length == 99) {
          return null
        } else {
          this.step.type = type
          this.step.order = protocol.steps.length
          if (type == 'incubator') {
            this.step.well = '1'
            this.step.incubator_temperature = '90.0'
            this.step.incubator_time = '20.0'
            if (this.$store.getters.languageCode == 0) {
              this.step.step_name = '孵育'
            } else if (this.$store.getters.languageCode == 1) {
              this.step.step_name = 'Incubator'
            }
          } else if (type == 'transfer') {
            this.step.well = 'A'
            this.step.destination_well = '1'
            this.step.volume = '200'
            this.step.basic_labware = 0
            if (this.$store.getters.languageCode == 0) {
              this.step.step_name = '移液'
            } else if (this.$store.getters.languageCode == 1) {
              this.step.step_name = 'Transfer'
            }
            let liquid = {}
            liquid.type = "sample"
            liquid.aspirate_speed = 500
            liquid.aspirate_acceleration = 300
            liquid.aspirate_delay = 0.5
            liquid.aspirate_position = 2
            liquid.dispense_speed = 500
            liquid.dispense_acceleration = 300
            liquid.dispense_delay = 0.5
            liquid.dispense_position = 2
            liquid.prewetting = 1
            liquid.blow_liquid_volume = 10
            liquid.air_gap_volume = 10
            liquid.mix_before_aspirating_on = 1
            liquid.segments = 1
            liquid.every_mix_times = 5
            liquid.mix_volume = 200
            liquid.mix_speed = 10
            this.step.liquid = liquid
            this.step.liquid_info = JSON.stringify(liquid)
          } else if (type == 'lysis'||type == 'bind'||type=='elution'||type=='wash'||type=='custom') {
            this.step.well = '1'
            this.step.volume = 1000
            this.step.basic_labware = 0
            this.step.mix_segments = 1
            this.step.every_mix_times = 5
            this.step.mix_speed = 100
            this.step.mix_moving_speed = 100
            this.step.mix_volume = 200
            this.step.temperature_on = '1'
            this.step.temperature = '90.0'
            this.step.pre_heating = '1'
            this.step.pre_heating_seconds = '1'
            this.step.magnet_on = '1'
            this.step.magnet_labware = '1'
            this.step.segments = '1'
            this.step.interval_stay_time = '1'
            this.step.cycle = '1'
            this.step.every_magnetic_times = '1'
            this.step.liquid_level_magnetic_times = '1'
            this.step.magnetic_speed = '1'
            this.step.lowest_magnetic_position = '0'
            this.step.drying_time = '100'
            this.step.drying_position = '45'
            this.step.drying_speed = '1'
            this.step.drying_volume = '500'
            this.step.drying_position = '45'
            this.step.drying_on = 1
            if (this.$store.getters.languageCode == 0) {
              if(type=='lysis'){
                this.step.step_name = '裂解'
              }else if(type=='elution'){
                this.step.step_name = '洗脱'
              }else if(type=='bind'){
                this.step.step_name = '结合'
              }else if(type=='elution'){
                this.step.step_name = '洗涤'
              }else if(type=='custom'){
                this.step.step_name = '自定义'
              }
            }else if (this.$store.getters.languageCode == 1) {
              if(type=='lysis'){
                this.step.step_name = 'Lysis'
              }else if(type=='elution'){
                this.step.step_name = 'Elution'
              }else if(type=='bind'){
                this.step.step_name = 'Bind'
              }else if(type=='wash'){
                this.step.step_name = 'Wash'
              }else if(type=='custom'){
                this.step.step_name = 'Custom'
              }
            }
          } else if (type == 'discard') {
            this.step.well = '2'
            this.step.basic_labware = 0
            this.step.mix_time = 100
            this.step.volume = '1000'
            this.step.mix_speed = 100
            this.step.mix_volume = '200'
            this.step.mix_segments = 1
            this.step.every_mix_times = 1
            if (this.$store.getters.languageCode == 0) {
              this.step.step_name = '弃磁'
            } else if (this.$store.getters.languageCode == 1) {
              this.step.step_name = 'Discard'
            }
          } else if (type == 'pause') {
            this.step.tips = 'add reagent'
          } else if (type == 'loop') {
            this.step.step_name = 'Loop(-)X1'
            this.step.loop_to = null
            this.step.loop_from = null
            this.step.loop_cycle = 1
            this.step.loop_status = 1
          }
          protocol.steps.splice(this.select_step, 0, this.step)
          for (var i = 0; i < protocol.steps.length; i++) {
            protocol.steps[i].order = i;
          }
          this.$store.commit('setProtocol', protocol)
          this.getSteps()
        }
      },
      deleteStep() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.steps.splice(this.select_step - 1, 1)
        for (var i = 0; i < protocol.steps.length; i++) {
          protocol.steps[i].order = i;
        }
        this.$store.commit('setProtocol', protocol)
        this.getSteps()
        this.changeStep(this.select_step)
      },
      riseStep() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        var temp;
        protocol.steps[this.select_step - 1].order = protocol.steps[this.select_step - 1].order - 1
        temp = protocol.steps[this.select_step - 1]
        protocol.steps[this.select_step - 2].order = protocol.steps[this.select_step - 2].order + 1
        protocol.steps[this.select_step - 1] = protocol.steps[this.select_step - 2]
        protocol.steps[this.select_step - 2] = temp
        this.$store.commit('setProtocol', protocol)
        this.getSteps()
        this.select_step = this.select_step - 1
        this.step_in.step_type = this.$store.getters.protocol.steps[this.select_step - 1].type
      },
      downStep() {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        var temp;
        protocol.steps[this.select_step - 1].order = protocol.steps[this.select_step - 1].order + 1
        temp = protocol.steps[this.select_step - 1]
        protocol.steps[this.select_step].order = protocol.steps[this.select_step].order - 1
        protocol.steps[this.select_step - 1] = protocol.steps[this.select_step]
        protocol.steps[this.select_step] = temp
        this.$store.commit('setProtocol', protocol)
        this.getSteps()
        this.select_step = this.select_step + 1
        this.step_in.step_type = this.$store.getters.protocol.steps[this.select_step - 1].type
      },
      getStatus(type) {
        this.img_status = type
      },
      judgeSave(item) {
        let value = null
        let cycle = [];
        var steps = JSON.parse(JSON.stringify(this.steps))
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        for (var i = 0; i < protocol.steps.length; i++) {
          if (protocol.steps[i].type == 'loop') {
            var step = JSON.parse(JSON.stringify(protocol.steps[i]))
            cycle.push(step)
          }
        }
        if (item.type == 'loop') {
          if (protocol.steps[item.id - 1].loop_to >= protocol.steps[item.id - 1]
            .order && protocol.steps[item.id - 1].loop_from <= protocol.steps[item.id - 1].order) {
            value = true
          } else {
            value = false
          }
          for (var i = protocol.steps[item.id - 1].loop_from; i <= protocol
            .steps[item.id - 1].loop_to; i++) {
            if (i == null) {
              break
            }
            if (protocol.steps[i].type == 'loop') {
              value = true
              break
            }
          }
          for (var j = 0; j < cycle.length; j++) {
            var from = protocol.steps[cycle[j].order].loop_from
            var to = protocol.steps[cycle[j].order].loop_to
            if (from == null && to != null) {
              if (steps[to].flag_times == 1) {
                value = true
                break
              } else {
                steps[to].flag_times++;
              }
            } else if (to == null && from != null) {
              if (steps[from].flag_times == 1) {
                value = true
                break
              } else {
                steps[from].flag_times++;
              }
            } else if (to == null && from == null) {} else {
              for (var i = from; i <= to; i++) {
                if (steps[i].flag_times == 1) {
                  value = true
                  break
                } else {
                  steps[i].flag_times++
                }
              }
            }
          }
        }
        return value
      }
    }
  }
</script>

<style scoped="scoped">
  .step-div {
    width: 1685px;
    height: 1048px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
  }

  .step-list {
    float: left;
    width: 377px;
    height: 100%;
    box-sizing: border-box;
    border-right: solid 1px #c2cbda;
  }

  .step-model {
    float: left;
    width: 1308px;
    height: 100%;
  }

  .step-list-title {
    font-size: 24px;
    line-height: 72px;
    height: 72px;
    text-indent: 28px;
    border-bottom: solid 1px #c2cbda;
  }

  .step-title {
    font-size: 24px;
    height: 72px;
    border-bottom: solid 1px #c2cbda;
  }

  .step-title-basic {
    float: left;
    margin-left: 37px;
    height: 100%;
    width: fit-content;
    line-height: 72px;
  }

  .step-title-magnetic {
    float: left;
    margin-left: 50px;
    height: 100%;
    width: fit-content;
    line-height: 72px;
  }

  .img-des {
    margin-left: 26px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 200px;
    height: 100%;
    flex-shrink: 0;
  }

  .selected {
    color: #4c7cb2;
    box-sizing: border-box;
    border-bottom: solid 2px #4C7CB2;
  }

  .steps-lists {
    height: 877px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 100%;
  }

  .steps-all {
    width: 100%;
    font-size: 24px;
    line-height: 93px;
    display: flex;
    align-items: center;
    height: 93px;
  }

  .selected-step {
    background-color: #e1f0ff;
    border: solid 1px #4171bb;
    box-sizing: border-box;
    line-height: 91px;
  }

  .deal-step {
    height: 99px;
    width: 100%;
    border-top: solid 1px #c2cbda;
    display: flex;
    align-items: center;
  }

  .img-step-div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    flex-shrink: 0;
  }

  .item-id {
    margin-left: 28px;
    margin-right: 10px;
    width: 30px;
    height: 100%;
    flex-shrink: 0;
  }

  *::-webkit-scrollbar {
    width: 10px;
    height: 100px;
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

  .steps-lists,
  .steps-lists div {
    touch-action: pan-y !important;
  }
</style>
