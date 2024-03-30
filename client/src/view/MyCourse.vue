<template>
    <div>
        <my-header></my-header>
        <div style="width: 78rem; width:82%;margin:0 auto; border: 1px solid #e5e5e5;">
            <div class="swiper-container">
                <el-carousel indicator-position="none" trigger="click" height="26rem">
                    <el-carousel-item v-for="(item, index) in bannerList" :key="index">
                        <img :src="item.pictureurl" id="img">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="body">
                <h3>语料库语言学导论</h3>
                <div id="text">
                    <p>&nbsp; &nbsp;
                        语料库语言学是一门独立的学科，具有独特的理论体系和操作方法。它立足于大量且真实的语言数据，检验、发展已有语言理论，或根据数据进行系统且穷进的凝练和概括，形成一种全新的语言描写理论。
                    </p>
                    <p>
                        &nbsp;
                        除此之外，语料库还被视为一种研究方法，大量且真实的语言数据、系统且便捷的操作步骤使得语料库能够解答其他方法较难回答的问题，从而大大地丰富了语言学的研究方法。
                    </p>
                    <p>
                        &nbsp;
                        语料库语言学导论是外国语言学及应用语言学方向的专业选修课，主要对语料库语言学的历史与现状、语料库的建设和加工、在教学和科学研究中的应用等方面进行介绍，通过讲解、实践、讨论，使学生初步了解语料库语言学的概况和发展，具备基本的语料库操作能力，开展科学研究。
                    </p>
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
            bannerList: [],
        }
    },
    created() {
        this.getbannerList();
    },
    methods: {
        getbannerList() {
            this.$axios.request({
                method: 'GET',
                url: '/api/course/main'
            }).then((res) => {
                // console.log(res.data);
                if (res.status == 200) {
                    this.bannerList = res.data;
                } else {
                    alert("出错啦！")
                }
            })
        },

    },
}
</script>

<style scoped>
.swiper-container {
    margin: auto;
    /* margin-top: 0rem; */
    width: 100%;

    background-color: #e5e5e5;
    /* border-bottom: 1px solid #e5e5e5; */
}

#img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* width: 80vw;
    height: 80vh; */
}

.body {
    padding-top: 10px;
    /* background-color: #f2f2f2; */
}

.body h3 {
    text-align: center;
    font-family: "宋体";
    font-size: xx-large;
    color: #202976;
}

.body #text {
    /* text-align: center; */
    font-family: "宋体";
    font-size: larger;
    /* width:0vw; */
    /* height: 19.65rem; */
    margin-left: 3.93rem;
    margin-right: 3.93rem;

}
</style>