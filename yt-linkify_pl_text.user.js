// ==UserScript==
// @name          YouTube Channel Playlist Linkifier
// @namespace     http://github.com/uky/greasemonkey
// @description   Changes the currently visible plain text playlist name to link to the old classic playlist page when you click on the page.
// @version       0.1
// @author        Uky
// @include       http://www.youtube.com/*
// @exclude       http://www.youtube.com/watch?*
// ==/UserScript==

// A nice wrapper for XPATH queries. Defaults to document root node.
function xpath(query, node) {
	return document.evaluate(query,
			typeof(node) !== 'undefined' ? node : document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
}

// Check if we're on a user channel.
var channel_check = xpath("//style[@id='channel-theme-css']");
if (channel_check.snapshotLength == 0)
	GM_log('not on user channel. exiting.');
	return;
GM_log('on a user channel. running...');
	
function linkify() {
	var title_nodes = xpath("//div[@class='playnav-playlist-header']/div[@class='title']");
	for (var i = 0; i < title_nodes.snapshotLength; i++) {
		var node = title_nodes.snapshotItem(i);
		var playlist_id = node.getAttribute('id').match('playnav-playlist-([0-9A-F]+)-title')[1];
		var playlist_name = xpath(".//text()", node).snapshotItem(0).nodeValue;
		//GM_log('linkifying playlist ' + playlist_name + '(' + playlist_id + ')');
		node.innerHTML = "<a href='http://www.youtube.com/view_play_list?p=" + playlist_id + "'>" + playlist_name + "</a>";
	}
}

document.addEventListener('click', linkify, true );

// Ideally the script would automatically linkify as the page is
// altered but I'm not sure of a good way to do that...
// This simple way runs very slowly:
//document.addEventListener('DOMNodeInserted', linkify, true );
//document.addEventListener('DOMAttrModified', linkify, true );
