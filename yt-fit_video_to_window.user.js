// ==UserScript==
// @name           YouTube Fit Video to Window
// @namespace      http://github.com/uky/greasemonkey
// @downloadURL    https://github.com/uky/greasemonkey/raw/release/yt-fit_video_to_window.user.js
// @description    Enlarges video to the browser's window size.
// @version        0.1.2
// @author         Uky
// @match          http*://www.youtube.com/watch?*
// @grant          GM_addStyle
// ==/UserScript==

// [ Constants ]
var header_ID = 'watch-headline-user-info';
var player_ID = 'watch-player';
var video_ID = 'watch-video';
var extra_ID = 'watch-video-extra';

// [ Derived Values ]
var header_height = $(header_ID).offsetHeight;

// [ Helper Functions ]
function $(A) { return document.getElementById(A); }

// [ Main Script ]

// Force wide mode so the sidebar doesn't get in the way of the video.
var A = $('page');
if (A.className.indexOf('watch-wide') == -1)
	A.className += ' watch-wide';

var B = $(video_ID);
if (B.className.indexOf('medium') == -1)
	B.className += ' medium';

GM_addStyle('#watch-sidebar { margin-top: 5px !important; }');

// Prevent centering with auto margins.
GM_addStyle('#watch-video, #watch-player { margin: 0 !important; }');

// Remove extra info at bottom of video for more room
GM_addStyle('#' + extra_ID + ' { display: none; }');

// Resize the video to fit the browser window.
function fitToWindow() {
	var player=$(player_ID);
	var video=$(video_ID);
	video.style.width = document.body.offsetWidth + 'px';
	player.style.width = document.body.offsetWidth + 'px';
	player.style.height = (document.body.offsetHeight - header_height - 5) + 'px';
}
window.addEventListener('resize', fitToWindow, false);
fitToWindow();

// Scroll past the masthead.
$(player_ID).scrollIntoView(true);
