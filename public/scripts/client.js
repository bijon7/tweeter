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
//Define escape function to protect code.
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


$(document).ready(function () {

  //Creates basic individual tweet structure with display design.
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

  //Keeps adding new tweets towards to the top of the page.

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
    }
  }
  renderTweets(data);

  //Tweet submission shows error message if invalid charaters are input, otherwise, a post
  //request is sent thorough to the appropriate URL. 
  $("#tweet-form").submit(function (event) {
    const tweetText = $("#tweet-text").val();
    event.preventDefault();
    if (tweetText.length === 0) {
      $(".error-message").slideDown("fast").text("Invalid tweet length")
    } else if (tweetText.length > 140) {
      $(".error-message").slideDown("fast").text("Tweet length must be less than 140 characters")
    }
    else {
      $.post("/tweets", { text: tweetText }, (data) => {
        $(".error-message").slideUp("fast")
        loadtweets();
        //Tweet value and character count reset after every single tweet.
        $("#tweet-text").val("");
        $(".counter").text(140);
      })
    }

  });
  //ajax request sent to server to retrieve tweet data.
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
  //loadtweets();

})
