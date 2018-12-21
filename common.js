/**
 * laydate换主题色
 * @returns {string} 颜色值
 * 
 * */
function changeLayDateColor(){
	var color = skin
	if (color == "red"){
		return "#ff4b58"
	}
	if (color == "blue"){
		return "#4778c7"
	}
	if (color == "green"){
		return "#4ec1b1"
	}	
}
/**
 * 判断某一天在不在今天之前
 * */
function isOldDate(stringDate){
	var today =date2Num(getNowDate())
	var targetDate = date2Num((stringDate))
	if (targetDate - today >= 0) {
		return false
	}
	else {
		return true
	}	
}
/**
 * 判断某一时间在不在现在之前
 * @param {string} "2014-07-10 10:21:12"
 * @returns {boolean} 过去返回true
 * */
function isOldTime(stringTime){
	var now = Date.parse(new Date());
	var targetDate =  Date.parse(new Date(stringTime));
	if (targetDate - now >= 0) {
		return false
	}
	else {
		return true
	}
}
/**
 * 打开新增日程iframe
 * @param {object} obj 
 * @param {string} obj.url iframe链接 
 * @param {object} obj.data 带过去的参数 
 * */
function addSchedule (obj){
	var data = transParams(obj.data)
	top.layer.open({
		  type: 2, 
		  title:'日程',
		  content:obj.url+'?'+data,
		  area:['800px', '610px'],
	});	
}


/**
 * 字符串 0  1 转为布尔值
 * @param {string} "0"  "0"
 * @return {boolean} 
 * */
function Str2Bool(str){
	num=parseInt(str)
	return Boolean(num)
}
/**
 * 布尔值 转为 数字 0  1 
 * @param {boolean}
 * @return {number}
 * */
function Bool2Str(bool){
	return Number(bool)
}
/**
 * 返回一个对象的深复制
 * @param {object}
 * @return {object}
 **/
function deepCopy(obj){
	var newObj={}
	for (var i in obj) {
		newObj[i] = obj[i]
	}
	return newObj
}
/**
 * 返回一个数组的深复制
 * @param {array}
 * @return {array}
 **/
function arrDeepCopy(arr){
	return $.extend(true, [], arr)
}
/**
 * 跳到指定月份的附近月份
 * @param {string} month  2017-12
 * @param {number} range  +1(后一月) -1(前一月)
 * @return string  2018-01
 * 
 * */
function toRangeMonth (month,range) {
    var arr = month.split('-');
    var year = parseInt(arr[0]); //获取当前日期的年份
    var month = parseInt(arr[1]); //获取当前日期的月份
    month = month + range
    if (month == 13) {
        year = year + 1;
        month = 1;
    }
    if (month == 0) {
        year = year - 1;
        month = 12;
    }
    if (month<10){
    	month = "0" + month
    }
    var t = year + '-' + month;
    return t;	
}
/**
 * 跳到指定日期的前多少天或者后多少天
 * @param {string}  date 2017-12-03
 * @param {number}  range +1(后一天) -1(前一天)
 * @returns string  2017-12-10
 **/
function toRangeDays (date,range){
	var today=date+" "+"00:00:00"
	var timestamp = Date.parse(new Date(today))
	var tomorrow = timestamp + 86400000 * range
	
	var newDate = fmtDate(tomorrow)
	return newDate	
}
/**
 * 数据插入区保存之后时间跳到下一天
 * @param string   2017-11-23
 * @return string  2017-11-24
 * */
function toTomorrow (date) {
	var today=date+" "+"00:00:00"
	var timestamp = Date.parse(new Date(today))
	var tomorrow = timestamp + 86400000
	
	var newDate = fmtDate(tomorrow)
	return newDate
}
function fmtDate(obj){
    var date =  new Date(obj);
    var y = 1900+date.getYear();
    var m = "0"+(date.getMonth()+1);
    var d = "0"+date.getDate();
    return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
}
/**
 * 去掉日期的字符串的 : - white space 方便比较大小
 * @param {string} "2017-11-27"
 * @return {number} 20171127
 * */
