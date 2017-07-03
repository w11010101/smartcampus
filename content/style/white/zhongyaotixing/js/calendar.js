/**
 * 完整代码
 */

// 关于月份： 在设置时要-1，使用时要+1

var list_number = [20170602,20170617, 20170626, 20170629]
$(function() {

	$('#calendar').calendar({
		ifSwitch: true, // 是否切换月份
		hoverDate: true, // hover是否显示当天信息
		backToday: true // 是否返回当天
	});

});

;
(function($, window, document, undefined) {

	var Calendar = function(elem, options) {
		this.$calendar = elem;

		this.defaults = {
			ifSwitch: true,
			hoverDate: false,
			backToday: false
		};

		this.opts = $.extend({}, this.defaults, options);

		//console.log(this.opts);
	};

	Calendar.prototype = {
		showHoverInfo: function(obj) { // hover 时显示当天信息
			var _dateStr = $(obj).attr('data');
			var offset_t = $(obj).offset().top + (this.$calendar_today.height() - $(obj).height()) / 2;
			var offset_l = $(obj).offset().left + $(obj).width();
			var changeStr = addMark(_dateStr);
			var _week = changingStr(changeStr).getDay();
			var _weekStr = '';

			this.$calendar_today.show();

			this.$calendar_today
				.css({
					left: offset_l + 30,
					top: offset_t
				})
				.stop()
				.animate({
					left: offset_l + 16,
					top: offset_t
				});

			switch(_week) {
				case 0:
					_weekStr = 'Sunday';
					break;
				case 1:
					_weekStr = 'Monday';
					break;
				case 2:
					_weekStr = 'Tuesday';
					break;
				case 3:
					_weekStr = 'Wednesday';
					break;
				case 4:
					_weekStr = 'Thursday';
					break;
				case 5:
					_weekStr = 'Friday';
					break;
				case 6:
					_weekStr = 'Saturday';
					break;
			}
			console.log(changeStr); //这是点击的日期，为了给日程*********************************************************
//			console.log(this);
			this.$calendarToday_date.text(changeStr);
			this.$calendarToday_week.text(_weekStr);
			
		},

		showCalendar: function() { // 输入数据并显示
			var self = this;
			var year = dateObj.getDate().getFullYear();
			var month = dateObj.getDate().getMonth() + 1;
			var dateStr = returnDateStr(dateObj.getDate());
			var firstDay = new Date(year, month - 1, 1); // 当前月的第一天

			this.$calendarTitle_text.text(year + '年' + dateStr.substr(4, 2) + '月');
			this.$calendarDate_item.each(function(i) {
				// allDay: 得到当前列表显示的所有天数
				var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
				var allDay_str = returnDateStr(allDay);
				$(this).text(allDay.getDate()).attr('data', allDay_str);
				//此处可以加入判断是否有事件的参数
				if(returnDateStr(new Date()) === allDay_str) {
					//今天的样式
					$(this).attr('class', 'item item-curDay');
				} else if(returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) {
					//这个月的样式
					$(this).attr('class', 'item item-curMonth');
				} else {
					//其他月份的样式
					$(this).attr('class', 'item');
				}
				//有事件
				for(var i = 0; i < list_number.length; i++) {
					//					console.log(list_number[i]==allDay_str);
					if(list_number[i] == allDay_str) {
						$(this).attr('class', 'item item-curMonth item-selected-event');
					};
				}
			});

			// 已选择的情况下，切换日期也不会改变
			if(self.selected_data) {
				var selected_elem = self.$calendar_date.find('[data=' + self.selected_data + ']');
				selected_elem.addClass('item-selected');
			}
		},

		renderDOM: function() { // 渲染DOM
			this.$calendar_title = $('<div class="calendar-title"></div>');
			this.$calendar_week = $('<ul class="calendar-week"></ul>');
			this.$calendar_date = $('<ul class="calendar-date calendar-fix"></ul>');
			this.$calendar_today = $('<div class="calendar-today"></div>');

			var _titleStr = '<a href="#" class="title"></a>' +
				'<a href="javascript:;" id="backToday">T</a>' +
				'<div class="arrow">' +
				'<span class="arrow-prev"></span>' +
				'<span class="arrow-next"></span>' +
				'</div>';
			var _weekStr = '<li class="item">日</li>' +
				'<li class="item">一</li>' +
				'<li class="item">二</li>' +
				'<li class="item">三</li>' +
				'<li class="item">四</li>' +
				'<li class="item">五</li>' +
				'<li class="item">六</li>';
			var _dateStr = '';
			var _dayStr = '<i class="triangle"></i>' +
				'<p class="date"></p>' +
				'<p class="week"></p>';

			for(var i = 0; i < 6; i++) {
				_dateStr += '<li class="item">26</li>' +
					'<li class="item">26</li>' +
					'<li class="item">26</li>' +
					'<li class="item">26</li>' +
					'<li class="item">26</li>' +
					'<li class="item">26</li>' +
					'<li class="item">26</li>';
			}

			this.$calendar_title.html(_titleStr);
			this.$calendar_week.html(_weekStr);
			this.$calendar_date.html(_dateStr);
			this.$calendar_today.html(_dayStr);

			this.$calendar.append(this.$calendar_title, this.$calendar_week, this.$calendar_date, this.$calendar_today);
			this.$calendar.show();
		},

		inital: function() { // 初始化
			var self = this;

			this.renderDOM();

			this.$calendarTitle_text = this.$calendar_title.find('.title');
			this.$backToday = $('#backToday');
			this.$arrow_prev = this.$calendar_title.find('.arrow-prev');
			this.$arrow_next = this.$calendar_title.find('.arrow-next');
			this.$calendarDate_item = this.$calendar_date.find('.item');
			this.$calendarToday_date = this.$calendar_today.find('.date');
			this.$calendarToday_week = this.$calendar_today.find('.week');

			this.selected_data = 0;

			this.showCalendar();

			if(this.opts.ifSwitch) {
				this.$arrow_prev.bind('click', function() {
					var _date = dateObj.getDate();

					dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() - 1, 1));
						console.log("111111111111");
					self.showCalendar();
				});

				this.$arrow_next.bind('click', function() {
					var _date = dateObj.getDate();
					dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() + 1, 1));

					self.showCalendar();
				});
			}

			if(this.opts.backToday) {
				var cur_month = dateObj.getDate().getMonth() + 1;

				this.$backToday.bind('click', function() {
					var item_month = $('.item-curMonth').eq(0).attr('data').substr(4, 2);
					var if_lastDay = (item_month != cur_month) ? true : false;

					if(!self.$calendarDate_item.hasClass('item-curDay') || if_lastDay) {
						dateObj.setDate(new Date());

						self.showCalendar();
					}
				});
			}

			this.$calendarDate_item.hover(function() {
				self.showHoverInfo($(this));
			}, function() {
				self.$calendar_today.css({
					left: 0,
					top: 0
				}).hide();
			});

			this.$calendarDate_item.click(function() {
				console.log("4444444444444");
				var _dateStr = $(this).attr('data');
				var _date = changingStr(addMark(_dateStr));
				var $curClick = null;

				self.selected_data = $(this).attr('data');

				dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth(), 1));

				if(!$(this).hasClass('item-curMonth')) {
					self.showCalendar();
				}

				$curClick = self.$calendar_date.find('[data=' + _dateStr + ']');
				$curDay = self.$calendar_date.find('.item-curDay');
				if(!$curClick.hasClass('item-selected')) {
					self.$calendarDate_item.removeClass('item-selected');

					$curClick.addClass('item-selected');
				}
				
				//事件有无判断
				if($(this).attr('class')=="item item-curMonth item-selected-event item-selected"){
					$(".null-img").css("display","none");
					$(".event-list").css("display","block");
				}else if($(this).attr('class')=="item item-curMonth item-selected"){
					$(".null-img").css("display","block");
					$(".event-list").css("display","none");
				}else if($(this).attr('class')=="item item-curDay item-selected"){
					$(".null-img").css("display","none");
					$(".event-list").css("display","block");
				}
			});
		},

		constructor: Calendar
	};

	$.fn.calendar = function(options) {
		var calendar = new Calendar(this, options);

		return calendar.inital();
	};

	// ========== 使用到的方法 ==========

	var dateObj = (function() {
		var _date = new Date();

		return {
			getDate: function() {
				return _date;
			},

			setDate: function(date) {
				_date = date;
			}
		}
	})();

	function returnDateStr(date) { // 日期转字符串
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();

		month = month <= 9 ? ('0' + month) : ('' + month);
		day = day <= 9 ? ('0' + day) : ('' + day);

		return year + month + day;
	};

	function changingStr(fDate) { // 字符串转日期
		var fullDate = fDate.split("-");

		return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
	};

	function addMark(dateStr) { // 给传进来的日期字符串加-
		return dateStr.substr(0, 4) + '-' + dateStr.substr(4, 2) + '-' + dateStr.substring(6);
	};

	// 条件1：年份必须要能被4整除
	// 条件2：年份不能是整百数
	// 条件3：年份是400的倍数
	function isLeapYear(year) { // 判断闰年
		return(year % 4 == 0) && (year % 100 != 0 || year % 400 == 0);
	}

})(jQuery, window, document);

