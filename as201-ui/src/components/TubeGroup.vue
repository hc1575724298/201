<template>
  <div class="container-tube-group">
    <div class="sort">
      <div class="header flexClo">
        <template v-if="protocalInfo.cartridge === 2">
          <div class="well-2Ml">
            <span v-for="i in 12" :key="i">{{13-i}}</span>
          </div>
        </template>
        <template v-if="protocalInfo.cartridge === 8">
          <div class="well-8Ml">
            <span v-for="i in 10" :key="i">{{11-i}}</span>
          </div>
        </template>
        <template v-if="protocalInfo.cartridge === 15">
          <div class="well-15Ml">
            <span v-for="i in 8" :key="i">{{9-i}}</span>
          </div>
        </template>
      </div>
      <div class="bottom flexClo">
        <span v-for="item in wellList" :key="item">{{item}}</span>
      </div>
    </div>
    <div class="col-string"></div>

    <el-checkbox-group
      fill="#5691d3"
      v-model="selectedList"
      @change="handleCheckedTubeChange"
    >
      <template>
        <div v-for="(item, i) in selected" :key="item">
          <TubeItem
            v-bind="$attrs"
            :isGroup="(i + 1) % 8 == 0"
            :selected="selectedList.includes(item)"
            :checked="checkedList.includes(item)"
            :tubeNum="protocalInfo.cartridge"
            @click.native="clickTubeItem(item)"
          />
          <div class="tubeNum">{{ item }}</div>

          <div class="checked-btn" @click="clickTubeItem(item)">
            <img
              src="@/images/run/6.png"
              alt=""
              v-if="!selectedList.includes(item) && !checkedList.length"
            />
            <img
              src="@/images/run/7.png"
              alt=""
              v-else-if="selectedList.includes(item) & !checkedList.length"
            />
            <img
              src="@/images/run/checkedTube.png"
              v-if="checkedList.includes(item)"
            />
          </div>
        </div>
      </template>
    </el-checkbox-group>
  </div>
</template>

<script>
import TubeItem from "@/components/TubeItem";
import { mapState as mapProtocolsState } from "vuex";
export default {
  name: "home",
  components: { TubeItem },
  props: {
    // 是否能被点击
    isDisabled: {
      type: Array,
      default: () => []
    },
    // 选中列表
    selectedList: {
      type: Array,
      default: () => []
    },
    //完成列表
    checkedList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkAll: false,
      selected: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24"
      ],
      isIndeterminate: true,
      wellList:['A',"B",'C','D','E']
    };
  },
  computed: {
    ...mapProtocolsState("protocols", ["protocalInfo"])
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleCheckAllChange(val) {
      this.selectedList = val
        ? [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24"
          ]
        : [];
      this.isIndeterminate = false;
    },
    handleCheckedTubeChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.selected.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.selected.length;
    },
    clickTubeItem(val) {
      if (this.isDisabled.includes(val)) {
        return;
      } else {
        let newList =[]
        if(this.selectedList.includes(val)){
          newList = this.selectedList.filter(v=>v !=val)
        }else {
          newList = [val,...this.selectedList]
        }
        // this.currentCheckedBtnList =newList
        this.$store.commit('protocols/changeSelectedTubeList',newList.sort((a,b)=>a-b))
      }
    }
  }
};
</script>

<style scoped>
.container-tube-group {
  display: flex;
  position: relative;
}
.sort {
  width: 32px;
  height: 682px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  height: 435px;
  padding: 5px;
}
.header span,
.bottom span {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.well-15Ml span{
   margin-bottom: -3px;
}
.well-8Ml span {
  margin-bottom: -4px;
}
.well-2Ml span {
  margin-bottom: -4px;
}
.well-15Ml span:nth-child(1),
.well-8Ml span:nth-child(1){
  margin-bottom: 20px;
}
.well-2Ml span:nth-child(1) {
  margin-bottom: 15px;
}
.well-15Ml span:last-child {
  margin-top: 85px;
}
.well-8Ml span:last-child {
  margin-top: 70px;
}
.well-2Ml span:nth-child(11) {
  margin: 43px 0 10px;
}
.bottom {
  padding-top: 35px;
  flex: 1;
  justify-content: space-between;
}
.flexClo {
  display: flex;
  flex-direction: column;
}

.el-checkbox-group {
  display: flex;
}
.item {
  display: flex;
  flex-direction: column;
}
.col-string {
  position: absolute;
  width: 1px;
  height: 770px;
  left: 46px;
  top: 0;
  background-color: #c2cbda;
}
/* 多选框按钮 */
.checkbox-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.el-checkbox-button:last-child >>> .el-checkbox-button__inner {
  width: 30px !important;
  height: 35px;
  border-radius: 50%;
  border: solid 1px #5691d3;
}
.tubeNum {
  width: 22px;
  height: 22px;
  margin: 3px 12px 10px;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  color: #333333;
}

.checked-btn {
  padding-left: 10px;
}
</style>
