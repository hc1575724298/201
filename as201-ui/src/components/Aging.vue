<template>
  <div class="aging-model">
    <div class="aging-div" v-for="(item,index) in agings" :key="index">
      <div class="aging-optional-div">
        <div class="aging-option">
          <div class="aging-option-icon" @click="selectAging(item)" v-if="item.id!=9"><img
              src="../images/setting/list_selected.png" v-if="item.icon_status" /></div>
          <div :class="{'text-nine':item.id==9}" class="aging-text-div">{{item.description}}
          </div>
        </div>
        <div class="cycles-div">
          <div class="cycles-text">{{$t("language.cycles")}}</div>
          <input type="number" class="cycle-number" v-model="item.value" @blur="checkCycle" onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))"/>
        </div>
        <div class="test-aging">
          <div class="text-button" @click="testAging(item)">
            {{$t("language.test")}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    TestAging
  } from '@/api/setting.js'
  export default {
    data() {
      return {
        agings: [{
          id: 1,
          description: this.$t("language.yaxis"),
          icon_status: true,
          value: 1,
          type: "y"
        }, {
          id: 2,
          description: this.$t("language.zaxis"),
          icon_status: true,
          value: 1,
          type: "z"
        }, {
          id: 3,
          description: this.$t("language.load_unload"),
          icon_status: true,
          value: 1,
          type: "load_upload_tip"
        }, {
          id: 4,
          description: this.$t("language.lid"),
          icon_status: true,
          value: 1,
          type: "load_upload_lid"
        }, {
          id: 5,
          description: this.$t("language.pipettor_aging"),
          icon_status: true,
          value: 1,
          type: "pipettor"
        }, {
          id: 6,
          description: this.$t("language.mangnetic_aging"),
          icon_status: true,
          value: 1,
          type: "magnetic_rod"
        }, {
          id: 7,
          description: this.$t("language.side_mangnetic"),
          icon_status: true,
          value: 1,
          type: "side_magnetic"
        }, {
          id: 8,
          description: this.$t("language.locker"),
          icon_status: true,
          value: 1,
          type: "locker_door"
        }, {
          id: 9,
          description: this.$t("language.machine"),
          icon_status: false,
          value: 1,
          type: "machine"
        }],
        selected_Aging: [],
      }
    },
    mounted() {},
    methods: {
      checkCycle(){
        for(var i=0;i<this.agings.length;i++){
            if(this.agings[i].value>999){
                this.agings[i].value=999
            }else if(this.agings[i].value<1){
              this.agings[i].value=1
            }
        }
      },
      selectAging(item) {
        item.icon_status = !item.icon_status;
        var selected_lists=[];
        if(item.icon_status==true){
          this.selected_Aging.push(item.type)
        }else if(item.icon_status==false){
          for(var i=0;i<this.selected_Aging.length;i++){
            if(this.selected_Aging[i]!=item.type){
              selected_lists.push(this.selected_Aging[i])
            }
          }
           this.selected_Aging = JSON.parse(JSON.stringify(selected_lists))
        }
      },
      testAging(item) {
        if(item.id!=9){
          var test=[]
          test.push(item.type)
          TestAging({type:JSON.stringify(test),cycles:item.value}).then((res)=>{
            if(res.code==0){
              this.$message({
                message:this.$t("language.test_success"),
                type:'success'
              })
            }
          })
      }else if(item.id==9){
        TestAging({'type':JSON.stringify(this.selected_Aging),cycles:item.value}).then((res)=>{
           if(res.code==0){
             this.$message({
               message:this.$t("language.test_success"),
               type:'success'
             })
           }
        })
      }
    }
    }
  }
</script>

<style scoped="scoped">
  .aging-model {
    width: 1528px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .aging-div {
    width: 464px;
    height: 328px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    margin-top: 20px;
    margin-left: 30px;
  }

  .aging-optional-div {
    height: 34px;
    width: 100%;
  }

  .aging-option {
    width: 100%;
    display: flex;
    margin-top: 26px;
    margin-left: 30px;
    font-size: 24px;
    line-height: 34px;
    height: 34px;
  }

  .aging-option-icon {
    display: flex;
    align-items: center;
    height: 100%;
    width: 34px;
    border-radius: 2px;
    border: solid 1px #5a89c7;
    box-sizing: border-box;
  }

  .aging-option-icon>img {
    margin-left: 1px;
  }

  .cycles-div {
    width: 100%;
    height: 56px;
    margin-top: 40px;
    display: flex;
    font-size: 24px;
  }

  .cycles-text {
    height: 100%;
    line-height: 56px;
    margin-left: 30px;
  }

  .cycle-number {
    width: 304px;
    height: 56px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    text-indent: 16px;
  }

  .test-aging {
    margin-top: 90px;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
  }

  .text-button {
    height: 100%;
    width: 404px;
    font-size: 24px;
    background-color: #F8FAFF;
    text-align: center;
    line-height: 56px;
    border-radius: 4px;
    border: solid 1px #c2cbda;
    color: #4c7cb2;
  }

  .test-all {
    margin-top: 186px;
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: center;
  }

  .aging-text-div {
    text-indent: 16px;
  }

  .text-nine {
    text-indent: 0;
  }
</style>
