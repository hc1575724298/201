<template>
  <div class="change-password-model">
    <div :class="['change-password-info',isShowKeyboard?'move-top':'']">
      <div class="info-title">
        {{$t("language.change_password")}}
      </div>
      <div class="input-password">
        <div class="input-password-info">
          <div>{{$t("language.new_password")}}</div>
        <div class="input-new-password">
          <input @focus="onfocus(userChanged.new_password,$event)" type="password" v-model="userChanged.new_password"
            maxlength="10" @blur="onblur"
             @input="userChanged.new_password=userChanged.new_password.replace(/[\u4e00-\u9fa5 ]$/g,'')" />
        </div>
      </div>
      <div class="input-password-again">
        <div class="again-div">{{$t("language.input_again")}}</div>
        <div class="input-new-password">
          <input @focus="onfocus(again_password,$event)" type="password" v-model="again_password" maxlength="10"
            @blur="onblur" @input="again_password=again_password.replace(/[\u4e00-\u9fa5 ]$/g,'')" />
        </div>
      </div>
    </div>
    <div class="change-buttons">
      <div class="change-password-ok" @mousedown="ChangePasswordOk()">{{$t("language.ok")}}</div>
      <div class="change-password-cancel" @mousedown="backToManage()">{{$t("language.cancel")}}</div>
    </div>
  </div>

  <!-- 键盘 -->
  <SimpleKeyboard class="searchKeyboard" v-if="isShowKeyboard" :input="input" @onChange="onChange"
    @onKeyPress="onKeyPress" @colseKeyboard="colseKeyboard" @mousedown.native="$event.preventDefault();" />
  </div>
</template>

<script>
  import SimpleKeyboard from "@/components/SimpleKeyboard";
  import MixinKeyboard from "@/mixins/keyboard.js";
  import {
    changePassword
  } from "@/api/user"
  export default {
    mixins: [MixinKeyboard],
    props: ['userPasswordId'],
    components: {
      SimpleKeyboard
    },
    data() {

      return {
        again_password: null,
        userChanged: {
          user_id: null,
          new_password: null,
        },
      }
    },
    mounted() {},
    methods: {
      backToManage() {
        this.$emit('closeChangePassword')
      },
      ChangePasswordOk() {
        this.userChanged.user_id = this.userPasswordId.id;
        if (this.again_password != this.userChanged.new_password) {
          this.$message({
            message: this.$t("language.different_password"),
            type: 'error'
          })
        } else {
          changePassword(this.userChanged).then((res) => {
            if (res.code == 0) {
              this.$message({
                message: this.$t("language.change_password_success"),
                type: 'success'
              })
            }
            this.$emit('closeChangePassword')
          })
        }
      },
      onChange (input) {
      this.onchangeCount++;
      let inputNew = input.replace(/\s+/g, '')
      if (inputNew.length > 10) return;
      this.inputValue(inputNew)
    },
    onblur(){
      this.isShowKeyboard = false
      this.onchangeCount = 0
    }
    }
  }
</script>

<style scoped="scoped">
  .searchKeyboard {
    position: absolute !important;
    bottom: 90px !important;
    left: 220px !important;
  }

  .change-password-model {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0%;
    left: 0%;
    z-index: 1000;
  }

  .move-top {
    position: absolute;
    top: 100px;
  }

  .change-password-info {
    width: 860px;
    height: 476px;
    z-index: 1000;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
  }

  .info-title {
    height: 74px;
    width: 791px;
    float: right;
    border-bottom: solid 1px rgba(194, 203, 218, 1);
    font-size: 26px;
    line-height: 74px;
    color: #4070BA;
  }

  .input-password {
    height: 159px;
    width: 791px;
    margin-top: 33px;
    float: right;
  }

  .input-password>div {
    display: flex;
    width: 100%;
    height: 66px;
    font-size: 26px;
    line-height: 66px;
    color: black;
  }

  .input-password-again {
    position: relative;
    margin-top: 23px;
  }

  .input-password-info {
    position: relative;
  }

  .input-new-password {
    position: absolute;
    left: 268px;
    width: 460px;
    height: 66px;
  }

  .again-div {
    width: 170.52px;
    height: 100%;
  }

  .input-new-password>input {
    border-radius: 2px;
    height: 100%;
    width: 460px;
    text-indent: 20px;
    border: solid 1px rgba(194, 203, 218, 1);
  }

  .change-buttons {
    width: 100%;
    height: 58px;
    font-size: 24px;
    float: right;
    margin-top: 130px;
  }

  .change-buttons>div {
    width: 180px;
    height: 58px;
    border-radius: 6px;
    line-height: 58px;
    text-align: center;
  }

  .change-password-cancel {
    float: right;
    color: black;
    border: solid 1px rgba(76, 124, 178, 1);
    margin-right: 30px;
  }

  .change-password-ok {
    color: white;
    background-color: #4F83BE;
    color: white;
    margin-right: 27px;
    float: right;

  }
</style>
