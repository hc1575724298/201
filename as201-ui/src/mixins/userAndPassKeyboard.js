export default {
  data () {
    return {
      isShowKeyboardUser: false,
      isShowKeyboardPass: false,
      input: '',
      event: null,
      onchangeCount: 0
    }
  },
  methods: {
    onfocus (n, val, e) {
      if (n === "user") {
        this.isShowKeyboardPass = false;
        this.isShowKeyboardUser = true;
      } else {
        this.isShowKeyboardUser = false;
        this.isShowKeyboardPass = true;
      }
      this.event = e;
      this.input = val;
    },
    colseKeyboard (val) {
      val === "user" ? (this.isShowKeyboardUser = false) : (this.isShowKeyboardPass = false);
      this.onchangeCount = 0;
    },
    onChangeUser (input) {
      this.onchangeCount++;
      let inputNew = input.replace(/[^\u4e00-\u9fa5_a-zA-Z0-9$]/g, '')
      if (inputNew.length > 16) return;
      this.inputValue(inputNew)
    },
    onChangePass (input) {
      this.onchangeCount++;
      let inputNew = input.replace(/\s+/g, '')
      if (inputNew.length > 10) return;
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
    inputValue (inputNew) {
      this.onchangeCount == 1 && this.input
        ? (this.input = this.input + inputNew)
        : (this.input = inputNew);
      if (this.event.target) {
        this.event.target.value = this.input;
        this.event.target.dispatchEvent(new Event("input"))
      }
    },
  }
}
