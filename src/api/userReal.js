import http from '@/utils/http'

// 获取用户列表
export async function getIdentityListApi(parm) {
  return await http.get('api/sysUserReal/list', parm)
}

// 新增用户
export async function addIdentityListApi(parm) {
  return await http.post('/api/sysUserReal', parm)
}

// 删除用户 此处 parm:{realId:${key}}
export async function deleteIdentityListApi(parm) {
  return await http.delete('/api/sysUserReal', parm)
}
