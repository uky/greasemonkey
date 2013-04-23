// ==UserScript==
// @name        YouTube Earth Day 365
// @namespace   uky.github.com
// @author      Uky
// @description Penguins~!  :D
// @include     http://www.youtube.com/*
// @include     https://www.youtube.com/*
// @version     2013.04.23.11.06
// @updateURL   https://github.com/uky/greasemonkey/raw/master/yt-earth_day_365.meta.js
// @downloadURL https://github.com/uky/greasemonkey/raw/master/yt-earth_day_365.user.js
// @grant       none
// ==/UserScript==

// YouTube's current standard logo
var standard = "//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif";

// YouTube's 2013 Earth Day logo
var penguins = "//s.ytimg.com/yts/img/doodles/yt_doodle_earth_day_2013-vflxB0KDc.png";

// Don't automatically change updated logos
var logo = document.getElementById("logo");
if (logo.src.indexOf(standard) != -1) {
	logo.src = penguins;
	logo.style.width = "auto";
}
