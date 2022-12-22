<template>
  <div class="users">
    <UserHead :page_name='page_name' :path_router="path_router"></UserHead>
    <div class="user-content">
      <div class="user-siderbar">
        <div class="user-siderbar-option" :class="{'user-option-selected':selectedOption==selected_user_option[0].id}"
          @click="selectUserOption(selected_user_option[0].id)" v-if="this.$store.getters.user.group!='factory'">
          {{selected_user_option[0].name}}
        </div>
        <div class="user-siderbar-option" :class="{'user-option-selected':selectedOption==selected_user_option[1].id}"
          @click="selectUserOption(selected_user_option[1].id)" v-if="this.$store.getters.user.group!='user'">
          {{selected_user_option[1].name}}
        </div>
      </div>
      <div class="user-content-page">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import TimeLight from '@/components/TimeLight';
  import UserHead from '@/components/UserHead';
  export default {
    components: {
      TimeLight,
      UserHead
    },
    data() {
      return {
        page_name: this.$store.getters.user.username,
        path_router: "system",
        selected_user_option: [{
          id: 1,
          name: this.$t("language.password_placeholder")
        }, {
          id: 2,
          name: this.$t("language.manage")
        }],
      }
    },
    computed: {
      selectedOption() {
        return this.$store.getters.menuIndex;
      },
    },
    mounted() {
      if(this.$store.getters.user.group=='factory'){
        this.$store.commit('setMenuIndex',2)
        this.$router.push({
          name: 'manage'
        })
      }
    },
    methods: {
      selectUserOption(id) {
        let oldInjdex = this.$store.getters.menuIndex;
        this.$store.commit("setMenuIndex", id)
        if (oldInjdex == id) {
          return;
        }
        if (id == 1) {
          this.$router.push({
            name: 'password'
          })
        } else if (id == 2) {
          this.$router.push({
            name: 'manage'
          })
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .users {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .user-content {
    display: flex;
    height: 1110px;
    background-color: white;
    width: 100%;
  }

  .user-siderbar {
    width: 322px;
    text-align: center;
    height: 100%;
    border-right: 2px solid #DAE0E8;
  }

  .user-siderbar-option {
    width: 322px;
    font-size: 24px;
    line-height: 98px;
    height: 98px;
    border: 1px solid transparent;
    box-sizing: border-box;
  }

  .user-option-selected {
    background-color: #E5EFF9;
    color: #4C7CB2;
    border-color: #4C7CB2;
    box-sizing: border-box;
  }

  .user-content-page {
    height: 100%;
    width: 1598px;
    background-color: #F3F4F6;
  }
</style>
