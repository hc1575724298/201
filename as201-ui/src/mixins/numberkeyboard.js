export default {
  data () {
    return {
      isShowNumberKeyboard: false,
      input: '',
      event: null,
      onchangeCount: 0
    }
  },
  methods: {
    onfocusNum (val, e) {
      this.isShowNumberKeyboard = true
      this.input = val
      this.event = e;
    },
    onChangeNum (input) {
      this.onchangeCount++;
       // replace(/[^\d.\d]/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.');
      let inputNew = input.replace(/[^\d]/g, '')
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
    colseKeyboardNum () {
      this.isShowNumberKeyboard = false
      this.onchangeCount = 0;
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
