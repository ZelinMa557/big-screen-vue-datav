<template>
    <div v-bind:style="{'height': height + 'px', 'width' : width + 'px'}">
        <img v-bind:src="imgsrc" width="100%" onclick="this.test"/>
    </div>
</template>

<script>
import Config from '../../static/config.json'
import TestResponse from '../../static/formatted.json'
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
        this.test()
        this.timer = setInterval(() => {
            setTimeout(this.getImg, 0)
        }, Config.refresh_interval)
    },
    methods: {
        getImg() {
            this.$http.get(this.api).then((res)=>{
                if(res.success == true)
                    this.imgsrc = "data:image/" + Config.picture_type + ";base64," + res.base64_str
            }).catch((e)=> {
                console.log(e)
            })
        },
        test() {
            console.log("succ:", TestResponse.success)
            if(TestResponse.success == true)
                this.imgsrc = "data:image/" + Config.picture_type + ";base64," + TestResponse.base64_str
        }
    }
}
</script>