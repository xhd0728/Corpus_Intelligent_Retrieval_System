<template>
    <div class="big">
        <div class="main">
            <div id="title">
                <span style="position:absolute;left:43%">文章展示列表</span>
                <div id="select">
                    <el-select v-model="sel_value" placeholder="请选择文章类别" @change="getdata()" style="width:41%">
                        <el-option v-for="item in show_tablecategory" :key="item.cid" :label="item.name" :value="item.cid">
                        </el-option>
                    </el-select>
                    &nbsp;
                    <el-button type="success" @click="admin_category">文章类别管理</el-button>
                    <el-button type="success" @click="change_add_dialog">添加文章</el-button>
                </div>
            </div>

            <div id="table">
                <el-table :data="tabledata" border style="width: 100%">
                    <!-- <el-table-column type="index" label="序号" width="50" align="center">
                    </el-table-column> -->
                    <el-table-column prop="fid" label="文章编号" width='80' align="center">
                    </el-table-column>
                    <el-table-column prop="create_time" label="创建时间" width="180" align="center">
                    </el-table-column>
                    <el-table-column prop="name" label="文件名" width="275" align="center">
                    </el-table-column>
                    <el-table-column prop="sub_name" label="提交文件名" width="406" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <div>
                                <span style="cursor: pointer;color: red;"
                                    @click="ArticalDel(scope.$index, scope.row)">删除</span>
                                <!-- <el-button type="danger" @click="MainSwiperDel(scope.$index, scope.row)">删除</el-button> -->
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div id="pagination">

                <el-pagination id="pg" @current-change="handleCurrentChange" :current-page.sync="currentPage"
                    layout="total, prev, pager, next, jumper" :total="total" :page-size="50">
                </el-pagination>
                <span style="font-size:smaller;color:#606266;position: absolute;left: 23%;top:8px">50条/页</span>

            </div>
        </div>
        <el-dialog title="添加文章" :visible.sync="show_adddialog">
            <el-form ref="form" :model="add_form" label-width="80px" :rules="add_rules">
                <el-form-item label="提交名称" prop="sub_name">
                    <el-input v-model="add_form.sub_name" placeholder="格式可参照：船舶与海洋结构物设计制造学术,J01-Ocean Engineering">
                    </el-input>
                </el-form-item>
                <el-form-item label="学科领域" prop="category">
                    <el-select v-model="add_form.category" placeholder="请选择学科领域" style="width:400px;margin-left:-236px">
                        <!-- <el-option label="船舶与海洋结构物设计制造学术" value="1"></el-option>
                        <el-option label="核学科学术" value="2"></el-option> -->
                        <!-- 遍历目录列表， -->
                        <el-option v-for="item in tablecategory" :key="item.value" :label="item.name" :value="item.cid">

                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div style="width:360px;height:180px;margin:auto">
                <el-upload drag ref="artical_add" :http-request="ArticalUpload" action="#" :auto-upload="false"
                    :show-file-list="true" :limit="1" class="Prize_text" accept=".txt">
                    <i class="el-icon-upload"></i>
                    <div>
                        将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
            </div>
            <div style="margin:auto;margin-top: 4.5rem;">
                <el-button type="success" @click="ArticalSubmit()">上传文章</el-button>
            </div>
        </el-dialog>

        <el-dialog title="管理文章类别" :visible.sync="show_adimin">
            <el-table :data="tablecategory" border style="width: 100%">
                <el-table-column prop="name" label="文章类别名(中文)" width="200" align="center">
                </el-table-column>
                <el-table-column prop="name_en" label="文章类别名(英文)" width="300" align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <div>
                            <span style="cursor: pointer;color: red;"
                                @click="CategoryDel(scope.$index, scope.row)">删除</span>
                            <!-- <el-button type="danger" @click="MainSwiperDel(scope.$index, scope.row)">删除</el-button> -->
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div style="width:400px;margin: auto;margin-top:10px;margin-bottom: 10px;">
                <el-input placeholder="请输入要添加的中文名" v-model="category_ch"></el-input>
                <el-input placeholder="请输入要添加的英文名" v-model="category_en"></el-input>
            </div>
            <el-button type="success" @click="add_category">添加文章类别</el-button>
        </el-dialog>
    </div>
</template>

