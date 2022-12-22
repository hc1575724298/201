<template>
  <div class="keyBoard">
    <div :class="keyboardClass"></div>
  </div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String,
    },
    input: {
      type: String | Number,
    },
    layout: {
      type: Object,
      default: function () {
        return {
          default: [
            "1 2 3",
            "4 5 6",
            "7 8 9",
            "0 . {bksp}",
            "{ok}"
          ],
        };
      },
    },
  },
  data: () => ({
    keyboard: null,
    displayDefault: {
      '{bksp}': `<i class="bksp" style="width:60px;height:50px;"></i>`,
      '{close}': '关闭',
      '{ok}': 'OK',
      '{Esc}': 'Esc',
      '{empty}': 'empty'
    },
  }),
  mounted() {
    this.keyboard = new Keyboard(this.keyboardClass, {
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
    });
    this.keyboard.setOptions({
      layoutName: "default",
      theme: "hg-theme-default hg-layout-default myTheme",
      layout: this.layout,
      display: {
        "{enter}": "close",
        "{shift}": "shift",
        "{bksp}": "del",
      },
      // 按钮展示文字
      display: this.displayDefault,
    });

  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button,$event) {
      // 点击关闭
      if (button === '{close}') {
        let keyboard = $event.path[3];
        keyboard.style.visibility = 'hidden';
        return false;
      } else if (button === '{clear}') {
        this.keyboard.clearInput();
      } else if (button === '{ok}') {
        this.$emit('colseKeyboard')
      }else {
        if($event){
          let value =
          $event.target.offsetParent.parentElement.children[0]
            .value;
        // 输入框有默认值时，覆写
        if (value) {
          this.keyboard.setInput(value, this.input);
        }
        }
        this.$emit('onKeyPress', button);
    }
    },
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.keyBoard {
  position: absolute;
  left: 520px;
  bottom: 50px;
  width: 870px;
}
.keyBoard >>>.hg-theme-default {
  height: 520px;
}
.keyBoard .hg-theme-default >>>.hg-row {
  height: 20%;
}
.keyBoard .hg-theme-default >>>.hg-rows {
  box-sizing: border-box;
  height: 100%;
  padding: 30px;
}
.keyBoard .hg-theme-default >>>.hg-button {
  background-color: #fff !important;
  width: 115px;
  height: 80px;
  margin: 0 10px;
  font-size: 40px;
  border-radius: 6px;
}
.keyBoard >>>.hg-theme-default {
  background-color: #4b78ac;
  border-radius: 30px;
}
.keyBoard >>>.hg-button-bksp {
  position: relative;
}
.keyBoard >>>.bksp {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.keyBoard >>>.bksp{
  background: url(../images/run/bksp.png) no-repeat center;
}
</style>

