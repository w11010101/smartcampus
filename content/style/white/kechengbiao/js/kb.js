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
	return(myyear + "-" + mymonth + "-" + myweekday);
}
console.log(nowDayOfWeek)

//获得本周的星期一   
function getWeekMondayDate() {
	var getWeekMondayDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + (1));
	return formatDate(getWeekMondayDate);
}
//获得本周的星期二
function getWeekTuesdayDate() {
	var getWeekTuesdayDate = new Date(nowYear, nowMonth, nowDay + (2 - nowDayOfWeek));
	return formatDate(getWeekTuesdayDate);
}

//获得本周的星期三   
function getWeekWednesdayDate() {
	var getWeekWednesdayDate = new Date(nowYear, nowMonth, nowDay + (3 - nowDayOfWeek));
	return formatDate(getWeekWednesdayDate);
}

//获得本周的星期四  
function getWeekThursdayDate() {
	var getWeekThursdayDate = new Date(nowYear, nowMonth, nowDay + (4 - nowDayOfWeek));
	return formatDate(getWeekThursdayDate);
}
//获得本周的星期五   
function getWeekFridayDate() {
	var getWeekFridayDate = new Date(nowYear, nowMonth, nowDay + (5 - nowDayOfWeek));
	return formatDate(getWeekFridayDate);
}

//获得本周的星期六 
function getWeekSaturdayDate() {
	var getWeekSaturdayDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
	return formatDate(getWeekSaturdayDate);
}
//获得本周的星期四日
function getWeekSundayDate() {
	var getWeekSundayDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek));
	return formatDate(getWeekSundayDate);
}

console.log("星期一" + getWeekMondayDate());
console.log("星期二" + getWeekTuesdayDate())
console.log("星期三" + getWeekWednesdayDate());
console.log("星期四" + getWeekThursdayDate())
console.log("星期五" + getWeekFridayDate());
console.log("星期六" + getWeekSaturdayDate())
console.log("星期日" + getWeekSundayDate());

var getMonthWeek = function(a, b, c) {
	/* 
	a = d = 当前日期 
	b = 6 - w = 当前周的还有几天过完(不算今天) 
	a + b 的和在除以7 就是当天是当前月份的第几周 
	*/
	console.log(a + "**" +b+ "***"+c)
	var date = new Date(a, parseInt(b) - 1, c),
		w = date.getDay(),
		d = date.getDate();
		console.log("w**" +w+ "***d"+d)
	return Math.ceil(
		(d + 6 - w) / 7
	);
};
var getYearWeek = function(a, b, c) {
	/* 
	date1是当前日期 
	date2是当年第一天 
	d是当前日期是今年第多少天 
	用d + 当前年的第一天的周差距的和在除以7就是本年第几周 
	*/
	var date1 = new Date(a, parseInt(b) - 1, c),
		date2 = new Date(a, 0, 1),
		d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
	return Math.ceil(
		(d + ((date2.getDay() + 1) - 1)) / 7
	);
};
today = new Date(); //获取当前时间
var y = today.getYear();
var m = today.getMonth() + 1;
var d = today.getDate();
console.log(nowYear)
console.log("今天是"+y +"年"+ m+ "月的第 "+getMonthWeek(y, m, d)+ " 周");


function theWeek() {
    var totalDays = 0;
    now = new Date();
    years = now.getYear()
    if (years < 1000)
        years += 1900
    var days = new Array(12);
    days[0] = 31;
    days[2] = 31;
    days[3] = 30;
    days[4] = 31;
    days[5] = 30;
    days[6] = 31;
    days[7] = 31;
    days[8] = 30;
    days[9] = 31;
    days[10] = 30;
    days[11] = 31;
    
    //判断是否为闰年，针对2月的天数进行计算
    if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
        days[1] = 29
    } else {
        days[1] = 28
    }
    if (now.getMonth() == 0) {
        totalDays = totalDays + now.getDate();
    } else {
        var curMonth = now.getMonth();
        for (var count = 1; count <= curMonth; count++) {
            totalDays = totalDays + days[count - 1];
        }
        totalDays = totalDays + now.getDate();
    }
    //得到第几周
    var week = Math.round(totalDays / 7);
    return week;
}
console.log(theWeek()+1);