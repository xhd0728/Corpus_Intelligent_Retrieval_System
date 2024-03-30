<template>
  <div>
    <my-header></my-header>
    <div class="about" style="width: 76.8rem;width:82%;margin: auto; border: 1px solid #e5e5e5;">
      <my-image></my-image>
      <div class="menu">
        <div :class="[searchclick ? click : unclick]" @click="search">
          Search
        </div>
        <div :class="[frequencyclick ? click : unclick]" @click="frequency">
          Frequency
        </div>
        <div :class="[contextclick ? click : unclick]" @click="context">
          Context
        </div>
      </div>
      <div style="position: relative;height: 2.2rem;">
        <div class="user">
          {{ usercode }}&nbsp;{{ username }}, 你好！
          <el-button type="text" style="color: black;font-size: 0.9rem;margin-right: 0;" @click="logout">退出登录</el-button>
        </div>
      </div>

      <div class="content">
        <div class="search" v-if="searchclick">
          <div class="graybox">
            <textarea v-model="longtext" id="longinput" placeholder="add multiple lines"></textarea>
            <div class="buttonbox">
              <div class="buttonlight" style="width: 62%;cursor: pointer;" @click="startsearch">
                Start Searching
              </div>
              <div class="buttonlight" style="width: 32%;cursor: pointer;" @click="reset">
                Reset
              </div>
            </div>
            <div class="selectionbox">
              <div class="tickbox">

                <div class="buttondark" style="width: 62%;">
                  Case-sensitive
                </div>
                <input type="checkbox" id="checkbox" v-model="limitcase" />
              </div>
              <div class="tickbox">
                <div class="buttondark" style="width: 62%;margin-right: 0.8rem;">
                  Search window size
                </div>
                <select v-model="bothnum" id="selectbox">
                  <option disabled value=""></option>
                  <option>50</option>
                  <option>100</option>
                  <option>200</option>
                  <option>300</option>
                  <option>400</option>
                  <option>500</option>
                </select>
              </div>

              <div class="tickbox">
                <div class="buttondark" style="width: 62%;margin-right: 0.8rem;">
                  Number of hits per page
                </div>
                <select v-model="indexnum" id="selectbox">
                  <option disabled value=""></option>
                  <option>50</option>
                  <option>100</option>
                  <option>150</option>

                </select>
              </div>

              <div class="tickbox">
                <div class="buttondark" style="width: 62%;margin-right: 0.8rem;">
                  Retrieval range
                </div>
                <select v-model="choice" id="selectbox">
                  <option disabled value=""></option>
                  <option>the whole corpus</option>
                  <option v-for="(item, index) in qm" :key="index">{{ item.name_en }}</option>

                  <!-- <option>{{ qm[0].name_en }}</option>
                  <option>{{ qm[1].name_en }}</option> -->

                </select>
              </div>

              <div class="tickbox">
                <div class="buttondark" style="width: 62%;margin-right: 0.8rem;">
                  Query Method
                </div>
                <select v-model="querymethod" id="selectbox">
                  <option disabled value=""></option>
                  <option>word query</option>
                  <option>regular query</option>
                </select>
              </div>

            </div>
          </div>
          <div class="graybox1">

            <div class="graysmall">
              Case-Sensitive determines whether The result and the result would be two different searches, or It finds,
              it
              finds, It Finds.
            </div>

            <div class="graysmall">
              Search Window Size refers to the number of characters on either side of the search word.
            </div>
            <div class="graysmall">
              Number of Hits per Page means the number of hits that you have searched in one page.
            </div>
            <div class="graysmall">
              Retrieval range refers to the corpus in which the target is retrieved. It includes the whole corpus as
              well as the two sub-corpora, Naval Architecture and Marine Engineering Academic English Corpus, and Nuclear Science and Technology Academic English Corpus.
            </div>
            <div class="graysmall">
              Query method serves for both word query and regular query.
            </div>
          </div>
        </div>
        <div v-else-if="frequencyclick" class="frequency">
          <frequency :currentPageData="currentPageData" :longtext="longtext" :indexnum="indexnum" :bothnum="bothnum"
            :loading1="loading1" :limitcase="limitcase" @jump="jump"></frequency>
        </div>
        <div v-else-if="contextclick" class="context">
          <context :tableData="tableData" :longtext="longtext" :indexnum="indexnum" :keytype="keytype" :fre="fre"
            :bothnum="bothnum" :pageSize="pageSize" :loading2="loading2" :limitcase="limitcase" :resindexnum="resindexnum"
            @turnpage="turnpage"></context>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>

