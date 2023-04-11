<template>
    <div id="index" class="box">
        <div class="null">
        </div>
        <div class="title">
            <span class="title text">{{this.title}}</span>
        </div>
        <div v-for="list in task_list" style="{'max-height' : this.ImgHeight}">
            <div v-for="task in list" class="img">
                <MarkedImg :api="task.api" :width="ImgWidth" :height="ImgHeight" :default_="task.default_img"></MarkedImg>
            </div>
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
            this.align(2);
            this.split(2, 1);
        }
        else if (len <= 4) {
            this.ImgWidth = total_width / 2;
            this.ImgHeight = total_height / 2;
            this.align(4);
            this.split(2, 2);
        }
        else if (len <= 6) {
            this.ImgWidth = total_width / 3;
            this.ImgHeight = total_height / 2;
            this.align(6)
            this.split(3, 2);
        }
        else if (len <= 9) {
            this.ImgWidth = total_width / 3;
            this.ImgHeight = total_height / 3;
            this.align(9)
            this.split(3, 3);
        }
        else if (len <= 12) {
            this.ImgWidth = total_width / 4;
            this.ImgHeight = total_height / 3;
            this.align(12)
            this.split(4, 3);
        }
        else if (len <= 16) {
            this.ImgWidth = total_width / 4;
            this.ImgHeight = total_height / 4;
            this.align(16)
            this.split(4, 4);
        }
        else if (len <= 20) {
            this.ImgWidth = total_width / 5;
            this.ImgHeight = total_height / 4;
            this.align(20)
            this.split(5, 4);
        }
        this.ImgWidth = this.ImgWidth
        this.ImgHeight = this.ImgHeight
    },
    data() {
        return {
            tasks: [],
            ImgWidth: 0,
            ImgHeight: 0,
            title : Config.middle_screen_title,
            task_list : [] //将config文件中的task切成二维度数组
        };
    },
    components: { MarkedImg },
    methods : {
        split(m, n) {
            var len = this.tasks.length
            for(var i = 0; i < n; i++) {
                var list = []
                for(var j = 0; j < m; j++) {
                    if((i*m+j+1) > len) break;
                    list.push(this.tasks[i*m+j])
                }
                this.task_list.push(list)
            }
            console.log(this.task_list)
        },
        align(k) {
            var len = this.tasks.length
            for(var i = 0; i < k-len; i++) {
                this.tasks.push({
                    name : "",
                    api : "",
                    default_img : "no_signal"
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#index {
  height: 100%;
  width: 100%;
  background-color: black;
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