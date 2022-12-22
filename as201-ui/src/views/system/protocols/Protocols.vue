<template>
  <div class="run-list">
    <div class="title-div">
      <ContentTitle :title="list" style="float: left;"></ContentTitle>
      <img src="../../../images/protocols/search.png" class="img-div" @click="search()" />
      <img src="../../../images/protocols/save-as.png" class="img-div img-save" @click="saveAs()"
        v-if="$store.getters.user.group!='user'&& is_selected==true" />
      <img src="../../../images/setting/unselected_saveAs.png" class="img-div img-save" @click="saveAs()"
        v-if="$store.getters.user.group!='user'&&is_selected==false" />
      <img src="../../../images/protocols/new-protocols.png" class="img-div img-new" @click="newProtocol"
        v-if="$store.getters.user.group!='user' && !($store.getters.user.group=='advanced_user'&&$store.getters.encryption==1)" />
    </div>
    <el-table ref="protocolsTable" :data="protocolsList" highlight-current-row @row-click="clickRow"
      class="protocols-list" :header-cell-style="{
        background: '#4C7CB2',
        color: '#ffffff',
        width: '100%',
        height: '69px',
        fontSize: '24px'
      }" max-height="875" v-loadmore="load">
      <el-table-column type="sort_id" :label="$t('language.no_num')" width="130" align="center">
        <template slot-scope="scope">
          {{
            scope.$index + 1 < 10 ? "0" + (scope.$index + 1) : scope.$index + 1
          }}
        </template>
      </el-table-column>
      <el-table-column prop="name" :label="$t('language.name_az')" align="center" :show-overflow-tooltip="true">
        <template slot="header">
          <div v-if="name_sort == true">
            <div v-if="name_flag == true">
              {{ $t("language.name_az") }}
              <img src="../../../images/users/sort_down.png" @click="changeSort(1)" class="sort-icon" />
            </div>
            <div v-if="name_flag == false">
              {{ $t("language.name_za") }}
              <img src="../../../images/users/sort_top.png" @click="changeSort(2)" class="sort-icon" />
            </div>
          </div>
          <div v-if="name_sort == false">
            {{ $t("language.name_az") }}
            <img src="../../../images/setting/unselected.png" @click="changeSort(3)" class="sort-icon" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="cartridge" :label="$t('language.cartridge')" align="center">
      </el-table-column>
      <el-table-column prop="pre_packaged" :label="$t('language.pre_packaged')" align="center">
      </el-table-column>
      <el-table-column prop="creator_name" :label="$t('language.user_A_Z')" align="center" class="operation">
        <template slot="header">
          <div v-if="user_sort == true">
            <div v-if="user_flag == true">
              {{ $t("language.user_A_Z") }}
              <img src="../../../images/users/sort_down.png" @click="changeSort(4)" class="sort-icon" />
            </div>
            <div v-if="user_flag == false">
              {{ $t("language.user_Z_A") }}
              <img src="../../../images/users/sort_top.png" @click="changeSort(5)" class="sort-icon" />
            </div>
          </div>
          <div v-if="user_sort == false">
            {{ $t("language.user_A_Z") }}
            <img src="../../../images/setting/unselected.png" @click="changeSort(6)" class="sort-icon" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" align="center" :label="$t('language.timeNewToOld')">
        <template slot="header">
          <div v-if="time_sort == true">
            <div v-if="time_flag == true">
              {{ $t("language.timeNewToOld") }}
              <img src="../../../images/users/sort_down.png" @click="changeSort(7)" class="sort-icon" />
            </div>
            <div v-if="time_flag == false">
              {{ $t("language.timeOldToNew") }}
              <img src="../../../images/users/sort_top.png" @click="changeSort(8)" class="sort-icon" />
            </div>
          </div>
          <div v-if="time_sort == false">
            {{ $t("language.timeNewToOld") }}
            <img src="../../../images/setting/unselected.png" @click="changeSort(9)" class="sort-icon" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="is_farvorites" :label="$t('language.favorites')" align="center">
        <template slot-scope="scope">
          <img src="../../../images/protocols/collected.png" class="edit-icon"
            @click="isFavorites(scope.$index, scope.row)" v-if="protocolsList[scope.$index].favorites" />
          <img src="../../../images/protocols/uncollected.png" class="edit-icon"
            @click="isFavorites(scope.$index, scope.row)" v-else />
        </template>
      </el-table-column>
    </el-table>
    <div class="tube-info-button">
      <div class="button-div save" @click="manageRouter()">
        {{ this.$t("language.manage") }}
      </div>
      <div class="button-div factory" @click="editProtocol()" v-if="$store.getters.user.group != 'user'"
        :class="{ 'unselect-edit': is_selected }">
        {{ this.$t("language.edit") }}
      </div>
    </div>
    <ProtocolsSaveAs v-if="save_as_status" @close="closeSaveAs" :protocolsName="protocol_name"
      :protocolsId="protocol_id"></ProtocolsSaveAs>
    <SearchProtocols v-if="search_protocols_status" @closeSearch="closeSearch" @okSearchProtocol="okfind"
      :Time_merge="start_end">
    </SearchProtocols>
  </div>
