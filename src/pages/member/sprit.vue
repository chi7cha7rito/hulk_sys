<template>
    <section>
        <!--工具条-->
        <el-col :span="24"
                class="toolbar"
                style="padding-bottom: 0px;">
            <el-form :inline="true"
                     :model="spritFilters">
                <el-form-item label="查询日期">
                    <el-col :span="10">
                        <el-date-picker v-model="spritFilters.startDatetime"
                                        type="date"
                                        placeholder="开始日期"
                                        style="width: 100%;" format="yyyy-MM-dd"></el-date-picker>
                    </el-col>
                    <el-col class="line"
                            :span="4">--</el-col>
                    <el-col :span="10">
                        <el-date-picker v-model="spritFilters.endDatetime"
                                        type="date"
                                        placeholder="结束日期"
                                        style="width: 100%;" format="yyyy-MM-dd"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               v-on:click="getList">查询</el-button>
                    <el-button type="primary"><a :href="this.formatLink('spritResult')"
                           target="_blank">导出</a></el-button>
                    <el-button type="primary">
                        <a :href="this.formatLink('spritList')"
                           target="_blank">导出明细</a>
                    </el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="spritList"
                  highlight-current-row
                  v-loading="spritListLoading"
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
                             label="大师分">
            </el-table-column>
        </el-table>
    
        <!--工具条-->
        <el-col :span="24"
                class="toolbar">
            <el-pagination layout="prev, pager, next"
                           :page-size="10"
                           :total="spritTotal"
                           @current-change="handleCurrentChange"
                           style="float:right;">
            </el-pagination>
        </el-col>
    
    </section>
</template>

<script>
import { mapGetters } from "vuex";

import * as types from "../../vuex/types";

import util from "../../common/js/util";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "spritList",
      "spritFilters",
      "spritListLoading",
      "spritTotal",
      "domain"
    ])
  },
  methods: {
    handleCurrentChange(val) {
      this.$store.commit(types.CHANGE_SPRIT_LIST_PAGE_NUM, val);
      this.getList();
    },
    getList() {
      this.$store.dispatch("getSpritList");
    },
    formatLink(url){
        if(this.spritFilters.startDatetime&&this.spritFilters.endDatetime){
            return `${this.domain}/report/${url}?startDatetime=${this.spritFilters.startDatetime}&endDatetime=${this.spritFilters.endDatetime}`
        }

        return 'javascript:void(0)'
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
a:hover,
a:visited,
a:link,
a:active {
  text-decoration: none;
  color: #fff;
}
</style>