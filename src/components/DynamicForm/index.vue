<template>
    <div>
    <el-dialog :close-on-click-modal="false" :visible.sync="visible" :title="!dataForm.id ? '增加'+formConfig.title : '修改'+formConfig.title">      
       <el-form class="dynamic-form clearfix" :rules="dataRule" ref="dataForm" :model="dataForm" :label-width="formConfig.labelWidth" >
         <template v-for="item in formConfig.formItemList" 
          v-if="dataForm[item.key]!==undefined"
          @input="handleInput($event, item.key)">
          <el-col :span="item.span" v-show="(item.type=='password'&&dataForm.id)?false:true">
            <el-form-item  :label="item.label" :prop="item.key" >
                 <!-- input text文本输入框 s-->
                 <el-input 
                  v-if="item.type==='input'"
                  v-model="dataForm[item.key]"
                  v-bind="$attrs" v-on="$listeners"
                  type="text"
                  :placeholder="item.placeholder"
                  clearable
                  ></el-input>
                  <!-- input text文本输入框 e-->
                  <!-- input password密码输入框 s -->
                  <el-input
                  v-if="item.type==='password'"

                  v-model="dataForm[item.key]"
                  v-bind="$attrs" v-on="$listeners"
                  type="password"
                  :placeholder="item.placeholder"
                  clearable
                  >
                  </el-input>
                  <!-- input password密码输入框 e -->
                  <!-- input textarea 文本域输入框 s -->
                  <el-input 
                  v-else-if="item.type==='textarea'"
                  v-model="dataForm[item.key]"
                  :rows="5"
                  v-bind="$attrs" v-on="$listeners"
                  type="textarea"
                  :placeholder="item.placeholder"
                  :value="item.value"
                  ></el-input>
                  <!-- input textarea 文本域输入框 e -->
                  <!-- number 数字输入框 s -->
                  <el-input-number 
                   v-bind="$attrs" v-on="$listeners"
                   v-else-if="item.type==='number'" 
                   v-model="dataForm[item.key]"
                   controls-position="right"
                   >
                   </el-input-number>
                  <!-- number 数字输入框 e -->
                  <!-- select下拉选择框 s -->
                  <el-select  v-model="dataForm[item.key]" v-else-if="item.type==='select'" :multiple="item.multiple" :placeholder="item.placeholder">
                    <el-option v-for="o in item.options" :key="o.value" :label="o.label" :value="o.value">
                    </el-option>
                  </el-select>
                  <!-- select下拉选择框 e -->
                  <!-- 日期控件 s -->
                  <el-date-picker v-model="dataForm[item.key]"  v-else-if="item.type==='date'" :type="item.subtype" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :value-format="item.valueFormat" :format="item.viewFormat||item.valueFormat" :placeholder="item.placeholder" :disabled="item.disabled">
                  </el-date-picker>
                  <!-- 日期控件 e -->
                  <!-- 时间控件 s-->
                  <el-time-picker v-model="dataForm[item.key]"  v-else-if="item.type==='time'" :is-range="item.isRange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :value-format="item.valueFormat" :format="item.valueFormat" :placeholder="item.placeholder">
                  </el-time-picker>
                  <!-- 时间控件 e-->
                  <!-- 多层级树形选择框 s -->
                  <el-cascader   v-model="dataForm[item.key]"  v-else-if="item.type==='cascader'" :options="item.options"  :disabled="item.disabled" :clearable="true">
                  </el-cascader>
                  <!-- 多层级树形选择框 e -->
                  <!-- 带树形控件选择框 s -->
                  <template v-else-if="item.type==='treeselect'">
                    <el-popover  placement="bottom-start" trigger="click">
                      <el-tree :data="item.treeData" :props="TreeProps"  ref="menuListTree" @node-click="ListTreeCurrentChangeHandle(item.key,$event)" :highlight-current="true" :expand-on-click-node="false"> 
                      </el-tree> 
                      <el-input v-model="dataForm[item.key]" slot="reference" :placeholder="item.placeholder" :readonly="true"  class="menu-list__input"></el-input>
                    </el-popover>
                  </template>
                  <!-- 带树形控件选择框 e -->
            </el-form-item>
            </el-col>
         </template>
       </el-form>
       <span slot="footer" class="dialog-footer">
           <el-button @click="callOf">取消</el-button>
           <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
       </el-dialog>
    </div>
</template>
<script>
export default {
  data(){
    return{
      TreeProps: {
          label: 'label',
          children: 'children'
        },
        visible:false
       
    }
  },
  props:{
    show:{
      type:Boolean,
      default:false
    },
    formConfig:{
      type:Object,
      required:true
    },
    dataForm:{
      type:Object,
      required:true
    },
    dataRule: {
      type: Object,
      default: null
    }
  },
  watch: {
      
      show() {
      this.visible =this.show;

      },

      visible() {  //点击了对话框“x"号,
      if(!this.visible){
      this.handleColse();
      }
      }

    },
  methods:{
    handleColse(){
         this.$emit("dialogColse") //外部组件监听该方法，修改props中isDialogVisible的值
         this.$refs.dataForm.resetFields()
   },
    handleInput(val, key) {
    // 这里element-ui没有上报event，直接就是value了
      this.$emit('input', { ...this.value, [key]: val })
    },
    // setDefaultValue() {
    //   const formData = { ...this.value }
    //   // 设置默认值
    //   this.formConfig.formItemList.forEach(({ key, value }) => {
    //   if (formData[key] === undefined || formData[key] === null) {
    //     formData[key] = value
    //   }
    //   })
    //   this.$emit('input', formData)
    // },
    ListTreeCurrentChangeHandle(k,data) {
        
      if(!data.children){
        this.dataForm[k] = data.label
        // console.log(data.label)
      }
    },
    //点击取消按钮，隐藏弹窗，清空表单验证
    callOf(){
      this.$emit('isvisible')
      this.$refs.dataForm.resetFields()

    },
    // 表单提交
    submitForm(){
      this.$refs['dataForm'].validate((valid) => {
          if (valid) {
             console.log(this.dataForm)
          }
      })
     
    }
  },
  mounted() {
      // this.setDefaultValue()
      // console.log(this.dataRule)
  },
}
</script>
<style scoped>
.el-date-editor.el-input,.el-input-number {
  width: 100% !important;
}
.el-select,.el-cascader{
  display: block !important;
}

</style>
