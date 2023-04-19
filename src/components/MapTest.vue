<template>
    <div class="content">
      <div
        ref="charts"
        style="width: 1900px; height: 1020px; margin:0 auto"
      ></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import Config from '../../static/config.json'
import TestResponse from '../../static/formatted.json'
export default {
  data () {
    return {
      timer : null,
      points: [],
      linesData: [],
      planePath: // 飞机svg
        'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
      tasks : [],
      labels : [],
      charts : {}
    }
  },
  mounted () {
    this.points = Config.points
    this.linesData = Config.lines
    this.tasks = Config.big_screen_tasks
    this.initCharts()
    // this.test()
    this.timer = setInterval(() => {
          setTimeout(this.updateLabel(), 0)
    }, Config.refresh_interval*2)
  },
  methods: {
    initCharts () {
      this.charts = echarts.init(this.$refs['charts'])
      const option = {
        title : {
          text : "西北地区地图",
          x : 'left',
          y : 'top',
          textStyle: { "fontSize": 45,"fontWeight": "bolder","color": "white"},
          left : 10,
          top : 10,
          show : false
        },
        bmap: {
					center: Config.center,
					zoom: 6,
					roam: false,
					mapStyle:{style:'midnight'},
          styleJson : [
            [{
                "featureType": "districtlabel",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }, {
                "featureType": "city",
                "elementType": "labels",
                "stylers": {
                    "visibility": "off"
                }
            }]
          ]
				},
        series: [
          { // 散点系列数据
            type: 'effectScatter',// 带有涟漪特效动画的散点（气泡）图
            coordinateSystem: 'bmap', //该系列使用的坐标系:地理坐标系
            // 特效类型,目前只支持涟漪特效'ripple'，意为“涟漪”
            effectType: 'ripple',
            // // 配置何时显示特效。可选'render'和'emphasis' 。
            showEffectOn: 'render',
            rippleEffect: { // 涟漪特效相关配置。
              period: 6, // 动画的周期，秒数。
              scale: 3,// 动画中波纹的最大缩放比例。
              // 波纹的绘制方式，可选 'stroke' 和 'fill'。
              brushType: 'fill'
            },
            zlevel: 1, // 所有图形的 zlevel 值。
            data: this.points,
            label: {
                  normal:{
                      show:false,
                      formatter:function(params){ //标签内容
                          return  params.name;
                      },
                  }
            }
          },
          { // 线条系列数据
            type: 'lines',
            zlevel: 2,
            coordinateSystem: 'bmap',
            symbol: ['none', 'arrow'], // 标记的图形: 箭头
            symbolSize: 10, // 标记的大小
            effect: { // 线条特效的配置
              show: true,
              period: 60, // 特效动画的时间，单位s
              trailLength: 0, // 特效尾迹的长度。取值[0,1]值越大，尾迹越重
              symbol: this.planePath, // 特效图形的标记 可选'circle'等
              symbolSize: 25,// 特效标记的大小
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
      this.charts.setOption(option)
      var bmap = this.charts.getModel().getComponent('bmap').getBMap();
      bmap.setMapStyleV2({     
        styleId: '7119cb43f6185f53d588f1e66512d463'
      });
    },
    updateLabel() {
      var len = this.tasks.length
      var bmap = this.charts.getModel().getComponent('bmap').getBMap();
      this.labels.forEach((item)=> {
        bmap.removeOverlay(item)
      })
      for(var i = 0; i < len; i++) {
        this.getLabel(i)
      }

    },
    test() {
      var len = this.tasks.length
      var bmap = this.charts.getModel().getComponent('bmap').getBMap();
      this.labels.forEach((item)=> {
        bmap.removeOverlay(item)
      })
      var res = {
        data : TestResponse
      }
      for(var i = 0; i < len; i++) {
          var task = this.tasks[i]
          var location = this.getLocation(i)
          var img = "data:image/" + Config.picture_type + ";base64," + res.data.base64_str
          this.addPictureOverlay(location, task.name, img)
      }

    },
    // 获取第i架战机的位置，当前由于缺乏接口，先返回一个随机数
    getLocation(i) {
      var lines_cnt = Config.lines.length
      var selected_line = (i % lines_cnt)
      var start_point = Config.lines[selected_line].coords[0]
      var end_point = Config.lines[selected_line].coords[1]
      var randomNumber = Math.random()
      return [-(start_point[0] - end_point[0]) * randomNumber + start_point[0], 
        -(start_point[1] - end_point[1]) * randomNumber + start_point[1]]
    },
    getRandom(min, max) {
      return Math.random() * (max - min) + min;
    },
    getLabel(i) {
      var task = this.tasks[i]
      this.$http.get(this.tasks[i].api).then((res)=>{
          var location = this.getLocation(i)
          var data = eval('(' + res.data + ')')
          var img = "data:image/" + Config.picture_type + ";base64," + data.base64_str
          var need_show = false
          data.result_list.forEach(element => {
              if(element.score >= 0.5) {
                  need_show = true
              }
          });
          if(need_show)
            this.addPictureOverlay(location, task.name, img)
          // if(res.data.service == "Image Segmentation") {
          //   if(res.data.message == "Object successfully segmented.")
          //     this.addPictureOverlay(location, task.name, img)
          // }
          // else if(res.data.service == "Image Classification") {
          //   if(res.data.message == "Object successfully classified.")
          //     this.addPictureOverlay(location, task.name, img)
          // }
          // else {
          //   if(Array.isArray(res.data.score)) {
          //     for(var i = 0, len = res.data.score.length; i < len; i++) {
          //       if(res.data.score >= 0.5) {
          //         this.addPictureOverlay(location, task.name, img)
          //         break
          //       }
          //     }
          //   } else {
          //     if(res.data.score >= 0.5) {
          //       this.addPictureOverlay(location, task.name, img)
          //     }
          //   }
          // }
      }).catch((e)=> {
        console.log(e)
      })
    },
    addPictureOverlay(location, name, imgsrc) {
      var bmap = this.charts.getModel().getComponent('bmap').getBMap();
      function PictureOverlay(location, name, imgsrc){
          this._location = location;
          this._name = name;
          this._imgsrc = imgsrc;
      }
      // 继承API的BMap.Overlay
      PictureOverlay.prototype = new BMap.Overlay();
      PictureOverlay.prototype.initialize = function(map){
        // 保存map对象实例
        this._map = map;
        // 创建div元素，作为自定义覆盖物的容器
        var div = document.createElement("div");
        div.style.position = "absolute";
        // 可以根据参数设置元素外观
        div.style.width = '200px';
        div.style.height = '240px';
        var img = document.createElement("img");
        img.style.width = '100%';
        img.src = this._imgsrc

        var arrow = document.createElement('div');
        arrow.style.width = '0';
        arrow.style.height = '0';
        arrow.style.borderColor = 'red transparent transparent transparent';
        arrow.style.borderStyle = 'solid';
        arrow.style.borderWidth = '10px'
        div.appendChild(arrow)
        div.appendChild(img);
        // 将div添加到覆盖物容器中
        map.getPanes().markerPane.appendChild(div);
        // 保存div实例
        this._div = div;
        return div
      }
      PictureOverlay.prototype.draw = function(){    
      // 根据地理坐标转换为像素坐标，并设置给容器    
          var position = this._map.pointToOverlayPixel(this._location);  
          console.log(position)  
          this._div.style.left = position.x + 'px';    
          this._div.style.top = position.y + 'px';    
      }
      var picOverlay = new PictureOverlay(new BMap.Point(location[0], location[1]), name, imgsrc)
      bmap.addOverlay(picOverlay);
      this.labels.push(picOverlay);
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