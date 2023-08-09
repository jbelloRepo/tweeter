$(document).ready(function () {
  // Protect against Cross-Site Scripting
  function safeText (text) {
    const element = document.createElement("div");
    element.appendChild(document.createTextNode(text));
    return element.innerHTML;
  }

  // Generate tweet's HTML based on data
  function generateTweetHTML (data) {
    const timestamp = timeago.format(data.created_at);

    return $(`
            <article class="tweet">
                <header>
                    <div>
                        <img src=${safeText(
                          data.user.avatars
                        )} class="usericon">
                        <div class="username">${safeText(data.user.name)}</div>
                    </div>
                    <div class="userhandle">${safeText(data.user.handle)}</div>
                </header>
                <p>${safeText(data.content.text)}</p>
                <footer>
                    <div class="days-ago">${timestamp}</div>
                    <div class="tweet-actions">
                        <i class="fa-solid fa-flag"></i>
                        <i class="fa-solid fa-retweet"></i>
                        <i class="fa-solid fa-heart"></i>
                    </div>
                </footer>
            </article>
        `);
  }

  // Render all tweets to the DOM
  function populateTweets (tweets) {
    const $tweetSection = $("#tweet-section");
    $tweetSection.empty();

    for (const tweet of tweets.reverse()) {
      $tweetSection.append(generateTweetHTML(tweet));
    }
  }

  // Display error messages to the user
  function showErrorNotification (action, message) {
    const notification = `
            <div id="error-message">
                <i class="fa-solid fa-circle-exclamation"></i>
                <p><b>Error: </b>${message}</p>
            </div>
        `;

    if (action === "display") {
      $("#error-message").remove();
      $("#new-tweet").prepend(notification);
      $("#error-message").hide().slideDown();
    } else {
      $("#error-message").slideUp();
    }
  }

  // Handle form submission
  // Handle form submission
  // Handle form submission
  function processFormSubmission () {
    $("main > #new-tweet > form").submit(function (event) {
      event.preventDefault();

      const tweetText = $("#tweet-text").val().trim();

      if (!tweetText.length) {
        showErrorNotification(
          "display",
          "Please write something before tweeting!"
        );
      } else if (tweetText.length > 140) {
        showErrorNotification(
          "display",
          "Your tweet is too long! Keep it under 140 characters."
        );
      } else {
        const serializedData = $(this).serialize();
        $.post("/tweets", serializedData, function () {
          loadTweets();
          showErrorNotification("hide");
        });
      }

      // Reset textarea and counter for all conditions
      $("#tweet-text").val("");
      $("#char-counter").text("140");
      // Trigger input event on textarea to update the counter visually
      $("#tweet-text").trigger("input");
    });
  }

  // Load all tweets
  function loadTweets () {
    $.ajax("/tweets", { method: "GET" }).done(function (data) {
      populateTweets(data);
    });
  }

  // Initialize the application
  loadTweets();
  processFormSubmission();
});
