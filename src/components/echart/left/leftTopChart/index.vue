<template>
  <div>
    <div
        ref="charts"
        style="width: 290px; height: 300px; margin:0 auto"
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
          text : "在线统计",
          x : 'left',
          y : 'top',
          textStyle: { "fontSize": 20,"fontWeight": "bolder", "color" : "whitesmoke"},
          left : 10,
          top : 10
        },
        color : ['rgb(25, 67, 130)', 'darkgray'],
        series : [
          {
              name: '在线统计',
              type: 'pie',
              radius: '55%',
              data:[
                  {value:6, name:'在线'},
                  {value:1, name:'失联'}
              ],
              roseType: 'angle',
              itemStyle: {
                  normal: {
                      shadowBlur: 200,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }
        ],
        legend : {
          orient : 'vertcal',
          x : 'left',
          y : 'bottom',
          itemWidth : 30,
          itemHeight : 30,
          textStyle : {
            color : 'white'
          }
        }
      };
      charts.setOption(option)
    }
  }
}
</script>