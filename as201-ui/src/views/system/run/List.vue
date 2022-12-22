<template>
  <div class="run-list">
    <RunHead />
    <el-table
      height="875"
      ref="protocolsTable"
      highlight-current-row
      @row-click="clickRow"
      :data="protocolsList"
      class="protocols-list"
      :header-cell-style="{
        background: '#4C7CB2',
        color: '#ffffff',
        width: '100%',
        height: '69px',
        fontSize: '24px',
        boxSizing: 'border-box'
      }"
       v-loadmore ="loadMore"
    >
      <el-table-column
        type="index"
        :label="$t('language.no_num')"
        width="130"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.$index | handleNo }}
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        :label="$t('language.name_A_Z')"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot="header">
          <div v-if="sort_name === 1">
            {{ $t("language.name_A_Z") }}
            <img
              src="../../../images/users/sort_down.png"
              @click="changeSort('name')"
              class="sort-icon"
            />
          </div>
          <div v-else-if="sort_name === 2">
            {{ $t("language.name_Z_A") }}
            <img
              src="../../../images/users/sort_top.png"
              @click="changeSort('name')"
              class="sort-icon"
            />
          </div>
          <div v-else-if="sort_name === 3">
            {{ $t("language.name_A_Z") }}
            <img
              src="@/images/run/未选中.png"
              @click="changeSort('name')"
              class="sort-icon"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="cartridge"
        :label="$t('language.cartridge')"
        align="center"
        :formatter="handleCartridge"
      >
      </el-table-column>
      <el-table-column
        prop="pre_packaged"
        :label="$t('language.pre_packaged')"
        align="center"
        :formatter="handlePrePackaged"
      >
      </el-table-column>
      <el-table-column
        prop="creator_name"
        :label="$t('language.user_A_Z')"
        align="center"
        class="operation"
      >
      <template slot="header">
          <div v-if="sort_user === 1">
            {{ $t("language.user_A_Z") }}
            <img
              src="../../../images/users/sort_down.png"
              @click="changeSort('user')"
              class="sort-icon"
            />
          </div>
          <div v-else-if="sort_user === 2">
            {{ $t("language.user_Z_A") }}
            <img
              src="../../../images/users/sort_top.png"
              @click="changeSort('user')"
              class="sort-icon"
            />
          </div>
          <div v-else-if="sort_user === 3">
            {{ $t("language.user_A_Z") }}
            <img
              src="@/images/run/未选中.png"
              @click="changeSort('user')"
              class="sort-icon"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="updated_at"
        align="center"
        :label="$t('language.timeNewToOld')"
        :formatter="handleupdatedTime"
      >
        <template slot="header">
          <div v-if="sort_time === 1" class="time-sort">
            {{ $t("language.timeNewToOld") }}
            <img
              src="../../../images/users/sort_down.png"
              @click="changeSort('time')"
              class="sort-icon"
            />
          </div>
          <div v-else-if="sort_time === 2" class="time-sort">
            {{ $t("language.timeOldToNew") }}
            <img
              src="../../../images/users/sort_top.png"
              @click="changeSort('time')"
              class="sort-icon"
            />
          </div>
          <div v-else-if="sort_time === 3" class="time-sort">
            {{ $t("language.timeNewToOld") }}
            <img
              src="@/images/run/未选中.png"
              @click="changeSort('time')"
              class="sort-icon"
            />
          </div>
        </template>
      </el-table-column>
      <template slot="append">
        <p v-if="loading">{{$t('language.loading')}}</p>
        <p v-if="!!protocolsList.length&&noMore">{{$t('language.no_more')}}</p>
      </template>
    </el-table>
    <RunFooter :isDisabledRunBtn ="isDisabledRunFooterBtn"/>
  </div>
</template>