</template>

<script>
  import ContentTitle from "@/components/ContentTitle";
  import moment from "moment";
  import ProtocolsSaveAs from "@/components/ProtocolsSaveAs";
  import SearchProtocols from "@/components/SearchProtocols";
  import {
    getProtocols
  } from "@/api/protocols";
  import {
    favorites
  } from "@/api/protocols";
  import {
    searchProtocolInfor
  } from "@/api/protocols";
  export default {
    components: {
      ContentTitle,
      ProtocolsSaveAs,
      SearchProtocols
    },
    data() {
      return {
        protocolsList: [],
        start_end: {
          protocol_name: null,
          user_name: null,
          start_time: null,
          end_time: null
        },
        user_sort: false,
        name_sort: false,
        time_sort: true,
        name_flag: false,
        time_flag: true,
        user_flag: false,
        list: this.$t("language.list"),
        is_favorites: null,
        save_as_status: false,
        search_protocols_status: false,
        protocol_id: null,
        protocol_name: null,
        collation: "updated_at",
        order: 0,
        parent_condition: {
          protocol_name: null,
          user_name: null,
          start_time: null,
          end_time: null
        },
        new_protocol: {
          name: null,
          cartridge: 8,
          pre_packaged: 1,
          favorites:0,
          well_a: "1.5ml_Allsheng",
          well_b: "1.5ml_Allsheng",
          well_c: "1.5ml_Allsheng",
          well_e: 1,
          remark: null,
          update: null
        },
        is_selected: false,
        selected_row: null,
        page: 1,
        count: null,
        isload: false
      };
    },
    mounted() {
      this.getProtocolsData();
      this.start_end.start_time = this.$store.getters.systemTime;
      this.start_end.end_time = this.$store.getters.systemTime;
      this.start_end.protocol_name = null;
      this.start_end.user_name = null;
    },
    methods: {
      load() {
        if (this.protocolsList.length >= this.count) {
          return;
        }
        this.isload = true;
        this.getProtocolsData();
      },
      changeSort(type) {
        if (type == 1) {
          this.name_sort = true;
          this.user_sort = false;
          this.time_sort = false;
          this.name_flag = false;
          this.order = 0;
          this.collation = "protocol_name";
        } else if (type == 2) {
          this.name_sort = true;
          this.user_sort = false;
          this.time_sort = false;
          this.name_flag = true;
          this.order = 1;
          this.collation = "protocol_name";
        } else if (type == 3) {
          this.name_sort = true;
          this.time_sort = false;
          this.time_sort = false;
          this.name_flag = true;
          this.order = 1;
          this.collation = "protocol_name";
        } else if (type == 4) {
          this.name_sort = false;
          this.user_sort = true;
          this.time_sort = false;
          this.user_flag = false;
          this.collation = "creator_name";
          this.order = 0;
        } else if (type == 5) {
          this.name_sort = false;
          this.user_sort = true;
          this.time_sort = false;
          this.user_flag = true;
          this.collation = "creator_name";
          this.order = 1;
        } else if (type == 6) {
          this.name_sort = false;
          this.user_sort = true;
          this.time_sort = false;
          this.user_flag = true;
          this.collation = "creator_name";
          this.order = 1;
        } else if (type == 7) {
          this.name_sort = false;
          this.user_sort = false;
          this.time_sort = true;
          this.time_flag = false;
          this.collation = "updated_at";
          this.order = 1;
        } else if (type == 8) {
          this.name_sort = false;
          this.user_sort = false;
          this.time_sort = true;
          this.time_flag = true;
          this.collation = "updated_at";
          this.order = 0;
        } else if (type == 9) {
          this.name_sort = false;
          this.user_sort = false;
          this.time_sort = true;
          this.time_flag = true;
          this.collation = "updated_at";
          this.order = 0;
        }
        this.getProtocolsData();
      },
      getProtocolsData() {
        if (this.isload) {
          this.page += 1;
        } else {
          this.protocolsList = [];
          this.page = 1;
        }
        getProtocols({
          protocol_name: this.parent_condition.protocol_name,
          username: this.parent_condition.user_name,
          start_date: this.parent_condition.start_time,
          ending_date: this.parent_condition.end_time,
          collation: this.collation,
          order: this.order,
          page: this.page
        }).then(res => {
          if (res.code == 0) {
            this.count = res.data.count;
            var data = res.data.data;
            for (var i = 0; i < data.length; i++) {
              data[i].updated_at = moment(data[i].updated_at * 1000).format(
                "MM/DD/YYYY HH:mm:ss"
              );
            }
            if (this.isload) {
              this.protocolsList = this.protocolsList.concat(data);
            } else {
              this.protocolsList = data;
            }
            this.isload = false;
          }
        });
      },
      editProtocol() {
        if (this.protocol_id == null) {
          return;
        } else {
          if (this.$store.getters.user.group == "advanced_user") {
            if (
              this.selected_row.creator_name != this.$store.getters.user.username
            ) {
              return;
            }
          }
          this.$router.push({
            name: 'AddProtocol',
            params: {
              type: 'edit'
            }
          })
        }
      },
      isFavorites(index, row) {
        this.protocolsList[index].favorites = !this.protocolsList[index].favorites ? 1 : 0
        favorites({
          'protocol_id': this.protocolsList[index].id,
          'favorites': this.protocolsList[index].favorites
        }).then((res) => {})
      },
      manageRouter() {
        this.$router.push({
          name: "ProtocolsManage"
        })
      },
      saveAs() {
        if (this.is_selected == false) {
          return
        } {
          this.save_as_status = true
        }
      },
      closeSaveAs() {
        this.save_as_status = false
        this.isload = false
        this.protocol_name = null
        this.getProtocolsData()
      },
      clickRow(row, column, event) {
        this.protocol_id = row.id
        this.protocol_name = row.name
        this.selected_row = row
        this.is_selected = true
        searchProtocolInfor({
          'protocol_id': row.id
        }).then((res) => {
          this.$store.commit('setProtocol', res.data)
        })
      },
      search() {
        this.search_protocols_status = true
      },
      closeSearch() {
        this.search_protocols_status = false
        this.isload = false;
        this.getProtocolsData()
      },
      okfind(condition) {
        this.parent_condition = condition
        this.search_protocols_status = false
        this.start_end.start_time = condition.start_time
        this.start_end.end_time = condition.end_time
        this.start_end.protocol_name = condition.protocol_name
        this.start_end.user_name = condition.user_name
        this.parent_condition.start_time = (moment(condition.start_time).startOf('day').format('x')) / 1000
        this.parent_condition.end_time = (moment(condition.end_time).startOf('day').format('x')) / 1000
        this.parent_condition.protocol_name = condition.protocol_name
        this.parent_condition.user_name = condition.user_name
        this.isload = false
        this.getProtocolsData()
      },
      newProtocol() {
        var time = JSON.parse(JSON.stringify(this.$store.getters.systemTime));
        let pro_name = ""
        var name = [];
        name = time.split("")
        pro_name += name[6] + name[7] + name[8] + name[9] + name[0] + name[1] + name[3] + name[4] + name[11] + name[
          12] + name[14] + name[15] + name[17] + name[18]
        this.new_protocol.name = pro_name;
        this.$store.commit('setProtocol', this.new_protocol)
        this.$router.push({
          name: "AddProtocol",
          params: {
            type: "new"
          }
        });
      }
      },

    }
