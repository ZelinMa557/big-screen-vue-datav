<template>
    <div v-bind:style="{'height': height + 'px', 'width' : width + 'px'}">
        <img v-bind:src="imgsrc" width="100%"/>
    </div>
</template>

<script>
import Config from '../../static/config.json'
export default {
    props: ['api', 'width', 'height', 'default_'],
    data() {
        return {
            imgsrc: "",
            timer : null
        }
    },
    mounted() {
        this.imgsrc = this.default_
        console.log(this.imgsrc)
        this.getImg()
        this.timer = setInterval(() => {
            setTimeout(this.getImg, 0)
        }, Config.refresh_interval)
    },
    methods: {
        getImg() {
            // this.$http.get(this.api).then((res)=>{
            //     this.imgsrc = "data:image/" + Config.picture_type + ";base64," + res
            // }).catch((e)=> {
            //     this.imgsrc = '../assets/'+this.default_
            //     console.log(e)
            // })
        }
    }
}
</script>