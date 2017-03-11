<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-menu-item index="readme">
                <i class="el-icon-setting"></i>自述
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
                <el-menu-item index="userlist">用户查询</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-date"></i>会员管理</template>
                <el-menu-item index="memberlist">会员查询</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-date"></i>充值管理</template>
                <el-menu-item index="memberlist">会员查询</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-date"></i>赛事管理</template>
                <el-menu-item index="memberlist">赛事查询</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-date"></i>积分管理</template>
                <el-menu-item index="memberlist">积分查询</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-date"></i>签到管理</template>
                <el-menu-item index="memberlist">签到查询</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
                <template slot="title"><i class="el-icon-date"></i>账户金额管理</template>
                <el-menu-item index="memberlist">查询</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>
<script>
    export default {
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>
<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
