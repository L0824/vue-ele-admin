<template>
  <div class="clearfix cnt-wrapper">
    <div class="main">
      <div class="main-form-com">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
          <el-form-item label="系统名称:">
            <el-select size="small" v-model="dataForm.sysName" placeholder="请选择系统名称">
              <el-option label="日志管理系统" value="log"></el-option>
              <el-option label="权限管理系统" value="permission"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模块名称:">
            <el-select size="small" v-model="dataForm.moduleName" placeholder="请选择模块名称">
              <el-option label="模块1" value="log"></el-option>
              <el-option label="模块2" value="permission"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()"> -->
            <el-form-item label="功能点:">
              <el-select size="small" v-model="dataForm.operation" placeholder="请选择功能点">
                <el-option label="模块1" value="log"></el-option>
                <el-option label="模块2" value="permission"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户名称:">
              <el-select size="small" filterable v-model="dataForm.userName" placeholder="请选择用户名称">
                <el-option label="管理员1" value="admin1"></el-option>
                <el-option label="超级管理员" value="superadmin"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作时间:">
              <el-date-picker size="small" v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" icon="el-icon-search">统计</el-button>
            </el-form-item>
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
        @currentChangeHandle="currentChangeHandle">
        </i-table>
      </div>
    </div>
  </div>
</template>
<script>
import iTable from '@/components/iTable'
export default {
  components: { iTable },
  data() {
    return {
      dataForm: {
        sysName: '',
        moduleName: '',
        operation: '',
        userName:''
      },
      value6: '',
      dataListLoading: false,
      dataList: null,
      NoOperation: false,
      NoPagination: true,
      pageSize: 10,
      pageIndex: 1,
      totalPage: 0,
      columns: [{
          prop: 'sysName',
          label: '系统名称'
        },
        {
          prop: 'moduleName',
          label: '模块名称'
        },
        {
          prop: 'operation',
          label: '功能点名称'
        },
        {
          prop: 'opCount',
          label: '功能点总数'
        },
        {
          prop: 'mCount',
          label: '模块操作总数'
        },
        {
          prop: 'sCount',
          label: '系统操作总数'
        }

      ],
    }
  },
  activated() { 
    this.getDataList() 
  },
  methods: {
    //获取表格数据
    getDataList() {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/log/statistics/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'sysName': this.dataForm.sysName,
          'moduleName': this.dataForm.moduleName
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataListLoading = false
          this.dataList = data.page.list
          this.totalPage = data.page.totalCount
          this.dataList = this.dataList.slice((this.pageIndex - 1) * this.pageSize, this.pageIndex * this.pageSize)
        } else {
          this.dataList = []
          this.totalPage = 0
        }
         this.dataListLoading = false
      })
    },
    //每页显示的数量
    sizeChangeHandle(val) {
      this.pageSize = val
      // this.pageIndex = 1
    },
    //当前页
    currentChangeHandle(val) {
      this.pageIndex = val
    }
  }
}

</script>
