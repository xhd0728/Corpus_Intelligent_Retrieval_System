<template>
    <div>
        <my-header></my-header>

        <div style="width:76.8rem;width:82%;margin: auto;">

            <my-image></my-image>
            <div class="detail">
                <div class="column-path">
                    <span style="cursor:pointer;" @click="$router.push({ path: '/Main' })">当前位置：首页&nbsp;</span>
                    <span class="possplit">&nbsp;&nbsp;</span>
                    <span> &nbsp;团队风采</span>
                </div>
                <div id="now">团队风采</div>
            </div>
            <div v-for="(yearr, index) in year" :key="index">
                <div style="height:3rem;text-align:center;line-height:3rem;font-size:x-large;font-weight: 800;">{{ yearr
                }}年风采墙</div>
                <div id="imgs">
                    <div class="img" v-for="(list, index) in imgsList[yearr]" :key="index">
                        <el-image :src=list.pictureurl fit="contain" @click="open(list.pictureurl)"
                            style="width: 100%;height: 88%; background-color: white ;"></el-image>
                        <div class="text">{{ list.text }}</div>
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
            imgsList: [],
            year: [],
        }
    },
    created() {
        this.getimgsList();
    },
    methods: {
        open(link) {
            window.open(link);
        },
        getimgsList() {
            this.$axios.request({
                method: 'GET',
                url: '/api/team/list',
            }).then((res) => {
                if (res.status == 200) {
                    // console.log(res.data);
                    this.imgsList = res.data;
                    this.year = Object.keys(this.imgsList).reverse();
                    // console.log(this.year);
                    // console.log(this.imgsList["2022"]);
                } else {
                    alert("出错啦")
                }
            })
        }
    },
}
</script>

<style scoped>
#now {
    height: 3.2rem;
    text-align: center;
    line-height: 3.144rem;
    color: #005dc4;
    font-size: x-large;
    border-bottom: 1px solid #ededed;
}

.column-path {
    margin-top: 0.789rem;
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

#imgs {

    display: flex;
    flex-wrap: wrap;
    /* 放不下，自动换行 */
    justify-content: flex-start;
    background-color: #e5e5e5;
    padding-left: 3%;
}

.img {
    width: 30%;
    height: 24.65rem;
    margin-top: 0.5rem;
    margin-right: 3%;
    cursor: pointer;
    /* margin-bottom: 0.5rem; */
}

.text {
    /* border-top: 1px solid white; */
    /* text-align: center; */

    /* width: 30%; */
}
</style>