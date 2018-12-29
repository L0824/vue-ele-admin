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
            this.myChart.setOption(this.redyBin2Option(this.type));
        },
        props: ['id','type'],
        methods: {
         	redyBin2Option(type){
                let text,legend_data,series_data,inner_data;
				if(type == "ordersource"){
					text = "日志分析";
					legend_data = ['分析1','分析2','分析3','分析4','分析5','分析6']
                    inner_data = [
                        {value:335, name:'分析1', selected:true},
                        {value:679, name:'分析2'},
                        {value:1548, name:'分析3'}
                    ]
					series_data = [
                        {value:310, name:'分析4'},
                        {value:234, name:'分析5'},
                        {value:634, name:'分析6'}
					]
				}else{
					
				}
				let data  = {
					title : {
						text: text,
						subtext: '',
						x:'center'
					},
					 tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						x: 'left',
						data:legend_data
					},
					series: [
						{
							name:'访问来源',
							type:'pie',
							selectedMode: 'single',
							radius: [0, '30%'],
                            center: ['50%', '60%'],
							label: {
								normal: {
									position: 'inner'
								}
							},
							labelLine: {
								normal: {
									show: false
								}
							},
							data:inner_data
						},
						{
							name:'访问来源',
							type:'pie',
							radius: ['40%', '55%'],
                            center: ['50%', '60%'],
							label: {
								normal: {
									backgroundColor: '#eee',
									borderColor: '#aaa',
									borderWidth: 1,
									borderRadius: 4,
									rich: {
										a: {
											color: '#999',
											lineHeight: 22,
											align: 'center'
										},
										hr: {
											borderColor: '#aaa',
											width: '100%',
											borderWidth: 0.5,
											height: 0
										},
										b: {
											fontSize: 16,
											lineHeight: 33
										},
										per: {
											color: '#eee',
											backgroundColor: '#334455',
											padding: [2, 4],
											borderRadius: 2
										}
									}
								}
							},
							data:series_data
						}
					]
				}
				return data;
			}
        },
        watch: {
            type:(v)=>{
                this.redyBin2Option(v)
            }
        }
    }
</script>