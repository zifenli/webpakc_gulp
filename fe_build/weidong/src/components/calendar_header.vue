<template>
	<div>
		<ul class="m-calendarHeader retainbb">
			<li class="day" v-for="date in dates" track-by="$index" @click.prevent="selectDate(date)"
			    :class="{'z-active': isCurrentDate(date)}">
				<div class="ctnWrap" :class="{'retainbr': $index != dates.length}">
					<p class="date">{{ date | date 'MM.DD'}}</p>
					<p class="dateName">{{ date | dayTxt }}</p>
				</div>
			</li>
			<li class="dateIcn" @click.prevent="toggleCalendar">
				<img src="../assets/icon_calendar.png" alt="">
			</li>
		</ul>
		<calendar :show.sync="showCalendar" :current-date.sync="currentDate"></calendar>
	</div>
</template>
<style lang="less">
	@import "../styles/calendar_header.less";
</style>
<script>
	import Moment from 'moment'
	import calendar from 'archer-vue-calendar'

	function _calculateDates(currentDate) {
		var _currentDate = Moment(currentDate),
				_date = _currentDate.date();

		return [_currentDate.format('YYYY-MM-DD'),
			_currentDate.date(_date + 1).format('YYYY-MM-DD'),
			_currentDate.date(_date + 2).format('YYYY-MM-DD')
		]
	}

	export default {
		data () {
			return {
				showCalendar: !1,
				dates: []
			}
		},
		created () {
			this.dates = _calculateDates(this.currentDate);
		},
		props: {
			currentDate: {
				required: true,
				twoWay: true
			}
		},
		methods: {
			selectDate: function (date) {
				this.currentDate = date;
			},
			isCurrentDate: function (date) {
				return Moment(date).format('YYYY-MM-DD') === Moment(this.currentDate).format('YYYY-MM-DD');
			},
			toggleCalendar () {
				this.showCalendar = !this.showCalendar;
			}
		},
		components: {
			calendar
		},
		watch: {
			currentDate (value, oldValue) {
				if (value && (!this.dates || this.dates.indexOf(value) == -1)) {
					this.dates = _calculateDates(value);
				}
			}
		}
	}
</script>
