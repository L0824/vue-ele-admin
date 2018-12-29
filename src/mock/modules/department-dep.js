import Mock from 'mockjs'
//生成部门数据
var dataList = []
for (let i = 0; i <102; i++) {
    dataList.push(Mock.mock({
        'id': i+1,
        'depName|1':['黑龙江省气象局','超级管理'],
        'depLevel|1':['省级','市级','县级'],
        'AgencySpe|1':['正处级'],
        'tel':/^1[0-9]{10}$/,
        'moneyForm|1':['全额拨款'],
        'code':/^1[0-9]{3}$/
    }))
}

//获取部门列表
export function list(){
    return {
        url:'/department/dep/list',
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

//获取部门信息
export function info(){
    return {
        url:'/department/dep/info',
        type:'get',
        data:{
            'msg':'success',
            'code':0,
            'user':dataList[0]

        }
    }
}

//删除部门
export function del(){
    return {
        url:'/department/dep/delete',
        type:'post',
        data:{
            'msg':'success',
            'code':0
        }
    }
}