let querying = chrome.tabs.query({active: true, currentWindow: true});
querying.then(sendHighlightedText, onError);

function sendHighlightedText(tabs) {
    console.log(tabs[0].id);
    chrome.tabs.sendMessage(tabs[0].id, {
        message: "get_txt"
    }, response => {
        if (response.message === "successful") {
            $("#criteria").val(response.payload);
        }
    });
}

function onError(err) {
    console.log("Could not query active tab!");
    console.log(err);
}


