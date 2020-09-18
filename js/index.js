$(document).ready(function() {
    $(".grid-answer").click(function() {
        if ($(this).hasClass("bg-green")) {
            $(this).removeClass("bg-green");
        } else {
            $(this).addClass("bg-green");
        }
    });
});