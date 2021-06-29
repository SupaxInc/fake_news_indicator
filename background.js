// Runs on service worker, separate thread. 
// Service workers need to be on the root folder where manifest.json is
// In a certain amount of time of not being used, the background script deactivates.
// To save the state of a service worker and keep it persistent it must be saved on a local storage.
// NOTE: Service workers cannot run jquery
console.log("Running background script....");

// Create default state of extension
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        search_value: "Please copy something on the web page...."
    });
});

// Grab saved object from storage
// chrome.storage.local.get('search_value', data => {
//     let search_value = data;
// });

// Runs on refresh or new window
chrome.tabs.onUpdated.addListener((currentTabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && /^http/.test(tab.url)) {
        chrome.scripting.executeScript({
            target: { tabId: currentTabId },
            files: ["./scripts/foreground.js"]
        }).then((res) => {
            console.log("Foreground script activated successfully.");
        }).catch((err) => {
            console.log("Error: ", err);
        });
    }
});





