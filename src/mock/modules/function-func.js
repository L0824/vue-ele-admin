import Mock from 'mockjs'
//生成功能点数据
var dataList = []
for (let i = 0; i <2; i++) {
    dataList.push(Mock.mock({
        'id': i+1,
        'funcName|1':['黑龙江突发事件预警信息发布系统','日志查看','信息发布管理','数字预案'],
        'funcDesc|1':['权限管理模块','后端','日志监控管理'],
        'opeName|1':['权限管理系统','日志管理系统','黑龙江突发事件预警信息发布系统']
    }))
}

//获取功能点列表
export function list(){
    return {
        url:'/function/func/list',
        get:'get',
        data:{
            'msg':'success',
            'code':0,
            'page':{
                'totalCount':dataList.length,
                'pageSize':10,
                'totalPage':1,
                'list':dataList
            }
        }
    } 

}

//获取功能点信息
export function info(){
    return {
        url:'/function/func/info',
        type:'get',
        data:{
            'msg':'success',
            'code':0,
            'user':dataList[0]

        }
    }
}

//删除功能点
export function del(){
    return {
        url:'/function/func/delete',
        type:'post',
        data:{
            'msg':'success',
            'code':0
        }
    }
}