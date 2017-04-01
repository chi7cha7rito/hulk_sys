<template>
    <section>
        <!--工具条-->
        <el-col :span="24"
                class="toolbar"
                style="padding-bottom: 0px;">
            <el-form :inline="true"
                     :model="sysUserFilters">
                <el-form-item label="姓名">
                    <el-input v-model="sysUserFilters.name"
                              placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="sysUserFilters.phoneNo"
                              placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                    <el-input v-model="sysUserFilters.idCardNo"
                              placeholder="身份证号"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="sysUserFilters.status"
                               placeholder="请选择角色"
                               style="width:90px"
                               clearable>
                        <el-option label="管理员"
                                   value="1"></el-option>
                        <el-option label="员工"
                                   value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="sysUserFilters.status"
                               placeholder="请选择状态"
                               style="width:90px"
                               clearable>
                        <el-option label="正常"
                                   value="1"></el-option>
                        <el-option label="冻结"
                                   value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               v-on:click="getList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="sysUserList"
                  v-loading="listLoading"
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
            <el-table-column label="性别">
                <template scope="scope">
                    <span>{{scope.row.gender.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="角色">
                <template scope="scope">
                    <span>{{scope.row.roleType.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status"
                             label="状态"
                             :formatter="formatStatus">
            </el-table-column>
            <el-table-column prop="createdAt"
                             label="创建时间"
                             :formatter="formatCreatedAt">
            </el-table-column>
            <el-table-column prop="updatedAt"
                             label="更新时间"
                             :formatter="formatUpdatedAt">
            </el-table-column>
            <el-table-column label="操作"
                             width="180">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">
                        编辑</el-button>
                    <el-button type="danger" size="small"
                               @click="handleReset(scope.$index, scope.row)">
                        重置密码</el-button>   
                </template>
            </el-table-column>
        </el-table>
    
        <!--工具条-->
        <el-col :span="24"
                class="toolbar">
            <el-pagination layout="prev, pager, next"
                           :page-size="10"
                           :total="total"
                           @current-change="handleCurrentChange"
                           style="float:right;">
            </el-pagination>
        </el-col>
    
        <!--编辑界面-->
        <el-dialog title="编辑后台用户"
                   v-model="editFormVisible"
                   :close-on-click-modal="true"
                   @close="closeDialog('edit')">
            <el-form :model="sysUserDetails"
                     label-width="100px"
                     :rules="editFormRules"
                     ref="editForm">
                <el-form-item label="ID"
                              prop="id">
                    <el-col :span="10">
                        <el-input v-model="sysUserDetails.id"
                                  auto-complete="off"
                                  :disabled="true"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="姓名"
                              prop="name">
                    <el-col :span="10">
                        <el-input v-model="sysUserDetails.name"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="手机号"
                              prop="phphoneNo">
                    <el-col :span="10">
                        <el-input v-model="sysUserDetails.phoneNo"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证号"
                              prop="idCardNo">
                    <el-col :span="10">
                        <el-input v-model="sysUserDetails.idCardNo"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="角色"
                              prop="roleType">
                    <el-select v-model="sysUserDetails.roleType"
                               placeholder="请选择角色"
                               clearable>
                        <el-option label="管理员"
                                   value="1"></el-option>
                        <el-option label="员工"
                                   value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别"
                              prop="gender">
                    <el-select v-model="sysUserDetails.gender"
                               placeholder="请选择性别"
                               clearable>
                        <el-option label="男"
                                   value="1"></el-option>
                        <el-option label="女"
                                   value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态"
                              prop="status">
                    <el-select v-model="sysUserDetails.status"
                               placeholder="请选择状态"
                               clearable>
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
                <el-button @click.native="closeDialog('edit')">取消</el-button>
                <el-button type="primary"
                           @click.native="editSubmit"
                           :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    
        <!--添加界面-->
        <el-dialog title="添加后台用户"
                   v-model="addFormVisible"
                   :close-on-click-modal="true"
                   @close="closeDialog('add')">
            <el-form :model="sysUserAddForm"
                     label-width="100px"
                     :rules="editFormRules"
                     ref="addForm">
                <el-form-item label="姓名"
                              prop="name">
                    <el-col :span="10">
                        <el-input v-model="sysUserAddForm.name"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="手机号"
                              prop="phoneNo">
                    <el-col :span="10">
                        <el-input v-model="sysUserAddForm.phoneNo"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="身份证号"
                              prop="idCardNo">
                    <el-col :span="10">
                        <el-input v-model="sysUserAddForm.idCardNo"
                                  auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="角色"
                              prop="roleType">
                    <el-select v-model="sysUserAddForm.roleType"
                               placeholder="请选择角色"
                               clearable>
                        <el-option label="管理员"
                                   value="1"></el-option>
                        <el-option label="员工"
                                   value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别"
                              prop="gender">
                    <el-select v-model="sysUserAddForm.gender"
                               placeholder="请选择性别"
                               clearable>
                        <el-option label="男"
                                   value="1"></el-option>
                        <el-option label="女"
                                   value="2"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="状态"
                              prop="status">
                    <el-select v-model="sysUserAddForm.status"
                               placeholder="请选择状态"
                               clearable>
                        <el-option label="正常"
                                   value="1"></el-option>
                        <el-option label="冻结"
                                   value="2"></el-option>
                        <el-option label="删除"
                                   value="3"></el-option>
                    </el-select>
                </el-form-item>-->
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
                    { required: true, message: "请填写姓名", trigger: 'blur' }
                ],
                phoneNo: [
                    { required: true, message: '请填写手机号', trigger: 'blur' }
                ],
                idCardNo: [
                    { required: true, message: '请填写身份证号', trigger: 'blur' }
                ],
                gender: [
                    { required: true, message: '请选择性别', trigger: 'change' }
                ],
                roleType: [
                    { required: true, message: '请选择角色', trigger: 'change' },
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
            'sysUserList',
            'sysUserDetails',
            'sysUserFilters',
            'editFormVisible',
            'listLoading',
            'addFormVisible',
            'total',
            'sysUserAddForm'
        ])
    },
    methods: {
        formatStatus: function (row, column) {
            let str = "删除";
            if (row.status == "1") {
                str = "正常";
            }
            else if (row.status == "2") {
                str = "冻结";
            }
            else if (row.status == "3") {
                str = "删除";
            }

            return str;
        },
        formatCreatedAt: function (row, column) {
            return util.formatDate.utcToLocal(row.createdAt)
        },
        formatUpdatedAt: function (row, column) {
            return util.formatDate.utcToLocal(row.updatedAt)
        },
        handleCurrentChange(val) {
            this.$store.commit(types.COM_PAGE_NUM, val);
            this.getList();
        },
        getList() {
            this.$store.dispatch('getSysUserList')
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.$store.dispatch('getSysUserDetails', {
                id: row.id
            })
        },
        handleAdd: function () {
            this.$store.commit(types.COM_ADD_FORM_VISIBLE, true);
        },
        handleReset:function(index,row){
           this.$confirm('确认重置密码吗?', '提示', {
					type: 'warning'
				}).then(()=>{
					this.$store.dispatch('resetPwd',row.phoneNo).then(()=>{
						this.$message({
                        message: '密码重置成功！',
                        type: 'success'
                        });
					},err=>{
						this.$message.error(err.message);
					})
				})	
        },
        editSubmit: function () {
            if (this.editLoading) { return false }
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.editLoading = true;
                    this.$store.dispatch("editSysUser").then(res => {
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
                    this.$store.dispatch("addSysUser").then(res => {
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