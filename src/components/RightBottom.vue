<template>
  <div id="center">
    <!-- <dv-border-box-13> -->
      <div class="down">
        <div class="percent">
          <div class="item bg-color-black">
            <span>今日任务通过率</span>
            <CenterChart
              :id="rate[0].id"
              :tips="rate[0].tips"
              :colorObj="rate[0].colorData"
            />
          </div>
          <div class="item bg-color-black">
            <span>今日任务达标率</span>
            <CenterChart
              :id="rate[1].id"
              :tips="rate[1].tips"
              :colorObj="rate[1].colorData"
            />
          </div>  
        </div>
      </div>
      <div class="up">
        <div
          class="bg-color-black item"
          v-for="item in titleItem"
          :key="item.title"
        >
          <p class="ml-3 colorBlue fw-b fs-xl">{{ item.title }}</p>
          <div>
            <dv-digital-flop
              class="dv-dig-flop ml-1 mt-2 pl-3"
              :config="item.number"
            />
          </div>
        </div>
      </div>
    <!-- </dv-border-box-13> -->
  </div>
</template>

<script>
import CenterChart from '@/components/echart/right/centerChartRate'
import Config from '../../static/config.json'
export default {
  data() {
    return {
      titleItem: [
        {
          title: '累计发现坦克',
          number: {
            number: [Config.tank_detected],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: '累计发现飞机',
          number: {
            number: [Config.plane_detected],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: '任务完成数量',
          number: {
            number: [Config.finished_task],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: '任务总数量',
          number: {
            number: [Config.total_task],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        },
        {
          title: '正在进行',
          number: {
            number: [Config.ongoing_task],
            toFixed: 0,
            textAlign: 'left',
            content: '{nt}',
            style: {
              fontSize: 26
            }
          }
        }
      ],
      water: {
        data: [24, 45],
        shape: 'roundRect',
        formatter: '{value}%',
        waveNum: 3
      },
      // 通过率和达标率的组件复用数据
      rate: [
        {
          id: 'centerRate1',
          tips: Config.pass_rate,
          colorData: {
            textStyle: '#3fc0fb',
            series: {
              color: ['#00bcd44a', 'transparent'],
              dataColor: {
                normal: '#03a9f4',
                shadowColor: '#97e2f5'
              }
            }
          }
        },
        {
          id: 'centerRate2',
          tips: Config.qualified_rate,
          colorData: {
            textStyle: '#3fc0fb',
            series: {
              color: ['#00bcd44a', 'transparent'],
              dataColor: {
                normal: '#03a9f4',
                shadowColor: '#97e2f5'
              }
            }
          }
        }
      ]
    }
  },
  components: {
    CenterChart
  }
}
</script>

<style lang="scss" scoped>
#center {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-left: 20px;
  // background-color: rgba(19, 25, 47, 0.6);
  background-color: rgba(26, 26, 26, 0.6);
  .down {
    padding: 6px 4px;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 185px;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 5px;
    }
    .ranking {
      padding: 10px;
      width: 59%;
      .dv-scr-rank-board {
        height: 225px;
      }
    }
    .percent {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        height: 120px;
        span {
          margin-top: 8px;
          font-size: 14px;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        width: 100%;
        .dv-wa-le-po {
          height: 120px;
        }
      }
    }
  }
  .up {
    width: 100%;
    padding: 6px 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 6px;
      padding-top: 8px;
      margin-top: 8px;
      width: 50%;
      height: 70px;
      .dv-dig-flop {
        width: 150px;
        height: 30px;
      }
    }
  }
}
</style>
