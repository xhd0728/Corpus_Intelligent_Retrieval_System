<template>
    <!-- style="background-image: linear-gradient(to bottom,#d8dfe2,white)" -->
    <!-- style="background-image: linear-gradient(to bottom,#d8dfe2,white)" -->
    <div>
        <my-header></my-header>
        <div class="main" style="width:78rem;width:82%;margin: auto;">




            <!-- 轮播图 -->
            <div class="body1">
                <div class="swiper-container">
                    <el-carousel trigger="click" height="26rem" indicator-position="none">
                        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
                            <img :src="item.pictureurl" id="img" @click="open(item.pictureurl)">
                            <!-- <el-image :src="item.pictureurl" id="img" >

                            </el-image> -->
                            <!-- <el-image :src=item.pictureurl fit="cover" id="img"></el-image> -->
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>



            <div class="ch_wraper">



                <div class="ch_innerw">
                    <div class="ch_title">
                        <span class="ch_title_text">课程建设</span>
                        <span class="ch_title_more" @click="ch_more(0)">更多</span>
                    </div>
                    <div class="ch_innerblock">
                        <div class="ch_innerimg">
                            <img src="@/assets/images/index_kcjs.jpg" alt="">
                        </div>
                        <div class="ch_innerul">
                            <ul>

                                <li v-for="(pp, index) in text[0]" :key="index" style="">
                                    <div style="position:relative;height: 2rem;">
                                        <span class="ch_short_text_span" @click="detail(pp.aid, 0)">{{ pp.title
                                            }}</span>
                                        <span style="position:absolute;top:0;right:0;color: #bcbcc1;">{{ pp.create_time
                                            }}</span>
                                    </div>

                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="ch_innerw">
                    <div class="ch_title">
                        <span class="ch_title_text">学术交流</span>
                        <span class="ch_title_more" @click="ch_more(1)">更多</span>
                    </div>
                    <div class="ch_innerblock">
                        <div class="ch_innerimg">
                            <img src="@/assets/images/index_xsjl.jpg" alt="">
                        </div>
                        <div class="ch_innerul">
                            <ul>

                                <li v-for="(pp, index) in text[1]" :key="index" style="">
                                    <div style="position:relative;height: 2rem;">
                                        <span class="ch_short_text_span" @click="detail(pp.aid, 1)">{{ pp.title
                                            }}</span>
                                        <span style="position:absolute;top:0;right:0;color: #bcbcc1;">{{ pp.create_time
                                            }}</span>
                                    </div>

                                </li>

                            </ul>
                        </div>
                    </div>
                </div>

                <div class="ch_innerw">
                    <div class="ch_title">
                        <span class="ch_title_text">团队风采</span>
                        <span class="ch_title_more" @click="ch_more(2)">更多</span>
                    </div>
                    <div class="ch_innerblock">
                        <div class="ch_innerimg">
                            <img src="@/assets/images/index_tdfc.jpg" alt="">
                        </div>
                        <div class="ch_innerul">
                            <ul>

                                <li v-for="(pp, index) in text[2]" :key="index" style="">
                                    <div style="position:relative;height: 2rem;">
                                        <span class="ch_short_text_span" @click="detail(pp.aid, 2)">{{ pp.title
                                            }}</span>
                                        <span style="position:absolute;top:0;right:0;color: #bcbcc1;">{{ pp.create_time
                                            }}</span>
                                    </div>

                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="ch_innerw">
                    <div class="ch_title">
                        <span class="ch_title_text">语料库</span>
                        <span class="ch_title_more" @click="ch_more(3)">更多</span>
                    </div>
                    <div class="ch_innerblock">
                        <div class="ch_innerimg">
                            <img src="@/assets/images/index_ylk.jpg" alt="">
                        </div>
                        <div class="ch_innerul">
                            <ul>

                                <li v-for="(pp, index) in text[3]" :key="index" style="">
                                    <div style="position:relative;height: 2rem;">
                                        <span class="ch_short_text_span" @click="detail(pp.aid, 3)">{{ pp.title
                                            }}</span>
                                        <span style="position:absolute;top:0;right:0;color: #bcbcc1;">{{ pp.create_time
                                            }}</span>
                                    </div>

                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        <router-view></router-view>

        <my-footer></my-footer>
    </div>
