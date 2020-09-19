var radius = 107;
var answer = [];
var flag_count = 1;
var colors = ["hsl(0, 100%,  50%)", "hsl(150, 100%,  50%)", "hsl(240, 100%,  50%)", "hsl(60, 100%,  50%)"];
var range = 180;
Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}

function color_point(integer) {
    var alpha = parseInt(integer);
    var coord = {
        x: 0 + radius * Math.sin(alpha.toRad()) + "px",
        y: 0 + radius * Math.cos(alpha.toRad()) + "px"
    };
    $("#csd-dot1").css({ "left": coord.x, "top": coord.y, "background": "hsl(" + Number(180 - alpha) + ", 100%, 50%)" });
    $("#csd-sample").css("background", "hsl(" + Number(180 - alpha) + ", 100%, 50%)");
}

function pieSlicer(val, del, id) {
    var cirfer = Number(2 * $(id).attr("r") * Math.PI)
    var pVal = (val / del) * cirfer;
    $(id).css({ "stroke-dasharray": pVal + " " + cirfer });
}
$(document).ready(function() {
    $(".question2").css("display", "none");
    $(".question1").css("display", "block");
    $("#customRange1").on("input", function() {
        range = this.value;
        color_point(range);
    });
    $(".button").click(function() {
        answer[flag_count] = range;
        flag_count++;
        if (flag_count > colors.length) {
            $(".question1").css("display", "none");
            $(".result").css("display", "block");
            flag_count = 1;
            var text_answer = "<table class='w-100 table-answer'>";
            var nums = [];
            for (var i = 1; i < answer.length; i++) {
                let item = Math.round(answer[i] / 360 * 100);
                nums.push(item);
                text_answer += "<tr><td>Вопрос №" + i + "</td><td>" + item + "%</td></tr>";
            }
            var count = nums.reduce((a, b) => (a + b)) / nums.length;
            pieSlicer(count, 100, "#svg-bac");
            $(".test-svg-result").text(count);
            text_answer += "</table>"
            $("#answ-res").html(text_answer);
        }
        $("#question").text("Вопрос " + flag_count);
        $("#anger-div").css("background", colors[flag_count - 1]);
        range = 180;
        $("#customRange1").val(range);
        $("#customRange1").trigger("input");

    });
    $(".btn-again").click(function() {
        answer = [];
        $(".question1").css("display", "block");
        $(".result").css("display", "none");
    });
});

window.onload = function() {
    color_point(range);
};
