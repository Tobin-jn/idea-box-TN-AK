var userTitle = $('.m-input-title');
var userBody = $('.m-input-body');
var saveBtn = $('.m-submit-btn');
var cardContainer = $('.idea-container');
var ideaList = $('.idea-list');
var ideaArray = []
initializeCards()

// console.log (localStorage.getItem('ideaArray'))
//a function when the page is first loaded. 
//This function checks if any data is in local Storage and adds the data as a card.


saveBtn.on('click', saveNewInput);
cardContainer.on('click', console.log('test'))

//1. Click --> capture inputs --> move info to local storage -->  
//        create card using parsed date includes unique identifier--> clear the input


//Function checks if any data is stored and adds it to localStorage.
//Function currently stores but overwrites the previous data with the key savedData
function saveNewInput(event) {
  event.preventDefault();
  var ideaObject = {
  ideaTitle: userTitle.val(),
  ideaBody: userBody.val(),
  };

  ideaArray.unshift(ideaObject)
  localStorage.setItem('ideaArray', JSON.stringify(ideaArray))
  makeNewCard()
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
 ideaArray = JSON.parse(localStorage.getItem('ideaArray'));
 ideaArray.forEach( function(element) {
  console.log(element)
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


function deleteIdea() {
 if(event.target.className === '.delete-card') {
    event.target.parentElement.remove()
}
};



//3. quality  ===  click --> change class and HTML

//Big question--> How to make the unique identifier??
//will need this to locate card to delete and to locate info in local storage to remove



























