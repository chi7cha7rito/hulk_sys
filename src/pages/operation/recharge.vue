<template>
    <div class="recharge-form">
        <el-form :model="balanceIncrease"
                 :rules="addFormRules"
                 ref="addForm"
                 label-width="100px">
            <el-form-item label="手机号"
                          prop="phoneNo">
                <el-col :span="10">
                    <el-input v-model="balanceIncrease.phoneNo"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="充值方式"
                          prop="source">
                <el-select v-model="balanceIncrease.source"
                           placeholder="请选择充值方式">
                    <el-option label="支付宝"
                               value="2"></el-option>
                    <el-option label="刷卡"
                               value="3"></el-option>
                    <el-option label="现金"
                               value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="充值金额"
                          prop="amount">
                <el-col :span="10">
                    <el-input v-model="balanceIncrease.amount"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="参考号"
                          prop="sourceNo">
                <el-col :span="10">
                    <el-input v-model="balanceIncrease.sourceNo"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="备注"
                          prop="remark">
                <el-col :span="10">
                    <el-input type="textarea"
                              :rows="4"
                              v-model="balanceIncrease.remark"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click.native="addSubmit"
                           :loading="addLoading">确认</el-button>
                <el-button @click.native="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
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
            addFormRules: {
                phoneNo: [
                    { required: true, message: '请填写手机号', trigger: 'blur' }
                ],
                source: [
                    { required: true, message: '请选择充值方式', trigger: 'change' }
                ],
                amount: [
                    { required: true, message: '请填写金额', trigger: 'blur' },
                    { pattern: /^[0-9]*[1-9][0-9]*$/, message: '必须为正整数', trigger: 'blur,change' }
                ]
            },
            addLoading: false
        }
    },
    computed: {
        ...mapGetters([
            'balanceIncrease'
        ])
    },
    methods: {
        addSubmit: function () {
            if (this.addLoading) { return false }
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.addLoading = true
                    this.$store.dispatch("balanceIncrease").then(res => {
                        this.$message.success("充值成功")
                        this.addLoading = false
                        this.$refs.addForm.resetFields()
                    }, err => {
                        this.addLoading = false
                        this.$message.error(err.message)
                    })
                }
            });
        },
        cancel: function () {
            this.$refs.addForm.resetFields()
        }
    }
}
</script>

<style lang="" scoped>
.recharge-form {
    padding: 24px;
}
</style>