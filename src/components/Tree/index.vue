<template>
  <div>
    <el-form class="dynamic-form" :model="dataForm" :label-width="labelWidth">
      <el-col :span='span'>
        <el-form-item :label="labelName" :prop="propName">
          <el-popover ref="menuListPopover" placement="bottom-start" trigger="click">
            <el-tree 
            :data="treeData" 
            :props="TreeProps" 
            ref="menuListTree" 
            @current-change="ListTreeCurrentChangeHandle" 
            :highlight-current="true" 
            :expand-on-click-node="false">
            </el-tree>
          </el-popover>
          <el-input  v-model="dataForm.organGuide" v-popover:menuListPopover :readonly="true" :placeholder="placeholder" class="menu-list__input"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>
<script>
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  props: {
    span: {
      type: Number,
      default: null
    },
    propName:{
      type: String,
      default: ''
    },
    dataForm: {
      type: Object,
      default: ''
    },
    placeholder:{
      type: String,
      default: ''
    },
    labelName:{
      type: String,
      default: ''
    },
     labelWidth: {
      type: String,
      default: ''
    },
    treeData:{
      type: Array,
      default: null
    },
    TreeProps:{
      type: Object,
      default: ''
    }
  },
  components:{
    Treeselect
  },
  methods:{
    ListTreeCurrentChangeHandle(data, node) {

      this.dataForm.organGuide = data.label
    }
  }
}

</script>
