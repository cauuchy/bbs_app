
let settings = {
	anchor: true,
	counter: true,
	moon: 'monogatari',
	moon_bytes: 750,
	moon_lines: 10,
	melon: 'monogatari',
	//melon_bytes: 1000,
	//melon_lines: 20
};

if (!localStorage.getItem('visited')) {
	window.open('http://www.moonpupa.jp/wolf/sow/sow.cgi', '_blank');
	localStorage.setItem('visited', true);
}

function Init(){
	settings.anchor = true;
	settings.counter = true;
	settings.moon = 'monogatari';
	settings.moon_bytes = 750;
	settings.moon_lines = 10;
	settings.melon = 'monogatari';
}

function sendMessage(type, data, tabId = null) {
	chrome.runtime.sendMessage({ type, data });
	if (tabId) {
		chrome.tabs.sendMessage(tabId, { type, data });
	} else {
		chrome.tabs.query(
			{
				active: true
			},
			tabs => {
				tabs.forEach(tab => {
					chrome.tabs.sendMessage(tab.id, { type, data });
				});
			}
		);
	}
}

function saveSettings() {
	//localStorage.setItem('anchor', settings.anchor);
	//localStorage.setItem('counter', settings.counter);
	localStorage.setItem('moon', settings.moon);
	localStorage.setItem('moon_bytes', settings.moon_bytes);
	localStorage.setItem('moon_lines', settings.moon_lines);
	localStorage.setItem('melon', settings.melon);
	console.log(settings); 
	//localStorage.setItem('melon_bytes', settings.melon_bytes);
	//localStorage.setItem('melon_lines', settings.melon_lines);
}

function loadSettings() {
	//settings.anchor = localStorage.getItem('anchor');
	//settings.counter = localStorage.getItem('counter');
	settings.moon = localStorage.getItem('moon');
	settings.moon_bytes = localStorage.getItem('moon_bytes');
	settings.moon_lines = localStorage.getItem('moon_lines');
	settings.melon = localStorage.getItem('melon');
	//settings.melon_bytes = localStorage.getItem('melon_bytes');
	//settings.melon_lines = localStorage.getItem('melon_lines');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch (request.type) {
		case 'HELLO':
			loadSettings();
			if (!settings.moon) { Init(); saveSettings(); loadSettings(); }
			sendMessage('THANKS', settings);
			break;
		case 'GET_SETTINGS':
			loadSettings();
			sendMessage('GOT_SETTINGS', settings);
			break;
		case 'UPDATE_SETTINGS':
			settings = request.data;
			saveSettings();
			break;
	}
});