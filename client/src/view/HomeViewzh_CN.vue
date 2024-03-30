<template>
  <div>
    <my-header></my-header>
    <div class="home" style="width:76.8rem;width:82%;margin: auto;">

      <!-- 轮播图 -->
      <div class="body1">
        <div class="swiper-container">
          <el-carousel trigger="click" height="26rem" indicator-position="none">
            <el-carousel-item v-for="(item, index) in bannerList" :key="index">
              <img :src="item.pictureurl" id="img">
              <!-- <el-image :src=item.pictureurl fit="cover" id="img"></el-image> -->
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!-- 文字介绍 -->
      <div class="introduce">
        <div class="title1">
          “船海核”学术英语语料库
        </div>
        <!-- <div class="title1">
          (COSON)
        </div> -->
        <div class="title2">
          -至2022年9月9日，库容约为900万词次-
        </div>
        <div class="content">
          “船海核”学术英语语料库（Academic English Corpus of Naval Architecture and Marine Engineering & Nuclear Science and Technology，简称AECNN）立足于哈尔滨工程大学“三海一核”校本特色，致力于服务“船海核”相关学科学术英语教学，推动相关学术英语研究。该语料库收集 “船舶与海洋工程”、“核科学与技术”一级学科下二级学科近5年（2016年-2020年）英语期刊论文文本约1600篇，库容约为900万词次，具体学科分布如下图所示。二级学科选定参二级学科的选取参照国务院学位委员会第六届学科评议组编制的《学位授予和人才培养学科目录（2018年4月更新）；语料库所选期刊皆为影响因子靠前，且为SCI期刊。
        </div>
        <br>
        <div class="content">
          “船海核”学术英语语料库由田苗及其研究团队成员共同创建。
        </div>
      </div>
      <!-- 思维导图 -->
      <div class="Mindmapping">
        <img src="../assets/images/Mindmappingzh_CN.png" alt="Mind mapping" width="95%" height="98%">
      </div>
      <div style="display: flex;">
        <div class="button" @click="jumppage">
          搜索
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  created() {
    this.getbannerList();
  },
  data() {
    return {
      bannerList: [],
      ticket:''
    }
  },
  methods: {
    jumppage(){
      this.$router.push('/Searchzh_CN');

    },
    getbannerList() {
      this.$axios.request({
        method: 'GET',
        url: "/api/corpus/main",
      }).then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.bannerList = res.data;
        }

      })
    }
  },
  
}
</script>

<style>
.Mindmapping {
  height: 40rem;
  display: flex;
  margin-left: 3rem;
  /* width: 75rem; */
}

#img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
}

.introduce .title1 {
  font-weight: 800;
  font-size: 1.5rem;
  text-align: center;
  font-family: 'Times New Roman', Times, serif;
}

.introduce .title2 {
  /* font-weight: 800; */
  padding-top: 1.5rem;
  font-size: 1.2rem;
  text-align: center;
  font-family: 'Times New Roman', Times, serif;
}

.introduce .content {
  text-indent: 2rem;
  text-align: justify;
  margin: 0 auto;
  /* width: 75rem; */
  /* font-weight: 800; */
  padding-top: 1.5rem;
  font-size: 1.2rem;
  /* text-align: center; */
  font-family: 'Times New Roman', Times, serif;
}

.button {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  cursor: pointer;
  background-color: rgba(143, 170, 220, 1);
  color: white;
  font-weight: 700;
  font-size: 1.9rem;
  text-align: center;
  width: 16rem;
  height: 2.7rem;
  /* margin-right: 1rem; */
  margin-left: auto;
  margin-bottom: 0.4rem;
}
.button:active{
  background-color: rgba(47, 85, 151, 1);
}

/* 轮播图 */
.body1 {
  height: 26rem;
  width: 100%;
}

.swiper-container {
  height: 26rem;
  width: 100%;

}
</style>

