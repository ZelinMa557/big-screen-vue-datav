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
    <div >
        <img v-bind:src="picture" class="i"/>
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
        }
    },
    methods: {
        getImg() {
            this.$http.get(this.selected.api).then((res)=>{
                // console.log(res)
                if(res.data.success == true) {
                    console.log(res.data.base64_str)
                    this.picture = "data:image/" + Config.picture_type + ";base64," + res.data.base64_str
                }
            }).catch((e)=> {
                console.log(e)
            })
        },
        change() {
            this.picture = this.selected.default_img
            this.test()
        },
        test() {
            console.log("succ:", TestResponse.success)
            if(TestResponse.success == true)
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
}
</style>