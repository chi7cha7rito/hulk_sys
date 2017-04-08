<template>
    <section>
        <!--工具条-->
        <el-col :span="24"
                class="toolbar"
                style="padding-bottom: 0px;">
            <el-form :inline="true"
                     :model="couponFilters">
                <el-form-item label="手机号">
                    <el-input v-model="couponFilters.phoneNo"
                              placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="couponFilters.type"
                               placeholder="请选择类型"
                               clearable
                               style="width:90px">
                        <el-option label="门票"
                                   value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源">
                    <el-select v-model="couponFilters.source"
                               placeholder="请选择来源"
                               clearable
                               style="width:90px">
                        <el-option label="签到"
                                   value="1"></el-option>
                        <el-option label="豪气排名"
                                   value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="couponFilters.status"
                               placeholder="请选择状态"
                               clearable
                               style="width:90px">
                        <el-option label="未使用"
                                   value="1"></el-option>
                        <el-option label="已使用"
                                   value="2"></el-option>
                        <el-option label="已作废"
                                   value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="获得日期">
                    <el-col :span="10">
                        <el-date-picker v-model="couponFilters.startCreatedAt"
                                        type="date"
                                        placeholder="开始日期"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line"
                            :span="4">--</el-col>
                    <el-col :span="10">
                        <el-date-picker v-model="couponFilters.endCreatedAt"
                                        type="date"
                                        placeholder="结束日期"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               v-on:click="getList">查询</el-button>
                    <el-form-item>
                        <el-button type="primary"
                                   @click="handleAdd">新增</el-button>
                    </el-form-item>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="couponList"
                  highlight-current-row
                  v-loading="couponListLoading"
                  style="width: 100%;">
            <el-table-column label="姓名">
                <template scope="scope">
                    <span>{{scope.row.member.user.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="手机">
                <template scope="scope">
                    <span>{{scope.row.member.user.phoneNo}}</span>
                </template>
            </el-table-column>
            <el-table-column label="类型">
                <template scope="scope">
                    <span>{{scope.row.type.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="子类型">
                <template scope="scope">
                    <span>{{scope.row.subType.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="来源">
                <template scope="scope">
                    <span>{{scope.row.source.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="remark"
                             label="备注">
            </el-table-column>
            <el-table-column prop="status"
                             label="状态"
                             :formatter="formatStatus">
            </el-table-column>
            <el-table-column prop="createdAt"
                             label="创建时间"
                             :formatter="formatCreatedAtDate">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="danger"
                               size="small"
                               v-if="scope.row.status == '1'"
                               @click="handleWithDraw(scope.row.id)">
                        作废</el-button>
                </template>
            </el-table-column>
        </el-table>
    
        <!--工具条-->
        <el-col :span="24"
                class="toolbar">
            <el-pagination layout="prev, pager, next"
                           :page-size="10"
                           :total="couponTotal"
                           @current-change="handleCurrentChange"
                           style="float:right;">
            </el-pagination>
        </el-col>
    
        <!--新增界面-->
        <el-dialog title="优惠券新增"
                   v-model="couponAddFormVisible"
                   :close-on-click-modal="true"
                   @close="closeDialog">
            <el-form :model="couponAddForm"
                     label-width="100px"
                     :rules="addFormRules"
                     ref="couponAddForm">
                <el-form-item label="手机号"
                              prop="phoneNo">
                    <el-select v-model="couponAddForm.phoneNo"
                               filterable
                               remote
                               placeholder="请输入手机号"
                               :remote-method="getMemberList"
                               :loading="selectLoading">
                        <el-option v-for="item in availableMembers"
                                   :key="item.id"
                                   :label="item.phoneNoName"
                                   :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型"
                              prop="type">
                    <el-select v-model="couponAddForm.type"
                               placeholder="请选择类型">
                        <el-option label="门票"
                                   value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="子类型"
                              prop="subType">
                    <el-select v-model="couponAddForm.subType"
                               placeholder="请选择子类型">
                        <el-option label="平日赛"
                                   value="1"></el-option>
                        <el-option label="周赛"
                                   value="2"></el-option>
                        <el-option label="月度会员杯"
                                   value="3"></el-option>
                        <el-option label="年度会员杯"
                                   value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源"
                              prop="source">
                    <el-select v-model="couponAddForm.source"
                               placeholder="请选择来源">
                        <el-option label="签到"
                                   value="1"></el-option>
                        <el-option label="豪气排名"
                                   value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注"
                              prop="remark">
                    <el-col :span="10">
                        <el-input v-model="couponAddForm.remark"
                                  type="textarea"
                                  :rows="2"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click.native="closeDialog">取消</el-button>
                <el-button type="primary"
                           @click.native="addSubmit"
                           :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    
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
        return {
            addFormRules: {
                phoneNo: [
                    { required: true, message: '请填写手机号', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
                subType: [
                    { required: true, message: '请选择子类型', trigger: 'change' }
                ],
                source: [
                    { required: true, message: '请选择来源', trigger: 'change' },
                ]
            },
            addLoading: false,
            selectLoading: false
        }
    },
    computed: {
        ...mapGetters([
            'couponList',
            'couponFilters',
            'couponListLoading',
            'couponTotal',
            'couponAddFormVisible',
            'couponAddForm',
            'availableMembers'
        ])
    },
    methods: {
        formatStatus: function (row, column) {
            let str = ''
            if (row.status == '1') str = '未使用'
            if (row.status == '2') str = '已使用'
            if (row.status == '3') str = '已作废'
            return str
        },
        formatCreatedAtDate: function (row, column) {
            return util.formatDate.utcToLocal(row.createdAt)
        },
        handleCurrentChange(val) {
            this.$store.commit(types.CHANGE_COUPON_LIST_PAGE_NUM, val);
            this.getList();
        },
        getList() {
            this.$store.dispatch('getCouponList')
        },
        //显示新增界面
        handleAdd: function () {
            this.$store.commit(types.COUPON_LIST_ADD_FORM_VISIBLE, true);
        },
        handleWithDraw: function (id) {
            this.$confirm('确认要作废该优惠券吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('widthDrawCoupon', id).then(() => {
                    this.getList();
                }, err => {
                    this.$message.error(err.message);
                })
            })
        },
        getMemberList: function (phoneNo) {
            if (phoneNo != '') {
                this.selectLoading = true;
                this.$store.dispatch('getAllMembers', phoneNo).then(() => {
                    this.selectLoading = false;
                }, err => {
                    this.selectLoading = false;
                })
            }
        },
        addSubmit: function () {
            if (this.addLoading) return false
            this.$refs.couponAddForm.validate((valid) => {
                if (valid) {
                    this.addLoading = true
                    this.$store.dispatch("addCoupon").then(res => {
                        this.addLoading = false
                        this.getList();
                    }, err => {
                        this.addLoading = false
                        this.$message.error(err.message);
                    }).catch(err => {
                        this.addLoading = false
                        this.$message.error(err.message);
                    })
                }
            });
        },
        closeDialog: function () {
            this.$refs.couponAddForm.resetFields();
            this.$store.commit(types.COUPON_LIST_ADD_FORM_VISIBLE, false);
        }
    },
    mounted() {
        this.getList();
    }
}
</script>

<style scoped>
.line {
    text-align: center;
}
</style>