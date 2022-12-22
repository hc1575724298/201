<template>
  <div class="search-protocols">
    <div :class="['search-model',isShowKeyboardPass||isShowKeyboardUser?'move-top':'']">
      <div class="search-title">
        {{search_protocols}}
      </div>
      <div class="search-content">
        <div class="search-input">
          <div class="search-input-text">{{$t("language.protocols_name")}}</div>
          <div class="search-input-div">
            <input
            class="input-model"
            v-model="condition.protocol_name"
            @focus="onfocus('protocols',condition.protocol_name,$event)"
            maxlength="15"
            @input="condition.protocol_name = condition.protocol_name.replace(/[^\w\u4E00-\u9FA5_]/g,'' )"
            @blur="onblur('protocols')"
            />
          </div>
        </div>
        <div class="search-input">
          <div class="search-input-text">{{$t("language.protocols_user_name")}}</div>
          <div class="search-input-div">
            <input class="input-model"
             v-model="condition.user_name"
              @focus="onfocus('user',condition.user_name,$event)"
              @input="condition.user_name = condition.user_name.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')"
              @blur="onblur('user')"
              />
          </div>
        </div>
        <div class="search-input">
          <div class="search-input-text">{{$t("language.start_date")}}</div>
          <div class="date-input-div" style="position: relative;">
            <el-date-picker class="calendar" v-model="condition.start_time" type="date" :clearable="false"
              format="MM/dd/yyyy" popper-class="data-picker1" :editable="false">
            </el-date-picker>
            <div class="img-div" @click="showCalendar(0)"><img src="../images/protocols/calendar.png"
                class="img-date" /></div>
          </div>
        </div>
        <div class="search-input">
          <div class="search-input-text">{{$t("language.ending_date")}}</div>
          <div class="date-input-div" style="position: relative;">
            <el-date-picker class="calendar" v-model="condition.end_time" type="date" :clearable="false"
              format="MM/dd/yyyy" popper-class="data-picker2"  :editable="false">
            </el-date-picker>
            <div class="img-div" @click="showCalendar(1)"><img src="../images/protocols/calendar.png"
                class="img-date" /></div>
          </div>
        </div>
      </div>

      <div class="ok-cancel-div">
        <div class="ok-cancel-model ok" @mousedown="okSearch()">{{$t("language.ok")}}</div>
        <div class="ok-cancel-model cancel" @mousedown="cancelSearch()">{{$t("language.cancel")}}</div>
      </div>
    </div>
     <!-- 键盘 protocols -->
     <SimpleKeyboard
     class="searchKeyboard"
     v-if="isShowKeyboardPass"
     :input="input"
     @onChange="onChangePass"
     @onKeyPress="onKeyPress"
     @colseKeyboard="colseKeyboard('protocols')"
     @mousedown.native="$event.preventDefault();"
     />
     <!-- 键盘 user-->
     <SimpleKeyboard
     class="searchKeyboard"
     v-if="isShowKeyboardUser"
     :input="input"
     @onChange="onChangeUser"
     @onKeyPress="onKeyPress"
     @colseKeyboard="colseKeyboard('user')"
     @mousedown.native="$event.preventDefault();"
     />
  </div>
</template>

<script>
import SimpleKeyboard from "@/components/SimpleKeyboard";
import MixinUserAndPassKeyboard from "@/mixins/userAndPassKeyboard.js";
  export default {
    props:['Time_merge'],
    mixins: [MixinUserAndPassKeyboard],
    data() {
      return {
        condition: {
          protocol_name: null,
          user_name: null,
          start_time: null,
          end_time: null
        },
        search_protocols: this.$t("language.search_protocols"),
      }
    },
    components:{
      SimpleKeyboard
    },
    mounted() {
      this.getTime()
    },
    methods: {
      getTime(){
        this.condition.start_time = this.Time_merge.start_time
        this.condition.end_time = this.Time_merge.end_time
        this.condition.protocol_name = this.Time_merge.protocol_name
        this.condition.user_name = this.Time_merge.user_name
      },
      cancelSearch() {
        this.$emit('closeSearch')
      },
      showCalendar(type) {
        let elInput = document.getElementsByClassName('el-input__inner')[type];
        elInput.focus();
      },
      okSearch() {
        this.$emit('okSearchProtocol', this.condition)
      },

    onChangeUser (input) {
      this.onchangeCount++;
      let inputNew =input.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,'')
      if(inputNew.length>16) return
      this.inputValue(inputNew)
    },
    onChangePass (input) {
      this.onchangeCount++;
      let inputNew =input.replace(/[^\w\u4E00-\u9FA5_]/g,'' )
      if(inputNew.length>15) return
      this.inputValue(inputNew)
    },
    onblur(val){
      val==='user'? this.isShowKeyboardUser= false : this.isShowKeyboardPass= false;
      this.onchangeCount=0
    }
    },
  }
</script>

<style scoped="scoped">
  .search-protocols {
    z-index: 1000;
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0%;
    left: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-model {
    width: 660px;
    height: 450px;
    background-color: #ffffff;
    border-radius: 8px;
  }
  .move-top {
    position: relative;
    left: 0;
    top: -210px;
  }
 .searchKeyboard {
  position: absolute !important;
  bottom: 70px !important;
  left: 210px !important;
 }
  .search-title {
    width: 620px;
    height: 70px;
    font-size: 26px;
    line-height: 70px;
    border-bottom: 1px solid;
    color: #4c7cb2;
    margin-left: 20px;
    margin-bottom: 20px;
  }

  .search-input {
    height: 46px;
    width: 100%;
    line-height: 46px;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .search-input-text {
    width: 35%;
    float: left;
  }

  .search-input-div {
    width: 65%;
    float: right;
    display: flex;
    justify-self: flex-end;
  }

  .date-input-div {
    width: 65%;
    float: right;
  }

  .calendar {
    /* margin-left: 20px; */
    float: right;
    width: 320px;
    height: 46px;
    position: relative;
  }

  .input-model {
    width: 320px;
    height: 46px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    margin-left: 23px;
    color: #666666;
    text-indent: 20px;
  }

  .ok-cancel-div {
    height: 50px;
    width: 100%;
    margin-top: 36px;
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

  .cancel {
    float: left;
    margin-left: 64px;
    margin-right: 152px;
    color: #333333;
    border: solid 1px #2d60c7;
  }

  .ok {
    background-color: #538BC9;
    color: white;
    margin-right: 64px;
  }

  .search-input-date {
    height: 46px;
    float: right;
  }

  .search-content {
    width: 80%;
    margin-left: 10%;
  }

  .img-date {
    width: 39px;
    height: 33px;
  }

  .img-div {

    width: 72px;
    height: 46px;
    border-radius: 0px 4px 4px 0px;
    border: 1px solid #c2cbda;
    background-color: #ECF3FF;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10000;

  }
</style>
<style>
  .search-protocols .el-input__inner {
    width: 320px;
    height: 46px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    padding: 0 0;
    text-indent: 20px;
    font-size: 24px;
  }

.data-picker1 {
   z-index: 2055 !important;
    position: fixed !important;
    top: 636px !important;
    left: 900px !important;
  }
.data-picker2 {
   z-index: 2055 !important;
    position: fixed !important;
    top: 710px !important;
    left: 900px !important;
  }
  .el-input__icon:after {
    display: none;
  }

  .el-icon-date:before {
    display: none;
  }

  .el-date-table {
    font-size: 15px;
  }
</style>
