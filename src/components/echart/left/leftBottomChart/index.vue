<template>
<div>
    <div
        ref="charts"
        style="width: 300px; height: 300px; margin:0 auto"
    ></div>
</div>
</template>

<script>
import * as echarts from 'echarts'
export default {
data () {
    return {
        speeds : [17, 35, 24, 19, 30, 28],
        plans_names : ['飞机1', '飞机2', '飞机3', '飞机4', '飞机5', '飞机6']
    }
},
mounted() {
    this.initCharts()
},
methods : {
    initCharts() {
    const charts = echarts.init(this.$refs['charts'])
    var option = {
        title : {
          show : true,
          text : "流量统计",
          x : 'center',
          y : 'top',
          textStyle: { "fontSize": 16,"fontWeight": "bolder","color": "white"},
          left : 10,
          top : 10
        },
        xAxis : {
            data : this.plans_names,
            axisLabel: {
                show: true,
                textStyle: {
                    color: 'white'
                }
            }
        },
        yAxis : {
            type : 'value',
            axisLabel: {
                show: false
            }
        },
        series : [
        {
            type : 'pictorialBar',
            symbol: 'rect',
            data : this.speeds,
            barWidth: '20%',
            itemStyle : {
                // color : '#F02FC2'
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'purple' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                ])
            }
        },
        ]
    };
    charts.setOption(option)
    }
}
}
</script>