// ==UserScript==
// @name          YouTube HTML5 Video Maximizer
// @namespace     http://github.com/uky/greasemonkey
// @description   Stretches the video to fit the size of the browser window.
// @version       0.1.1
// @author        Uky
// @match         http://www.youtube.com/watch?*
// ==/UserScript==


// [ Constants ]
var base_ID = 'baseDiv';
var header_ID = 'watch-vid-title';
var player_ID = 'video-player';
var container_class = 'video-content';
var video_class = 'video-stream';
var controls_class = 'video-controls';


// Get elements:
var base = document.getElementById(base_ID);
var header = document.getElementById(header_ID);
var player = document.getElementById(player_ID);
var container = player.getElementsByClassName(container_class)[0];
var video = null;
var controls = player.getElementsByClassName(controls_class)[0];

var header_height = header.offsetHeight;
var controls_height = controls.offsetHeight;


// Wait for <video> to be inserted before acting:
function get_video(event) {
	if (event.target.className != video_class)
		return;

	video = event.target;
	resize();	
}
document.addEventListener('DOMNodeInserted', get_video, false);


// Resize video player to fit window:
function resize() {
	if (!video)
		return;

	var win_height = document.body.offsetHeight;
	var win_width = document.body.offsetWidth;
	
	var player_width = win_width + "px";
	var player_height = (win_height - header_height) + "px";
	var video_height = (win_height - header_height - controls_height) + "px";


	base.style.marginLeft = 0;
	base.style.paddingLeft = 0;
	
	head.scrollIntoView(true);
	
	player.style.width = player_width;
	player.style.height = player_height

	container.style.width = player_width;
	container.style.height = video_height;

	controls.style.width = player_width;
	
	video.style.width = player_width;
	video.style.height = video_height;
}
window.addEventListener('resize', resize, false);

