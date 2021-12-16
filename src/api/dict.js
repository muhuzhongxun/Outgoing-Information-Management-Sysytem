import http from '@/utils/http'

// 根据id对应的子数据列表
export async function getDictListApi(parm) {
  return await http.get('/api/dict/findChildData', parm)
}
