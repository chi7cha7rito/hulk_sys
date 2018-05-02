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
                        <el-select v-model="balanceChange.phoneNo"
                                   filterable
                                   remote
                                   placeholder="请输入手机号"
                                   :remote-method="getMemberList"
                                   :loading="selectLoading"
                                   @visible-change="balancePhoneChange">
                            <el-option v-for="item in availableMembers"
                                       :key="item.id"
                                       :label="item.phoneNoName"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="余额">
                        <el-col :span="10">
                            <el-input v-model="totalAvlBalance"
                                      :readonly="true"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="调整类型"
                                  prop="type">
                        <el-select v-model="balanceChange.type"
                                   placeholder="请选择调整类型">
                            <el-option label="正调整"
                                       value="3"></el-option>
                            <el-option label="提现"
                                       value="4"></el-option>
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
                        <el-select v-model="pointChange.phoneNo"
                                   filterable
                                   remote
                                   placeholder="请输入手机号"
                                   :remote-method="getMemberList"
                                   :loading="selectLoading"
                                   @visible-change="pointPhoneChange">
                            <el-option v-for="item in availableMembers"
                                       :key="item.id"
                                       :label="item.phoneNoName"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="可用积分">
                        <el-col :span="10">
                            <el-input v-model="totalAvlPoints"
                                      :readonly="true"></el-input>
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
            <el-tab-pane label="大师分调整"
                         name="master">
                <el-form :model="masterChange"
                         :rules="addMasterFormRules"
                         ref="addMasterForm"
                         label-width="100px">
                    <el-form-item label="手机号"
                                  prop="phoneNo">
                        <el-select v-model="masterChange.phoneNo"
                                   filterable
                                   remote
                                   placeholder="请输入手机号"
                                   :remote-method="getMemberList"
                                   :loading="selectLoading"
                                   @visible-change="pointPhoneChange">
                            <el-option v-for="item in availableMembers"
                                       :key="item.id"
                                       :label="item.phoneNoName"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="调整类型"
                                  prop="type">
                        <el-select v-model="masterChange.type"
                                   placeholder="请选择调整类型"
                                   @change="handleMasterTypeChange">
                            <el-option label="赛事奖励"
                                       value="4"></el-option>
                            <el-option label="负调整"
                                       value="5"></el-option>
                            <el-option label="正调整"
                                       value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-show="this.masterChange.type==4" label="参加赛事"
                                  prop="sourceNo">
                        <el-select v-model="masterChange.sourceNo" @change="handleMatchChange" style="width:300px">
                            <el-option v-for="item in memberMatches"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-show="this.masterChange.type==4" label="参赛人数"
                                  prop="matchAttendanceCount">
                        <el-col :span="1">
                            <el-input v-model="masterChange.matchAttendanceCount" :readonly="true"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-show="this.masterChange.type==4" label="报名费"
                                  prop="price">
                        <el-col :span="1">
                            <el-input v-model="masterChange.price" :readonly="true"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-show="this.masterChange.type==4" label="名次"
                                  prop="rank">
                        <el-col :span="1">
                            <el-input v-model="masterChange.rank" @change="this.calcMasterPoint"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="积分"
                                  prop="points">
                        <el-col :span="3">
                            <el-input v-model="masterChange.points" :readonly="this.masterChange.type==4"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="备注"
                                  prop="remark">
                        <el-col :span="10">
                            <el-input type="textarea"
                                      :rows="4"
                                      v-model="masterChange.remark"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"
                                   @click.native="addMasterSubmit"
                                   :loading="addMasterLoading">确认</el-button>
                        <el-button @click.native="cancelMaster">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import * as types from "../../vuex/types";

import util from "../../common/js/util";

