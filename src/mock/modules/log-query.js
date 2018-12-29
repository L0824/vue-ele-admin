import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < 2; i++) {
  dataList.push(Mock.mock({
    'id': i + 1,
    'userName|1': ['超级管理员', ''],
    'functionName': '',
    'content|1': ['查询记录,详细参数:admin;logms;backend;', '我的'],
    'createTime': '@datetime',
    'ipAddress|1': ['127.0.0.1', '0:0:0:0:0:0:0:1'],
    'sysName|1': ['权限管理系统', '日志管理系统'],
    'moduleName': ''
  }))
}

// 获取数据列表
export function list() {
  return {
    // isOpen: false,
    url: '/log/query/list',
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


export function select() {
  return {
    // isOpen: false,
    url: '/log/query/select',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'list': dataList
    }
  }
}

export function info() {
  return {
    // isOpen: false,
    url: '/log/query/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'query': dataList[0]
    }
  }
}
