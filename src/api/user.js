import request from '@/utils/request'
import http from '@/utils/http'

// 获取用户列表
export async function getUserListApi(parm) {
  return await http.get('api/sysUser/list', parm)
}

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
