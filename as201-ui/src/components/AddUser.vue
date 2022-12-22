<template>
  <div class="add-user-background">
    <div :class="['add-user-info',isShowKeyboardUser||isShowKeyboardPass?'move-top':'']">
      <div class="add-info-title">
        <div class="add-info-title-text">
          {{$t("language.add_user")}}
        </div>
      </div>
      <div class="add-rows">
        <div class="input-row">
        <div class="row-text">{{$t("language.table_username")}}</div>
        <input @focus="onfocus('user',new_user.username,$event)" type="text" v-model="new_user.username"
          @input="dealInputData" maxlength="16" @blur="onblur('user')" />
      </div>
      <div class="input-row">
        <div class="row-text">{{$t("language.password")}}</div>
        <input @focus="onfocus('pass',new_user.password,$event)" type="password" v-model="new_user.password"
          maxlength="10" @blur="onblur('pass')"
          @input="new_user.password=new_user.password.replace(/[\u4e00-\u9fa5 ]$/g,'')" />
      </div>
      <div class="input-row">
        <div class="row-text">{{$t("language.input_again")}}</div>
        <input @focus="onfocus('pass',repeat_password,$event)" type="password" v-model="repeat_password" maxlength="10"
          @blur="onblur('pass')" @input="repeat_password=repeat_password.replace(/[\u4e00-\u9fa5 ]$/g,'')" />
      </div>
    </div>
    <div class="buttons">
      <div class="cancel" @mousedown="backToManage()">{{$t("language.cancel")}}</div>
      <div class="ok" @mousedown="AddUserOk()">{{$t("language.ok")}}</div>
    </div>
  </div>

    <!-- 键盘 username-->
    <SimpleKeyboard class="searchKeyboard" v-if="isShowKeyboardUser" :input="input" @onChange="onChangeUser"
      @onKeyPress="onKeyPress" @colseKeyboard="colseKeyboard('user')" @mousedown.native="$event.preventDefault();" />
    <!-- 键盘 password-->
    <SimpleKeyboard class="searchKeyboard" v-if="isShowKeyboardPass" :input="input" @onChange="onChangePass"
      @onKeyPress="onKeyPress" @colseKeyboard="colseKeyboard('pass')" @mousedown.native="$event.preventDefault();" />
    </div>
</template>

<script>
  import SimpleKeyboard from "@/components/SimpleKeyboard";
  import MixinUserAndPassKeyboard from "@/mixins/userAndPassKeyboard.js";
  import {
    addUser
  } from "@/api/user"
  export default {
    props: ['add_type'],
    data() {
      return {
        new_user: {
          username: null,
          password: null,
          group: null
        },
        repeat_password: null,
      }
    },
    components: {
      SimpleKeyboard
    },
    mixins: [MixinUserAndPassKeyboard],
    mounted() {

    },
    methods: {
      dealInputData() {
        this.new_user.username = this.new_user.username.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')
      },
      backToManage() {
        this.$emit('closeAddUser');
      },
      AddUserOk() {
        this.new_user.group = this.add_type;
        addUser(this.new_user).then((res) => {
          if (res.code == 0) {
            this.$message({
              type: 'success',
              message: this.$t("language.add_new")
            })
            this.$emit('closeAddUser');
          }
        })
      },
      onChangeUser(input) {
        this.onchangeCount++;
        let inputNew = input.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')
        if (inputNew.length > 16) return
        this.inputValue(inputNew)
      },
      onblur(val) {
        val === 'user' ? this.isShowKeyboardUser = false : this.isShowKeyboardPass = false;
        this.onchangeCount = 0
      }
    }
  }
</script>

<style scoped="scoped">
  .searchKeyboard {
    position: absolute !important;
    bottom: 50px !important;
    left: 210px !important;
  }

  .move-top {
    top: 70px !important;
  }

  .add-user-background {
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

  .add-user-info {
    position: absolute;
    width: 839px;
    height: 561px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
  }

  .add-info-title {
    width: 95%;
    float: right;
    font-size: 25px;
    font-weight: 550;
    height: 75px;
    color: #4473BC;
    border-bottom: 2pt solid #C2CBDA;
  }

  .add-info-title-text {
    float: left;
    line-height: 75px;
  }

  .add-rows {
    float: right;
    width: 95%;
    height: 485px;
  }

  .input-row {
    display: flex;
    align-items: center;
    width: 100%;
    margin-left: 23px;
    margin-top: 34px;
    line-height: 58px;
    height: 58px;
    font-size: 24px;
    flex-shrink: 0;
  }

  .row-text {
    display: flex;
    width: 325px;
  }

  input {
    font-size: 24px;
    height: 64px;
    flex-shrink: 0;
    border: 1px solid #C2CBDA;
    text-indent: 20px;
    margin-right: 76px;
    width: 460px;
  }

  .buttons {
    display: flex;
    position: absolute;
    height: 80px;
    width: fit-content;
    font-size: 24px;
    right: 0;
    bottom: 0;
  }

  .cancel,
  .ok {
    width: 180px;
    height: 58px;
    margin-right: 30px;
    line-height: 58px;
    flex-shrink: 0;
    border-radius: 8px;
    text-align: center;

  }

  .cancel {
    border: 2px solid #93ADE2;
    color: black;
  }

  .ok {
    background-image: linear-gradient(to bottom, #588DCF, #4D7DB4);
    color: white;
  }
</style>