</template>

<script>


export default {
    name: 'MyMain',
    async created() {
        await this.getbannerList();
        // this.gettext();
        await this.loading();
        console.log(this.pretext);
    },

    data() {
        return {
            //轮播图轮播的图片的地址
            bannerList: [],
            liContent: ["课程建设", "学术交流", "团队风采", "语料库"],
            navLi: -1,
            // newsLi: 0,
            text: [],
            pretext: [[], [], [], []],
        }
    },


    methods: {
        sleep(ms) {
            return new Promise(resolve =>
                setTimeout(resolve, ms)
            )
        },
        select(index) {
            if (index == 0) {
                // this.$router.replace("/Course");
                this.$router.push('/Course');
            } else if (index == 1) {
                this.$router.push("/Academic");
            } else if (index == 2) {
                this.$router.push("/Group");
            } else if (index == 3) {
                this.$router.push("/home");
            }
        },
        enter(index) {
            this.navLi = index;
            this.newsLi = index;
        },
        leave() {
            this.navLi = -1;
        },
        //获取轮播图照片
        getbannerList() {
            this.$axios.request({
                method: 'GET',
                url: "/api/home/main",
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    this.bannerList = res.data;
                }

            })
        },
        async loading() {
            const result = await this.gettext();
            this.text = result;


        },

        // 获取所有的text数据
        async gettext() {

            //获取课程建设的新闻
            await this.prefor();
            // console.log(this.pretext);
            return this.pretext;
        },

        async prefor() {
            await this.$axios.request({
                method: 'GET',
                url: "/api/message/title",
                params: { category: 2 }
            }).then((res) => {
                // console.log(res.data);
                if (res.status == 200) {
                    let data = res.data;

                    if (data.length >= 5) {
                        // console.log(11111111111111);
                        this.pretext[0] = data.splice(0, 5);
                    } else {
                        this.pretext[0] = data;
                    }


                }
            })
            //获取学术交流信息
            await this.$axios.request({
                method: 'GET',
                url: '/api/academic/title'
            }).then((res) => {
                // console.log("/api/academic/title");
                if (res.status == 200) {
                    let data = res.data.data;
                    // console.log(data);
                    if (data.length >= 5) {

                        this.pretext[1] = data.splice(0, 5);
                    } else

                        this.pretext[1] = data;
                }
            })
            //获取上传照片的信息
            await this.$axios.request({
                method: 'GET',
                url: '/api/team/lists'
            }).then((res) => {
                // console.log("/api/academic/title");
                if (res.status == 200) {
                    // console.log(res.data);
                    let data = res.data;
                    let pdata = data.map(item => {
                        return { title: item.text, create_time: item.prize_time };
                    })
                    // console.log(pdata);
                    if (pdata.length >= 5) {
                        this.pretext[2] = pdata.splice(0, 5);
                    } else
                        this.pretext[2] = pdata;

                }
            })
            //获取语料库的消息
            await this.$axios.request({
                method: 'GET',
                url: "/api/message/title",
                params: { category: 5 }
            }).then((res) => {
                // console.log(res.data);
                if (res.status == 200) {
                    let data = res.data;
                    if (data.length >= 5) {
                        this.pretext[3] = data.splice(0, 5);
                    } else
                        this.pretext[3] = data;
                }
            })
        },
        //进入更多页面
        more() {
            if (this.newsLi == 2) {
                this.$router.push('/Group')
            }
            // 详细内容的页面,两个括号
            else {
                this.$router.push({
                    path: '/detail',
                    query: { part_id: this.newsLi }
                })
            }

        },
        ch_more(p) {
            if (p == 2) {
                this.$router.push('/Group')
            }
            else {
                this.$router.push({
                    path: '/detail',
                    query: { part_id: p }
                })
            }
        },
        open(link) {
            window.open(link);
        },
        // news(news_id) {
        //     this.$router.push({
        //         path: '/news',
        //         query: {
        //             part_id: this.newsLi,
        //             news_id: news_id
        //         }
        //     })
        // },
        //进入新闻详情页面
        detail(aid, p) {
            if (p == 1) {
                this.$router.push({
                    path: "/text",
                    query: {
                        part_id: this.newsLi,
                        academic_id: aid
                    }
                })
            } else if (p == 2) {
                this.$router.push('/Group')
            }
            else {
                this.$router.push({
                    path: "/news",
                    query: {
                        part_id: p,
                        news_id: aid
                    }
                })
            }

        }
    }
}
</script>

