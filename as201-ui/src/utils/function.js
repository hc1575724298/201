import { openKeyboard, closeKeyboard } from '@/api/run'
export default {
  //输入限制
  filterNum(num) {
    // console.log(num)
    num = num.replace(/[^0-9]/g, '');
    return num;
  },
  //输入的长度限制
  inputLimit(value, length) {
    console.log(typeof value)
    if ((typeof value) === 'number') {
      value = value.toString();
      if (value.length > length) {
        value = value.substr(0, length)
      }
      return parseFloat(value)
    } else {
      if (value.length > length) {
        value = value.substr(0, length)
      }
      return value;
    }
  },
  //输入限制，只能输入数字、英文
  filterNumEng: function(inputValue) {
    inputValue = inputValue.replace(/[^0-9A-Za-z]/g, '');
    return inputValue;
  },
  //限制输入，只能输入中文、英文、数字
  filterCNNUMEN: function(inputValue) {
    inputValue = inputValue.replace(/[^0-9a-zA-Z\u4E00-\u9FA5]/g, '');
    return inputValue;
  },

  //限制输入范围的大小
  filterMinMax: function(inputValue, min, max) {
    if (inputValue < min || inputValue === '') {
      inputValue = min;
    } else if (inputValue > max) {
      inputValue = max;
    }
    return inputValue;
  },
  //    获取年月日时分秒
  getTimeAsName: function() {
    //获取年月日
    let time = new Date();
    let year = time.getFullYear();
    //需加1
    let month = time.getMonth() + 1;
    let day = time.getDate();
    //
    // //获取时分秒
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();

    //检查是否小于10
    month = this.check(month);
    day = this.check(day);
    h = this.check(h);
    m = this.check(m);
    s = this.check(s);

    time = year + '' + month + '' + day + '' + h + '' + m + '' + s;
    // console.log('年' + year + '月' + month + '日' + day + '时' + h + '分' + m + '秒' + s)
    return time;
  },
  getCreateTime() {
    //获取年月日
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    //
    // //获取时分秒
    let h = time.getHours();
    let m = time.getMinutes();
    //检查是否小于10
    month = this.check(month);
    day = this.check(day);
    h = this.check(h);
    m = this.check(m);
    time = month + '/' + day + '/' + year + '  ' + h + '/' + m;
    // console.log('年' + year + '月' + month + '日' + day + '时' + h + '分' + m)
    return time;
  },
  check: function(i) {
    let num;
    i < 10 ? num = "0" + i : num = i;
    return num;
  },
  //年月日 时分
  changeSecondsToTime(seconds, lang) {
    let date = new Date(seconds * 1000);
    let y = date.getFullYear();
    let mou = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let min = date.getMinutes();
    y = this.check(y);
    mou = this.check(mou);
    d = this.check(d);
    h = this.check(h);
    min = this.check(min);
    if (lang === 'zh-CN') {
      return y + '-' + mou + '-' + d + '  ' + h + ':' + min;
    } else if (lang === 'en-US') {
      return mou + '/' + d + '/' + y + '  ' + h + ':' + min;
    }
  },
  changeSecondsToSecondTime(seconds, lang) {
    let date = new Date(seconds * 1000);
    let y = date.getFullYear();
    let mou = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let min = date.getMinutes();
    let s = date.getSeconds();
    y = this.check(y);
    mou = this.check(mou);
    d = this.check(d);
    h = this.check(h);
    min = this.check(min);
    s = this.check(s);
    if (lang === 'zh-CN') {
      return y + '-' + mou + '-' + d + '  ' + h + ':' + min + ':' + s;
    } else if (lang === 'en-US') {
      return mou + '/' + d + '/' + y + '  ' + h + ':' + min + ':' + s;
    }
  },
  changeTimeToSeconds(time) {
    let setTime = time.split(':');
    // console.log(setTime)
    for (let i = 0; i < 3; i++) {
      setTime[i] = parseInt(setTime[i], 10);
    }
    return setTime[0] * 3600 + setTime[1] * 60 + setTime[2];
  },
  checkIsHadSameName: function(newName, oldNameArr) {
    for (let i = 0; i < oldNameArr.length; i++) {
      if (newName === oldNameArr[i]) {
        return true;
      }
    }
    return false;
  },
  focusNegativeShowNumber(index) {
    this.negativeRangeInputArray[index] = this.tableData[index].negativeRange
  },
  blurNegativeShow(index) {
    this.numberNegativeShowScientificNotiation(index)
  },
  sort(arr) {
    for (var j = 0; j < arr.length - 1; j++) {
      for (var i = 0; i < arr.length - 1 - j; i++) {
        if (arr[i] > arr[i + 1]) {
          var temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
        }
      }
    }
    return arr;
  },
  timeToSeconds(timeStr) {
    let setTime = timeStr.split(':');
    for (let i = 0; i < 3; i++) {
      setTime[i] = parseInt(setTime[i], 10);
    }
    return setTime[0] * 3600 + setTime[1] * 60 + setTime[2];
  },
  secondsToTime(timeNum) {
    let arr = [];
    arr[0] = Math.floor(timeNum / 3600);
    arr[1] = Math.floor((timeNum - arr[0] * 3600) / 60);
    arr[2] = timeNum - arr[0] * 3600 - arr[1] * 60;
    return this.check(arr[0]) + ':' + this.check(arr[1]) + ':' + this.check(arr[2]);
  },

  //格式化日期函数

  TimeByLanguage(time, type) {
    if (type == "zh-CN") return time
    if (type == "en-US") {
      // 格式化英文格式
      var date = new Date(time, replace(/-/g, '/'));
      let myyear = date.getFullYear();
      let mymonth = date.getMonth() + 1;
      let myweekday = date.getDate();
      let myHour = date.getHours();
      let myMin = date.getMinutes();
      let mySec = date.getSeconds();
      if (mymonth < 10) {
        mymonth = "0" + mymonth;
      }
      if (myweekday < 10) {
        myweekday = "0" + myweekday;
      }
      if (myHour < 10) {
        myHour = "0" + myHour;
      }
      if (myMin < 10) {
        myMin = "0" + myMin;
      }
      if (mySec < 10) {
        mySec = "0" + mySec;
      }
      return mymonth + "-" + myweekday + "-" + myyear + "" + myHour + ":" + myMin + ":" + mySec;
    }
  },

  // 判断输入的字符个数
  charNumber(e) {
    var thisLength = e.length;
    var n = 0;
    for (var i = 0; i < thisLength; i++) {
      // 如果是中文字符
      if (e.charCodeAt(i) > 255) {
        n = n + 2;
      } else {
        n++
      }
    }
    return n;
  },

  // 可以输入的是英文 、数字、_(下划线)(\w) 、汉字(\u4e00-\u9fa5)
  underlineRule(e) {
    let obj = /[\w\u4E00-\u9FA5]$/;
    let res = obj.test(e);
    let result = "";
    if (!res) {
      let str = e.split("");
      let objRegExp = /^[\u4E00-\u9FA5A-Za-z_0-9]{0,1}$/;
      for (let pos = 0; pos < str.length; pos++) {
        if (objRegExp.test(str[pos])) {
          result += str[pos];
        }
      }
      e = result;

    }
    return e;
  },
  // 可以输入的是英文 、数字、$(下划线) 、汉字(\u4e00-\u9fa5)
  meiyuanRule(e) {
    let obj = /[0-9A-Za-z\u4E00-\u9FA5$^\s]$/;
    let res = obj.test(e);
    let result = "";
    if (!res) {
      let str = e.split("");
      let objRegExp = /^[\u4E00-\u9FA5A-Za-z$0-9]{0,1}$/;
      for (let pos = 0; pos < str.length; pos++) {
        if (objRegExp.test(str[pos])) {
          result += str[pos];
        }
      }
      e = result;

    }
    return e;
  },

  //开启系统键盘
  async openKeyboardApi () {
    const res = await openKeyboard()
    console.log(res);
  },
  //关闭系统键盘
  async closeKeyboardApi () {
    const res = await closeKeyboard()
    console.log(res);
  }
}
