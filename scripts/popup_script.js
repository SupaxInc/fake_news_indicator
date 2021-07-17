let querying = chrome.tabs.query({active: true, currentWindow: true}); // Chrome query that grabs the active tab object for the current window
querying.then(sendHighlightedText, onError);


// runtime.connectNative
var port = chrome.runtime.connectNative("com.pysearch.bat");
// Receives the message that was sent from the python script
port.onMessage.addListener(handleMessages);
port.postMessage("hello");


// runtime.sendNativeMessage
//browser.runtime.sendNativeMessage("application_name", "hello").then(handleMessages);


$(document).ready(function () {
    $("#search_btn").on("click", function () {
        let criteriaVal = $("#criteria").val();

        // Check if the search bar is empty or not
        if (criteriaVal != "") {
            port.postMessage("hello");
            // port.postMessage({
            //     "message": "get_msg",
            //     "payload": criteriaVal
            // });
        }
    });
});




// Handles messages sent by the python script
function handleMessages(response) {
    console.log(response);
    // if(request.message ===  "get_txt") {
    //     if (chrome.runtime.lastError) {
    //         sendResponse({
    //             message: "fail"
    //         });
    //         return;
    //     }

    //     sendResponse({
    //         message: "successful",
    //         payload: getHighlightedText()
    //     });
    //     // Need to return true if using async code to keep communication line open.
    //     return true;
    // }
}


// Sends highlighted text to pop up script
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

// General error message
function onError(err) {
    console.log("Error occured on: ", err);
}


