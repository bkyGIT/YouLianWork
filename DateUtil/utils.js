//获取默认时间区间为7日前到当前时间，分别添加到搜索栏开始和结束时间
function getTime(){
	var now = new Date();
	//格式化日，如果小于9，前面补0
	var day = ("0" + now.getDate()).slice(-2);
	//格式化月，如果小于9，前面补0
	var month = ("0" + (now.getMonth() + 1)).slice(-2);
	//拼装完整日期格式
	var today = now.getFullYear()+"-"+(month)+"-"+(day) ;
	//完成赋值
	$("#end_time_param").datebox('setValue',today);
	//获取7天之前的时间日期，回显到搜索的开始时间
	var lastWeek = getBeforeDate(6);
	$("#begin_time_param").datebox('setValue',lastWeek);
}

//获取n天之前的日期
function getBeforeDate(n){
    var n = n;
    var d = new Date();
    var year = d.getFullYear();
    var mon=d.getMonth()+1;
    var day=d.getDate();
    if(day <= n){
		if(mon>1) {
			mon=mon-1;
		}else {
			year = year-1;
			mon = 12;
		}
	}
	d.setDate(d.getDate()-n);
	year = d.getFullYear();
	mon=d.getMonth()+1;
	day=d.getDate();
	s = year+"-"+(mon<10?('0'+mon):mon)+"-"+(day<10?('0'+day):day);
	return s;
}

//获取n天之后的日期
function getAfterDate(endTime, n){
	var datt = endTime.split('-');//这边给定一个特定时间
	var newDate = new Date(datt[0], datt[1]-1, datt[2]);
	var befminuts = newDate.getTime() - 1000 * 60 * 60 * 24 * parseInt(n);//计算前几天用减，计算后几天用加，最后一个就是多少天的数量
	var beforeDat = new Date;
	beforeDat.setTime(befminuts);
	var befMonth = beforeDat.getMonth()+1;
	var mon = befMonth >= 10 ? befMonth : '0' + befMonth;
	var befDate = beforeDat.getDate();
	var da = befDate >= 10 ? befDate : '0' + befDate;
	var newDate = beforeDat.getFullYear() + '-' + mon + '-' + da;
	return newDate;
}

//日期类型转换
Date.prototype.format=function (){
    var s='';
    // 获取年份。
    s+=this.getFullYear()+'-';    
    // 获取月份。
    s+=(this.getMonth()+1)>=10?(this.getMonth()+1):'0'+(this.getMonth()+1)+'-';     
    // 获取日。
    s+=this.getDate()>=10?this.getDate():'0'+this.getDate();         
    // 返回日期。
    return(s);        
};

function getDayAll(begin, end){
    var dateAllArr = new Array();
    var ab = begin.split("-");
    var ae = end.split("-");
    var db = new Date();
    db.setUTCFullYear(ab[0], ab[1]-1, ab[2]);
    var de = new Date();
    de.setUTCFullYear(ae[0], ae[1]-1, ae[2]);
    var unixDb=db.getTime();
    var unixDe=de.getTime();
    for(var k=unixDb ; k<=unixDe;){
    	dateAllArr.push((new Date(parseInt(k))).format().toString());
        k += 1000*60*60*24;
    }
    return dateAllArr;
}