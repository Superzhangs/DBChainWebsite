<template>
  <el-dialog :visible.sync="isOpen" width="540px" @close="closed">
    <div slot="title">{{$t('dlg_return_dbc')}}</div>
    <div class="dlg-content">
      <div class="midInfo mt20">
        <p v-if="item">{{$t('gpu.backDbcNum')}}: {{item.orderData.dbc_total_count}}DBC</p>
        <div>
          <span v-html></span>
          <span></span>
        </div>
        <el-form>
          <el-form-item :label="$t('dlg_input_code')">
            <el-input v-model="code" size="small" style="width: 200px"></el-input>
            <el-button
              :loading="isCoding"
              class="ml10"
              plain
              size="mini"
              @click="getCode"
            >{{$t('dlg_get_code')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="dlg-bottom">
      <el-button
        :loading="isLoading"
        class="dlg-btn"
        type="primary"
        size="small"
        @click="confirm"
      >{{$t('confirm')}}</el-button>
      <el-button class="dlg-btn" plain size="small" @click="cancel">{{$t('cancel')}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { get_return_dbc_code, request_return_dbc } from "@/api";

export default {
  name: "popupReturn",
  props: {
    open: Boolean,
    item: Object
  },
  watch: {
    open(newVal) {
      this.isOpen = newVal;
    }
  },
  data() {
    return {
      isOpen: this.open,
      isLoading: false,
      isCoding: false,
      code: ""
    };
  },
  methods: {
    closed() {
      this.isOpen = false;
      this.$emit("update:open", false);
    },
    getCode() {
      this.isCoding = true;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      get_return_dbc_code({
        order_id: this.item.orderData.order_id,
        user_name_platform,
        language
      })
        .then(res => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "error"
            });
          }
        })
        .finally(() => {
          this.isCoding = false;
        });
    },
    confirm() {
      this.isLoading = true;
      const user_name_platform = this.$t("website_name");
      const language = this.$i18n.locale;
      request_return_dbc({
        order_id: this.item.orderData.order_id,
        return_code: this.code,
        user_name_platform,
        language
      })
        .then(res => {
          if (res.status === 1) {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
            this.$emit("success");
            this.closed();
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "success"
            });
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    cancel() {
      this.closed();
    }
  }
};
</script>

<style lang="scss" scoped>
.content-head {
  margin: 0 0 15px;
  font-size: 14px;
  line-height: 14px;
}

.desc-box {
  margin-top: 18px;
  padding: 10px 12px;
  background-color: #f6f9fc;
  font-size: 12px;
  color: #999;
  line-height: 20px;
}

.dlg-btn {
  width: 110px;
  margin: 0 10px;
}

.midInfo {
  font-size: 16px;
}
</style>
