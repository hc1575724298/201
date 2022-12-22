<template>
  <div class="deal-password-model">
    <div :class="['deal-password-info', isShowKeyboard ? 'move-top' : '']">
      <div class="password-info-title">
        <div class="password-info-title-text">
          {{ $t("language.change_password") }}
        </div>
      </div>
      <div class="password-rows">
        <div class="input-row">
          <div class="row-text">{{ $t("language.original_password") }}</div>
          <input
            @focus="onfocus(passwordObject.original_password, $event)"
            type="password"
            v-model="passwordObject.original_password"
            maxlength="10"
            @blur="onblur"
            @input="passwordObject.original_password=passwordObject.original_password.replace(/[\u4e00-\u9fa5 ]$/g,'')"
          />
        </div>
        <div class="input-row">
          <div class="row-text">{{ $t("language.new_password") }}</div>
          <input
            @focus="onfocus(passwordObject.new_password, $event)"
            type="password"
            v-model="passwordObject.new_password"
            maxlength="10"
            @blur="onblur"
            @input="password_again=password_again.replace(/[\u4e00-\u9fa5 ]$/g,'')"
          />
        </div>
        <div class="input-row">
          <div class="row-text">{{ $t("language.input_again") }}</div>
          <input
            @focus="onfocus(password_again, $event)"
            type="password"
            v-model="password_again"
            maxlength="10"
            @blur="onblur"
             @input="password_again=password_again.replace(/[\u4e00-\u9fa5 ]$/g,'')"
          />
        </div>
      </div>
      <div class="buttons">
        <div class="cancel" @mousedown="backToParent()">
          {{ $t("language.cancel") }}
        </div>
        <div class="ok" @mousedown="changePasswordOk()">
          {{ $t("language.ok") }}
        </div>
      </div>
    </div>

    <!-- 键盘 -->
    <SimpleKeyboard
      class="searchKeyboard"
      v-if="isShowKeyboard"
      :input="input"
      @onChange="onChange"
      @onKeyPress="onKeyPress"
      @colseKeyboard="colseKeyboard"
      @mousedown.native="$event.preventDefault()"
    />
  </div>
</template>

<script>
import SimpleKeyboard from "@/components/SimpleKeyboard";
import MixinKeyboard from "@/mixins/keyboard.js";
import { changePassword } from "../api/user.js";

export default {
  data() {
    return {
      passwordObject: {
        original_password: null,
        new_password: null
      },
      password_again: null
    };
  },
  components: {
    SimpleKeyboard
  },
  mixins: [MixinKeyboard],
  mounted() {},
  methods: {
    backToParent() {
      this.$emit("close");
    },
    changePasswordOk() {
      if (this.passwordObject.new_password != this.password_again) {
        if (this.$store.getters.languageCode == 1) {
          this.$message({
            message: "Entered password differ!",
            type: "error"
          });
        } else if (this.$store.getters.languageCode == 0) {
          this.$message({
            message: "两次密码输入不一致！",
            type: "error"
          });
        }
      } else {
        changePassword(this.passwordObject).then(res => {
          if (res.code == 0) {
            if (this.$store.getters.languageCode == 1) {
              this.$message({
                message: "Change password successful!",
                type: "success"
              });
            } else if (this.$store.getters.languageCode == 0) {
              this.$message({
                message: "密码修改成功！",
                type: "success"
              });
            }
          }
          this.$emit("close");
        });
      }
    },
    onChange(input) {
      this.onchangeCount++;
      let inputNew = input.replace(/\s+/g, '')
      if (inputNew.length > 10) return;
      this.inputValue(inputNew)
    },
    onblur() {
      this.isShowKeyboard = false;
      this.onchangeCount = 0;
    }
  }
};
</script>

<style scoped="scoped">
.searchKeyboard {
  position: absolute !important;
  bottom: 50px !important;
  left: 210px !important;
}

.move-top {
  top: 80px !important;
}

.deal-password-model {
  position: absolute;
  z-index: 1000;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0%;
  left: 0%;
}

.deal-password-info {
  position: absolute;
  width: 860px;
  height: 560px;
  left: 530px;
  top: 320px;
  background-color: white;
  border-radius: 10px;
}

.password-info-title {
  width: 95%;
  float: right;
  font-size: 25px;
  font-weight: 550;
  height: 75px;
  color: #4473bc;
  border-bottom: 2pt solid #c2cbda;
}

.password-info-title-text {
  float: left;
  line-height: 75px;
}

.password-rows {
  float: right;
  width: 95%;
  height: 485px;
}

.input-row {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
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
  border: 1px solid #c2cbda;
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
  border: 2px solid #93ade2;
  color: black;
}

.ok {
  background-image: linear-gradient(to bottom, #588dcf, #4d7db4);
  color: white;
}

.enter-password-differ {
  margin-left: 280px;
  margin-top: 15px;
  font-size: 20px;
  color: #ff0000;
}
</style>