<style scoped>
/* .mian {
    display: flex;
} */


/* 轮播图 */
.body1 {
    height: 26rem;
    width: 100%;
}

.swiper-container {
    height: 26rem;
    width: 100%;
    background-color: #e5e5e5;
}

/* 图片位cover自适应 */
#img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    cursor: pointer;
    /* object-position: center; */
    /* object-position: 50% 50%; */
    /* object-fit: cover; */
}

.unactive {
    background-color: #d9e2f3;
}

.active {
    background-color: #2f5496;
    /* background-color: red; */
    color: white;
}

.latest {
    margin-left: 7rem;
}

.latest ul {
    height: 15rem;
    margin-bottom: 0;
}

.latest li {
    list-style-type: none;
    height: 2rem;
    width: 30rem;
    margin-bottom: 1rem;
    line-height: 2rem;
    font-size: larger;
    font-family: Microsoft YaHei;
    border-bottom: 1px solid #e5e5e5;
}

.short_text {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 20rem;
}

.short_text_span {
    cursor: pointer;
}



/* 大盒子 */
#wp_w {
    position: relative;
    margin-top: 7rem;
    height: 49rem;
    font: 14px/1 Microsoft YaHei;
    color: #333;
    background: url(@/assets/images/sec_bg.jpg);
}

.lasted_div {
    position: absolute;
    width: 50rem;
    height: 390px;
    top: -5rem;
    left: 23rem;
    background-color: #fbfbf9;
    border: 1px dashed #000;
}

.more {
    margin-top: 6px;
    height: 2.5rem;
}

.more_btn {
    width: 96px;
    height: px;
    margin: auto;
    /* background: url(@/assets/images/checkmore.png) no-repeat center; */
    cursor: pointer;
}

.wp_nav {
    position: absolute;
    height: 309px;
    top: 22rem;
    /* margin: auto; */
    left: 9rem;
    padding: 0;
    display: inline-block;

}

.i-title {
    height: 4rem;
}

.i-title img {
    margin-left: 40%;
}

/* nav中小li的样式 */
.nav-item {
    width: 239px;
    height: 309px;
    display: inline-block;
    float: left;
    position: relative;
    vertical-align: bottom;
    margin-left: 55px;
    text-align: center;
}

.item-name {
    /* margin: auto; */
    /* margin-left: 78px; */
    margin-top: 245px;
    display: inline-block;
    padding: 5px 10px;
    line-height: 22px;
    cursor: pointer;
}



.mark {
    position: absolute;
    left: 0;
    top: 0;
    height: 309px;
    width: 100%;
    line-height: 309px;
    background-color: rgb(31, 29, 29);
    opacity: 0.8;
    font-size: large;
    cursor: pointer;
}

.news_title {
    display: inline-block;
    margin-left: 50px;
    font-size: x-large;
    color: #607d8b;
}

.ch_wraper {
    margin-top: 2rem;
    width: 100%;
    height: 30rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.ch_innerw {
    width: 48%;
    height: 15rem;
    border: 1px solid white;
}

.ch_title {
    height: 20%;
    line-height: 2.8rem;
    color: #07347e;
    display: flex;
    justify-content: space-between;
}

.ch_title_text {
    /* font-size: large; */
    font-size: 20px;
}

ul {
    padding-left: 20px;
}

.ch_title_more {
    font-size: 14px;
    cursor: pointer;
}

.ch_innerimg {
    width: 42%;
}

.ch_innerimg img {
    width: 100%;
    height: 100%;
}

.ch_innerblock {
    background-color: #f2f2f2;
    width: 95%;
    height: 9.2rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
}

.ch_innerul {
    width: 70%;
    height: 100%;
}


.ch_short_text_span {
    cursor: pointer;
    /* width: 10rem; */
    display: inline-block;
    width: 200px !important;
    height: 20px !important;
    /* float: left !important; */
    overflow: hidden !important;
    white-space: nowrap;
    text-overflow: ellipsis !important;
    font: 14px/1 Microsoft YaHei;
    color: #303030;
}

ul {
    margin: 0;
}
</style>