$(document).ready(function () {
  // --- our code goes here ---
  $('#tweet-text').on('keyup', function () {
    let $input = $(this);
    let $form = $input.closest("form");
    let $counter = $form.find('.counter')
    let charCount = $input.val().length;
    //console.log("thisTest", $counter);
    let charLeft = 140 - charCount;
    $counter.html(charLeft);



    if (charCount > 140) {
      $counter.addClass("red");
    }
  })


});