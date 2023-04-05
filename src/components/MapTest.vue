<template>
    <div class="content">
      <div
        ref="charts"
        style="width: 1300px; height: 1020px; margin:0 auto"
      ></div>
      <!-- <span>浙江省地图</span> -->
    </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import Config from '../../static/config.json'
import zhejiang from '@/assets/northwest.json'
export default {
  data () {
    return {
      timer : null,
      points: [],
      linesData: [],
      planePath: // 飞机svg
        'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
    }
  },
  mounted () {
    this.points = Config.points
    this.linesData = Config.lines
    this.initCharts()
    // this.timer = setInterval(() => {
    //       setTimeout(this.initCharts, 0)
    // }, Config.refresh_interval*10)
  },
  methods: {
    initCharts () {
      const charts = echarts.init(this.$refs['charts'])
      const option = {
        backgroundColor: '#0E2152',// 背景颜色
        title : {
          show : true,
          text : "西北部分省市地图",
          x : 'left',
          y : 'top',
          textStyle: { "fontSize": 35,"fontWeight": "bolder","color": "white"},
          left : 10,
          top : 10
          },
        // geo: {// 地图配置
        //   map: 'zhejiang',
        //   label: { // 图形上的文本标签
        //     normal: {// 通常状态下的样式
        //       show: false,
        //       textStyle: {
        //         color: '#fff'
        //       }
        //     },
        //     emphasis: {// 鼠标放上去高亮的样式
        //       textStyle: {
        //         color: '#fff'
        //       }
        //     }
        //   },
        //   itemStyle: {// 地图区域的样式设置
        //     normal: { // 通常状态下的样式
        //       borderColor: '#5089EC',
        //       borderWidth: 0.1,
        //       areaColor: { //地图区域的颜色
        //         type: 'radial', // 径向渐变
        //         x: 0.5, // 圆心
        //         y: 0.5,// 圆心
        //         r: 0.8,// 半径
        //         colorStops: [
        //           { // 0% 处的颜色
        //             offset: 0,
        //             color: 'rgba(0, 102, 154, 0)'
        //           },
        //           { // 100% 处的颜色
        //             offset: 1,
        //             color: 'rgba(0, 102, 154, .4)'
        //           }
        //         ]
        //       }
        //     },
        //     // 鼠标放上去高亮的样式
        //     emphasis: {
        //       areaColor: '#2386AD',
        //       borderWidth: 0
        //     }
        //   }
        // },
        bmap: {
					center: [87.623027,43.829685],
					zoom: 6,
					roam: true,
					mapStyle: {
						
					}
				},
        series: [
          { // 散点系列数据
            type: 'scatter',// 带有涟漪特效动画的散点（气泡）图
            coordinateSystem: 'bmap', //该系列使用的坐标系:地理坐标系
            // 特效类型,目前只支持涟漪特效'ripple'，意为“涟漪”
            effectType: 'ripple',
            // // 配置何时显示特效。可选'render'和'emphasis' 。
            showEffectOn: 'render',
            rippleEffect: { // 涟漪特效相关配置。
              period: 6, // 动画的周期，秒数。
              scale: 4,// 动画中波纹的最大缩放比例。
              // 波纹的绘制方式，可选 'stroke' 和 'fill'。
              brushType: 'fill'
            },
            zlevel: 1, // 所有图形的 zlevel 值。
            data: this.points,
            label: {
                  normal:{
                      show:true,
                      formatter:function(params){ //标签内容
                          return  params.name;
                      },
                  }
            }
          },
          { // 线条系列数据
            type: 'lines',
            zlevel: 2,
            symbol: ['none', 'arrow'], // 标记的图形: 箭头
            symbolSize: 10, // 标记的大小
            effect: { // 线条特效的配置
              show: true,
              period: 30, // 特效动画的时间，单位s
              trailLength: 0, // 特效尾迹的长度。取值[0,1]值越大，尾迹越重
              symbol: this.planePath, // 特效图形的标记 可选'circle'等
              symbolSize: 15// 特效标记的大小
            },
            lineStyle: { // 线条样式
              normal: {
                color: '#93EBF8',
                width: 2.5, // 线条宽度
                opacity: 0.6, // 尾迹线条透明度
                curveness: 0.1// 尾迹线条曲直度
              }
            },
            data: this.linesData
          }
        ]
      }
      // 地图注册，第一个参数的名字必须和option.geo.map一致
      // echarts.registerMap('zhejiang', zhejiang)
      charts.setOption(option)
    }
  }
}
</script>
<style lang="scss" scoped>
#MapTest {
  background-color: #0e2152;
  border-radius: 5px;
}
</style>