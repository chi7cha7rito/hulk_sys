<template>
    <section>
        <!--工具条-->
        <el-col :span="24"
                class="toolbar"
                style="padding-bottom: 0px;">
            <el-form :inline="true"
                     :model="attendanceFilters">
                <el-form-item label="手机号">
                    <el-input v-model="attendanceFilters.phoneNo"
                              placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="赛事名称">
                    <el-input v-model="attendanceFilters.matchName"
                              placeholder="赛事名称"></el-input>
                </el-form-item>
                <el-form-item label="比赛时间">
                    <el-col :span="10">
                        <el-date-picker v-model="attendanceFilters.openingStart"
                                        type="date"
                                        placeholder="开始日期"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line"
                            :span="4">--</el-col>
                    <el-col :span="10">
                        <el-date-picker v-model="attendanceFilters.openingEnd"
                                        type="date"
                                        placeholder="结束日期"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               v-on:click="getList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               @click="handleAdd">参赛</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    
        <!--列表-->
        <el-table :data="attendanceList"
                  v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column label="赛事名称">
                <template scope="scope">
                    <span>{{scope.row.match.matchConfig.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="赛事类型">
                <template scope="scope">
                    <span>{{scope.row.match.matchConfig.Type.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="每手价格（元）">
                <template scope="scope">
                    <span>{{scope.row.match.perHand}}</span>
                </template>
            </el-table-column>
            <el-table-column label="比赛时间">
                <template scope="scope">
                    <span>{{formatOpening(scope.row.match.openingDatetime)}}</span>
                </template>
            </el-table-column>
            <el-table-column label="会员名称">
                <template scope="scope">
                    <span>{{scope.row.member.user.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="手机号">
                <template scope="scope">
                    <span>{{scope.row.member.user.phoneNo}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="result"
                             label="成绩">
            </el-table-column>
            <el-table-column prop="rewards"
                             label="奖励">
            </el-table-column>
            <!--<el-table-column label="操作"
                                             width="150">
                                <template scope="scope">
                                    <el-button size="small"
                                               @click="handleEdit(scope.$index, scope.row)">
                                        重入</el-button>
                                    <el-button type="danger"
                                               size="small"
                                               @click="handleDel(scope.row.id)">成绩</el-button>
                                </template>
                            </el-table-column>-->
        </el-table>
    
        <!--工具条-->
        <el-col :span="24"
                class="toolbar">
            <!--<el-button type="danger" :disabled="this.sels.length===0">批量删除</el-button>-->
            <el-pagination layout="prev, pager, next"
                           :page-size="10"
                           :total="total"
                           @current-change="handleCurrentChange"
                           style="float:right;">
            </el-pagination>
        </el-col>

        <!--参赛-->
	    <el-dialog title="报名参赛" v-model="addFormVisible" :close-on-click-modal="true" @close="closeDialog('add')">
			<el-form :model="addAttendanceForm" label-width="100px" :rules="editFormRules" ref="addForm">
				<el-form-item label="赛事" prop="matchId">
					<el-select v-model="addAttendanceForm.matchId" placeholder="请选择赛事类型" clearable>
						<el-option
								v-for="item in availableMatchList"
								:label="item.matchConfig.name"
								:value="item.id.toString()">
						</el-option>
					</el-select>
				</el-form-item>
				<!--<el-form-item label="状态" prop="status">
					<el-select v-model="addForm.status" placeholder="请选择赛事状态" clearable>
						<el-option label="已开始" value="1"></el-option>
						<el-option label="已结束" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="报名时间" prop="openingDatetime">
					<el-date-picker v-model="addForm.openingDatetime" type="date" placeholder="选择日期"  style="width: 40%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="比赛时间" prop="closingDatetime">
					<el-date-picker v-model="addForm.closingDatetime" type="date" placeholder="选择日期"  style="width: 40%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="每首价格" prop="perHand">
					<el-col :span="5">
						<el-input v-model.number="addForm.perHand"  auto-complete="off"></el-input>
					</el-col>				
				</el-form-item>-->
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="closeDialog('add')">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
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
                // matchConfigId: [
                //     { required: true, message: "请选择赛事类型", trigger: 'change' }
                // ],
                // status: [
                //     { required: true, message: '请选择赛事状态', trigger: 'change' }
                // ],
                // openingDatetime: [
                //     { type: 'date', required: true, message: '请选择报名时间', trigger: 'change' }
                // ],
                // closingDatetime: [
                //     { type: 'date', required: true, message: '请选择比赛时间', trigger: 'change' }
                // ],
                // perHand: [
                //     { required: true, message: '请填写每手价格' },
                //     { type: 'number', message: '价格必须为数字值' }
                // ]
            },
            addLoading:false
        }
    },
    computed: {
        ...mapGetters([
            'attendanceList',
            'availableMatchList',
            'attendanceFilters',
            'addAttendanceForm',
            'listLoading',
            'total',
            'addFormVisible'
        ])
    },
    methods: {
        formatOpening: function (val) {
            return util.formatDate.utcToLocal(val)
        },
        handleCurrentChange(val) {
            this.$store.commit(types.COM_PAGE_NUM, val);
            this.getList();
        },
        getList() {
            this.$store.dispatch('getAttendanceList')
        },
        // getMatchTypeList() {
        //     if (this.matchTypeList.length == 0) {
        //         this.$store.dispatch('getMatchTypeList');
        //     }
        // },
        // //显示编辑界面
        // handleEdit: function (index, row) {
        //     this.$store.dispatch('getMatchDetails', {
        //         id: row.id
        //     })
        // },
        handleAdd: function () {
            this.$store.dispatch('getAvailableMatches');
            this.$store.commit(types.COM_ADD_FORM_VISIBLE, true);

        },
        // handleDel: function (id) {
        //     if (this.delLoading) { return false }
        //     this.$confirm('确认删除该记录吗?', '提示', {
        //         type: 'warning'
        //     }).then(() => {
        //         this.$store.dispatch('delMatch', id).then(() => {
        //             this.getList();
        //         }, err => {
        //             this.$message.error(err.message);
        //         })
        //     })
        // },
        // editSubmit: function () {
        //     if (this.editLoading) { return false }
        //     this.$refs.editForm.validate((valid) => {
        //         if (valid) {
        //             this.editLoading = true;
        //             this.$store.dispatch("editMatch").then(res => {
        //                 this.editLoading = false;
        //                 this.getList();
        //             }, err => {
        //                 this.editLoading = false;
        //                 this.$message.error(err.message);
        //             })
        //         }
        //     });
        // },
        // addSubmit: function () {
        //     if (this.addLoading) { return false }
        //     this.$refs.addForm.validate((valid) => {
        //         if (valid) {
        //             this.addLoading = true;
        //             this.$store.dispatch("addMatch").then(res => {
        //                 this.addLoading = false;
        //                 this.getList();
        //             }, err => {
        //                 this.addLoading = false;
        //                 this.$message.error(err.message);
        //             })
        //         }
        //     });
        // },
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
        // this.getMatchTypeList();
        this.getList();
    }
}
</script>

<style scoped>
.line {
    text-align: center;
}
</style>