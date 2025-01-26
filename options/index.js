document.addEventListener('DOMContentLoaded', async function(){
	const iframeE = document.getElementById('inlineFrameExample');
	const keyValue = await chrome.storage.local.get('key');
	if(keyValue && keyValue.key){
		const domain = keyValue.key;
		const httpUrl = `http://${domain}`;
		const jsonUrl = `${httpUrl}/json/list`;
		const debuggerUrl = `${httpUrl}/debugger-frontend/rn_fusebox.html`;
		const res = await fetch(jsonUrl, {headers: { 'Origin': 'http://localhost:8000' }});
		const json = await res.json();
		console.log(json)
		if(json.length > 0){
			const device = json[0];
			const encodedfrontendUrl = device['devtoolsFrontendUrl'];
			const newUrl = replaceUrls(encodedfrontendUrl, debuggerUrl, domain);
			iframeE.classList.remove('iframehidden');
			iframeE.src = newUrl;
			//const decodedfrontendUrl = decodeURIComponent(encodedfrontendUrl);
		}
	}
})

function replaceUrls(originalUrl, newBaseUrl, newWsUrl) {
  // Parse the original URL
  let url = new URL(originalUrl);

  // Replace the base URL
  url.href = newBaseUrl + url.search;

  // Replace the WebSocket URL using a regular expression
  let searchParams = new URLSearchParams(url.search);
  let wsParam = searchParams.get("ws");
  if (wsParam) {
    let ipRegex = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5}\b/g;
    wsParam = wsParam.replace(ipRegex, newWsUrl);
    searchParams.set("ws", wsParam);
    url.search = searchParams.toString();
  }

  return url.href;
}
