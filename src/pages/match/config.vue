<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="matchConfigFilters">
				<el-form-item label="名称">
					<el-input v-model="matchConfigFilters.name" placeholder="名称"></el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-select v-model="matchConfigFilters.type" placeholder="请选择类型" style="width:90px" clearable>
	                    <el-option
								v-for="item in matchTypeList"
								:label="item.name"
								:value="item.id">
						</el-option>					
					</el-select>
				</el-form-item>
                <el-form-item label="子类型">
					<el-select v-model="matchConfigFilters.type" placeholder="请选择类型" style="width:90px" clearable>
	                   	 <el-option label="平日赛" value="1"></el-option>
      					 <el-option label="周末赛" value="2"></el-option>	
                         <el-option label="月度会员杯赛" value="3"></el-option>	
                         <el-option label="年度会员杯赛" value="4"></el-option>			
					</el-select>
				</el-form-item>
                <el-form-item label="状态">
					<el-select v-model="matchConfigFilters.status" placeholder="请选择状态" style="width:90px" clearable>
						 <el-option label="启用" value="1"></el-option>
      					 <el-option label="禁用" value="2"></el-option>
					</el-select>
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
		<el-table :data="matchConfig_List" v-loading="listLoading" style="width: 100%;">			
			<el-table-column  prop="id" label="id" width="55">
			</el-table-column>
			<el-table-column label="名称" prop="name">
			</el-table-column>
			<el-table-column label="类型" width="70">
				<template scope="scope">
					<span>{{scope.row.Type.name}}</span>
				</template>
			</el-table-column>
            <el-table-column label="子类型">
				<template scope="scope">
					<span>{{scope.row.subType.name}}</span>
				</template>
			</el-table-column>			
			<el-table-column prop="status" label="状态" :formatter="formatStatus" width="70">
			</el-table-column>
            <el-table-column prop="status" label="价格配置">
                <template scope="scope">
					<el-popover ref="pricePopover" placement="right" width="200" trigger="hover">
                        <el-table :data="scope.row.matchPrices">
                            <el-table-column width="120" label="名称">
                                <template scope="scope">
					                <span>{{scope.row.type.name}}</span>
				                </template>
                            </el-table-column>
                            <el-table-column width="80" property="price" label="价格"></el-table-column>
                        </el-table>
                    </el-popover>
                    <span v-popover:pricePopover class="view">查看价格</span>
                </template>
			</el-table-column>
            <el-table-column prop="status" label="奖励配置" >
                <template scope="scope">
					<el-popover ref="rewardPopover" placement="right" width="200" trigger="hover">
                        <el-table :data="scope.row.matchRewards">
                            <el-table-column width="80" label="名次" prop="ranking">
                            </el-table-column>
                            <el-table-column width="120" property="rewardPoints" label="奖励积分"></el-table-column>
                        </el-table>
                    </el-popover>
                    <span v-popover:rewardPopover class="view">查看配置</span>
				</template>
			</el-table-column>
            <el-table-column prop="holder" label="举办方">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope"> 
					<el-button type="info" size="small" @click="handleEdit(scope.$index, scope.row)">
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
		<el-dialog title="编辑赛事配置" v-model="editFormVisible" :close-on-click-modal="true" @close="closeDialog('edit')">
            <template>
                <el-tabs v-model="activeTab" @tab-click="handleTabClick">
                    <el-tab-pane label="基本信息" name="base">
                        <el-form :model="matchConfigDetails" label-width="100px" :rules="editFormRules" ref="editForm">
                            <el-form-item label="ID" prop="id">
                                <el-col :span="5">
                                    <el-input v-model="matchConfigDetails.id"  auto-complete="off" :disabled="true"></el-input>
                                </el-col>				
                            </el-form-item>
                            <el-form-item label="名称" prop="name">
                                <el-col :span="5">
                                    <el-input v-model="matchConfigDetails.name"  auto-complete="off"></el-input>
                                </el-col>				
                            </el-form-item>
                            <el-form-item label="类型" prop="type">
                                <el-select v-model="matchConfigDetails.type" placeholder="请选择类型" clearable>
                                    <el-option
                                            v-for="item in matchTypeList"
                                            :label="item.name"
                                            :value="item.id.toString()">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="子类型" prop="subType"> 
                                <el-select v-model="matchConfigDetails.subType" placeholder="请选择子类型" style="width:150px" clearable>
                                    <el-option label="平日赛" value="1"></el-option>
                                    <el-option label="周末赛" value="2"></el-option>	
                                    <el-option label="月度会员杯赛" value="3"></el-option>	
                                    <el-option label="年度会员杯赛" value="4"></el-option>			
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态" prop="status">
                                <el-switch on-text="启用" off-text="禁用" v-model="matchConfigDetails.status"></el-switch>
                            </el-form-item>
                            <el-form-item label="举办方" prop="holder">
                                <el-col :span="12">
                                    <el-input v-model="matchConfigDetails.holder"  auto-complete="off"></el-input>
                                </el-col>				
                            </el-form-item>
                            <el-form-item label="赛事介绍Url" prop="url">
                                <el-col :span="5">
                                    <el-input v-model="matchConfigDetails.url"  auto-complete="off"></el-input>
                                </el-col>				
                            </el-form-item>
                            <el-form-item label="是否Online" prop="online">
                                <el-switch on-text="是" off-text="否" v-model="matchConfigDetails.online"></el-switch>
                            </el-form-item>
                            <el-form-item label="配置描述" prop="description">
                                <el-col :span="15">
                                    <el-input v-model="matchConfigDetails.description"  auto-complete="off"></el-input>
                                </el-col>				
                            </el-form-item>
                            <el-form-item>
                                <el-button  @click.native="closeDialog('edit')">取消</el-button>
                                <el-button type="primary" @click.native="editBaseInfoSubmit" :loading="editLoading">保存</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="价格信息" name="price">
                        配置管理
                    </el-tab-pane>
                    <el-tab-pane label="奖励配置" name="reward">
                        角色管理
                    </el-tab-pane>
                </el-tabs>
            </template>
		
			<!--<div slot="footer" class="dialog-footer">
				<el-button @click.native="closeDialog('edit')">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>-->
		</el-dialog>

		
	    <!--<el-dialog title="添加赛事配置" v-model="addFormVisible" :close-on-click-modal="true" @close="closeDialog('add')">
			<el-form :model="addForm" label-width="100px" :rules="editFormRules" ref="addForm">
				<el-form-item label="类型" prop="matchConfigId">
					<el-select v-model="addForm.matchConfigId" placeholder="请选择赛事类型" clearable>
						<el-option
								v-for="item in matchConfigList"
								:label="item.name"
								:value="item.id.toString()">
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
				<el-button @click.native="closeDialog('add')">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
			</div>
		</el-dialog>-->
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
                activeTab:'base',			
				editFormRules:{
                    name:[
						{ required: true,message:"请选择名称", trigger: 'blur' }
					],
					type:[
						{ required: true,message:"请选择赛事类型", trigger: 'change' }
					],
                    subType:[
						{ required: true,message:"请选择赛事类型", trigger: 'change' }
					],
					status:[
						{type:"boolean",required: true, message: '请选择状态', trigger: 'change'}
					],
                    online:[
						{type:"boolean",required: true, message: '请选择是否是online', trigger: 'change'}
					],
					holder:[
                        {required: true, message: '请输入赛事主办方', trigger: 'blur'}
                    ]
				},
				editLoading:false,
				addLoading:false
			}
		},
		computed: {
			...mapGetters([
				'matchConfig_List',
				'matchTypeList',
				'matchConfigDetails',
				'matchConfigFilters',
				'listLoading',
				'editFormVisible',
				'addFormVisible',
				'total',
				'addMatchConfigForm'
			])
		},
		methods: {
			formatStatus:function(row,column){
				let str="启用";
				if(row.status=="1"){
					str="启用";
				}
				else if(row.status=="2"){
					str="禁用";
				}
				return str;
			},
			handleCurrentChange(val) {
				this.$store.commit(types.COM_PAGE_NUM,val);
				this.getList();
			},
			getList() {				
				this.$store.dispatch('getMatchConfigList')
			},
			getMatchTypeList(){
				if(this.matchTypeList.length==0){
					this.$store.dispatch('getMatchTypeList');
				}
			},
			handleEdit: function (index, row) {
                this.$store.dispatch('getMatchConfigDetails',{
					id:row.id
				});
			},
			handleAdd:function(){
				this.$store.commit(types.COM_ADD_FORM_VISIBLE,true);	
			},
			handleDel:function(id){
				if(this.delLoading){return false}
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(()=>{
					this.$store.dispatch('delMatchConfig',id).then(()=>{
						this.getList();
					},err=>{
						this.$message.error(err.message);
					})
				})			
			},
            handleTabClick:function(tab,event){
                 console.log(tab, event);
            },
			editBaseInfoSubmit: function () {
				if(this.editLoading){return false}
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.editLoading=true;
						this.$store.dispatch("editMatchConfig").then(res=>{
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
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.addLoading=true;
						this.$store.dispatch("addMatchConfig").then(res=>{
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
					// this.$refs.addForm.resetFields();
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
    .view{
        cursor: pointer;
        color: #50bfff;
    }
</style>