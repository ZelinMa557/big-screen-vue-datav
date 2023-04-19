<template>
    <div id="index">
        <div class="null">
        </div>
    <div class="title">
        <label>视角：</label>
        <select v-model="selected" @change="change()" class="s">
            <option :key="task.name" :value="task" v-for="task in tasks">{{task.name}}</option>
        </select>
    </div>
    <div style="position: relative;">
        <img v-bind:src="picture" class="i"/>
        <div v-if="need_alert" class="alerter">
            <svg t="1681195631321" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12976" width="100" height="100"><path d="M926 215.173333l-384-170.666666a21.333333 21.333333 0 0 0-17.333333 0l-384 170.666666A21.333333 21.333333 0 0 0 128 234.666667v217.813333c0 219.866667 129.373333 419.02 329.6 507.333333 32.793333 14.466667 57.566667 21.5 75.733333 21.5s42.94-7.033333 75.733334-21.5c200.226667-88.333333 329.6-287.486667 329.6-507.333333V234.666667a21.333333 21.333333 0 0 0-12.666667-19.493334zM533.333333 682.666667a21.333333 21.333333 0 1 1 21.333334-21.333334 21.333333 21.333333 0 0 1-21.333334 21.333334z m21.333334-149.333334a21.333333 21.333333 0 0 1-42.666667 0V320a21.333333 21.333333 0 0 1 42.666667 0z" fill="#d81e06" p-id="3344"></path></svg>
        </div>
    </div>
    </div>
</template>

<script>
import Config from '../../static/config.json'
import TestResponse from '../../static/formatted.json'
export default {
    mounted() {
        this.tasks = Config.small_screen_tasks
        this.selected = this.tasks[0]
        this.picture = this.selected.default_img
        this.test()
        this.timer = setInterval(() => {
            setTimeout(this.getImg, 0)
        }, Config.refresh_interval)
    },
    data() {
        return {
            tasks : [],
            selected : {},
            timer : null,
            picture: "",
            service: "车辆检测",
            need_alert: false
        }
    },
    methods: {
        getImg() {
            this.$http.get(this.selected.api).then((res)=>{
                var data = eval('(' + res.data + ')')
                this.picture = "data:image/" + Config.picture_type + ";base64," + data.base64_str
                this.need_alert = false
                data.result_list.forEach(element => {
                    if(element.score >= 0.5) {
                        this.need_alert = true
                    }
                });
            }).catch((e)=> {
                console.log(e)
            })
        },
        change() {
            this.picture = this.selected.default_img
            this.test()
        },
        test() {
            this.picture = "data:image/" + Config.picture_type + ";base64," + TestResponse.base64_str
        }
    },
    beforeUnmount(){
        clearInterval(this.timer);        
        this.timer = null;
    }
}
</script>

<style lang="scss" scoped>
#index {
  height: 100%;
  width: 100%;
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
  .s {
    border-radius: 0;
  }
  .i {
    width: 100%;
    height: 92%;
  }
  .alerter {
    position: absolute;
    top: 40%;
    left: 45%;
    animation: blinker 1s linear infinite;
  }
    .service {
        font-size: larger;
        position: absolute;
        top: 1%;
        right: 1%;
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }
}
</style>