// 시청각 타임라인 (main.php inline script 이관)
// 정적 파일 기준 URL (서버가 <head> 에서 window.SEWOL_ASSET_BASE 로 주입, 로컬 서빙이면 "")
var SEWOL_ASSET_BASE = window.SEWOL_ASSET_BASE || "";
	
	let animationWrapWidth = $('.animationWrap').width();
	let mediaPartHeight = (649 * animationWrapWidth)/577;
	
	
	const issuesOnEventPosition = {"20140415173000":{"datetime":"2014-04-15 17:30:00","content":"\ub2e8\uc6d0\uace0 \uc218\ud559\uc5ec\ud589\ub2e8, \uc778\ucc9c\ud56d \uc5ec\uac1d\ud130\ubbf8\ub110 \ub3c4\ucc29"},"20140415192000":{"datetime":"2014-04-15 19:20:00","content":"\ub2e8\uc6d0\uace0 \uc218\ud559\uc5ec\ud589\ub2e8, \uc138\uc6d4\ud638 \ud0d1\uc2b9"},"20140415203500":{"datetime":"2014-04-15 20:35:00","content":"\uc778\ucc9cVTS, \uc2dc\uc815\uc8fc\uc758\ubcf4 \ud574\uc81c"},"20140415205830":{"datetime":"2014-04-15 20:58:30","content":"\uc138\uc6d4\ud638 \ucd9c\ud56d"},"20140415213000":{"datetime":"2014-04-15 21:30:00","content":"\uc120\ub0b4 \ub808\ud06c\ub9ac\uc5d0\uc774\uc158"},"20140415220247":{"datetime":"2014-04-15 22:02:47","content":"\uc120\uc0c1 \ubd88\uaf43\ub180\uc774"},"20140415070600":{"datetime":"2014-04-15 07:06:00","content":"\uc138\uc6d4\ud638, \uc9c4\ub3c4VTS \uad00\ud560 \ud574\uc5ed \uc9c4\uc785"},"20140416073000":{"datetime":"2014-04-16 07:30:00","content":"\uc2b9\uac1d \uc544\uce68\uc2dd\uc0ac \uc2dc\uc791"},"20140416084824":{"datetime":"2014-04-16 08:48:24","content":"\uc870\ud0c0\uc7a5\uce58 \uace0\uc7a5 \ubc1c\uc0dd, \ubc29\ud5a5\ud0c0 \uc6b0\uc120\ud68c"},"20140416084945":{"datetime":"2014-04-16 08:49:45","content":"\ub2e8\uc6d0\uace0 \uc591\uc2b9\uc9c4 \uad50\uc0ac \ucd94\ub77d"},"20140416084949":{"datetime":"2014-04-16 08:49:49","content":"\ucd08\uae30 \ucd5c\ub300 \ud6a1\uacbd\uc0ac \uc88c\ud604 49\ub3c4 \ub3c4\ub2ec"},"20140416085200":{"datetime":"2014-04-16 08:52:00","content":"\uac15\ud61c\uc131, \ucd5c\ucd08 \"\uc120\ub0b4 \ub300\uae30\" \ubc29\uc1a1"},"20140416085232":{"datetime":"2014-04-16 08:52:32","content":"\uace0 \ucd5c\ub355\ud558 \uad70, \uc804\ub0a8119\uc5d0 \ucd5c\ucd08 \uc2e0\uace0"},"20140416085439":{"datetime":"2014-04-16 08:54:39","content":"\ubaa9\ud3ec\uc11c, 119 \ud1b5\ud574 \uc0ac\uace0 \uc778\uc9c0"},"20140416085510":{"datetime":"2014-04-16 08:55:10","content":"\uc138\uc6d4\ud638, \uc81c\uc8fcVTS\uc640 \uccab \uad50\uc2e0"},"20140416085634":{"datetime":"2014-04-16 08:56:34","content":"\uc81c\uc8fcVTS, \uc81c\uc8fc\ud574\uacbd\uc5d0 \uc0ac\uace0 \uc804\ud30c"},"20140416085800":{"datetime":"2014-04-16 08:58:00","content":"123\uc815(\uc138\uc6d4\ud638 \ubd81\ub3d9 12\ud574\ub9ac) \ucd9c\ubc1c"},"20140416085818":{"datetime":"2014-04-16 08:58:18","content":"\ub2e8\uc6d0\uace0 \ud559\ubd80\ubaa8, \uc548\uc0b0119\uc5d0 \uccab \uc2e0\uace0"},"20140416090000":{"datetime":"2014-04-16 09:00:00","content":"\uae30\uad00\ubd80 \uc120\uc6d0\ub4e4(4\uba85) \ud0c8\ucd9c \uc2dc\uc791"},"20140416090230":{"datetime":"2014-04-16 09:02:30","content":"\ubaa9\ud3ec\uc11c, \ubb38\uc790\uc0c1\ud669\ubcf4\uace0\uc2dc\uc2a4\ud15c\uc5d0 \uc138\uc6d4\ud638 \uccab \uc5b8\uae09"},"20140416090245":{"datetime":"2014-04-16 09:02:45","content":"123\uc815, \uc138\uc6d4\ud638\uc640 \uccab \uad50\uc2e0 \uc2dc\ub3c4 '\uc2e4\ud328'"},"20140416090620":{"datetime":"2014-04-16 09:06:20","content":"\uc138\uc6d4\ud638, \uc9c4\ub3c4VTS\uc640 \uccab \uad50\uc2e0"},"20140416090944":{"datetime":"2014-04-16 09:09:44","content":"\ub450\ub77c\uc5d0\uc774\uc2a4\ud638, \uc138\uc6d4\ud638 \uad6c\uc870\ucc28 \uc774\ub3d9"},"20140416090900":{"datetime":"2014-04-16 09:09:00","content":"513\ud5ec\uae30, \uc81c\uc8fc \uc0c1\uacf5\uc11c \ucd9c\ubc1c"},"20140416091000":{"datetime":"2014-04-16 09:10:00","content":"511\ud5ec\uae30, \ubaa9\ud3ec\ud56d\uacf5\ub300\uc11c \ucd9c\ubc1c"},"20140416091449":{"datetime":"2014-04-16 09:14:49","content":"\uc81c\uc8fc\uc6b4\ud56d\uad00\ub9ac\uc2e4, \uc138\uc6d4\ud638\uc640 \uccab \uad50\uc2e0"},"20140416091531":{"datetime":"2014-04-16 09:15:31","content":"\ub450\ub77c\uc5d0\uc774\uc2a4\ud638, \uc0ac\uace0 \ud574\uc5ed \ub3c4\ucc29"},"20140416091620":{"datetime":"2014-04-16 09:16:20","content":"\uc11c\ud574\uccad, 123\uc815 OSC(\ud604\uc7a5\uc9c0\ud718\uad00) \uc9c0\uc815"},"20140416091700":{"datetime":"2014-04-16 09:17:00","content":"512\ud5ec\uae30, 3009\ud568\uc11c \ucd9c\ubc1c"},"20140416091900":{"datetime":"2014-04-16 09:19:00","content":"\uccad\uc640\ub300 \uad00\uacc4\uc790, YTN \uc18d\ubcf4\ub85c \uc0ac\uace0 \uc778\uc9c0"},"20140416092117":{"datetime":"2014-04-16 09:21:17","content":"\uc138\uc6d4\ud638 \uc8fc\ubc1c\uc804\uae30 \uc815\uc9c0"},"20140416092321":{"datetime":"2014-04-16 09:23:21","content":"\ub450\ub77c\uc5d0\uc774\uc2a4\ud638, \uc138\uc6d4\ud638\uc5d0 \uc2b9\uac1d \ud0c8\ucd9c \uad8c\uace0"},"20140416092340":{"datetime":"2014-04-16 09:23:40","content":"\uc9c4\ub3c4VTS, \uc11c\ud574\uccad\uc5d0 \uc2b9\uac1d \ud0c8\ucd9c \uc9c0\uc2dc \uc5ec\ubd80 \ubb38\uc758"},"20140416092430":{"datetime":"2014-04-16 09:24:30","content":"\uc11c\ud574\uccad, \"\uc2b9\uac1d \ud0c8\ucd9c\uc740 \uc120\uc7a5 \ud310\ub2e8\" \ud68c\uc2e0"},"20140416092700":{"datetime":"2014-04-16 09:27:00","content":"511\ud5ec\uae30, \uc138\uc6d4\ud638 \uc0c1\uacf5 \ub3c4\ucc29"},"20140416092802":{"datetime":"2014-04-16 09:28:02","content":"511\ud5ec\uae30, \uccab \ud604\uc7a5 \ubcf4\uace0"},"20140416093400":{"datetime":"2014-04-16 09:34:00","content":"123\uc815, \uc0ac\uace0 \ud574\uc5ed \ub3c4\ucc29"},"20140416093430":{"datetime":"2014-04-16 09:34:30","content":"513\ud5ec\uae30, \uc138\uc6d4\ud638 \uc0c1\uacf5 \ub3c4\ucc29"},"20140416093450":{"datetime":"2014-04-16 09:34:50","content":"511\ud5ec\uae30, \uccab \uc778\uba85 \uad6c\uc870(\uc870\ub9ac\uc0ac \uae40\uc885\uc784)"},"20140416093636":{"datetime":"2014-04-16 09:36:36","content":"123\uc815, \ud574\uacbd \ubcf8\uccad\uc5d0 \uccab \ud604\uc7a5 \ubcf4\uace0"},"20140416093855":{"datetime":"2014-04-16 09:38:55","content":"\uccad\uc640\ub300, VIP \ubcf4\uace0\uc6a9 '\ud604\uc7a5 \uc601\uc0c1' \ud574\uacbd\uc5d0 \uc694\uad6c"},"20140416093940":{"datetime":"2014-04-16 09:39:40","content":"123\uc815 \uace0\ubb34\ub2e8\uc815, \uae30\uad00\ubd80 \uc120\uc6d0 4\uba85 \uad6c\uc870"},"20140416094028":{"datetime":"2014-04-16 09:40:28","content":"\uc138\uc6d4\ud638, \uc81c\uc8fc\uc6b4\ud56d\uad00\ub9ac\uc2e4\uacfc '\ub9c8\uc9c0\ub9c9 \uad50\uc2e0'"},"20140416094335":{"datetime":"2014-04-16 09:43:35","content":"511\ud5ec\uae30, 6\uba85 \uad6c\uc870"},"20140416094430":{"datetime":"2014-04-16 09:44:30","content":"\ud574\uacbd \uc774\ud615\ub798, \uc138\uc6d4\ud638 \uac11\ud310 \uc9c4\uc785"},"20140416094525":{"datetime":"2014-04-16 09:45:25","content":"123\uc815, \uc138\uc6d4\ud638 \uc870\ud0c0\uc2e4 \uc811\uc548"},"20140416094637":{"datetime":"2014-04-16 09:46:37","content":"123\uc815, \uc774\uc900\uc11d \uc120\uc7a5 \uad6c\uc870"},"20140416094900":{"datetime":"2014-04-16 09:49:00","content":"512\ud5ec\uae30, \uc138\uc6d4\ud638 \uc0c1\uacf5 \ub3c4\ucc29"},"20140416094950":{"datetime":"2014-04-16 09:49:50","content":"123\uc815, \uac11\ud310\ubd80 \uc120\uc6d0 8\uba85 \uad6c\uc870"},"20140416095055":{"datetime":"2014-04-16 09:50:55","content":"512\ud5ec\uae30, \uad6c\uba85\ubc8c \ud22c\ud558"},"20140416095620":{"datetime":"2014-04-16 09:56:20","content":"513\ud5ec\uae30, 6\uba85 \uad6c\uc870"},"20140416100600":{"datetime":"2014-04-16 10:06:00","content":"123\uc815, \uc138\uc6d4\ud638 \uc120\uccb4 2\ucc28 \uc811\uc548"},"20140416100700":{"datetime":"2014-04-16 10:07:00","content":"\uc804\ub0a8 \uc5b4\uc5c5\uc9c0\ub3c4\uc120, \ud604\uc7a5 \ub3c4\ucc29"},"20140416101030":{"datetime":"2014-04-16 10:10:30","content":"123\uc815, \uac1d\uc2e4 \uc720\ub9ac\ucc3d \uae68\uace0 6\uba85 \uad6c\uc870"},"20140416101428":{"datetime":"2014-04-16 10:14:28","content":"\uccad\uc640\ub300, '\ud604\uc7a5 \uc601\uc0c1' \uc7ac\ucc28 \uc694\uad6c"},"20140416101500":{"datetime":"2014-04-16 10:15:00","content":"511\ud5ec\uae30, 6\uba85 \ucd94\uac00 \uad6c\uc870"},"20140416101652":{"datetime":"2014-04-16 10:16:52","content":"512\ud5ec\uae30, 6\uba85 \uad6c\uc870"},"20140416102210":{"datetime":"2014-04-16 10:22:10","content":"511\ud5ec\uae30, \"90% \uc804\ubcf5, \uce68\ubab0\" \ubcf4\uace0"},"20140416102442":{"datetime":"2014-04-16 10:24:42","content":"\uccad\uc640\ub300, \ud574\uacbd\uccad\uc7a5\uc5d0 'VIP \uba54\uc2dc\uc9c0' \uc804\ub2ec"},"20140416103000":{"datetime":"2014-04-16 10:30:00","content":"\uc138\uc6d4\ud638, \uc120\uc218 \uc77c\ubd80\ub9cc \ub0a8\uae30\uace0 \uce68\ubab0"}};
	
	
	const colourByCategory = {"\uc778\ucc9c\ud56d\ub9cc CCTV":"#1B001C","\uc778\ucc9c\ud56d \ub300\ud569\uc2e4 CCTV":"#9F2476","\uc120\ub0b4 CCTV":"#FACCF9","\ube14\ub799\ubc15\uc2a4 1":"#FD56FD","\ube14\ub799\ubc15\uc2a4 2":"#F4005E","\ube14\ub799\ubc15\uc2a4 3":"#FFBC5E","\ube14\ub799\ubc15\uc2a4 4":"#1E58E6","\ube14\ub799\ubc15\uc2a4 5":"#7FE1F4","\ube14\ub799\ubc15\uc2a4 6":"#59DBF8","\ube14\ub799\ubc15\uc2a4 7":"#B7FDFE","\uc2b9\uac1d\ud734\ub300\uc804\ud654":"#0CCBFD","\uae40\ub3d9\ud611 \ub3d9\uc601\uc0c1":"#8D99AE","\uae40\uc2dc\uc5f0 \ub3d9\uc601\uc0c1":"#4B998C","\uae40\ud64d\uacbd \ub3d9\uc601\uc0c1":"#94D7C7","\ubc15\uc218\ud604 \ub3d9\uc601\uc0c1":"#3A90B8","\ubc15\uc608\uc2ac \ub3d9\uc601\uc0c1":"#FFF6B0","\uc190\uc815\uc544 \ub3d9\uc601\uc0c1":"#FD6F91","123\uc815":"#9B01F2","\ud5ec\uae30511":"#D95AFE","\ud5ec\uae30512":"#B896CA","\ud5ec\uae30513":"#6F7691","\ud5ec\uae30505":"#FB5B68","CN5\ucd08\uacc4\uae30":"#FFEB48","\ub450\ub77c\uc5d0\uc774\uc2a4\ud638":"#2676A1","\ub4dc\ub77c\uace4\uc5d0\uc774\uc2a411\ud638":"#FFBDB0","\uc804\ub0a8 \uc5b4\uc5c5\uc9c0\ub3c4\uc120":"#FA74BF","\uc804\ub0a8119":"#D65F73","\uc548\uc0b0119":"#D0A394","\ud574\uacbd122":"#7BA276","\ud574\uacbdTRS":"#CD5EA7","\uc9c4\ub3c4VTS (VHF1)":"#290001","\uc9c4\ub3c4VTS (VHF2)":"#3F0010","\uc9c4\ub3c4VTS (VHF3)":"#EB4158","\uc9c4\ub3c4VTS (VHF4)":"#930047","\uc9c4\ub3c4VTS (VHF5)":"#700C3D","\uc9c4\ub3c4VTS (VHF6)":"#90FF5D","\uc81c\uc8fcVTS (VHF)":"#048F45","\uc778\ucc9cVTS (VHF)":"#024F2E","\uc81c\uc8fc\uc6b4\ud56d\uad00\ub9ac\uc2e4 (SSB)":"#001D15","\ud574\uacbd \uccad\uc640\ub300 \ud56b\ub77c\uc778":"#AD848C","\ud574\uacbd \ubcf8\uccad \uacbd\ube44\uc804\ud654 (2042)":"#D6B390","\ud574\uacbd \ubcf8\uccad \uacbd\ube44\uc804\ud654 (21)":"#B92000","\ud574\uacbd \ubcf8\uccad \uacbd\ube44\uc804\ud654 (2242)":"#2B2C82","\ud574\uacbd \ubcf8\uccad \uacbd\ube44\uc804\ud654 (2342)":"#3AB7F6","\ud574\uacbd \ubcf8\uccad \uacbd\ube44\uc804\ud654 (2442)":"#4429B8","\ud574\uacbd \ubcf8\uccad \uacbd\ube44\uc804\ud654 (2594)":"#5C0632","\ud574\uacbd \ubcf8\uccad \uacbd\ube44\uc804\ud654 (2742)":"#747F8A","\ud574\uacbd \ubcf8\uccad \uacbd\ube44\uc804\ud654 (2752)":"#7A4722","\uc11c\ud574\ud574\uacbd\uccad \uacbd\ube44\uc804\ud654":"#14575F"};
	
	const timelineTimes = {"premiere":{"start":{"DD":15,"HH":17,"MM":30},"end":{"DD":15,"HH":21,"MM":4}},"deuxieme":{"start":{"DD":15,"HH":21,"MM":4},"end":{"DD":16,"HH":8,"MM":48}},"troisieme":{"start":{"DD":16,"HH":8,"MM":48},"end":{"DD":16,"HH":10,"MM":40}}};
	const timelineYoutube = {"premiere":"liLGk3VeKUI","deuxieme":"miXLMjBTWxM","troisieme":"JgPp08saJ4E"};
	
	const timelineMinGridSize = {"premiere":720,"deuxieme":720,"troisieme":1400};

	const globalCurrentStage = document.body.dataset.part;
	var start = new Date(2014, 3, timelineTimes[globalCurrentStage]["start"]["DD"], timelineTimes[globalCurrentStage]["start"]["HH"], timelineTimes[globalCurrentStage]["start"]["MM"], 0, 0);
	var end = new Date(2014, 3, timelineTimes[globalCurrentStage]["end"]["DD"], timelineTimes[globalCurrentStage]["end"]["HH"], timelineTimes[globalCurrentStage]["end"]["MM"], 0, 0); 
	var globalShowedManual = false, globalLoadedDone = false, globalPlayers0JustStarted = true, globalPlayers0Volume = 0, globalPlayers1Volume = 0, globalDoNotPlayLottie = false, globalSlideStatus = false, globalCurrentSeries = 3, globalCurrentVideoStartTime = "", globalCurrentVideo2Id = "", globalStandardTimeOfTimeline = 0, CURRENTDATEINOFFICIALLY = start, globalBeginOfTimeline = 0, globalEndOfTimeline = 0, globalEventDataSection = [], globalCurrentStatus = "NEW", globalCurrentLottiePath = "", globalCurrentRemainingPlayTime = 0, globalVideoDuration = 0, globalCurrentPlayPercent = 0, globalCurrentPlayTime = 0, globalCurrentTimestamp = 0, globalCurrentDateTime = 0, globalCurrentTime = 0, globalCurrentTime2 = 0, globalCurrentProvider = "", reloadmmArray = ["0000", "1000", "2000", "3000", , "4000", , "5000"];
	const PlotlyLayout = { width: 280, height: 150, margin: { t: 0, b: 0 }, font: { color: "rgb(28 65 117)", family: "Roboto Mono" } };

	
	const sewolfPlayer = document.querySelector("#SWFvectorPlayerHandler"); 
	
	
	var globalValue = "test is test";
	var slider = document.getElementById('jui-slider-range-min');
	noUiSlider.create(slider, {
		animate: true,
		start: [start.getTime()],
		connect: true,
		range: {
			'min': start.getTime(), 
			'max': end.getTime()
		}
	});
	
	const players = Plyr.setup('.videoPlayerWrap', {
		controls: ['play', 'play-large', 'progress', 'volume'], 
		autoplay: false
	});
	window.players = players;
	
	
	players[0].on('play', event => { 
		$(".main_slider i").removeClass();
		$(".main_slider i").addClass("swf-icons swf-17_pause"); 
		$(".leftWrap .swf-icons.swf-18_loading1.swf-spin").hide();
		globalCurrentStatus = "PLAY"; 
		if ($(".minioWrap").css('display') != "none") players[1].play(); 
		$('.mainBackgroundVideo .plyr__poster').css('display', 'none').css('opacity', 0);
	});
	players[0].on('pause', event => {
		$(".main_slider i").removeClass();
		$(".main_slider i").addClass("swf-icons swf-16_play");
		globalCurrentStatus = "PAUSE"; 
		players[1].pause(); 
		$('.mainBackgroundVideo .plyr__poster').css('display', 'block').css('opacity', 1); 
	}); 
	document.getElementById("play_pause_behaviour").onclick = function() {  
		if ($(".main_slider i").hasClass("swf-16_play")) { 
			players[0].play(); 
			if (globalDoNotPlayLottie == true) sewolfPlayer.play(); 
		} else { 
			players[0].pause(); 
			if (globalDoNotPlayLottie == true) sewolfPlayer.pause(); 
		}
	}
	 
	players[0].on('playing', event => {
		$(".main_slider i").removeClass();
		$(".main_slider i").addClass("swf-icons swf-17_pause"); 
		$(".leftWrap .swf-icons.swf-18_loading1.swf-spin").hide();
		globalCurrentStatus = "PLAY";  
		if (moment(CURRENTDATEINOFFICIALLY).unix() - moment(globalStandardTimeOfTimeline).unix() > 1200) asyncCallReloadEventDatas();
		if (globalPlayers0JustStarted == true) {
			players[0].currentTime = 0;
			globalPlayers0JustStarted = false;
		}
		
		
	});  
	players[1].on('statechange', event => {  
	});
	
	players[1].on('ended', function () {
		
		
		globalPlayers1Volume = players[1].volume;
		if (globalCurrentStatus == "PLAY") {
			players[1].pause(); 
			players[0].pause();  
		}
		$(".minioWrap").hide();
		$('.minioWrap #labelSticker').empty();  
		globalCurrentVideo2Id = "";
		setTimeout(function(){ 
			if (globalCurrentStatus == "PAUSE") {
				players[0].play();  
				players[0].volume = globalPlayers0Volume;
			}
		}, 100); 
	}); 
	players[1].on('play', event => {
		players[0].play(); 
	});
	players[1].on('pause', event => {
		players[0].pause(); 
	});
	players[1].on('playing', event => {
		$(".leftWrap .swf-icons.swf-18_loading1.swf-spin").hide();
	});  
	 
	
	var data = [
	  {
		domain: { x: [0, 1], y: [0, 1] },
		value: 0,
		type: "indicator",
		mode: "gauge+number",
		gauge: {
		  bar: { color: "rgb(28 65 117)" },
		  axis: { range: [null, 50] },
		  steps: [
			  { range: [0, 30], color: "lightgray" },
			  { range: [30, 50], color: "#bdbdbd" }
		  ],
		  threshold: {
			line: { color: "red", width: 2 },
			thickness: 0.75,
			value: 32.15551295492
		  }
		}
	  }
	]; 
	Plotly.newPlot('speedCharWrap', data, PlotlyLayout);
	$("#speedCharWrap text.number").text($("#speedCharWrap text.number").text()+"km");
	
	function calculateHeight(){  
		animationWrapWidth = $('.animationWrap').width();
		mediaPartHeight = (649 * animationWrapWidth)/577; 
		$('main').show();
		$('footer').show();
		$('.noticeForScreenWidth').hide();
		$('.animationWrap').css('height', mediaPartHeight+'px');
		$('.videoPlayer0Wrap').css('height', mediaPartHeight+'px');	
		$('#SWFvectorPlayerHandler').css('width', animationWrapWidth+'px !important');
		$('#SWFvectorPlayerHandler').css('height', mediaPartHeight+'px !important')
		
	} 
	
	function InitializationTimeline() {
		
		let defaults = {
			type: "bar",
			scale: "hour",
			startDatetime: moment(start).format('YYYY-MM-DD HH:mm:ss'),
			endDatetime: moment(end).format('YYYY-MM-DD HH:mm:ss'),
			range: 3,
			rows: "auto",
			rowHeight: 48,
			width: "auto",
			height: "auto",
			minGridSize: timelineMinGridSize[globalCurrentStage],
			marginHeight: 2,
			headline: {
				display: false,
				title: "",
				range: true,
				locale: "ko-KR",
				format: {
					hour12: false
				}
			},
			sidebar: {
				sticky: true,
				overlay: false,
				list: []
			},
			ruler: {
				truncateLowers: false,
				top: {
					fontSize: 14,
					height: 24,
					lines: ['hour'],
					format: {
						hour: 'fulltime',
					},
					locale: "ko-KR"
				}, 
			},
			footer: {
				display: true,
				content: "",
				range: false,
				locale: "ko-KR",
				format: {
					hour12: false
				}
			},
			eventMeta: {
				display: false,
				scale: "day",
				locale: "ko-KR",
				format: {
					hour12: false
				},
				content: ""
			},
			eventData: [],
			effects: {
				presentTime: true,
				hoverEvent: true,
				stripedGridRow: true,
				horizontalGridStyle: "dotted",
				verticalGridStyle: "solid"
			}, 
			colorScheme: {
				theme: {
					name: "default",
					text: "#343A40",
					subtext: "#707070",
					offtext: "#BBBBBB",
					modesttext: "#969696",
					line: "#6C757D",
					offline: "#DDDDDD",
					activeline: "#DC3545",
					background: "#FFFFFF",
					invertbg: "#121212",
					striped1: "#F7F7F7",
					striped2: "#F0F0F0",
					active: "#F73333",
					marker: "#2C7CFF",
					gridbase: "#333333"
				},
				event: {
					text: "#343A40",
					border: "#6C757D",
					background: "#E7E7E7"
				},
				hookEventColors: function hookEventColors() { 
					return null;
				}
			
			}, 
			rangeAlign: "latest",
			loader: "default",
			loadingMessage: "",
			hideScrollbar: false,
			storage: "session",
			reloadCacheKeep: true,
			zoom: false,
			wrapScale: true,
			firstDayOfWeek: 0,
			engine: "canvas",
			debug: false,
			
			eventClicker : (event) => {
				alert("adf");
			},
			eventData: [],
		};
		
		$('#myTimeline').Timeline(Object.assign(defaults)).Timeline('initialized', function(e,v){
			 
		});
		
	}
	 
	function showManual() {
		if (globalLoadedDone == true && globalShowedManual == false && globalCurrentStage == "troisieme") {
			
			var hT = $('.main_timeline_wrap_troisieme').offset().top, hH = $('.main_timeline_wrap_troisieme').outerHeight(), wH = $(window).height(), wS = $(this).scrollTop();
			if (wS > (hT+hH-wH)) {
				$('<div class="scrollManualWrap"><div class="scrollManual"><h3 class="text-white text-center"><i class="swf-icons swf-29_scroll topSide blink"></i><p>&lt;상하 스크롤&gt;</p><i class="swf-icons swf-29_scroll bottomSide blink"></i></h3></div></div>').insertAfter( ".jqtl-loader" );
				
				
				setTimeout(function(){ 
					$(".scrollManualWrap").fadeToggle(500); 
					$(".scrollManualWrap").remove();
				}, 4000); 
				
				globalShowedManual = true;
			}
		}
	}
	window.onload = function() {
		calculateHeight();
		InitializationTimeline();
		asyncCallReloadEventDatas();
		$('#myTimeline').Timeline('ruizyiMoveOn');  
		if (globalCurrentStage == "premiere") globalCurrentLottiePath = SEWOL_ASSET_BASE + "/assets/animation/map_part1_1.json";
		if (globalCurrentStage == "deuxieme") globalCurrentLottiePath = SEWOL_ASSET_BASE + "/assets/animation/map_part2_1.json";
		if (globalCurrentStage == "troisieme") globalCurrentLottiePath = SEWOL_ASSET_BASE + "/assets/animation/map_part3.json"; 
		sewolfPlayer.load(globalCurrentLottiePath);
		
		slider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {  
			if (globalCurrentProvider == "youtube") {
				slideUpdate_(values[handle]);
			}
		});
		slider.noUiSlider.on('slide', function (values, handle, unencoded, isTap, positions) { 
			 
			players[0].pause(); 
			$(".minioWrap").hide();
			$('.minioWrap #labelSticker').empty();  
			sewolfPlayer.pause();
			globalCurrentStatus = "SLIDE";
			const positionDateTimeTimestamp = parseInt(values[handle]);
			var positionDateTime = new Date(positionDateTimeTimestamp); 
			CURRENTDATEINOFFICIALLY = positionDateTime;  
			$('#myTimeline').Timeline('ruizyiMoveOn');
			 
			const totalSeconds = (end.getTime() - start.getTime()) / 1000;
			const positionSeconds = parseInt(totalSeconds - ((end.getTime() - positionDateTime.getTime()) / 1000));
			players[0].currentTime = positionSeconds;
			players[0].play();  
			if (globalDoNotPlayLottie == true) sewolfPlayer.play();
		});
		slider.noUiSlider.on('start', function () {
			$('#myTimeline').Timeline('ruizyiPreparingTimeline'); 
		});
		slider.noUiSlider.on('end', function () { 
			asyncCallReloadEventDatas();
		});
		
		setTimeout(function(){ 
			if (globalCurrentStage == "troisieme") {
				$("#loading-wrapper.part3Notice").show();	
				setTimeout(function(){ 
					$("#loading-wrapper.part3Notice").fadeToggle(500);
					globalLoadedDone = true;
				}, 6000); 
			}
		}, 400); 
		setTimeout(function(){ 
			$("#loading-wrapper").fadeToggle(500);
		}, 500);  
		showManual();
	}  
	
	function slideUpdate_(currentTtimeStamp) { 
		const positionDateTimeTimestamp = parseInt(currentTtimeStamp);
		var positionDateTime = new Date(positionDateTimeTimestamp);
		CURRENTDATEINOFFICIALLY = positionDateTime;  
		$('#myTimeline').Timeline('ruizyiMoveOn');
		
		
		var simpleDateTime = parseInt(moment(positionDateTimeTimestamp).format('YYYYMMDDHHmmss'));
		if (simpleDateTime > 20140416101306) {
			$('.aisSignalNotice').show();
		} else {
			$('.aisSignalNotice').hide();
		}
		if(typeof locationData[0][simpleDateTime] != 'undefined'){ 
			document.getElementById("currentSOG").innerText = locationData[0][simpleDateTime]["SOG"];
			document.getElementById("currentLat").innerText = locationData[0][simpleDateTime]["lat"];
			document.getElementById("currentLon").innerText = locationData[0][simpleDateTime]["lon"];
			document.getElementById("currentLatitudeDMS").innerText = locationData[0][simpleDateTime]["latDMS"];
			document.getElementById("currentLongitudeDMS").innerText = locationData[0][simpleDateTime]["lonDMS"];
			
			const _value = locationData[0][simpleDateTime]["SOG"]*1.852;
			var data = [
			  {
				domain: { x: [0, 1], y: [0, 1] },
				value: _value,
				type: "indicator",
				mode: "gauge+number",
				gauge: {
				  bar: { color: "rgb(28 65 117)" },
				  axis: { range: [null, 50] },
				  steps: [
					{ range: [0, 30], color: "lightgray" },
					{ range: [30, 50], color: "#bdbdbd" }
				  ],
				  threshold: {
					line: { color: "red", width: 2 },
					thickness: 0.75,
					value: 32.15551295492
				  }
				}
			  }
			]; 
			Plotly.newPlot('speedCharWrap', data, PlotlyLayout);
			$("#speedCharWrap text.number").text(_value.toFixed(2)+"km");
			
		}   
		
		const totalSeconds = (end.getTime() - start.getTime()) / 1000;
		const positionSeconds = parseInt(totalSeconds - ((end.getTime() - positionDateTime.getTime()) / 1000));
		var positionInFrames = positionSeconds*24;  
		if (globalCurrentStage == "deuxieme") {
			var bufferSizeInFrame = 0;
			globalCurrentLottiePath = SEWOL_ASSET_BASE + "/assets/animation/map_part2_1.json";
			if (simpleDateTime > 20140416000400) { 
				bufferSizeInFrame = 259200;
				globalCurrentLottiePath = SEWOL_ASSET_BASE + "/assets/animation/map_part2_2.json";
			}
			if (simpleDateTime > 20140416030400) { 
				bufferSizeInFrame = 518400;
				globalCurrentLottiePath = SEWOL_ASSET_BASE + "/assets/animation/map_part2_3.json";
			}
			if (simpleDateTime > 20140416060400) {
				bufferSizeInFrame = 777600;
				globalCurrentLottiePath = SEWOL_ASSET_BASE + "/assets/animation/map_part2_4.json";
			}
			 
			if (sewolfPlayer.getLottieFileName() != globalCurrentLottiePath) { 
				
				sewolfPlayer.load(globalCurrentLottiePath);
			}
			positionInFrames = positionInFrames-bufferSizeInFrame; 
		} 

		if (globalCurrentStage != "premiere") sewolfPlayer.seek(positionInFrames);  
		
		if (globalCurrentStage == "premiere") {  
			if (simpleDateTime > 20140415205959) {
				globalDoNotPlayLottie = true;
				bufferSizeInFrame = 302424;
				globalCurrentLottiePath = SEWOL_ASSET_BASE + "/assets/animation/map_part1_2.json";
				
				if (sewolfPlayer.getLottieFileName() != globalCurrentLottiePath) { 
					sewolfPlayer.load(globalCurrentLottiePath);
				}
				positionInFrames = positionInFrames-bufferSizeInFrame;
				sewolfPlayer.seek(positionInFrames);  
				sewolfPlayer.play();  
			} else {
				globalDoNotPlayLottie = false;
				globalCurrentLottiePath = SEWOL_ASSET_BASE + "/assets/animation/map_part1_1.json";
				
				if (sewolfPlayer.getLottieFileName() != globalCurrentLottiePath) { 
					sewolfPlayer.load(globalCurrentLottiePath);
				}
				sewolfPlayer.seek(24);  
				sewolfPlayer.pause(); 
				
			}
		}
	} 
	function makeSyncBetweenSliderEtPlyrOnlyData(newPosition) { 
		document.getElementById("currentPlayTime").innerText = globalCurrentPlayTime;
		document.getElementById("currentTimestamp").innerText = newPosition;
		document.getElementById("currentDateTime").innerText = CURRENTDATEINOFFICIALLY;
		document.getElementById("currentPlayPercent").innerText = globalCurrentPlayPercent;
		document.getElementById("videoDuration").innerText = globalVideoDuration; 
		document.getElementById("currentRemainingPlayTime").innerText = globalCurrentRemainingPlayTime;  
		document.getElementById("currentStage").innerText = globalCurrentStage;  
		document.getElementById("currentLottiePath").innerText = globalCurrentLottiePath;  
		 
		if (reloadmmArray.includes(moment(CURRENTDATEINOFFICIALLY).format('mmss')) == true && globalCurrentStatus == "PLAY" && globalCurrentStage != "troisieme") asyncCallReloadEventDatas();
		 
		UIRendering();
	}
	function UIRendering() { 
		const currentAllDateTimeInfos = moment(CURRENTDATEINOFFICIALLY).format('YYYY-MM-DD-HH-mm-ss').split('-'); 
		
		
		document.getElementById("currentDayWrap1").innerText = currentAllDateTimeInfos[2]; 
		document.getElementById("currentDayWrap2").setAttribute("data-value", currentAllDateTimeInfos[2]);
		document.getElementById("currentHourWrap1").innerText = currentAllDateTimeInfos[3]; 
		document.getElementById("currentHourWrap2").setAttribute("data-value", currentAllDateTimeInfos[3]);
		document.getElementById("currentMinWrap1").innerText = currentAllDateTimeInfos[4]; 
		document.getElementById("currentMinWrap2").setAttribute("data-value", currentAllDateTimeInfos[4]);
		document.getElementById("currentSecondsWrap1").innerText = currentAllDateTimeInfos[5]; 
		document.getElementById("currentSecondsWrap2").setAttribute("data-value", currentAllDateTimeInfos[5]);
		 
		
		
		
	}
	function makeSyncBetweenSliderEtPlyr() {    
		var newPosition = moment(start.getTime()).add(globalCurrentTime, 'seconds').unix()*1000;  
		slider.noUiSlider.set(newPosition);     
		makeSyncBetweenSliderEtPlyrOnlyData(newPosition);
	}
	
	async function asyncCallBetweenSliderAndPlyr() { 
		const result = await makeSyncBetweenSliderEtPlyr();  
	} 
	let tempNewPosition = 0;
	function makeSyncBetweenSliderEtPlyr2(currentTime1) {   
		
		
		var newPosition = moment(globalCurrentVideoStartTime).add(currentTime1, 'seconds').unix()*1000;  
		var newPosition2 = moment(globalCurrentVideoStartTime).add(currentTime1, 'seconds');  
		if (tempNewPosition != newPosition) { 
			tempNewPosition = newPosition; 
			slider.noUiSlider.set(newPosition);    
			
			var positionDateTime = new Date(newPosition);
			CURRENTDATEINOFFICIALLY = positionDateTime;   
			$('#myTimeline').Timeline('ruizyiMoveOn');
			 
			if (globalCurrentStatus != "PLAY") { 
				var now = moment(globalCurrentVideoStartTime); 
				var end = moment(start); 
				var duration = moment.duration(now.diff(end));
				var sseconds = duration.asSeconds(); 
				 
				const positionSeconds = parseInt(sseconds+currentTime1);
				
				
				players[0].currentTime = positionSeconds; 
			}
			
		} 
	}
	
	async function asyncCallBetweenSliderAndPlyr2(currentTime1) { 
		const result = await makeSyncBetweenSliderEtPlyr2(currentTime1);  
	} 
	
	
	function reloadEventDatas() { 
		$('#myTimeline').Timeline('ruizyiPreparingTimeline');
		$('#myTimeline').Timeline('showLoader');
		globalStandardTimeOfTimeline = CURRENTDATEINOFFICIALLY;
		
		var startRange = moment(CURRENTDATEINOFFICIALLY).add(-70, 'minutes').format('YYYYMMDDHHmmss');
		var endRange = moment(CURRENTDATEINOFFICIALLY).add(90, 'minutes').format('YYYYMMDDHHmmss');
		
		
		UIRendering();
		
		const minimumRange = moment(globalBeginOfTimeline).format('YYYYMMDDHHmmss');
		const maximumRange = moment(globalEndOfTimeline).format('YYYYMMDDHHmmss'); 
		if (startRange < minimumRange) startRange = minimumRange;
		if (endRange > maximumRange) endRange = maximumRange; 
		if (globalCurrentStage == "premiere" && endRange > 20140415210400) endRange = 20140415210400;
		if (globalCurrentStage == "deuxieme" && startRange < 20140415210400) startRange = 20140415210400;
		if (globalCurrentStage == "deuxieme" && endRange > 20140416084800) endRange = 20140416084800;
		if (globalCurrentStage == "troisieme") {
			startRange = 20140416084800;
			endRange = 20140416104000;
		}
		
		
		const sideList = {};
		let sideListForReload = [];
		if (globalCurrentStage != "troisieme") {
			sideListForReload.push("issuesOnEventPosition");
		} else {
			sideListForReload = ['issuesOnEventPosition', '승객 휴대전화 촬영', '故 김00 촬영', '故 박00 촬영', '故 김00 촬영', '故 박00 촬영', '故 김00 촬영', '손00 촬영', '화물칸 차량 블랙박스 1', '화물칸 차량 블랙박스 2', '화물칸 차량 블랙박스 3', '화물칸 차량 블랙박스 4', '화물칸 차량 블랙박스 5', '화물칸 차량 블랙박스 6', '화물칸 차량 블랙박스 7', '두라에이스호 촬영', '헬기 511호 촬영', '123정 촬영', '헬기 513호 촬영', '헬기 512호 촬영', '드라곤에이스 11호 촬영', '전남 어업지도선 촬영', '제주VTS (VHF)', '진도VTS (VHF1)', '진도VTS (VHF2)', '진도VTS (VHF3)', '진도VTS (VHF4)', '진도VTS (VHF5)', '진도VTS (VHF6)', '제주운항관리실 (SSB)', '전남119', '안산119', '해경122', '해경TRS', '해경 본청 경비전화 (2042)', '해경 본청 경비전화 (2142)', '해경 본청 경비전화 (2242)', '해경 본청 경비전화 (2342)', '해경 본청 경비전화 (2442)', '해경 본청 경비전화 (2742)', '해경 본청 경비전화 (2752)', '해경 본청 경비전화 (2594)', '서해해경청 경비전화', '해경 청와대 핫라인'];
		}
		globalEventDataSection = [];
		$.each(eventDatas, function( index, value ) {
			if (startRange < value["startSimpleDateTime"] && endRange > value["endSimpleDateTime"]) { 
				sideList[value['category']] = value["typeId"]; 
				if (sideListForReload.indexOf(value["category"]) === -1 && globalCurrentStage != "troisieme") sideListForReload.push(value["category"]); 
				var tempStartDatetime = moment(value.starDateTime).add(+1, 'seconds').format('YYYY-MM-DD HH:mm:ss'); 
				globalEventDataSection.push({
					id: value.ownId,
					start: tempStartDatetime,
					end: value.endDateTime,
					row: sideListForReload.indexOf(value.category)+1,
					label: '', 
					bgColor: sideListForReload.indexOf(value.category) % 2 === 0 ? '#d1d1d1' : '#cccccc',
					color:'#fff',
					content: value
				}); 
			} 
		});  
		
		
		$('#myTimeline').Timeline('reload', {reloadCacheKeep: false }, function(elm){
			$(elm).Timeline('reload', { sidebar: { list: sideListForReload }, eventData: globalEventDataSection }); 
			$(elm).Timeline('ruizyiMoveOn'); 
			
		}); 
		
		setTimeout(() => {  
			
			let i=0;
			$.each(issuesOnEventPosition, function( key, row ) {
				
				if (startRange < key && endRange > key) { 
					$('#myTimeline').Timeline('ruizyiAddEvent', [{
						id: key,
						start: row.datetime,
						end: moment(row.datetime).add(1, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
						row: 0,
						label: '',
						content: row
					}]);
				}
			i++;});
			
		}, 0);  
	}
	
	async function asyncCallReloadEventDatas() { 
		const result = await reloadEventDatas();  
	} 
	
	
	
	function displayTime(currentFrame) {
		var fps = 30;
		var h = Math.floor(currentFrame/(60*60*fps));
		var m = (Math.floor(currentFrame/(60*fps))) % 60;
		var s = (Math.floor(currentFrame/fps)) % 60;
		var f = currentFrame % fps;
		return showTwoDigits(h) + ":" + showTwoDigits(m) + ":" + showTwoDigits(s) + ":" + showTwoDigits(f);
	}
	  
	function showTwoDigits(number) {
		return ("00" + number).slice(-2);
	}
	
	sewolfPlayer.addEventListener("frame", (evt) => 
		document.getElementById("lottiePlayCheckInFrame").innerText = evt.detail["frame"]  
	);
	sewolfPlayer.addEventListener("frame", (evt) =>
		document.getElementById("lottiePlayCheckInTime").innerText = displayTime(evt.detail["frame"])
	); 
	  
	  

	$(document).on('click', '.minioWrap .closeMark', function () {
		globalPlayers1Volume = players[1].volume;
		if (globalCurrentStatus == "PLAY") {
			players[1].pause(); 
			players[0].pause();  
		}
		$(".minioWrap").hide();
		$('.minioWrap #labelSticker').empty();  
		globalCurrentVideo2Id = "";
		setTimeout(function(){ 
			if (globalCurrentStatus == "PAUSE") {
				players[0].play();  
				players[0].volume = globalPlayers0Volume;
			}
		}, 100); 
	});

	$(document).on('click', '.jqtl-event-node', function () {
		globalPlayers0JustStarted = false;
		const _id = $(this).attr("id").replace('evt-', '');
		var type = "eventDatas";
		if ($(this).hasClass("TheIssueEventWrap")) type = "TheIssueEvent";
		
		if (type == "TheIssueEvent") {
			let eventStartTime_ = issuesOnEventPosition[_id]["datetime"]; 
			var now1 = moment(eventStartTime_); 
			var end1 = moment(start); 
			
			var duration1 = moment.duration(now1.diff(end1));
			var sseconds1 = duration1.asSeconds(); 
			players[0].pause();
			players[0].currentTime = sseconds1;
			
			var now = moment(eventStartTime_); 
			var end = moment(CURRENTDATEINOFFICIALLY); 
			
			var duration = moment.duration(now.diff(end));
			var sseconds = duration.asSeconds(); 
			
			const newPosition_ = moment(eventStartTime_).unix()*1000;  
			var positionDateTime = new Date(newPosition_);
			CURRENTDATEINOFFICIALLY = positionDateTime; 
			slider.noUiSlider.set(newPosition_); 
			slideUpdate_(newPosition_);
			
			makeSyncBetweenSliderEtPlyrOnlyData(newPosition_);
			players[0].play();   
			
			$("#issuesOnEventDateTimeWrap").removeClass().text(issuesOnEventPosition[_id]["datetime"].split(' ')[1]).addClass(_id);
			$("#issuesOnEventContentWrap").removeClass().text(issuesOnEventPosition[_id]["content"]).addClass(_id);
			
			setTimeout(function(){
				$("#issuesOnEventDateTimeWrap."+_id).text('').removeClass();
				$("#issuesOnEventContentWrap."+_id).text('').removeClass();
			}, 10000); 
		} else {
			globalCurrentTime2 = 0;
			if (globalCurrentVideo2Id == _id) { 
				return false;
			}
			globalPlayers0Volume = players[0].volume;
			globalCurrentVideo2Id = _id;
			$(".minioWrap .labelSticker").text('').hide();
			$('.minioWrap').hide();
			$(".leftWrap .swf-icons.swf-18_loading1.swf-spin").show();
			players[0].pause(); 
			var index = eventDatas.findIndex(i => i.ownId == _id); 
			
			globalCurrentVideoStartTime = eventDatas[index].starDateTime;
			
			var payload = {};
			payload["path"] = eventDatas[index].path;
			payload["filename"] = eventDatas[index].filename;
			$.ajax({
				url: '/api/timeline/video-url',
				data: JSON.stringify(payload),
				contentType: 'application/json',
				dataType: 'text',
				type: 'POST',
				success: function(data) {
					var obj = JSON.parse(data);
					if (obj.status) {    
						
						let eventStartTime_ = eventDatas[index].starDateTime;
						var now1 = moment(eventStartTime_);
						var end1 = moment(start);
						
						var duration1 = moment.duration(now1.diff(end1));
						var sseconds1 = duration1.asSeconds(); 
						players[0].pause();
						players[0].currentTime = sseconds1;
						players[0].volume = 0;
						var now = moment(eventDatas[index].starDateTime);
						var end = moment(CURRENTDATEINOFFICIALLY);
						
						var duration = moment.duration(now.diff(end));
						var sseconds = duration.asSeconds(); 
						
						const newPosition_ = eventDatas[index].startTimestamp;
						var positionDateTime = new Date(newPosition_);
						CURRENTDATEINOFFICIALLY = positionDateTime; 
						slider.noUiSlider.set(newPosition_); 
						slideUpdate_(newPosition_);
						players[0].play();
						 
						
						makeSyncBetweenSliderEtPlyrOnlyData(newPosition_);
						
						
						
						$(".leftWrap .swf-icons.swf-18_loading1.swf-spin").hide();
						if (eventDatas[index].labelStatus == "Y") $(".minioWrap .labelSticker").text(eventDatas[index].category).show(); 
						players[1].source = {
							type: 'video',
							title: 'Example title',
							sources: [{
								src: obj.presignedUrl,
								type: "video/mp4"
							}],
						};					
						
						$('.minioWrap').show();
						players[1].on('ready', function() {
							players[1].play(); 
							players[0].play(); 
							players[1].volume = globalPlayers1Volume;
						});
					} else {
						alert(obj.msg);
					}
				}
			});
		}
		
	});
	$(window).resize(function(){
		calculateHeight();
	});  
	
	$(window).scroll(function() {
		showManual();
	});
	
  	new HSHeader('#header').init()
	
 	
  	new HSMegaMenu('.js-mega-menu', {
	  	desktop: {
			position: 'left'
	  	}
		})
 	
  	new HSShowAnimation('.js-animation-link')
 	
  	HSBsValidation.init('.js-validate', {
		onSubmit: data => {
	  	data.event.preventDefault()
	  	alert('Submited')
		}
  	})
 	
  	HSBsDropdown.init()
 	
  	new HSGoTo('.js-go-to')
 	
  	var sliderThumbs = new Swiper('.js-swiper-blog-journal-hero-thumbs', {
		direction: 'vertical',
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		slidesPerView: 3,
		spaceBetween: 100,
		history: false,
		on: {
	  	'afterInit': function (swiper) {
			swiper.el.style.opacity = 1
			swiper.el.querySelectorAll('.js-swiper-pagination-progress-body-helper')
					.forEach($progress => $progress.style.transitionDuration = `${swiper.params.autoplay.delay}ms`)
	  	}
		}
  	});
	
  	var swiper = new Swiper('.js-swiper-blog-journal-hero',{
		effect: 'fade',
		autoplay: true,
		loop: true,
		pagination: {
	  	el: '.js-swiper-blog-journal-hero-pagination',
	  	clickable: true,
		},
		thumbs: {
	  	swiper: sliderThumbs
		}
  	});
	
 	
  	new HSStickyBlock('.js-sticky-block', {
		targetSelector: document.getElementById('header').classList.contains('navbar-fixed') ? '#header' : null
  	}) 
