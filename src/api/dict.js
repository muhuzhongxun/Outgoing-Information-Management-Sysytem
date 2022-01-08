import http from '@/utils/http'

// 根据id对应的子数据列表,status为true时，后端返回添加HasChildren属性
export async function getDictListApi(parm) {
  return await http.get('/api/dict/findChildData?status=true', parm)
}

// 模糊查询
export async function FlexibleQueryDictApi(parm) {
  return await http.get('/api/dict/FlexibleQueryDict', parm)
}