/**   
 * 获取本周的开端日期、停止日期   
 */
var now = new Date(); //当前日期   
var nowDayOfWeek = now.getDay(); //今天本周的第几天   
var nowDay = now.getDate(); //当前日   
var nowMonth = now.getMonth(); //当前月   
var nowYear = now.getYear(); //当前年   
nowYear += (nowYear < 2000) ? 1900 : 0; //  

var lastMonthDate = new Date(); //上月日期   
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();

//格局化日期：yyyy-MM-dd   
function formatDate(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();

	if(mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if(myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return(myyear + "" + mymonth + "" + myweekday);
}

//获得本周的星期一   
function getWeekMondayDate() {
	var getWeekMondayDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + (1));
	//console.log(getWeekMondayDate);
	var objYmd = {
		ymd: formatDate(getWeekMondayDate),
		dd: nowDay - nowDayOfWeek + (1)
	}
	return objYmd;
}
//获得本周的星期二
function getWeekTuesdayDate() {
	var getWeekTuesdayDate = new Date(nowYear, nowMonth, nowDay + (2 - nowDayOfWeek));
	var objYmd = {
		ymd: formatDate(getWeekTuesdayDate),
		dd: nowDay + (2 - nowDayOfWeek)
	}
	return objYmd;
}

//获得本周的星期三   
function getWeekWednesdayDate() {
	var getWeekWednesdayDate = new Date(nowYear, nowMonth, nowDay + (3 - nowDayOfWeek));
	var objYmd = {
		ymd: formatDate(getWeekWednesdayDate),
		dd: nowDay + (3 - nowDayOfWeek)
	}
	return objYmd;
}

//获得本周的星期四  
function getWeekThursdayDate() {
	var getWeekThursdayDate = new Date(nowYear, nowMonth, nowDay + (4 - nowDayOfWeek));
	var objYmd = {
		ymd: formatDate(getWeekThursdayDate),
		dd: nowDay + (4 - nowDayOfWeek)
	}
	return objYmd;
}
//获得本周的星期五   
function getWeekFridayDate() {
	var getWeekFridayDate = new Date(nowYear, nowMonth, nowDay + (5 - nowDayOfWeek));
	var objYmd = {
		ymd: formatDate(getWeekFridayDate),
		dd: nowDay + (5 - nowDayOfWeek)
	}
	return objYmd;
}

//获得本周的星期六 
function getWeekSaturdayDate() {
	var getWeekSaturdayDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
	var objYmd = {
		ymd: formatDate(getWeekSaturdayDate),
		dd: nowDay + (6 - nowDayOfWeek)
	}
	return objYmd;
}
//获得上周的星期日
function getWeekSundayDate() {
	var getWeekSundayDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
	var objYmd = {
		ymd: formatDate(getWeekSundayDate),
		dd: nowDay - nowDayOfWeek
	}
	return objYmd;
}
//console.log("星期一" + getWeekMondayDate().ymd);
//console.log("星期二" + getWeekTuesdayDate().ymd)
//console.log("星期三" + getWeekWednesdayDate().ymd);
//console.log("星期四" + getWeekThursdayDate().ymd)
//console.log("星期五" + getWeekFridayDate().ymd);
//console.log("星期六" + getWeekSaturdayDate().ymd)
//console.log("星期日" + nowDay);
var clery_ymd = [getWeekSundayDate().ymd,getWeekMondayDate().ymd,getWeekTuesdayDate().ymd,getWeekWednesdayDate().ymd,getWeekThursdayDate().ymd,getWeekFridayDate().ymd,getWeekSaturdayDate().ymd]
var clery_dd = [getWeekSundayDate().dd,getWeekMondayDate().dd,getWeekTuesdayDate().dd,getWeekWednesdayDate().dd,getWeekThursdayDate().dd,getWeekFridayDate().dd,getWeekSaturdayDate().dd]
for (var i=0;i<clery_ymd.length;i++) {
	
	var dom = '<li class="item item-curMonth" data="'+clery_ymd[i]+'">'+clery_dd[i]+'</li>'
	$(".clear-fix").append(dom);
	if($(".clear-fix li").eq(i).text()==nowDay){
		$(".clear-fix li").eq(i).attr('class', 'item item-curDay');
	}
	//有事件
	for(var j = 0; j < list_number.length; j++) {
		if(list_number[j] == clery_ymd[i]) {
			$(".clear-fix li").eq(i).attr('class', 'item item-curMonth item-selected-event');
		};
	}
}
$(".clear-fix li").click(function(){
	var mm = (nowMonth+1) <= 9 ? ('0' + (nowMonth+1)) : ('' + (nowMonth+1));
	var dd = $(this).text() <= 9 ? ('0' + $(this).text()) : ('' + $(this).text());
	var yymmdd = nowYear + "-" + mm + "-" + dd;
	console.log(yymmdd);
})


