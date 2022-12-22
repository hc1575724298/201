<template>
  <div>
  <UserHead :page_name="protocalInfo.name" :path_router="initPathName" :isCloseDoor="true"/>
  <router-view/>
  </div>
</template>

<script>
import UserHead from '@/components/UserHead.vue'
import { mapState as mapProtocolsState } from 'vuex'
export default {
  components:{
    UserHead,
  },
  data () {
    return {
    }
  },
  computed:{
    ...mapProtocolsState('protocols',['protocalInfo','initPathName'])
  },
  created () {
  },

  methods: {

  },
}
</script>

<style scoped>

</style>
