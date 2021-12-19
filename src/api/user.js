import request from '@/utils/request'
import http from '@/utils/http'

// 获取用户列表
export async function getUserListApi(parm) {
  return await http.get('api/sysUser/list', parm)
}

// 新增用户
export async function addUserApi(parm) {
  return await http.post('/api/sysUser', parm)
}

// 编辑用户
export async function editUserApi(parm) {
  return await http.put('/api/sysUser', parm)
}

// 删除用户 此处 parm:{userId:${key}}
export async function deleteUserApi(parm) {
  return await http.delete('/api/sysUser', parm)
}

export function login(data) {
  return request({
    url: '/api/sysUser/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/sysUser/info',
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
