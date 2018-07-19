$(document).ready( function () {

  var userTitle = $('.m-input-title');
  var userBody = $('.m-input-body');
  var saveBtn = $('.m-submit-btn');
  var cardContainer = $('.idea-container');
  var ideaList = $('.m-idea-list');
  var ideaArray = [];

  
  $('.save-btn').prop('disabled', true);

  saveBtn.on('click', function (event) {
    event.preventDefault();
    saveNewInput();
    makeNewCard();
    deleteIdea();
    qualityKeeper();
    $('.save-btn').prop('disabled', checkInputs);
  });

  $('.idea-title').on('keyup', function () {
    $('.save-btn').prop('disabled', checkInputs);
  })

  $('.textbox').on('keyup', function () {
    $('.save-btn').prop('disabled', checkInputs);
  })

  $('.m-searchbar').on('keyup', search);

  checkStorage();
  initializeCards();
  deleteIdea();
  qualityKeeper();

  function changeQuality(counter, idea, index) {
    if (counter == 0) idea[index].ideaQuality = 'swill';
    else if (counter == 1) idea[index].ideaQuality = 'plausible';
    else if (counter == 2) idea[index].ideaQuality = 'genius';
  }

  function checkIdea(idea, index) {
    var counter = null;
    var quality = (idea[index].ideaQuality)
    if (quality == 'swill') return 0;
    else if (quality == 'plausible') return 1;
    else if (quality == 'genius') return 2;
  }

  function checkInputs () {
    if ($('.idea-title').val() && $('.textbox').val()) {
      return false;
    }
    return true;
  }

  function checkStorage () {
    ideaArray = localStorage.getItem('ideaArray');
    if (ideaArray === null) ideaArray = [];
  }

  function clearInput() {
    userTitle.val('');
    userBody.val('');
  }

  function deleteIdea () {
    $('.delete-card').on('click', function () {
      $(this).parent().parent().slideUp(1000);
      var deleteMe = $(this).prev().html();
      deleteMe = deleteMe.toString();
      for (var x in ideaArray) {
        if (deleteMe == ideaArray[x].ideaTitle) {
          ideaArray.splice(x, 1);
          localStorage.setItem('ideaArray', JSON.stringify(ideaArray))
        }
      }
    });
  }

  function initializeCards() {
   if (ideaArray[0] !== undefined) {
     ideaArray = JSON.parse(localStorage.getItem('ideaArray'));
     ideaArray.forEach( function(element) {
      var newTitle = element.ideaTitle
      var newBody = element.ideaBody
      var newQuality = element.ideaQuality
      var newCard = `<article class="m-idea-card">
                      <div class="idea-header flex-row">
                        <h2 class="search-me">${newTitle}</h2>
                        <button class="delete-card svg" alt="Delete"></button>
                      </div>
                      <p class="search-me idea-description">${newBody}</p>
                      <div class="quality-buttons">
                        <button class="upvote svg" role="button" aria-label="Upvote Idea"></button>
                        <button class="downvote svg"></button>
                        <p class="quality">${newQuality}</p>
                    </div>
                    <hr>
                  </article>`
      ideaList.append(newCard);
     })
   }
  }

  function makeNewCard() {
    ideaArray = JSON.parse(localStorage.getItem('ideaArray'));
    var newTitle = ideaArray[0].ideaTitle
    var newBody = ideaArray[0].ideaBody
    var newIdea = ideaArray[0].ideaQuality
    var newCard = `<article class="m-idea-card">
                    <div class="idea-header flex-row">
                      <h2 class="search-me">${newTitle}</h2>
                      <button class="delete-card svg" alt="Delete"></button>
                    </div>
                    <p class="search-me idea-description">${newBody}</p>
                    <div class="quality-buttons">
                      <button class="vote upvote svg" role="button" aria-label="Upvote Idea"></button>
                      <button class="vote downvote svg"></button>
                      <p class="quality">${newIdea}</p>
                  </div>
                  <hr>
                </article>`
   ideaList.prepend(newCard);
   clearInput()
  }

  function qualityKeeper () {
    $('.downvote').on('click', function () {
      var deleteMe = $(this).parent().prev().html();
      var newHTML = '';
      deleteMe = deleteMe.toString();
      for (var x in ideaArray) {
        if (deleteMe == ideaArray[x].ideaBody) {
          var counter = checkIdea(ideaArray, x)
          if(counter > 0) counter--
          changeQuality(counter, ideaArray, x);
          newHTML = ideaArray[x].ideaQuality;
          localStorage.setItem('ideaArray', JSON.stringify(ideaArray))
        }
      }
      $(this).siblings('p').html(newHTML)
    });

    $('.upvote').on('click', function () {
      var deleteMe = $(this).parent().prev().html();
      var newHTML = '';
      deleteMe = deleteMe.toString();
      for (var x in ideaArray) {
        if (deleteMe == ideaArray[x].ideaBody) {
          var counter = checkIdea(ideaArray, x)
          if(counter <= 3) counter++
          changeQuality(counter, ideaArray, x);
          newHTML = ideaArray[x].ideaQuality;
          localStorage.setItem('ideaArray', JSON.stringify(ideaArray))
        }
      }
      $(this).siblings('p').html(newHTML)
    });
  }

  function saveNewInput() {
    var ideaObject = {
    "ideaTitle": userTitle.val(),
    "ideaBody": userBody.val(),
    "ideaQuality": "swill"
    };
    ideaArray.unshift(ideaObject);
    localStorage.setItem('ideaArray', JSON.stringify(ideaArray))
  }

  function search() {
    var filter = $(this).val();
    $('.m-idea-list article').each(function() {
      if($(this).text().search(new RegExp(filter, 'i')) !== -1) {
        $(this).fadeIn()
      } else {
        $(this).fadeOut()
      }
    });
  }
})