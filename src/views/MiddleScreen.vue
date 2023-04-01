<template>
    <div id="index" class="box">
        <div class="null">

        </div>
        <div class="title">
            <span class="title text">实战系统</span>
        </div>
        <div v-for="task in tasks" class="img">
            <MarkedImg :api="task.api" :width="ImgWidth" :height="ImgHeight" :default_="task.default_img"></MarkedImg>
        </div>
    </div>
</template>

<script>
import Config from '../../static/config.json'
import MarkedImg from '../components/MarkedImg.vue'
export default {
    mounted() {
        this.tasks = Config.middle_screen_tasks;
        const total_width = window.screen.width;
        const total_height = window.screen.height*0.92;
        var len = this.tasks.length;
        if (len <= 2) {
            this.ImgWidth = total_width / 2;
            this.ImgHeight = total_height;
        }
        else if (len <= 4) {
            this.ImgWidth = total_width / 2;
            this.ImgHeight = total_height / 2;
        }
        else if (len <= 6) {
            this.ImgWidth = total_width / 3;
            this.ImgHeight = total_height / 2;
        }
        else if (len <= 9) {
            this.ImgWidth = total_width / 3;
            this.ImgHeight = total_height / 3;
        }
        else if (len <= 12) {
            this.ImgWidth = total_width / 4;
            this.ImgHeight = total_height / 3;
        }
        else if (len <= 16) {
            this.ImgWidth = total_width / 4;
            this.ImgHeight = total_height / 4;
        }
        this.ImgWidth = this.ImgWidth
        this.ImgHeight = this.ImgHeight
        console.log("imgsz:", this.ImgWidth, this.ImgHeight)
    },
    data() {
        return {
            tasks: [],
            ImgWidth: 0,
            ImgHeight: 0
        };
    },
    components: { MarkedImg }
}
</script>

<style lang="scss" scoped>
#index {
  height: 100%;
  width: 100%;
  background-color: white;
  .null {
    height: 2%;
    width: 100%;
    background-color: darkblue;
    color: white;
    font-weight: bolder;
    font-size: larger;
  }
  .title {
    height: 6%;
    width: 100%;
    background-color: darkblue;
    color: white;
    font-weight: bolder;
    font-size: larger;
    .text {
        margin-left: 2%;
    }
  }
  .img {
    float: left;
  }
}
</style>