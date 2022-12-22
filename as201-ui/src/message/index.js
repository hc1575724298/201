import {
  getWebsocketPort
} from '@/api/app';

export function Init(Vue) {
  getWebsocketPort({}).then(res => {
    if (res.data == 0) {
      setTimeout(() => {
        Init(Vue)
      }, 500);
      return;
    }
    initWebsocket(res.data, Vue);
  })
}

function initWebsocket(port, Vue) {
  let websocketUri = `ws://127.0.0.1:${port}/aswebsocket`;
  // console.log('建立连接' + websocketUri);
  let websocket = new WebSocket(websocketUri);

  websocket.onopen = function(evt) {
    // console.log('web socket 打开了');
  };
  websocket.onclose = function(evt) {
    // console.log('web socket 关闭了');
    initWebsocket(port, Vue);
  };
  websocket.onmessage = function(evt) {
    // console.log('Websocket收到消息并转发 ' + evt.data);
    Vue.OnNotify(evt.data)
  };
  websocket.onerror = function(evt) {
    // console.log('发生错误' + evt.data)
    websocket.close()
  };
}
