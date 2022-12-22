<template>
  <div class="user-info-model" @click="hide()">
    <div class="user-info">
      <div @click="manage">
        <div class="manage">
          <img src="../images/system/manage.png">&nbsp;{{$t("language.manage")}}
        </div>
      </div>
      <div @click="switchUser">
        <div class="switch">
          <img src="../images/system/switch.png">&nbsp;{{$t("language.switch")}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data(){
      return{
        switch_status: true
      }
    },
    methods: {
      hide: function() {
        this.$emit('hide');
      },
      manage: function() {
        this.$store.commit('setMenuIndex', 1)
        this.$router.push({
          name: 'user'
        })
      },
      switchUser: function() {
        this.$emit('openSwitch', this.switch_status);
      }
    }
  }
</script>

<style scoped="scoped">
  .user-info {
    text-align: center;
    background-color: white;
    border-radius: 5px;
    position: absolute;
    left: 20px;
    top: 70px;
    height: 200px;
    width: 255px;
    border: 1px solid #E2E3E5;
    /* box-shadow: #cdcdce -1px 1px 8px; */
  }

  .user-info>div {
    font-size: 24px;
    line-height: 100px;
    height: 100px;
    width: 100%;

  }

  .user-info>div:first-child {
    border-bottom: 1px solid #D3D9E4;
  }

  .manage,
  .switch {
    display: flex;
    align-items: center;
  }

  img {
    margin-left: 32px;
    margin-right: 22px;
  }

  .user-info-model {
    position: absolute;
    left: 0;
    top: 0;
    background-color: #000000000;
    width: 100%;
    height: 100%;
    z-index: 5000;
  }
</style>
