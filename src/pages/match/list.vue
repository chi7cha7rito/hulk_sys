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
			<el-table-column type="selection" width="55">
			</el-table-column>
			
			<el-table-column  prop="id" label="id">
			</el-table-column>
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
					<el-button type="danger" size="small">删除</el-button>
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
								:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态" prop="status">
					<el-select v-model="matchDetails.status" placeholder="请选择赛事状态" clearable>
						<el-option label="已开始" value="1"></el-option>
						<el-option label="已结束" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="报名时间" prop="openingDatetime">
					<el-date-picker v-model="matchDetails.openingDatetime" type="date" placeholder="选择日期"  style="width: 40%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="比赛时间" prop="closingDatetime">
					<el-date-picker v-model="matchDetails.closingDatetime" type="date" placeholder="选择日期"  style="width: 40%;"></el-date-picker>
				</el-form-item>
				<el-form-item label="每首价格" prop="perHand">
					<el-col :span="5">
						<el-input v-model.number="matchDetails.perHand"  auto-complete="off"></el-input>
					</el-col>				
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="closeDialog">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--添加界面-->
	    <el-dialog title="添加赛事" v-model="addFormVisible" :close-on-click-modal="true" @close="closeDialog('add')">
			<el-form :model="addForm" label-width="100px" :rules="editFormRules" ref="addForm">
				<el-form-item label="类型" prop="matchConfigId">
					<el-select v-model="addForm.matchConfigId" placeholder="请选择赛事类型" clearable>
						<el-option
								v-for="item in matchConfigList"
								:label="item.name"
								:value="item.id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态" prop="status">
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
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="closeDialog">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
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
			var typeValidator=(rule,value,callback)=>{
				if(!value){
					return callback(new Error('请选择赛事类型'));
				}
				else{
					callback();
				}
			}

			return {				
				sels: [],
				editFormRules:{
					matchConfigId:[
						{ required: true,validator:typeValidator, trigger: 'change' }
					],
					status:[
						{required: true, message: '请选择赛事状态', trigger: 'change'}
					],
					openingDatetime:[
						{type:'date',required: true, message: '请选择报名时间', trigger: 'change'}
					],
					closingDatetime:[
						{type:'date',required: true, message: '请选择比赛时间', trigger: 'change'}
					],
					perHand:[
						{ required: true, message: '请填写每手价格'},
						{ type: 'number', message: '价格必须为数字值'}
					]
				},
				editLoading:false
			}
		},
		computed: {
			...mapGetters([
				'matchList',
				'matchTypeList',
				'matchDetails',
				'matchConfigList',
				'filters',
				'listLoading',
				'editFormVisible',
				'addFormVisible',
				'total',
				'addForm'
			])
		},
		methods: {
			formatStatus:function(row,column){
				return row.status=="1"?"已开始":"已结束";
			},
			formatSatrtDate: function(row, column) {
				return util.formatDate.utcToLocal(row.openingDatetime)
			},
			formatEndDate: function(row, column) {
				return util.formatDate.utcToLocal(row.closingDatetime)
			},
			handleCurrentChange(val) {
				this.$store.commit(types.CHANGE_MATCH_LIST_PAGE_NUM,val);
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
				this.$store.commit(types.MATCH_LIST_ADD_FORM_VISIBLE,true);	
			},
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$store.dispatch("editMatch").then(res=>{
							this.getList();
						},err=>{
							this.$message.error(err.message);
						}).catch(err=>{
							this.$message.error(err.message);
						})
					}
				});
			},
			closeDialog:function(type){
				if(type=="add"){
					this.$refs.addForm.resetFields();
					this.$store.commit(types.MATCH_LIST_ADD_FORM_VISIBLE,false);
				}
				else{
					this.$refs.editForm.resetFields();
					this.$store.commit(types.MATCH_LIST_EDIT_FORM_VISIBLE,false);
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