<script>
import RunHead from "@/components/RunHead";
import RunFooter from "@/components/RunFooter";
import { sortProtocolsList} from "@/api/run";
export default {
  components: {
    RunHead,
    RunFooter
  },
  data() {
    return {
      protocolsList: [],
      sort_time: 1, // 1:正序  2：倒叙  3：未选中
      sort_name: 3,
      sort_user: 3,
      isDisabledRunFooterBtn: false,
      loading: false,
      page:1,
      count: 0,// 程序总数
      collation: 'updated_at',//排序规则
      order: 0,// 排序顺序
    };
  },
  watch: {
    protocolsList() {
      this.$nextTick(() => {
        this.$refs.protocolsTable.setCurrentRow(this.protocolsList[0]);
      });
    }
  },
  computed:{
    noMore(){
      return this.protocolsList.length >= this.count
    }
  },
  mounted() {},
  methods: {
    // 获取列表
    async getProtocolList(page) {
      const {data}= await sortProtocolsList({
        page: this.page,
        collation:this.collation,
        order: this.order,
      });
      this.protocolsList =[...this.protocolsList, ...data.data];
      this.count = data.count
      this.page++
    },
    async sortProtocolsListApi(sort){
      const { data } = await sortProtocolsList(sort)
      this.protocolsList = data.data;
    },
    //点击某一行
    clickRow(row) {
      this.$store.commit("protocols/updatedInfo", [row, "list"]);
    },
    handleCartridge(row) {
      return row.cartridge + 'ml';
    },
    handlePrePackaged(row) {
      return row.pre_packaged ? this.$t('language.yes') : this.$t('language.no');
    },
    handleupdatedTime(row) {
      if(this.$store.state.languageCode) {
        return this.pub.changeSecondsToSecondTime(
            row.updated_at,
            "en-US"
          )
      }else{
        return this.pub.changeSecondsToSecondTime(
            row.updated_at,
            "zh-CN"
          )
      }
    },
    //时间反转
    changeSort(val) {
      this.protocolsList =[]
      this.page = 1
      if (val === "time") {
        const res=this.changeSortStatus(this.sort_time,'updated_at')
        this.sort_time = res
        this.sort_name =this.sort_user=3;
      } else if (val === "name") {
        const res=this.changeSortStatus(this.sort_name,'protocol_name')
        this.sort_name = res
        this.sort_time = this.sort_user =3;
      }else {
        const res=this.changeSortStatus(this.sort_user,'creator_name')
        this.sort_user = res
        this.sort_time = this.sort_name =3;
      }
    },
    changeSortStatus(select,which) {
      if(select===1) {
         this.sortProtocolsListApi({
            page: this.page,
            collation: which,
            order: 0
          })
          select = 2
          this.order = 0
        }else if (select===2||select===3) {
          this.sortProtocolsListApi({
            page: this.page,
            collation: which,
            order: 1
          })
          select = 1
          this.order = 1
        }
        this.collation = which
        return select
    },
    // 分页
   loadMore(){
      if(this.protocolsList.length >=this.count )return
      this.loading = true;
      this.getProtocolList()
      this.loading = false
    }
  },
  async created() {
    await this.getProtocolList()
    this.clickRow(this.protocolsList[0]);
    if(!this.protocolsList.length){
       this.isDisabledRunFooterBtn = true;
    }
  },
  filters: {
    handleNo(index) {
      return index >= 9 ? index + 1 : "0" + (index + 1);
    }
  }
};
</script>

<style scoped="scoped">
.run-list {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 23px 35px 26px 40px;
}
.protocols-list {
  width: 1675px;
  height: 875px;
  background-color: #ffffff;
  border-radius: 10px;
  border: solid 1px #c2cbda;
  color: #333333;
  font-size: 24px;
  box-sizing: border-box;
  overflow: auto;
}
.el-table .el-table__cell.gutter {
  width: 0;
}
.sort-icon {
  margin-left: 18px;
}
.el-table >>> .cell {
  line-height: 30px;
}
.el-table >>>.el-table__cell {
  padding: 20px 0;
}
.el-table >>>.el-table__append-wrapper {
  text-align: center;
}
</style>
<style>
.run-list .el-table__body tr.current-row > td.el-table__cell {
  background-color: #cee1f5 !important;
}

.protocols-list ,.protocols-list  div,.protocols-list  span,.protocols-list table,.protocols-list tbody,.protocols-list td,.protocols-list tr{
    touch-action: pan-y !important;
  }
</style>
