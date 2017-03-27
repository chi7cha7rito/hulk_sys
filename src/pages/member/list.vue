<template>
    <section>
        <!--工具条-->
        <el-col :span="24"
                class="toolbar"
                style="padding-bottom: 0px;">
            <el-form :inline="true"
                     :model="memberFilters">
                <el-form-item label="手机号">
                    <el-input v-model="memberFilters.phoneNo"
                              placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="memberFilters.name"
                              placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="memberFilters.idCardNo"
                              placeholder="身份证号"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="memberFilters.gender"
                               placeholder="请选择性别"
                               clearable
                               style="width:90px">
                        <el-option label="男"
                                   value="1"></el-option>
                        <el-option label="女"
                                   value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="等级">
                    <el-select v-model="memberFilters.level"
                               placeholder="请选择会员等级"
                               clearable
                               style="width:90px">
                        <el-option v-for="item in memberLevel"
                                   :label="item.name"
                                   :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="memberFilters.status"
                               placeholder="请选择状态"
                               clearable
                               style="width:90px">
                        <el-option label="正常"
                                   value="1"></el-option>
                        <el-option label="冻结"
                                   value="2"></el-option>
                        <el-option label="删除"
                                   value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注册日期">
                    <el-col :span="10">
                        <el-date-picker v-model="memberFilters.startCreatedAt"
                                        type="date"
                                        placeholder="开始日期"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line"
                            :span="4">--</el-col>
                    <el-col :span="10">
                        <el-date-picker v-model="memberFilters.endCreatedAt"
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
        <el-table :data="memberList"
                  highlight-current-row
                  v-loading="memberListLoading"
                  style="width: 100%;">
            <el-table-column prop="name"
                             label="姓名">
            </el-table-column>
            <el-table-column prop="phoneNo"
                             label="手机号">
            </el-table-column>
            <el-table-column prop="idCardNo"
                             label="身份证号">
            </el-table-column>
            <el-table-column label="卡号">
                <template scope="scope">
                    <span>{{scope.row.member.cardNo}}</span>
                </template>
            </el-table-column>
            <el-table-column label="性别">
                <template scope="scope">
                    <span>{{scope.row.gender.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="会员等级">
                <template scope="scope">
                    <span>{{scope.row.member.memberLevel.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status"
                             label="状态"
                             :formatter="formatStatus">
            </el-table-column>
            <el-table-column prop="createdAt"
                             label="注册时间"
                             :formatter="formatCreatedAtDate">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">
                        编辑</el-button>
                    <el-button size="small"
                               @click="handleBP(scope.$index, scope.row)">
                        余额积分</el-button>
                </template>
            </el-table-column>
        </el-table>
    
        <!--工具条-->
        <el-col :span="24"
                class="toolbar">
            <el-pagination layout="prev, pager, next"
                           :page-size="10"
                           :total="memberTotal"
                           @current-change="handleCurrentChange"
                           style="float:right;">
            </el-pagination>
        </el-col>
    
        <!--编辑界面-->
        <el-dialog title="会员编辑"
                   v-model="memberEditFormVisible"
                   size='tiny'
                   :close-on-click-modal="true"
                   @close="closeDialog">
            <el-form :model="memberDetails"
                     label-width="100px"
                     :rules="editFormRules"
                     ref="editForm">
                <el-form-item label="ID"
                              prop="id">
                    <el-col :span="10">
                        <el-input v-model="memberDetails.id"
                                  auto-complete="off"
                                  :disabled="true"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="姓名"
                              prop="name">
                    <el-col :span="10">
                        <el-input v-model="memberDetails.name"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="手机号"
                              prop="phoneNo">
                    <el-col :span="10">
                        <el-input v-model="memberDetails.phoneNo"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证号"
                              prop="idCardNo">
                    <el-col :span="10">
                        <el-input v-model="memberDetails.idCardNo"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="卡号"
                              prop="cardNo">
                    <el-col :span="10">
                        <el-input v-model="memberDetails.cardNo"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="性别"
                              prop="status">
                    <el-select v-model="memberDetails.gender"
                               placeholder="请选性别">
                        <el-option label="男"
                                   value="1"></el-option>
                        <el-option label="女"
                                   value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态"
                              prop="status">
                    <el-select v-model="memberDetails.status"
                               placeholder="请选择状态">
                        <el-option label="正常"
                                   value="1"></el-option>
                        <el-option label="冻结"
                                   value="2"></el-option>
                        <el-option label="删除"
                                   value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click.native="closeDialog">取消</el-button>
                <el-button type="primary"
                           @click.native="editSubmit"
                           :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    
        <!--余额界面-->
        <el-dialog title="余额积分"
                   v-model="memberBpFormVisible"
                   size='tiny'
                   :close-on-click-modal="true"
                   @close="closeDialog">
            <el-form :model="memberBP"
                     label-width="100px"
                     :rules="editFormRules"
                     ref="editForm">
                <el-form-item label="余额"
                              prop="balance">
                    <el-col :span="10">
                        <el-input v-model="memberBP.balance"
                                  auto-complete="off"
                                  :disabled="true"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="积分"
                              prop="points">
                    <el-col :span="10">
                        <el-input v-model.number="memberBP.points"
                                  auto-complete="off"
                                  :disabled="true"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
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
            editFormRules: {
                name: [
                    { required: true, message: '请填写姓名', trigger: 'blur' }
                ],
                phoneNo: [
                    { required: true, message: '请填写手机号', trigger: 'blur' }
                ],
                idCardNo: [
                    { required: true, message: '请填写身份证号', trigger: 'blur' }
                ],
                cardNo: [
                    { required: true, message: '请填写卡号', trigger: 'blur' }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'blur' },
                ],
                status: [
                    { required: true, message: '请选择状态', trigger: 'blur' },
                ]
            },
            editLoading: false
        }
    },
    computed: {
        ...mapGetters([
            'memberList',
            'memberLevel',
            'memberFilters',
            'memberListLoading',
            'memberTotal',
            'memberEditFormVisible',
            'memberDetails',
            'memberBpFormVisible',
            'memberBP'
        ])
    },
    methods: {
        formatStatus: function (row, column) {
            let str = ''
            if (row.member.status == '1') str = '正常'
            if (row.member.status == '2') str = '冻结'
            if (row.member.status == '3') str = '删除'
            return str
        },
        formatCreatedAtDate: function (row, column) {
            return util.formatDate.utcToLocal(row.createdAt)
        },
        handleCurrentChange(val) {
            this.$store.commit(types.CHANGE_MEMBER_LIST_PAGE_NUM, val);
            this.getList();
        },
        getList() {
            this.$store.dispatch('getMemberList')
        },
        getMemberLevel() {
            if (this.memberLevel.length == 0) {
                this.$store.dispatch('getMemberLevel');
            }
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.$store.dispatch('getMemberDetails', {
                id: row.id
            })
        },
        //显示余额积分
        handleBP: function (index, row) {
            this.$store.dispatch('getMemberBP', {
                memberId: row.member.id
            })
        },
        editSubmit: function () {
            if(this.editLoading) return false
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.editLoading = true
                    this.$store.dispatch("editMember").then(res => {
                        this.editLoading = false
                        this.getList();
                    }, err => {
                        this.editLoading = false
                        this.$message.error(err.message);
                    }).catch(err => {
                        this.editLoading = false
                        this.$message.error(err.message);
                    })
                }
            });
        },
        closeDialog: function () {
            this.$refs.editForm.resetFields();
            this.$store.commit(types.MEMBER_LIST_EDIT_FORM_VISIBLE, false);
            this.$store.commit(types.MEMBER_LIST_BP_FORM_VISIBLE, false);
        }
    },
    mounted() {
        this.getMemberLevel();
        this.getList();
    }
}
</script>

<style scoped>
.line {
    text-align: center;
}
</style>