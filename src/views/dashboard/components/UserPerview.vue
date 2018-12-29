<template>
  <Row class="vm-user-preview vm-panel">
    <div class="panel-heading">
      <img :src="brief.photo" height="90" alt="photo">
      <span class="title">
        <span class="name">{{ brief.name }}</span>
        <p class="role">{{ brief.role }}</p>
      </span>
    </div>
    <ul class="content">
      <li v-for="item in property" :key="item.id">
        <span>
          <i :class="item.icon"></i>
        </span>
        <span>
          {{ item.key }}
        </span>
        <span>
          {{ item.value }}
        </span> 
      </li>
    </ul>
  </Row>
</template>
<script>
  export default {
    name: 'UserPreview',
    props: {
      brief: {
        type: Object,
        default: function () {
          return {
            photo: require('@/assets/img/avatar.png'),
            name: 'Angla Cool',
            role: '普通用户'
          }
        }
      },
      property: {
        type: Array,
        default: function () {
          return [
            {
              icon: 'fa fa-user',
              key: '性别',
              value: '女'
            }
          ]
        }
      }
    }
  }
</script>
<style scoped lang='scss'>
  .vm-user-preview{
  overflow: hidden;
  .panel-heading{
    display: flex;
      img{
      margin-right: 15px;
    }
    .title{
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name{
        color:  #41b883;
        font-size: 16px;
      }
      .role{
        color:#99a9c0;
      }
    }
  }
  ul.content{
    font-size: 14px;
    li{
      display: flex;
      border-bottom: 1px solid #eeeff1;
      i{
        color:#99a9c0;
        font-size: 16px;
        width: 10px;
      }
      padding: 0 15px;
      height: 61px;
      line-height: 60px;
      span{
        flex-grow: 1;
      }
      span:first-child{
        width: 20%;
      }
      span:nth-child(2){
        width: 40%;
      }
      span:last-child{
        text-align: right;
        width: 40%;
      }
    }
    li:last-child{
      border-bottom: 1px solid transparent;
    }
  }
}
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
  
</style>