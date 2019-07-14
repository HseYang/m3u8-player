# m3u8视频播放器

已封装起来 使用起来更简单

	> 基于video-js 源地址：https://github.com/Tinywan/html5-dash-hls-rtmp


## 2019.7.14
	- 1.0.0
	- 播放m3u8的视频
	
	
### 使用：

	<head>
		<link href="video-js/video-js.css" rel="stylesheet">
		<script src="video-js/jquery-3.2.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="video-js/video.js"></script>
		<script src="video-js/videojs-contrib-hls.min.js"></script>
    </head>
    <body>
	   <live-player width="" height="" src="xx"/>
	   <script src="video-js/m3u8player.js" type="text/javascript" charset="utf-8"></script>
    </body>
   
#### 参数：
	- src : 		视频地址		默认是""(必填)
	- autoplay :    自动播放		默认是不自动播放(选填)
	- width : 	        视频宽度		默认是当前live-player的宽 如果live-player没有宽度 默认是300px(选填)
	- height:		视频高度		默认是当前live-player的高 如果live-player没有高度 默认是live-player的宽度(选填)

