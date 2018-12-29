<template>
  <Row class="vm-progress vm-panel">
    <Row type="flex"  align="middle" justify="space-between" class="panel-heading">
      {{ title }}
      <Radio-group v-model="order" type="button" size="large" @on-change="handleSortData">
        <Radio label="0"><i class="fa fa-bars"></i></Radio>
        <Radio label="1"><i class="fa fa-sort-amount-asc"></i></Radio>
        <Radio label="-1"><i class="fa fa-sort-amount-desc"></i></Radio>
      </Radio-group>
    </Row>
    <table> 
      <tbody> 
        <tr v-for="(item, index) in rebuildData" :key="item.id">
          <td>  
           {{ index | indexPlus }}
          </td>
          <td>  
            {{ item.name }}
          </td>
          <td v-if="item.tags" :key="item.id">  
            <Tag v-for="item in item.tags" :key="item.id">{{ item }}</Tag>
          </td>
          <td>  
            <Progress :percent="item.value" status="active"></Progress>
          </td>
        </tr>
      </tbody>
    </table>
  </Row>
</template>
<script>
  export default {
    name: 'VmUserPreview',
    props: {
      title: {
        type: String,
        default: 'Progress'
      },
      data: {
        type: Array,
        default: function () {
          return [
            {
              name: 'JesseLuo',
              tags: ['hansome', 'cool'],
              value: 100
            }
          ]
        }
      }
    },
    data: function () {
      return {
        order: '0',
        rebuildData: []
      }
    },
    filters: {
      indexPlus: function (value) {
        return ++value
      }
    },
    methods: {
      sortData: function (data, type) {
        if (type === 1) {
          data.sort((a, b) => {
            return a.value - b.value
          })
        } else if (type === -1) {
          data.sort((a, b) => {
            return b.value - a.value
          })
        }
      },
      handleSortData: function () {
        if (this.order === '0') {
          this.rebuildData = this.data.slice(0)
        } else if (this.order === '1') {
          this.sortData(this.rebuildData, 1)
        } else if (this.order === '-1') {
          this.sortData(this.rebuildData, -1)
        }
      }
    },
    created () {
      this.rebuildData = this.data.slice(0)
    }
  }
</script>

<style scoped lang='scss'>
.vm-panel{
  background-color: white;
  text-align: left;
  // border-radius: @btn-border-radius;
  .panel-heading{
    text-align: left;
    width: 100%;
    border-radius: 4px 4px 0 0;
    border-bottom:  1px solid #eeeff1;
    padding:15px;
    font-weight: bold;
  }
  .panel-body{
    padding: 15px;
    font-size: 14px;
  }
}
  .vm-progress{
  .panel-heading{
    height: 80px;
    color: #41b883;
    font-size: 16px;
  }
  table{
    width:100%;
    tr{
      td{
        padding: 0 15px;
        font-size: 14
        px;
        height: 45px;
        border-bottom:  1px solid #eeeff1;
      }
      td:nth-child(2){
        width: 15%;
      }
      td:last-child{
        width: 40%;
         border-bottom:none;
      }
    }
  }
}
</style>
