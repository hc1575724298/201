<template>
  <div class="switch-model">
    <div class="switch-div">
      <div class="switch-img">
        <img src="../images/system/question.png" />
        <div style="margin-left: 20px;">{{$t("language.account_switch")}}</div>
      </div>
      <div class="delete-icons">
        <div class="delete-user-cancel" @click="cancelSwitch">{{$t("language.cancel")}}</div>
        <div class="delete-user-ok" @click="okSwitch">{{$t("language.ok")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      cancelSwitch() {
        this.$emit('closeSwitch')
      },
      okSwitch(){
        this.$router.push({
          name: 'login'
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .switch-model {
    position: absolute;
    display: flex;
    z-index: 1000;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .switch-div {
    width: 654px;
    height: 320px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .switch-img {
    width: 530px;
    height: 80px;
    display: flex;
    align-items: center;
    font-size: 26px;
    line-height: 80px;
    margin-left: 70px;
    margin-top: 70px;
  }

  .delete-icons {
    width: 500px;
    height: 62px;
    margin-left: 77px;
    margin-top: 69px;
    display: flex;
    justify-content: space-between;
  }

  .delete-icons>div {
    width: 190px;
    height: 62px;
    font-size: 24px;
    text-align: center;
    line-height: 62px;
  }

  .delete-user-cancel {
    color: black;
    border-radius: 6px;
    border: solid 1px rgba(76, 124, 178, 1);
  }

  .delete-user-ok {
    color: white;
    border-radius: 6px;
    background-color: #5187C3;
  }
</style>
