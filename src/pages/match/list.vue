<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="赛事名称"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	
		<!--列表-->
		<el-table :data="matchList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="id" width="40">
			</el-table-column>
			<el-table-column prop="name" label="赛事名称" width="120">
			</el-table-column>
			<el-table-column prop="openingDatetime" label="开始时间" width="100" :formatter="formatDate">
			</el-table-column>
			<el-table-column prop="closingDatetime" label="结束时间" width="100" :formatter="formatDate">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template scope="scope">
						<el-button size="small">编辑</el-button>
						<el-button type="danger" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger"  :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				page: 1,
				sels: [], //列表选中列
			}
		},
		computed: {
			...mapGetters([
				'matchList',
				'listLoading',
				'total'
			])
		},
		methods: {
			//性别显示转换
			formatDate: function(row, column) {
				return '2017-03-24'
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			getList() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				// getUserListPage(para).then((res) => {
				// 	this.total = res.data.total;
				// 	this.users = res.data.users;
				// 	this.listLoading = false;
				// });
				if (this.matchList.length == 0) {
            		this.$store.dispatch('getMatchList',para)
        		}
			},
		},
		mounted() {
			this.getList();
		}
	}
</script>

<style scoped>
	
</style>