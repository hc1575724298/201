import { now } from "moment"

export default {
  data () {
    return {
      isShowKeyboard: false,
      isShowNumberKeyboard: false,
      isShowNumberKeyboardPoint: false,
      input: '',
      event: null,
      onchangeCount: 0,
    }
  },
  methods: {
    onfocusTemp (type, val, e) {
      setTimeout(() => {
        document.querySelector('.move-top').scrollTop = e.target.getBoundingClientRect().top
      }, 13)
      this.onfocus(type, val, e)
    },
    onfocus (type, val, e) {
      this.onchangeCount = 0
      if (type === 'name') {//name 全键盘
        this.isShowNumberKeyboard = this.isShowNumberKeyboardPoint = false;
        this.isShowKeyboard = true;
      } else if (type === 'num') {// num  数字键盘， 不可输入小数点的
        this.isShowKeyboard = this.isShowNumberKeyboardPoint = false;
        this.isShowNumberKeyboard = true
      } else {// point  数字键盘， 可输入小数点的
        this.isShowKeyboard = this.isShowNumberKeyboard = false;
        this.isShowNumberKeyboardPoint = true
      }
      this.event = e;
      this.input = val && val.toString();
    },
    onChange (input) {
      this.onchangeCount++;
      let inputNew = input.replace(/[^\w\u4E00-\u9FA5_-]/g, '')
      if (input.length > 15) return
      this.inputValue(inputNew)
    },
    onKeyPress (button) {
      if (button == '{bksp}') {
        this.onchangeCount++;
        if (!this.input) return
        const arrInput = this.input.split('')
        arrInput.pop()
        this.input = arrInput.join('')
      } else if (button == '{empty}') {
        this.input = ''
      }
      if (this.event.target) {
        this.event.target.value = this.input;
        this.event.target.dispatchEvent(new Event("input"))
      }
    },
    onChangeNum (input) {
      this.onchangeCount++;
      let inputNew = input.replace(/[^\d]/g, '')
      this.inputValue(inputNew)
    },
    onChangeNumPoint (input) {
      this.onchangeCount++;
      let inputNew = input.replace(/[^\d.\d]/g, '').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
      this.inputValue(inputNew)
    },
    onKeyPressNum (button) {
      if (button == '{bksp}') {
        this.onchangeCount++;
        if (!this.input) return
        const arrInput = this.input.toString().split('')
        arrInput.pop()
        this.input = arrInput.join('')
      }
      this.dispatchEvent()
    },
    colseKeyboard (val) {
      setTimeout(() => {
        val === 'num' ? this.isShowNumberKeyboard = this.isShowNumberKeyboardPoint = false : this.isShowKeyboard = false;
        this.onchangeCount = 0;
        this.event.target.blur()
      }, 200)
    },
    dispatchEvent () {
      if (this.event.target) {
        this.event.target.value = this.input;
        this.event.target.dispatchEvent(new Event("input"))
      }
    },
    inputValue (inputNew) {
      this.onchangeCount == 1 && this.input
        ? (this.input = this.input + inputNew)
        : (this.input = inputNew);
      this.dispatchEvent()
    },
  }
}
