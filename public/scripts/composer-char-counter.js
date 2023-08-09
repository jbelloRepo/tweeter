$(document).ready(function () {
  // Initialize the tweet-text input event listener
  $("#tweet-text").on("input", function () {
    const textLength = $(this).val().length;
    const remainingChars = 140 - textLength; // Calculate remaining characters
    console.log(textLength);
    const counterElement = $("#char-counter");
    counterElement.text(remainingChars); // Update the displayed counter

    // Adjust the styling based on the remaining character count
    if (remainingChars < 0) {
      counterElement.addClass("over-limit");
    } else {
      counterElement.removeClass("over-limit");
    }
  });
});
