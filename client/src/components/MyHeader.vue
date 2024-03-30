<!-- <template>
    <div style="background-color:white">
        <div class="header">
            <div @click="$router.push('/Mian')"
                style="width:345px;height:75px;cursor:pointer;position: absolute; top: 25px; left: 14px; cursor: pointer;">
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.header {
    height: 6.86rem;
    
    background: url(@/assets/images/logo4.png) no-repeat;


    position: relative;

}
</style> -->
<template>
    <div>
        <div id="top">
            <div class="main">
                <div id="img" style="width: 400px;">
                    <img src="@/assets/images/header.png" width="400" height="90" border="0" title="哈工程语料库">
                </div>
                <!-- <div style="padding-top:5px">
                            <table>
                                <tbody>
                                    <tr>
                                        <td style="color:#fff;font-size:2.0em;">哈工程语料库语言学</td>
                                    </tr>
                                    <tr>
                                        <td style="color:#fff;font-size:0.2em;">Corpus Linguistics, Harbin Engineering
                                            University</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> -->
                <div class="headtitle" style="width: 25.7rem;">
                    <div style="color:#fff;font-size:2.8em;">
                        语料库语言学
                    </div>
                    <div style="color:#fff;font-size:1.18em;padding-top: 0.1rem;">
                        Corpus&nbsp; Linguistics
                    </div>
                </div>
            </div>


        </div>

        <div style="width:100%;background-color: #fff;border-bottom: 1px solid #e5e5e5;">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                text-color="#000" style="display:flex;justify-content:space-between;width: 80%;margin: auto;">
                <el-menu-item index="0">首页</el-menu-item>
                <el-menu-item index="1">课程建设</el-menu-item>
                <el-menu-item index="2">学术交流</el-menu-item>
                <el-menu-item index="3">团队风采</el-menu-item>
                <!-- <el-menu-item index="4">语料库</el-menu-item> -->
                <el-submenu style="" index="4">
                    <template slot="title">语料库</template>
                    <el-menu-item index="4-1">中文版</el-menu-item>
                    <el-menu-item index="4-2">English</el-menu-item>
                </el-submenu>
                <el-submenu style="">
                    <template slot="title">链接直达</template>
                    <el-menu-item index="5-1">哈尔滨工程大学</el-menu-item>
                    <el-menu-item index="5-2">哈尔滨工程大学图书馆</el-menu-item>
                    <el-menu-item index="5-3">外国语学院</el-menu-item>
                    <el-menu-item index="5-4">国际合作教育学院</el-menu-item>
                    <el-menu-item index="5-5">English-corpora</el-menu-item>
                    <el-menu-item index="5-6">Sub-corpora of DEAP</el-menu-item>
                    <el-menu-item index="5-7">《习近平谈治国理政》多语数据库综合平台</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        handleSelect(index) {
            if (index == 0)
                this.$router.push('/Main');
            else if (index == 1)
                this.$router.push('/Course');
            else if (index == 2)
                this.$router.push('/Academic');
            else if (index == 3)
                this.$router.push('/Group');
            // else if (index == 4)
            //     this.$router.push('/home');
            else if (index == "4-2")
                this.$router.push('/home');
            else if (index == "4-1")
                this.$router.push('/homezh_CN');
            else if (index == "5-1")
                window.open('http://www.hrbeu.edu.cn/ ')
            else if (index == "5-2")
                window.open('http://lib.hrbeu.edu.cn/ ')
            else if (index == "5-3")
                window.open('http://fld.hrbeu.edu.cn/')
            else if (index == "5-4")
                window.open('http://heucice.hrbeu.edu.cn/ ')
            else if (index == "5-5")
                window.open('https://www.english-corpora.org/ ')
            else if (index == "5-6")
                window.open('http://114.251.154.212/cqp/ ')
            else if (index == "5-7")
                window.open('http://imate.cascorpus.com/ ')
        }
    },
}
</script>

<style scoped>
#top {
    width: 100%;
    height: 8.5rem;
    background-color: #dc6d20;
    background-color: #003d81;
}

.main {
    /* width: 1100px; */
    display: flex;
    /* justify-content: center; */
    padding-left: 3rem;
    /* margin: auto; */
    /* margin-left: 8rem; */
}

#img {
    padding: 18px 18px;
    display: inline;
}

.headtitle {
    padding: 18px 18px;
}

.el-menu-item {
    height: 3rem;
    line-height: 3rem;
}

.el-submenu {
    height: 2rem;
    line-height: 2rem;
}

/deep/ .el-menu.el-menu--horizontal {
    border: none;
}

/deep/.el-menu--horizontal>.el-submenu .el-submenu__title {
    height: 46px;
    line-height: 46px;
}
</style>