<template>
	<div class="m-stars">
		<ul class="bg">
			<li class="item" v-for="n in max"></li>
		</ul>
		<ul class="cover">
			<li class="item" v-for="m in Math.min(~~score,max)"></li>
			<li class="item sub" v-if="score < max">
				<div class="mask" :style="{width: percentage}">
					<i class="star"></i>
				</div>
			</li>
		</ul>
	</div>
</template>
<style lang="less">
	@import "../styles/stars.less";
</style>
<script>
	/**
	 * 星星评分
	 * <score-star :score.once="schedule.teacher.score" :max="5"></score-star>
	 * score 为分数, 数字类型, 必须要用bind语法传递值
	 * max 为最大分数, 默认为5, 必须要用bind语法传递
	 * **/
	export default{
		data(){
			return {
			}
		},
		computed: {
			percentage: function () {
				return (this.score - ~~this.score) * 100 + '%';
			}
		},
		props: {
			score: {
				type: Number,
				default: 5
			},
			max: {
				type: Number,
				default: 5
			}
		}
	}
</script>
