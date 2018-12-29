import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < 2; i++) {
  dataList.push(Mock.mock({
    'id': i + 1,
    'sysName|1': ['权限管理系统', '日志管理系统'],
    'moduleName': '',
    'operation': '',
    'opCount': '1',
    'mCount': '1',
    'sCount': '1',

  }))
}

// 获取数据列表
export function list() {
  return {
    // isOpen: false,
    url: '/log/statistics/list',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'page': {
        'totalCount': dataList.length,
        'pageSize': 10,
        'totalPage': 1,
        'currPage': 1,
        'list': dataList
      }
    }
  }
}