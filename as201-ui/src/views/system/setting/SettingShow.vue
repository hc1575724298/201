 <template>
  <div>
    <SettingHead></SettingHead>
    <div class="setting-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import SettingHead from "@/components/SettingHead"
  export default {
    components: {
      SettingHead
    },
    data() {
      return {
      }
    },
    mounted() {

    },
    methods: {
    }
  }
</script>

<style scoped="scoped">
  .setting-content {
    height: 1108px;
    width: 100%;
  }
</style>
