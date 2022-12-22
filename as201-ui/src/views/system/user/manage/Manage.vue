<template>
  <div class="user-manage">
    <div class="manage-list">
      <div class="manage-list-icon"></div>
      <div class="manage-list-text">{{$t("language.list")}}</div>
    </div>
    <el-table :data="user_lists" :default-sort="{prop: 'date', order: 'descending'}" class="user-all"
      :header-cell-style="{ background: '#4C7CB2', color: '#ffffff'}" max-height="894" @select='selectRow'
      @select-all='selectRow'>
      <el-table-column prop="sort_id" :label="$t('language.no_num')" width="130" align="center">
        <template slot-scope="scope">
          {{(scope.$index+1)<10 ? '0'+(scope.$index+1):scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column type="selection" width="100" align="center">
      </el-table-column>
      <el-table-column prop="username" :label="$t('language.table_username')" width="330" align="center">
      </el-table-column>
      <el-table-column prop="group" :label="$t('language.group')" width="220" align="center">
      </el-table-column>
      <el-table-column prop="updated_at" width="320" align="center">
        <template slot="header">
          <div v-if="sort_code==true" class="time-sort">
            {{$t('language.timeNewToOld')}}
            <img src='../../../../images/users/sort_down.png' @click="changeSort()" class="sort-icon" />
          </div>
          <div v-if="sort_code==false" class="time-sort">
            {{$t('language.timeOldToNew')}}
            <img src='../../../../images/users/sort_top.png' @click="changeSort()" class="sort-icon" />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="operation" :label="$t('language.operation')" width="430" align="center" class="operation">
        <template slot-scope="scope">
          <img src="../../../../images/users/edit_name.png" class="edit-icon"
            @click="showEdit(scope.$index, scope.row)" />
          <img src="../../../../images/users/change_password.png" class="change-password-icon"
            @click="changeUsersPassword(scope.$index, scope.row)" />
          <img src="../../../../images/users/delete_user.png" class="delete-user-icon"
            @click="deleteUser(scope.$index,scope.row)" />
        </template>
      </el-table-column>
    </el-table>
    <div class="add-user" v-if="group!='user'" @click="add_option_code=!add_option_code">
      {{$t("language.add")}}
    </div>
    <div class="import-user" v-if="group=='factory'" @click="importDialog">
      {{$t("language.import")}}
    </div>
    <div class="export-user" v-if="group=='factory'" @click="exportDialog"
      :class="{'unselectedExport':selectedIds.length==0}">
      {{$t("language.export")}}
    </div>
    <AddUserOption v-if="add_option_code==1" @hide="add_option_code=0" @addUserinfo='addUserinfo'>
    </AddUserOption>
    <DeleteUser :deleteUserName='delete_name' v-if="delete_code" @closeDelete="closeDelete()" :user_id='userId'>
    </DeleteUser>
    <ModifiedUserName v-if="modified_code" @closeModified="closeModifiedUser()" :userid='userId'></ModifiedUserName>
    <ChangePassword v-if="show_change_password" @closeChangePassword="closeChangePassword()"
      :userPasswordId='userObject'>
    </ChangePassword>
    <AddUser v-if="show_add_code" @closeAddUser="show_add_code=0,getAll();" :add_type='selectedGroup'></AddUser>
    <ImportModel @closeImport='closeImportDialog' v-if="import_status" :path_type="'user'" @cancleImport='cancelimport'>
    </ImportModel>
    <CheckU v-if="check_Status" @closeCheck='check_Status=false'></CheckU>
    <Exporting :img_type="export_import" v-if="export_status"></Exporting>
    <FileRepeat v-if="file_status" @close="closeFileRepeat"></FileRepeat>
  </div>
</template>

<script>
  import moment from 'moment'
  import {
    getUsersAll
  } from "@/api/user"
  import {
    deletePassword
  } from "@/api/user"
  import {
    getUsbStatus
  } from "@/api/protocols"
  import {
    exportUser
  } from "@/api/user"
  import AddUserOption from '@/components/AddUserOption'
  import Exporting from '@/components/Exporting'
  import DeleteUser from '@/components/DeleteUser'
  import ModifiedUserName from '@/components/ModifiedUserName'
  import ChangePassword from '@/components/ChangePassword'
  import AddUser from '@/components/AddUser'
  import ImportModel from '@/components/ImportModel'
  import CheckU from '@/components/CheckU'
  import FileRepeat from '@/components/FileRepeat'
  export default {
    components: {
      AddUserOption,
      DeleteUser,
      ModifiedUserName,
      ChangePassword,
      AddUser,
      ImportModel,
      CheckU,
      Exporting,
      FileRepeat,
    },
    data() {
      return {
        group: "",
        userObject: null,
        selectedGroup: null,
        show_change_password: 0,
        modified_code: 0,
        delete_code: 0,
        delete_name: "",
        add_option_code: 0,
        show_add_code: 0,
        sort_code: true,
        user_lists: null,
        import_status: false,
        check_Status: false,
        selectedIds: [],
        export_status: false,
        file_status: false,
        export_import: null
      }
    },
    mounted() {
      this.getAll();
      this.getCurrentUser();
      this.EventBus.on(this.Notify.CODE_EXPORT_SUCCESS, (notify) => {
        this.export_status = false
        this.$message({
          type: 'success',
          message: this.$t("language.export_success")
        })
        this.getAll();
        this.selectedIds = []
      })
      this.EventBus.on(this.Notify.CODE_FILE_REAPT, (notify) => {
        this.file_status = true
      })
      this.EventBus.on(this.Notify.CODE_EXPORT_ERROR, (notify) => {
        this.$message({
          type: 'error',
          message: this.$t("language.export_error")
        })
        this.export_status = false
        this.getAll();
        this.selectedIds = []
      })
      this.EventBus.on(this.Notify.CODE_IMPORT_SUCCESS, (notify) => {
        this.$message({
          type: 'success',
          message: this.$t("language.import_success")
        })
        this.export_status = false
        this.getAll();
      })
      this.EventBus.on(this.Notify.CODE_IMPORT_ERROR, (notify) => {
        this.$message({
          type: 'error',
          message: this.$t("language.import_error")
        })
        this.export_status = false
        this.getAll();
      })
    },
    methods: {
      selectRow(selection, row) {
        this.selectedIds = [];
        for (let i = 0; i < selection.length; i++) {
          if (i == selection.length - 1) {
            this.selectedIds += "" + selection[i].id;
          } else {
            this.selectedIds += "" + selection[i].id + ",";
          }
        }
      },
      importDialog() {
        getUsbStatus().then((res) => {
          if (res.data == true) {
            this.import_status = true
          } else {
            this.check_Status = true
          }
        })
      },
      exportDialog() {
        this.export_import = 'export'
        if (this.selectedIds.length == 0) {
          return
        }
        getUsbStatus().then((res) => {
          if (res.code == 0) {
            exportUser({
              'user_ids': this.selectedIds
            }).then((res) => {})
          } else {
            this.check_Status = true
          }
          this.export_status = true
        })
        this.getAll();
      },
      getCurrentUser() {
        this.group = this.$store.getters.user.group;
      },
      getAll() {
        getUsersAll().then((res) => {
          this.user_lists = res.data;
          for (var i = 0; i < this.user_lists.length; i++) {
            this.user_lists[i].updated_at = moment(this.user_lists[i].updated_at * 1000).format(
              'MM/DD/YYYY HH:mm:ss')
          }
        })
        // this.selectedIds=[]
      },
      changeSort() {
        this.sort_code = !this.sort_code;
        this.user_lists = this.user_lists.reverse();
      },
      showEdit(index, row) {
        this.userId = row.id;
        this.modified_code = 1;
      },
      changeUsersPassword(index, row) {
        this.userObject = row;
        this.show_change_password = 1;
      },
      deleteUser(index, row) {
        this.userId = row.id;
        this.delete_name = "‘" + row.username + "’";
        this.delete_code = 1;
      },
      closeDelete() {
        this.delete_code = 0;
        this.getAll();
        this.selectedIds = []
      },
      closeModifiedUser() {
        this.modified_code = 0;
        this.getAll();
        this.selectedIds = []
      },
      closeChangePassword() {
        this.show_change_password = 0;
        this.getAll();
        this.selectedIds = []
      },
      addUserinfo(type) {
        this.add_option_code = 0;
        this.show_add_code = 1;
        this.selectedGroup = type;
      },
      closeImportDialog() {
        this.export_import = 'import'
        this.export_status = true
        this.import_status = false
        this.getAll();
        this.selectedIds = []
      },
      cancelimport() {
        this.export_import = null
        this.export_status = false
        this.import_status = false
        this.getAll();
        this.selectedIds = []
      },
      closeFileRepeat() {
        this.file_status = false
      }
    },
  }
</script>
<style scoped="scoped">
  .manage-list {
    display: flex;
    height: 30px;
    width: 100%;
    margin-top: 30px;
  }

  .manage-list-icon {
    height: 27px;
    width: 5px;
    background-color: #4C7CB2;
    margin-left: 30px;
  }

  .manage-list-text {
    height: 100%;
    font-size: 27px;
    font-weight: 500;
    margin-left: 18px;
    color: black;
  }

  .user-all {
    width: 1530px;
    height: 894px;
    margin-left: 30px;
    margin-top: 30px;
    border-radius: 5px;
    font-size: 22px;
  }

  .time-sort {
    align-items: center;
  }

  .sort-icon {
    margin-left: 18px;
  }

  .edit-icon {
    width: 31px;
    height: 31px;
    float: left;
    margin-left: 60px;
  }

  .change-password-icon {
    width: 32px;
    height: 31px;
    margin-right: 60px;
    margin-left: 20px;
  }

  .delete-user-icon {
    margin-left: 20px;
  }

  .add-user {
    position: absolute;
    width: 210px;
    height: 70px;
    background-color: #5187C3;
    color: white;
    font-size: 24px;
    right: 34px;
    bottom: 26px;
    line-height: 70px;
    text-align: center;
    border-radius: 6px;
  }

  .import-user {
    position: absolute;
    width: 210px;
    height: 70px;
    color: #333333;
    font-size: 24px;
    right: 274px;
    bottom: 26px;
    line-height: 70px;
    background-color: #ffffff;
    text-align: center;
    border-radius: 6px;
    border: 1px solid #B1C4DB;
  }

  .export-user {
    position: absolute;
    width: 210px;
    height: 70px;
    color: #333333;
    background-color: #ffffff;
    font-size: 24px;
    right: 514px;
    bottom: 26px;
    line-height: 70px;
    text-align: center;
    border-radius: 6px;
    border: 1px solid #B1C4DB;
  }

  .unselectedExport {
    background-color: #d4d4d4;
    border: solid 1px #c2cbda;
  }
</style>
<style>
  .user-all,
  .user-all div,
  .user-all span,
  .user-all table,
  .user-all tbody,
  .user-all td,
  .user-all tr,
  .user-all img {
    touch-action: pan-y !important;
  }

  .user-all .el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color: #ffffff;
    border-color: #5691d3;
    cursor: not-allowed;
    width: 40px;
    height: 40px;
  }

  .user-all .el-checkbox__inner {
    width: 40px;
    height: 40px;
  }

  .user-all .el-checkbox__inner::after {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 3px solid #4171BB;
    border-left: 0;
    border-top: 0;
    height: 30px;
    width: 16px;
    left: 9px;
    position: absolute;
    top: -3px;
    transition: transform .01s ease-in .03s;
    transform-origin: center;
  }

  .user-all .el-checkbox__input.is-checked .el-checkbox__inner,
  .user-all .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: white;
  }

  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #4171BB;
  }
</style>
