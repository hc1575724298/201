<template>
  <div class="model">
    <div class="step-name">
      {{$t("language.from")}}:
      <div class="select-well" @click.stop="isArraw('from')" ref="well1">
        <span v-if="loop.loop_from!=null">S</span>{{loop.loop_from}}<img src="../images/protocols/down-prto.png"
          class="arraw-well" />
      </div>
      <div class="select-list" v-if="from_status">
        <div class="arrawclass" @click="selectWell('from',item.order)" v-for="(item,index) in step_lists" :key="index">
          S{{item.order+1}}</div>
      </div>
    </div>
    <div class="step-name">
      {{$t("language.to")}}:
      <div class="select-well" @click.stop="isArraw('to')" ref="well1">
        <span v-if="loop.loop_to!=null">S</span>{{loop.loop_to}}<img src="../images/protocols/down-prto.png"
          class="arraw-well" />
      </div>
      <div class="select-list" v-if="to_status">
        <div class="arrawclass" @click="selectWell('to',item.order)" v-for="(item,index) in step_lists" :key="index">
          S{{item.order+1}}</div>
      </div>
    </div>
    <div class="step-name">
      {{$t("language.cycle")}}(1-99):
      <input
        class="input-step-name"
        @focus="onfocusNum(loop.loop_cycle, $event)"
        v-model="loop.loop_cycle"
        @blur="saveData()" />
    </div>

    <NumberKeyboard
      class="searchKeyboardNumber"
      v-if="isShowNumberKeyboard"
      :input="input"
      @onChange="onChangeNum"
      @onKeyPress="onKeyPressNum"
      @colseKeyboard="colseKeyboardNum"
      @mousedown.native="$event.preventDefault();" />
  </div>
</template>

<script>
  import NumberKeyboard from "@/components/NumberKeyboard.vue";
  import MixinsNumberKeyboard from "@/mixins/numberkeyboard.js";
  export default {
    props: ['order'],
    components:{ NumberKeyboard },
    mixins: [MixinsNumberKeyboard],
    data() {
      return {
        loop: {},
        from_status: false,
        to_status: false,
        step_lists: []
      }
    },
    watch: {
      order: {
        immediate: true,
        handler(newval, oldval) {
          this.getData();
        }
      }
    },
    mounted() {
      this.getData()
      document.addEventListener('click', this.closeSelect);
    },
    methods: {
      getData() {
        this.loop = JSON.parse(JSON.stringify(this.$store.getters.protocol.steps[this.order - 1]))
        if (this.loop.loop_from == null && this.loop.loop_to == null) {}
        else if(this.loop.loop_from != null && this.loop.loop_to == null)
        {
          this.loop.loop_from = this.loop.loop_from + 1
        }else if(this.loop.loop_from == null && this.loop.loop_to != null){
          this.loop.loop_to = this.loop.loop_to + 1
        }else{
          this.loop.loop_to = this.loop.loop_to + 1
           this.loop.loop_from = this.loop.loop_from + 1
        }
      },
      saveData() {
        if(this.loop.loop_cycle>=99){
          this.loop.loop_cycle=99
        }else if(this.loop.loop_cycle<=1){
          this.loop.loop_cycle=1
        }
        if (this.loop.loop_from == null && this.loop.loop_to != null) {
          this.loop.step_name = 'Loop(' + '-S' + this.loop.loop_to + ')x' + this.loop.loop_cycle
        }else if(this.loop.loop_from != null && this.loop.loop_to == null){
          this.loop.step_name = 'Loop(S' + this.loop.loop_from + '-' + ')x' + this.loop.loop_cycle
        }else{
          this.loop.step_name = 'Loop(S' + this.loop.loop_from + '-S' + this.loop.loop_to + ')x' + this.loop.loop_cycle
        }
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        protocol.steps[this.order - 1] = JSON.parse(JSON.stringify(this.loop))
        if(this.loop.loop_to==null&&this.loop.loop_from!=null){
          protocol.steps[this.order - 1].loop_from -= 1
        }else if(this.loop.loop_to!=null&&this.loop.loop_from==null){
          protocol.steps[this.order - 1].loop_to -= 1
        }else{
          protocol.steps[this.order - 1].loop_from -= 1
          protocol.steps[this.order - 1].loop_to -= 1
        }
        this.$store.commit('setProtocol', protocol)
        this.$emit('changeName')
        this.isShowNumberKeyboard = false
        this.onChangeCount = 0
      },
      isArraw(type) {
        this.step_lists = []
        var length = this.$store.getters.protocol.steps.length
        for (var i = 0; i < length; i++) {
          if (this.$store.getters.protocol.steps[i].type != 'loop') {
            this.step_lists.push(this.$store.getters.protocol.steps[i])
          }
        }
        if (type == 'from') {
          this.from_status = !this.from_status
          this.to_status = false
        } else {
          this.to_status = !this.to_status
          this.from_status = false
        }
      },
      selectWell(type, order) {
        let cycle = [];
        if (type == 'from') {
          this.loop.loop_from = order + 1
        } else {
          this.loop.loop_to = order + 1
        }
        if (this.loop.loop_from > this.loop.loop_to && this.loop.loop_from != null && this.loop.loop_to != null) {
          this.loop.loop_from = this.loop.loop_to
        }
        this.saveData()
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        for (var i = 0; i < protocol.steps.length; i++) {
          if (protocol.steps[i].type == 'loop') {
            cycle.push(protocol.steps[i])
          } else {
            protocol.steps[i].loop_status = 0
          }
        }
        for (var i = 0; i < protocol.steps.length; i++) {
          if (protocol.steps[i].type != 'loop') {
            for (var j = 0; j < cycle.length; j++) {
              if (protocol.steps[i].order >= Number(cycle[j].loop_from) && protocol.steps[i].order <= Number(cycle[j]
                  .loop_to)) {
                if (protocol.steps[i].loop_status == 0) {
                  protocol.steps[i].loop_status = 1
                } else {
                  this.$message({
                    type: 'error',
                    message: "有重复循环"
                  })
                }
              }
            }
          }
        }
        this.$store.commit('setProtocol', protocol)
      },
      closeSelect(event) {
        if (!this.$refs.well1.contains(event.target)) {
          this.from_status = false
          this.to_status = false
        }
      },
    },
    destroyed() {
      document.removeEventListener('click', this.closeSelect);
    }
  }
</script>

<style scoped="scoped">
.searchKeyboardNumber {
  left: 830px !important;
  bottom: 140px !important;
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

  .arrawclass {
    border-top: 1px solid #c2cbda;
    text-align: center;
  }
</style>
