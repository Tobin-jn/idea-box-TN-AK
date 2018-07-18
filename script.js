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

  // console.log (localStorage.getItem('ideaArray'))
  //a function when the page is first loaded.
  //This function checks if any data is in local Storage and adds the data as a card.

  function checkInputs () {
    if ($('.idea-title').val() && $('.textbox').val()) return false;
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
      // deleteMe = String(deleteMe);
      // console.log(deleteMe);
      // localStorage.removeItem(deleteMe)
    });
    // deleteStorage();
  }

  saveBtn.on('click', function (event) {
    event.preventDefault();
    saveNewInput();
    makeNewCard();
    deleteIdea();
    $('.save-btn').prop('disabled', checkInputs);
  });
  cardContainer.on('click', console.log('test'))

  $('.idea-title').on('keyup', function () {
    $('.save-btn').prop('disabled', checkInputs);
  })

  $('.textbox').on('keyup', function () {
    $('.save-btn').prop('disabled', checkInputs);
  })

  //1. Click --> capture inputs --> move info to local storage -->
  //        create card using parsed date includes unique identifier--> clear the input


  //Function checks if any data is stored and adds it to localStorage.
  //Function currently stores but overwrites the previous data with the key savedData
  function saveNewInput() {
    var ideaObject = {
    ideaTitle: userTitle.val(),
    ideaBody: userBody.val(),
    };
    ideaArray.unshift(ideaObject);
    localStorage.setItem('ideaArray', JSON.stringify(ideaArray))

  }


  //Function makes a new card with the info in the input fields
  function makeNewCard() {
    ideaArray = JSON.parse(localStorage.getItem('ideaArray'));
    var newTitle = ideaArray[0].ideaTitle
    var newBody = ideaArray[0].ideaBody
    console.log(ideaArray[0])
  var newCard = `<article class="m-idea-card">
                    <div class="idea-header flex-row">
                      <h2>${newTitle}</h2>
                      <button class="delete-card svg" alt="Delete"></button>
                    </div>
                    <p class="idea-description">${newBody}</p>
                    <div class="quality-buttons">
                      <button class="upvote svg" role="button" aria-label="Upvote Idea"></button>
                      <button class="downvote svg"></button>
                      <p class="quality">swill</p>
                  </div>
                  <hr>
                </article>`
   ideaList.prepend(newCard);
   clearInput()
  }

  function initializeCards() {
   if (ideaArray[0] !== undefined) {
     ideaArray = JSON.parse(localStorage.getItem('ideaArray'));
     ideaArray.forEach( function(element) {
      var newTitle = element.ideaTitle
      var newBody = element.ideaBody
      var newCard = `<article class="m-idea-card">
                      <div class="idea-header flex-row">
                        <h2>${newTitle}</h2>
                        <button class="delete-card svg" alt="Delete"></button>
                      </div>
                      <p class="idea-description">${newBody}</p>
                      <div class="quality-buttons">
                        <button class="upvote svg" role="button" aria-label="Upvote Idea"></button>
                        <button class="downvote svg"></button>
                        <p class="quality">swill</p>
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
