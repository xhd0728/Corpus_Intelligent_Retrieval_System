<template>
    <div id="main">
        <div style="position: relative; width: 65%; height: 50px; margin: auto;line-height: 50px;">
            <div class="title">{{ title[part] }}</div>
            <!-- <div class="title" v-show="part == 4">团队风采获奖证书</div> -->
            <div style="width:200px;position: absolute; right: 0;top: 30%;">
                <el-progress :percentage="picUploadPercent" v-show="show_loading" :text-inside="true"
                    :stroke-width="20">
                </el-progress>
            </div>
        </div>

        <div style="margin:auto;width:62rem">
            <el-table :data="MainSwiper" style="width: 100%" :cell-style="curs" border>
                <!-- <el-table-column width="1"></el-table-column> -->
                <el-table-column type="index" label="序号" width="100" align="center">
                </el-table-column>
                <el-table-column prop="pictureurl" label="图片地址" width="650" align="center"
                    v-if="part == 1 || part == 2 || part == 5">
                    <template slot-scope="scope">
                        <div @click="openpic(scope.row.pictureurl)">{{ scope.row.pictureurl }}</div>
                    </template>
                </el-table-column>


                <el-table-column prop="" label="会议标题" width="600" align="center" v-if="part == 3" key="wf">
                    <template slot-scope="scope">
                        <div style="cursor:pointer" @click="AcademicDetail(scope.row.aid)">{{ scope.row.title }}</div>
                    </template>
                </el-table-column>



                <el-table-column prop="pictureurl" label="获奖时间" width="100" align="center" v-if="part == 4" key="wf">
                    <template slot-scope="scope">
                        <div>{{ scope.row.prize_time }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="text" label="荣誉证书" width="551" align="center" v-if="part == 4" key="wfwf">
                    <template slot-scope="scope">
                        <div @click="openpic(scope.row.pictureurl)" style="cursor:pointer">{{ scope.row.text }}</div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <div @click="MainSwiperDel(scope.$index, scope.row)" style="color: red; cursor: pointer;">
                            删除
                            <!-- <el-button type="danger" @click="MainSwiperDel(scope.$index, scope.row)">删除</el-button> -->
                        </div>
                    </template>
                </el-table-column>



                <el-table-column v-if="part == 1 || part == 2 || part == 5" width="141" key="wfwfw" align="center">
                    <template slot="header">

                        <el-upload class="upload-demo" :action="changeUrl()" :show-file-list=false
                            :on-success="() => uploadsucc()" :headers="headerObj" :on-progress="uploadProgress">
                            <el-button type="success">点击上传</el-button>
                        </el-upload>
                    </template>
                </el-table-column>






                <el-table-column v-if="part == 3" width="190" key="wfwfwfwf" align="center">
                    <template slot="header">
                        <el-button type="success" @click="AcademicAdd()">上传会议信息</el-button>
                    </template>
                </el-table-column>

                <el-table-column v-if="part == 4" width="140" key="wfwfwfwfwwww" align="center">
                    <template slot="header">
                        <el-button type="success" @click="PrizeAdd()">上传证书</el-button>
                    </template>
                </el-table-column>

            </el-table>


            <!-- <el-progress :percentage="picUploadPercent" type="circle" v-show="show_loading"></el-progress> -->

            <el-dialog title="上传证书" :visible.sync="PrizeUploadDialog">
                <div class="PrizeUp">
                    <div>
                        <!-- <el-input placeholder="格式：2020-01-01" v-model="prize_time" class="Prize_time">
                            <template slot="prepend">获奖时间</template>
                        </el-input> -->
                        <el-form :model="prize_form" label-width="80px">
                            <el-form-item label="活动时间">
                                <el-col>
                                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        v-model="prize_form.prize_time" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>

                            <el-form-item label="获奖描述">
                                <el-input placeholder="例如：张宇新 2022年5月第7届全国大学生英语学术词汇竞赛复赛优胜奖"
                                    v-model="prize_form.prize_title" class="Prize_title">

                                </el-input>
                            </el-form-item>
                        </el-form>


                        <div style="width:360px;height:180px;margin:auto">
                            <el-upload drag ref="prize_upload" :http-request="PrizeUpload" action="#"
                                :auto-upload="false" :show-file-list="true" :limit="1" class="Prize_text">
                                <i class="el-icon-upload"></i>
                                <div>
                                    将文件拖到此处，或
                                    <em>点击上传</em>
                                </div>
                            </el-upload>
                        </div>
                        <div style="margin-left:19.1rem;margin-top: 3rem;">
                            <el-button type="success" @click="PrizeSubmit()">上传照片</el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>

            <el-dialog title="上传会议信息" :visible.sync="AcademicUploadDialog">
                <div class="">
                    <div>
                        <el-input placeholder="例如：2022年 7月5日，张宇新参加第十五届语言与语言学国际年会" v-model="Academic_title">
                            <template slot="prepend">会议主题</template>
                        </el-input>

                        <div style="width:360px;height:215px;margin:auto;;">
                            <el-upload drag ref="Academic_upload" :http-request="AcademicUpload" action="#"
                                :auto-upload="false" :show-file-list="true" :limit="1" style="margin-top:0.5rem">
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">
                                    将会议照片拖到此处，或
                                    <em>点击上传会议照片</em>
                                </div>
                            </el-upload>
                        </div>


                        <!-- 会议内容文本框 -->
                        <el-input type="textarea" placeholder="请输入会议内容" v-model="Academic_text"
                            :autosize="{ minRows: 2, maxRows: 10000 }" style="margin-top:0.5rem">
                        </el-input>

                        <el-button type="success" @click="AcademicSubmit()"
                            style="margin-left:19.2rem;margin-top: 1.5rem;">上传会议</el-button>
                    </div>
                </div>
            </el-dialog>

        </div>
    </div>
</template>

<script>
import Base from '@/globle/globleApi.js'
export default {
    mounted() {
        this.GetMainSwiper();
        // console.log(Base.baseURL);
    },
    data() {
        return {
            show_loading: false,
            picUploadPercent: 0,
            MainSwiper: [],
            showAddDialog: false,
            headerObj: { token: window.localStorage.getItem('token') },
            AcademicUploadDialog: false,
            Academic_title: '',
            Academic_text: '',//会议内容

            //团队风采照片按部分
            PrizeUploadDialog: false,
            prize_form: { prize_time: '', prize_title: '' },

            url: ["jjoo", "/api/home/main", "/api/course/main", "/api/academic/title", "/api/team/lists", "/api/corpus/main"],
            title: ["", "首页轮播图", "课程建设轮播图", "学术交流会议信息", "团队风采照片墙", "语料库轮播图"]
        }
    },
    props: ['part', 'id'],
    methods: {

        uploadProgress(event) {
            this.show_loading = true;
            let _self = this;
            console.log("jsdoiwasje");
            if (event.lengthComputable) {
                let val = (event.loaded / event.total * 100).toFixed(0);
                var progress = parseInt(val);
                if (progress == 100) {
                    this.show_loading = false;
                    this.picUploadPercent = 0;
                    return;
                }
                _self.picUploadPercent = progress;
                // console.log(_self.picUploadPercent);
            }

        },


        changeUrl() {
            // console.log(Base.baseURL + this.url[this.part]);
            return Base.baseURL + this.url[this.id];
        },
        curs(row) {
            if (row.column.label === "图片地址")
                return "cursor:pointer;"
        },
        openpic(url) {
            window.open(url);
        },
        GetMainSwiper() {

            this.$axios.request({
                method: 'GET',
                url: this.url[this.part],
            }).then((res) => {

                if (res.status == 200) {
                    if (this.part == 3)
                        this.MainSwiper = res.data.data;
                    else
                        this.MainSwiper = res.data
                }
            })
        },
        MainSwiperDel(index, row) {
            // console.log(row.pid);
            this.$confirm('是否确认删除继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.MainSwiper.splice(index, 1)

            

                if(this.part==1){
                    console.log(row.pid);
                    // console.log(this.part);
                    this.$axios.post("/api/home/delete", {  'pid': row.pid  }).then((res) => {
                        if (res.status == 200)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                    });
                }else if(this.part==2){
                    this.$axios.post("/api/course/delete", { 'pid': row.pid  }).then((res) => {
                        if (res.status == 200)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                    });
                }else if(this.part==3){
                    this.$axios.post("/api/academic/delete", { 'aid': row.aid  }).then((res) => {
                        if (res.status == 200)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                    });
                }else if(this.part==4){
                    this.$axios.post("/api/team/delete", {  'pid': row.pid }).then((res) => {
                        if (res.status == 200)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                    });
                } else if(this.part==5){
                    this.$axios.post("/api/corpus/delete/3", { 'pid': row.pid  }).then((res) => {
                        if (res.status == 200)
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                    });
                }               
                // if (this.part == 3)
                //     this.$axios.delete("/api/academic/title", { 'data': { 'aid': row.aid } }).then((res) => {
                //         if (res.status == 200)
                //             this.$message({
                //                 type: 'success',
                //                 message: '删除成功!'
                //             });
                //     });
                // else if (this.part == 4)
                //     this.$axios.delete("/api/team/list", { 'data': { 'pid': row.pid } }).then((res) => {
                //         if (res.status == 200)
                //             this.$message({
                //                 type: 'success',
                //                 message: '删除成功!'
                //             });
                //     });
                // else
                //     this.$axios.delete(this.url[this.part], { 'data': { 'pid': row.pid } }).then((res) => {
                //         if (res.status == 200)
                //             this.$message({
                //                 type: 'success',
                //                 message: '删除成功!'
                //             });
                //     });
                // this.$message({
                //     type: 'success',
                //     message: '删除成功!'
                // });
            }).catch(() => {
                // 点的是取消，就弹出取消删除的提示框
                this.$message({
                    type: 'warning',
                    message: '已取消删除'
                });
            });
        },

        //学术交流相关操作
        //获取详情
        AcademicDetail(aid) {
            const ppp = this.$router.resolve({
                path: "/text",
                query: {
                    part_id: 1,
                    academic_id: aid
                }
            })

            window.open(ppp.href, '_blank')
        },
        //添加会议
        AcademicAdd() {
            this.AcademicUploadDialog = true;
        },
        AcademicSubmit() {
            if (this.$refs.Academic_upload.uploadFiles.length &&
                this.Academic_title.length &&
                this.Academic_text.length) {
                this.$refs.Academic_upload.submit();
            } else {
                this.$message({
                    showClose: true,
                    message: "请检查填写内容",
                    type: "error",
                });
            }
        },
        AcademicUpload(e) {
            let form = new FormData();
            form.append("title", this.Academic_title);
            form.append("abstract", this.Academic_title);
            form.append("text", this.Academic_text);
            form.append("img", e.file);
            this.$axios.post("/api/academic/title", form)
                .then((res) => {
                    if (res.status == 200) {
                        this.AcademicUploadDialog = false;
                        this.$refs.Academic_upload.clearFiles();
                        this.Academic_title = '';
                        this.Academic_text = '';
                        this.GetMainSwiper();
                        this.$message({
                            showClose: true,
                            message: "上传成功",
                            type: "success",
                        });
                    }
                }).catch(() => {
                    this.$message({
                        showClose: true,
                        message: "上传失败",
                        type: "error",
                    });
                })
        },


        uploadsucc() {
            // console.log(this.url[this.part]);
            this.$message({
                showClose: true,
                message: "添加成功",
                type: "success",
            });
            this.GetMainSwiper();
        },
        PrizeAdd() {
            this.PrizeUploadDialog = true;
        },
        PrizeUpload(e) {
            // console.log(e.file.name);
            // if (/\//.test(e.file.name)) {
            //     this.$message({
            //         showClose: true,
            //         message: "文件名包含不合法字符",
            //         type: "error",
            //     });
            //     return;
            // }
            let form = new FormData();
            form.append("prize_time", this.prize_form.prize_time);
            form.append("text", this.prize_form.prize_title);
            form.append("img", e.file);
            this.$axios.post("/api/team/list", form)
                .then(() => {
                    this.PrizeUploadDialog = false;
                    this.$refs.prize_upload.clearFiles();
                    this.prize_time = '';
                    this.prize_title = '';
                    this.GetMainSwiper();
                    this.$message({
                        showClose: true,
                        message: "上传成功",
                        type: "success",
                    });
                }).catch(() => {
                    this.$message({
                        showClose: true,
                        message: "上传失败,请检查信息格式",
                        type: "error",
                    });
                })
        },
        //判断文件是否被选中
        PrizeSubmit() {
            if (this.$refs.prize_upload.uploadFiles.length) {
                this.$refs.prize_upload.submit();
            } else {
                this.$message({
                    showClose: true,
                    message: "请先上传文件",
                    type: "error",
                });
            }
        }
    },
    watch: {
        part: {
            immediate: true,
            handler() {

                if (this.part == this.id) {
                    // console.log(22222222);
                    // this.picurl = 'http://192.168.1.144:8100' + this.url[this.part];
                    // console.log(this.picurl);
                    this.GetMainSwiper();
                }
            }
        }
    }
}
</script>

<style scoped>
#main {
    margin-top: 1rem;
}

.title {
    left: 45%;
    position: absolute;
    text-align: center;
    font-size: 20px;
    font-weight: 800;
    /* margin-bottom: 1rem; */
}

.el-dialog {
    width: 759px;
    height: 400px;
}

/* .Prize_title {
    margin-top: 1rem;
} */

.Prize_text {
    margin-top: 1rem;
}

.el-upload-dragger {
    margin-left: 11rem;
}
</style>