// Initial download of the chrome extension will run the background script.
console.log("Running background script....");
var urlRegEx = new RegExp('^https');

// onActivated listener will look for activate tabs that the user navigates to.
chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        console.log(current_tab_info.url);
        if(urlRegEx.test(current_tab_info.url)){
            chrome.tabs.executeScript(null, {file: './foreground.js'}, () => console.log("Foreground script executed."));
        }
    });
});
