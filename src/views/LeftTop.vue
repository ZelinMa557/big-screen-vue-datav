<template>
  <div id="centerRight2">
    <dv-border-box-13>
      <div class="bg-color-black">
        <div class="d-flex pt-2 pl-2">
          <span>
            <icon name="align-left" class="text-icon"></icon>
          </span>
          <span class="fs-xl text mx-2">无人机飞行速度</span>
        </div>
        <div class="d-flex ai-center flex-column body-box">
          <dv-capsule-chart class="dv-cap-chart" :config="config" />
          <LeftTop/>
        </div>
      </div>
    </dv-border-box-13>
  </div>
</template>

<script>
import LeftTop from '@/components/echart/left/leftTopChart'

export default {
  data() {
    return {
      config: {
        data: [
          {
            name: '飞机1',
            value: 65
          },
          {
            name: '飞机2',
            value: 67
          },
          {
            name: '飞机3',
            value: 34
          },
          {
            name: '飞机4',
            value: 55
          },
          {
            name: '飞机5',
            value: 98
          },
          {
            name: '飞机6',
            value: 80
          }
        ],
        colors : ['#2378f7','#2378f7','#2378f7','#2378f7','#2378f7','#2378f7'],
        unit : 'KM/H',
        showValue : true
      }
    }
  },
  components: { LeftTop }
}
</script>

<style lang="scss" scoped>
#centerRight2 {
  $box-height: 610px;
  $box-width: 300px;
  padding: 5px;
  height: $box-height;
  width: $box-width;
  border-radius: 5px;
  .bg-color-black {
    padding: 5px;
    height: $box-height;
    width: $box-width;
    border-radius: 10px;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 10px;
    overflow: hidden;
    .dv-cap-chart {
      width: 100%;
      height: 260px;
    }
  }
}
</style>
