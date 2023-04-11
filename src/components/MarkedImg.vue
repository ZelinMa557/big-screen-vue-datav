<template>
    <div v-bind:style="{'max-height': height + 'px', 'width' : width + 'px', position : 'relative'}">
        <img v-bind:src="imgsrc" width="100%" onclick="this.test"/>
        <span class="service">{{this.service}}服务</span>
        <div v-if="need_alert" class="alerter">
            <svg t="1681195631321" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12976" width="30" height="30"><path d="M512.049995 1024c-280.672591 0-510.350161-229.57758-511.950005-511.850015-0.799922-136.586661 51.794942-264.874133 147.985549-361.16473C244.276145 54.694659 373.463529 1.099893 511.850015 0.09999h3.499658c134.386876 0 261.074504 52.294893 356.96514 147.585588 97.79045 97.090519 151.685187 226.477883 151.685187 364.364417 0 282.272434-229.677571 511.950005-511.950005 511.950005z m0.199981-972.705009C256.674934 53.094815 49.895127 259.674641 51.294991 511.950005c1.399863 254.175178 208.07968 460.854995 460.755004 460.854995 254.075188 0 460.755004-206.679816 460.755005-460.755005 0-124.087882-48.495264-240.576506-136.486672-328.067962-86.991505-86.391563-202.080266-133.886925-324.068352-132.687042z" fill="#d81e06" p-id="12977"></path><path d="M430.157992 296.471048c0-45.195586 36.696416-81.892003 81.892003-81.892003s81.892003 36.696416 81.892003 81.892003L552.946001 627.938678c0 22.597793-18.298213 40.995996-40.995996 40.995996s-40.995996-18.298213-40.995997-40.995996l-40.796016-331.46763z" fill="#d81e06" p-id="12978"></path><path d="M512.049995 758.425935m-51.195 0a51.195 51.195 0 1 0 102.390001 0 51.195 51.195 0 1 0-102.390001 0Z" fill="#d81e06" p-id="12979"></path></svg>
        </div>
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
            timer : null,
            service : "车辆检测",
            need_alert : true
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
                if(res.data.success == true) {
                    this.imgsrc = "data:image/" + Config.picture_type + ";base64," + res.data.base64_str
                    if(res.data.score > 0.75) {
                        this.need_alert = true
                    } else {
                        this.need_alert = false
                    }
                    this.service = res.data.service
                }
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

<style>
.alerter {
    position: absolute;
    top: 45%;
    left: 45%;
    animation: blinker 1s linear infinite;
}
.service {
    font-size: smaller;
    position: absolute;
    top: 1%;
    right: 1%;
}

@keyframes blinker {
    50% {
        opacity: 0;
    }
}
</style>