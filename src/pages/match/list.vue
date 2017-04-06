<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="名称">
					<el-input v-model="filters.name" placeholder="赛事名称"></el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="filters.type" placeholder="请选择类型" style="width:90px" clearable>
						<el-option
								v-for="item in matchTypeList"
								:label="item.name"
								:value="item.id">
						</el-option>						
					</el-select>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="filters.status" placeholder="请选择状态" style="width:90px" clearable>
						 <el-option label="已开始" value="1"></el-option>
      					 <el-option label="已结束" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="是否在线报名">
					<el-select v-model="filters.applyOnline" placeholder="请选择状态" style="width:90px" clearable>
						 <el-option label="是" :value="1"></el-option>
      					 <el-option label="否" :value="0"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="报名时间">
					<el-col :span="10">
						<el-date-picker v-model="filters.startClosing" type="date" placeholder="开始日期"  style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="4">--</el-col>
					<el-col :span="10">
						<el-date-picker v-model="filters.endClosing" type="date" placeholder="结束日期"  style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	
		<!--列表-->
		<el-table :data="matchList"  v-loading="listLoading" style="width: 100%;">
			<!--<el-table-column type="selection" width="55">
			</el-table-column>-->
			<el-table-column label="赛事名称">
				<template scope="scope">
						<span>{{scope.row.matchConfig.name}}</span>
				</template>
			</el-table-column>
			<el-table-column label="类型">
				<template scope="scope">
					<span>{{scope.row.matchConfig.Type.name}}</span>
				</template>
			</el-table-column>		
			<el-table-column prop="status" label="状态" :formatter="formatStatus">
			</el-table-column>
			<el-table-column prop="perHand" label="每首价格">
			</el-table-column>
			<el-table-column prop="openingDatetime" label="比赛时间" :formatter="formatSatrtDate">
			</el-table-column>
			<el-table-column prop="closingDatetime" label="报名时间" :formatter="formatEndDate">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">
						编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.row.id)" >删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!--<el-button type="danger" :disabled="this.sels.length===0">批量删除</el-button>-->
			<el-pagination layout="prev, pager, next" :page-size="10" :total="total"  
				@current-change="handleCurrentChange" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑赛事" v-model="editFormVisible" :close-on-click-modal="true" @close="closeDialog('edit')">
			<el-form :model="matchDetails" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item label="ID" prop="id">
					<el-col :span="5">
						<el-input v-model="matchDetails.id"  auto-complete="off" :disabled="true"></el-input>
					</el-col>				
				</el-form-item>
				<el-form-item label="类型" prop="matchConfigId">
					<el-select v-model="matchDetails.matchConfigId" placeholder="请选择赛事类型" clearable>
						<el-option
								v-for="item in matchConfigList"
								:label="item.name"
								:value="item.id.toString()">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-select v-model="matchDetails.status" placeholder="请选择赛事状态" clearable>
						<el-option label="已开始" value="1"></el-option>
						<el-option label="已结束" value="2"></el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="比赛时间" prop="openingDatetime">
					<el-date-picker v-model="matchDetails.openingDatetime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期"  style="width: 40%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="报名时间" prop="closingDatetime">
					<el-date-picker v-model="matchDetails.closingDatetime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期"  style="width: 40%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="每首价格" prop="perHand">
					<el-col :span="5">
						<el-input v-model.number="matchDetails.perHand"  auto-complete="off"></el-input>
					</el-col>				
				</el-form-item>
				<el-form-item label="在线报名" prop="applyOnline">
					<el-switch on-text="启用" off-text="禁用" v-model="matchDetails.applyOnline"></el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="closeDialog('edit')">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--添加界面-->
	    <el-dialog title="添加赛事" v-model="addFormVisible" :close-on-click-modal="true" @close="closeDialog('add')">
			<el-form :model="addMatchForm" label-width="100px" :rules="addFormRules" ref="addMatchForm">
				<el-form-item label="类型" prop="matchConfigId">
					<el-select v-model="addMatchForm.matchConfigId" placeholder="请选择赛事类型" clearable>
						<el-option
								v-for="item in matchConfigList"
								:label="item.name"
								:value="item.id.toString()">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="比赛时间" prop="openingDatetime">
					<el-date-picker v-model="addMatchForm.openingDatetime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期"  style="width: 40%;" :picker-options="pickerOptions1"></el-date-picker>
				</el-form-item>
				<el-form-item label="报名时间" prop="closingDatetime">
					<el-date-picker v-model="addMatchForm.closingDatetime" type="datetime" format="yyyy-MM-dd HH:mm" placeholder="选择日期"  style="width: 40%;" :picker-options="pickerOptions1"></el-date-picker>
				</el-form-item>
				<el-form-item label="每首价格" prop="perHand">
					<el-col :span="5">
						<el-input v-model.number="addMatchForm.perHand"  auto-complete="off"></el-input>
					</el-col>				
				</el-form-item>
				<el-form-item label="在线报名" prop="applyOnline">
					<el-switch on-text="启用" off-text="禁用" v-model="addMatchForm.applyOnline"></el-switch>
				</el-form-item>
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
	import moment from 'moment'

	import * as types from '../../vuex/types'
	
	import util from '../../common/js/util'
	
	export default {
		data() {
			let that=this;

			//添加比赛开始时间validator
			let closeingDateTimeValidator=(rule,value,callback)=>{
				let dateNow=moment().format('YYYY-MM-DD HH:mm');
				let openingDatetime=moment(that.addMatchForm.openingDatetime.toString()).format('YYYY-MM-DD HH:mm');
				let tmpDate=moment(value.toString()).format('YYYY-MM-DD HH:mm');
				if(tmpDate<dateNow){
					callback(new Error('报名截止时间必须大于当前时间'))
				}
				else{
					if(tmpDate>=openingDatetime&&openingDatetime){
						callback(new Error('报名截止时间必须小于比赛开始时间'))
					}
					else{
						callback();
					}
				}
			}

			//添加比赛开始时间validator
			let openingDatetimeValidator=(rule,value,callback)=>{
				let dateNow=moment().format('YYYY-MM-DD HH:mm');
				let closingDatetime=moment(that.addMatchForm.closingDatetime.toString()).format('YYYY-MM-DD HH:mm');
				let tmpDate=moment(value.toString()).format('YYYY-MM-DD HH:mm');
				if(tmpDate<dateNow){
					callback(new Error('比赛开始时间必须大于当前时间'))
				}
				else{
					if(tmpDate<=closingDatetime&&closingDatetime){
						callback(new Error('比赛开始时间必须大于报名截止时间'))
					}
					else{
						callback();
					}
				}
			}

			//编辑比赛开始时间validator
			let editCloseingDateTimeValidator=(rule,value,callback)=>{
				let dateNow=moment().format('YYYY-MM-DD HH:mm');
				let openingDatetime=moment(that.matchDetails.openingDatetime.toString()).format('YYYY-MM-DD HH:mm');
				let tmpDate=moment(value.toString()).format('YYYY-MM-DD HH:mm');
				if(tmpDate<dateNow){
					callback(new Error('报名截止时间必须大于当前时间'))
				}
				else{
					if(tmpDate>=openingDatetime&&openingDatetime){
						callback(new Error('报名截止时间必须小于比赛开始时间'))
					}
					else{
						callback();
					}
				}
			}

			//编辑比赛开始时间validator
			let editOpeningDatetimeValidator=(rule,value,callback)=>{
				let dateNow=moment().format('YYYY-MM-DD HH:mm');
				let closingDatetime=moment(that.matchDetails.closingDatetime.toString()).format('YYYY-MM-DD HH:mm');
				let tmpDate=moment(value.toString()).format('YYYY-MM-DD HH:mm');
				if(tmpDate<dateNow){
					callback(new Error('比赛开始时间必须大于当前时间'))
				}
				else{
					if(tmpDate<=closingDatetime&&closingDatetime){
						callback(new Error('比赛开始时间必须大于报名截止时间'))
					}
					else{
						callback();
					}
				}
			}

			return {				
				sels: [],
				editFormRules:{
					matchConfigId:[
						{ required: true,message:"请选择赛事类型", trigger: 'change' }
					],
					status:[
						{required: true, message: '请选择赛事状态', trigger: 'change'}
					],
					openingDatetime:[
						{type:'date',required: true, message: '请选择报名时间', trigger: 'change'},
						{validator:editOpeningDatetimeValidator,trigger:'change'}
					],
					closingDatetime:[
						{type:'date',required: true, message: '请选择比赛时间', trigger: 'change'},
						{validator:editCloseingDateTimeValidator,trigger:'change'}
					],
					perHand:[
						{ required: true, message: '请填写每手价格'},
						{ type: 'number', message: '价格必须为数字值'}
					]
				},
				addFormRules:{
					matchConfigId:[
						{ required: true,message:"请选择赛事类型", trigger: 'change' }
					],
					openingDatetime:[
						{type:'date',required: true, message: '请选择报名时间', trigger: 'change'},
						{validator:openingDatetimeValidator,trigger:'change'}
					],
					closingDatetime:[
						{type:'date',required: true, message: '请选择比赛时间', trigger: 'change'},
						{validator:closeingDateTimeValidator,trigger:'change'}
					],
					perHand:[
						{ required: true, message: '请填写每手价格'},
						{ type: 'number', message: '价格必须为数字值'}
					]
				},
				pickerOptions1:{
					disabledDate:function(obj){
						let tmpDate=moment(obj.toString()).format('YYYY-MM-DD')
						let dateNow=moment().format('YYYY-MM-DD');
						if(tmpDate<dateNow){
							return true;
						}else{
							return false;
						}
					}
				},
				editLoading:false,
				addLoading:false
			}
		},
		computed: {
			...mapGetters([
				'matchList',
				'matchTypeList',
				'matchDetails',
				'matchConfigList',
				'filters',
				'editFormVisible',
				'listLoading',
				'addFormVisible',
				'total',
				'addMatchForm',
				'userInfo'
			])
		},
		methods: {
			formatStatus:function(row,column){
				let str="已开始";
				if(row.status=="1"){
					str="已开始";
				}
				else if(row.status=="2"){
					str="已结束";
				}
				else if(row.status=="3"){
					str="已删除";
				}

				return str;
			},
			formatSatrtDate: function(row, column) {
				return util.formatDate.utcToLocal(row.openingDatetime)
			},
			formatEndDate: function(row, column) {
				return util.formatDate.utcToLocal(row.closingDatetime)
			},
			handleCurrentChange(val) {
				this.$store.commit(types.COM_PAGE_NUM,val);
				this.getList();
			},
			getList() {				
				this.$store.dispatch('getMatchList')
				this.$store.dispatch('getAllMatchConfigs');
			},
			getMatchTypeList(){
				if(this.matchTypeList.length==0){
					this.$store.dispatch('getMatchTypeList');
				}
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.$store.dispatch('getMatchDetails',{
					id:row.id
				})
			},
			handleAdd:function(){
				this.$store.commit(types.COM_ADD_FORM_VISIBLE,true);	
			},
			handleDel:function(id){
				if(this.delLoading){return false}
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(()=>{
					this.$store.dispatch('delMatch',id).then(()=>{
						this.getList();
					},err=>{
						this.$message.error(err.message);
					})
				})			
			},
			editSubmit: function () {
				if(this.editLoading){return false}
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.editLoading=true;
						this.$store.dispatch("editMatch").then(res=>{
							this.editLoading=false;
							this.getList();
						},err=>{
							this.editLoading=false;
							this.$message.error(err.message);
						})
					}
				});
			},
			addSubmit:function(){
				if(this.addLoading){return false}
				this.$refs.addMatchForm.validate((valid) => {
					if (valid) {
						this.addLoading=true;
						this.$store.dispatch("addMatch").then(res=>{
							this.addLoading=false;
							this.getList();
						},err=>{
							this.addLoading=false;
							this.$message.error(err.message);
						})
					}
				});
			},
			closeDialog:function(type){
				if(type=="add"){
					this.$refs.addMatchForm.resetFields();
					this.$store.commit(types.COM_ADD_FORM_VISIBLE,false);
				}
				else{
					this.$refs.editForm.resetFields();
					this.$store.commit(types.COM_EDIT_FORM_VISIBLE,false);
				}						
			}
		},
		mounted() {
			this.getMatchTypeList();
			this.getList();
		}
	}
</script>

<style scoped>
	.line{
		text-align:center;
	}
</style>