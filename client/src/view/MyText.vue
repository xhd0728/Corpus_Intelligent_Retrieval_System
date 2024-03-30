<template>
    <div>
        <my-header></my-header>
        <div style="width: 76.8rem;width:82%;margin: auto; border: 1px solid #e5e5e5;">

            <my-image></my-image>
            <div id="body">
                <div class="swiper-container">

                    <img :src="list[0].pictureurl[0]" id="img">

                    <div id="title">{{ list[0].title }}</div>
                </div>
                <div id="text">
                    <div class="ganxiang">参会感想：</div>
                    <div>
                        <p v-for="(paragraph, index) in list[0].text_par" :key="index" class="paragraph">
                            {{ paragraph }}
                        </p>
                    </div>
                </div>
            </div>


        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            part_id: '',
            academic_id: '',
            //list是数组，里边包含轮播图的照片bannerlist，title，学术内容content[]
            list: [],
        }
    },
    created() {
        this.getAcademic()
    },
    methods: {
        getAcademic() {
            this.part_id = this.$route.query.part_id;
            this.academic_id = this.$route.query.academic_id;
            this.$axios.request({
                method: 'GET',
                url: "/api/academic/content",
                params: {
                    // part_id: this.part_id,
                    aid: this.academic_id
                }
            }).then((res) => {
                if (res.status == 200) {
                    this.list = res.data;
                } else {
                    alert("出错啦！")
                }
            })
        }
    },
}
</script>

<style scoped>
#body {
    /* position: relative; */
    /* height: 31.44rem; */
    margin-bottom: 0.8rem;
    display: flex;
    justify-content: space-around;
}

.swiper-container {
    margin-top: 5px;
    border: 1px solid #e5e5e5;
    /* height: 450px; */
    /* width: 600px; */
    width:45%;
}

#img {
    width: 100%;
    height: 450px;
    object-fit: contain;
    /* border-bottom: 1px solid #e5e5e5; */
}

#title {
    /* height: 3.144rem; */
    /* line-height: 3.144rem; */
    text-align: center;
    margin: auto;
    margin-top: 0.3rem;
    width: 100%;
}

#text {
    /* position: absolute; */
    /* width: 36.48rem; */
    width:55%;
    /* height: 31.44rem; */
    right: 0;
}

.ganxiang {
    margin-top: 0.393rem;
    font-family: "Microsoft Yahei" !important;
    font-size: large;
}

.paragraph {
    text-indent: 2em;
    width: 33.6rem;
    /* margin: auto; */
    margin-left: auto;
    margin-right: auto;
    line-height: 1.5 !important;
}
</style>