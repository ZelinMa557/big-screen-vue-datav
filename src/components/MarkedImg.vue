<template>
    <div v-if="this.no_signal" v-bind:style="{'height': height + 'px', 'width' : width + 'px', position : 'relative'}">
        <div class="nobox">
            <span class="nosig">NO SIGNAL</span>
        </div>
    </div>
    <div v-else>
        <div v-bind:style="{'height': height + 'px', 'width' : width + 'px', position : 'relative', display: 'flex', 'justify-content': 'center', 'align-items': 'center'}">
            <img v-bind:src="imgsrc" v-bind:style="{'height': height + 'px', 'max-width' : '100%'}" onclick="this.test"/>
            <span class="service">{{this.service}}服务</span>
            <span class="name" v-if="this.show_name">类别：{{this.name}}</span>
            <div v-if="need_alert" class="alerter">
                <!-- <svg t="1681195631321" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12976" width="50" height="50"><path d="M512.049995 1024c-280.672591 0-510.350161-229.57758-511.950005-511.850015-0.799922-136.586661 51.794942-264.874133 147.985549-361.16473C244.276145 54.694659 373.463529 1.099893 511.850015 0.09999h3.499658c134.386876 0 261.074504 52.294893 356.96514 147.585588 97.79045 97.090519 151.685187 226.477883 151.685187 364.364417 0 282.272434-229.677571 511.950005-511.950005 511.950005z m0.199981-972.705009C256.674934 53.094815 49.895127 259.674641 51.294991 511.950005c1.399863 254.175178 208.07968 460.854995 460.755004 460.854995 254.075188 0 460.755004-206.679816 460.755005-460.755005 0-124.087882-48.495264-240.576506-136.486672-328.067962-86.991505-86.391563-202.080266-133.886925-324.068352-132.687042z" fill="#d81e06" p-id="12977"></path><path d="M430.157992 296.471048c0-45.195586 36.696416-81.892003 81.892003-81.892003s81.892003 36.696416 81.892003 81.892003L552.946001 627.938678c0 22.597793-18.298213 40.995996-40.995996 40.995996s-40.995996-18.298213-40.995997-40.995996l-40.796016-331.46763z" fill="#d81e06" p-id="12978"></path><path d="M512.049995 758.425935m-51.195 0a51.195 51.195 0 1 0 102.390001 0 51.195 51.195 0 1 0-102.390001 0Z" fill="#d81e06" p-id="12979"></path></svg> -->
                <svg t="1681265782406" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3343" width="48" height="48"><path d="M926 215.173333l-384-170.666666a21.333333 21.333333 0 0 0-17.333333 0l-384 170.666666A21.333333 21.333333 0 0 0 128 234.666667v217.813333c0 219.866667 129.373333 419.02 329.6 507.333333 32.793333 14.466667 57.566667 21.5 75.733333 21.5s42.94-7.033333 75.733334-21.5c200.226667-88.333333 329.6-287.486667 329.6-507.333333V234.666667a21.333333 21.333333 0 0 0-12.666667-19.493334zM533.333333 682.666667a21.333333 21.333333 0 1 1 21.333334-21.333334 21.333333 21.333333 0 0 1-21.333334 21.333334z m21.333334-149.333334a21.333333 21.333333 0 0 1-42.666667 0V320a21.333333 21.333333 0 0 1 42.666667 0z" fill="#d81e06" p-id="3344"></path></svg>
            </div>
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
            need_alert : true,
            no_signal : false,
            show_name : false,
            name : "car"
        }
    },
    mounted() {
        if(this.default_ == "no_signal") {
            this.no_signal = true
        }
        this.imgsrc = this.default_
        this.test()
        this.service = this.getService(this.api)
        if(this.service == "image classification") {
            this.show_name = true
        }
        this.getImg()
        
        this.timer = setInterval(() => {
            setTimeout(this.getImg, 0)
        }, Config.refresh_interval)
    },
    methods: {
        getImg() {
            this.$http.get(this.api).then((res)=>{
                var data = eval('(' + res.data + ')')
                this.imgsrc = "data:image/" + Config.picture_type + ";base64," + data.base64_str
                // 判断是否需要alert
                this.need_alert = false
                data.result_list.forEach(element => {
                    if(element.score >= 0.5) {
                        this.need_alert = true
                    }
                });
                // 图像分类需要加上判断结果
                if(this.service == "image classification") {
                    this.name = data.result_list[0].classfication
                }
            }).catch((e)=> {
                console.log(e)
            })
        },
        test() {
            var res = {
                data :TestResponse
            }
            console.log(res)
            this.imgsrc = "data:image/" + Config.picture_type + ";base64," + res.data.base64_str
            // 判断是否需要alert
            this.need_alert = false
            res.data.result_list.forEach(element => {
                if(element.score >= 0.5) {
                    this.need_alert = true
                }
            });
            // 图像分类需要加上判断结果
            if(this.service == "image classification") {
                this.name = res.data.result_list[0].classfication
            }
        },
        getService(api) {
            var service = api.split('=')[1].split('_')
            return service[0] + ' ' + service[1]
        }
    }
}
</script>

<style>
.alerter {
    position: absolute;
    top: 40%;
    left: 40%;
    animation: blinker 0.8s linear infinite;
}
.service {
    font-size: smaller;
    position: absolute;
    top: 1%;
    right: 1%;
    background-color: gray;
}

.name {
    font-size: smaller;
    position: absolute;
    top: 1%;
    left: 1%;
    background-color: gray;
}

@keyframes blinker {
    50% {
        opacity: 0;
    }
}

.nobox {
    position: absolute;
    left: 35%;
    top: 40%;
    /* border-color: red; */
    border: 5px solid red;
    color: red;
    font-weight: bolder;
    font-size: larger;
}

.nosig {
    margin: 0%;
}
</style>