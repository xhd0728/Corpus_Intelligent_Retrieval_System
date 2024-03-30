<template>
    <div class="frequency">
        <el-table :data="currentPageData" border style="width: 100%;text-align: center;" height="40rem" show-summary
            :header-row-style="{ background: 'rgba(231, 230, 230, 1)' }" v-loading="loading1"
            :summary-method="getSummaries"
            :header-cell-style="{ background: 'rgba(190, 190, 190, 1)', color: '#606266', fontSize: '1rem' }"
            :default-sort = "{prop: 'num', order: 'descending'}">
            <!-- 自定义空数据模板 -->
            <template v-slot:empty v-if="!longtext">
                请点击"Search"界面检索结果条显示"Frequency"
            </template>
            <el-table-column type="index" width="100" align="center">
            </el-table-column>
            <el-table-column prop="name" width="800" align="center">
                <template slot="header">
                    All Forms(Samples): {{ this.currentPageData.length }}
                </template>


                <template slot-scope="scope">
                    <div style="cursor:pointer" @click="rowclick(scope.row)">
                        {{ scope.row.s_name }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column  prop="num" label="Frequency" align="center">
            </el-table-column>
        </el-table>


    </div>
</template>

<script>
export default {
    props: ["longtext", "resindexnum", "indexnum", "currentPageData", "bothnum", "loading1"],
    // "longtext":要高亮的词
    // "total"：总共的索引数
    // "indexnum"：索引条数，要展示在表格第三列的表头,每一页显示条数
    // "currentPageData"：表格的数据
    // "bothnum":被检索词两边的字符数
    data() {
        return {

            // title: "五百年前孙悟空大闹天宫",
            // searchWord: "孙悟空",
            jump: {
                searchname:'',//查询的关键词
                name: '',//标红的关键词
                num: ''
            }

        }
    },

    
    methods: {

        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = 'Total';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev + curr;
                        } else {
                            return prev;
                        }
                    }, 0);

                } else {
                    // sums[index] = 'N/A';
                }
            });

            return sums;
        },
        rowclick(row) {
            this.jump.searchname=row.name//查询的关键词
            this.jump.name = row.s_name//标红的关键词
            this.jump.num = row.num
            // console.log("s_name"+row.s_name)
            // console.log("jump:" + this.jump.name)
            this.$emit('jump', this.jump)


        }
    },
}
</script>

<style>
.el-table {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    overflow: visible !important;
}

.el-table tr {
    background-color: rgba(231, 230, 230, 1);
    padding: 0.1rem 0.1rem;
}

.el-table thead {
    background-color: rgba(231, 230, 230, 1);
}

/**
改变边框颜色
 */
.el-table--border,
.el-table--group {
    border: 1px solid #ffffff !important;
}

/**
改变表格内行线颜色
 */
.el-table td,
.el-table th.is-leaf {
    border: 1.5px solid #ffffff !important;
}

.pagination {
    margin-top: 0.3rem;
    display: flex;
    background-color: rgba(218, 227, 243, 1);
    height: 2.7rem;
}

.firstpage {
    cursor: pointer;
    background-color: #ffffff;
    border: 0.1rem solid black;
    width: 2rem;
    height: 1.8rem;
    text-align: center;
    line-height: 1.5rem;
    margin-top: 0.5rem;
    margin-left: 0.8rem;
    font-weight: 800;
}

.buttondark {
    background-color: rgba(47, 85, 151, 1);
    color: white;
    font-weight: 700;
    font-size: 1.2rem;
    text-align: center;
    margin-top: 0.5rem;
    line-height: 2rem;
    height: 2rem;

}

.pagenum {
    width: 1.8rem;
    margin-top: 0.5rem;
    margin-left: 0.8rem;
    font-size: 1.8rem;
    height: 1.8rem;
    text-align: center;
    border: 0.1rem solid black;
}
</style>
