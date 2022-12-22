<template>
  <div class="clear-info-title">
    <div class="clear-info-title-icon"></div>
    <div class="clear-info-title-text">{{title}}</div>
  </div>
</template>

<script>
	export default {
    props:['title'],
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
 .clear-info-title {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 28px;
    color: black;
  }

  .clear-info-title-icon {
    width: 5px;
    height: 28px;
    background-color: #4C7CB2;
  }

  .clear-info-title-text {
    margin-left: 20px;
  }
</style>
