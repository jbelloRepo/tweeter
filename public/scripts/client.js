/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Escaping function to prevent Cross-Site Scripting (XSS)
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = (tweet) => {
  const timeAgo = timeago.format(tweet.created_at);

  const $tweet = $(`
      <article class="tweet">
        <header>
          <div>
            <img src=${escape(tweet.user.avatars)} class="usericon">
            <div class="username">${escape(tweet.user.name)}</div>
          </div>
          <div class="userhandle">${escape(tweet.user.handle)}</div>
        </header>
        <p>${escape(tweet.content.text)}</p>
        <footer>
          <div class="days-ago">${timeAgo}</div>
          <div class="tweet-actions">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

  return $tweet;
};

const renderTweets = (tweets) => {
  $("#tweet-container").empty();
  for (let tweet of tweets.reverse()) {
    $("#tweet-container").append(createTweetElement(tweet));
  }
};
