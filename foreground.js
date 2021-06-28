// Foreground script needs to get injected from the background script.
console.log("Running foreground script....")

$(document).ready(function() {
    console.log("document ready");
    $(document).on("mouseup", function() {
        if (window.getSelection().toString() != "") { 
            console.log("text highlighted :" + window.getSelection().toString());
        }
    });
});