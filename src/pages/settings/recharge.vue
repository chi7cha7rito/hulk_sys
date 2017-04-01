<template>
    <section>
        <!--工具条-->
        <el-col :span="24"
                class="toolbar"
                style="padding-bottom: 0px;">
            <el-form :inline="true"
                     :model="rechargeSetupFilters">
                <el-form-item>
                    <el-button type="primary"
                               @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="rechargeSetupList"
                  v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column prop="threshold"
                             label="满额">
            </el-table-column>
            <el-table-column prop="reward"
                             label="返现积分">
            </el-table-column>
            <el-table-column prop="remark"
                             label="备注">
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
        <el-dialog title="编辑充值返现"
                   v-model="editFormVisible"
                   :close-on-click-modal="true"
                   @close="closeDialog('edit')">
            <el-form :model="rechargeSetupDetails"
                     label-width="100px"
                     :rules="editFormRules"
                     ref="editForm">
                <el-form-item label="ID"
                              prop="id">
                    <el-col :span="10">
                        <el-input v-model="rechargeSetupDetails.id"
                                  auto-complete="off"
                                  :disabled="true"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="满额"
                              prop="threshold">
                    <el-col :span="10">
                        <el-input v-model="rechargeSetupDetails.threshold"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="返现积分"
                              prop="reward">
                    <el-col :span="10">
                        <el-input v-model="rechargeSetupDetails.reward"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注"
                              prop="remark">
                    <el-col :span="10">
                        <el-input v-model="rechargeSetupDetails.remark"
                                  type="textarea"
                                  :rows="2"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="状态"
                              prop="status">
                    <el-select v-model="rechargeSetupDetails.status"
                               placeholder="请选择状态"
                               clearable>
                        <el-option label="启用"
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
        <el-dialog title="添加充值返现"
                   v-model="addFormVisible"
                   :close-on-click-modal="true"
                   @close="closeDialog('add')">
            <el-form :model="rechargeSetupAddForm"
                     label-width="100px"
                     :rules="editFormRules"
                     ref="addForm">
                <el-form-item label="满额"
                              prop="threshold">
                    <el-col :span="10">
                        <el-input v-model.number="rechargeSetupAddForm.threshold"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="返现积分"
                              prop="reward">
                    <el-col :span="10">
                        <el-input v-model.number="rechargeSetupAddForm.reward"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="备注"
                              prop="remark">
                    <el-col :span="10">
                        <el-input v-model="rechargeSetupAddForm.remark"
                                  type="textarea"
                                  :rows="2"
                                  auto-complete="off"></el-input>
                    </el-col>
    
                </el-form-item>
                <el-form-item label="状态"
                              prop="status">
                    <el-select v-model="rechargeSetupAddForm.status"
                               placeholder="请选择状态"
                               clearable>
                        <el-option label="启用"
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
                threshold: [
                    { required: true, type: 'number', message: '请填写满额，必须为数字值', trigger: 'blur' }
                ],
                reward: [
                    { required: true, type: 'number', message: '请填写返现积分，必须为数字值', trigger: 'blur' }
                ],
                status: [
                    { required: true, message: '请选择状态', trigger: 'change' }
                ],
            },
            editLoading: false,
            addLoading: false
        }
    },
    computed: {
        ...mapGetters([
            'rechargeSetupList',
            'rechargeSetupDetails',
            'rechargeSetupFilters',
            'editFormVisible',
            'listLoading',
            'addFormVisible',
            'rechargeSetupAddForm'
        ])
    },
    methods: {
        formatStatus: function (row, column) {
            let str = "禁用";
            if (row.status == "1") {
                str = "启用";
            }
            else if (row.status == "2") {
                str = "禁用";
            }
            return str;
        },
        getList() {
            this.$store.dispatch('getRechargeSetupList')
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.$store.dispatch('getRechargeSetupDetails', {
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
                    this.$store.dispatch("editRechargeSetup").then(res => {
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
                    this.$store.dispatch("addRechargeSetup").then(res => {
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