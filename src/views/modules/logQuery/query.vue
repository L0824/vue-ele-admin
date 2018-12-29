<template>
  <div class="clearfix cnt-wrapper">
    <div class="main">
      <div class="main-form-com">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
          <el-form-item>
            <el-button size="small" type="danger" icon="el-icon-document"  @click="details()" >详情</el-button>
            <el-button size="small" type="warning" icon="el-icon-location-outline">IP归属</el-button>
          </el-form-item>
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
            <el-form-item label="操作时间:">
              <el-date-picker size="small" v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> 
              </el-date-picker>
            </el-form-item>
            <el-form-item label="用户名称:">
              <el-select size="small" filterable v-model="dataForm.userName" placeholder="请选择用户名称">
                <el-option label="管理员1" value="admin1"></el-option>
                <el-option label="超级管理员" value="superadmin"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="功能点:">
              <el-select size="small" v-model="dataForm.sysDot" placeholder="请选择功能点">
                <el-option label="模块1" value="log"></el-option>
                <el-option label="模块2" value="permission"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" icon="el-icon-search">查询</el-button>
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
        @selectionChangeHandle="selectionChangeHandle">
        </i-table>
        <!-- <el-table border :data="dataList" v-loading="dataListLoading" height="300"
           >
                <el-table-column type="selection" header-align="center" align="center">
                </el-table-column>
                <el-table-column   label="用户名称" header-align="center" align="center">
                </el-table-column>
                <el-table-column   label="功能点名称" header-align="center" align="center">
                </el-table-column>
                <el-table-column  label="操作内容" header-align="center" align="center">
                </el-table-column>
                <el-table-column  label="操作时间" header-align="center" align="center">
                </el-table-column>
                <el-table-column  label="IP地址" header-align="center" align="center">
                </el-table-column>
                <el-table-column  label="系统名称" header-align="center" align="center">
                </el-table-column>
                <el-table-column  label="模块名称" header-align="center" align="center">
                </el-table-column>
        
               
            </el-table>
        <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination> -->
      </div>
      <i-details v-if="detailsVisible" ref='details'></i-details>
    </div>
  </div>
</template>
<script>
import iTable from '@/components/iTable'
import iDetails from './details.vue'
export default {
  components: { iTable,iDetails },
  data() {
    return {
      dataForm: {
        sysName: '',
        userName: '',
        moduleName:'',
        sysDot: ''
      },
      value6: '',
      dataListLoading: false,
      dataList: null,
      NoOperation: false,
      NoPagination: true,
      pageSize: 10,
      pageIndex: 1,
      totalPage: 0,
      dataListSelection: [],
      detailsVisible:false,
      columns: [{
          prop: 'userName',
          label: '用户名称'
        },
        {
          prop: 'functionName',
          label: '功能点名称'
        },
        {
          prop: 'content',
          label: '操作内容'
        },
        {
          prop: 'createTime',
          label: '操作时间'
        },
        {
          prop: 'ipAddress',
          label: 'IP地址'
        },
        {
          prop: 'sysName',
          label: '系统名称'
        },
        {
          prop: 'moduleName',
          label: '模块名称'
        }
      ],
    }
  },
  activated() {
    this.getDataList()
    console.log(123)
  },
  methods: {
    //获取表格数据
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl('/log/query/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'userName': this.dataForm.userName
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
    details(id) {
      this.detailsVisible = true
      this.$nextTick(() => {
        this.$refs.details.init(id)
      })
    },
    //子组件传递给父组件的每页显示的数量
    sizeChangeHandle(val) {
      this.pageSize = val
    },
    //子组件传递给父组件的当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      // this.getDataList()
    },
    //子组件传递给父组件的勾选项
    selectionChangeHandle(val) {
      this.dataListSelection = val
    },
  }
}

</script>
