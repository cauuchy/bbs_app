let settings = null;

function sendMessage(type, data, tabId = null) {
	chrome.runtime.sendMessage({ type, data });
	if (tabId) {
		chrome.tabs.sendMessage(tabId, { type, data });
	} else {
		chrome.tabs.query(
			{
				active: true,
				currentWindow: true
			},
			tabs => {
				tabs.forEach(tab => {
					chrome.tabs.sendMessage(tab.id, { type, data });
				});
			}
		);
	}
}

function onGotSettings() {
	$('#anchor').bootstrapToggle(settings.anchor ? 'on' : 'off');
	$('#counter').bootstrapToggle(settings.counter ? 'on' : 'off');
	$('#say_moon').val(settings.moon);
	$('#bytes_moon').val(settings.moon_bytes);
	$('#lines_moon').val(settings.moon_lines);
	$('#output_moon').val(settings.moon_lines);
	$('#say_melon').val(settings.melon);
	//$('#bytes_melon').val(settings.melon_bytes);
	//$('#lines_melon').val(settings.melon_lines);
	//$('#output_melon').val(settings.melon_lines);

	if (settings.moon === 'jiyu') {
		$('#free_settings').css('display', 'inline');
	}
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch (request.type) {
		case 'GOT_SETTINGS':
			settings = request.data;
			onGotSettings();
			break;
	}
});

function Output_moon(e) {
	document.getElementById("output_moon").value = this.value;
}

function Output_melon(e) {
	document.getElementById("output_melon").value = this.value;
}


document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#lines_moon').addEventListener('input', Output_moon);
	//document.querySelector('#lines_melon').addEventListener('input', Output_melon);
});

$(document).ready(() => {

	$('#say_moon').change(function(){
		var val = $('option:selected').val();
		if(val === 'jiyu'){
			$('#free_settings').slideDown(200);
		} else {
			$('#free_settings').slideUp(200);
		}
	});

	document.getElementById('anchor').onchange = onAnchorChange;
	document.getElementById('counter').onchange = onCounterChange;

	document.getElementById('say_moon').onchange = moon;
	document.getElementById('say_melon').onchange = melon;

	document.getElementById('lines_moon').oninput = LinesChange_moon;
	//document.getElementById('lines_melon').oninput = LinesChange_melon;
	document.getElementById('bytes_moon').oninput = BytesChange_moon;
	//document.getElementById('bytes_melon').oninput = BytesChange_melon;

	sendMessage('GET_SETTINGS');
});

function onAnchorChange() {
	settings.anchor = $('#anchor').prop('checked');
	sendMessage('UPDATE_SETTINGS', settings);
}

function onCounterChange() {
	settings.counter = $('#counter').prop('checked');
	sendMessage('UPDATE_SETTINGS', settings);
}

function moon() {
	settings.moon = this.value;
	sendMessage('UPDATE_SETTINGS', settings);
}

function melon() {
	settings.melon = this.value;
	sendMessage('UPDATE_SETTINGS', settings);
}

function LinesChange_moon() {
	settings.moon_lines = this.value;
	sendMessage('UPDATE_SETTINGS', settings);
}

function LinesChange_melon() {
	settings.melon_lines = this.value;
	sendMessage('UPDATE_SETTINGS', settings);
}

function BytesChange_moon() {
	settings.moon_bytes = this.value;
	sendMessage('UPDATE_SETTINGS', settings);
}

function BytesChange_melon() {
	settings.melon_bytes = this.value;
	sendMessage('UPDATE_SETTINGS', settings);
}