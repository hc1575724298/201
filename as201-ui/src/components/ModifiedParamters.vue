<template>
  <div class="modified-paramters-back">
    <div :class="['modified-paramters',isShowNumberKeyboard? 'move-top':'']">
      <div class="modified-info">
        <div class="modified-paramters-text">
          {{name}}:
        </div>
        <input
          class="input-paramters"
          v-model="paramters_value"
          @focus="onfocusNum(paramters_value,$event)"
          @blur="check($event,name)"
          @input="paramters_value=paramters_value&&paramters_value.replace(/[^\d]/g, '')"
          onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))" v-if="is_decimal==false" />
        <input type="number" class="input-paramters" v-model="paramters_value"
          @blur="check($event,name)" onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))" v-else />
      </div>
      <div class="buttons">
        <div class="ok" @mousedown="modifiedParamters">{{$t("language.ok")}}</div>
        <div class="cancel" @mousedown="backTo">{{$t("language.cancel")}}</div>
      </div>
    </div>

    <NumberKeyboard
      class="searchKeyboardNumber"
      v-if="isShowNumberKeyboard"
      :input="input"
      @onChange="onChangeNum"
      @onKeyPress="onKeyPressNum"
      @colseKeyboard="colseKeyboardNum"
      @mousedown.native="$event.preventDefault();"
    />
  </div>
</template>

<script>
  import NumberKeyboard from '@/components/NumberKeyboard.vue'
  import MixinNumberKeyboard from '@/mixins/numberkeyboard.js'
  export default {
    props: ['paramters_name'],
    mixins: [MixinNumberKeyboard],
    components: { NumberKeyboard },
    data() {
      return {
        name: this.paramters_name,
        paramters_value: null,
        max_number: null,
        min_number: null,
        is_decimal: false
      }
    },
    mounted() {},
    methods: {
      backTo() {
        this.$emit('back');
      },
      check(event, name) {
        this.isShowNumberKeyboard = false
        this.onChangeCount = 0
        let val = event.target.value
        if (name == this.$t("language.horizontal_speed") || name == this.$t("language.magnetic_lifting_speed") ||
          name == this.$t("language.magnetic_sleeve_speed")) {
          if (val > 50) {
            this.paramters_value = 50;
          } else if (val < 1) {
            this.paramters_value = 1;
          }
        }
      },
      modifiedParamters() {
        this.$emit('ok', this.paramters_value);
      },
    }
  }
</script>

<style scoped="scoped">
.move-top {
  position: relative;
  top: -195px;
}
  .modified-paramters-back {
    position: absolute;
    z-index: 1000;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0%;
    left: 0%;
  }

  .modified-paramters {
    width: 700px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 10px;
    border: solid 1px #707070;
  }

  .modified-info {
    margin-top: 90px;
    top: 90px;
    display: flex;
    width: 100%;
    height: 52px;
    justify-content: center;
  }

  .modified-paramters-text {
    height: 100%;
    font-size: 22px;
    line-height: 52px;
  }

  .input-paramters {
    width: 210px;
    height: 100%;
    margin-left: 20px;
    text-align: center;
    font-size: 22px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #666666;
  }

  .buttons {
    margin-top: 80px;
    height: 50px;
    width: 100%;
    font-size: 18px;
  }

  .cancel,
  .ok {
    float: right;
    width: 150px;
    height: 50px;
    margin-right: 24px;
    line-height: 50px;
    flex-shrink: 0;
    border-radius: 8px;
    text-align: center;

  }

  .cancel {
    border: 2px solid #93ADE2;
    color: black;
    box-sizing: border-box;
  }

  .ok {
    margin-right: 46px;
    background-image: linear-gradient(to bottom, #588DCF, #4D7DB4);
    color: white;
  }
</style>
