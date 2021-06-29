copyHighlightText();

function copyHighlightText() {
    $(document).on("mouseup", function () {
        if (window.getSelection().toString() != "") {
            console.log(window.getSelection().toString());
        }
    });
}