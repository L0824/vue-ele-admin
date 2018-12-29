
<template>
  <div>
      <i-form
      :show="show"
      :id="id"
      :formConfig='formConfig'  
      :dataForm="dataForm" 
      :dataRule="dataRule"
      @keyup.enter.native="dataFormSubmit()"
      @isvisible="isvisible"
      @dialogColse="dialogColse"
      @updateData="updateData"
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
      id:false,
      dataForm: {    
        // 部门名称
        organName: '',
        // 上级组织
        parentOrganGuid: '',
        // 部门层级
        levelName: '',
        //经度
        logitude:'',
        //纬度
        latitude:'',
        // 机构规格
        grade: '',
        // 所在地区
        oraganAddress: '',
        // 地区编码
        oraganQhid: '',
        // 主要联系人
        contactName: '',
        // 联系电话
        contactPhone:'',
        // 传真
        contactFax:'',
        //电子邮箱
        contactEmail:'',
        //邮编
        organZipcode: '',
        //权重
        orderId: '',
        // 部门简称
        oraganEasyName: '',
        //部门类型
        orgType: '',
        //部门描述
        organDescription: '',
        
      },
      dataRule:{
         organName: [{
          required: true,
          message: '部门名称不能为空',
          trigger: 'blur'
        }],
        orderId: [{
            required: true,
            message: '权重不能为空',
            trigger: 'blur'
          }

        ]
      },
      formConfig:{
        'title':'部门',
        "labelWidth": '100px',
        "formItemList":[
          {
          "type": "input",
          "label": "部门名称：",
          "span":24,
          "key": "organName",
          "value": "organName",
          "placeholder": "请输入部门名称",
        },
        {
          "type": "treeselect",
          "label": "上级组织：",
          "span":24,
          "key": "parentOrganGuid",
          "value": "parentOrganGuid",
          "placeholder": "请选择上级组织",
          "treeData":[{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
                label: '三级 1-1-1',
                children: [{
                  label: '杜尔伯特蒙古族自治县气象局444444'
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
          }],
          
        }, 
        {
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
        },
        {
          "type": "input",
          "label": "部门层级：",
          "span":12,
          "key": "levelName",
          "value": "levelName",
          "placeholder": "请输入部门层级"
        },
        {
          "type":"input",
          "label":'经度：',
          "span":12,
          "key":"logitude",
          "value":"logitude",
          "placeholder": "请输入经度"
        },
        {
          "type":"input",
          "label":'纬度：',
          "span":12,
          "key":"latitude",
          "value":"latitude",
          "placeholder": "请输入纬度"
        },
        {
          "type": "input",
          "label": "机构规格：",
          "span":12,
          "key": "grade",
          "value": "grade",
          "placeholder": "请输入机构规格"
        },
         {
          "type": "input",
          "label": "所在地区：",
          "span":12,
          "key": "oraganAddress",
          "value": "oraganAddress",
          "placeholder": "请输入所在地区"
        }, 
        {
          "type": "input",
          "label": "地区编码：",
          "span":12,
          "key": "oraganQhid",
          "value": "oraganQhid",
          "placeholder": "请输入地区编码"
        },
         {
          "type": "input",
          "label": "主要联系人：",
          "span":12,
          "key": "contactName",
          "value": "contactName",
          "placeholder": "请输入主要联系人"
        }, 
        {
          "type": "input",
          "label": "联系电话：",
          "span":12,
          "key": "contactPhone",
          "value": "contactPhone",
          "placeholder": "请输入联系电话"
        }, 
        {
          "type": "input",
          "label": "传真：",
          "span":12,
          "key": "contactFax",
          "value": "contactFax",
          "placeholder": "请输入传真"
        },
         {
          "type": "input",
          "label": "电子邮箱：",
          "span":12,
          "key": "contactEmail",
          "value": "contactEmail",
          "placeholder": "请输入电子邮箱"
        },
         {
          "type": "input",
          "label": "邮编：",
          "span":12,
          "key": "organZipcode",
          "value": "organZipcode",
          "placeholder": "请输入邮编"
        }, 
        {
          "type": "number",
          "label": "权重：",
          "span":12,
          "key": "orderId",
          "value": "orderId",
          "placeholder": "请输入权重"
        },
         {
          "type": "input",
          "label": "部门简称：",
          "span":12,
          "key": "oraganEasyName",
          "value": "oraganEasyName",
          "placeholder": "请输入部门简称"
        },
        {
          "type": "input",
          "label": "部门类型：",
          "span":12,
          "key": "orgType",
          "value": "orgType",
          "placeholder": "请输入部门类型"
        },
        {
          "type": "input",
          "label": "部门描述：",
          "span":12,
          "key": "organDescription",
          "value": "organDescription",
          "placeholder": "请输入部门描述"
        }]
      },
    }
  },
  components: {
    iForm
  },
  methods: {
    //  handleInput(val, key) {
    //   // 这里element-ui没有上报event，直接就是value了
    //   this.$emit('input', { ...this.value, [key]: val })
    // },
    init(id) {
      if(id){
        // alert(1)
        this.dataForm.organGuid = id
        this.id = true
      }else{
        this.id = false
      }
      // this.id = id || false
      // console.log(this.dataForm.id)
      this.show = true
      //如果id存在，即是修改的弹窗，获取后台数据显示在弹窗输入框内
      if (this.id) {
        // alert(1)
        this.$http({

          url: this.$http.adornUrl(`/module/organ/get/${this.dataForm.organGuid}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
          console.log(data)
            if(data && data.code === 200){
              // id序号
              this.dataForm.organGuid = data.result.organGuid
              //部门名称
              this.dataForm.organName = data.result.organName
              // 上级组织
              this.dataForm.parentOrganGuid = data.result.parentOrganGuid
              // 部门层级
              this.dataForm.levelName = data.result.levelName
               //经度
              this.dataForm.logitude = data.result.logitude,
              //纬度
              this.dataForm.latitude = data.result.latitude,
              // 机构规格
              this.dataForm.grade = data.result.grade
              // 所在地区
              this.dataForm.oraganAddress = data.result.oraganAddress
              // 地区编码
              this.dataForm.oraganQhid = data.result.oraganQhid
              // 主要联系人
              this.dataForm.contactName = data.result.contactName
              // 联系电话
              this.dataForm.contactPhone = data.result.contactPhone
              // 传真
              this.dataForm.contactFax = data.result.contactFax
              //电子邮箱
              this.dataForm.contactEmail = data.result.contactEmail
              //邮编
              this.dataForm.organZipcode = data.result.organZipcode
              //权重
              this.dataForm.orderId = data.result.orderId
              // 部门简称
              this.dataForm.oraganEasyName = data.result.oraganEasyName
              //部门类型
              this.dataForm.orgType = data.result.orgType
              //部门描述
              this.dataForm.organDescription = data.result.organDescription
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
    updateData(){
             this.$http({
              //  1、save:新增  2、update:修改
              url: this.$http.adornUrl(`/module/organ/${!this.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                // id序号
                // 'organGuid':this.dataForm.organGuid,
              //部门名称
              'organName':this.dataForm.organName,
              // 上级组织
              'parentOrganGuid':this.dataForm.parentOrganGuid,
              // 部门层级
              'levelName':this.dataForm.levelName,
               //经度
              'logitude':this.dataForm.logitude,
              //纬度
              'latitude':this.dataForm.latitude,
              // 机构规格
              'grade':this.dataForm.grade ,
              // 所在地区
              'oraganAddress':this.dataForm.oraganAddress ,
              // 地区编码
              'oraganQhid':this.dataForm.oraganQhid ,
              // 主要联系人
              'contactName':this.dataForm.contactName ,
              // 联系电话
              'contactPhone':this.dataForm.contactPhone ,
              // 传真
              'contactFax':this.dataForm.contactFax ,
              //电子邮箱
              'contactEmail':this.dataForm.contactEmail ,
              //邮编
              'organZipcode':this.dataForm.organZipcode ,
              //权重
              'orderId':this.dataForm.orderId ,
              // 部门简称
              'oraganEasyName':this.dataForm.oraganEasyName ,
              //部门类型
              'orgType':this.dataForm.orgType ,
              //部门描述
              'organDescription':this.dataForm.organDescription 
              })
            }).then(({data}) => {
              if (data && data.code === 200) {
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
  }
}

</script>
