<template>
    <div>
        <my-header></my-header>
        <div
            style="width: 76.8rem;width:82%;margin: auto; border-left: 1px solid #e5e5e5;border-bottom: 1px solid #e5e5e5;border-right: 1px solid #e5e5e5;">

            <my-image></my-image>
            <div id="body" style="width:100%">
                <div class="swiper-container">
                    <el-carousel indicator-position="outside" trigger="click" height="420px">
                        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
                            <img :src="item.pictureurl" id="img">
                            <!-- <el-image :src="item.pictureurl" id="img" fit="contain"></el-image> -->
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div id="text">
                    <span @click="$router.push({ path: '/detail', query: { part_id: 1 } })"
                        style="position:absolute;top:0.393rem;right:0.96rem;color:#46689f;cursor:pointer;font-size:larger">更多</span>
                    <ul style="margin-top:2.751rem">
                        <li v-for="(litext, index) in text" :key="index">

                            <div style="height:1.5rem;border-bottom:1px solid #e5e5e5" @click="select(litext.aid)">{{
                                    index
                                    +
                                    1
                            }}.&nbsp;{{ litext.title }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- <router-view></router-view> -->
            
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bannerList: [],
            text: [],
        }
    },
    created() {
        this.getbannerList();
        this.getnews();
    },
    methods: {
        getbannerList() {
            this.$axios.request({
                method: 'GET',
                url: '/api/academic/main'
            }).then((res) => {
                // console.log("/api/academic/main");
                if (res.status == 200) {
                    this.bannerList = res.data;
                } else {
                    alert("出错啦！")
                }
            })
        },
        getnews() {
            this.$axios.request({
                method: 'GET',
                url: '/api/academic/title'
            }).then((res) => {
                // console.log("/api/academic/title");
                if (res.status == 200) {
                    this.text = res.data.data;
                } else {
                    alert("出错啦！")
                }
            })
        },
        select(index) {
            this.$router.push({
                path: "/text",
                query: {
                    part_id: 1,
                    academic_id: index
                }
            })
        }
    },
}
</script>

<style scoped>
#body {
    position: relative;
    height: 420px;
}

.swiper-container {
    position: absolute;
    top: 0;
    left: 1.92;
    width: 45%;
    /* border-right: 1px solid blue; */
}

#img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* object-position: center; */
    /* object-fit: cover;  */
}

#text {
    position: absolute;
    height: 26.2rem;
    width: 55%;
    left: 45%;
    background-color: #f2f2f2;
}

#text li {
    /* list-style-type: disc; */
    font-family: "微软雅黑";
    /* font-size: larger; */
    font-weight: 400;
    margin-bottom: 1.5rem;
}

#text li div {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 2.358rem;
    width: 100%;
    cursor: pointer;
    margin-top: 1px;
}

#text li div:hover {
    color: rgb(39, 177, 231);
}
</style>