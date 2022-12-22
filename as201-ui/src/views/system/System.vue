<template>
  <div class="system">
    <UserInfo v-if="info_code" @hide="info_code=false" @openSwitch="SwitchOpen"></UserInfo>
    <div class="system-head">
      <div class="head-user" @click="getUserInfo">
        <div class="head-user-img"><img src="../../images/system/user.png" /></div>
        <div style="text-overflow: ellipsis;overflow:hidden;">{{this.$store.getters.user.username}}</div>
      </div>
      <div class="head-left" v-for="(item,index) in head_options" :key="index" @click="selectHead(item)"
        :class="{'select-head':systemHeadSelected==item.id}" v-if="$store.getters.systemMenu==1">
        <div v-if="$store.getters.systemHeadMenu!=item.id"><img :src="item.src" /></div>
        <div v-if="$store.getters.systemHeadMenu==item.id"><img :src="item.selected_src" /></div>
        <div class="select-head-text">{{item.description}}</div>
      </div>
      <div class="head-left" v-for="(item,index) in clear_options" :key="index" @click="selectHead(item)"
        :class="{'select-head':systemHeadSelected==item.id}" v-if="$store.getters.systemMenu==3">
        <div><img :src="item.src" /></div>
        <div>{{item.description}}</div>
      </div>
      <TimeLight></TimeLight>
    </div>
    <div class="system-content">
      <div class="system-sidebar">
        <div class="sidebar" v-for="(item,index) in options" :key="index" @click="selectOption(item.id)"
          :class="{'selected':$store.getters.systemMenu==item.id}">
          <div class="selected-siderbar">
            <img :src="item.selected_src" v-if="$store.getters.systemMenu==item.id" />
            <img :src="item.src" v-if="$store.getters.systemMenu!=item.id" />
            <div class="icon-text">{{item.description}}</div>
          </div>
        </div>
      </div>
      <div class="system-content-show">
        <router-view />
      </div>
    </div>
    <AccountSwitch v-if="switch_code" @closeSwitch='switchClose'></AccountSwitch>
  </div>
</template>

<script>
  import UserInfo from '@/components/UserInfo'
  import TimeLight from '@/components/TimeLight'
  import AccountSwitch from '@/components/AccountSwitch'
  export default {
    components: {
      UserInfo,
      TimeLight,
      AccountSwitch
    },
    data() {
      return {
        info_code: false,
        options: [{
          id: 1,
          code: 1,
          src: require('../../images/system/run.png'),
          selected_src: require('../../images/system/runing.png'),
          description: this.$t("language.run")
        }, {
          id: 2,
          code: 0,
          src: require('../../images/system/protocols.png'),
          selected_src: require('../../images/system/protocolsing.png'),
          description: this.$t("language.protocols")
        }, {
          id: 3,
          code: 0,
          src: require('../../images/system/clear.png'),
          selected_src: require('../../images/system/clearing.png'),
          description: this.$t("language.clean")
        }, {
          id: 4,
          code: 0,
          src: require('../../images/system/set.png'),
          selected_src: require('../../images/system/setting.png'),
          description: this.$t("language.setting")
        }, {
          id: 5,
          code: 0,
          src: require('../../images/system/loT.png'),
          selected_src: require('../../images/system/loTing.png'),
          description: this.$t("language.loT")
        }],
        head_options: [{
          id: 1,
          code: 1,
          src: require('../../images/system/favorites.png'),
          selected_src: require('../../images/system/favorites_selected.png'),
          description: this.$t("language.favorites"),
          router: 'run',
        }, {
          id: 2,
          code: 0,
          src: require('../../images/system/list.png'),
          selected_src: require('../../images/system/list_selected.png'),
          description: this.$t("language.list"),
          router: 'list',
        }],
        clear_options: [{
          id: 1,
          code: 1,
          description: this.$t("language.sterilizer"),
          router: 'clear',
        }, {
          id: 2,
          code: 0,
          description: this.$t("language.hepa"),
          router: 'hepaFilter',
        }],
        switch_code: false
      }
    },

    mounted() {

    },
    computed: {
      selected() {
        return this.$store.getters.systemMenu;
      },
      systemHeadSelected() {
        return this.$store.getters.systemHeadMenu;
      }
    },
    methods: {
      switchClose(){
        this.switch_code=false
      },
      SwitchOpen(data){
        this.switch_code = data
      },
      selectOption(id) {
        let oldIndex = this.$store.getters.systemMenu;
        this.$store.commit('setSystemMenu', id)
        this.$store.commit('setSystemHeadMenu', 1)
        if (oldIndex == id) {
          return;
        }
        if ((id - 1) == 0) {
          this.$router.push({
            name: 'run'
          });
        } else if ((id - 1) == 1) {
          this.$router.push({
            name: 'protocols'
          });
        } else if ((id - 1) == 2) {
          this.$router.push({
            name: 'clear'
          });
        } else if ((id - 1) == 3) {
          this.$router.push({
            name: 'setting'
          });
        } else if ((id - 1) == 4) {
          this.$router.push({
            name: 'loT'
          });
        }
      },
      selectHead(item) {
        let oldIndex = this.$store.getters.systemHeadMenu;
        this.$store.commit('setSystemHeadMenu', item.id)
        if (oldIndex == item.id) {
          return;
        }
        for (var i = 0; i < this.head_options.length; i++) {
          this.head_options[i].code = 0;
        }
        this.head_options[item.id - 1].code = 1;
        this.$router.push({
          name: item.router
        })
      },
      getUserInfo() {
        this.info_code = !this.info_code ? 1 : 0;
      }
    },

  }
</script>

<style scoped="scoped">
  .system {
    width: 1920px;
    height: 1200px;
    position: relative;
  }

  .system-head {
    height: 90px;
    width: 100%;
    background-color: #274261;
  }

  .head-user {
    float: left;
    display: flex;
    height: 100%;
    width: 169px;
    border-right: 1px solid white;
    color: white;
    flex-shrink: 0;
    font-size: 24px;
    align-items: center;
  }

  .head-user-img {
    height: 100%;
    margin-right: 12px;
    width: fit-content;
    margin-left: 15px;
    display: flex;
    align-items: center;
  }

  .head-left {
    display: flex;
    float: left;
    height: 90px;
    width: fit-content;
    flex-shrink: 0;
    margin-left: 40px;
    color: #BEC6D0;
    font-size: 24px;
    justify-content: center;
    align-items: center;
  }

  .select-head-text {
    margin-left: 15px;
  }

  .system-content {
    width: 100%;
    height: 1110px;
    background-color: #F3F4F6;
    display: flex;
  }

  .system-content-show {
    width: 1750px;
    height: 100%;
  }

  .system-sidebar {
    text-align: center;
    height: 100%;
    width: 169px;
    background-color: white;
  }

  .sidebar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    font-size: 25px;
    color: #6E7A88;
  }

  .selected-siderbar>img {
    height: 61px;
    width: 61px;
  }

  .icon-text {
    margin-top: 27px;
  }

  .selected {
    background-color: #DBE5F1;
    color: #4C7CB2;
  }

  .select-head {
    border-bottom: 3px solid white;
    box-sizing: border-box;
    color: white;
  }
</style>
