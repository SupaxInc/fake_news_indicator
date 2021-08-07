// Chrome query that grabs the active tab object for the current window
let querying = chrome.tabs.query({active: true, currentWindow: true}); 
querying.then(sendHighlightedText, onError);

// Open the port to python app
var port = chrome.runtime.connectNative("com.pysearch.bat");
// Listener that checks if extension has received the message that was sent from the python script
port.onMessage.addListener(handleMessages);


$(document).ready(function () {

    // User pressing the search button
    $("#search_btn").on("click", function () {
        let criteriaVal = $("#criteria").val();

        // Check if the search bar is NOT empty or has white spaces
        if (!isEmptyOrSpaces(criteriaVal)) {
            port.postMessage("hello");
        }
    });
});

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}



// Handles messages sent by the python script
function handleMessages(response) {
    console.log(response);
}


// Sends highlighted text to pop up script
function sendHighlightedText(tabs) {
    // Send message to the content script
    chrome.tabs.sendMessage(tabs[0].id, {
        message: "get_txt"
    }, response => {
        // Check if the response from pop up script is "successfull"
        if (response.message === "successful") {
            $("#criteria").val(response.payload);
        }
    });
}

// General error message
function onError(err) {
    console.log("Error occured on: ", err);
}


