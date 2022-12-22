<template>
  <div>
    <div class="password-info" @click="openDialog()">
      <div class="info-text">
        {{$t("language.change_password")}}
      </div>
      <div class="deal-password">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <ChangeMyPassword @close='close' v-if="changePasswordVisible"></ChangeMyPassword>
  </div>
</template>

<script>
  import ChangeMyPassword from '@/components/ChangeMyPassword';
  export default {
    components: {
      ChangeMyPassword
    },

    data() {
      return {
        changePasswordVisible: false,
      }
    },
    methods: {
      openDialog() {
        this.changePasswordVisible = true;
      },
      close() {
        this.changePasswordVisible = false;
      }
    }
  }
</script>

<style scoped="scoped">
  .password-info {
    width: 1533px;
    height: 90px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #C2CBDA;
    margin: 30px 0 0 34px;
    font-size: 24px;
    text-indent: 30px;
  }

  .info-text {
    height: 100%;
    line-height: 90px;
    float: left;
  }

  .deal-password {
    float: right;
    display: flex;
    height: 100%;
    align-items: center;
  }

  .el-icon-arrow-right {
    font-size: 50px;
    margin-right: 15px;
    color: #666666;
  }
</style>
