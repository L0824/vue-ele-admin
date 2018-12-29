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
    data(){
        return {
            show:false,
            dataForm:{
                id:0,
                functionName:'',
                functionDescription:'',
                sn:'',
                belongModule:''

            },
            dataRule:{
                functionName:[
                    {
                        required:true,
                        message:'功能名称不能为空',
                        trigger:'blur'
                    }
                ],
                sn:[
                    {
                        required:true,
                        message:'操作名称不能为空',
                        trigger:'blur'
                    }
                ],
                belongModule:[
                    {
                        required:true,
                        message:'所属模块不能为空',
                        trigger:'change'
                    }
                    
                ]
            },
            formConfig:{
                'title':'功能点',
                "labelWidth": '100px',
                "formItemList":[
                {
                "type": "input",
                "label": "功能名称：",
                "span":24,
                "key": "functionName",
                "value": "functionName",
                "placeholder": "请输入功能名称",
                },
                {
                "type": "input",
                "label": "功能描述：",
                "span":24,
                "key": "functionDescription",
                "value": "functionDescription",
                "placeholder": "请输入功能描述",
                },
                {
                "type": "input",
                "label": "操作名称：",
                "span":24,
                "key": "sn",
                "value": "sn",
                "placeholder": "请输入操作名称",
              },
              {
                "type":"treeselect",
                "label": "所属模块：",
                "span":24,
                "key": "belongModule",
                "value": "belongModule",
                "placeholder": "请选择所属模块",
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
                  }]
                        }
              ],
            },
        }
    },
    components:{
        iForm
    },
    methods:{
        init(id){
            this.dataForm.id = id || 0
            this.show = true
            if (this.dataForm.id) {
              this.$http({
                url: this.$http.adornUrl(`/department/dep/info/${this.dataForm.id}`),
                method: 'get',
                params: this.$http.adornParams()
              }).then(({ data }) => {
                  if(data && data.code === 0){
                    // this.dataForm.
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
        dataFormSubmit(){
          
        }
       
    }
}
</script>
