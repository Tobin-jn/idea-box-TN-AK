$(document).ready(function () {

  $ideaCard = $([
    `<article class="m-idea-card">`,
      `<div class="idea-header flex-row">`,
        `<h2>Example Idea 1</h2>`,
        `<button class="delete-card svg" alt="Delete"></button>`,
      `</div>`,
      `<p class="idea-description">Tiramasu carrot fruitcake gingerbread man this is me woooo!</p>`,
      `<div class="quality-buttons">`,
        `<button class="upvote svg" role="button" aria-label="Upvote Idea"></button>`,
        `<button class="downvote svg"></button>`,
        `<p class="quality">quality: swill</p>`,
      `</div>`,
      `<hr>`,
    `</article>`,
  ].join("\n"));

  function checkInputs () {
    if ($('.idea-title').val() && $('.textbox').val()) return false;
    return true;
  }

  // function addIdea() {
  //   $ideaCard = $([
  //     `<article class="m-idea-card">`,
  //       `<div class="idea-header flex-row">`,
  //         `<h2>Example Idea 1</h2>`,
  //         `<button class="delete-card svg" alt="Delete"></button>`,
  //       `</div>`,
  //       `<p class="idea-description">Tiramasu carrot fruitcake gingerbread man this is me woooo!</p>`,
  //       `<div class="quality-buttons">`,
  //         `<button class="upvote svg" role="button" aria-label="Upvote Idea"></button>`,
  //         `<button class="downvote svg"></button>`,
  //         `<p class="quality">quality: swill</p>`,
  //       `</div>`,
  //       `<hr>`,
  //     `</article>`,
  //   ].join("\n"));
  //
  //   $ideaContainer.append($ideaCard);
  //
  // }


  $('.save-btn').prop('disabled', true);

  var counter = 0;
  var $ideaContainer = $('.ideaContainer');
  var $inputForm = $('.idea-form');


  $('.idea-title').on('keyup', function () {
    $('.save-btn').prop('disabled', checkInputs);
  })

  $('.textbox').on('keyup', function () {
    $('.save-btn').prop('disabled', checkInputs);
  })


  // on Save click generate new card
  $('.save-btn').on('click', function (event) {
    event.preventDefault();
    counter++;
    console.log(counter);
    $('.idea-container').append($ideaCard);
    $('.delete-card').on('click', function () {
      $(this).parent().parent().hide(1000);
    });
    $inputForm.children().val('');
    $('.save-btn').prop('disabled', checkInputs);

  })

  //delete

  $('.delete-card').on('click', function (event) {
    console.log($(this));
    console.log('Hiiiiiiiii');
  })





})
