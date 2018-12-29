<template>
  <div class="dashboard-editor-container dashboard">
    <!--  -->
    <Row :gutter="16">
      <Col :lg="6" :md="12">
      <panel-group color="#41b883" icon="fa fa-user" title="New Users" count="996"></panel-group>
      </Col>
      <Col :lg="6" :md="12">
      <panel-group color="#1d8ce0" icon="fa fa-eye" title="Page Views" count="109009"></panel-group>
      </Col>
      <Col :lg="6" :md="12">
      <panel-group color="#ffa000" icon="fa fa-pencil" title="Comments" count="1010"></panel-group>
      </Col>
      <Col :lg="6" :md="12">
      <panel-group color="#f60000" icon="fa fa-download" title="Downloads" count="9960"></panel-group>
      </Col>
    </Row>
    <Row :gutter="16" style='margin-top:20px'>
      <Col :lg="6">
      <user-preview :brief="dataUserPreview.brief" :property="dataUserPreview.property"></user-preview>
      </Col>
      <Col :lg="10" style="background:#fff;padding:16px 16px 0;margin-bottom:16px;">
      <line-chart :chart-data="lineChartData"></line-chart>
      </Col>
      <Col :lg="8">
     <div class="chart-wrapper">
          <pie-chart></pie-chart>
        </div>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col :xs="24" :sm="24" :lg="12">
        <work-progress title="Working Progress" :data="dataProgress"></work-progress>
      </Col>
      <Col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
       <todo-list></todo-list>
      </Col>
      <Col :xs="24" :sm="24" :lg="6">
      <div class="chart-wrapper">
        <bar-chart></bar-chart>
      </div>
      </Col>
    </Row>
  </div>
  </div>
</template>
<script>
import PanelGroup from './components/PaneGroup'
import UserPreview from './components/UserPerview'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import WorkProgress from './components/WorkProgress'
import BarChart from './components/BarChart'
import TodoList from './components/TodoList'


const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  components: {
    PanelGroup,
    UserPreview,
    LineChart,
    PieChart,
    WorkProgress,
    BarChart,
    TodoList
  },
  data() {
    return {
      dataUserPreview: {
        brief: {
          photo: require('@/assets/img/avatar.png'),
          name: 'Angla Cool',
          role: 'Administrator'
        },
        property: [{
            icon: 'fa fa-user',
            key: 'Sex',
            value: 'M'
          },
          {
            icon: 'fa fa-heart',
            key: 'Activity',
            value: '9.8'
          },
          {
            icon: 'fa fa-calendar',
            key: 'Register',
            value: '2017-8-9 8:00'
          },
          {
            icon: 'fa fa-calendar',
            key: 'Latest Login',
            value: '2017-9-9 9:10'
          }
        ]
      },
      lineChartData: lineChartData.newVisitis,
      dataProgress: [
        {
          name: 'Jesse Luo',
          tags: ['cool', 'funy'],
          value: 90
        },
        {
          name: 'Angla',
          tags: ['nice', 'sexy', 'literature'],
          value: 30
        },
        {
          name: 'lele Wang',
          tags: ['mould', 'shy'],
          value: 80
        },
        {
          name: 'Jesse Ca',
          tags: ['funny', 'hardworking', 'learnd'],
          value: 20
        },
        {
          name: 'Jesse Lee',
          tags: ['nice', 'mould'],
          value: 100
        }
      ],
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}

</script>
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
  }
}
 .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
  }
.dashboard,
.widget,
.charts,
.panels {
  &>.ivu-row {
    &>.ivu-col {
      margin-top: 15px;
    }
  }
}

</style>
