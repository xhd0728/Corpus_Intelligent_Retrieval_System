<template>
    <div id="main">
        <div class="title">{{ part }}</div>
        <div style="margin:auto;width:55rem">
            <el-table :data="MainSwiper" style="width: 100%" :cell-style="curs">
                <el-table-column type="index" label="序号" width="100" align="center">
                </el-table-column>
                <el-table-column prop="pictureurl" label="会议标题" width="450" align="center">
                    <template slot-scope="scope">
                        <div @click="openpic(scope.row.pictureurl)">{{ scope.row.pictureurl }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <div>
                            <el-button type="danger" @click="MainSwiperDel(scope.$index, scope.row)">删除</el-button>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot="header">
                        <!-- <el-button type="success" @click="MainSwiperadd">添加</el-button> -->
                        <el-upload class="upload-demo" :action="geturl()" :show-file-list=false
                            :on-success="() => uploadsucc()">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </template>
                </el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script>
import Base from '@/globle/globleApi.js'
export default {
    created() {
        this.GetMainSwiper();
    },
    data() {
        return {
            MainSwiper: [],
            showAddDialog: false,
            url: ["jjoo", "/api/home/main", "/api/course/main", "", "/api/team/list"]
        }
    },
    props: ['part'],
    methods: {
        geturl() {
            return Base.baseURL;
        },
        curs(row) {
            if (row.column.label === "图片地址")
                return "cursor:pointer;"
        },
        openpic(url) {
            window.open(url);
        },
        GetMainSwiper() {
            // console.log(this.url[this.part]);
            this.$axios.request({
                method: 'GET',
                url: this.url[this.part],
            }).then((res) => {
                // console.log(res);
                if (res.status == 200) {
                    this.MainSwiper = res.data
                }
            })
        },
        MainSwiperDel(index, row) {
            console.log(row.aid);
            this.$confirm('是否确认删除继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.MainSwiper.splice(index, 1)
                if(this.part==1){
                    this.$axios.post('/api/home/delete', {  'aid': row.aid });
                }else if(this.part==2){
                    this.$axios.post('/api/course/delete', { 'aid': row.aid });   
                }else if(this.part==4){
                    this.$axios.post('/api/team/delete', { 'aid': row.aid  });
                }
                // this.$axios.delete(this.url[this.part], { 'data': { 'pid': row.pid } });
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
        uploadsucc() {
            this.$message({
                showClose: true,
                message: "添加成功",
                type: "success",
            });
            this.GetMainSwiper();
        }
    },
    watch: {
        part: {
            immediate: true,
            handler() {
                this.GetMainSwiper();
            }
        }
    }
}
</script>

<style scoped>
.title {
    text-align: center;
    font-size: large;
}

.el-dialog {
    width: 759px;
    height: 386px;
}
</style>