// ==UserScript==
// @name           YouTube Fit Video to Window
// @namespace      http://github.com/uky/greasemonkey
// @description    Enlarges video to the browser's window size.
// @version        0.1.1
// @author         Uky
// @include        http://www.youtube.com/watch?*
// ==/UserScript==

// [ Constants ]
//var header_ID = 'watch-headline';
var header_ID = 'watch-headline-user-info';
var player_ID = 'watch-player';
var video_ID = 'watch-video';

// [ Derived Values ]
var header_height = $(header_ID).offsetHeight;

// [ Helper Functions ]
function $(A) { return document.getElementById(A); }

// [ Main Script ]

// Force wide mode so the sidebar doesn't get in the way of the video.
var A = $('baseDiv');
if (A.className.indexOf('watch-wide-mode') == -1)
	A.className += ' watch-wide-mode';

var B = $(video_ID);
if (B.className.indexOf('wide') == -1)
	B.className += ' wide';

GM_addStyle('#watch-sidebar { margin-top: 5px !important; }');

// Prevent centering with auto margins.
GM_addStyle('#watch-video, #watch-player { margin: 0 !important; }');

// Resize the video to fit the browser window.
function fitToWindow() {
	var player=$(player_ID);
	player.style.width = document.body.offsetWidth + 'px';
	player.style.height = (document.body.offsetHeight - header_height - 5) + 'px';
}
window.addEventListener('resize', fitToWindow, false);
fitToWindow();

// Scroll past the masthead.
$(header_ID).scrollIntoView(true);
