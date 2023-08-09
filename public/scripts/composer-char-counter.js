$(document).ready(function () {
  console.log("working");
  $("#tweet-text").on("input", function () {
    const textLength = $(this).val().length;
    console.log("working 2");
    console.log(textLength);
    const remainingChars = 140 - textLength;
    const counterElement = $("#char-counter");
    counterElement.text(remainingChars);

    if (remainingChars < 0) {
      counterElement.addClass("over-limit");
    } else {
      counterElement.removeClass("over-limit");
    }
  });
});
