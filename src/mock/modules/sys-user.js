import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < 20; i++) {
  dataList.push(Mock.mock({
    'id': i+1,
    'loginName|1':['caiji','yumin','jishengtai','hanjunjie','wangping','xinlinqixiangju','caokuo','xuruiya'],
    'userName|1': ['信息采集','于敏','季生太','韩俊杰','王萍','新林气象局','曹阔','徐瑞佳'],
    'userSex|1': ['男','女'],
    'education|1':['本科','博士','硕士'],
    'department|1':['黑龙江省气象局','黑龙江省气象科学研究所','新林气象局'],
    'userID':'事业',
    'major':'气象服务与应用',
    'phone': /^1[0-9]{10}$/,
    'status':'可用',
    'registerTime': '@datetime',
    'roleIdList': null,
    'createUserId': 1,
  }))
}

// 获取用户列表
export function list () {
  return {
    // isOpen: false,
    url: '/sys/user/list',
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

// 获取用户信息
export function info () {
  return {
    // isOpen: false,
    url: '/sys/user/info',
    type: 'get',
    data: {
      'msg': 'success',
      'code': 0,
      'user': dataList[0]
    }
  }
}

// 修改密码
export function updatePassword () {
  return {
    // isOpen: false,
    url: '/sys/user/password',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 添加用户
export function add () {
  return {
    // isOpen: false,
    url: '/sys/user/save',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 修改用户
export function update () {
  return {
    // isOpen: false,
    url: '/sys/user/update',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}

// 删除用户
export function del () {
  return {
    // isOpen: false,
    url: '/sys/user/delete',
    type: 'post',
    data: {
      'msg': 'success',
      'code': 0
    }
  }
}
