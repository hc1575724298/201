<template>
  <div class="delete-user-model">
    <div class="delete-user-info">
      <div class="delete-description">
        <div class="delete-description-img"><img src="../images/users/question.png"></div>
        <div class="delete-description-text">{{$t("language.delete_sentence")}}<br />{{deleteUserName}}？</div>
      </div>
      <div class="delete-warning">{{$t("language.delete_user_warning_sentence")}}</div>
      <div class="delete-icons">
        <div class="delete-user-cancel" @click="backToManage()">{{$t("language.cancel")}}</div>
        <div class="delete-user-ok" @click="deleteUserOk()">{{$t("language.ok")}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    deleteSelectedUser
  } from '@/api/user'
  export default {
    props: ['deleteUserName', 'user_id'],
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      backToManage() {
        this.$emit('closeDelete');
      },
      deleteUserOk() {
        deleteSelectedUser({
          'user_id': this.user_id
        }).then((res) => {
          if (res.code == 0) {
            if (this.$store.getters.languageCode == 1) {
              this.$message({
                message: 'Delete successfully!',
                type: 'success'
              })
            } else if (this.$store.getters.languageCode == 0) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
            }
          }
          this.$emit('closeDelete')
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .delete-user-model {
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

  .delete-user-info {
    width: 654px;
    height: 421px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 8px;
    z-index: 1000;
  }

  .delete-description {
    display: flex;
    margin-left: 99px;
    margin-top: 70px;
    width: 100%;
    height: 80px;
    font-family: Arial;
    font-size: 26px;
    font-weight: normal;
    font-stretch: normal;
  }

  .delete-description-img {
    width: 80px;
    height: 80px;
  }

  .delete-description-img>div {
    width: 100%;
    height: 100%;
  }

  .delete-description-text {
    margin-left: 36px;
    width: 340px;
    height: 80px;
  }

  .delete-warning {
    width: 449px;
    height: 76px;
    line-height: 50px;
    margin-left: 99px;
    margin-top: 34px;
    color: rgba(249, 86, 86, 1);
    font-size: 20px;
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
