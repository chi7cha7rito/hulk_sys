<template>
    <div class="recharge-form">
        <el-tabs @tab-click="handleClick"
                 value="balance">
            <el-tab-pane label="余额消费"
                         name="balance">
                <el-form :model="balanceDecrease"
                         :rules="addFormRules"
                         ref="addForm"
                         label-width="100px">
                    <el-form-item label="手机号"
                                  prop="phoneNo">
                        <el-select v-model="balanceDecrease.phoneNo"
                                   filterable
                                   remote
                                   placeholder="请输入手机号"
                                   :remote-method="getMemberList"
                                   :loading="selectLoading"
                                   @change="balancePhoneChange">
                            <el-option v-for="item in availableMembers"
                                       :key="item.id"
                                       :label="item.phoneNoName"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="余额">
                        <el-col :span="10">
                            <el-input v-model="totalBalance"
                                      :readonly="true"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="消费方式"
                                  prop="source">
                        <el-select v-model="balanceDecrease.source"
                                   placeholder="请选择消费方式">
                            <el-option label="店内消费"
                                       value="5"></el-option>
                            <el-option label="购买积分"
                                       value="8"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="消费金额"
                                  prop="amount">
                        <el-col :span="10">
                            <el-input v-model="balanceDecrease.amount"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="备注"
                                  prop="remark">
                        <el-col :span="10">
                            <el-input type="textarea"
                                      :rows="4"
                                      v-model="balanceDecrease.remark"></el-input>
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
            <el-tab-pane label="积分消费"
                         name="point">
                <el-form :model="pointDecrease"
                         :rules="addPointFormRules"
                         ref="addPointForm"
                         label-width="100px">
                    <el-form-item label="手机号"
                                  prop="phoneNo">
                        <el-select v-model="pointDecrease.phoneNo"
                                   filterable
                                   remote
                                   placeholder="请输入手机号"
                                   :remote-method="getMemberList"
                                   :loading="selectLoading"
                                   @change="pointPhoneChange">
                            <el-option v-for="item in availableMembers"
                                       :key="item.id"
                                       :label="item.phoneNoName"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="可用积分">
                        <el-col :span="10">
                            <el-input v-model="totalPoints"
                                      :readonly="true"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="消费方式"
                                  prop="source">
                        <el-select v-model="pointDecrease.source"
                                   placeholder="请选择消费方式">
                            <el-option label="店内消费"
                                       value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="消费积分"
                                  prop="points">
                        <el-col :span="10">
                            <el-input v-model="pointDecrease.points"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="备注"
                                  prop="remark">
                        <el-col :span="10">
                            <el-input type="textarea"
                                      :rows="4"
                                      v-model="pointDecrease.remark"></el-input>
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
        var checkAmount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请填写金额'));
            }
            setTimeout(() => {
                if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
                    callback(new Error('必须为正整数'));
                } else {
                    if (value > this.totalBalance) {
                        callback(new Error('不能大于余额'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var checkPoint = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请填写积分'));
            }
            setTimeout(() => {
                if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
                    callback(new Error('必须为正整数'));
                } else {
                    if (value > this.totalPoints) {
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
                source: [
                    { required: true, message: '请选择消费方式', trigger: 'change' }
                ],
                amount:
                [
                    { required: true, message: '请填写金额', trigger: 'blur' },
                    { validator: checkAmount, trigger: 'blur,change' }
                ]
            },
            addPointFormRules: {
                phoneNo: [
                    { required: true, message: '请填写手机号', trigger: 'blur' }
                ],
                source: [
                    { required: true, message: '请选择消费方式', trigger: 'change' }
                ],
                points:
                [
                    { required: true, message: '请填写积分', trigger: 'blur' },
                    { validator: checkPoint, trigger: 'blur,change' }
                ]
            },
            addLoading: false,
            addPointLoading: false,
            selectLoading: false
        }
    },
    computed: {
        ...mapGetters([
            'balanceDecrease',
            'totalBalance',
            'pointDecrease',
            'totalPoints',
            'availableMembers'
        ])
    },
    methods: {
        handleClick: function (tab, event) {
            if (tab.name === 'balance') {
                this.$refs.addPointForm.resetFields()
                this.$store.dispatch('clearTotalPoints')
            }
            if (tab.name === 'point') {
                this.$refs.addForm.resetFields()
                this.$store.dispatch('clearTotalBalance')
            }
        },
        getMemberList: function (phoneNo) {
            if (phoneNo != '') {
                this.selectLoading = true;
                this.$store.dispatch('getAllMembers', phoneNo).then(() => {
                    this.selectLoading = false;
                }, err => {
                    this.selectLoading = false;
                })
            }
        },
        pointPhoneChange: function (id) {
            this.$store.dispatch('clearTotalPoints')
            this.$store.dispatch("getTotalPoints")
        },
        balancePhoneChange: function (id) {
            this.$store.dispatch('clearTotalBalance')
            this.$store.dispatch("getTotalBalance")
        },
        addSubmit: function () {
            if (this.addLoading) { return false }
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.addLoading = true
                    this.$store.dispatch("balanceDecrease").then(res => {
                        this.$message.success("余额扣减成功")
                        this.addLoading = false
                        this.$refs.addForm.resetFields()
                        this.$store.dispatch('clearTotalBalance')
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
        addPointSubmit: function () {
            if (this.addPointLoading) { return false }
            this.$refs.addPointForm.validate((valid) => {
                if (valid) {
                    this.addPointLoading = true
                    this.$store.dispatch("pointDecrease").then(res => {
                        this.$message.success("积分扣减成功")
                        this.addPointLoading = false
                        this.$refs.addPointForm.resetFields()
                        this.$store.dispatch('clearTotalPoints')
                    }, err => {
                        this.addPointLoading = false
                        this.$message.error(err.message)
                    })
                }
            });
        },
        cancelPoint: function () {
            this.$refs.addPointForm.resetFields()
        }
    }
}
</script>

<style lang="" scoped>
.recharge-form {
    padding: 24px;
}
</style>