<template>
    <div class="main">
        <div class="title" v-if="this.part == 2">课程建设---最近消息</div>
        <div class="title" v-if="this.part == 5">语料库---最近消息</div>
        <div style="margin:auto;width:62rem;margin-top: 1rem;">
            <el-table :data="LatestMassage" style="width: 100%" border>
                <el-table-column type="index" label="序号" width="100" align="center">
                </el-table-column>


                <el-table-column label="标题" width="650" align="center">
                    <template slot-scope="scope">
                        <div style="cursor:pointer" @click="GotoText(scope.$index, scope.row)">{{ scope.row.title }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">
                        <div @click="LatestMessageDel(scope.$index, scope.row)" style="color:red;cursor: pointer;">
                            删除
                            <!-- <el-button type="danger" @click="LatestMessageDel(scope.$index, scope.row)">删除</el-button> -->
                        </div>
                    </template>
                </el-table-column>

                <el-table-column width="141" key="wfwfwf" align="center">
                    <template slot="header">
                        <el-button type="success" @click="LatestMessageAdd()">上传消息</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <el-dialog title="上传最近消息" :visible.sync="UploadDialog">
                <div class="">
                    <div>
                        <!-- <el-input placeholder="例如：2022年 7月5日，张宇新参加第十五届语言与语言学国际年会" v-model="message_title">
                            <template slot="prepend">新闻标题</template>
                        </el-input>

                   

                        
                        <el-input type="textarea" placeholder="请输入会议内容" v-model="Academic_text"
                            :autosize="{ minRows: 2, maxRows: 10000 }" style="margin-top:0.5rem">
                        </el-input> -->

                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="新闻标题">
                                <el-input v-model="form.title"></el-input>
                            </el-form-item>

                            <el-form-item label="发布时间">
                                <el-col>
                                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期"
                                        v-model="form.create_time" style="width: 100%;"></el-date-picker>
                                </el-col>
                            </el-form-item>

                            <el-form-item label="新闻内容">
                                <el-input type="textarea" v-model="form.text" :autosize="{ minRows: 2, maxRows: 10000 }"
                                    placeholder="请输入新闻内容"></el-input>
                            </el-form-item>

                        </el-form>
                        <el-button type="success" @click="MessageSubmit()"
                            style="margin-left:19.2rem;margin-top: 1rem;">点击上传</el-button>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
// import Base from '@/globle/globleApi.js'
export default {

    created() {
        this.GetZjxx();
    },
    props: ['part', 'id'],
    data() {
        return {
            LatestMassage: [],
            UploadDialog: false,
            form: {
                title: '',
                create_time: '',
                text: '',
                category: -1
            }
            // url: ['', '/api/message/title', '', '', '5']
        }
    },
    methods: {
        GotoText(index, row) {
            const ppp = this.$router.resolve({
                path: "/news",
                query: {
                    part_id: this.id - 1,
                    news_id: row.aid
                }
            })
            window.open(ppp.href, '_blank')
        },
        GetZjxx() {
            this.$axios.request({
                method: 'GET',
                url: '/api/message/title',
                params: {
                    category: this.part
                }
            }).then((res) => {
                if (res.status == 200) {
                    this.LatestMassage = res.data;
                }
            })
        },

        LatestMessageDel(index, row) {
            // console.log(row.pid);
            this.$confirm('是否确认删除继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.LatestMassage.splice(index, 1)
                this.$axios.post('/api/message/delete', { 'aid': row.aid  });
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                // 点的是取消，就弹出取消删除的提示框
                this.$message({
                    type: 'warning',
                    message: '已取消删除'
                });
            });
        },
        LatestMessageAdd() {
            this.UploadDialog = true;
        },
        Upload() {
            // this.form.create_time
            this.form.category = this.part;
            // console.log(this.form.category);
            this.$axios.post(
                '/api/message/title', this.form
            ).then(() => {
                this.UploadDialog = false;
                this.form.text = '';
                this.form.create_time = '';
                this.form.title = '';
                this.GetZjxx();//重新获取数据
                this.$message({
                    showClose: true,
                    message: "上传成功",
                    type: "success",
                });
            }).catch(() => {
                this.$message({
                    showClose: true,
                    message: "上传失败",
                    type: "error",
                });
            })
        },
        MessageSubmit() {
            if (this.form.text.length &&

                this.form.title.length) {
                this.Upload();
            } else {
                this.$message({
                    showClose: true,
                    message: "请检查填写内容",
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
                    // console.log(this.id);
                    this.GetZjxx();
                }
            }
        }

    }
}
</script>

<style scoped>
.main {
    margin-top: 3rem;
}

.el-dialog {
    width: 759px;
    height: 400px;

}

.title {
    text-align: center;
    font-size: 20px;
    font-weight: 800;
}
</style>