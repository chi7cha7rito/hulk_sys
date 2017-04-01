<template>
    <div class="recharge-form">
        <el-tabs @tab-click="handleClick"
                 value="balance">
            <el-tab-pane label="余额调整"
                         name="balance">
                <el-form :model="balanceChange"
                         :rules="addFormRules"
                         ref="addForm"
                         label-width="100px">
                    <el-form-item label="手机号"
                                  prop="phoneNo">
                        <el-col :span="10">
                            <el-input v-model="balanceChange.phoneNo"></el-input>
                        </el-col>
                        <el-button type="primary"
                                   :style="{marginLeft:'10px'}"
                                   @click.native="getTotal">查询</el-button>
                    </el-form-item>
                    <el-form-item label="余额">
                        <el-col :span="10">
                            <el-input v-model="totalAvlBalance"
                                      :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="调整类型"
                                  prop="type">
                        <el-select v-model="balanceChange.type"
                                   placeholder="请选择调整类型">
                            <el-option label="正调整"
                                       value="3"></el-option>
                            <el-option label="负调整"
                                       value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="调整金额"
                                  prop="amount">
                        <el-col :span="10">
                            <el-input v-model="balanceChange.amount"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="备注"
                                  prop="remark">
                        <el-col :span="10">
                            <el-input type="textarea"
                                      :rows="4"
                                      v-model="balanceChange.remark"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"
                                   @click.native="addSubmit"
                                   :loading="addLoading">确认</el-button>
                        <el-button @click.native="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="积分调整"
                         name="point">
                <el-form :model="pointChange"
                         :rules="addPointFormRules"
                         ref="addPointForm"
                         label-width="100px">
                    <el-form-item label="手机号"
                                  prop="phoneNo">
                        <el-col :span="10">
                            <el-input v-model="pointChange.phoneNo"></el-input>
                        </el-col>
                        <el-button type="primary"
                                   :style="{marginLeft:'10px'}"
                                   @click.native="getPointsTotal">查询</el-button>
                    </el-form-item>
                    <el-form-item label="可用积分">
                        <el-col :span="10">
                            <el-input v-model="totalAvlPoints"
                                      :disabled="true"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="调整类型"
                                  prop="type">
                        <el-select v-model="pointChange.type"
                                   placeholder="请选择调整类型">
                            <el-option label="正调整"
                                       value="3"></el-option>
                            <el-option label="负调整"
                                       value="4"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="调整积分"
                                  prop="points">
                        <el-col :span="10">
                            <el-input v-model="pointChange.points"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="备注"
                                  prop="remark">
                        <el-col :span="10">
                            <el-input type="textarea"
                                      :rows="4"
                                      v-model="pointChange.remark"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"
                                   @click.native="addPointSubmit"
                                   :loading="addPointLoading">确认</el-button>
                        <el-button @click.native="cancelPoint">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
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
        let checkAmount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请填写金额'));
            }
            setTimeout(() => {
                if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
                    callback(new Error('必须为正整数'));
                } else {
                    if (this.balanceChange.type == '6' && value > this.totalAvlBalance) {
                        callback(new Error('不能大于余额'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        let checkPoint = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请填写积分'));
            }
            setTimeout(() => {
                if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
                    callback(new Error('必须为正整数'));
                } else {
                    if (this.pointChange.type == '4' && value > this.totalAvlPoints) {
                        callback(new Error('不能大于可用积分'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        return {
            addFormRules: {
                phoneNo: [
                    { required: true, message: '请填写手机号', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择调整方式', trigger: 'change' }
                ],
                amount: [
                    { required: true, message: '请填写金额', trigger: 'blur' },
                    { validator: checkAmount, trigger: 'blur,change' }
                ],
                remark: [
                    { required: true, message: '请填写备注', trigger: 'blur' }
                ]
            },
            addPointFormRules: {
                phoneNo: [
                    { required: true, message: '请填写手机号', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择调整方式', trigger: 'change' }
                ],
                points: [
                    { required: true, message: '请填写积分', trigger: 'blur' },
                    { validator: checkPoint, trigger: 'blur,change' }
                ],
                remark: [
                    { required: true, message: '请填写备注', trigger: 'blur' }
                ]
            },
            addLoading: false,
            addPointLoading: false
        }
    },
    computed: {
        ...mapGetters([
            'balanceChange',
            'totalAvlBalance',
            'pointChange',
            'totalAvlPoints'
        ])
    },
    methods: {
        handleClick: function (tab, event) {
            if (tab.name === 'balance') {
                this.$refs.addPointForm.resetFields()
                this.$store.dispatch('clearTotalAvlPoints')
            }
            if (tab.name === 'point') {
                this.$refs.addForm.resetFields()
                this.$store.dispatch('clearTotalAvlBalance')
            }
        },
        addSubmit: function () {
            if (this.addLoading) { return false }
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.addLoading = true
                    this.$store.dispatch("balanceChange").then(res => {
                        this.$message.success("余额调整成功")
                        this.addLoading = false
                        this.$refs.addForm.resetFields()
                        this.$store.dispatch('clearTotalAvlBalance')
                    }, err => {
                        this.addLoading = false
                        this.$message.error(err.message)
                    })
                }
            });
        },
        cancel: function () {
            this.$refs.addForm.resetFields()
        },
        getTotal: function () {
            this.$store.dispatch("getTotalAvlBalance")
        },
        addPointSubmit: function () {
            if (this.addPointLoading) { return false }
            this.$refs.addPointForm.validate((valid) => {
                if (valid) {
                    this.addPointLoading = true
                    this.$store.dispatch("pointChange").then(res => {
                        this.$message.success("积分调整成功")
                        this.addPointLoading = false
                        this.$refs.addPointForm.resetFields()
                        this.$store.dispatch('clearTotalAvlPoints')
                    }, err => {
                        this.addPointLoading = false
                        this.$message.error(err.message)
                    })
                }
            });
        },
        cancelPoint: function () {
            this.$refs.addPointForm.resetFields()
        },
        getPointsTotal: function () {
            this.$store.dispatch("getTotalAvlPoints")
        }
    }
}
</script>

<style lang="" scoped>
.recharge-form {
    padding: 24px;
}
</style>