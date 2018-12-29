<template>
    <div class="treesContainer">
        <div class="tree-title">
            <span class="title-text" v-text="treeTitle"></span>
            <div>
             <i class="el-icon-refresh el-btn"></i>   
             <i class="el-close el-btn" :class="'el-icon-d-arrow-'+foldBtn " @click="treeFold()"></i>
            </div>
        </div>    
        <div class="main-tree">
            <el-scrollbar class="aside-tree__scroll">
                <el-tree  ref="tree" :data="treeData" :props="defaultProps"  :expand-on-click-node="false"    @node-click="handleNodeClick"></el-tree>
            </el-scrollbar>
        </div>
         
    </div>
</template>
<script>
export default {
    data(){
        return{
            treeCollpase:false,
            foldBtn:'left',
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    props:{
        treeData:{
            type:Array,
            default:[]
        },
        treeTitle:{
            type:String
        }
    },
    methods:{
        treeFold(){
            this.treeCollpase = !this.treeCollpase
            if(this.treeCollpase){
               this.foldBtn = 'right'   
            }else{
                this.foldBtn = 'left'
            }
            this.$emit('treeFold',this.treeCollpase)
        },
       handleNodeClick(data,node,vuecomponent) {
            var currentNode = this.$refs.tree.getCurrentNode().children
            console.log(currentNode)
      }
    }
}
</script>

