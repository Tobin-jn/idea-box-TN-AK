$(document).ready( function () {

  var userTitle = $('.m-input-title');
  var userBody = $('.m-input-body');
  var saveBtn = $('.m-submit-btn');
  var cardContainer = $('.idea-container');
  var ideaList = $('.m-idea-list');
  var ideaArray = [];

  $('.save-btn').prop('disabled', true);

  checkStorage();
  initializeCards();
  deleteIdea();
  qualityKeeper();


  // console.log (localStorage.getItem('ideaArray'))
  //a function when the page is first loaded.
  //This function checks if any data is in local Storage and adds the data as a card.

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

  function deleteIdea () {
    $('.delete-card').on('click', function () {
      $(this).parent().parent().slideUp(1000);
      var deleteMe = $(this).prev().html();
      deleteMe = deleteMe.toString();
      console.log(deleteMe)
      console.log(ideaArray)
      for (var x in ideaArray) {
        if (deleteMe == ideaArray[x].ideaTitle) {
          ideaArray.splice(x, 1);
          localStorage.setItem('ideaArray', JSON.stringify(ideaArray))
        }

      }

    });
  }

  function qualityKeeper () {
    $('.downvote').on('click', function () {
      var deleteMe = $(this).parent().prev().html();
      var newHTML = '';
      deleteMe = deleteMe.toString();
      console.log(deleteMe)
      console.log(ideaArray)
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

  // $('.quality-buttons').mouseenter(function() {
  //   var $idea = $('p.quality')
  //   counter = checkIdea($idea)
  //   $('.upvote').on('click', function() {
  //     if (counter !== 2) counter++;
  //     changeQuality(counter, $idea)
  //   })
  //   $('.downvote').on('click', function() {
  //     if(counter !== 0) counter--;
  //     changeQuality(counter, $idea)
  //   })
  // })

  function checkIdea(idea, index) {
    // debugger
    var counter = null;
    var quality = (idea[index].ideaQuality)
    if (quality == 'swill') return 0;
    else if (quality == 'plausible') return 1;
    else if (quality == 'genius') return 2;
  }

  function changeQuality(counter, idea, index) {
    if (counter == 0) idea[index].ideaQuality = 'swill';
    else if (counter == 1) idea[index].ideaQuality = 'plausible';
    else if (counter == 2) idea[index].ideaQuality = 'genius';
  }

  //Function makes a new card with the info in the input fields
  function makeNewCard() {
    ideaArray = JSON.parse(localStorage.getItem('ideaArray'));
    var newTitle = ideaArray[0].ideaTitle
    var newBody = ideaArray[0].ideaBody
    var newIdea = ideaArray[0].ideaQuality
    var newCard = `<article class="m-idea-card">
                    <div class="idea-header flex-row">
                      <h2>${newTitle}</h2>
                      <button class="delete-card svg" alt="Delete"></button>
                    </div>
                    <p class="idea-description">${newBody}</p>
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

  //Function checks if any data is stored and adds it to localStorage.
  //Function currently stores but overwrites the previous data with the key savedData
  function saveNewInput() {
    var ideaObject = {
    "ideaTitle": userTitle.val(),
    "ideaBody": userBody.val(),
    "ideaQuality": "swill"
    };
    ideaArray.unshift(ideaObject);
    localStorage.setItem('ideaArray', JSON.stringify(ideaArray))

  }

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

  //1. Click --> capture inputs --> move info to local storage -->
  //        create card using parsed date includes unique identifier--> clear the input







  function initializeCards() {
   if (ideaArray[0] !== undefined) {
     ideaArray = JSON.parse(localStorage.getItem('ideaArray'));
     ideaArray.forEach( function(element) {
      var newTitle = element.ideaTitle
      var newBody = element.ideaBody
      var newQuality = element.ideaQuality
      var newCard = `<article class="m-idea-card">
                      <div class="idea-header flex-row">
                        <h2>${newTitle}</h2>
                        <button class="delete-card svg" alt="Delete"></button>
                      </div>
                      <p class="idea-description">${newBody}</p>
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



  //clears inputs after card is made
  function clearInput() {
    userTitle.val('');
    userBody.val('');
  }


  //retrieves data from localStorage, I think key needs to be dynamic...
  function retrieveNewInput () {
    var retrievedNewIdea = localStorage.getItem('savedData');
    var parsedObject = JSON.parse(retrievedNewIdea);
    return parsedObject
  }
  //delete the card
  //eventlistener--> locate the target using the class on the delete button
  //use .remove() to remove that card from the DOM
  //.removeItem() to remove that object from localStorage


  function deleteStorage() {
   if(event.target.className === '.delete-card') {
      var deleteMe = event.target.parentElement
      localStorage.removeItem(deleteMe);
  }
  };



  //3. quality  ===  click --> change class and HTML

  //Big question--> How to make the unique identifier??
  //will need this to locate card to delete and to locate info in local storage to remove


})
