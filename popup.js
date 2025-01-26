// In popup.js, when the user clicks the button, open a file in an incognito tab
document.addEventListener('DOMContentLoaded', function(){
	const btn = document.getElementById('open-file-btn');
	const open_incognito = document.getElementById('open_incognito');
	const url = document.getElementById('url');
	btn.addEventListener('click', async function() {
		let value = url.value;
		if(value.indexOf('?url=') !== -1){
			value = getParameterValue(value, 'url');
		}
		const decodedValue = decodeURIComponent(value);
		const urlWithoutProtocol = removeProtocol(decodedValue);

		await chrome.storage.local.set({ key: urlWithoutProtocol });
		
		const fileUrl = chrome.runtime.getURL('/options/index.html');

		if(open_incognito.checked){
			chrome.windows.create({
				url: fileUrl,
				incognito: true
			}, function(window) {
				console.log('In incognito mode in a new window:', window);
			});			
		}else if (chrome.runtime.openOptionsPage) {
		   chrome.runtime.openOptionsPage();
		} else {
		   window.open(fileUrl);
		}
	});
});

function getParameterValue(url, paramName) {
  const urlParams = new URLSearchParams(url.split('?')[1]);
  return urlParams.get(paramName);
}

function removeProtocol(url) {
  return url.replace(/^https?:\/\//, '').replace(/^exp:\/\//, '');
}