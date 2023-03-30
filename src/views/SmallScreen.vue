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
export default {
    mounted() {
        this.tasks = Config.small_screen_tasks
        this.selected = this.tasks[0]
        this.picture = this.selected.default_img
        // this.timer = setInterval(() => {
        //     setTimeout(this.getImg, 0)
        // }, Config.refresh_interval)
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
            // this.$http.get(this.selected.api).then((res)=>{
            //     this.imgsrc = "data:image/" + Config.picture_type + ";base64," + res
            // }).catch((e)=> {
            //     this.imgsrc = this.selected.default_img
            //     console.log(e)
            // })
        },
        change() {
            this.picture = this.selected.default_img
            console.log("change")
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