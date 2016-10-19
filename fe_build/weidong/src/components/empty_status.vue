<template>
    <div class="m-empty">
	    <i class="icn" :class="[iconClass]" v-if="iconClass"></i>
	    <div class="txtWrap">
		    <p>{{ txt }}</p>
	    </div>
    </div>
</template>
<style lang="less">
	@import "../styles/empty.less";
</style>
<script>
	/**
	 * <empty-status txt="今天无课程，请选择其他日期" icon-class="u-icn-emptyCourse"></empty-status>
	 * 空状态
	 * txt为空状态提示文字, icon-class为空状态时的icon对应的class, 若icon-class为空,则不显示icon
	 * **/
    export default{
		props: {
	        txt: String,
	        iconClass: String
        }
    }
</script>
