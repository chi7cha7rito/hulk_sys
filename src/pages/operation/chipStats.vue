<template>
    <section>
        <!--工具条-->
        <el-col :span="24"
                class="toolbar"
                style="padding-bottom: 0px;">
            <el-form :inline="true"
                     :model="chipStatsFilters">
                <el-form-item label="名称">
                    <el-input v-model="chipStatsFilters.matchName"
                              placeholder="赛事名称"></el-input>
                </el-form-item>
                <el-form-item label="比赛日期">
                    <el-col :span="10">
                        <el-date-picker v-model="chipStatsFilters.startOpening"
                                        type="date"
                                        placeholder="开始日期"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line"
                            :span="4">--</el-col>
                    <el-col :span="10">
                        <el-date-picker v-model="chipStatsFilters.endOpening"
                                        type="date"
                                        placeholder="结束日期"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               v-on:click="getList">查询</el-button>
                    <el-button type="primary"><a :href="`${domain}/report/chips?matchName=${chipStatsFilters.matchName}&startOpening=${chipStatsFilters.startOpening}&endOpening=${chipStatsFilters.endOpening}`"
                           target="_blank">导出明细</a></el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="chipStatsList"
                  highlight-current-row
                  v-loading="chipStatsListLoading"
                  style="width: 100%;">
            <el-table-column prop="name"
                             label="赛事名称">
            </el-table-column>
            <el-table-column prop="openingDatetime"
                             label="比赛时间"
                             :formatter="formatOpening">
            </el-table-column>
            <el-table-column prop="perHand"
                             label="每手价格">
            </el-table-column>
            <el-table-column prop="totalQty"
                             label="合计手数">
            </el-table-column>
            <el-table-column prop="totalAmount"
                             label="合计金额">
            </el-table-column>
        </el-table>
    
        <!--工具条-->
        <el-col :span="24"
                class="toolbar">
            <el-pagination layout="prev, pager, next"
                           :page-size="10"
                           :total="chipStatsTotal"
                           @current-change="handleCurrentChange"
                           style="float:right;">
            </el-pagination>
        </el-col>
    
    </section>
</template>

<script>
import {
    mapGetters
} from 'vuex'

import * as types from '../../vuex/types'

import util from '../../common/js/util'

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters([
            'chipStatsList',
            'chipStatsFilters',
            'chipStatsListLoading',
            'chipStatsTotal',
            'domain'
        ])
    },
    methods: {
        formatOpening: function (row, column) {
            return util.formatDate.utcToLocal(row.openingDatetime)
        },
        handleCurrentChange(val) {
            this.$store.commit(types.CHANGE_SIGNIN_LIST_PAGE_NUM, val);
            this.getList();
        },
        getList() {
            this.$store.dispatch('getChipStatsList')
        }
    },
    mounted() {
        this.getList()
    }
}
</script>

<style scoped>
.line {
    text-align: center;
}
</style>