export default {
  data() {
    let checkAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写金额"));
      }
      setTimeout(() => {
        if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
          callback(new Error("必须为正整数"));
        } else {
          if (this.balanceChange.type == "6" && value > this.totalAvlBalance) {
            callback(new Error("不能大于余额"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    let checkPoint = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写积分"));
      }
      setTimeout(() => {
        if (!/^[0-9]*[1-9][0-9]*$/.test(value)) {
          callback(new Error("必须为正整数"));
        } else {
          if (this.pointChange.type == "4" && value > this.totalAvlPoints) {
            callback(new Error("不能大于可用积分"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      addFormRules: {
        phoneNo: [{ required: true, message: "请填写手机号", trigger: "blur" }],
        type: [
          { required: true, message: "请选择调整方式", trigger: "change" }
        ],
        amount: [
          { required: true, message: "请填写金额", trigger: "blur" },
          { validator: checkAmount, trigger: "blur,change" }
        ],
        remark: [{ required: true, message: "请填写备注", trigger: "blur" }]
      },
      addPointFormRules: {
        phoneNo: [{ required: true, message: "请填写手机号", trigger: "blur" }],
        type: [
          { required: true, message: "请选择调整方式", trigger: "change" }
        ],
        points: [
          { required: true, message: "请填写积分", trigger: "blur" },
          { validator: checkPoint, trigger: "blur,change" }
        ],
        remark: [{ required: true, message: "请填写备注", trigger: "blur" }]
      },
      addMasterFormRules: {
        phoneNo: [{ required: true, message: "请填写手机号", trigger: "blur" }],
        type: [
          { required: true, message: "请选择调整方式", trigger: "change" }
        ],
        points: [{ required: true, message: "请填写积分", trigger: "blur" }]
      },
      addLoading: false,
      addPointLoading: false,
      addMasterLoading: false,
      selectLoading: false
    };
  },
  computed: {
    ...mapGetters([
      "balanceChange",
      "totalAvlBalance",
      "pointChange",
      "masterChange",
      "totalAvlPoints",
      "availableMembers",
      "memberMatches"
    ])
  },
  methods: {
    handleClick: function(tab, event) {
      if (tab.name === "balance") {
        this.$refs.addPointForm.resetFields();
        this.$refs.addMasterForm.resetFields();
        this.$store.dispatch("clearTotalAvlPoints");
      }
      if (tab.name === "point") {
        this.$refs.addForm.resetFields();
        this.$refs.addMasterForm.resetFields();
        this.$store.dispatch("clearTotalAvlBalance");
      }

      if (tab.name == "master") {
        this.$refs.addPointForm.resetFields();
        this.$refs.addForm.resetFields();
      }
    },
    getMemberList: function(phoneNo) {
      if (phoneNo != "") {
        this.selectLoading = true;
        this.$store.dispatch("getAllMembers", phoneNo).then(
          () => {
            this.selectLoading = false;
          },
          err => {
            this.selectLoading = false;
          }
        );
      }
    },
    getMatches: function(phoneNo) {
      if (phoneNo != "") {
        this.selectLoading = true;

        this.$store.dispatch("getMatches", phoneNo).then(
          () => {
            this.selectLoading = false;
          },
          err => {
            this.selectLoading = false;
          }
        );
      }
    },
    pointPhoneChange: function(val) {
      if (!val) {
        this.$store.dispatch("clearTotalAvlPoints");
        this.$store.dispatch("getTotalAvlPoints");
        this.$store.dispatch("getMatches", this.masterChange.phoneNo);
      }
    },
    balancePhoneChange: function(val) {
      if (!val) {
        this.$store.dispatch("clearTotalAvlBalance");
        this.$store.dispatch("getTotalAvlBalance");
      }
    },
    addSubmit: function() {
      if (this.addLoading) {
        return false;
      }
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.addLoading = true;
          this.$store.dispatch("balanceChange").then(
            res => {
              this.$message.success("余额调整成功");
              this.addLoading = false;
              this.$refs.addForm.resetFields();
              this.$store.dispatch("clearTotalAvlBalance");
            },
            err => {
              this.addLoading = false;
              this.$message.error(err.message);
            }
          );
        }
      });
    },
    cancel: function() {
      this.$refs.addForm.resetFields();
    },
    addPointSubmit: function() {
      if (this.addPointLoading) {
        return false;
      }
      this.$refs.addPointForm.validate(valid => {
        if (valid) {
          this.addPointLoading = true;
          this.$store.dispatch("pointChange").then(
            res => {
              this.$message.success("积分调整成功");
              this.addPointLoading = false;
              this.$refs.addPointForm.resetFields();
              this.$store.dispatch("clearTotalAvlPoints");
            },
            err => {
              this.addPointLoading = false;
              this.$message.error(err.message);
            }
          );
        }
      });
    },
    cancelPoint: function() {
      this.$refs.addPointForm.resetFields();
    },
    addMasterSubmit: function() {
      if (this.addMasterLoading) {
        return false;
      }
      this.$refs.addMasterForm.validate(valid => {
        if (valid) {
          this.addMasterLoading = true;
          this.$store.dispatch("masterPointChange").then(
            res => {
              this.$message.success("积分调整成功");
              this.addMasterLoading = false;
              this.$refs.addPointForm.resetFields();
            },
            err => {
              this.addMasterLoading = false;
              this.$message.error(err.message);
            }
          );
        }
      });
    },
    cancelMaster: function() {
      this.$refs.addMasterForm.resetFields();
    },
    handleMasterTypeChange(type) {
      this.masterChange.sourceNo = "";
      this.masterChange.price = "";
      this.masterChange.rank = "";
      this.masterChange.remark = "";
      this.masterChange.matchAttendanceCount = "";
      this.masterChange.points = "";
    },
    handleMatchChange(id) {
      this.$store.dispatch("getMemberMatchAttendanceCount", id);
      let price = "";

      this.memberMatches.forEach(oRow => {
        if (oRow.id == id) {
          price = oRow.price;
        }
      });

      this.masterChange.price = price;
      this.masterChange.rank = "";
      this.masterChange.remark = "";
      this.masterChange.matchAttendanceCount = "";
      this.masterChange.points = "";
    },
    calcMasterPoint(rank) {
      let r = 10;
      if (!rank || rank == "0") {
        this.masterChange.points = "";
      } else {
        this.masterChange.points = (
          10 *
          (Math.sqrt(this.masterChange.matchAttendanceCount) /
            Math.sqrt(rank)) *
          (Math.pow(this.masterChange.price, 0.4) + 1)
        ).toFixed(2);
      }
    }
  }
};
</script>

<style lang="" scoped>
.recharge-form {
  padding: 24px;
}
</style>