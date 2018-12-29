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
                moduleName:'',
                moduleDescription:'',
                pageUrl:'',
                moduleImageUrl:'',
                config:'',
                priority:'',
                parentMod:null,
                sysGuid:null
            },

            dataRule:{
                moduleName:[
                    {
                        required:true,message:'模块名称不能为空',trigger:'blur'
                    }
                ],
                priority:[
                    {
                        required:true,message:'优先级不能为空',trigger:'blur'
                    }
                ],
                parentMod:[
                    {
                        required:true,message:'上级模块不能为空',trigger:'change'
                    }
                    
                ],
                sysGuid:[
                    {
                        required:true,message:'所属系统不能为空',trigger:'change'
                    }
                ]

            },
             formConfig:{
                'title':'模块',
                "labelWidth": '100px',
                "formItemList": [
                    {
                        "type": "input",
                        "label": "模块名称：",
                        "span":24,
                        "key": "moduleName",
                        "value": "moduleName",
                        "placeholder": "请输入模块名称",
                    },
                    {
                        "type": "input",
                        "label": "模块地址：",
                        "span":12,
                        "key": "pageUrl",
                        "value": "pageUrl",
                        "placeholder": "请输入模块地址",
                    },
                    {
                        "type": "input",
                        "label": "模块图片：",
                        "span":12,
                        "key": "moduleImageUrl",
                        "value": "moduleImageUrl",
                        "placeholder": "请输入模块图片",
                    },
                    {
                        "type": "input",
                        "label": "配置文件：",
                        "span":12,
                        "key": "config",
                        "value": "config",
                        "placeholder": "请输入配置文件",
                    },
                    {
                        "type": "number",
                        "label": "优先级：",
                        "span":12,
                        "key": "priority",
                        "value": "priority",
                        "placeholder": "请输入优先级",
                    },
                    {
                        "type":"treeselect",
                        "label": "上级模块：",
                        "key": "parentMod",
                        "span":24,
                        "value": "parentMod",
                        "placeholder": "请选择上级模块",
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
                        "type": "select",
                        "label": "所属系统：",
                        "key": "sysGuid",
                        "span":24,
                        "value": "sysGuid",
                        "placeholder": "请选择所属系统",
                        "options": [{
                            "value": "hlj",
                            "label": "黑龙江突发事件预警信息发布系统"
                        },{
                        "value": "permission",
                            "label": "权限管理系统"
                        },{
                            "value": "log",
                            "label": "权限管理系统"
                        }]
                    }
                ]
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
