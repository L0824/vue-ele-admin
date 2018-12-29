<template>
  <el-dialog title='功能点结构' :close-on-click-modal="false" :visible.sync="visible">
    <el-tree :data="data" node-key="id" :props="defaultProps" :default-expanded-keys="[1,3,8]" :default-checked-keys="[6]" show-checkbox @node-click="handleNodeClick">
    </el-tree>
    <span slot="footer" class="dialog-footer">
     <el-button  @click="visible = false">取消</el-button>
     <el-button type="primary">确定</el-button>
   </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      data: [{
        id: 1,
        label: '根模块',
        children: [{
          id: 2,
          label: ' 权限管理',
          children: [{
            id: 3,
            label: '用户权限管理',
            children: [{
              id: 8,
              label: '部门管理',
              children: [{
                id: 13,
                label: '增加',
              }, {
                id: 14,
                label: '修改',
              }, {
                id: 15,
                label: '删除',
              }, {
                id: 16,
                label: '查询',
              }]
            }, {
              id: 88,
              label: '用户管理',
              children: [{
                id: 17,
                label: '增加',
              }, {
                id: 18,
                label: '修改',
              }, {
                id: 19,
                label: '删除',
              }, {
                id: 20,
                label: '查询',
              }]
            }, {
              id: 9,
              label: '系统管理',
              children: [{
                id: 211,
                label: '增加',
              }, {
                id: 21,
                label: '修改',
              }, {
                id: 22,
                label: '删除',
              }, {
                id: 23,
                label: '查询',
              }]
            }, {
              id: 10,
              label: '角色管理',
              children: [{
                id: 24,
                label: '增加',
              }, {
                id: 25,
                label: '修改',
              }, {
                id: 26,
                label: '删除',
              }, {
                id: 27,
                label: '查询',
              }]
            }, {
              id: 11,
              label: '模块管理',
              children: [{
                id: 28,
                label: '增加',
              }, {
                id: 29,
                label: '修改',
              }, {
                id: 30,
                label: '删除',
              }, {
                id: 31,
                label: '查询',
              }]
            }, {
              id: 12,
              label: '功能点管理',
              children: [{
                id: 32,
                label: '增加',
              }, {
                id: 33,
                label: '修改',
              }, {
                id: 34,
                label: '删除',
              }, {
                id: 35,
                label: '查询',
              }]
            }]
          }]
        }, {
          id: 4,
          label: ' 黑龙江突发事件预警信息发布系统',
          children: [{
            id: 5,
            label: '前端',
            children: [{
              label: '信息发布管理',
            }, {
              label: '发布配置',
            }, {
              label: '知识预案库',
            }, {
              label: '值班管理',
            }, {
              label: '系统监控',
            }, {
              label: '数据管理',
            }]
          }, {
            label: '后端',
            children: [{
              label: '预警信息采集',
            }]
          }]
        }, {
          id: 6,
          label: ' 日志管理系统',
          children: [{
            id: 7,
            label: '后端'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    init() {
      this.visible = true
    }
  }
};

</script>
