<template>
    <div>
    <div class="t">
        <label>视角：</label>
        <select v-model="selected" class="s">
            <option :key="task.name" :value="task" v-for="task in tasks">{{task.name}}</option>
        </select>
    </div>
    <div class="i">
        <img v-bind:src="picture"/>
    </div>
    </div>
</template>

<script>
import Config from '../../static/config.json'
export default {
    mounted() {
        this.tasks = Config.small_screen_tasks
        this.selected = this.tasks[0]
        this.timer = setInterval(() => {
            setTimeout(this.getImg, 0)
        }, Config.refresh_interval)
        console.log(this.tasks)
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
                this.picture = "data:image/jpeg;base64," + res
            })
        }
    },
    beforeUnmount(){
        clearInterval(this.timer);        
        this.timer = null;
    }
}
</script>

<style scoped>
.t {
    background-color: #0e2152;
    font-weight: bolder;
    color: white;
    margin-top: 1%;
    margin-bottom: 1%;
}
.s {
    background-color:#0e2152;
    color: whitesmoke;
    border-radius: 0;
}
.i {
    width: 100%;
    height: 100%;
}
</style>