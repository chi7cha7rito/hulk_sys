<template>
    <section>
        <!--工具条-->
        <el-col :span="24"
                class="toolbar"
                style="padding-bottom: 0px;">
            <el-form :inline="true"
                     :model="balanceFilters">
                <el-form-item label="手机号">
                    <el-input v-model="balanceFilters.phoneNo"
                              placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="balanceFilters.type"
                               placeholder="请选择状态"
                               clearable
                               style="width:90px">
                        <el-option label="充值"
                                   value="1"></el-option>
                        <el-option label="消费"
                                   value="2"></el-option>
                        <el-option label="正调整"
                                   value="3"></el-option>
                        <el-option label="提现"
                                   value="4"></el-option>
                        <el-option label="负调整"
                                   value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="创建日期">
                    <el-col :span="10">
                        <el-date-picker v-model="balanceFilters.startCreatedAt"
                                        type="date"
                                        placeholder="开始日期"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line"
                            :span="4">--</el-col>
                    <el-col :span="10">
                        <el-date-picker v-model="balanceFilters.endCreatedAt"
                                        type="date"
                                        placeholder="结束日期"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               v-on:click="getList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="balanceList"
                  highlight-current-row
                  v-loading="balanceListLoading"
                  style="width: 100%;">
            <el-table-column label="姓名">
                <template scope="scope">
                    <span>{{scope.row.member.user.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="手机号">
                <template scope="scope">
                    <span>{{scope.row.member.user.phoneNo}}</span>
                </template>
            </el-table-column>
            <el-table-column label="类型">
                <template scope="scope">
                    <span>{{scope.row.type.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="amount"
                             label="金额">
            </el-table-column>
            <el-table-column label="来源">
                <template scope="scope">
                    <span>{{scope.row.source.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="来源编号">
                <template scope="scope">
                    <span>{{scope.row.sourceNo}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="remark"
                             label="备注">
            </el-table-column>
            <el-table-column prop="createdAt"
                             label="创建时间"
                             :formatter="formatCreatedAtDate">
            </el-table-column>
        </el-table>
    
        <!--工具条-->
        <el-col :span="24"
                class="toolbar">
            <el-pagination layout="prev, pager, next"
                           :page-size="10"
                           :total="balanceTotal"
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
            'balanceList',
            'balanceFilters',
            'balanceListLoading',
            'balanceTotal'
        ])
    },
    methods: {
        formatCreatedAtDate: function (row, column) {
            return util.formatDate.utcToLocal(row.createdAt)
        },
        handleCurrentChange(val) {
            this.$store.commit(types.CHANGE_BALANCE_LIST_PAGE_NUM, val);
            this.getList();
        },
        getList() {
            this.$store.dispatch('getBalanceList')
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