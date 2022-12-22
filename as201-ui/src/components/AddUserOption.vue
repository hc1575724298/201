<template>
  <div class="add-option-user-back" @click="hideAdd()">
    <div class="add-option">
      <div class="add-option-user" @click.stop="showAddUser('user')">
        {{$t("language.user")}}
      </div>
      <div class="add-option-advanced-user" @click.stop="showAddUser('advanced_user')">
        {{$t("language.advanced_user")}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      hideAdd() {
        this.$emit('hide')
      },
      showAddUser(type) {
        this.$emit('addUserinfo', type)
      }
    }
  }
</script>

<style scoped="scoped">
  .add-option-user-back {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #000000000;
  }

  .add-option {
    position: absolute;
    border: solid 1px rgba(194, 203, 218, 1);
    right: 35px;
    bottom: 116px;
    width: 331px;
    height: 204px;
    z-index: 9999;
  }

  .add-option-user,
  .add-option-advanced-user {
    width: 100%;
    background-color: white;
    font-family: Arial;
    font-size: 26px;
    font-weight: normal;
    line-height: 102px;
    text-indent: 26px;
  }

  .add-option-user {
    height: 103px;
    border-bottom: 1px solid rgba(194, 203, 218, 1);
    box-sizing: border-box;
  }

  .add-option-advanced-user {
    height: 101px;
  }
</style>
