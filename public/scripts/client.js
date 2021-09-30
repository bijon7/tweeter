/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


$(document).ready(function () {


  function createTweetElement(tweet) {
    return `
    <article class="tweet">
    <div class="container-header">
      <div class="leftside">
        <img src=${tweet.user.avatars} />
        <p>${tweet.user.name}</p>
      </div>

      <div>${tweet.user.handle}</div>
    </div>
    <div class="content">
      <p>${escape(tweet.content.text)}</p>
    </div>

    <footer class="container-footer">
      <p>${timeago.format(tweet.created_at)}</p>
      <div class="container-symbols">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
    `


  }



  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    }
  }
  renderTweets(data);

  $("#tweet-form").submit(function (event) {
    const tweetText = $("#tweet-text").val();
    event.preventDefault();
    if (tweetText.length === 0 || tweetText.length > 140) {
      alert("invalid input")
    } else {

      $.post("/tweets", { text: tweetText }, (data) => {
        console.log(data);
        loadtweets();
        $("#tweet-text").val("");
        $(".counter").text(140);
      })
    }

  });

  const loadtweets = function () {
    $.ajax(
      {
        url: "/tweets",
        method: "get",
        dataType: "json",
        success: (tweets) => {
          renderTweets(tweets)
        }
      }
    )
  }
  loadtweets();

})
