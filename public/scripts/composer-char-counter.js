$(document).ready(function () {
  console.log("working")
  $(".new-tweet textarea").on("input", function () {
    const textLength = $(this).val().length
    const remainingChars = 140 - textLength
    const counterElement = $(this).closest(".new-tweet").find(".counter")
    counterElement.text(remainingChars)

    if (remainingChars < 0) {
      counterElement.addClass("over-limit")
    } else {
      counterElement.removeClass("over-limit")
    }
  })
})
