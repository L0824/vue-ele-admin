<template>
  <el-dialog :close-on-click-modal="false" :visible.sync="visible" title="分配权限">
    <el-table :data="dataList" border v-loading="dataListLoading" @selection-change="selectionChangeHandle" height='300'>
      <el-table-column type="selection" header-align="center" align="center">
      </el-table-column>
      <el-table-column prop="roleName" header-align="center" align="center" label="角色名称">
      </el-table-column>
      <el-table-column prop="roleDec" header-align="center" align="center" label="角色描述">
      </el-table-column>
      <el-table-column prop="roleType" header-align="center" align="center" label="角色类型">
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      dataList: [],
      dataListLoading: false
    };
  },
  methods: {
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    init() {
      this.visible = true
    }
  }
};

</script>
