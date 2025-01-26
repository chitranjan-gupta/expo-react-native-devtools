chrome.webRequest.onHeadersReceived.addListener(
  function(details) {
    details.responseHeaders.push({
      name: 'Access-Control-Allow-Origin',
      value: '*'
    });
    return { responseHeaders: details.responseHeaders };
  },
  { urls: ["*://*/*"] },
  ['responseHeaders']
);