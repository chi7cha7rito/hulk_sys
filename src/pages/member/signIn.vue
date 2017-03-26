<template>
    <section>
        <!--工具条-->
        <el-col :span="24"
                class="toolbar"
                style="padding-bottom: 0px;">
            <el-form :inline="true"
                     :model="signInFilters">
                <el-form-item label="查询日期">
                    <el-col :span="10">
                        <el-date-picker v-model="signInFilters.startDatetime"
                                        type="date"
                                        placeholder="开始日期"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line"
                            :span="4">--</el-col>
                    <el-col :span="10">
                        <el-date-picker v-model="signInFilters.endDatetime"
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
        <el-table :data="signInList"
                  highlight-current-row
                  v-loading="signInListLoading"
                  style="width: 100%;">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="name"
                             label="姓名">
            </el-table-column>
            <el-table-column prop="phoneNo"
                             label="手机号">
            </el-table-column>
            <el-table-column prop="total"
                             label="签到次数">
            </el-table-column>
        </el-table>
    
        <!--工具条-->
        <el-col :span="24"
                class="toolbar">
            <el-pagination layout="prev, pager, next"
                           :page-size="10"
                           :total="signInTotal"
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
            'signInList',
            'signInFilters',
            'signInListLoading',
            'signInTotal'
        ])
    },
    methods: {
        handleCurrentChange(val) {
            this.$store.commit(types.CHANGE_SIGNIN_LIST_PAGE_NUM, val);
            this.getList();
        },
        getList() {
            this.$store.dispatch('getSignInList')
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