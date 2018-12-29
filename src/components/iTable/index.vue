<template>
<div class="table-pagination">
     <el-table 
     border 
     row-class-name="tableTr"
     :data="dataList" 
     v-loading="dataListLoading" 
     height="300"
     @selection-change="selectionChangeHandle"
     @row-click="clickRow"
     ref="Table"
     >
        <!-- 选择框 s-->
        <el-table-column type="selection" header-align="center" align="center">
        </el-table-column>
        <!-- 选择框 e-->  
        <!-- 数据列 s-->
        <template v-for="column in columns">
            <el-table-column v-bind:prop="column.prop" v-bind:label="column.label" align="center" header-align="center"></el-table-column>
        </template>
        <!-- 数据列 e-->
        <!-- 操作按钮 s-->
        <el-table-column v-if="NoOperation" label="操作" header-align="center" align="center">
            <template slot-scope="scope">
                <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
                <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
        <!-- 操作按钮 e-->
    </el-table>
    <el-pagination
    v-if="NoPagination"
    @size-change="sizeChangeHandle"
    @current-change="currentChangeHandle"
    :current-page="pageIndex"
    :page-sizes="[10, 20, 50, 100]"
    :page-size="pageSize"
    :total="totalPage"
    layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
</div>
</template>
<script>

export default {
    props:{
    
        dataList:{
            type:Array
        },
        columns:{
            type:Array,
            default:[]
        },
        dataListLoading:{
            type:Boolean,
            default:'false'
        },
        totalPage:{
            type:Number,
            default:0
        },
        NoOperation:{
            type:Boolean,
            default:'false'
        },
        NoPagination:{
            type:Boolean,
            default:'false'
        }
    },
    data(){
        return {
            pageSize: 10,
            pageIndex: 1,
            dataListSelection:[]
        }
    }, 
    methods:{
        //每页显示的数量
        sizeChangeHandle(val){       
            this.pageSize = val
            this.pageIndex = 1
            this.$emit('sizeChangeHandle',this.pageSize) 
        },
        //当前页
        currentChangeHandle(val){
            this.pageIndex = val
            this.$emit('currentChangeHandle',this.pageIndex)   
        },
        //多选
        selectionChangeHandle(val){
            this.dataListSelection = val
            this.$emit('selectionChangeHandle',this.dataListSelection)
        },
        // 修改
        addOrUpdateHandle(x){
            // alert(x)
            this.$emit('addOrUpdateHandle',x)
        },
        deleteHandle(x){
            this.$emit('deleteHandle',x)
        },
        clickRow(row){
            this.$refs.Table.toggleRowSelection(row)
        }
    }
}
</script>

