/*
 * -- m3u8Player --
 * 
 * usage :
 * 
 * <head>
		<link href="video-js/video-js.css" rel="stylesheet">
		<script src="video-js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="video-js/video.js"></script>
		<script src="video-js/videojs-contrib-hls.min.js"></script>
   </head>
   <body>
	   <live-player width="" height="" src="xx"/>
	   <script src="video-js/m3u8player.js" type="text/javascript" charset="utf-8"></script>
   </body>
 * 
 * options: 
 * 	src : 		视频地址		默认是""(必填)
 * 	autoplay :  自动播放		默认是不自动播放(选填)
 *  width : 	视频宽度		默认是当前live-player的宽 如果live-player没有宽度 默认是300px(选填)
 *  height:		视频高度		默认是当前live-player的高 如果live-player没有高度 默认是live-player的宽度(选填)
 * 
 * */

var initAllPlayer = function(){
	$(function() {
		$("live-player").each(function() {
			var that = $(this)
			setTimeout(function() {
				new livePlayer(that)
			}, 0)
		});
	})
}

var livePlayer = function(ele) {
	this.init(ele)
}

livePlayer.prototype = {
	// 初始化数据
	init: function(ele) {
		// 当前live-player元素
		this.ele = ""
		// 当前播放地址
		this.src = ""
		// 宽度
		this.width = 0
		// 高度
		this.height = 0
		// 当前播放器
		this.players = ""
		// 是否自动播放
		this.autoplay = false
		// 创建player传递的参数
		this.options = {}
		// 获取当前时间
		this.curDate = new Date()
		// 获取当前的时间戳 方便给player命名唯一的标识
		this.time = this.curDate.getTime()
		// player的名字
		this.playerName = "liveplayer" + this.time

		// 如果当前ele存在 则继续创建
		if(ele && ele.length >= 1) {
			this.changeBlock(ele)
			this.initData(ele)
		} else {
			// 如果当前ele不存在 则报错
			console.error(ele + "元素不存在")
		}
	},
	// 初始化player所有的数据
	initData: function(ele) {
		// 赋值保存当前元素
		this.ele = ele
		// 赋值保存当前src
		this.src = ele.attr("src") || ""
		// 赋值保存当前autoplay
		this.autoplay = ele.attr("autoplay") ? true : false
		// 赋值保存当前width
		this.width = ele.attr("width") || ele.width() || 300
		// 赋值保存当前height
		this.height = ele.attr("height") || this.width
		// 赋值保存当前options
		this.options = {
			"width": this.width,
			"height": this.height
		}

		// 判断是否是.m3u8结尾的地址
		if(this.isM3u8Url()) {
			this.createVideo()
		} else {
			// 如果不是.m3u8结尾的地址 则输入html
			this.ele.html("当前视频地址不支持播放：" + this.src)
		}
	},
	// 创建video标签
	createVideo: function() {
		// 创建video元素
		var videoEle = '<video id="' + this.playerName + '" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-playsinline="true" webkit-playsinline="true" playsInline="true" x-webkit-airplay="allow" webkit-playsinline="true" playsinline="true"><source src="' + this.src + '" type="application/x-mpegURL"></video>'
		// 清空当前ele内所有的子元素
		this.ele.empty().append(videoEle)

		// 创建players 并赋值players
		this.players = videojs(this.playerName, this.options);
		if(this.players) {
			this.initListener()
			// 如果有autoplay属性 则自动播放
			if(this.autoplay) {
				this.play()
			}
		}
	},
	// 播放
	play: function(){
		if(this.players){
			console.log(this.players.play)
			this.players.play()
		} else {
			console.warn("play error")	
		}
	},
	// 暂停
	pause: function(){
		if(this.players){
			this.players.pause()
		} else {
			console.warn("pause error")	
		}
	},
	// 播放或暂停
	start: function(){
		if(this.players){
			if(this.players.paused()){
				this.play()
			} else {
				this.pause()
			}
		} else {
			console.warn("start error")	
		}
	},
	// 停止播放 并且重置
	stop: function(){
		if(this.players){
			this.pause()
			this.setCurrentTime(0)
		} else {
			console.warn("stop error")	
		}
	},
	// 释放video
	release : function(){
		if(this.players){
			this.players.reset()
			this.ele.remove()
		} else {
			console.warn("release error")	
		}
	},
	// 设置音量
	setVolume: function(volume){
		if(this.players){
			if(volume >= 0 && volume <= 1){
				this.players.volume(volume)
			}else{
				console.warn("setVolume error => volume : ", volume)
			}
		} else {
			console.warn("setVolume error")	
		}
	},
	// 获取当前音量
	getVolume: function(){
		if(this.players){
			return this.players.volume()
		} else {
			console.warn("getVolume error")	
		}
	},
	// 静音或不静音
	setMute: function(status){
		if(this.players){
			if(status === true || status == false){
				this.players.muted(status)
			} else {
				this.players.muted(!this.players.muted())
			}
		} else {
			console.warn("setMute error")	
		}
	},
	// 设置当前播放时间
	setCurrentTime: function(time){
		if(this.players){
			if(time && time >= 1){
				this.players.currentTime(time)
			} else {
				console.warn("setCurrentTime error => time : ", time)
			}
		} else {
			console.warn("setCurrentTime error")	
		}
	},
	// 获取当前播放时间
	getCurrentTime: function(){
		if(this.players){
			return this.players.currentTime()
		} else {
			console.warn("getCurrentTime error")	
		}
	},
	// 获取总时长
	getDuration: function(){
		if(this.players){
			return this.players.duration()
		} else {
			console.warn("getDuration error")	
		}
	},
	// 初始化player各种监听事件
	initListener: function() {
		var that = this
		this.players.on(['loadstart', 'play', 'playing', 'firstplay', 'pause', 'ended', 'adplay', 'adplaying', 'adfirstplay', 'adpause', 'adended', 'contentplay', 'contentplaying', 'contentfirstplay', 'contentpause', 'contentended', 'contentupdate'], function(e) {
			console.warn(that.playerName + ' event: ', e.type);
		});
	},
	// 是否是m3u8的地址
	isM3u8Url: function() {
		return this.src.indexOf(".m3u8") >= 0
	},
	// 把元素变为块级元素
	changeBlock: function(changeEle) {
		// 如果改变的ele存在 在修改为块级元素
		if(changeEle && changeEle.length >= 1) {
			changeEle.css({
				"display": "block"
			})
		}
	}
}