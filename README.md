# m3u8视频播放器

已封装起来 使用起来更简单 下面是使用方法

### 使用： 

	<head>
		<link href="video-js/video-js.css" rel="stylesheet">
		<script src="video-js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="video-js/video.js"></script>
		<script src="video-js/videojs-contrib-hls.min.js"></script>
		<script src="video-js/m3u8player.js" type="text/javascript" charset="utf-8"></script>
    </head>
    <body>
		<live-player width="" height="" src="xx"></live-player>
		<script type="text/javascript">
			// 如果是管理后台批量查看视频 可调用initAllPlayer()方法 初始化页面所有的live-player
			
			// initAllPlayer()
			
			// 如果只是单一的创建一个视频 并且想操作视频 可看下面 #方法# 介绍 然后使用
		</script>

    </body>
   
#### 参数：

	- src :	视频地址	 默认是""(必填)
	
	- width : 视频宽度 默认是当前live-player的宽 如果live-player没有宽度 默认是300px(选填)
	
	- height: 视频高度 默认是当前live-player的高 如果live-player没有高度 默认是live-player的宽度(选填)
	
	- autoplay : 自动播放 默认是不自动播放(选填)
	

#### 方法：

	- var player = new livePlayer($("live-player")) // 初始化创建播放器
	
	- player.play()	// 播放
	
	- player.pause()	// 暂停
	
	- player.start()	// 如果没有暂停就播放
	
	- player.stop()	// 停止播放 并且当前播放时间设置为0
	
	- player.release()	// 销毁播放器
	
	- player.setVolume(volume)	// 设置音量(0 ~ 1) 例如：player.setVolume(0.5)
	
	- player.getVolume()	// 获取当前音量
	
	- player.setMute(status)	// 静音(true/false) 不填写 默认静音或不静音
	
	- player.setCurrentTime(time)	// 设置当前播放时间(秒) 
	
	- player.getCurrentTime()	// 获取当前播放的时间
	
	- player.getDuration()	// 获取视频总时长
	

## 2019.8.19
	- 1.1.0
	- 播放器增加播放、暂停、停止、销毁、设置音量、获取当前音量、静音、设置当前播放时间、获取当前播放时间、获取播放视频总时长 方法调用

## 2019.7.14
	- 1.0.0
	- 播放m3u8的视频

基于video-js 源地址：https://github.com/Tinywan/html5-dash-hls-rtmp
