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


  var counter = 0;

  $('.save-btn').prop('disabled', true);

  $('.idea-title').on('keyup', function () {
    $('.save-btn').prop('disabled', false);
  })


  // on Save click generate new card
  $('.save-btn').on('click', function (event) {
    event.preventDefault();
    counter++;
    console.log(counter);
    $('.idea-container').append($ideaCard);
  })





})