<script>
export default {
    mounted() {
        this.getdata();
        this.getcategory();
    },
    data() {
        return {
            tabledata: [],
            show_tablecategory: [],
            categoryy:[],//语料库添加文章时选择的文章类别，不包含全部
            tablecategory: [],
            total: 0,
            currentPage: 1,//当前页数,默认是1
            category_ch: '',
            category_en: '',

            sel_value: 0,
            show_adddialog: false,
            show_adimin: false,
            add_form: {
                sub_name: '',
                category: '',
            },
            add_rules: {
                sub_name: [{ required: true, message: '请输入提交名称', trigger: 'blur' }],
                category: [{ required: true, message: '请选择学科领域', trigger: 'change' }]
            }
        }
    },
    methods: {
        admin_category() {
            this.show_adimin = true;
        },
        getcategory() {
            this.$axios.request({
                method: 'GET',
                url: 'api/corpus/category'
            }).then((res) => {
                // console.log(res.data.a);
                this.tablecategory = res.data.a;
                console.log(this.tablecategory);
                this.show_tablecategory = res.data.a.concat([]);
                this.show_tablecategory.unshift({
                    cid: 0,
                    name: "全部"
                });
                // console.log(this.show_tablecategory);

            })
        },
        CategoryDel(index, row) {
            this.$confirm('是否确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post("/api/corpus/delete/2", {  'cid': row.cid }).then(()=>{
                    this.getcategory();
                    this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                })
                
            }).catch(() => {
                // 点的是取消，就弹出取消删除的提示框
                this.$message({
                    type: 'warning',
                    message: '已取消删除'
                });
            });
        },
        add_category() {
            if (this.category_ch == '' || this.category_en == '') {
                this.$message({
                    type: 'error',
                    message: '请填写完整名字'
                })
            } else {
                this.$axios.request({
                    method: 'POST',
                    url: 'api/corpus/category',
                    data: {
                        name: this.category_ch,
                        name_en: this.category_en
                    }
                }).then((res) => {
                    this.$message({
                        type: 'success',
                        message: '上传成功'
                    })
                    this.getcategory();
                    this.category_ch = '';
                    this.category_en = '';
                })
            }
        },
        handleCurrentChange(val) {
            //向后端发请求

            // alert(this.currentPage);
            this.$axios.request({
                method: 'GET',
                url: 'api/corpus/file',
                params: {
                    page: val,
                    per_page: 50,
                    category: this.sel_value,
                }
            }).then((res) => {
                if (res.status == 200) {
                    this.tabledata = res.data.data;
                    this.total = res.data.total;
                }
            })
        },
        getdata() {
            this.$axios.request({
                method: 'GET',
                url: 'api/corpus/file',
                params: {
                    category: this.sel_value,
                    page: this.currentPage,
                    per_page: 50
                }
            }).then((res) => {
                if (res.status == 200) {
                    this.tabledata = res.data.data;
                    this.total = res.data.total;
                }
            })
        },
        // indexchange() {
        //     this.$axios.request({
        //         method: 'GET',
        //         url: 'api/corpus/file',
        //         params: {
        //             category: this.sel_value
        //         }
        //     }).then((res) => {
        //         if (res.status == 200) {
        //             this.tabledata = res.data.data;
        //             this.total = res.data.total;
        //         }
        //     })
        // },
        ArticalDel(index, row) {
            this.$confirm('是否确认删除继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post("/api/corpus/delete/1", { 'fid': row.fid });
                this.getdata();
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
        change_add_dialog() {
            this.show_adddialog = true;
        },
        ArticalUpload(e) {
            if (this.beforeUpload(e)) {
                let form = new FormData();
                form.append("sub_name", this.add_form.sub_name);
                form.append("category", this.add_form.category);
                form.append("file", e.file);
                this.$axios.post("api/corpus/files", form)
                    .then(() => {
                        this.show_adddialog = false;
                        this.$refs.artical_add.clearFiles();
                        this.add_form.sub_name = '';
                        this.add_form.category = '';
                        this.getdata();
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
            }
        },
        ArticalSubmit() {
            if (this.$refs.artical_add.uploadFiles.length && this.add_form.category && this.add_form.sub_name) {
                this.$refs.artical_add.submit();
            } else {
                this.$message({
                    showClose: true,
                    message: "请填写完整信息",
                    type: "error",
                });
            }
        },



        beforeUpload(e) {
            // console.log(e.file.name);
            const fileSuffix = e.file.name.substring(e.file.name.lastIndexOf(".") + 1);
            if (fileSuffix != 'txt') {
                this.$message.error('只能上传txt类型的文件');
                this.$refs.artical_add.clearFiles();
                this.add_form.sub_name = '';
                this.add_form.category = '';
                return false;
            } else
                return true;
        }
    },
}
</script>

<style scoped>
.big {
    width: 100%;
    margin: auto;
    text-align: center;
}

#title {
    height: 3rem;
    margin-top: 1rem;
    font-size: 20px;
    font-weight: 800;
    position: relative;
    line-height: 3rem;
}

#select {
    width:50%;
    position: absolute;
    left: 52.9%;
}

.main {
    width: 80%;
    margin: auto;
}

#table {
    margin-top: 1rem;
}

#pagination {
    margin-top: 1rem;
    width: 100%;
    height: 3rem;
    /* font-size: 20px; */
    position: relative;
}

#pg {
    position: absolute;
    left: 30%;
}
</style>