</script>

<style scoped="scoped">
  .run-list {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 23px 35px 26px 40px;
  }

  .protocols-list {
    width: 1676px;
    height: 875px;
    border-radius: 10px;
    border: solid 1px #c2cbda;
    color: #333333;
    font-size: 24px;
    box-sizing: border-box;
  }

  .sort-icon {
    margin-left: 18px;
  }

  .el-table>>>.cell {
    line-height: 30px;
  }

  .title-div {
    height: 64px;
    width: 100%;
    margin-bottom: 20px;
  }

  .img-div {
    float: right;
  }

  .img-new,
  .img-save {
    margin-right: 21px;
  }

  .button-div {
    float: right;
    width: 193px;
    height: 64px;
    border-radius: 6px;
    line-height: 64px;
    font-size: 24px;
    text-align: center;
    margin-top: 23px;
  }

  .save {
    color: white;
    background-color: #5187c3;
  }

  .factory {
    border: solid 1px #c2cbda;
    margin-right: 32px;
    background-color: #d4d4d4;
    box-sizing: border-box;
  }

  .unselect-edit {
    background-color: #ffffff;
    border: solid 1px #4c7cb2;
  }
</style>
<style>
  .run-list .el-table__body tr.current-row>td.el-table__cell {
    background-color: #cee1f5 !important;
  }

  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #e8eef3 !important;
    border: 1px solid #dcdcdc;
  }

  *::-webkit-scrollbar-track {
    background: #ffffff;
  }

  .el-table__header thead>tr {
    background-color: #4c7cb2;
  }

  .el-table__header thead>tr .gutter {
    background-color: transparent;
    border-bottom: 1px solid #ebeef5;
    border-bottom-width: 1px !important;
  }

  .el-table th.el-table__cell>.cell {
    display: inline-block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    font-weight: 400;
  }

  .protocols-list,
  .protocols-list div,
  .protocols-list span,
  .protocols-list table,
  .protocols-list tbody,
  .protocols-list td,
  .protocols-list tr,
  .protocols-list img {
    touch-action: pan-y !important;
  }
</style>
