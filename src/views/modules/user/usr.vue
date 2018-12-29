<template>
  <div class="mod-user clearfix cnt-wrapper">
    <div class="main">
      <div class="main-form-com">
        <el-form :model="dataForm" :inline="true">
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="addOrUpdateHandle()">新增</el-button>
            <el-button type="danger" size="small" icon="el-icon-delete" @click="deleteCheckedHandle()" :disabled="dataListSelections.length<=0">批量删除</el-button>
            <el-button type="primary" plain size="small" icon="el-icon-edit-outline" @click=''>重设密码</el-button>
            <el-button icon="el-icon-document" size="small" @click='assignpointper()'>分配权限</el-button>
            <el-button icon="el-icon-upload2" size="small" @click="uploadExcelHandle()">批量导入</el-button>
            <el-button type="danger" plain icon="el-icon-mobile-phone" size="small">登记指纹</el-button>
            <el-button type="danger" plain icon="el-icon-mobile-phone" size="small">清空指纹</el-button>
          </el-form-item>
             <!-- <el-form :inline="true" :model="dataForm"> -->
          <el-form-item label="用户名称：">
            <el-input placeholder="用户名称" size="small" clearable></el-input>
          </el-form-item>
          <el-form-item label="所属部门：" prop="organInfo">
            <el-popover ref="menuListPopover" placement="bottom-start" trigger="click">
              <el-tree :data="treeData"  :props="TreeProps" ref="menuListTree" @current-change="ListTreeCurrentChangeHandle" :highlight-current="true" :expand-on-click-node="false">
              </el-tree>
            </el-popover>
            <el-input  size="small" v-model="dataForm.organInfo" v-popover:menuListPopover :readonly="true" placeholder="点击选择所属部门" class="menu-list__input"></el-input>
          </el-form-item>
          <el-form-item label="角色：">
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
          <!-- </el-form> -->
        </el-form>
          <i-table 
          :dataList="dataList"
          :columns="columns"
          :dataListLoading="dataListLoading"
          :totalPage="totalPage"        
          :NoOperation="NoOperation"
          :NoPagination="NoPagination"
          @sizeChangeHandle="sizeChangeHandle"
          @currentChangeHandle="currentChangeHandle"
          @selectionChangeHandle="selectionChangeHandle"
          @addOrUpdateHandle="addOrUpdateHandle"
          @deleteHandle="deleteHandle"
          ></i-table>
      </div>
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <user-upload-excel v-if="uploadExcelVisible" ref="uploadExcel"></user-upload-excel>
    <assign-point-per v-if="assignpointperVisible" ref='assignpointper'></assign-point-per>
      </div>
  </div>
</template>
<script>
import AddOrUpdate from './useAddOrUpdate.vue'
import UserUploadExcel from './user-upload-excel'
import AssignPointPer from './assign-point-per.vue'
import Treeselect from '@riophae/vue-treeselect'
import iTable from '@/components/iTable'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  data() {
    return {
      dataForm: {
        // 用户名称
        userName: '',
        // 所属部门
        organInfo:''
      },
      columns:[
              { 
              prop: 'loginName',
              label: '登录名称' 
              },
              { 
              prop: 'userName',
              label: '用户名称' 
              },
              { 
              prop: 'userSex',
              label: '用户性别' 
              },
              { 
              prop: 'education',
              label: '学历' 
              },
              { 
              prop: 'organInfo',
              label: '所属部门' 
              },
              { 
              prop: 'personStatus',
              label: '人员身份' 
              },
              { 
              prop: 'special',
              label: '专业' 
              },
              { 
              prop: 'phone',
              label: '电话号码' 
              },
              { 
              prop: 'status',
              label: '状态' 
              },
              { 
              prop: 'registerTime',
              label: '注册时间' 
              },
          ],
      propName:'organInfo',
      NoOperation:true,
      NoPagination:true,
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      uploadExcelVisible: false,
      assignpointperVisible: false,
      options: [{
        value: '选项1',
        label: '预警发布员'
      }, {
        value: '选项2',
        label: '预警管理员'
      }, {
        value: '选项3',
        label: '普通管理员'
      }, {
        value: '选项4',
        label: '高级管理员'
      }],
      value: '',
      TreeProps: {
        label: 'label',
        children: 'children'
      },
      treeData: [{
        label: '黑龙江省气象',
        children: [{
          label: '黑龙江省气象科学研究所1',
          children: [{
              label: '三级 1-1-1',
              children: [{
                label: '黑龙江省气象科学研究所2'
              }]
            },
            {
              label: '三级 1-1-2'
            },
            {
              label: '三级 1-1-3'
            },
            {
              label: '三级 1-1-4'
            },
            {
              label: '三级 1-1-5'
            },
            {
              label: '三级 1-1-5'
            }
          ]
        }]
      }, {
        label: '超级管理',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
    }
  },
  components: {
    AddOrUpdate,
    UserUploadExcel,
    AssignPointPer,
    Treeselect,
    iTable
  },
  activated() {
    this.getDataList()
  },
  methods: {
    // 获取用户数据
    getDataList(){
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/module/user/getByPage'),
        method: 'post',
        data:this.$http.adornData({
            'order':'asc',   //排序 升序
            'pageNumber':1,  //页面的页码
            'pageSize':this.pageSize,  //每页数据的条数
            'sort':'loginName',  // 排序的字段  所属部门排列
        })
      }).then(({data})=>{
        console.log(data)
        if (data && data.code === 200){
          data.result.content.forEach((element,index) => {
             if(element.organInfo){
                element.organInfo = element.organInfo.organName
             }else{
                element.organInfo = '无'
             }
             if(element.status == 'enabled'){
               element.status = '可用'
             }
             element.id = element.userGuid
          });

          this.dataList = data.result.content
          this.totalPage = this.dataList.length
        }else{
          this.dataList = []
          this.totalPage = 0
        }
         this.dataListLoading = false
      })
    },
    // 增加、修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
      this.$refs.addOrUpdate.init(id)
      })
    },
    //点击出现批量导入弹窗
    uploadExcelHandle() {
      this.uploadExcelVisible = true
      this.$nextTick(() => {
        this.$refs.uploadExcel.init()
      })
    },
    // 分配权限
    assignpointper() {
      this.assignpointperVisible = true
      this.$nextTick(() => {
        this.$refs.assignpointper.init()
      })
    },
    // 重设密码
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 单行删除
    deleteHandle(user) {
        this.$confirm(`删除用户将删除与之关联的记录，您确定要删除选中的用户吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/module/user/delByIds'),
          method: 'post',
          data: this.$http.adornData({'ids':id})
        }).then(({ data }) => {
          if (data && data.code === 200) {
            // console.log(data)
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    // 批量删除
    deleteCheckedHandle(){
       this.$confirm('删除用户将删除与之关联的记录，您确定要删除选中的用户吗?','提示',{
           confirmButtonText:'确定',
           cancelButtonText:'取消',
           type:'warning'
       }).then(() => {
          this.$http({
              url:this.$http.adornUrl('/module/user/del'),
              method:'post',
              data:this.$http.adornData(this.dataListSelection),
          }).then(({data}) => {
              if(data && data.code === 200){
                  this.$message({
                      message:'操作成功',
                      type:'success',
                      duration:1500,
                      onClose:() => {
                          this.getDataList()
                      }
                  })
              }else{
                  this.$message.error(data.msg)
              }
          })
       }).catch(() => {}) 
    },
    ListTreeCurrentChangeHandle(data, node) {
      this.dataForm.organInfo = data.label
    }
  }
}

</script>
