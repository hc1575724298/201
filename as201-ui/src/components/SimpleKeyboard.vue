<template>
  <div class="keyBoard">
    <div :class="keyboardClass"></div>
  </div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import layout from 'simple-keyboard-layouts/build/layouts/chinese';//中文输入法

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String,
    },
    input: {
      type: String,
    },
    layout: {
      type: Object,
      default: function () {
        return {
          default: [
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "{shift} z x c v b n m {bksp}",
            "{123} . , {space} {change} {Esc} {empty}",
          ],
          shift: [
            "Q W E R T Y U I O P",
            'A S D F G H J K L',
            "{shift} Z X C V B N M {bksp}",
            "{123} . , {space} {change} {Esc} {empty}",

          ],
          num:[
            "1 2 3 4 5 6 7 8 9 0",
            "- / : ; ( ) ~ % !",
            "_ # $ & @ “ ” { }",
            "{123} ? {space} {bksp} {Esc} {empty}",
          ]
        };
      },
    },
  },
  data: () => ({
    keyboard: null,
    displayDefault: {
      '{bksp}': `<i class="bksp" style="width:60px;height:50px;"></i>`,
      '{lock}': 'caps',
      '{enter}': '> enter',
      '{tab}': 'tab',
      '{shift}':  `<i class="shift" style="width:60px;height:50px;"></i>`,
      '{change}': `<sub class="unWeight">中</sub>/En`,
      '{space}': ' ',
      '{clear}': '清空',
      '{close}': '关闭',
      '{ok}': 'OK',
      '{123}': '123',
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
        "{tab}": "tab",
        "{space}": "space",
        "{lock}": "caps",
      },
      layoutCandidatesPageSize: 22,
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
      } else if (button === '{change}') {
        // 切换中英文输入法
        if (this.keyboard.options.layoutCandidates) {
          this.$set(this.displayDefault, '{change}',`<sub class="unWeight">中</sub>/En`);
          // 切换至英文
          this.keyboard.setOptions({
            layoutCandidates: null,
            display: this.displayDefault,
          });
        } else {
          // 切换至中文
          this.$set(this.displayDefault, '{change}', `中/<sub class="unWeight">En</sub>`);
          this.keyboard.setOptions({
            layoutCandidates: layout.layoutCandidates,
            display: this.displayDefault,
          });
        }
      } else if (button === '{clear}') {
        this.keyboard.clearInput();
      } else if (button === '{Esc}') {
        this.$emit('colseKeyboard')
      }else {
        if($event){
          let value =
          $event.target.offsetParent.parentElement.children[0].children[0]
            .value;
        // 输入框有默认值时，覆写
        if (value) {
          this.keyboard.setInput(value, this.input);
        }
        }

        this.$emit('onKeyPress', button);
    }

      /**
       * If you want to handle the shift and caps lock buttons
       */
      if (button === "{shift}" || button === "{123}") this.handleShift(button);
    },
    handleShift(btn) {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle
      if(btn ==='{shift}'){
        shiftToggle = currentLayout === "default" ? "shift" : "default";
      }else if(btn === '{123}'){
        shiftToggle = currentLayout !== "num" ? "num" : "default";
        if( currentLayout !== "num"){
          shiftToggle = 'num'
          this.$set(this.displayDefault, '{123}','abc');
        }else{
          shiftToggle = 'default'
          this.$set(this.displayDefault, '{123}', `123`);
        }
      }
      this.keyboard.setOptions({
        layoutName: shiftToggle,
      });
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
  left: -185px;
  bottom: -508px;
  width: 1480px;
}
.keyBoard >>>.hg-theme-default {
  height: 460px;
}
.keyBoard .hg-theme-default >>>.hg-row {
  height: 25%;
}
.keyBoard .hg-theme-default >>>.hg-rows {
  box-sizing: border-box;
  height: 100%;
  padding: 30px;
}
.keyBoard .hg-theme-default >>>.hg-button {
  background-color: #cedce4 !important;
  width: 115px;
  height: 80px;
  margin: 0 10px;
  font-size: 33px;
  font-weight: 700;
  border-radius: 3px;
}
.keyBoard >>>.hg-theme-default {
  background-color: #fff;
}
.keyBoard .hg-theme-default >>>.hg-row:nth-child(2) {
  padding: 0 65px;
}
.keyBoard >>>.hg-button-space {
  width: 470px !important;
}
.keyBoard >>>.unWeight {
  font-weight: 400;
}
.keyBoard >>>.hg-candidate-box {
  border-bottom: 1px solid #b5b5b5;
  background-color: #fff;
  margin-top: -3px;
  max-width: 1442px;
}
.keyBoard >>>.hg-candidate-box-next, .keyBoard >>>.hg-candidate-box-prev {
  background-color: #cedce4;
}
.keyBoard >>>ul.hg-candidate-box-list {
  font-size: 30px;
}
.keyBoard >>>li.hg-candidate-box-list-item{
  width: 64px;
}
.keyBoard .hg-theme-default >>>.hg-button.hg-standardBtn[data-skbtn="@"]{
  max-width: unset;
}
.keyBoard >>>.hg-button-bksp ,
.keyBoard >>>.hg-button-shift {
  position: relative;
  width: 175px !important;
}
.keyBoard >>>.hg-button-empty {
  width: 180px !important;
}
.keyBoard >>>.bksp,
.keyBoard >>>.shift {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
.keyBoard >>>.bksp{
  background: url(../images/run/bksp.png) no-repeat center;
}
.keyBoard >>>.shift {
  background: url(../images/run/shift.png) no-repeat center;
}
</style>

