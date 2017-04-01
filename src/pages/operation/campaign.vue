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
        <el-dialog title="报名参赛"
                   v-model="addFormVisible"
                   :close-on-click-modal="true"
                   @close="closeDialog('add')">
             <el-steps :space="250" :active="activeStep" :center="stepCenter" :align-center="stepTextCenter" style="margin-bottom:50px;">
                <el-step title="选择会员" description="会员和支付方式的选择">
                </el-step>
                <el-step title="选择比赛" description="赛事类型和赛事价格的选择">
                </el-step>
                <el-step title="确认报名" description="会员信息，支付方式，赛事信息确认">
                </el-step>     
            </el-steps> 
            <el-form :model="memberSelectForm"
                     label-width="100px"
                     :rules="memberSelectFormRules"
                     ref="memberSelectForm">
                        <el-form-item label="手机号" prop="phoneNo">
                            <!--<el-col :span="8">
                                <el-input v-model="memberSelectForm.phoneNo" auto-complete="off"></el-input>
                            </el-col> -->
                            <el-select
                                v-model="memberSelectForm.phoneNo"
                                filterable
                                remote
                                placeholder="请输入手机号"
                                :remote-method="getMemberList"
                                :loading="selectLoading"
                                @change="handlePhoneChange">
                                    <el-option
                                        v-for="item in availableMembers"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                    </el-option>
                            </el-select>        
                        </el-form-item>
                        <el-form-item label="支付方式" prop="payType">
                            <el-select v-model="memberSelectForm.payType"  placeholder="请选择支付类型"
                               clearable>
                                <el-option
                                    v-for="item in payTypeConfig"                             
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>    
                        </el-form-item>
                        <el-form-item label="余额">
                            <el-col :span="6">
                                <el-input v-model="memberSelectForm.balance" auto-complete="off" :readonly="true"></el-input>
                            </el-col>           
                        </el-form-item>
                        <el-form-item label="积分">
                            <el-col :span="6">
                                <el-input v-model="memberSelectForm.points" auto-complete="off" :readonly="true"></el-input>
                            </el-col>           
                        </el-form-item>  
                        <el-form-item label="优惠券">

                        </el-form-item>    
                        <el-form-item style="text-align:center">
                            <el-button type="primary" @click.native="handleStep1">下一步</el-button>
                        </el-form-item> 
                        <!--<el-form-item label="赛事"
                                    prop="matchId">
                            <el-select v-model="addAttendanceForm.matchId"
                                    placeholder="请选择赛事类型"
                                    clearable
                                    @change='matchChange'>
                                <el-option v-for="item in availableMatchList"
                                        :label="formatMatch(item.matchConfig.name,item.closingDatetime)"
                                        :value="item.id.toString()">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="价格"
                                    prop="matchPriceId">
                            <el-select v-model="addAttendanceForm.matchPriceId"
                                    placeholder="请选择价格"
                                    clearable>
                                <el-option v-for="item in priceList"
                                        :label="formatPrice(item.type.name,item.price,item.points)"
                                        :value="item.id.toString()">
                                </el-option>
                            </el-select>
                        </el-form-item>-->
                    </el-form>
            <div slot="footer"
                 class="dialog-footer">
                <!--<el-button @click.native="closeDialog('add')">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">报名</el-button>-->
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
            activeStep:1,
            stepCenter:true,
            stepTextCenter:true,
            selectLoading:false,
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
            memberSelectFormRules:{
                phoneNo:[
                   { required: true, message: "请输入手机号", trigger: 'blur' } 
                ],
                payType:[
                    { required: true, message: "请输入支付方式", trigger: 'change' } 
                ]
            },
            addLoading: false,
            priceList: []
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
            'addFormVisible',
            'payTypeConfig',
            'memberSelectForm',
            'availableMembers'
        ])
    },
    methods: {
        formatOpening: function (val) {
            return util.formatDate.utcToLocal(val)
        },
        formatPrice: function (name, amount, points) {
            return name + '-' + amount + '元或' + 'points' + '积分'
        },
        formatMatch: function (name, time) {
            return name + '（' + util.formatDate.utcToLocal(time) + '）'
        },
        handleCurrentChange(val) {
            this.$store.commit(types.COM_PAGE_NUM, val);
            this.getList();
        },
        matchChange(){

        },
        getList() {
            this.$store.dispatch('getAttendanceList')
        },
        getMemberList:function(phoneNo){
            if (phoneNo !== '') {
                this.selectLoading=true;
                this.$store.dispatch('getAllMembers',phoneNo).then(()=>{
                    this.selectLoading=false;
                },err=>{
                    this.selectLoading=false;
                })
            } 
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
        handlePhoneChange:function(id){
            var that=this;
            that.$store.dispatch('getAccountInfo',id).then((res)=>{
                that.$store.commit(types.SET_MEMBER_ACCOUNT_INFO_IN_CAMPAIGN,res);
            });
        },
        handleAdd: function () {
            this.$store.dispatch('getAvailableMatches');
            this.$store.commit(types.COM_ADD_FORM_VISIBLE, true);
        },
        handleStep1:function(){
            this.$refs.memberSelectForm.validate((valid)=>{
                console.log('adadadad');
            })
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
                this.$refs.memberSelectForm.resetFields();
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