<template>
  <div>
    <el-dialog :visible.sync="visible" title="用户批量导入">
      <div>
        <el-form class='sys'>
          <el-form-item label="授权系统：">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <input id="excel-upload-input" type="file" accept=".xlsx, .xls" class="c-hide" @change="handkeFileChange">
        <div id="drop">
          点击这里上传
          <el-button style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">浏览</el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import XLSX from 'xlsx'
export default {
  data() {
    return {
      visible: false,
      excelData: {
        header: null,
        results: null
      },
      options: [{
        value: '选项1',
        label: '黑龙江突发事件预警信息发布系统'
      }, {
        value: '选项2',
        label: '权限管理系统'
      }, {
        value: '选项3',
        label: '日志管理系统'
      }],
      value: ''
    }
  },
  methods: {
    init() {
      this.visible = true
    },
    genetateDate({ header, results }) {
      this.excelData.header = header
      this.excelData.results = results
      this.$emit('on-selected-file', this.excelData)
    },
    handleUpload() {
      document.getElementById('excel-upload-input').click()
    },
    handkeFileChange(e) {
      const files = e.target.files
      const itemFile = files[0] // only use files[0]
      this.readerData(itemFile)
    },
    readerData(itemFile) {
      const reader = new FileReader()
      reader.onload = e => {
        const data = e.target.results
        const fixedData = this.fixdata(data)
        const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = this.get_header_row(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        this.genetateDate({ header, results })
      }
      reader.readAsArrayBuffer(itemFile)

    },
  },
  fixdata(data) {
    let o = ''
    let l = 0
    const w = 10240
    for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
    return o
  },
  get_header_row(sheet) {
    const headers = []
    const range = XLSX.utils.decode_range(sheet['!ref'])
    let C
    const R = range.s.r
    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
      var hdr = 'UNKNOW' + C
      if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
      headers.push(hdr)
    }
    return headers
  }
}

</script>
<style scoped>
#excel-upload-input {
  display: none;
  z-index: -9999;
}

#drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}

.sys {
  width: 600px;
  margin: 0 auto;
}
.el-select, .el-cascader{
  display: inline-block !important;
}
</style>
