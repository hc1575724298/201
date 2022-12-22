import request from '@/utils/request'

export function testGet(query) {
  return request({
    url: '/test-get',
    method: 'get',
    params: queryz
  })
}

export function testPost(data) {
  return request({
    url: '/test-post',
    method: 'post',
    data: data
  })
}

export function getWebsocketPort(query) {
  return request({
    url: '/get-websocket-port',
    method: 'get',
    params: query
  })
}
