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
            <el-table-column label="操作"
                   width="210">
                <template scope="scope">
                    <el-button size="small" @click="handleBuy(scope.$index, scope.row)" v-if="scope.row.match.status=='1'">重入</el-button>
                    <el-button type="danger" size="small" @click="handleScore(scope.$index, scope.row)" v-if="scope.row.match.status=='2'">成绩</el-button>
                    <el-button type="warning" size="small" @click="handleAward(scope.$index, scope.row)" v-if="scope.row.match.result!=''">颁奖</el-button>
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
    
        <!--参赛-->
        <el-dialog title="报名参赛"
                   v-model="addFormVisible"
                   :close-on-click-modal="true"
                   @close="closeDialog('add')">
             <el-steps :space="250" :active="activeStep" :center="stepCenter" :align-center="stepTextCenter" style="margin-bottom:20px;">
                <el-step title="选择比赛" description="赛事类型和赛事价格的选择">
                </el-step>
                <el-step title="选择会员" description="会员和支付方式的选择">
                </el-step>
                <el-step title="确认报名" description="会员信息，支付方式，赛事信息确认">
                </el-step>     
            </el-steps> 
            <el-form :model="matchSelectForm" label-width="100px" :rules="matchSelectFormRules" ref="matchSelectForm" v-show="this.activeStep==1">
                <el-form-item label="赛事" prop="matchId">
                    <el-col :span="15">
                        <el-select v-model="matchSelectForm.matchId"
                            placeholder="请选择赛事类型"
                            clearable
                            @change='handelMatchChange' style="width:100%">
                            <el-option v-for="item in availableMatchList"
                                :label="formatMatch(item)"
                                :value="item.id.toString()">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
                <el-form-item label="价格" prop="matchPriceId">
                    <el-select v-model="matchSelectForm.matchPriceId"
                        placeholder="请选择价格"
                        clearable
                        @change="hanlePriceChange">
                        <el-option v-for="item in priceList"
                            :label="formatPrice(item.type.name,item.price,item.points)"
                            :value="item.id.toString()"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>                               
                <el-form-item>
                    <el-button type="primary" @click.native="handleStep1" >下一步</el-button>
                </el-form-item>                                         
            </el-form>
            <el-form :model="memberSelectForm" label-width="100px" :rules="memberSelectFormRules" ref="memberSelectForm" v-show="this.activeStep==2">
                    <el-form-item>
                            <!--<el-col :span="8">
                                <el-alert
                                    title="消息提示的文案"
                                    type="info"
                                    :closable="false"
                                    show-icon>
                                </el-alert>
                            </el-col>-->
                        </el-form-item>
                        <el-form-item label="手机号" prop="phoneNo">
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
                         <el-form-item label="姓名">
                            <el-col :span="6">
                                <el-input v-model="memberSelectForm.name" auto-complete="off" :readonly="true"></el-input>
                            </el-col>           
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
                        <el-form-item label="优惠券" v-if="memberSelectForm.couponList.length" prop="couponId">
                            <el-select
                                v-model="memberSelectForm.couponId"
                                placeholder="请选择优惠券" clearable @change="handleCouponChange">
                                    <el-option
                                        v-for="item in memberSelectForm.couponList"
                                        :label="formatCouponName(item)"
                                        :value="item.id">
                                    </el-option>
                            </el-select>        
                        </el-form-item> 
                        <el-form-item label="支付方式" prop="payType">
                            <el-select v-model="memberSelectForm.payType"  placeholder="请选择支付类型"
                               clearable>
                                <el-option label="余额" value="1" :disabled="selectedPrice.price>memberSelectForm.balance"></el-option>
                                <el-option label="积分" value="2" :disabled="selectedPrice.points>memberSelectForm.points"></el-option>
                                <el-option label="优惠券" value="3" :disabled="!memberSelectForm.couponList.length"></el-option>
                            </el-select>    
                        </el-form-item>    
                        <el-form-item>
                            <el-button type="danger" @click.native="handleBack1" style="margin-right:20px;">上一步</el-button>
                            <el-button type="primary" @click.native="handleStep2" >下一步</el-button>
                        </el-form-item>                                           
            </el-form>
            <el-form  label-width="100px"  v-show="this.activeStep==3" style="margin-left:30px;">
                        <el-form-item label="赛事名称" class="label-item">
                            <el-col :span="8">
                                <label for="">{{selectedMatch.matchConfig.name}}</label>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="报名截止时间" class="label-item">
                            <el-col :span="10">
                                <label for="">{{formatOpening(selectedMatch.closingDatetime)}}</label>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="比赛开始时间" class="label-item">
                            <el-col :span="10">
                                <label for="">{{formatOpening(selectedMatch.openingDatetime)}}</label>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="比赛价格" v-if="this.memberSelectForm.payType=='1'" class="label-item">
                            <el-col :span="6">
                                <label for="">{{selectedPrice.price}}元</label>
                            </el-col>        
                        </el-form-item>
                        <el-form-item label="比赛所需积分" v-if="this.memberSelectForm.payType=='2'" class="label-item">
                            <el-col :span="6">
                                <label for="">{{selectedPrice.points}}</label>
                            </el-col> 
                        </el-form-item>
                        <el-form-item label="参赛人" class="label-item">
                            <el-col :span="12">
                                <label for="">{{memberSelectForm.phoneNo}}-{{memberSelectForm.name}}</label>
                            </el-col>            
                        </el-form-item>
                        <el-form-item label="支付方式" class="label-item">
                            <el-col :span="5">
                                <label for="">{{formatPayType(memberSelectForm.payType)}}</label>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="扣除费用" v-if="this.memberSelectForm.payType=='1'" class="label-item">
                            <el-col :span="12">
                                <label for="">{{selectedPrice.price}}元</label>
                                <span style="margin-left:10px;color:#FF4949">余额:{{this.memberSelectForm.balance-this.selectedPrice.price}}元</span>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="扣除积分" v-if="this.memberSelectForm.payType=='2'" class="label-item">
                            <el-col :span="12">
                                <label for="">{{selectedPrice.points}}</label>
                                <span style="margin-left:10px;color:#FF4949">剩余积分:{{this.memberSelectForm.points-this.selectedPrice.points}}</span>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="使用优惠券" v-if="this.memberSelectForm.payType=='3'" class="label-item">
                            <el-col :span="5">
                                <label for="">{{formatCouponName(this.selectedCoupon)}}</label>
                            </el-col>
                        </el-form-item>
                        <el-form-item style="margin-top:20px">
                            <el-button type="danger" @click.native="handleBack2" style="margin-right:40px;">上一步</el-button>
                            <el-button type="primary" @click.native="applySubmit" :loading="applyLoading">确认报名</el-button>
                        </el-form-item>  
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
            </div>
        </el-dialog>
        <!--重入-->
        <el-dialog title="重入" v-model="editFormVisible" :close-on-click-modal="true" @close="closeDialog('edit')">
            <el-form :model="buyForm" label-width="100px" :rules="buyFormRules" ref="buyForm">
                <el-form-item label="参赛人" class="label-item">
                    <el-col :span="12">
                        <label for="">{{buyForm.phoneNo}}-{{buyForm.name}}</label>
                    </el-col>
                </el-form-item>
                <el-form-item label="余额" class="label-item">
                    <el-col :span="12">
                        <label for="">{{buyForm.balance}}元</label>
                    </el-col>
                </el-form-item>
                <el-form-item label="积分" class="label-item">
                    <el-col :span="12">
                        <label for="">{{buyForm.points}}</label>
                    </el-col>
                </el-form-item>
                <el-form-item label="每首价格" class="label-item">
                    <el-col :span="6">
                        <label for="">{{buyForm.perHand}}元</label>
                    </el-col>
                </el-form-item>
                <el-form-item label="手数" prop="handCount">
                    <el-col :span="6">
                        <el-input v-model="buyForm.handCount" auto-complete="off" @blur="calcTotalPrice"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="总价" prop="totalPrice">
                    <el-col :span="6">
                        <el-input v-model="buyForm.totalPrice" auto-complete="off"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="支付方式" prop="payType">
                     <el-select v-model="buyForm.payType"  placeholder="请选择支付类型" clearable>
                        <el-option label="余额" value="1" :disabled="buyForm.balance<buyForm.totalPrice"></el-option>
                        <el-option label="积分" value="2" :disabled="buyForm.points<buyForm.totalPrice"></el-option>
                    </el-select>    
                </el-form-item>  
                <el-form-item label="备注" prop="remark">
                    <el-col :span="12">
                        <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入备注"
                            v-model="buyForm.remark">
                            </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" style="margin-right:40px;" @click.native="closeDialog('edit')">取消</el-button>
                    <el-button type="primary" @click.native="buyFormSubmit" :loading="buyLoading">确认</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--成绩-->
        <el-dialog title="成绩" v-model="thirdFormVisible" :close-on-click-modal="true" @close="closeDialog('edit')">
            <el-form :model="scoreForm" label-width="100px" :rules="scoreFormRules" ref="scoreForm">
                <el-form-item label="参赛人" class="label-item">
                    <el-col :span="12">
                        <label for="">{{scoreForm.phoneNo}}-{{scoreForm.name}}</label>
                    </el-col>
                </el-form-item>
                <el-form-item label="赛事名称" class="label-item">
                    <el-col :span="12">
                        <label for="">{{scoreForm.matchName}}</label>
                    </el-col>
                </el-form-item>
                <el-form-item label="赛事奖励" prop="matchRewardId">
                    <el-select v-model="scoreForm.matchRewardId"
                        placeholder="请选择奖励"
                        clearable>
                        <el-option v-for="item in scoreForm.matchRewardList"
                            :label="formatMatchReward(item)"
                            :value="item.id.toString()"
                            >
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="danger" style="margin-right:40px;" @click.native="closeDialog('edit')">取消</el-button>
                    <el-button type="primary" @click.native="scoreFormSubmit" :loading="scoreLoading">确认</el-button>
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
        let that=this;
        let payTypeValidator=(rule,value,callback)=>{
            if(that.memberSelectForm.payType=="3"){
                if(!value){
                    callback(new Error('请选择一张优惠券'))
                }
            }
            callback();
        }

        let buyFormRemarkValidator=(rule,value,callback)=>{
            let perHand=that.buyForm.perHand;
            let handCount=that.buyForm.handCount;
            let totalPrice=that.buyForm.totalPrice;

            if(perHand*handCount!=totalPrice){
                callback(new Error('自定义总价时候，请输入备注'))
            }

            callback();
        }

        return {
            activeStep:1,
            stepCenter:true,
            stepTextCenter:true,
            selectLoading:false,
            applyLoading:false,
            buyLoading:false,
            addLoading: false,
            scoreLoading:false,
            matchSelectForm:{
                matchId:'',
                matchPriceId:'',
                type:'',
                subType:'',
                price:'',
                points:''
            },
            matchSelectFormRules:{
                matchPriceId:[
                    { required: true, message: "请选择比赛价格", trigger: 'change' }
                ],
                matchId:[
                     { required: true, message: "请选择比赛", trigger: 'change' }
                ]
            },
            memberSelectForm: {
                phoneNo: '',
                name:'',
                payType: '',
                balance: '',
                points: '',
                couponId:'',
                couponList: []
            },
            memberSelectFormRules:{
                phoneNo:[
                   { required: true, message: "请输入手机号", trigger: 'blur' } 
                ],
                payType:[
                    { required: true, message: "请选择支付方式", trigger: 'change' }                         
                ],
                couponId:[
                    { validator:payTypeValidator,trigger:'change'}           
                ]
            },
            buyForm:{
                memberId:'',
                matchId:'',
                phoneNo:'',
                name:'',
                balance:'',
                points:'',
                perHand:'',
                handCount:'',
                totalPrice:'',
                remark:'',
                payType:''
            },
            buyFormRules:{
                handCount:[
                     { required: true, message: "请输入手数", trigger: 'blur' },
                     { pattern:/^[0-9]*[1-9][0-9]*$/,message:'请输入正确的手数',trigger: 'blur'}
                ],
                totalPrice:[
                    { required: true, message: "请输入总价", trigger: 'blur' },
                    { pattern:/^[0-9]+\.{0,1}[0-9]{0,2}$/,message:"必须为有效数字"}
                ],
                payType:[
                    { required: true, message: "请选择支付方式", trigger: 'change' },
                ],
                remark:[
                    { validator: buyFormRemarkValidator, trigger: 'blur' }
                ]
            },
            scoreForm:{
                attendanceId:'',
                memberId:'',
                matchId:'',
                matchName:'',
                phoneNo:'',
                name:'',
                matchRewardId:'',
                matchRewardList:[]
            },
            scoreFormRules:{
                matchRewardId:[
                    { required: true, message: "请选择奖励", trigger: 'change' }
                ]
            },
            selectedMatch:{
                matchConfig:{
                    name:''
                },
                closingDatetime:'',
                openingDatetime:''
            },
            selectedPrice:{
                points:'',
                price:''
            },
            selectedCoupon:{
                id:'',
                name:''
            },
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
            'editFormVisible',
            'thirdFormVisible',
            'payTypeConfig',
            'availableMembers'
        ])
    },
    methods: {
        formatOpening: function (val) {
            return util.formatDate.utcToLocal(val)
        },
        formatPrice: function (name, amount, points) {
            return name + '-' + amount + '元或' + points + '积分'
        },
        formatMatch: function (item) {
            if(item&&item.matchConfig){
                return item.matchConfig.name + '（' + util.formatDate.utcToLocal(item.closingDatetime) + '）'+'-'+item.matchConfig.Type.name+'-'+item.matchConfig.subType.name
            }
        },
        formatCouponName:function(item){
            return item.type.name+'-'+item.subType.name;
        },
        formatPayType:function(type){
            let str="";
            if(type=="1"){
                str="余额"
            }
            else if(type=="2"){
                str="积分"
            }else if(type=="3"){
                str="优惠券"
            }
            return str;
        },
        formatMatchReward:function(item){
            return `第${item.ranking}名-${item.rewardPoints}分`
        },
        handleCurrentChange(val) {
            this.$store.commit(types.COM_PAGE_NUM, val);
            this.getList();
        },
        handelMatchChange(matchId){
            let that=this;
            that.priceList=[];
            this.availableMatchList.forEach(oMatch=>{
                if(oMatch.id==matchId){
                    this.selectedMatch=oMatch;
                }
            })
            if(this.selectedMatch&&this.selectedMatch.matchConfig){
                this.matchSelectForm.type=this.selectedMatch.matchConfig.Type.id;
                this.matchSelectForm.subType=this.selectedMatch.matchConfig.subType.val;
                if(this.selectedMatch.matchConfig.matchPrices){
                    this.selectedMatch.matchConfig.matchPrices.forEach(oPrice=>{
                        that.priceList.push(oPrice)
                    })
                }
                else{
                    that.priceList=[];
                }
            }    
        },
        hanlePriceChange:function(id){
            let that=this;
            if(this.selectedMatch&&this.selectedMatch.matchConfig){
                 this.selectedMatch.matchConfig.matchPrices.forEach(oPrice=>{
                    if(oPrice.id==id){
                        that.selectedPrice=oPrice;
                    }
                })
            }
        },
        handleCouponChange:function(id){
            let that=this;
            if(this.memberSelectForm.couponList){
                this.memberSelectForm.couponList.forEach(oData=>{
                    if(id==oData.id){
                        that.selectedCoupon=oData;
                    }
                })
            }
        },
        getList() {
            this.$store.dispatch('getAttendanceList')
        },
        getMemberList:function(phoneNo){
            if (phoneNo!='') {
                this.selectLoading=true;
                this.$store.dispatch('getAllMembers',phoneNo).then(()=>{
                    this.selectLoading=false;
                },err=>{
                    this.selectLoading=false;
                })
            } 
        },
        handlePhoneChange:function(id){
            var that=this;
            let tmpCouponList=[];
            if(id){
                that.$store.dispatch('getAccountInfo',id).then((res)=>{
                that.memberSelectForm.balance=res.balance;
                that.memberSelectForm.points=res.points;
                that.memberSelectForm.name=res.name;
                if(res.coupon&&res.coupon.length){
                    res.coupon.forEach(oData=>{
                        if(oData.subType.val==that.matchSelectForm.subType){
                            tmpCouponList.push(oData);
                        }
                    })
                        that.memberSelectForm.couponList=tmpCouponList;
                    }
                });
            }       
        },
        handleAdd: function () {         
            this.$store.dispatch('getAvailableMatches');
            this.$store.commit(types.COM_ADD_FORM_VISIBLE, true);
        },
        handleStep1:function(){
            this.$refs.matchSelectForm.validate((valid)=>{
                if(valid){
                    this.resetMemberSelectForm();
                    this.activeStep=2;
                }
            })
        },
        handleBack1:function(){          
            this.activeStep=1;
        },
        handleStep2:function(){
             this.$refs.memberSelectForm.validate((valid)=>{
                if(valid){                   
                    this.activeStep=3;
                }
            })
        },
        handleBack2:function(){
            this.activeStep=2;
        },
        applySubmit:function(){
            let that=this;
            this.applyLoading=true;
            this.$store.dispatch('createOffline',{
                phoneNo:this.memberSelectForm.phoneNo,
                matchId:this.selectedMatch.id,
                matchPriceId:this.selectedPrice.id,
                payType:this.memberSelectForm.payType,
                couponId:this.memberSelectForm.couponId
            }).then(res=>{
                that.$message.success('报名成功！')
                that.applyLoading=false;
                that.getList();
            },err=>{
                that.applyLoading=false;
                that.$message.error(err.message);
            })
        },
        handleScore:function(index,row){
            let that=this;

            this.scoreForm.phoneNo=row.member.user.phoneNo;
            this.scoreForm.name=row.member.user.name;
            this.scoreForm.matchName=row.match.matchConfig.name;
            this.scoreForm.memberId=row.member.id;
            this.scoreForm.matchId=row.match.id;
            this.scoreForm.attendanceId=row.id;
            this.scoreForm.matchRewardList=[];

            this.$store.dispatch('getAccountInfo',row.member.user.phoneNo).then(res=>{
                that.scoreForm.balance=res.balance;
                that.scoreForm.points=res.points;
                that.$store.dispatch('findAllActive',row.match.matchConfigId).then(res=>{
                   res.forEach(oData=>{that.scoreForm.matchRewardList.push(oData)})
                })
            },err=>{

            })
            this.$store.dispatch('setThirdFormVisible',true);
        },
        handleAward:function(index,row){
            this.$confirm('确认要颁奖吗?', '提示', {
					type: 'warning'
				}).then(()=>{
					this.$store.dispatch('makeMatchReward',{"id":row.id,"memberId":row.memberId}).then(()=>{
						this.getList();
					},err=>{
						this.$message.error(err.message);
					})
				})		
        },
        handleBuy:function(index,row){
            this.buyForm.phoneNo=row.member.user.phoneNo;
            this.buyForm.name=row.member.user.name;
            this.buyForm.perHand=row.match.perHand;
            this.buyForm.memberId=row.member.id;
            this.buyForm.matchId=row.match.id;
            this.$store.dispatch('getAccountInfo',row.member.user.phoneNo).then(res=>{
                this.buyForm.balance=res.balance;
                this.buyForm.points=res.points;
            },err=>{

            })
            this.$store.commit(types.COM_EDIT_FORM_VISIBLE, true);
        },
        buyFormSubmit:function(){
            let that=this;
            let params={
                "memberId":this.buyForm.memberId,
                "matchId":this.buyForm.matchId,
                "quantity":this.buyForm.handCount,
                "payAmount":this.buyForm.totalPrice,
                "payType":this.buyForm.payType,
                "remark":this.buyForm.remark
            }

            this.$refs.buyForm.validate((valid)=>{
                if(valid){
                     that.buyLoading=true;
                     that.$store.dispatch('buyChips',params).then(res=>{
                        that.$message.success('重入成功')
                        that.buyLoading=false;
                    },(err)=>{
                        that.buyLoading=false;
                        that.$message.error(err.message);
                    })
                }
            })      
        },
        calcTotalPrice:function(obj){
            if(/^[0-9]*[1-9][0-9]*$/.test(obj.target.value)){
                this.buyForm.totalPrice=(obj.target.value*this.buyForm.perHand).toString();
            }else{
                this.buyForm.totalPrice='0';
            }  
        },
        scoreFormSubmit:function(){
            let that=this;
            let params={
                "id":this.scoreForm.attendanceId,
                "memberId":this.scoreForm.memberId,
                "matchId":this.scoreForm.matchId,
                "matchRewardId":this.scoreForm.matchRewardId
            }
            that.$refs.scoreForm.validate((valid)=>{
                if(valid){
                    that.scoreLoading=true;
                    that.$store.dispatch('setMatchReward',params).then(res=>{
                        that.scoreLoading=false;
                        that.$message.success('成绩设置成功')
                        that.$store.dispatch('setThirdFormVisible',false);
                        that.$refs.scoreForm.resetFields();
                        that.getList();
                    },err=>{
                        that.scoreLoading=false;
                        that.$message.error(err.message)
                    })
                }
            })
        },
        closeDialog: function (type) {
            if (type == "add") {
                this.activeStep=1;
                this.resetMatchSelectForm();
                this.resetMemberSelectForm();
                this.$store.commit(types.COM_ADD_FORM_VISIBLE, false);  
            }
            else {
                if(this.editFormVisible){
                     this.$refs.buyForm.resetFields();
                     this.$store.commit(types.COM_EDIT_FORM_VISIBLE, false);
                }else if(this.thirdFormVisible){
                    this.$refs.scoreForm.resetFields();
                    this.$store.dispatch('setThirdFormVisible',false);
                }            
            }
        },
        resetMatchSelectForm:function(){
            this.$refs.matchSelectForm.resetFields();        
            this.selectedPrice={
                price:'',
                points:''
            }
        },
        resetMemberSelectForm:function(){
            this.$refs.memberSelectForm.resetFields();
            this.memberSelectForm.phoneNo='';
            this.memberSelectForm.name='';
            this.memberSelectForm.payType='';
            this.memberSelectForm.balance='';
            this.memberSelectForm.points='';
            this.memberSelectForm.couponId='';
            this.memberSelectForm.couponList=[]
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

.label-item{
    margin-bottom:5px;
}
</style>