<template>
  <div>
    <el-dialog :close-on-click-modal="false"   :visible.sync="visible" title="日志信息">
      <p class="logTitle">日志详细信息</p>
      <i-form 
      :dataForm="dataForm"
      ref="dataForm" 
      :formArr='formArr' 
      :labelWidth='labelWidth' 
      @keyup.enter.native="dataFormSubmit()">
      </i-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import iForm from '@/components/DynamicForm/index'
export default {
  data() {
    return {
     formArr: [{
        "type": "input",
        "subtype": "text",
        "label": "登录名称：",
        "key": "loginName",
        "value": "",
        "placeholder": "登录名称"
      }, {
        "type": "input",
        "subtype": "text",
        "label": "用户名称：",
        "key": "userName",
        "value": "",
        "placeholder": "用户名称"
      }, {
        "type": "input",
        "subtype": "text",
        "label": "系统名称：",
        "key": "sysName",
        "value": "",
        "placeholder": "系统名称"
      },{
        "type": "input",
        "subtype": "text",
        "label": "模块名称：",
        "key": "moduleName",
        "value": "",
        "placeholder": "模块名称"
      },{
        "type": "input",
        "subtype": "text",
        "label": "功能点：",
        "key": "functionName",
        "value": "",
        "placeholder": "功能点"
      },{
        "type": "input",
        "subtype": "text",
        "label": "操作时间：",
        "key": "createTime",
        "value": "",
        "placeholder": "操作时间"
      },{
        "type": "input",
        "subtype": "text",
        "label": "IP地址：",
        "key": "ipAddress",
        "value": "",
        "placeholder": "IP地址"
      },{
        "type": "input",
        "subtype": "textarea",
        "label": "操作内容：",
        "key": "content",
        "value": "",
      }],
      value: '',
      dataForm: {
        id: 0,
        roleName: '',
        roleDec: '',
        roleType: ''
      },
      labelWidth:'100px',
      visible: false,
    }
  },
  components: {
    iForm
  },
  methods: {
    init() {
      this.visible = true
    },
    // 表单提交
    /*dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/sys/role/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'roleId': this.dataForm.id || undefined,
              'roleName': this.dataForm.roleName,
              'roleDec': this.dataForm.roleDec,
              'roleType': this.dataForm.roleType
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }*/
  }
}

</script>
<style scoped>
  .logTitle{
     font-size: 16px;
     margin-top: -20px;
     margin-bottom: 30px;
     border-bottom: 1px solid #ccc;
  }
</style>
