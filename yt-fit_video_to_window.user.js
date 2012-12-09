// ==UserScript==
// @name           YouTube Fit Video to Window
// @namespace      http://github.com/uky/greasemonkey
// @author         Uky
// @description    Enlarges video to the browser's window size.
// @version        0.1.3
// @updateURL      https://github.com/uky/greasemonkey/raw/release/yt-fit_video_to_window.meta.js
// @downloadURL    https://github.com/uky/greasemonkey/raw/release/yt-fit_video_to_window.user.js
// @grant          none
// @include        http://www.youtube.com/watch?*
// @include        https://www.youtube.com/watch?*
// ==/UserScript==


// [ Constants ]
var header_ID = 'watch7-headline';
var player_ID = 'watch7-player';
var video_ID = 'watch7-video';


// [ Derived Values ]
var header_height = 0;
var header = document.getElementById(header_ID);
if (header != null)
	header_height = header.offsetHeight;


// [ Main Script ]

// Remove guide for extra horizontal viewing area.
var body = document.getElementsByTagName('body')[0];
if (body != null) {
	if (body.classList.contains('guide-enabled'))
		body.classList.remove('guide-enabled');
	if (body.classList.contains('guide-expanded')) {
		body.classList.remove('guide-expanded');
		body.classList.add('guide-collapsed');
	}
}
var video_container = document.getElementById('watch7-video-container');
if (video_container != null)
	video_container.style.paddingLeft = 0;


// Force wide mode so the sidebar doesn't get in the way of the video.
var container = document.getElementById('watch7-container');
var wide_class = 'watch-wide';
if (container != null && !container.classList.contains(wide_class))
	container.classList.add(wide_class);


// Resize the video to fit the browser window.
function fitToWindow() {
	var player = document.getElementById(player_ID);
	var video = document.getElementById(video_ID);
	if (video != null)
		video.style.width = document.body.offsetWidth + 'px';
	if (player != null) {
		player.style.width = document.body.offsetWidth + 'px';
		player.style.height = (document.body.offsetHeight - header_height - 5) + 'px';
	}
}
window.addEventListener('resize', fitToWindow, false);
fitToWindow();


// Scroll past the masthead.
var player = document.getElementById(player_ID);
if (player != null)
	player.scrollIntoView(true);