<script>
import frequency from './MyFrequency.vue'
import context from './MyContext.vue'
// import axios from 'axios';

export default {

  components: {
    frequency: frequency,
    context: context,
  },
  data() {
    return {
      loading1: false,
      loading2: false,
      searchclick: true,
      frequencyclick: false,
      contextclick: false,
      click: 'click',
      unclick: 'unclick',
      longtext: '',//检索框内容
      newlongtext: '',//替换后的检索框内容
      limitcase: false,//默认不限制大小写
      bothnum: 50,//被检索词两边的字符数
      indexnum: 50,//索引条数
      resindexnum: 0,//后端返回的索引条数
      pageSize: 1, // 统共页数，默认为1
      choice: 'the whole corpus',//选择哪一个语料库进行检索
      choicenum: 0,
      querymethod: 'word query',//默认单词查找
      querymethodnum: 0,
      currentPageData: [],
      par: '',//context页面要展示的文字的par
      keytype: '',
      searchname: '',
      fre: '',
      tableData: [],
      username: '',
      usercode: '',
      qm: [],//语料库范围
    }
  },
  mounted() {
    //请求语料库的范围
    this.$axios.request({
      method: 'GET',
      url: "/api/corpus/category",


    }).then((res) => {
      this.qm = res.data.a;
      // console.log(res.data.a);
    })
    // console.log("qm:"+this.qm);
    // var url = window.location.search;
    // alert(url); 
    // alert(this.$route.query.b)

    // if(this.$route.query.ticket == undefined) window.location.href = 'https://cas.hrbeu.edu.cn/cas/login?service=http://corpus.hrbeu.edu.cn/Search'

    let userName = window.localStorage.getItem('username');
    let userCode = window.localStorage.getItem('usercode');
    let ticket = window.localStorage.getItem('ticket');

    if (userName && userCode) {
      this.username = userName;
      this.usercode = userCode;
    }
    else {
      this.$axios.request({
        method: 'POST',
        url: "/api/user/cas",
        data: {
          ticket: ticket,// ticket
          service: 'http://corpus.hrbeu.edu.cn/Search',//网址
        }
      }).then((res) => {
        this.username = res.data.detail.user_name;
        this.usercode = res.data.detail.user_code;
        window.localStorage.setItem("username", this.username);
        window.localStorage.setItem("usercode", this.usercode);
      })
    }


    // alert(loc);
  },
  methods: {
    logout() {
      window.localStorage.removeItem('ticket');
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('usercode');

      // axios({
      //   method: 'get',
      //   url: 'https://cas.hrbeu.edu.cn/cas/logout',
      //   params: { service: "http://corpus.hrbeu.edu.cn/Search" }
      // });
      // this.$router.push("./home");

      // this.$axios.request({
      //   method: 'GET',
      //   url: "/api/user/cas",
      //   data: {
      //     ticket: this.$route.query.ticket,// ticket
      //     service: 'http://corpus.hrbeu.edu.cn/Search',//网址
      //   }
      // })

      //https://cas.hrbeu.edu.cn/cas/logout?service=http://corpus.hrbeu.edu.cn/
      window.location.href = 'https://cas.hrbeu.edu.cn/cas/logout?service=http://corpus.hrbeu.edu.cn/'
    },
    search() {
      this.searchclick = true;
      this.frequencyclick = false;
      this.contextclick = false;
    },
    frequency() {
      this.searchclick = false;
      this.frequencyclick = true;
      this.contextclick = false;
    },
    context() {
      this.searchclick = false;
      this.frequencyclick = false;
      this.contextclick = true;
    },
    // 转义
    escape(n) {
      // % 用%25代替
      n = n.replace(/%/g, "%25")
      // 空格 用%20代替
      n = n.replace(/ /g, "%20")
      // " 用%22代替
      n = n.replace(/"/g, "%22")
      // # 用%23代替
      n = n.replace(/#/g, "%23")
      // &用%26代替
      n = n.replace(/&/g, "%26")
      // ( 用%28代替
      n = n.replace(/\(/g, "%28")
      // ) 用%29代替
      n = n.replace(/\)/g, "%29")
      // + 用%2B代替
      n = n.replace(/\+/g, "%2B")
      // , 用%2C代替
      n = n.replace(/,/g, "%2C")
      // / 用%2F代替
      n = n.replace(/\//g, "%2F")
      // : 用%3A代替
      n = n.replace(/:/g, "%3A")
      // ; 用%3B代替
      n = n.replace(/;/g, "%3B")
      // < 用%3C代替
      n = n.replace(/</g, "%3C")
      // = 用%3D代替
      n = n.replace(/=/g, "%3D")
      // > 用%3E代替
      n = n.replace(/>/g, "%3E")
      // ? 用%3F代替
      n = n.replace(/\?/g, "%3F")
      // @ 用%40代替
      n = n.replace(/@/g, "%40")
      // \ 用%5C代替
      n = n.replace(/\\/g, "%5C")
      // | 用%7C代替
      n = n.replace(/\|/g, "%7C")
      return n
    },
    // 匹配qm和cid
    findCidByName(name, qm) {
      const matchedObject = qm.find(item => item.name_en === name);
      return matchedObject ? matchedObject.cid : 0;
    },
    // 判断正则表达式子函数
    // isRegex(str) {
    //   try {
    //     new RegExp(str);
    //     console.log("ok")
    //     return true;
    //   } catch (e) {
    //     console.log(e)
    //     return false;
    //   }
    // },
    // isRegex(str) {
    //   let isReg = true;
    //   try {
    //     new RegExp(str);
    //   } catch (e) {
    //     isReg = false;
    //   }
    //   return isReg
    // },

    // 真正搜索
    realsearch() {
      // 判断是否为单词
      if (this.querymethod == 'word query') {
        this.querymethodnum = 0
      }
      // 判断是正则查找
      else if (this.querymethod == 'regular query') {
        this.querymethodnum = 1
      };
      this.loading1 = true;
      console.log("this.loading1" + this.loading1)

      // console.log("categoryname" + this.qm[0])
      // console.log("category" + this.qm.indexOf(this.choice))
      this.$axios.request({
        method: 'GET',
        url: "/api/corpus/format",
        params: {
          word_or_regex: this.newlongtext,// 检索内容
          limit_case: (this.querymethod == 'regular query') ? true : this.limitcase,//大小写敏感
          window_size: this.bothnum,// 检索词两边的字符数
          per_page: this.indexnum,// 一页展示的索引条数
          category: this.findCidByName(this.choice, this.qm),//选择哪一个语料库进行检索
          query_method: this.querymethodnum,//默认单词查找
        }

      }).then((res) => {
        // this.$message({
        //   showClose: true,
        //   message: '开始检索……',
        //   type: 'success'
        // });
        this.loading1 = false;
        this.currentPageData = res.data
        // this.resindexnum = res.data.total

      })
      this.searchclick = false;
      this.frequencyclick = true;
      this.contextclick = false;
    },

    // 对检索框内容进行检索
    startsearch() {
      // console.log("搜索啊憨批")
      this.newlongtext = this.longtext
      if (this.newlongtext == '' || this.newlongtext.trim().length === 0) {
        this.$message({
          message: '请输入内容后查询',
          type: 'warning'
        });
      }
      else {
        console.log("现在是有东西的");
        if (this.newlongtext.substring(0, 2).indexOf("\\b") != -1) {
          console.log("存在\b")
          // console.log("hhh"+this.newlongtext.substring(0,2))
          this.newlongtext = this.newlongtext.slice(2)
          // console.log(this.newlongtext)
        }
        this.realsearch();
        // 判断是否为单词
        // if (this.this.querymethod == 'word query') {
        //   this.querymethodnum = 0
        // };
        // 判断是否为正则表达式
        // if (this.querymethod == 'regular query') {
        //   console.log("现在是正则表达式哦")
        //   this.querymethodnum = 1
        //   console.log(this.newlongtext)
        //   if (this.isRegex(this.newlongtext)) {
        //     this.realsearch();
        //   }
        //   else {
        //     console.log("这不是正则表达式，憨批！")
        //     this.$message.error('输入不符合正则表达式规范');
        //   }
        // };

        // const firstChar = this.newlongtext.charAt(0);
        // // console.log(firstChar)
        // const letters = "aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ/\\(_"
        // if (!letters.includes(firstChar)) {
        //   console.log("输错了憨批")
        //   this.$message.error('输入包含非法字符，请重新输入');

        // }
        // else {
        //   // if(this.querymethod=='regular query') this.limitcase=true;
        //   // console.log(this.newlongtext.substring(0,2))
        //   // console.log(this.newlongtext.substring(0,2).indexOf("\b"))
        //   if (this.newlongtext.substring(0, 2).indexOf("\b") != -1) {
        //     // console.log("hhh"+this.newlongtext.substring(0,2))
        //     this.newlongtext = this.newlongtext.slice(2)
        //     // console.log(this.newlongtext)
        //   }
        //   // if (this.choice == 'the whole corpus') {
        //   //   this.choicenum = 0
        //   // }
        //   // else if (this.choice == 'sub-corpus of Shipbuilding-') {
        //   //   this.choicenum = 1
        //   // }
        //   // else if (this.choice == 'sub-corpus of Nuclear-') {
        //   //   this.choicenum = 2
        //   // }
        //   // if (this.querymethod == 'word query') {
        //   //   this.querymethodnum = 0
        //   // }
        //   // else if (this.querymethod == 'regular query') {
        //   //   this.querymethodnum = 1
        //   // }
        //   // this.loading1 = true;
        //   // // console.log("categoryname" + this.qm[0])
        //   // // console.log("category" + this.qm.indexOf(this.choice))
        //   // this.$axios.request({
        //   //   method: 'GET',
        //   //   url: "/api/corpus/format",
        //   //   params: {
        //   //     word_or_regex: this.newlongtext,// 检索内容
        //   //     limit_case: (this.querymethod == 'regular query') ? true : this.limitcase,//大小写敏感
        //   //     window_size: this.bothnum,// 检索词两边的字符数
        //   //     per_page: this.indexnum,// 一页展示的索引条数
        //   //     category: this.findCidByName(this.choice, this.qm),//选择哪一个语料库进行检索
        //   //     query_method: this.querymethodnum,//默认单词查找
        //   //   }

        //   // }).then((res) => {
        //   //   // this.$message({
        //   //   //   showClose: true,
        //   //   //   message: '开始检索……',
        //   //   //   type: 'success'
        //   //   // });
        //   //   this.loading1 = false;
        //   //   this.currentPageData = res.data
        //   //   // this.resindexnum = res.data.total

        //   // })
        //   // this.searchclick = false;
        //   // this.frequencyclick = true;
        //   // this.contextclick = false;
        // }


      }


    },
    // 重置检索框内容
    reset() {
      this.longtext = ''
    },
    jump(t) {
      this.loading2 = true;
      this.keytype = t.name;
      this.searchname = t.searchname;
      this.fre = t.num;
      // console.log("keytype"+this.keytype)
      // console.log(t);
      this.$axios.request({
        method: 'GET',
        url: "/api/corpus/files",
        params: {
          'word_or_regex': t.searchname,// 检索内容key的类型                       
          'limit_case': (this.querymethod == 'regular query') ? true : this.limitcase,//大小写敏感
          'window_size': this.bothnum,// 检索词两边的字符数
          'per_page': this.indexnum,// 一页展示的索引条数
          'page': 1,
          'category': this.choicenum,//选择哪一个语料库进行检索
          'query_method': this.querymethodnum,//默认单词查找
        }

      }).then((res) => {
        this.loading2 = false;
        // this.$message({
        //   showClose: true,
        //   message: '开始检索……',
        //   type: 'success'
        // });
        this.tableData = res.data.data;
        this.resindexnum = res.data.total;
        this.pageSize = Math.ceil(this.resindexnum / this.indexnum);
        // console.log('后端返回值')
        // console.log(this.tableData);
        // console.log(this.resindexnum)
      })


      this.searchclick = false;
      this.frequencyclick = false;
      this.contextclick = true;

    },
    turnpage(t) {
      this.loading2 = true;
      // this.searchname=escape(this.searchname)
      // console.log("escape后的searchname"+this.searchname)
      console.log(t)
      this.$axios.request({
        method: 'GET',
        url: "/api/corpus/files",
        params: {
          'word_or_regex': this.searchname,// 检索内容key的类型                    
          'limit_case': (this.querymethod == 'regular query') ? true : this.limitcase,//大小写敏感
          'window_size': this.bothnum,// 检索词两边的字符数
          'per_page': this.indexnum,// 一页展示的索引条数
          'page': t.page,
          'random_case': t.rank,
          'category': this.choicenum,//选择哪一个语料库进行检索
          'query_method': this.querymethodnum,//默认单词查找
        }

      }).then((res) => {
        this.loading2 = false;
        // this.$message({
        //     showClose: true,
        //     message: '开始检索……',
        //     type: 'success'
        // });
        // eslint-disable-next-line
        this.tableData = res.data.data;


      })
    }
  }
}
</script>

<style>
.menu {
  display: flex;
  justify-content: space-between;
  padding: 0;
}

.click {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  cursor: pointer;
  background-color: rgba(47, 85, 151, 1);
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  width: 33.2%;
  height: 3rem;
  line-height: 3rem;
}

.unclick {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  cursor: pointer;
  background-color: rgba(143, 170, 220, 1);
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  width: 33.2%;
  height: 3rem;
  line-height: 3rem;
}

.search {

  /* padding: 2rem 9rem; */
  padding-bottom: 2rem;
  padding-left: 9rem;
  padding-right: 9rem;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
}

.frequency {

  padding: 1rem 0rem;
}

.context {

  padding: 1rem 0rem;
}

.graybox {
  background-color: rgba(231, 230, 230, 1);
  width: 45%;
  /* height: 10vh; */
  padding: 1rem;
}

.graybox1 {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;

  background-color: rgba(231, 230, 230, 1);
  width: 45%;
  /* height: 10vh; */
  padding: 0.5rem 1rem;
  color: rgba(47, 85, 151, 1);
  font-weight: 700;
  font-size: 1.2rem;
  /* text-align: center; */
  line-height: 2rem;
}

.graysmall {
  text-indent: 2rem;
  text-align: justify;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
}

.buttonbox {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;

}

.buttondark {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  background-color: rgba(47, 85, 151, 1);
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  line-height: 2rem;
  height: 2rem;


}

.buttonlight {
  background-color: rgba(143, 170, 220, 1);
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  height: 2rem;
  line-height: 2rem;

}

.buttonlight:active {
  background: rgba(47, 85, 151, 1);
}

.tickbox {
  display: flex;
  padding: 0.4rem 0;
}

#longinput {
  font-family: 'Times New Roman', Times, serif;
  width: 100%;
  min-height: 10rem;
  font-weight: 700;
  font-size: 1.2rem;
  color: black;
}

#checkbox {
  margin-left: 1rem;
  margin-top: 0.7rem;
  height: 1.8rem;
  width: 1.8rem;

}

#selectbox {
  font-size: 1rem;
  width: 10rem;
  margin-top: 0.6rem;
  height: 1.8rem;
  text-align: center;
}

.user {
  display: flex;
  /* width: 18%; */
  align-items: center;
  font-size: 0.9rem;
  position: absolute;
  right: 0;
}
</style>
