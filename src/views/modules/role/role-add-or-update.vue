<template>
  <div>
      <i-form
      :show="show"
      ref="dataForm" 
      :formConfig='formConfig'  
      :dataForm="dataForm" 
      :dataRule="dataRule"
      @keyup.enter.native="dataFormSubmit()"
      @isvisible="isvisible"
      @dialogColse="dialogColse"
      >
      </i-form>
   
  </div>
</template>
<script>
import iForm from '@/components/DynamicForm/index'
export default {
  data() {
    return {
      show:false,
      dataForm: {
        id: 0,
        roleName: '',
        roleDescription: '',
        roleLevel: ''
      },
      tempKey: -666666, // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
      dataRule:{
         roleName: [{
          required: true,
          message: '角色名称不能为空',
          trigger: 'blur'
        }],
        roleLevel: [{
            required: true,
            message: '角色类型不能为空',
            trigger: 'blur'
          }

        ]
      },
      formConfig:{
        'title':'角色',
        "labelWidth": '100px',
        "formItemList":[
          {
            "type": "input",
            "label": "角色名称：",
            "span":24,
            "key": "roleName",
            "value": "roleName",
            "placeholder": "请输入角色名称"
          },
          {
            "type": "input",
            "label": "角色描述：",
            "span":24,
            "key": "roleDescription",
            "value": "roleDescription",
            "placeholder": "请输入角色描述"
          },
          {
            "type": "select",
            "label": "角色类型：",
            "span":24,
            "key": "roleLevel",
            "value": "roleLevel",
            "placeholder": "请选择角色类型",
             "options": [
               {
                  "value": "superAdmin",
                  "label": "超级管理员"
              },
              {
                  "value": "ordinaryAdmin",
                  "label": "普通角色"
              }
              ]
          }

        ]
    }
  }
  },
  components: {
    iForm
  },
  methods: {
     init(id) {
      if(id){
         this.dataForm.organGuid = id
         this.id = true
      }else{
         this.id = false
      }
      // console.log(this.dataForm.id)
      this.show = true
      //如果id存在，即是修改的弹窗，获取后台数据显示在弹窗输入框内
      if (this.dataForm.id) {
        this.$http({
          url: this.$http.adornUrl(`/department/dep/info/${this.dataForm.id}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
            if(data && data.code === 0){
            }
          }

        )
      }
    },
    isvisible(){
      this.show = false
    },
    dialogColse(){
      this.show = false
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/sys/role/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'roleId': this.dataForm.id || undefined,
              'roleName': this.dataForm.roleName,
              'roleDescription': this.dataForm.roleDescription,
              'roleLevel': this.dataForm.roleLevel
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.show = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}

</script>
