<template>
  <div class="add-protocol">
    <div class="system-head-info">
      <div class="back-div">
        <img src="../../../images/system/back.png" class="back-img" @click="backTo()" />
      </div>
      <div class="middle-div">{{page_title}}</div>
      <div class="right-div">
        <img src="../../../images/protocols/save-protocol.png" class="save-img" @click="save()" />
      </div>
    </div>
    <div class="basic-step-div">
      <div class="basic-div" v-for="(item,index) in newOptions" :key="index">
        <div class="basic-img-div" :class="{'selected-basic':selected_id==item.id}" @click="changeOption(item.id)">
          <div>
            <div class="basic-img-model">
              <img :src="item.unselected_src" v-if="selected_id!=item.id" />
              <img :src="item.selected_src" v-else />
            </div>
            <div class="basic-text-model" :class="{'selected-text':selected_id==item.id}">{{item.description}}</div>
          </div>
        </div>
        <div class="divider-basic" v-if="item.id==1" />
      </div>
    </div>
    <NewBasic class="new-basic" v-if="selected_id==1"></NewBasic>
    <Steps v-if="selected_id==2" class="steps"></Steps>
  </div>

</template>

<script>
  import NewBasic from '@/components/NewBasic'
  import Steps from '@/components/Steps'
  import {
    saveProtocols
  } from '@/api/protocols.js'
  import {
    searchLabwares
  } from '@/api/setting.js'
  import moment from "moment"
  export default {
    components: {
      NewBasic,Steps
    },
    data() {
      return {
        page_title: this.$t("language.new_protocol"),
        newOptions: [{
          id: 1,
          description: this.$t("language.basic"),
          unselected_src: require("../../../images/protocols/unselected-basic.png"),
          selected_src: require("../../../images/protocols/selected-basic.png")
        }, {
          id: 2,
          description: this.$t("language.step"),
          unselected_src: require("../../../images/protocols/unselected-step.png"),
          selected_src: require("../../../images/protocols/selected-step.png")
        }],
        selected_id: 1,
      }
    },
    mounted() {
      var newprotocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
      if (this.$route.params.type == 'new') {
        newprotocol.steps = []
        this.page_title= this.$t("language.new_protocol")
        this.$store.commit('setProtocol',newprotocol)
      }else{
        this.page_title= this.$t("language.edit_protocol")
      }
    },
    methods: {
      changeOption(id) {
        this.selected_id = id;
      },
      backTo() {
        this.$router.push({
          name: 'protocols'
        })
      },
      save() {
        if(this.$store.getters.saveProrocolStatus==0){
          return this.$message({
            type:"error",
            message:"程序错误无法保存"
          })
        }else{
          var protocol = this.$store.getters.protocol;
          if (this.$route.params.type == 'new') {
            protocol.id = 0;
            protocol.created_at = 0;
            protocol.updated_at = 0;
          }
          this.$store.commit('setProtocol', protocol)
          saveProtocols({
            'protocol': JSON.stringify(this.$store.getters.protocol)
          }).then((res) => {
            if (res.code == 0) {
              this.$message({
                type: 'success',
                message: this.$t("language.save_success")
              })
              this.$router.push({
                name: 'protocols'
              })
            }else if (res.code == -4) {
              this.$message({
                type: 'error',
                message: this.$t("language.error_protocol")
              })
            }
          })
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .add-protocol {
    width: 100%;
    height: 100%;
    background-color: #F3F4F6;
  }

  .system-head-info {
    color: white;
    height: 90px;
    width: 100%;
    font-size: 24px;
    background-color: #274261;
  }

  .back-div {
    float: left;
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;

  }

  .middle-div {
    float: left;
    width: 50%;
    height: 100%;
    font-size: 30px;
    text-align: center;
    line-height: 90px;
  }

  .right-div {
    float: left;
    position: relative;
    height: 100%;
    width: 25%;
    display: flex;
    align-items: center;
  }

  .back-img {
    float: left;
    margin-left: 33px;
  }

  .save-img {
    position: absolute;
    right: 31px;
  }

  .basic-step-div {
    float: left;
    width: 150px;
    height: 1048px;
    background-color: #ffffff;
    border-radius: 6px;
    border: solid 1px #c2cbda;
    font-size: 24px;
    margin-left: 30px;
    margin-top: 30px;
  }

  .basic-div {
    width: 100%;
    height: 144px;
    position: relative;
  }

  .basic-img-div {
    width: 126px;
    height: 126px;
    margin-top: 20px;
    background-color: #ffffff;
    margin-left: 12px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .basic-img-model {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;

  }

  .basic-text-model {
    font-size: 24px;
    text-align: center;
    margin-top: 15px;
    color: #6e7a88;
  }

  .divider-basic {
    position: absolute;
    bottom: 0;
    width: 104px;
    height: 1px;
    margin-left: 23px;
    background-color: #c2cbda;
  }

  .selected-basic {
    background-color: #4C7CB2;
  }

  .selected-text {
    color: white;
  }

  .new-basic {
    float: left;
    margin-left: 24px;
    margin-top: 30px;
  }
  .steps{
    float: left;
    margin-left: 24px;
    margin-top: 30px;
  }
</style>
