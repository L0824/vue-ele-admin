<template>
    <div :id="id" style="width:100%;height:280px;"></div>
</template>

<script>
   	import echarts from 'echarts'
    
    export default {
        data(){
            return {
                 myChart:null,
            }
        },
        mounted(){
            this.myChart = echarts.init(document.getElementById(this.id));
            this.myChart.setOption(this.readyBin1Option(this.type));
        },
        props: ['id','type'],
        methods: {
         	readyBin1Option(type){
				let text,legend_data,series_data;
				if(type == "ordertype"){
					text = "日志分析统计";
					legend_data = ['分析1','分析2','分析3','分析4','分析5'];
					series_data = [
						{value:335, name:'分析1'},
						{value:310, name:'分析2'},
						{value:234, name:'分析3'},
						{value:135, name:'分析4'},
						{value:1548, name:'分析5'}
					]
				}else{
				}
				let data = {
					  title : {
						text: text,
						subtext: '',
						x:'center'
					},
					tooltip : {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						data: legend_data
					},
					series : [
						{
							name: '访问来源',
							type: 'pie',
							radius : '50%',
                            center: ['50%', '60%'],
							data:series_data,
							itemStyle: {
								emphasis: {
									shadowBlur: 10,
									shadowOffsetX: 0,
									shadowColor: 'rgba(0, 0, 0, 0.5)'
								}
							}
						}
					]
				}
				return data;
			},
        },
        watch: {
            type:(v)=>{
                this.readyBin1Option(v)
            }
        }
    }
</script>

