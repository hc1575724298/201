<template>
  <div class="container">
    <RunProgress :progressNum="1" />

    <div class="container-bottom">
      <!-- 左侧 -->
      <div class="container-bottom-left">
        <div class="title" style="margin-left: 0;">{{$t('language.sampleID')}}</div>
        <div class="postion-list sampleId-list">
          <div class="postion-item" v-for="item in sampleIdDataStore" :key="item.position">
            <div class="postion-title">
              <span>{{$t('language.position')}}</span>
              <span>{{item.position}}</span>
            </div>
            <input class="postion-input" @focus="focusPosition(item.position)" :value="item.sample_id"/>
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="container-bottom-right">
        <div class="title">
          {{ $t("language.worktable_select_sample_positions") }}
        </div>
        <TubeGroup
          :selectedList="selectedTubeList"
          :isDisabled="isDisabledList"
        />
        <div class="bottom">
          <div class="bottom-left">
            <div>
              {{ $t("language.selected") }}：<span>{{
                selectedTubeList.length
              }}</span>
            </div>
            <div class="select-all" @click="changeSelectAll">
              <span style="margin-right: 16px;"
                >{{ $t("language.select_all") }}:</span
              >
              <img
                src="@/images/run/select_all.png"
                alt=""
                v-if="selectAll || selectedTubeList.length === 24"
              />
              <img src="@/images/run/unselect_all.png" alt="" v-else />
            </div>
          </div>
          <div class="bottom-right">
            <!-- <button class="sampleId" @click="isShowSampleidDialog = !isShowSampleidDialog;">
              {{ $t("language.sampleID") }}
            </button> -->
            <button
              class="next"
              @click="clickNext"
              :disabled="isDisabledNextBtn"
            >
              {{ $t("language.next") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹框 -->
    <SampleIdDialog
       v-if="isShowSampleidDialog"
      :position="position"
      :isShowSampleidDialog="isShowSampleidDialog"
      @close="isShowSampleidDialog = false"
    />
  </div>
</template>

<script>
import TubeItem from "@/components/TubeItem";
import TubeGroup from "@/components/TubeGroup.vue";
import RunProgress from "@/components/RunProgress.vue";
import SampleIdDialog from "./components/SampleIdDialog.vue";
import { mapState as mapProtocolsState } from "vuex";
export default {
  components: {
    TubeItem,
    TubeGroup,
    RunProgress,
    SampleIdDialog
  },
  props: {},
  data() {
    return {
      isDisabledList: [],
      selectAll: false,
      selectedList: [],
      isShowSampleidDialog: false,
      isDisabledNextBtn: false,
      position: 0
    };
  },
  watch: {
    selectedTubeList(v) {
      const oldList = this.sampleIdDataStore.map(v => v.position);
      const newList = v.map(item => {
        if (oldList.includes(item)) {
          return this.sampleIdDataStore.find(v => v.position == item);
        } else {
          return {
            position: item,
            sample_id: "",
            note: ""
          };
        }
      });
      this.$store.commit("protocols/updatedSampleIdInfo", newList);
    }
  },
  computed: {
    ...mapProtocolsState("protocols", ["selectedTubeList", "sampleIdDataStore"])
  },
  methods: {
    //全选按钮
    changeSelectAll() {
      this.selectAll = !this.selectAll;
      if (this.selectAll) {
        this.selectedList = [
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
        ];
      } else {
        this.selectedList = [];
      }
      this.$store.commit("protocols/changeSelectedTubeList", this.selectedList);
    },
    clickNext() {
      if (this.selectedTubeList.length > 0) {
        this.$router.push({
          name: "loadlabware"
        });
      } else {
        this.isDisabledNextBtn = true;
        this.$message({
          message: this.$store.state.languageCode
            ? "Please select sample positions"
            : "请选择样本位置",
          type: "warning"
        });
      }
      this.isDisabledNextBtn = false;
    },
    focusPosition(p){
      this.position = p;
      this.isShowSampleidDialog=true
    }
  },
  created() {},
  mounted() {}
};
</script>
<style scoped>
div {
  box-sizing: border-box !important;
}
.container {
  /* width: 1920px;
  height: 100%; */
  padding: 20px 34px 30px;
  background-color: #f3f4f6;
}
.container-bottom {
  display: flex;
}
.container-bottom-left,
.container-bottom-right {
  background-color: #ffffff;
  border-radius: 6px;
  border: solid 1px #c2cbda;
}

.container-bottom-left {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 30px;
  padding-left: 22px;
  height: 967px;
}
.container-bottom-right {
  width: 1418px;
  height: 967px;
}
.title {
  font-size: 26px;
  color: #333;
  margin: 22px 0 18px 29px;
  font-weight: 700;
}
.bottom {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333333;
  font-size: 24px;
  padding: 40px 30px 0 52px;
}
.bottom-left,
.select-all {
  display: flex;
  align-items: center;
}
.select-all {
  margin-left: 110px;
}
.sampleId,
.next {
  width: 190px;
  height: 64px;
  border-radius: 6px;
}
.sampleId {
  background-image: linear-gradient(0deg, #ffffff 0%, #f2f7ff 100%);
  border: solid 1px #c2cbda;
  margin-right: 26px;
}
.next {
  float: right;
  color: #ffffff;
  background-image: linear-gradient(0deg, #5792d5 0%, #4c7cb2 100%);
  border: none;
}

/* 左侧 */
.sampleId-list {
  flex: 1;
  overflow: auto;
}
.postion-item {
  display: flex;
  align-items: center;
  margin: 0 16px 16px 0;
}
.postion-title {
  margin-right: 6px;
  width: 120px;
}
.postion-title span {
  font-size: 24px;
  color: #666666;
}
.postion-input {
  /* flex: 1; */
  width: 220px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #c7cfdd;
  font-size: 22px;
}
</style>
<style>
.sampleId-list,
.sampleId-list div,
.sampleId-list span,
.sampleId-list input{
  touch-action: pan-y !important;
}
</style>
