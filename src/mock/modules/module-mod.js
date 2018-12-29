import Mock from 'mockjs'
//生成模块数据
var dataList = []
for (let i = 0; i <20; i++) {
    dataList.push(Mock.mock({
        'id': i+1,
        'modName|1':['黑龙江突发事件预警信息发布系统','日志查看','信息发布管理','数字预案'],
        'modDesc|1':['权限管理模块','后端','日志监控管理'],
        'modAdr|1':['/maintain/security/role/tree_list','monitor/systemLogger'],
        'orderId':/^[0-9]{1}$/,
        'sys|1':['权限管理系统','日志管理系统','黑龙江突发事件预警信息发布系统']
    }))
}

//获取模块列表
export function list(){
    return {
        url:'/module/mod/list',
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

//获取模块信息
export function info(){
    return {
        url:'/module/mod/info',
        type:'get',
        data:{
            'msg':'success',
            'code':0,
            'user':dataList[0]

        }
    }
}

//删除模块
export function del(){
    return {
        url:'/module/mod/delete',
        type:'post',
        data:{
            'msg':'success',
            'code':0
        }
    }
}