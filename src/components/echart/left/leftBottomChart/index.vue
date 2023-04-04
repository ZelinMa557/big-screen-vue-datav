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
            data : ['飞机1', '飞机2', '飞机3', '飞机4', '飞机5', '飞机6'],
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
            type : 'bar',
            data : [17, 35, 24, 19, 30, 28],
            barWidth: '20%',
            itemStyle : {
                color : '#F02FC2'
            }
        },
        ]
    };
    charts.setOption(option)
    }
}
}
</script>