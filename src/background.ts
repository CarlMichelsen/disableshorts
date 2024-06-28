// Background script for handling URL checking and content script injection.
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        const url = new URL(tab.url);
        if (url.hostname === 'www.youtube.com' && url.pathname === '/shorts') {
            browser.tabs.executeScript(tabId, { file: 'content_script.js' });
        }
    }
});