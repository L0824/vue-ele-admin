<template>
  <div class="mod-role clearfix cnt-wrapper">
    <div class="main">
       <div class="main-form-com">
        <el-form :inline="true" :model='dataForm' @keyup.enter.native="getDataList()">
          <el-form-item>
            <el-input size="small" v-model="dataForm.roleName" placeholder="角色名称" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" @click="getDataList()" size="small">查询</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle(false)" size="small">新增</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteHandle()" :disabled="dataListSelections.length<=0" size="small">批量删除</el-button>
            <el-button icon="el-icon-document" @click="assignFunPointPer()" size="small">分配功能点权限</el-button>
          </el-form-item>
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
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <assign-fun-point-per v-if="AssignFunPointPerVisible" ref='AssignFunPointPer'></assign-fun-point-per>
    </div>
  </div>
</template>
<script>
import AddOrUpdate from './role-add-or-update'
// import AddOrUpdate from './roleAddOrUpdate.vue'
import AssignFunPointPer from './assign-fun-point-per'
import iTable from '@/components/iTable'
export default {
  data() {
    return {
      dataForm: {
        roleName: ''
      },
      columns:[
                { 
                prop: 'roleName',
                label: '角色名称' 
                },
                { 
                prop: 'roleDescription',
                label: '角色描述' 
                },
                { 
                prop: 'roleLevel',
                label: '角色类型' 
                },
                { 
                prop: 'createTime',
                label: '创建时间' 
                },
                { 
                prop: 'organInfo',
                label: '创建部门' 
                }
           ],
      NoOperation:true,
      NoPagination:true,
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      AssignFunPointPerVisible: false
    }
  },
  components: {
    AddOrUpdate,
    AssignFunPointPer,
    iTable
  },
  activated() {
    this.getDataList()
  },
  // 增加
  methods: {
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 分配权限点功能
    assignFunPointPer() {
      this.AssignFunPointPerVisible = true
      this.$nextTick(() => {
        this.$refs.AssignFunPointPer.init()
      })
    },
    getDataList() {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/module/role/getByPage'),
        method: 'post',
        params: this.$http.adornParams({
          'order':'asc',   //排序 升序
          'pageNumber':1,  //页面的页码
          'pageSize':this.pageSize,  //每页数据的条数
          'sort':'',  // 排序的字段 
        })
      }).then(({ data }) => {
        console.log(data)
        if (data && data.code === 200) {
           data.result.content.forEach((element)=>{
              if(element.organInfo){
                 element.organInfo =  element.organInfo.organName
              }else{
                 element.organInfo = '无'
              }
              if(element.roleLevel == '2'){
                element.roleLevel = '超级管理员'
              }else{
                element.roleLevel = '普通角色'
              }
              element.id = element.roleGuid
           })
           this.dataList = data.result.content
           this.totalPage = this.dataList.length
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
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
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.roleId
      })
      this.$confirm(`删除角色将删除与之关联的记录，您确定要删除选中的角色吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/sys/role/delete'),
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code === 0) {
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
    }
  }
}

</script>
