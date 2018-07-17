var userTitle = $('.m-input-title');
var userBody = $('.m-input-body');
var saveBtn = $('.m-submit-btn');
var cardContainer = $('.idea-container');

saveBtn.on('click', newIdea);

//1. Click --> capture inputs --> move info to local storage -->  
//        create card using parsed date includes unique identifier--> clear the input

//2. make delete functionality, includes removing data from local storage
//3. quality  ===  click --> change class and HTML



///put data into local storage//

//make a function that grabs the inputs, save as a variable
//those inputs are used to make an object
//follow work flow--save that object in local storage via stringify


var newIdeaObject = {
  ideaTitle: 'newTitle',
  ideaBody: 'newBody',
};
var stringifiedObject = JSON.stringify(newIdeaObject);
localStorage.setItem('newIdea', stringifiedObject)
  
//make a function
//call the object in storage
//use properties from the object to populate the new card
//make the card

var retrievedObject = localStorage.getItem('newIdea');
var parsedObject = JSON.parse(retrievedObject);


//create new idea card- use info from the object saved in storage//
function newIdea(event) {
  event.preventDefault();
  var newTitle = userTitle.val();
  var newBody = userBody.val();
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



 cardContainer.append(newCard);
 clearInput()
}

function clearInput() {
  userTitle.val('');
  userBody.val('');
}

//delete the card
//eventlistener--> locate the target using the class on the delete button
//use .remove() to remove that card from the DOM
//.removeItem() to remove that object from localStorage



//Big question--> How to make the unique identifier??
//will need this to locate card to delete and to locate info in local storage to remove