function date2Num(date){
	var test = new RegExp(/-|:|\s/g);
	var dateNum = parseInt(date.replace(test,""));
	return dateNum
}
/**
 *判断某年某月有多少天
 * @param {number}  2017-12
 * @return {number} 31
 * */
function getCountDays(date) {
	var year = parseInt(date.substring(0,4))
	var month = parseInt(date.substring(5))
    var curDate = new Date();
	curDate.setYear(year);
    curDate.setMonth(month);
    curDate.setDate(0);
    return curDate.getDate();
}
/**
 * 判断是否为Null
 * @param {object}
 * @return {Boolean}
 */
function isNull(object){
    if(object == null || typeof object == "undefined"){
        return true;
    }
    return false;
};

/**
 * 判断是否为Null
 * @param {object}
 * @return {number}
 */
function null2zero(object){
    if(object == null || typeof object == "undefined"){
        return 0;
    }
    else {
    	return object;
    }
   
};
/**
 * 根据传入的日期得到本周的星期-和星期日的日期字符串
 * @param {dateString} 
 * @return {object}
 * */
function GetWeekDate(dateString){
    var dateArray = dateString.split("-");
    // 转为标准js时间格式
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    var week = date.getDay()
    if (week == 0){
    	week =7
    }
    var to1 = 1 - week    //当前星期一离星期一有几天
    var to7 = 7 - week   //当前日期离星期日有几天
    var mon = toRangeDays(dateString,to1)
    var sun = toRangeDays(dateString,to7)
    return {
    	mon:mon,   //星期一日期
    	sun:sun    //星期日日期
    }
}



/**
 * 根据传入的日期得到本周的星期-dao星期日的日期字符串
 * @param {dateString} 
 * @return {object}
 * */
function GetWeekAll(dateString){
    var dateArray = dateString.split("-");
    // 转为标准js时间格式
    date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    var week = date.getDay()
    if (week == 0){
    	week =7
    }
    var result = []
    var flag = null
    for (var i=1;i<8;i++){
    	flag = i - week
    	var  data= {
    		week: "星期" + num2CN(i),
    		date:toRangeDays(dateString,flag)
    	}
    	result.push(data)
    }
    return result
}
/**
 *这个，能看懂？
 **/
function num2CN(index){
	var arr = ["零", "一", "二", "三", "四", "五", "六","日"];
	return arr[index]
}
/**
 * 根据日期字符串判断两天之间相差几天
 * @param {dateString} 日期字符串（如：2016-12-29)
 * @return {number}   相差的天数
 * */
function dayLess(date1,date2){
   var time1 = arguments[0], time2 = arguments[1];
    time1 = Date.parse(time1)/1000;
    time2 = Date.parse(time2)/1000;
    var time_ = time1 - time2;
    return (time_/(3600*24));
}


/**
 * 根据日期字符串获取星期几
 * @param {dateString} 日期字符串（如：2016-12-29），为空时为用户电脑当前日期
 * @return {String}
 */
function getWeek(dateString) {
    var date;
    if(isNull(dateString)){
        date = new Date();
    }else{
        var dateArray = dateString.split("-");
        date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
    }
    //var weeks = new Array("日", "一", "二", "三", "四", "五", "六");
    //return "星期" + weeks[date.getDay()];
    return "星期" + "日一二三四五六".charAt(date.getDay());
}
/**
 * 获取当前月份
 *@return {String}
 * */
function getNowMounth() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month
    
    return currentdate;
}
/**
 * 获取当前日期
 *@return {String}
 * */
function getNowDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
    
    return currentdate;
}
/**
 * laydate如果是选择月份的话，选完日期主体不会自动关闭，要在回调函数中手动点击对应确定按钮
 * @param laydateCtn 当前要关闭的laydate的id
 * */
