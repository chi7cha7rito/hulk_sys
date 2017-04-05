<template>
	<el-row class="container">
		<el-col :span="24"
		        class="header">
			<el-col :span="10"
			        class="logo"
			        :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="10">
				<div class="tools"
				     @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="4"
			        class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{userInfo.name}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item divided
						                  @click.native="logout">退出登录</el-dropdown-item>
						<el-dropdown-item divided
						                  @click.native="changePwd">修改密码</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24"
		        class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path"
				         class="el-menu-vertical-demo"
				         @open="handleopen"
				         @close="handleclose"
				         @select="handleselect"
				         unique-opened
				         router
				         v-show="!collapsed">
					<template v-for="(item,index) in this.routers"
					          v-if="!item.hidden">
						<el-submenu :index="index+''"
						            v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children"
							              :index="child.path"
							              v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0"
						              :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed"
				    v-show="collapsed"
				    ref="menuCollapsed">
					<li v-for="(item,index) in this.routers"
					    v-if="!item.hidden"
					    class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title"
							     style="padding-left: 20px;"
							     @mouseover="showMenu(index,true)"
							     @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu"
							    :class="'submenu-hook-'+index"
							    @mouseover="showMenu(index,true)"
							    @mouseout="showMenu(index,false)">
								<li v-for="child in item.children"
								    v-if="!child.hidden"
								    class="el-menu-item"
								    style="padding-left: 40px;"
								    :class="$route.path==child.path?'is-active':''"
								    @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item"
								     style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
								     :class="$route.path==item.children[0].path?'is-active':''"
								     @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24"
					        class="breadcrumb-container">
						<strong class="title">{{$route.name}}</strong>
						<el-breadcrumb separator="/"
						               class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24"
					        class="content-wrapper">
						<transition name="fade"
						            mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
		<!--修改密码界面-->
		<el-dialog title="修改密码"
		           v-model="changePwdVisable"
		           :close-on-click-modal="true"
		           @close="closeDialog">
			<el-form :model="changePassword"
			         label-width="100px"
			         :rules="changePwdRules"
			         ref="changePwdForm">
				<el-form-item label="原密码"
				              prop="originalPwd">
					<el-col :span="10">
						<el-input v-model="changePassword.originalPwd"
						          type="password"
						          auto-complete="off"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="新密码"
				              prop="newPwd">
					<el-col :span="10">
						<el-input v-model="changePassword.newPwd"
						          type="password"
						          auto-complete="off"></el-input>
					</el-col>
				</el-form-item>
				<el-form-item label="确认密码"
				              prop="confirmPwd">
					<el-col :span="10">
						<el-input v-model="changePassword.confirmPwd"
						          type="password"
						          auto-complete="off"></el-input>
					</el-col>
				</el-form-item>
			</el-form>
			<div slot="footer"
			     class="dialog-footer">
				<el-button @click.native="closeDialog">取消</el-button>
				<el-button type="primary"
				           @click.native="changePwdSubmit"
				           :loading="changeLoading">确认</el-button>
			</div>
		</el-dialog>
	</el-row>
</template>

<script>
import {
	mapGetters
} from 'vuex'

import Util from '../common/js/util'
import md5 from 'md5'
//cache util object;
const util = Util;

