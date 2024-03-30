<template>
    <div>
        <my-header></my-header>
        <div style="width: 76.8rem;width:82%;margin: auto; border: 1px solid #e5e5e5;">

            <my-image></my-image>
            <div class="mian">
                <div class="column-path">
                    <span style="cursor:pointer" @click="$router.push('/Main')">&nbsp;&nbsp;首页&nbsp;&nbsp;</span>
                    <span class="possplit">&nbsp;&nbsp;</span>
                    <span style="cursor:pointer"
                        @click="$router.push({ path: '/detail', query: { part_id: part_id } })">
                        &nbsp;{{ list[part_id] }}</span>
                </div>
                <div id="article">
                    <!-- 文章标题 -->
                    <h1 id="title">{{ news.title }}</h1>
                    <!-- 文章信息 -->
                    <p id="meta">
                        <span id="time">时间：{{ news.create_time }}</span>
                        <span id="sources">文章来源：国际合作教育学院</span>
                        <!-- <span id="views">浏览：{{ news.viewed }}</span> -->
                    </p>
                    <!-- 文章内容 -->
                    <div class="entry">
                        <!-- <div v-text="news.text" id="text"></div> -->
                        <div id="text">
                            <p v-for="(paragraph, index) in news.text_par" :key="index">
                                {{ paragraph }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
export default {
    created() {
        this.getnews()
    },
    data() {
        return {
            list: ["课程交流", "学术交流", "团队风采", "语料库"],
            part_id: '',
            news_id: '',
            news: {

            },
        }

    },
    methods: {
        getnews() {
            this.part_id = this.$route.query.part_id;
            this.news_id = this.$route.query.news_id;
            this.$axios.request({
                method: 'GET',
                url: '/api/message/context',
                params: {
                    aid: this.news_id
                }
            }).then((res) => {
                // console.log(res),
                this.news = res.data[0];
                // console.log(res.data);
            })
        }
    }
}
</script>

<style scoped>
.column-path {
    margin-top: 0.786rem;
    height: 1.965rem;
    line-height: 1.965rem;
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

#article {
    width: 57.6rem;
    margin: auto;
}

#title {
    width: 48rem;
    /* 让标题的宽度比内容宽度小一点 */
    line-height: 30px;
    padding: 30px;
    margin: 0.393rem auto;
    text-align: center;
    font-size: 30px;
    font-weight: normal;
    color: #202976;
    /* border-bottom: 0px solid #ECECEC; */
}

#meta {
    /* 居中显示 */
    height: 16px;
    line-height: 16px;
    text-align: center;
    padding: 10px 0;
    margin-top: 0;
    background: #ededed;
}

#meta span {
    display: inline-block;
    margin: 0 5px;
    font-size: 14px;
    color: #000;
}

#text {
    white-space: pre-wrap;
    font-size: 16px;
    font-family: "Microsoft Yahei" !important;
    color: #303030;
    line-height: 1.6 !important;
    /* padding: 10px; */
    /* background:white; */
}
</style>