function layDateConfirm (laydateCtn) {
    var laydateBtn=$(laydateCtn).find(".laydate-btns-confirm")[0]
    $(laydateBtn).click()
}
/**
 * 从日期字符串中获取月份
 * @param {string}  2017-12-07
 * @return {string} 2017-12
 * */
function getMonthFromDate (date) {
	var month = date.substring(0,7)
	return month
}
/**
 * 存储LocalStorage
 * @param {string} key    {object} obj
 * */
function setLocalStorage (key,obj){
	str = JSON.stringify(obj);
	localStorage.setItem(key,str)	
}
/**
 * 读取LocalStorage
 * @param {string} key
 * */
function getLocalStorage (key){
	var str = localStorage.getItem(key)
	var obj = JSON.parse(str)
	return obj
}
/**
 * 检查LocalStorage 是否有值
 * @param {string} key
 * */
function checkLocalStorage (key){
	return localStorage.hasOwnProperty(key)
}

/**
 * 字典，待封装
 * 
 */
$(function(){
	//下拉选择框START
	$(".select-input").on("keyup", function(){
		var that = this;
		var input_val = $(that).val();
		$(that).parents(".form-group").find(".input-select li").hide();
		$(that).parents(".form-group").find(".input-select").show();
		$.each($(that).parents(".form-group").find(".input-select li"),function(i){
			var string = $(that).parents(".form-group").find(".input-select li:eq("+i+")").text();
			if(string.indexOf(input_val)!=-1){
			    $(this).show();
			}else{
				$(this).hide();
			}
		});
	});
	
	$(".select-input").on("click", function(){
		var that = this;
		$(that).parents(".form-group").find(".input-select li").show();
		$(that).parents(".form-group").find(".input-select").show();
	});
	
	$(".select-input").on("blur",function(){
		var that = this;
		$(that).parents(".form-group").find(".input-select").hide();
		$(that).parents(".form-group").find(".input-select li").show();
	});
	
	
	$("#reset").on("click" , function(){
		$(".form-group input ").val("");
		$(".form-group select option:first").prop("selected", 'selected');
	});
	//下拉选择框END
});



/**
 * post请求下载文件
 * options:{
 *   url:'',  //下载地址
 *   data:{name:value}, //要发送的数据
 *   method:'post'
 * }
 */
function postDownLoadFile (options) {
    var config = $.extend(true, { method: 'post' }, options);
    var $iframe = $('<iframe id="down-file-iframe" />');
    var $form = $('<form target="down-file-iframe" method="' + config.method + '" />');
    $form.attr('action', config.url);
    for (var key in config.data) {
        $form.append('<input type="hidden" name="' + key + '" value="' + config.data[key] + '" />');
    }
    $iframe.append($form);
    $(document.body).append($iframe);
    $form[0].submit();
    $iframe.remove();
}
/**
 * 对象转地址字符串拼接
 * 
 * */
function transParams(obj) {
	var arr = [];
	for (var key in obj) {
		if (obj[key] == null) {
			continue;
		}
		arr.push(key + "=" + obj[key]);
	}
	return arr.join("&");
}
/**
 * 获取url中带的参数
 * @param {string} name  参数名
 * @param {string} url   decodeURI(window.location) 汉字转义
 * @returns {string}  参数值
 * */
function getUrlParam (name,url){
    var target = url ? url.substr(url.indexOf('?')) : window.location.search;
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = target.substr(1).match(reg);
    if (r != null) return (r[2]);
}

//成功提示
function successMsg(msg,fn){
    layer.msg(msg, {icon: 1,time: 2000},function(){
        fn && fn();
    });
}
//错误提示
function errorMsg(msg){
    layer.msg(msg, {icon: 3,time: 2000});
}
//警告提示
function warnMsg(msg){
    layer.msg(msg, {icon: 7,time: 2000});
}



















