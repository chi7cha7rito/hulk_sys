<template>
    <section>
        <!--工具条-->
        <el-col :span="24"
                class="toolbar"
                style="padding-bottom: 0px;">
            <el-form :inline="true"
                     :model="memberLevelFilters">
                <el-form-item>
                    <el-button type="primary"
                               @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="memberLevelList"
                  v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column prop="name"
                             label="名称">
            </el-table-column>
            <el-table-column prop="threshold"
                             label="单次充值升级">
            </el-table-column>
            <el-table-column prop="apply"
                             label="参赛获豪气">
            </el-table-column>
            <el-table-column prop="buyChip"
                             label="重入获豪气">
            </el-table-column>
            <el-table-column prop="consume"
                             label="消费获豪气(%)">
            </el-table-column>
            <el-table-column prop="weeklyTicket"
                             label="签到获周赛票">
            </el-table-column>
            <el-table-column prop="status"
                             label="状态"
                             :formatter="formatStatus">
            </el-table-column>
            <el-table-column label="操作"
                             width="150">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">
                        编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    
        <!--编辑界面-->
        <el-dialog title="编辑会员等级"
                   v-model="editFormVisible"
                   :close-on-click-modal="true"
                   @close="closeDialog('edit')">
            <el-form :model="memberLevelDetails"
                     label-width="150px"
                     :rules="editFormRules"
                     ref="editForm">
                <el-form-item label="ID"
                              prop="id">
                    <el-col :span="10">
                        <el-input v-model="memberLevelDetails.id"
                                  auto-complete="off"
                                  :disabled="true"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="名称"
                              prop="name">
                    <el-col :span="10">
                        <el-input v-model="memberLevelDetails.name"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="单次充值升级"
                              prop="threshold">
                    <el-col :span="10">
                        <el-input v-model.number="memberLevelDetails.threshold"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="参赛获豪气"
                              prop="apply">
                    <el-col :span="10">
                        <el-input v-model="memberLevelDetails.apply"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="重入获豪气"
                              prop="buyChip">
                    <el-col :span="10">
                        <el-input v-model="memberLevelDetails.buyChip"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="消费获豪气(%)"
                              prop="apply">
                    <el-col :span="10">
                        <el-input v-model="memberLevelDetails.consume"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="签到获周赛票"
                              prop="weeklyTicket">
                    <el-col :span="10">
                        <el-input v-model="memberLevelDetails.weeklyTicket"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="状态"
                              prop="status">
                    <el-select v-model="memberLevelDetails.status"
                               placeholder="请选择状态"
                               clearable>
                        <el-option label="正常"
                                   value="1"></el-option>
                        <el-option label="禁用"
                                   value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click.native="closeDialog('edit')">取消</el-button>
                <el-button type="primary"
                           @click.native="editSubmit"
                           :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    
        <!--添加界面-->
        <el-dialog title="添加会员等级"
                   v-model="addFormVisible"
                   :close-on-click-modal="true"
                   @close="closeDialog('add')">
            <el-form :model="memberLevelAddForm"
                     label-width="150px"
                     :rules="editFormRules"
                     ref="addForm">
                <el-form-item label="名称"
                              prop="name">
                    <el-col :span="10">
                        <el-input v-model.number="memberLevelAddForm.name"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="单次充值升级"
                              prop="threshold">
                    <el-col :span="10">
                        <el-input v-model.number="memberLevelAddForm.threshold"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="参赛获豪气"
                              prop="apply">
                    <el-col :span="10">
                        <el-input v-model.number="memberLevelAddForm.apply"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="重入获豪气"
                              prop="buyChip">
                    <el-col :span="10">
                        <el-input v-model.number="memberLevelAddForm.buyChip"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="消费获豪气(%)"
                              prop="consume">
                    <el-col :span="10">
                        <el-input v-model.number="memberLevelAddForm.consume"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="签到获周赛票"
                              prop="weeklyTicket">
                    <el-col :span="10">
                        <el-input v-model.number="memberLevelAddForm.weeklyTicket"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
    
                <el-form-item label="状态"
                              prop="status">
                    <el-select v-model="memberLevelAddForm.status"
                               placeholder="请选择状态"
                               clearable>
                        <el-option label="正常"
                                   value="1"></el-option>
                        <el-option label="禁用"
                                   value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <el-button @click.native="closeDialog('add')">取消</el-button>
                <el-button type="primary"
                           @click.native="addSubmit"
                           :loading="addLoading">保存</el-button>
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
            editFormRules: {
                name: [
                    { required: true, message: "请填写名称", trigger: 'blur' }
                ],
                threshold: [
                    // { required: true, message: '请填写单次充值升级', trigger: 'blur' },
                    { required: true, type: 'number', message: '请填写单次充值升级，必须为数字值', trigger: 'blur' }
                ],
                apply: [
                    // { required: true, message: '请填写参赛获豪气', trigger: 'blur' },
                    { required: true, type: 'number', message: '请填写参赛获豪气，必须为数字值', trigger: 'blur' }
                ],
                buyChip: [
                    // { required: true, message: '请填写重入获豪气', trigger: 'blur' },
                    { required: true, type: 'number', message: '请填写重入获豪气，必须为数字值', trigger: 'blur' }
                ],
                consume: [
                    // { required: true, message: '请填写消费获豪气', trigger: 'blur' },
                    { required: true, type: 'number', message: '请填写消费获豪气，必须为数字值', trigger: 'blur' }
                ],
                weeklyTicket: [
                    // { required: true, message: '请填写签到获周赛票次数' },
                    { required: true, type: 'number', message: ',请填写签到获周赛票次数，必须为数字值', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '请选择状态', trigger: 'change' },
                ]
            },
            editLoading: false,
            addLoading: false
        }
    },
    computed: {
        ...mapGetters([
            'memberLevelList',
            'memberLevelDetails',
            'memberLevelFilters',
            'editFormVisible',
            'listLoading',
            'addFormVisible',
            'memberLevelAddForm'
        ])
    },
    methods: {
        formatStatus: function (row, column) {
            let str = "禁用";
            if (row.status == "1") {
                str = "正常";
            }
            else if (row.status == "2") {
                str = "禁用";
            }
            return str;
        },
        getList() {
            this.$store.dispatch('getMemberLevelList')
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.$store.dispatch('getMemberLevelDetails', {
                id: row.id
            })
        },
        handleAdd: function () {
            this.$store.commit(types.COM_ADD_FORM_VISIBLE, true);
        },
        editSubmit: function () {
            if (this.editLoading) { return false }
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.editLoading = true;
                    this.$store.dispatch("editMemberLevel").then(res => {
                        this.editLoading = false;
                        this.getList();
                    }, err => {
                        this.editLoading = false;
                        this.$message.error(err.message);
                    })
                }
            });
        },
        addSubmit: function () {
            if (this.addLoading) { return false }
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.addLoading = true;
                    this.$store.dispatch("addMemberLevel").then(res => {
                        this.addLoading = false;
                        this.getList();
                    }, err => {
                        this.addLoading = false;
                        this.$message.error(err.message);
                    })
                }
            });
        },
        closeDialog: function (type) {
            if (type == "add") {
                this.$refs.addForm.resetFields();
                this.$store.commit(types.COM_ADD_FORM_VISIBLE, false);
            }
            else {
                this.$refs.editForm.resetFields();
                this.$store.commit(types.COM_EDIT_FORM_VISIBLE, false);
            }
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