export default {
	data() {
		return {
			sysName: '豪客后台管理系统',
			collapsed: false,
			sysUserAvatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
			routers: '',
			addLoading: false,
			changePwdVisable: false,
			changeLoading: false,
			changePwdRules: {
				originalPwd: [{
					required: true,
					message: '请输入原始密码',
					trigger: 'blur'
				}],
				newPwd: [{
					required: true,
					message: '请输入新密码',
					trigger: 'blur'
				}],
				confirmPwd: [{
					required: true,
					message: '请输入确认密码',
					trigger: 'blur'
				}]
			}
		}
	},
	computed: {
		...mapGetters([
			'userInfo',
			'changePassword'
		])
	},
	methods: {
		onSubmit() {
			console.log('submit!');
		},
		handleopen() {
			//console.log('handleopen');
		},
		handleclose() {
			//console.log('handleclose');
		},
		handleselect: function (a, b) {
		},
		//退出登录
		logout: function () {
			var _this = this;
			this.$confirm('确认退出吗?', '提示', {
			}).then(() => {
				this.$store.dispatch("setSignOut");
				_this.$router.push('/login');
			}).catch(() => {
			});
		},
		changePwd() {
			this.changePwdVisable = true
		},
		changePwdSubmit() {
			var _this = this;
			this.changeLoading = true
			this.$store.dispatch("changePwd").then(res => {
				this.changeLoading = false;
				this.$refs.changePwdForm.resetFields();
				this.$confirm('修改密码成功，是否重新登陆?', '提示', {
				}).then(() => {
					this.changePwdVisable = false
					this.$store.dispatch("setSignOut");
					_this.$router.push('/login');
				}).catch(() => {
				});
				this.changePwdVisable = false
			}, err => {
				this.changeLoading = false;
				this.$refs.changePwdForm.resetFields();
				this.$message.error(err.message);
			})
		},
		closeDialog() {
			this.$refs.changePwdForm.resetFields();
			this.changePwdVisable = false;
		},
		//折叠导航栏
		collapse: function () {
			this.collapsed = !this.collapsed;
		},
		showMenu(i, status) {
			this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
		}
	},
	mounted() {
		let userInfo = util.getUserInfo();
		let tmpArray = [], user;
		if (userInfo) {
			user = JSON.parse(userInfo);
		}

		this.$router.options.routes.forEach(oRoute => {
			if (oRoute.name == "后台账号管理" && user && user.roleType != "1") {
				oRoute.hidden = true;
			}
			tmpArray.push(oRoute);
		});
		this.routers = tmpArray;
	}
}

</script>

<style scoped lang="scss">
@import '~scss_vars';

.container {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
	.header {
		height: 60px;
		line-height: 60px;
		background: $color-primary;
		color: #fff;
		.userinfo {
			text-align: right;
			padding-right: 35px;
			float: right;
			.userinfo-inner {
				cursor: pointer;
				color: #fff;
				img {
					width: 40px;
					height: 40px;
					border-radius: 20px;
					margin: 10px 0px 10px 10px;
					float: right;
				}
			}
		}
		.logo {
			//width:230px;
			height: 60px;
			font-size: 22px;
			padding-left: 20px;
			padding-right: 20px;
			border-color: rgba(238, 241, 146, 0.3);
			border-right-width: 1px;
			border-right-style: solid;
			img {
				width: 40px;
				float: left;
				margin: 10px 10px 10px 18px;
			}
			.txt {
				color: #fff;
			}
		}
		.logo-width {
			width: 230px;
		}
		.logo-collapse-width {
			width: 60px
		}
		.tools {
			padding: 0px 23px;
			width: 14px;
			height: 60px;
			line-height: 60px;
			cursor: pointer;
		}
	}
	.main {
		display: flex; // background: #324057;
		position: absolute;
		top: 60px;
		bottom: 0px;
		overflow: hidden;
		aside {
			flex: 0 0 230px;
			width: 230px; // position: absolute;
			// top: 0px;
			// bottom: 0px;
			.el-menu {
				height: 100%;
			}
			.collapsed {
				width: 60px;
				.item {
					position: relative;
				}
				.submenu {
					position: absolute;
					top: 0px;
					left: 60px;
					z-index: 99999;
					height: auto;
					display: none;
				}
			}
		}
		.menu-collapsed {
			flex: 0 0 60px;
			width: 60px;
		}
		.menu-expanded {
			flex: 0 0 230px;
			width: 230px;
		}
		.content-container {
			// background: #f1f2f7;
			flex: 1; // position: absolute;
			// right: 0px;
			// top: 0px;
			// bottom: 0px;
			// left: 230px;
			overflow-y: scroll;
			padding: 20px;
			.breadcrumb-container {
				//margin-bottom: 15px;
				.title {
					width: 200px;
					float: left;
					color: #475669;
				}
				.breadcrumb-inner {
					float: right;
				}
			}
			.content-wrapper {
				background-color: #fff;
				box-sizing: border-box;
			}
		}
	}
}
</style>