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
        sysName: '',
        sysCode: '',
        visitADD: '',
        pictureAdd: '',
        weight: '',
        briefIntro:''
      },
      dataRule: {
        sysName: [
          { required: true, message: '系统名称不能为空', trigger: 'blur' }
        ],
        sysCode: [
          { required: true, message: '系统编码不能为空', trigger: 'blur' }
        ],
        pictureAdd: [
          { required: true, message: '图片地址不能为空', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '权重不能为空', trigger: 'blur' }
        ]
      },
      formConfig:{
        'title':'系统',
        "labelWidth": '100px',
         "formItemList":[
           {
            "type": "input",
            "label": "系统名称：",
            "span":24,
            "key": "sysName",
            "value": "",
            "placeholder": "请输入系统名称"
          },
          {
            "type": "input",
            "label": "系统编码：",
            "span":12,
            "key": "sysCode",
            "value": "",
            "placeholder": "请输入系统编码"
          },
          {
            "type": "input",
            "label": "访问地址：",
            "span":12,
            "key": "visitADD",
            "value": "",
            "placeholder": "请输入访问地址"
          },
          {
            "type": "input",
            "label": "图片地址：",
            "span":12,
            "key": "pictureAdd",
            "value": "",
            "placeholder": "请输入图片地址"
          },
          {
            "type": "number",
            "label": "权重：",
            "span":12,
            "key": "weight",
            "value": "",
            "placeholder": "请输入权重"
          },
          {
            "type": "textarea",
            "subtype": "textarea",
            "label": "简介：",
            "span":24,
            "key": "briefIntro",
            "value": "",
            "placeholder": "请输入简介"
          }
        ],
      }
    }
  },
  components: {
    iForm
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.$http({
        url: this.$http.adornUrl('/sys/sys/list'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.sysList = data && data.code === 0 ? data.list : []
      }).then(() => {
        this.show = true
        this.$nextTick(() => {})
      }).then(() => {
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/sys/sys/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.dataForm.sysName = data.sys.sysName
              this.dataForm.sysCode = data.sys.sysCode
              this.dataForm.visitADD = data.sys.visitADD
              this.dataForm.pictureAdd = data.sys.pictureAdd
              this.dataForm.weight = data.sys.weight
              this.dataForm.briefIntro = data.sys.briefIntro
            }
          })
        }
      })
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
            url: this.$http.adornUrl(`/sys/sys/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'sysId': this.dataForm.id || undefined,
              'sysName': this.dataForm.sysName,
              'sysCode': this.dataForm.sysCode,
              'visitADD': this.dataForm.visitADD,
              'pictureAdd': this.dataForm.pictureAdd,
              'weight': this.dataForm.weight
            })
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.show = false
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
