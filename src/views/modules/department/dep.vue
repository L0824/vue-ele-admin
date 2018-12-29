<template>
<div class="clearfix cnt-wrapper" :class="{'cnt-fold':depTreeFold}">
    <aside-tree
     @treeFold="treeFold" 
     :treeData="treeData" 
     :treeTitle="treeTitle">
    </aside-tree>
    <div class="right-form"> 
        <div class="right-main">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
                <el-input size="small" placeholder="部门名称" v-model="dataForm.depname" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" icon="el-icon-search" @click="getDataList()">查询</el-button>
            </el-form-item>
            <el-form-item>    
                <el-button size="small" type="primary" icon="el-icon-plus" @click="addOrUpdateHandle(false)">增加</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteCheckedHandle()" :disabled="dataListSelection.length<=0">批量删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" icon="el-icon-upload2" @click="uploadExcelHandle()">批量导入</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" icon="el-icon-download" @click="exportExcelHandle()">模板下载</el-button>
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
    <!-- 修改/新增  s-->
    <add-or-update v-show="addOrUpdateVisible" ref="addOrUpdate"  @refreshDataList = "getDataList()" ></add-or-update>
    <!-- 修改/新增  e-->
    <!-- 批量导入 s-->
    <upload-excel v-show="uploadExcelVisible" ref="uploadExcel"></upload-excel>
    <!-- 批量导入 e-->
    </div>
    </div>
</template>
<script>
import axios from 'axios'
import iTable from '@/components/iTable'
// import AddOrUpdate from './add-or-update'
import AddOrUpdate from './AddOrUpdate.vue'
import AsideTree from '@/components//AsideTree'
import UploadExcel from './upload-excel'
export default {
    data(){
        return {
            dataForm:{
                depname:''
            },
            treeTitle:'部门结构',
            treeData:[{
            label: '一级 1',
            children: [{
                label: '二级 1-1',
                children: [{
                label: '三级 1-1-1',
                children:[{
                    label:'杜尔伯特蒙古族自治县气象局444444'
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
            label: '一级 2',
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
            dataList:null,
            dataListLoading:false,
            NoOperation:true,
            NoPagination:true,
            columns:[
                { 
                prop: 'organName',
                label: '部门名称' 
                },
                { 
                prop: 'levelName',
                label: '部门级别' 
                },
                { 
                prop: 'grade',
                label: '机构规格' 
                },
                { 
                prop: 'contactPhone',
                label: '联系电话' 
                },
                { 
                prop: 'ecType',
                label: '经费形式' 
                },
                { 
                prop: 'oraganAddress',
                label: '所在地区编码' 
                },
            ],
            pageSize: 10,
            pageIndex: 1,
            totalPage:0,
            dataListSelection:[],
            addOrUpdateVisible:false,
            uploadExcelVisible:false,
            data:null
        }
    },
    mounted(){
        this.getData()
    },
    computed:{
        depTreeFold:{
            get(){
                return this.$store.state.common.depTreeFold
            },
            set(val){
                this.$store.commit('common/updateDepTreeFold',val)
            }
        }
    },
    components:{
        AddOrUpdate,AsideTree,UploadExcel
        ,iTable
    },
    activated(){
        this.getDataList()
    },
    mounted(){
        // this.getData()
    },
    methods:{
        getTreeData(){
            // window.location.href = 'http://192.168.1.38:8080/rmis_new/maintain/security/organ/tree_ajax'
            this.$http({
                url:this.$http.adornUrl('/module/organ/getAll'),
                method:'get',
            }).then(({data}) => {
                
                })
        },
        //获取部门列表
        getDataList (){
            this.dataListLoading = true
            this.$http({
                url:this.$http.adornUrl('/module/organ/getByPage'),
                method:'post',
                data:this.$http.adornData({
                    'order':'asc',
                    'pageNumber':this.pageIndex,
                    'pageSize':this.pageSize,
                    'sort':'organName',
                })
            }).then(({data}) => {
                if(data && data.code === 200){
                    console.log(data)
                    this.dataListLoading = false
                    data.result.content.forEach(element => {
                        element.id = element.organGuid
                    });
                    this.dataList = data.result.content
                    this.totalPage = this.dataList.length

                    // this.dataList= this.dataList.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
                    // console.log('this.dataList'+this.dataList)
                }else{
                    this.dataList = []
                    this.totalPage = 0
                }
                 this.dataListLoading = false
            })
        },
      
        // 树目录组件传折叠状态给dep父组件
        treeFold(val){
            this.depTreeFold = val
        },
       //子组件传递给父组件的每页显示的数量
        sizeChangeHandle(val){
            this.pageSize = val
            this.getDataList()
            // console.log(val)
        },
        //子组件传递给父组件的当前页
        currentChangeHandle(val){
            this.pageIndex = val
            this.getDataList()
        },
        //子组件传递给父组件的勾选项
        selectionChangeHandle(val){
            
           this.dataListSelection = val
           console.log(val)
        },
        //单行删除
        deleteHandle(id){
        //    var depIds = id ? [id] :this.dataListSelection.map(item => {
        //        return item.depId
        //    })
           this.$confirm('删除部门将删除与之关联的记录，您确定要删除选中的部门吗?','提示',{
               confirmButtonText:'确定',
               cancelButtonText:'取消',
               type:'warning'
           }).then(() => {
              this.$http({
                  url:this.$http.adornUrl('/module/organ/delByIds'),
                  method:'post',
                  data:this.$http.adornData({'ids':id}),
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
        // 批量删除
        deleteCheckedHandle(){
           this.$confirm('删除部门将删除与之关联的记录，您确定要删除选中的部门吗?','提示',{
               confirmButtonText:'确定',
               cancelButtonText:'取消',
               type:'warning'
           }).then(() => {
              this.$http({
                  url:this.$http.adornUrl('/module/organ/del'),
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
        // 点击出现 添加弹窗
        addOrUpdateHandle(id){
            // console.log(id)
            this.addOrUpdateVisible = true
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(id)
            })
        },
        //点击出现批量导入弹窗
        uploadExcelHandle(){
            this.uploadExcelVisible = true
             this.$nextTick(() => {
                this.$refs.uploadExcel.init()
            })
        },
        // 模板下载
        exportExcelHandle(){
            import('@/vendor/Export2Excel').then(
                excel => {
                    const tHeader = []
                    const filterVal = []
                   excel.export_json_to_excel(tHeader,this.data,'test')
                }
            )
        }

    }
}
</script>

