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
					<el-select v-model="matchConfigFilters.subType" placeholder="请选择类型" style="width:90px" clearable>
	                   	<el-option
							v-for="item in subTypeConfigs"
								:label="item.name"
								:value="item.id.toString()">
                        </el-option>			
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
					<el-popover ref="pricePopover" placement="left" width="300" trigger="hover">
                        <el-table :data="scope.row.matchPrices">
                            <el-table-column width="120" label="名称">
                                <template scope="scope">
					                <span>{{scope.row.type.name}}</span>
				                </template>
                            </el-table-column>
                            <el-table-column width="90" property="price" label="价格"></el-table-column>
							<el-table-column width="90" property="points" label="积分"></el-table-column>
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

		<!--编辑界面 start-->
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
                                    <el-option
										v-for="item in subTypeConfigs"
											:label="item.name"
											:value="item.id.toString()">
                                    </el-option>			
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
                                <el-col :span="15">
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
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="价格信息" name="price">
						<el-form label-width="60px" ref="editPriceForm" :model="matchPricesEditForm">
							<el-form-item>
								<el-button type="success" icon="plus" style="float:right;margin-right:20px" size="small" @click.native="handleAddPrice('edit')">添加价格配置</el-button>
                            </el-form-item>
							<el-row v-for="(data,index) in matchPricesEditForm.priceList">
								<el-col :span="7">
									<el-form-item label="类型" :prop="'priceList.' + index.toString() + '.type'" :key="data.key"
										:rules="[{required: true, message: '类型不能为空', trigger: 'change'},
												{validator:priceValidator,trigger:'change'}]">
										<el-col :span="24">
											<el-select v-model="data.type" placeholder="请选择类型" clearable>
                                    		<el-option
													v-for="item in pricesConfigs"
													:label="item.name"
													:value="item.id.toString()">
                                    			</el-option>
                                			</el-select>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="价格" :prop="'priceList.' + index.toString() + '.price'" :key="data.key"
										:rules="[
										{ required: true, message: '请输入价格', trigger: 'blur' },
										{ pattern:/^[0-9]*[1-9][0-9]*$/, message: '价格必须为数字', trigger: 'blur,change' }
										]" >
										<el-col>
											<el-input v-model="data.price"  auto-complete="off"></el-input>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="积分" :prop="'priceList.' + index.toString() + '.points'" :key="data.key" 
										:rules="[
										{ required: true, message: '请输入积分', trigger: 'blur' },
										{ pattern:/^[0-9]*[1-9][0-9]*$/, message: '积分必须为正整数', trigger: 'blur,change' }
										]">
										<el-col :span="24">
											<el-input v-model="data.points"  auto-complete="off"></el-input>
										</el-col>
									</el-form-item>
								</el-col>	
								 <el-col :span="5">
									<el-form-item label="状态" :prop="'priceList.' + index.toString() + '.status'">
										<el-col>
											<el-switch on-text="启用" off-text="禁用" v-model="data.status"></el-switch>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="2">
									<el-col class="del_price">
										<el-button type="danger" icon="delete"  size="small" @click.native="handleDelPrice({'item':data,'type':'edit'})"></el-button>
									</el-col>	
								</el-col>						
							</el-row>
						</el-form>
                    </el-tab-pane>
                    <el-tab-pane label="奖励配置" name="reward">
                        <el-form label-width="60px" ref="editRewardForm" :model="matchRewardEditForm">
							<el-form-item>
								<el-button type="success" icon="plus" style="float:right;margin-right:20px" size="small" @click.native="handleAddReward('edit')">添加奖励配置</el-button>
                            </el-form-item>
							<el-row v-for="(data,index) in matchRewardEditForm.rewardList">
								<el-col :span="7">
									<el-form-item label="名次" :prop="'rewardList.' + index.toString() + '.ranking'" :key="data.key"
										:rules="[{required: true, message: '名次不能为空', trigger: 'change'},
												{validator:rewardValidator,trigger:'change'}]">
										<el-col :span="24">
											<el-select v-model="data.ranking" placeholder="请选择名次" clearable>
                                    		<el-option
													v-for="item in rewardConfigs"
													:label="item.name"
													:value="item.id.toString()">
                                    			</el-option>
                                			</el-select>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="7">
									<el-form-item label="积分" :prop="'rewardList.' + index.toString() + '.rewardPoints'" :key="data.key" 
										:rules="[
										{ required: true, message: '请输入积分', trigger: 'blur' },
										{ pattern:/^[0-9]*[1-9][0-9]*$/, message: '积分必须为正整数', trigger: 'blur,change' }
										]">
										<el-col :span="24">
											<el-input v-model="data.rewardPoints"  auto-complete="off"></el-input>
										</el-col>
									</el-form-item>
								</el-col>	
								 <el-col :span="5">
									<el-form-item label="状态" :prop="'rewardList.' + index.toString() + '.status'">
										<el-col>
											<el-switch on-text="启用" off-text="禁用" v-model="data.status"></el-switch>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-col class="del_reward">
										<el-button type="danger" icon="delete"  size="small" @click.native="handleDelReward({'item':data,'type':'edit'})"></el-button>
									</el-col>	
								</el-col>						
							</el-row>
						</el-form>
                    </el-tab-pane>
                </el-tabs>
            </template>
		
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="closeDialog('edit')">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
			</div>
		</el-dialog>
		<!--编辑界面 end-->

		<!--添加界面 start-->
		<el-dialog title="添加赛事配置" v-model="addFormVisible" :close-on-click-modal="true" @close="closeDialog('add')">
            <template>
                <el-tabs v-model="activeTab" @tab-click="handleTabClick">
                    <el-tab-pane label="基本信息" name="base">
                        <el-form :model="addMatchConfigForm" label-width="100px" :rules="editFormRules" ref="addForm">
                            <el-form-item label="名称" prop="name">
                                <el-col :span="5">
                                    <el-input v-model="addMatchConfigForm.name"  auto-complete="off"></el-input>
                                </el-col>				
                            </el-form-item>
                            <el-form-item label="类型" prop="type">
                                <el-select v-model="addMatchConfigForm.type" placeholder="请选择类型" clearable>
                                    <el-option
                                            v-for="item in matchTypeList"
                                            :label="item.name"
                                            :value="item.id.toString()">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="子类型" prop="subType"> 
                                <el-select v-model="addMatchConfigForm.subType" placeholder="请选择子类型" style="width:150px" clearable>
                                  	 <el-option
										v-for="item in subTypeConfigs"
											:label="item.name"
											:value="item.id.toString()">
                                    </el-option>			
                                </el-select>
                            </el-form-item>
                            <el-form-item label="状态" prop="status">
                                <el-switch on-text="启用" off-text="禁用" v-model="addMatchConfigForm.status"></el-switch>
                            </el-form-item>
                            <el-form-item label="举办方" prop="holder">
                                <el-col :span="12">
                                    <el-input v-model="addMatchConfigForm.holder"  auto-complete="off"></el-input>
                                </el-col>				
                            </el-form-item>
                            <el-form-item label="赛事介绍Url" prop="url">
                                <el-col :span="15">
                                    <el-input v-model="addMatchConfigForm.url"  auto-complete="off"></el-input>
                                </el-col>				
                            </el-form-item>
                            <el-form-item label="是否Online" prop="online">
                                <el-switch on-text="是" off-text="否" v-model="addMatchConfigForm.online"></el-switch>
                            </el-form-item>
                            <el-form-item label="配置描述" prop="description">
                                <el-col :span="15">
                                    <el-input v-model="addMatchConfigForm.description"  auto-complete="off"></el-input>
                                </el-col>				
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="价格信息" name="price">
						<el-form label-width="60px" ref="addPriceForm" :model="matchPricesAddForm">
							<el-form-item>
								<el-button type="success" icon="plus" style="float:right;margin-right:20px" size="small" @click.native="handleAddPrice('add')">添加价格配置</el-button>
                            </el-form-item>
							<el-row v-for="(data,index) in matchPricesAddForm.priceList">
								<el-col :span="7">
									<el-form-item label="类型" :prop="'priceList.' + index.toString() + '.type'" :key="data.key"
										:rules="[{required: true, message: '类型不能为空', trigger: 'change'},
												{validator:priceValidatorForAdd,trigger:'change'}]">
										<el-col :span="24">
											<el-select v-model="data.type" placeholder="请选择类型" clearable>
                                    			<el-option
													v-for="item in pricesConfigs"
													:label="item.name"
													:value="item.id.toString()">
                                    			</el-option>
                                			</el-select>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="价格" :prop="'priceList.' + index.toString() + '.price'" :key="data.key"
										:rules="[
										{ required: true, message: '请输入价格', trigger: 'blur' },
										{ pattern:/^[0-9]*[1-9][0-9]*$/, message: '必须为数字', trigger: 'blur,change' }
										]" >
										<el-col>
											<el-input v-model="data.price"  auto-complete="off"></el-input>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="5">
									<el-form-item label="积分" :prop="'priceList.' + index.toString() + '.points'" :key="data.key" 
										:rules="[
										{ required: true, message: '请输入积分', trigger: 'blur' },
										{ pattern:/^[0-9]*[1-9][0-9]*$/, message: '必须为正整数', trigger: 'blur,change' }
										]">
										<el-col :span="24">
											<el-input v-model="data.points"  auto-complete="off"></el-input>
										</el-col>
									</el-form-item>
								</el-col>	
								 <el-col :span="5">
									<el-form-item label="状态" :prop="'priceList.' + index.toString() + '.status'">
										<el-col>
											<el-switch on-text="启用" off-text="禁用" v-model="data.status"></el-switch>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="2">
									<el-col class="del_price">
										<el-button type="danger" icon="delete"  size="small" @click.native="handleDelPrice({'item':data,'type':'add'})"></el-button>
									</el-col>	
								</el-col>						
							</el-row>
						</el-form>
                    </el-tab-pane>
                    <el-tab-pane label="奖励配置" name="reward">
                        <el-form label-width="60px" ref="addRewardForm" :model="matchRewardAddForm">
							<el-form-item>
								<el-button type="success" icon="plus" style="float:right;margin-right:20px" size="small" @click.native="handleAddReward('add')">添加奖励配置</el-button>
                            </el-form-item>
							<el-row v-for="(data,index) in matchRewardAddForm.rewardList">
								<el-col :span="7">
									<el-form-item label="名次" :prop="'rewardList.' + index.toString() + '.ranking'" :key="data.key"
										:rules="[{required: true, message: '名次不能为空', trigger: 'change'},
												{validator:rewardValidatorForAdd,trigger:'change'}]">
										<el-col :span="24">
											<el-select v-model="data.ranking" placeholder="请选择名次" clearable>
                                    		<el-option
													v-for="item in rewardConfigs"
													:label="item.name"
													:value="item.id.toString()">
                                    			</el-option>
                                			</el-select>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="7">
									<el-form-item label="积分" :prop="'rewardList.' + index.toString() + '.rewardPoints'" :key="data.key" 
										:rules="[
										{ required: true, message: '请输入积分', trigger: 'blur' },
										{ pattern:/^[0-9]*[1-9][0-9]*$/, message: '必须为正整数', trigger: 'blur,change' }
										]">
										<el-col :span="24">
											<el-input v-model="data.rewardPoints"  auto-complete="off"></el-input>
										</el-col>
									</el-form-item>
								</el-col>	
								 <el-col :span="5">
									<el-form-item label="状态" :prop="'rewardList.' + index.toString() + '.status'">
										<el-col>
											<el-switch on-text="启用" off-text="禁用" v-model="data.status"></el-switch>
										</el-col>
									</el-form-item>
								</el-col>
								<el-col :span="4">
									<el-col class="del_reward">
										<el-button type="danger" icon="delete"  size="small" @click.native="handleDelReward({'item':data,'type':'add'})"></el-button>
									</el-col>	
								</el-col>						
							</el-row>
						</el-form>
                    </el-tab-pane>
                </el-tabs>
            </template>
		
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="closeDialog('add')">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
			</div>
		</el-dialog>
		<!--添加界面 end-->
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
				'addMatchConfigForm',
				'pricesConfigs',
				'rewardConfigs',
				'subTypeConfigs',
				'matchPricesEditForm',
				'matchPricesAddForm',
				'matchRewardEditForm',
				'matchRewardAddForm'
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
                
            },
			editSubmit: function () {
				let that=this;
				if(this.editLoading){return false}
				that.$refs.editForm.validate(function(valid){				
					if (valid) {
						that.$refs.editPriceForm.validate(function(valid){
							if(valid){
								that.$refs.editRewardForm.validate(function(valid){
									if(valid){
										that.editLoading=true;
										that.$store.dispatch("editMatchConfig").then(res=>{
											that.editLoading=false;
											that.getList();
											that.activeTab='base';
										},err=>{
											that.editLoading=false;
											that.$message.error(err.message);
										})
									}else{
										that.activeTab="reward";
									}
								})
							}else{
								that.activeTab="price"
							}
						})		
					}
					else{
						that.activeTab="base"
					}
				});
			},
			addSubmit:function(){
				let that=this;
				if(this.addLoading){return false}
				that.$refs.addForm.validate(function(valid){				
					if (valid) {
						that.$refs.addPriceForm.validate(function(valid){
							if(valid){
								that.$refs.addRewardForm.validate(function(valid){
									if(valid){
										that.addLoading=true;
										that.$store.dispatch("addMatchConfig").then(res=>{
											that.addLoading=false;
											that.getList();
											that.activeTab='base';
										},err=>{
											that.addLoading=false;
											that.$message.error(err.message);
										})
									}else{
										that.activeTab="reward";
									}
								})
							}else{
								that.activeTab="price"
							}
						})		
					}
					else{
						that.activeTab="base"
					}
				})
			},
			closeDialog:function(type){
				if(type=="add"){
					this.$refs.addForm.resetFields();
					this.$refs.addPriceForm.resetFields();
					this.$refs.addRewardForm.resetFields();
					this.$store.commit(types.RESET_MATCH_CONFIG_ADD_FORM);
					this.$store.commit(types.COM_ADD_FORM_VISIBLE,false);
				}
				else{
					this.$refs.editForm.resetFields();
					this.$refs.editPriceForm.resetFields();
					this.$refs.editRewardForm.resetFields();
					this.$store.commit(types.COM_EDIT_FORM_VISIBLE,false);
				}
				this.activeTab='base';						
			},
			handleAddPrice:function(type){
				this.$store.commit(types.ADD_MATCH_CONFIG_PRICE_IN_FORM,type)
			},
			handleDelPrice:function(item){
				this.$store.commit(types.DEL_MATCH_CONFIG_PRICE_IN_FORM,item);
			},
			handleAddReward:function(type){
				this.$store.commit(types.ADD_MATCH_CONFIG_REWARD_IN_FORM,type)
			},
			handleDelReward:function(item){
				this.$store.commit(types.DEL_MATCH_CONFIG_REWARD_IN_FORM,item);
			},
			priceValidator:function(rule,value,callback,source, options){
				let index=0;
				this.matchPricesEditForm.priceList.forEach(oPrice=>{
					if(value==oPrice.type){
						index++;
					}
				})
				if(index>=2){
					callback(new Error('价格类型不能重复'))
				}
				else{
					callback()
				}
			},
			rewardValidator:function(rule,value,callback,source, options){
				let index=0;
				this.matchRewardEditForm.rewardList.forEach(oReward=>{
					if(value==oReward.ranking){
						index++;
					}
				})
				if(index>=2){
					callback(new Error('名次不能重复'))
				}
				else{
					callback()
				}
			},
			priceValidatorForAdd:function(rule,value,callback,source, options){
				let index=0;
				this.matchPricesAddForm.priceList.forEach(oPrice=>{
					if(value==oPrice.type){
						index++;
					}
				})
				if(index>=2){
					callback(new Error('价格类型不能重复'))
				}
				else{
					callback()
				}
			},
			rewardValidatorForAdd:function(rule,value,callback,source, options){
				let index=0;
				this.matchRewardAddForm.rewardList.forEach(oReward=>{
					if(value==oReward.ranking){
						index++;
					}
				})
				if(index>=2){
					callback(new Error('名次不能重复'))
				}
				else{
					callback()
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

	.del_price,.del_reward{
		margin-top: 5px;
    	margin-left: 15px;
	}
</style>