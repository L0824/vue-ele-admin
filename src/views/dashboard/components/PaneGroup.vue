<template>
  <Row class="vm-state-overview" type="flex">
    <Col span="10" class="symbol" :style="{ backgroundColor: color }">
      <i :class="icon"></i>
    </Col>
    <Col span="14" class="value">
      <h1 class="count">{{ count }}</h1>
      <p>{{ title }}</p>
    </Col>
  </Row>
</template>

<script>
export default {
  name: 'StateOverView',
  props: ['color', 'icon', 'title', 'count']
}
</script>
<style scoped lang='scss'>
  .vm-state-overview{
  background-color: white;
  border-radius: 4px;
  min-height: 100px;
  overflow: hidden;
}
  .symbol{
    color: white;
    font-size: 45px;
    background-color: #41b883;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .value{
    color:  #99a9c0;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items:center;
  }

</style>