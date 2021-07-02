
chrome.runtime.onMessage.addListener(handleMessages);


function handleMessages(request, sender, sendResponse) {
    if(request.message ===  "get_txt") {
        if (chrome.runtime.lastError) {
            sendResponse({
                message: "fail"
            });
            return;
        }

        sendResponse({
            message: "successful",
            payload: getHighlightedText()
        });
        // Need to return true if using async code to keep communication line open.
        return true;
    }
}

// Saves the highlighted text on the page
function getHighlightedText() {
    var highlightedTxt = window.getSelection().toString();
    if(highlightedTxt != "") {
        return highlightedTxt;
    } else {
        highlightedTxt = "";
        return highlightedTxt;
    }
}

// function copyHighlightText() {
//     var highlightedTxt = ""
//     $(document).on("mouseup", function () {
//         if (window.getSelection().toString() != "") {
//             highlightedTxt = window.getSelection().toString();
//             console.log(highlightedTxt);
//         }
//     });
// }