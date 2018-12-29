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
import { isEmail, isMobile, isIDcard } from '@/utils/validate'
import iForm from '@/components/DynamicForm/index'
export default {
  data() {
    var validatePassword = (rule, value, callback) => {
      if (!this.dataForm.id && !/\S/.test(value)) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }

    var validateEmail = (rule, value, callback) => {
      if (!isEmail(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    var validateMobile = (rule, value, callback) => {
      if (!isMobile(value)) {
        callback(new Error('手机号格式错误'))
      } else {
        callback()
      }
    }

    var validateIDcard = (rule, value, callback) => {
      if (!isIDcard(value)) {
        callback(new Error('身份证格式错误'))
      } else {
        callback()
      }
    }

    return {
      id: false,
      show: false,
      dataForm: {
        // 用户ID
        userGuid:'',
        // 用户名称
        userName: '',
        // 登录名称
        loginName: '',
        // 密码
        password: '',
        // 用户性别
        userSex: '',
        // 人员身份
        personStatus: '',
        // 身份证
        identityId: '',
        // 所属部门
        organInfo: '',
        // 第一学历
        firstEdu: "",
        // 第一学历毕业时间
        firstEduDate: '',
        // 第一学历毕业学校
        firstEduSchool: '',
        // 岗位名称
        jobName: '',
        // 岗位级别
        jobLevel: '',
        // 职称
        title: '',
        // 真实姓名
        realName: '',
        // 学历
        education: '',
        // 聘用年限
        EmployYear: '',
        // 岗位详细
        jobDetail: '',
        // 邮箱
        email: '',
        // 电话号码
        phone: '',
        // 入岗时间
        jobDate: "",
        // 状态
        status: '',
        // 专业
        special: '',
        // 生日
        birthday: "",
        // 入职本单位时间
        workStartDate: "",
        // 毕业时间
        graduateDate: "",
        // 获得职称时间
        titleDate: "",
        // 参加工作时间
        firstWorkDate: ""
      },
      dataRule: {
        userName: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' }
        ],
        loginName: [
          { required: true, message: '登录名不能为空', trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        userSex: [
          { required: true, message: '用户性别不能为空', trigger: 'blur' }
        ],
        education: [
          { required: true, message: '学历不能为空', trigger: 'blur' }
        ],
        organInfo: [
          { required: true, message: '所属部门不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ],
        // comfirmPassword: [
        //   { validator: validateComfirmPassword, trigger: 'blur' }
        // ],
        identityId: [
          { validator: validateIDcard, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          { validator: validateMobile, trigger: 'blur' }
        ]
      },
      formConfig: {
        'title': '用户',
        "labelWidth": '130px',
        "formItemList": [{
            "type": "input",
            "label": "登录名称：",
            "span": 12,
            "key": "loginName",
            "value": "loginName",
            "placeholder": "请输入登录名称"
          },
          {
            "type": "input",
            "label": "用户名称：",
            "span": 12,
            "key": "userName",
            "value": "userName",
            "placeholder": "请输入用户名称"
          },
          {
            "type": "password",
            "label": "用户密码：",
            "span": 12,
            "key": "password",
            "value": "password",
            "isshow": "true",
            "placeholder": "请输入密码"
          },
          {
            "type": "select",
            "label": "用户性别：",
            "span": 12,
            "key": "userSex",
            "value": "userSex",

            "placeholder": "请选择用户性别",
            "selectValue": '',

            "options": [{
                "value": "men",
                "label": "男"
              },
              {
                "value": "women",
                "label": "女"
              },
            ]
          },
          {

            "type": "input",
            "label": "身份证：",
            "span": 12,
            "key": "identityId",
            "value": "identityId",
            "placeholder": "请输入身份证"
          },
          {

            "type": "input",
            "label": "人员身份：",
            "span": 12,
            "key": "personStatus",
            "value": "personStatus",

            "placeholder": "请输入人员身份"
          },
          {

            "type": "select",
            "label": "学历：",
            "span": 12,
            "key": "education",
            "value": "education",
            "placeholder": "请选择学历",
            "selectValue": '',
            "options": [{
                "value": "zhongzhuan",
                "label": "中专"
              },
              {
                "value": "dazhuan",
                "label": "大专"
              },
              {
                "value": "benke",
                "label": "本科"
              },
              {
                "value": "yanjiusheng",
                "label": "研究生"
              },
              {
                "value": "boshi",
                "label": "博士"
              },
              {
                "value": "boshihou",
                "label": "博士后"
              },
              {
                "value": "qita",
                "label": "其他"
              }
            ]
          },
          {
            "type": "treeselect",
            "label": "所属部门：",
            "span": 12,
            "key": "organInfo",
            "value": "organInfo",
            "placeholder": "请选择所属部门",
            "treeData": [{
              label: '黑龙江省气象',
              children: [{
                label: '黑龙江省气象科学研究所1',
                children: [{
                    label: '三级 1-1-1',
                    children: [{
                      label: '黑龙江省气象科学研究所2'
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
              label: '超级管理',
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
            "label": "专业：",
            "span": 12,
            "key": "special",
            "value": "special",
            "placeholder": "请输入专业"
          },
          {
            "type": "input",
            "label": "第一学历：",
            "span": 12,
            "key": "firstEdu",
            "value": "firstEdu",
            "placeholder": "请输入第一学历"
          },
          {
            "type": "input",
            "label": "电话号码：",
            "span": 12,
            "key": "phone",
            'value': 'phone',
            "placeholder": "请输入电话号码"
          },

          {
            "type": "input",
            "subtype": "text",
            "label": "第一学历毕业学校：",
            "span": 12,
            "key": "firstEduSchool",
            "value": "firstEduSchool",
            "placeholder": "请输入第一学历毕业学校"
          },
          {
            "type": "date",
            "label": "第一学历毕业时间：",
            "span": 12,
            "key": "firstEduDate",
            "value": "firstEduDate",
            "placeholder": "请输入第一学历毕业时间"
          },
          {
            "type": "input",
            "label": "岗位名称：",
            "span": 12,
            "key": "jobName",
            "value": "jobName",
            "placeholder": "请输入岗位名称"
          },
          {
            "type": "input",
            "label": "岗位级别：",
            "span": 12,
            "key": "jobLevel",
            "value": "jobLevel",
            "placeholder": "请输入岗位级别"
          },
          {
            "type": "input",
            "label": "岗位详细：",
            "span": 12,
            "key": "jobDetail",
            "value": "jobDetail",
            "placeholder": "请输入岗位详细"
          },
          {
            "type": "date",
            "label": "入岗时间：",
            "span": 12,
            "key": "jobDate",
            "value": "jobDate",
            "placeholder": "请选择入岗时间"
          },
          {
            "type": "input",
            "label": "职称：",
            "span": 12,
            "key": "title",
            "value": "title",
            "placeholder": "请输入职称"
          },
          {
            "type": "date",
            "label": "获得职称时间：",
            "span": 12,
            "key": "titleDate",
            "value": "titleDate",
            "placeholder": "请选择获得职称时间"
          },
          {
            "type": "input",
            "label": "邮箱：",
            "span": 12,
            "key": "email",
            "value": "email",
            "placeholder": "请输入邮箱"
          },
          {
            "type": "select",
            "label": "状态：",
            "span": 12,
            "key": "status",
            "value": "status",
            "placeholder": "请选择状态",
            "selectValue": '',
            "options": [{
                "value": "use",
                "label": "enabled"
              },
              {
                "value": "noUse",
                "label": "unabled"
              },
            ]
          },
          {
            "type": "input",
            "label": "真实姓名：",
            "span": 12,
            "key": "realName",
            "value": "realName",
            "placeholder": "请输入真实姓名"
          },
          {
            "type": "number",
            "label": "聘用年限：",
            "span": 12,
            "key": "EmployYear",
            "value": "EmployYear",
            "placeholder": "请选择聘用年限"
          },
          {
            "type": "date",
            "label": "参加工作时间：",
            "span": 12,
            "key": "firstWorkDate",
            "value": "firstWorkDate",
            "placeholder": "请选择参加工作时间"
          },
          {
            "type": "date",
            "label": "生日：",
            "span": 12,
            "key": "birthday",
            "value": "birthday",
            "placeholder": "请输入生日"
          },
          {
            "type": "date",
            "label": "入职本单位时间：",
            "span": 12,
            "key": "workStartDate",
            "value": "workStartDate",
            "placeholder": "请选择入职本单位时间"
          },
          {
            "type": "date",
            "label": "毕业时间：",
            "span": 12,
            "key": "graduateDate",
            "value": "graduateDate",
            "placeholder": "请选择毕业时间"
          }
        ]
      },
    }

  },
  components: {
    iForm
  },

  methods: {
    init(id) {
      if (id) {
        console.log(id)
         this.dataForm.userGuid = id
         this.id = true;
      }else{
         this.id = false
      }
       console.log(this.dataForm.userGuid)
      this.show = true;
      //如果id存在，即是修改的弹窗，获取后台数据显示在弹窗输入框内
      if (this.id) {
        this.$http({
          url: this.$http.adornUrl(`/module/user/get/${this.dataForm.userGuid}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
            if (data && data.code === 200) {
              // id序号
              this.dataForm.userGuid = data.result.userGuid
              // 用户名称
              this.dataForm.userName = data.result.userName  
              // 登录名称
              this.dataForm.loginName = data.result.loginName
              // 密码
              this.dataForm.password = data.result.password
              // 用户性别
              this.dataForm.userSex = data.result.userSex
              // 人员身份
              this.dataForm.personStatus = data.result.personStatus
              // 身份证
              this.dataForm.identityId = data.result.identityId
              // 所属部门
              this.dataForm.organInfo = data.result.organInfo
              // 第一学历
              this.dataForm.firstEdu = data.result.firstEdu
              // 第一学历毕业时间
              this.dataForm.firstEduDate = data.result.firstEduDate
              // 第一学历毕业学校
              this.dataForm.firstEduSchool = data.result.firstEduSchool
              // 岗位名称
              this.dataForm.jobName = data.result.jobName
              // 岗位级别
              this.dataForm.jobLevel = data.result.jobLevel
              // 职称
              this.dataForm.title = data.result.title
              // 真实姓名
              this.dataForm.realName = data.result.realName
              // 学历
              this.dataForm.education = data.result.education
              // 聘用年限
              this.dataForm.EmployYear = data.result.EmployYear
              // 岗位详细
              this.dataForm.jobDetail = data.result.jobDetail
              // 邮箱
              this.dataForm.email = data.result.email
              // 电话号码
              this.dataForm.phone = data.result.phone
              // 入岗时间
              this.dataForm.jobDate = data.result.jobDate
              // 状态
              this.dataForm.status = data.result.status
              // 专业
              this.dataForm.special = data.result.special
              // 生日
              this.dataForm.birthday = data.result.birthday
              // 入职本单位时间
              this.dataForm.workStartDate = data.result.workStartDate
              // 毕业时间
              this.dataForm.graduateDate = data.result.graduateDate
              // 获得职称时间
              this.dataForm.titleDate = data.result.titleDate
              // 参加工作时间
              this.dataForm.firstWorkDate = data.result.firstWorkDate
            }
          }
        )
      } 
    },
    isvisible() {
      this.show = false
    },
    dialogColse() {
      this.show = false
    },
    // 修改数据
    updateData() {
       this.$http({
          //  1、save:新增  2、update:修改
          url: this.$http.adornUrl(`/module/user/${!this.id ? 'save' : 'update'}`),
          method: 'post',
          data: this.$http.adornData({
            // 'userGuid': this.dataForm.userGuid,
            // 用户名称
            'userName': this.dataForm.userName,
            // 登录名称
            'loginName': this.dataForm.loginName,
            // 用户性别
            'userSex': this.dataForm.userSex,
            // 人员身份
            'personStatus': this.dataForm.personStatus,
            //身份证 
            'identityId': this.dataForm.identityId,
            // 所属部门
            'organInfo' : this.dataForm.organInfo,
            // 第一学历
            'firstEdu' :this.dataForm.firstEdu,
            // 第一学历毕业时间
            'firstEduDate' : this.dataForm.firstEduDate,
            // 第一学历毕业学校
            'firstEduSchool' : this.dataForm.firstEduSchool, 
            // 岗位名称
            'jobName' : this.dataForm.jobName, 
            // 岗位级别
            'jobLevel' : this.dataForm.jobLevel, 
            // 职称
            'title' : this.dataForm.title, 
            // 真实姓名
            'realName' : this.dataForm.realName, 
            // 学历
            'education' : this.dataForm.education, 
            // 聘用年限
            'EmployYear': this.dataForm.EmployYear, 
            // 岗位详细
            'jobDetail' : this.dataForm.jobDetail, 
            // 邮箱
            'email' : this.dataForm.email, 
            // 电话号码
            'phone' : this.dataForm.phone, 
            // 入岗时间
            'jobDate' : this.dataForm.jobDate, 
            // 状态
            'status' : this.dataForm.status, 
            // 专业
            'special' : this.dataForm.special, 
            // 生日
            'birthday' : this.dataForm.birthday, 
            // 入职本单位时间
            'workStartDate' : this.dataForm.workStartDate, 
            // 毕业时间
            'graduateDate' : this.dataForm.graduateDate, 
            // 获得职称时间
            'titleDate' : this.dataForm.titleDate, 
            // 参加工作时间
            'firstWorkDate' : this.dataForm.firstWorkDate 
          })
        }).then(({ data }) => {
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
<style scoped>
.el-date-editor.el-input {
  width: 100% !important;
}

.el-select {
  display: block !important;
}

.el-cascader {
  display: block !important;
}

</style>
