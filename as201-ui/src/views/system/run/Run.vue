<template>
  <div class="run-favorites">
    <RunHead />
    <div class="run-favorites-content">
      <!-- 左侧 -->
      <div class="run-favorites-content-left" v-infinite-scroll="load">
        <div v-for="item in farvoritesList" :key="item.id" @click="chooseProtocal(item.id, 'run')"
          :class="{ check: isCheckId === item.id }">
          <div class="content-left-img">
            <img src="@/images/run/precept-check.png" alt="" v-if="isCheckId === item.id" />
            <img src="@/images/run/precept-uncheck.png" alt="" v-else />
          </div>
          <div style="width: 290px">
            <div class="protocol-name ellipsis" :class="{ check: isCheckId === item.id }" :title=" item.name">
              {{ item.name }}
            </div>
            <div class="protocol-time ellipsis" :class="{ check: isCheckId === item.id }">
              {{ item.updated_at | handleTime }}
            </div>
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="run-favorites-content-right">
        <div>
          <div class="right-title">{{ $t("language.information") }}</div>
          <el-row style="margin-bottom: 28px;">
            <el-col :span="12">
              <span class="Infomation-title">{{ $t("language.protocol_name") }}：</span>
              <span class="Infomation-info more ellipsis">{{
                thisOneProtocal && thisOneProtocal.name
              }}</span>
            </el-col>
            <el-col :span="6">
              <span class="Infomation-title">{{ $t("language.pre_packaged") }}：</span>
              <span class="Infomation-info">{{
                thisOneProtocal &&
                  (thisOneProtocal.pre_packaged
                    ? $t("language.yes")
                    : $t("language.no"))
              }}</span>
            </el-col>
            <el-col :span="6">

              <span class="Infomation-title">{{ $t("language.cartridge") }}：</span>
              <span class="Infomation-info">{{
                  (thisOneProtocal ? thisOneProtocal.cartridge : "") + 'ml'
                }}
              </span>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 39px;">
            <el-col :span="12">
              <span class="Infomation-title">{{ $t("language.time") }}：</span>
              <span class="Infomation-info" v-if="thisOneProtocal">{{
                thisOneProtocal && thisOneProtocal.updated_at | handleTime
              }}</span>
              <span class="Infomation-info" v-else> </span>
            </el-col>

            <el-col :span="11">
              <span class="Infomation-title">{{ $t("language.expected_run_time") }}：</span>
              <span class="Infomation-info">
                {{
                thisOneProtocal && thisOneProtocal.expected_run_time
              }}
              </span>
            </el-col>
          </el-row>
        </div>
        <div>
          <div class="right-title">{{ $t("language.remark") }}</div>
          <div class="remark ellipsis-2">
            - {{ thisOneProtocal &&thisOneProtocal.remark &&thisOneProtocal.remark }}
          </div>
        </div>
        <div>
          <div class="right-title">{{ $t("language.labware") }}</div>
          <div class="labware-pic">
            <img src="@/images/run/大图2ML.png" v-if="thisOneProtocal && thisOneProtocal.cartridge === 2" />
            <img src="@/images/run/大图8ML.png" v-if="thisOneProtocal && thisOneProtocal.cartridge === 8" />
            <img src="@/images/run/大图15ML.png" v-if="thisOneProtocal && thisOneProtocal.cartridge === 15" />
            <p>
              {{
                $t("language.cartridge_rack") +
                  "：" +
                  (thisOneProtocal ? thisOneProtocal.cartridge : "") +
                  "&ensp;" + 'ml'
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <RunFooter :isDisabledRunBtn ="isDisabledRunFooterBtn"/>


  </div>
</template>

<script>
import RunHead from "@/components/RunHead";
import RunFooter from "@/components/RunFooter";
import { getAllProtocol } from "@/api/run";
export default {
  components: {
    RunHead,
    RunFooter,
  },
  data() {
    return {
      protocolsList: [],
      thisOneProtocal: {},
      isCheckId: "",
      isDisabledRunFooterBtn: false,
      farvoritesList:[]
    };
  },
  methods: {
    // 获取列表
    async getAllProtocol() {
      const { data } = await getAllProtocol();
      this.protocolsList = data;
      this.farvoritesList =this.protocolsList.filter(item => item.favorites === 1).slice(0,10)
    },
      // 右侧数据
      chooseProtocal(id, name) {
        this.thisOneProtocal = this.protocolsList.find(item => item.id === id);
        this.$store.commit("protocols/updatedInfo", [this.thisOneProtocal, name]);
        this.isCheckId = id;
      },
      // 分页
      load() {
        this.farvoritesList = [...this.farvoritesList, ...this.protocolsList.filter(item => item.favorites === 1).slice(
          this.farvoritesList.length, this.farvoritesList.length + 10)]
      }
    },
    async created() {
      await this.getAllProtocol();
      this.isCheckId =
        this.farvoritesList &&
        this.farvoritesList[0] &&
        this.farvoritesList[0].id;
      this.chooseProtocal(this.isCheckId, "run");
      if (!this.farvoritesList.length) {
        this.isDisabledRunFooterBtn = true;
      }
    }
  };
</script>

<style scoped="scoped">
/* 点击选中类名 */
.check {
  background-color: #4c7cb2 !important;
  color: #fff !important;
}
div {
  box-sizing: border-box !important;
}
.run-favorites {
  height: 100%;
  width: 100%;
  padding: 23px 35px 26px 40px;
}
.run-favorites-content {
  box-sizing: border-box;
  display: flex;
}
/* 左侧 */
.run-favorites-content-left {
  max-height: 876px;
  flex: 1;
  overflow: auto;
  margin-right: 9px;
}
.run-favorites-content-left > div {
  display: flex;
  align-items: center;
  padding: 21px 20px 26px 33px;
  width: 430px;
  height: 124px;
  background-color: #fff;
  border-radius: 8px;
  font-size: 24px;
  line-height: 28px;
  margin-bottom: 26px;
}
.content-left-img {
  margin-right: 30px;
  width: 58px;
  height: 47px;
}
.content-left-img img {
  width: 100%;
  height: 100%;
}
.protocol-name {
  width: 100%;
  color: #333333;
  margin-bottom: 26px;
}
.more {
  width: 42%;
}
.protocol-time {
  width: 100%;
  color: #666666;
}
/* 右侧 */
.run-favorites-content-right {
  width: 1217px;
  height: 876px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #c2cbda;
  padding: 33px 38px 36px 30px;
}
.right-title {
  font-family: Arial;
  font-size: 26px;
  line-height: 28px;
  letter-spacing: 0px;
  color: #333333;
  margin-bottom: 25px;
  font-weight: 700;
}

.labware-pic {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1141px;
  height: 454px;
  background-color: #ffffff;
  border: dashed 1px #707070;
}
.labware-pic > img {
  width: 475px;
  height: 165px;
}
.labware-pic p {
  margin-top: 30px;
}
.Infomation-title,
.Infomation-info,
.labware-pic p {
  font-size: 24px;
  line-height: 28px;
  letter-spacing: 0px;
  color: #333333;
}
.Infomation-title {
  color: #666666;
}
*::-webkit-scrollbar-track {
  background: unset !important;
}
.remark {
  /* text-indent: 2em; */
  height: 60px;
  margin-bottom: 10px;
  font-size: 24px;
  color: #333333;
}
</style>
<style>
  .run-favorites-content-left,
  .run-favorites-content-left div,
  .run-favorites-content-left img {
    touch-action: pan-y !important;
  }
</style>
