// // 防抖
let debounce = (fn, delay) => {
  var delay = delay || 300;
  var timer;
  return function() {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}

const addListener = function(el, type, fn) {
  el.addEventListener(type, fn, false)
}

//去掉空格
const spaceFilter = function(el) {
  addListener(el, 'input', () => {
    el.value = el.value.replace(/\s+/, '')
  })
}

// 限制只能输入整数和小数（适用于价格类、最多两位小数）
const priceFilter = function(el) {
  addListener(el, 'keyup', debounce(() => { //添加防抖 方便添加小数点
    el.value = (el.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
    if (isNaN(el.value)) {
      el.value = ''
    }
    //格式化去掉却没有输入小数位的小数点
    el.value = +el.value
    //触发input事件
    el.dispatchEvent(new Event('input'))
  }))
}
// 限制只能输入字母数字（适用于运单号）
const integerLetterFilter = function(el) {
  addListener(el, 'keyup', () => {
    el.value = el.value.replace(/[\W]/g, '')
    el.dispatchEvent(new Event('input'))
  })
}

// 0-9正整数
const integerZeroNineFilter = function(el) {
  addListener(el, 'keyup', () => {
    let objRegExp = /^(?:0|[1-9]?|9)$/;
    let res = objRegExp.test(el.value);
    if (!res) {
      el.value = '';
    }
  })
}

// 0-99正整数
const integerZeroTwoFilter = function(el) {
  addListener(el, 'keyup', () => {
    let objRegExp = /^(?:0|[1-9][0-9]?|9)$/;
    let res = objRegExp.test(el.value);
    if (!res) {
      el.value = '';
    }
  })
}

// 1-99正整数
const integerOneNineFilter = function(el) {
  addListener(el, 'keyup', () => {
    let objRegExp = /^([1-9][0-9]?|9)$/;
    let res = objRegExp.test(el.value);
    if (!res) {
      el.value = '';
    }
  })
}

// 限制只能输入数字0-999
const integerZeroThreeFilter = function(el) {
  addListener(el, 'keyup', () => {
    let objRegExp = /^([1-9]\d{0,2}|0)$/;
    let res = objRegExp.test(el.value);
    if (!res) {
      el.value = '';
    }
  })
}

// 限制只能输入数字10-9999
const integerZeroFourFilter = function(el) {
  addListener(el, 'keyup', () => {
    el.value = el.value.match(/^([1-9]\d{0,3}|0)$/g, '')
    el.dispatchEvent(new Event('input'))
  })
}

// 5-10正整数
const integerFiveTenFilter = function(el) {
  addListener(el, 'keyup', () => {
    let objRegExp = /^(\d*)$/;
    let res = objRegExp.test(el.value);
    if (!res) {
      el.value = '';
    }
  })
}
// 1-200正整数
const oneTwohundrandFilter = function(el) {
  addListener(el, 'keyup', () => {
    let objRegExp = /^([1-9]|[1-9]\d|1\d{2}|200)$/;
    let res = objRegExp.test(el.value);
    if (!res) {
      el.value = '';
    }
  })
}
// 1-100正整数
const integerOneTenFilter = function(el) {
  addListener(el, 'keyup', () => {
    let objRegExp = /^([1-9][0-9]?|100)$/;
    let res = objRegExp.test(el.value);
    if (!res) {
      el.value = '';
    }

  })
}
// 可输入中英文和特殊符号，最多可输入20个字符^[\u4E00-\u9FA5A-Za-z_$^*&%#@!]{0,20}$
const specialFilter = function(el) {
  addListener(el, 'keyup', () => {
    let objRegExp = /^[\u4E00-\u9FA5A-Za-z0-9]{0,20}$/;
    let res = objRegExp.test(el.value);
    if (!res) {
      el.value = '';
    }
  })
}
// 可输入大小写英文、汉字、数字和_，最多可输入20个字符。
// <!-- onkeyup="value=value.replace(/[^\w\u4E00-\u9FA5_]/g,'' )" -->
const recordFilter = function(el) {
  addListener(el, 'keyup', () => {
    let objRegExp = /[^\w\u4E00-\u9FA5_]/;
    let res = objRegExp.test(el.value);
    if (!res) {
      el.value = '';
    }
  })
}
// 大小写英文、汉字、数字和_，最多可输入16个字符。样本数量最多24个
const sampleFilter = function(el) {
  addListener(el, 'keyup', () => {
    let objRegExp = /^[\u4E00-\u9FA5A-Za-z_0-9]{0,16}$/;
    let res = objRegExp.test(el.value);
    if (!res) {
      el.value = '';
    }
  })
}
//  用户名 1~16个字符，可输入大小写英文、汉字、数字和$
const userFilter = function(el) {
  addListener(el, 'keyup', () => {
    let objRegExp = /^[\u4E00-\u9FA5A-Za-z0-9$\s]$/;
    let res = objRegExp.test(el.value);
    if (!res) {
      el.value = '';
    }
  })
}
// 密码 可输入范围4~12个字符，不可输入空格和汉字。
const passwordFilter = function(el) {
  addListener(el, 'keyup', () => {
    el.value = el.value.match(/^[^\u4e00-\u9fa5]{0,}$/, '')
    el.dispatchEvent(new Event('input'))
  })
}
// 不能输入  +  -
const plaus = function(el) {
  addListener(el, 'keyup', () => {
    el.value = el.value.match(/^[^+ -]{0,}$/, '')
    el.dispatchEvent(new Event('input'))
  })
}
export default {
  bind(el, binding) {
    if (el.tagName.toLowerCase() !== 'input') {
      el = el.getElementsByTagName('input')[0]
    }
    spaceFilter(el)
    console.log(binding);
    switch (binding.arg) {
      case 'price':
        priceFilter(el)
        break;
      case 'integerLetter':
        integerLetterFilter(el)
        break;
      case 'zeroThree':
        integerZeroThreeFilter(el)
        break;
      case 'zeroNine':
        integerZeroNineFilter(el);
        // if(this.parametersObject.WetCount==''){
        //     this.parametersObject.WetCount=0
        // }
        break;
      case 'oneNine':
        integerOneNineFilter(el)
        break;
      case 'zeroTwo':
        integerZeroTwoFilter(el)
        break;
      case 'fiveTen':
        integerFiveTenFilter(el)
        break;
      case 'special':
        specialFilter(el)
        break;
      case 'zeroFour':
        integerZeroFourFilter(el);
        break;
      case 'oneTwoHun':
        oneTwohundrandFilter(el)
        break;
      case 'oneTenhun':
        integerOneTenFilter(el)
        break;
      case 'sample':
        sampleFilter(el)
        break;
      case 'Record':
        recordFilter(el)
        break;
      case 'user':
        userFilter(el)
        break;
      case 'password':
        passwordFilter(el)
        break;
      case 'plus':
        plaus(el)
        break;

      default:
        console.warn('未知指令类型', binding.arg)
        break;
    }
  }
}
