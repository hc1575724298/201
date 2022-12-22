<template>
  <div>
    <div class="system-head-info">
      <div class="back">
        <div @click="backToParent" class="back-div" >
          <img src="../images/system/back.png" class="back-img" />
        </div>
      </div>
      <div class="system-page-info">{{page_name}}</div>
      <div class="time-light">
        <TimeLight></TimeLight>
      </div>
    </div>

    <!-- 开门弹框 -->
    <OpenDoorDialog :isShowOpenDoorDialog="isShowOpenDoorDialog" />
  </div>

</template>

<script>
  import TimeLight from '@/components/TimeLight'
  import { mapState as mapProtocolsState } from 'vuex'
  import { closeDoor } from "@/api/run";
  import OpenDoorDialog from "@/components/OpenDoorDialog.vue";
  export default {
    components: {
      TimeLight,
      OpenDoorDialog
    },
    // props: ['page_name','path_router'],
    props:{
      page_name:{
        type: String,
      },
      path_router:{
        type: String,
      },
      isCloseDoor:{
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        isShowOpenDoorDialog: false
      }
    },
    computed:{
    ...mapProtocolsState('protocols',['doorState','initPathName','pathName'])
  },
    mounted(){

    },
    methods: {
      async backToParent() {
        this.$store.commit('setSystemMenu',1)
        this.$store.commit('setSystemHeadMenu',1)
        if(this.path_router=='list'){
          this.$store.commit('setSystemHeadMenu',2)
        }
        if(this.path_router=='protocols'){
          this.$store.commit('setSystemMenu',2)
        }
        if(this.isCloseDoor && this.doorState &&(this.initPathName=='run'|| this.initPathName=='list'|| this.initPathName=='viewrunstep')&&this.pathName != 'viewrunstep'){
          this.isShowOpenDoorDialog = true
           await closeDoor()
           this.EventBus.on(this.Notify.CODE_FZB_DOOR_CLOSE, async (notify) => {
       if(notify.Code===this.Notify.CODE_FZB_DOOR_CLOSE){
        this.isShowOpenDoorDialog=false
        setTimeout(()=>{
          this.$router.push({name: this.path_router})
        },400)
       }
      })
        }else {
          this.$router.push({name: this.path_router})
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .system-head-info {
    display: flex;
    color: white;
    height: 90px;
    width: 100%;
    justify-content: center;
    font-size: 24px;
    align-items: center;
    background-color: #274261;
  }

  .back {
    width: 20%;
    height: 100%;
  }

  .back-div {
    display: flex;
    margin-left: 30px;
    height: 100%;
    width: 50px;
    align-items: center;
    justify-content: center;
  }

  .back-img {
    float: left;
    width: 25px;
    height: 40px;
    color: white;

  }

  .system-page-info {
    text-align: center;
    width: 60%;
    font-size: 30px;
    height: 100%;
    line-height: 90px;
  }

  .time-light {
    width: 20%;
  }
</style>
