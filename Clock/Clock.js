window.onload= function (){
	

var second = 1000;
var minute = second * 60;
var hour = minute * 60;

var today = new Date();
var h = today.getHours();
var m = today.getMinutes();
var s = today.getSeconds();
var day = today.getDate();
var mth = today.getMonth();
var ampm = ( h <= 12) ? 'am' : 'pm';


var timeZones = ["London", "Rome", "New York", "Sydney"];
var timeDiff  = [-11, 1, -6, 16];
var timeCount = 0;

// Forward:		Paris = 1;	Rome = 0;	NewYork = -6;  	London = 5;
// Backward:	NewYork = 5;	 

var swatch = "0:00:00.00";
var sh  = 0;
var sm  = 0;
var ss  = 0;
var sfr = 0;

var alarm = "0:00 " + ampm;
var ah = 0;
var am = 0;
var alarmAmPm = ampm
var alarmSet = false;
var alarmFlash = 0;
var alarmFlashOn = 'N'

var timeout = 0;
var flashout = 0;
var flashOn = 'N';

var currentFunction = 'Running';
var mthName         = 'XXX';

var tick = (s * (360 / 60)) - 180;
var min  = (m * (360 / 60)) - 180;
if ( h > 12 ) h = h - 12;

var hr   = (h * (360 / 12)) - 180;


//var paper = new Raphael( 0, 0, 400, 400);
var paper = new Raphael( 0, 0, 700, 700);

//var backGround = paper.rect(0, 0, 400, 400).attr({
//	fill: "rgb(255,255,255)"});
var backGround = paper.rect(0, 0, 700, 700).attr({
	fill: "rgb(255,255,255)"});	

//var face = paper.circle(200,200,110).attr({
//	fill: "rgb(218,179,24)",
//	stroke: "rgb(165,135,18)",
//	"stroke-width": 15 });
//var img3 = paper.image("polex.jpg", 100,100, 199, 200);
var img3 = paper.image("polexClock.jpg", 100,100, 500, 500);

var stopwatch = paper.rect(295,380,110,50,5).attr({
	fill: "rgb(183,201,54)"});
	
var digital = paper.rect(295,380,110,50,5).attr({
	fill: "rgb(183,201,54)"});

var monthName = paper.rect(400,340,45,25,5).attr({
	fill: "rgb(183,201,54)"})
	
var daynos = paper.rect(448,340,38,25,5).attr({
	fill: "rgb(183,201,54)"});
	
var highlight = paper.rect(305,385,18,20).attr({
	fill: "rgb(183,201,54)",
	"stroke-width": "0px"});

var stoptext = paper.text(350, 395, swatch).attr({
	fill: "rgb(0,0,0)",
	"font-size": "17px",
	text: swatch});
	
var alarmtext = paper.text(350, 395, alarm).attr({
	fill: "rgb(0,0,0)",
	"font-size": "17px",
	text: alarm});
	
var setAlarm = paper.rect(300,405,30,20,5).attr({
	fill: "green",
	"stroke-width": "1px"});
setAlarm.click(function () {alarmOn();});
	
var cancelAlarm = paper.rect(342,405,60,20,5).attr({
	fill: "red",
	"stroke-width": "1px"});
cancelAlarm.click(function () {alarmOff();});	
	
var setAlarmText = paper.text(315, 415, "Set").attr({
	fill: "rgb(0,0,0)",
	"font-size": "17px",
	text: "Set"});
setAlarmText.click(function () {alarmOn();});
	
var cancelAlarmText = paper.text(370, 415, "Cancel").attr({
	fill: "rgb(0,0,0)",
	"font-size": "17px",
	text: "Cancel"});
cancelAlarmText.click(function () {alarmOff();});	

//var stoptext1 = paper.text(350, 395, swatch).attr({
//	fill: "rgb(0,0,0)",
//	"font-size": "17px",
//	text: swatch});	

function alarmOn(){
	alarmSet = true;
	highlight.hide();
}

function alarmOff(){
	alarmSet = false;
	alarm = "0:00 " + ampm;
	clearTimeout(alarmFlash);
	highlight.show();
	alarmtext.attr({ text: alarm});
	highlightField(318,385,12,20);
}

function checkAlarm(){
	if (h == ah & m == am & ampm == alarmAmPm){
		alarmSet = "Sounding";
		changeFunction("Day");
		flashAlarm();
	}
}

function flashAlarm(){
	if ( alarmFlashOn == 'N' ) {
		alarmtext.attr({ fill: "rgb(225,255,128)"});
		alarmFlashOn = 'Y'
	}else {
		alarmtext.attr({ fill: "rgb(183,201,54)"});
		alarmFlashOn = 'N';
	}
	alarmFlash = setTimeout(function(){flashAlarm()},500);
}

var display = paper.text(350, 395, "Hello").attr({
	fill: "rgb(0,0,0)",
	"font-size": "17px"});
//	text: "12:17:34"});

	showDigital();
	
var display1 = paper.text(350, 415, "Hello").attr({
	fill: "rgb(0,0,0)",
	"font-size": "17px",
	text: timeZones[0]});	
	
stoptext.hide();
alarmtext.hide();
setAlarm.hide();
cancelAlarm.hide();
setAlarmText.hide();
cancelAlarmText.hide();
//stoptext1.hide();
moveMonth(0);	
//display.attr({ fill: "black" });
//display.attr({ text: "12:17:34"});
//display.fontFamily("Times");
//display.fontSize(10);
//display.text({ fontSize: "10" });

var daydisp = paper.text(468,352, "99").attr({
	fill: "rgb(0,0,0)",
	"font-size": "17px",
	text: day});
daydisp.attr({ text: day});

var mthdisp = paper.text(422,352, mthName).attr({
	fill: "rgb(0,0,0)",
	"font-size": "17px",
	text: mthName});
mthdisp.attr({ text: mthName});

var button1 = paper.circle(310,317,16);
button1.attr({ fill: "blue" });
button1.click(function () {changeFunction(currentFunction);});

var button1text = paper.text(310, 317, "F").attr({
	"font-size": "20px",
	"font-weight": "800",
	fill: "rgb(183,201,54)",
	stroke:"black",
	"stroke-width": "1px"});
button1text.click(function () {changeFunction(currentFunction);});	


var button2 = paper.circle(350,317,16).attr({ fill: "green" });
button2.click(function () {moveForward(currentFunction);});
var button2text = paper.text(350, 317, "+").attr({
	"font-size": "25px",
	"font-weight": "800",
	fill: "rgb(183,201,54)",
	stroke:"black",
	"stroke-width": "1px"});
button2text.click(function () {moveForward(currentFunction);});	


var button3 = paper.circle(390,317,16).attr({ fill: "red" });
button3.click(function () {moveBack(currentFunction);});
var button3text = paper.text(390, 315, "-").attr({
	"font-size": "27px",
	"font-weight": "800",
	fill: "rgb(183,201,54)",
	stroke:"black",
	"stroke-width": "1px"});
button3text.click(function () {moveBack(currentFunction);});	

//var seconds = paper.rect(199,200,3,85).attr({ fill: "red" });
//var minutes = paper.rect(198,200,5,75).attr({ fill: "white" });
//var hours = paper.rect(198,200,5,55).attr({ fill: "green" });

var hours = paper.rect(347,347,7,90).attr({ fill: "white" });
var minutes = paper.rect(347,347,7,130).attr({ fill: "white" });
var seconds = paper.rect(349,349,5,140).attr({ fill: "red" });
var time    = h + ":" + m + ":" + s + " " + ampm;

var midd = paper.circle(350,353,12).attr({
	fill: "rgb(218,179,24)",
	stroke: "rgb(165,135,18)",
	"stroke-width": 7 });

function showDigital(){
	time = h + ":";
	if ( m < 10 ) time = time + "0"
	time = time + m + ":";
	if ( s < 10 ) time = time + "0";
	time = time + s + " " + ampm;
	display.attr({ text: time});
}

function showAlarm(){
	alarm = ah + ":";
	if ( am < 10 ) alarm = alarm + "0";
	alarm = alarm + am + " " + alarmAmPm;
	alarmtext.attr({ text: alarm});
}

function changeFunction(fun){
	switch (fun) {
		case 'Running'   : currentFunction = 'Hour';
						   highlight.show();
						   flashHighlight();
						   break;
		case 'Hour'      : currentFunction = 'Minute';
						   highlightField(326,385,20,20);
						   break;
		case 'Minute'    : currentFunction = 'AmPm';
						   highlightField(372,385,27,20);
						   break;
		case 'AmPm'      : currentFunction = 'Timezone';
						   highlightField(310,405,80,20);
						   break;
		case 'Timezone'  : currentFunction = 'Month';
						   highlightField(405,342,35,20);
						   break;
		case 'Month'     : currentFunction = 'Day';
						   highlightField(455,342,25,20);
						   break;
		case 'Day' 		 : currentFunction = 'AlarmHour';
						   display.hide();
						   display1.hide();
						   stoptext.hide();	
						   alarmtext.show();
						   setAlarm.show();
						   cancelAlarm.show();
						   setAlarmText.show();
						   cancelAlarmText.show();
						   highlightField(318,385,12,20);
						   break;
		case 'AlarmHour' : currentFunction = 'AlarmMin';
						   highlightField(333,385,21,20);
						   break;
		case 'AlarmMin'  : currentFunction = 'AlarmAmPm';
						   highlightField(356,385,27,20);
						   break;
		case 'AlarmAmPm' : currentFunction = 'StopWatch';
						   alarmtext.hide();
						   setAlarm.hide();
						   cancelAlarm.hide();
						   setAlarmText.hide();
						   cancelAlarmText.hide();
						   display.hide();
						   display1.hide();
						   highlight.hide();
						   stoptext.show();	
						   clearTimeout(flashout);
						   //stoptext1.show();
//						   highlightField(405,342,35,20);
						   break;	
		case 'StopWatch' : currentFunction = 'Running';
						   stoptext.hide();
//						   stoptext1.hide();				   
						   alarmtext.hide();
						   setAlarm.hide();
						   cancelAlarm.hide();
						   setAlarmText.hide();
						   cancelAlarmText.hide();
						   display.show();
						   display1.show();
						   highlightField(310,385,18,20);
						   break;						   
		default  		 : currentFunction = 'Z';
	}
}

function highlightField(x, y, width, height){
	highlight.attr({
		x: x,
		y: y,
		width: width,
		height: height});	
}

function moveSecond(){
	tick = tick+(6);
	s++;
	seconds.animate({transform: [ 'r',tick,350,353]});
	if ( s == 60 ) {
//		m++;
		setTimeout(function(){moveMinute(1)},second);
		s = 0;
	}
	if ( m == 60 ) {
//		h++;
		m = 0;
		setTimeout(function(){moveHour(1)},second);
		if ( h == 13 ) h = 1;	
	}
	showDigital();
	if (alarmSet == true) checkAlarm();
	setTimeout(function(){moveSecond()},second);
}

function moveMinute(num){
	m = m + num;
	if (m == 60) m = 0;
	if (m == -1) m = 59
	min = min+(6 * num);
	minutes.animate({transform: [ 'r',min,349,351]});
}

function moveHour(num){
/*	h = h + num;
	if (h == 13) h = 1;
	if (h == 0) h = 12;
	hr = hr+(30 * num);
	hours.animate({transform: [ 'r',hr,349,351]});*/
	
	h = h + num;
	if (h > 12){
		h = h - 12;
		( ampm == 'am' ) ? ampm = 'pm' : ampm = 'am';
	}
	if (h == 0) h = 12;
	if (h < 0){
		h = 12 + h;
		( ampm == 'am' ) ? ampm = 'pm' : ampm = 'am';
	}
	hr = hr+(30 * num);
	hours.animate({transform: [ 'r',hr,349,351]});
}

function moveDay(num){
	day = day + num;
	if (day == 32) day = 1;
	if (day == 0) day = 31;
	daydisp.attr({ text: day});
}

function moveMonth(num){
	mth = mth + num;
	if ( mth == -1 ) mth = 11;
	if ( mth == 12 ) mth = 0;

	switch (mth) {
		case  0 : mthName = 'Jan';
		          break;
		case  1 : mthName = 'Feb';
		          break;
		case  2 : mthName = 'Mar';
				  break;
		case  3 : mthName = 'Apr';
				  break;
		case  4 : mthName = 'May';
				  break;
		case  5 : mthName = 'Jun';
				  break;
		case  6 : mthName = 'Jul';
				  break;
		case  7 : mthName = 'Aug';
				  break;
		case  8 : mthName = 'Sep';
				  break;
		case  9 : mthName = 'Oct';
				  break;
		case 10 : mthName = 'Nov';
				  break;
		case 11 : mthName = 'Dec';
				  break;
		default : mthName = "ZZZ";
	}
	if ( num != 0 ) mthdisp.attr({ text: mthName});
}

function moveTimezone(num){
	if (num == 1){
		timeCount = timeCount + num;
		if ( timeCount == 4  ) timeCount = 0;
		moveHour(timeDiff[timeCount]);
		display1.attr({ text: timeZones[timeCount]});
	}else {
		moveHour(timeDiff[timeCount] * -1);
		timeCount = timeCount + num;
		if ( timeCount == -1 ) timeCount = 3;
		display1.attr({ text: timeZones[timeCount]});
	}
}

function moveAlarmHour(num){
	ah = ah + num;
	if (ah > 12){
		ah = 1;
		moveAlarmAmPm();
	}
	if (ah < 1){
		ah = 12;
		moveAlarmAmPm();
	} 
	showAlarm();
}

function moveAlarmMin(num){
	am = am + num;
	if (am == 60) am = 0;
	if (am == -1) am = 59
	showAlarm();
}

function moveAlarmAmPm(){
	( alarmAmPm == 'am' ) ? alarmAmPm = 'pm' : alarmAmPm = 'am';
	showAlarm();
}


function moveForward(fun){

	switch (fun) {
		case 'Hour' 	  : moveHour(1);
							break;
		case 'Minute' 	  : moveMinute(1);
							break;
		case 'AmPm' 	  : ( ampm == 'am' ) ? ampm = 'pm' : ampm = 'am';
							break;
		case 'Timezone'	  : moveTimezone(1);
						    break;
		case 'Month' 	  : moveMonth(1);
							break;
		case 'Day' 		  : moveDay(1);
							break;
		case 'StopWatch'  : timerAction("START");
							break;
		case 'AlarmHour'  : moveAlarmHour(1);
						    break;
		case 'AlarmMin'	  : moveAlarmMin(1);
						    break;
		case 'AlarmAmPm'  : moveAlarmAmPm();
						    break;
	}
}

function moveBack(fun){

	switch (fun) {
		case 'Hour' 	 : moveHour(-1);
						   break;
		case 'Minute' 	 : moveMinute(-1);
						   break;
		case 'AmPm' 	 : ( ampm == 'am' ) ? ampm = 'pm' : ampm = 'am';
						   break;
		case 'Timezone'  : moveTimezone(-1);
						   break;
		case 'Month' 	 : moveMonth(-1);
						   break;
        case 'Day' 		 : moveDay(-1);
						   break;
		case 'StopWatch' : timerAction("STOP");
						   break;
		case 'AlarmHour' : moveAlarmHour(-1);
						    break;
		case 'AlarmMin'	 : moveAlarmMin(-1);
						    break;
		case 'AlarmAmPm' : moveAlarmAmPm();
						    break;						   
	}
}

function timerAction(startStop){
	if (startStop == 'STOP'){
		if (timeout == 0) {
			resetTimer();
		}else {
			clearTimeout(timeout);
			timeout = 0;
		}
		return;
	}
	
	sfr++;
	if ( sfr == 100 ) {
		sfr = 0;
		ss++;
	}
	
	if ( ss == 60 ){
		ss  = 0;
		sm++;
	}
		
	if ( sm == 60 ){
		sm  = 0;
		sh++;
	}
	
	swatch = "" + sh + ":";
	swatch = ( sm < 10 ) ? swatch + "0" + sm + ":" : swatch + sm + ":";
	swatch = ( ss < 10 ) ? swatch + "0" + ss + "." : swatch + ss + ".";
	swatch = ( sfr < 10 ) ? swatch + "0" + sfr : swatch + sfr;

	stoptext.attr({ text: swatch});

	timeout = setTimeout(function(){timerAction("START")},10);
}

function resetTimer(){
	swatch = "0:00:00.00";
	sh  = 0;
	sm  = 0;
	ss  = 0;
	sfr = 0;
	stoptext.attr({ text: swatch});
}

function flashHighlight(){
//	highlightField(300,385,18,20);
	if ( flashOn == 'N' ) {
		highlight.attr({ fill: "rgb(225,168,24)"});
		flashOn = 'Y'
	}else {
		highlight.attr({ fill: "rgb(183,201,54)"});
		flashOn = 'N';
	}
	flashout = setTimeout(function(){flashHighlight()},500);
}

function setTime(){
	seconds.animate({transform: [ 'r',tick,350,353]});	
	minutes.animate({transform: [ 'r',min,350,353]});
	hours.animate({transform: [ 'r',hr,350,353]});
}

function startTime(){
 	setTimeout(function(){moveSecond()},second);
}

setTime(); // Set current Time. 
startTime(); //Function call that starts the startTime function.

};
