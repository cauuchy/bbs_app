let settings = {
	moon: 'monogatari',
	moon_bytes: 750,
	moon_lines: 10,
	melon: 'monogatari',
	//melon_bytes: 1000,
	//melon_lines: 20
};

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
	localStorage.setItem('moon', settings.moon);
	localStorage.setItem('moon_bytes', settings.moon_bytes);
	localStorage.setItem('moon_lines', settings.moon_lines);
	localStorage.setItem('melon', settings.melon);
	//localStorage.setItem('melon_bytes', settings.melon_bytes);
	//localStorage.setItem('melon_lines', settings.melon_lines);
}

function loadSettings() {
	settings.moon = localStorage.getItem('moon');
	settings.moon_bytes = localStorage.getItem('moon_bytes');
	settings.moon_lines = localStorage.getItem('moon_lines');
	settings.melon = localStorage.getItem('melon');
	//settings.melon_bytes = localStorage.getItem('melon_bytes');
	//settings.melon_lines = localStorage.getItem('melon_lines');
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	switch (request.type) {
		case 'HELLO':
			loadSettings();
			if(!settings) { saveSettings(); loadSettings(); }
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