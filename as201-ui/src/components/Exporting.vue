<template>
  <div class="export-model">
    <div class="export-div">
        <img src="../images/run/wait.png"  style="margin-left: 60px;"/>
        <div class="img-text">{{imgText}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props:['img_type'],
    data() {
      return {
          imgType:null,
          imgText:null,
          exporting:this.$t("language.exporting"),
          importing:this.$t("language.importing")
      }
    },
    mounted() {
        this.getData()
    },
    methods: {
      getData(){
        if(this.img_type=='export'){
          this.imgText = this.exporting
        }else if(this.img_type=='import'){
          this.imgText = this.importing
        }
      }
    }
  }
</script>

<style scoped="scoped">
  .export-model {
    position: absolute;
    z-index: 1000;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0%;
    left: 0%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .export-div {
    width: 518px;
    height: 167px;
    background-color: #ffffff;
    border-radius: 8px;
    display: flex;
    align-items: center;
  }
  .img-text{
    font-size: 26px;
    margin-left: 27px;
  }
</style>
