import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < 20; i++) {
  dataList.push(Mock.mock({
    'id':i+1,
    'sysName|1':['黑龙江突发事件预警信息发布系统','日志管理系统','权限管理系统'],
    'sysCode|1':['HLJGT','logms','rmis'],
    'createUser':'超级管理员',
    'createTime':"@datetime",
    'visitADD|1':['http://127.0.0.1:8080/gt','http://10.1.4.92:8080/logms_n','http://10.1.4.92:8080/rmis_new'],
    'weight|1':['1','0','3'],
    'briefIntro|1':['','日志管理系统负责日志统计、分析、查询','权限管理系统负责系统的权限分配、用户的管理'],
    'pictureAdd|1':['','http://10.1.4.92:8080/rmis_files/logms.png','http://10.1.4.92:8080/rmis_files/rmis.png']
  }))
}

// 获取参数列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/sys/list',
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

// 获取参数信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/sys/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'sys': dataList[0]
    }
  }
}

// 添加参数
export function add () {
  return {
    // isOpen: false,
    url: '/sys/sys/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改参数
export function update () {
  return {
    // isOpen: false,
    url: '/sys/sys/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除参数
export function del () {
  return {
    // isOpen: false,
    url: '/sys/sys/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
