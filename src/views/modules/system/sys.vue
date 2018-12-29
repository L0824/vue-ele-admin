<template>
  <div class="mod-sys clearfix cnt-wrapper">
     <div class="main"> 
        <div class='main-form-com'>
          <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle(false)" size="small">新增</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deleteHandle()" :disabled="dataListSelections.length<=0" size="small">批量删除</el-button>
            <el-button icon="el-icon-document" size="small">授权</el-button>
          </el-form-item>
          <el-form-item label="操作时间:">
            <el-date-picker size="small"  v-model="value3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="系统名称：">
            <el-input placeholder="系统名称" size="small" v-model="dataForm.sysName" clearable></el-input>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" icon="el-icon-search" size="small">查询</el-button>
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
      <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
     </div>
  </div>
</template>
<script>
// import AddOrUpdate from './sys-add-or-update.vue'
import AddOrUpdate from './sysAddOrUpdate.vue'
import iTable from '@/components/iTable'
export default {
  data() {
    return {
      value3: '',
      dataForm: {
        sysName: ''
      },
       columns:[
              { 
              prop: 'sysName',
              label: '系统名称' 
              },
              { 
              prop: 'sysCode',
              label: '系统编码' 
              },
              { 
              prop: 'userInfo',
              label: '创建者' 
              },
              { 
              prop: 'createTime',
              label: '创建时间' 
              },
              { 
              prop: 'visitUrl',
              label: '访问地址' 
              },
              { 
              prop: 'priority',
              label: '权重' 
              },
              { 
              prop: 'description',
              label: '简介' 
              },
              { 
              prop: 'imageUrl',
              label: '图片地址' 
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
      addOrUpdateVisible: false
    };
  },
  activated() {
    this.getDataList()
  },
  components: {
    AddOrUpdate,
    iTable
  },
  methods: {
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    getDataList() {
      // this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/module/system/getByPage'),
        method: 'post',
        params: this.$http.adornParams({
          'order':'asc',   //排序 升序
          'pageNumber':1,  //页面的页码
          'pageSize':this.pageSize,  //每页数据的条数
          'sort':'',  // 排序的字段  所属部门排列
        })
      }).then(({ data }) => {
        console.log(data)
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
        return item.sysId
      })
      this.$confirm(`删除系统将删除与之关联的记录，您确定要删除选中的系统吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/sys/sys/delete'),
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
};
</script>