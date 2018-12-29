<template>
    <div class="clearfix cnt-wrapper" :class="{'cnt-fold':modTreeFold}">
        <aside-tree @treeFold="treeFold" :treeData="treeData" :treeTitle="treeTitle"></aside-tree>
        <div class="right-form">
            <div class="right-main">
            <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
            <el-form-item>
                <el-input size="small" placeholder="模块名称" v-model="dataForm.modName" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button size="small" icon="el-icon-search" >查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" icon="el-icon-plus" @click="addOrUpdateHandle(false)">增加</el-button>                
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="danger" icon="el-icon-delete" @click="deleteHandle()" :disabled="dataListSelection.length<=0">批量删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button size="small" icon="el-icon-upload2" @click="uploadExcelHandle()">批量导入</el-button>                
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
        >           
        </i-table>
    </div>
     <!-- 修改/新增  s-->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList = "getDataList()"></add-or-update>
    <!-- 修改/新增  e-->
     <!-- 批量导入 s-->
    <upload-excel v-if="uploadExcelVisible" ref="uploadExcel"></upload-excel>
    <!-- 批量导入 e-->
    </div>
    </div>
</template>


<script>
// import AddOrUpdate from './add-or-update'
import AddOrUpdate from './mod-add-or-update.vue'
import iTable from '@/components/iTable'
import AsideTree from '@/components/AsideTree'
import UploadExcel from './upload-excel'

export default {
    data(){
        return{
            dataForm:{
                modName:''
            },
            treeTitle:'模块结构',
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
            }, 
            {
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
                prop: 'modName',
                label: '模块名称' 
                },
                { 
                prop: 'modDesc',
                label: '模块描述' 
                },
                { 
                prop: 'modAdr',
                label: '模块地址' 
                },
                { 
                prop: 'orderId',
                label: '权重' 
                },
                { 
                prop: 'sys',
                label: '所属系统' 
                }
               
            ],
            pageSize: 10,
            pageIndex: 1,
            totalPage:0,
            addOrUpdateVisible:false,
            dataListSelection:[],
            uploadExcelVisible:false,
            
        }
    },
    components:{
        AsideTree,AddOrUpdate,UploadExcel,iTable
    },
    activated(){
        this.getDataList()
    },
     computed:{
        modTreeFold:{
            get(){
                return this.$store.state.common.modTreeFold
            },
            set(val){
                this.$store.commit('common/updateModTreeFold',val)
            }
        }
    },
    methods:{
        //获取模块列表
        getDataList (){          
            this.dataListLoading = true
            this.$http({
                url:this.$http.adornUrl('/module/mod/list'),
                method:'get',
                params:this.$http.adornParams({
                    'page':this.pageIndex,
                    'limit':this.pageSize,
                    'depname':this.depname
                })
            }).then(({data}) => {
               
                if(data && data.code === 0){
                    // console.log(data)
                    this.dataListLoading = false
                    this.dataList = data.page.list
                    this.totalPage = data.page.totalCount
                    this.dataList= this.dataList.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize)
                    // console.log('this.dataList'+this.dataList)
                }else{
                    this.dataList = []
                    this.totalPage = 0
                }
            })
        },
         // 树目录组件传折叠状态给dep父组件
        treeFold(val){
            this.modTreeFold = val
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
        //    console.log(val)
        },
        // 点击出现 添加/修改弹窗
        addOrUpdateHandle(id){
            
            this.addOrUpdateVisible = true
            this.$nextTick(() => {
                this.$refs.addOrUpdate.init(id)
            })
        },
        deleteHandle(id){
            var modIds = id ? [id] :this.dataListSelection.map(item => {
               return item.modId
           })
           this.$confirm('删除模块将删除与之关联的记录，您确定删除选中的模块吗?','提示',{
               confirmButtonText:'确定',
               cancelButtonText:'取消',
               type:'warning'
           }).then(() => {
              this.$http({
                  url:this.$http.adornUrl('/module/mod/delete'),
                  method:'post',
                  data:this.$http.adornData(modIds,false)
              }).then(({data}) => {
                  if(data && data.code === 0){
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
        uploadExcelHandle(){
            this.uploadExcelVisible = true
             this.$nextTick(() => {
                this.$refs.uploadExcel.init()
            })
        }
    }
}
</script>

<style>

</style>

