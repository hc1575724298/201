export default {
  data () {
    return {
      isShowKeyboard: false,
      input: '',
      event: null,
      onchangeCount: 0
    }
  },
  methods: {
    onfocus (val, e) {
      // val  v-model绑定的值  e 事件对象
      this.isShowKeyboard = true;
      this.event = e;
      this.input = val
    },
    onChange (input) {
      this.onchangeCount++;
      this.inputValue(input)
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
    colseKeyboard () {
      this.isShowKeyboard = false;
      this.onchangeCount = 0;
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
