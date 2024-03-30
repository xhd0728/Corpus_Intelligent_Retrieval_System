<template>
    <div>
        <my-header></my-header>
        <div style="width:76.8rem; width:82%;margin: auto;">

            <my-image></my-image>
            <div class="detail">
                <div class="column-path">
                    <span style="cursor:pointer;" @click="$router.push({ path: '/Main' })">当前位置：首页&nbsp;</span>
                    <span class="possplit">&nbsp;&nbsp;</span>
                    <span> &nbsp;{{ list[part_id] }}</span>
                </div>
                <div id="now">{{ list[part_id] }}</div>
                <div>
                    <ul>
                        <li v-for="(news, index) in DetailList" :key="index" class="my-news">
                            <span class="news-title" @click="gotonews(news.aid)">{{ news.title }}</span>
                            <span class="news-time">{{ news.time }}</span>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="pagenation">
                <div class="block">
                    <el-pagination @current-change="handleCurrentChange" :page-size="10"
                        layout="total, prev, pager, next, jumper" :total="40">
                    </el-pagination>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
export default {
    created() {
        this.getdetail();
    },
    data() {
        return {
            DetailList: [],
            list: ["课程建设", "学术交流", "团队风采", "语料库"],
            nowpage: 1,
            // id从0-3分别表示四个部分
            part_id: 0,
        }
    },
    methods: {

        //每页多少条数据
        // handleSizeChange(val) {
        //     console.log(`每页 ${val} 条`);
        // },
        handleCurrentChange(val) {
            this.nowpage = val;
        },
        getdetail() {
            this.part_id = this.$route.query.part_id;
            if (this.part_id == 0) {
                this.$axios.request({
                    method: 'GET',
                    url: "/api/message/title",
                    params: { category: 2 }
                }).then((res) => {
                    // console.log(res.data);
                    if (res.status == 200) {
                        this.DetailList = res.data;
                    }
                })
            }
            else if (this.part_id == 1) {
                this.$axios.request({
                    method: 'GET',
                    url: "/api/academic/title",
                    params: {
                        //page是当前的页面数
                        current_page: this.nowpage,
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        this.DetailList = res.data.data;
                    }
                })
            }
            else if (this.part_id == 3) {
                this.$axios.request({
                    method: 'GET',
                    url: "/api/message/title",
                    params: { category: 5 }
                }).then((res) => {
                    // console.log(res.data);
                    if (res.status == 200) {
                        this.DetailList = res.data;
                    }
                })
            }
        },
        gotonews(aid) {
            // console.log(11);
            //不同的part_id跳转的路径不同，对于paart_id==0,对应的都是文章，因此跳转到news，
            //而part_id==1，对应的是照片加上文字说明，因此跳转到text页面
            if (this.part_id != 1) {
                this.$router.push({
                    path: '/news',
                    query: {
                        part_id: this.part_id,
                        news_id: aid
                    }
                })
            } else {
                this.$router.push({
                    path: '/text',
                    query: {
                        part_id: this.part_id,
                        academic_id: aid
                    }
                })
            }
        }
    },
    watch: {
        nowpage: {
            immediate: true,
            handler() {
                // console.log(newvalue);
                this.getdetail();
            }
        }
    }
}
</script>

<style scoped>
.detail {
    height: 31.44rem;
}

.column-path {
    margin-top: 0.786rem;
    height: 2rem;
    line-height: 2rem;
    font-size: smaller;
    border-bottom: 1px solid #ededed;
}

.possplit {
    background: url(@/assets/images/posSplit.gif) no-repeat;
    text-indent: 22px;
    background-position: center;
    width: 10px;
    display: inline-block;
}

#now {
    height: 3.144rem;
    text-align: center;
    line-height: 3.144rem;
    color: #005dc4;
    font-size: x-large;
    border-bottom: 1px solid #ededed;
}

.my-news {
    position: relative;
    height: 2.358rem;
}

.news-title {
    display: block;
    position: absolute;
    height: 2.358rem;
    line-height: 2.358rem;
    text-align: left;
    top: 0;
    left: 0;
    cursor: pointer;
}

.news-time {
    display: block;
    text-align: right;
    width: 100px;
    /* height: 20px; */
    height: 2.358rem;
    line-height: 2.358rem;
    position: absolute;
    right: 0;
    top: 0;
    color: #999;
}

.el-pagination {
    width: 24rem;
    margin-left: 51.84rem;
    padding: 0;
}
</style>