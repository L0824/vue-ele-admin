<template>
  <div class="clearfix cnt-wrapper">
    <div>
      <div class="main-form">
        <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
          <el-form-item label="系统名称:">
            <el-select size="small" v-model="dataForm.sysName" placeholder="请选择系统名称">
              <el-option label="日志管理系统" value="log"></el-option>
              <el-option label="权限管理系统" value="permission"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="模块名称:">
            <el-select size="small" v-model="dataForm.sysName" placeholder="请选择模块名称">
              <el-option label="模块1" value="log"></el-option>
              <el-option label="模块2" value="permission"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名称:">
            <el-select size="small" filterable v-model="dataForm.userName" placeholder="请选择用户名称">
              <el-option label="管理员1" value="admin1"></el-option>
              <el-option label="超级管理员" value="superadmin"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作时间:">
            <el-date-picker size="small" v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-search">分析</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="echartsInfo">
      <Row :gutter="16">
        <Col :xs="24" :sm="24" :lg="14">
        <div class="chart-wrapper">
          <bar-type-data id="bar_data"></bar-type-data>
        </div>
        </Col>
        <Col :xs="24" :sm="24" :lg="10">
        <div class="chart-wrapper">
          <line-type-data id="line_data"></line-type-data>
        </div>
        </Col>
      </Row>
      <Row :gutter="10" style='margin-top:55px'>
        <Col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart ></raddar-chart>
        </div>
        </Col>
        <Col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <circle-type-data id="bin2_data" type="ordersource"></circle-type-data>
        </div>
        </Col>
        <Col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-type-data id="bin1_data" type="ordertype"></pie-type-data>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
import RaddarChart from '@/components/echarts/RaddarChart'
import BarTypeData from '@/components/echarts/BarTypeData'
import LineTypeData from '@/components/echarts/LineTypeData'
import CircleTypeData from '@/components/echarts/CircleTypeData'
import PieTypeData from '@/components/echarts/PieTypeData'
export default {
  data() {
    return {
      dataForm: {
        sysName: '',
        userName: '',
        sysDot: ''
      },
      value6: '',
      dataListLoading: false,
      bar_chart: null,
      line_chart: null,
      bar_id: 'bar_data',
      line_id: 'line_data'
    }
  },
  components: {
    RaddarChart,
    BarTypeData,
    LineTypeData,
    CircleTypeData,
    PieTypeData
  },
  beforeDestroy() {
    if (!this.bar_chart || !this.line_chart) {
      return
    }
    this.bar_chart.dispose();
    this.line_chart.dispose();
    this.bar_chart = null;
    this.line_chart = null;
  },
}

</script>
<style scoped>
.filter-charts {
  border: 1px solid rgba(155, 155, 155, 0.2)
}

.chart-wrapper {
  background: #fff;
  padding: 16px 16px 0;
}

</style>
