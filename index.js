const taskContainer = document.querySelector(".task__container");

let globalStore = [];

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" >
        <div class="card text-center">
          <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
            <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick ="deleteCard.apply(this, arguments)">
            <i class="fas fa-trash-alt" id=${taskData.id} onclick ="deleteCard.apply(this, arguments)"></i></button>
          </div>
          <img src=${taskData.imageurl} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${taskData.tasktitle}</h5>
            <p class="card-text">${taskData.taskdescription}</p>
            <a href="#" class="btn btn-primary">${taskData.tasktype}</a>
          </div>
          <div class="card-footer">
            <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
          </div>
        </div>
      </div>
`;

const loadInitialCardData = () => {

  // localstorage to get tasky card data
  const getCardData = localStorage.getItem("tasky");

  // converting from string to normal object
  const {cards} = JSON.parse(getCardData);

  // loop over those array of task object to create HTML card and inject it to DOM
  cards.map((cardObject) => {

    taskContainer.insertAdjacentHTML( "beforeend", generateNewCard(cardObject) );

    // update our globalStore
    globalStore.push(cardObject);

  })

};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, //0123456789 unique number for id
        imageurl: document.getElementById("imageurl").value,
        tasktitle: document.getElementById("tasktitle").value,
        tasktype: document.getElementById("tasktype").value,
        taskdescription: document.getElementById("taskdiscription").value,
    }; 

    taskContainer.insertAdjacentHTML( "beforeend", generateNewCard(taskData) );

    globalStore.push(taskData);

    localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));
};

const deleteCard = (event) => {

  event = window.event;
  // browser related properties
  // your HTML element
  

  // id
  const targetID = event.target.id;
  const tagname = event.target.tagName; // BUTTON

  // match the id of the element with the id inside the global store

  // if match found -> remove


  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

  // contact parent
  if(tagname==="BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }

};



// Parent Object
// browser -> Window
// DOM -> Document
// issues
//page refresh will cause the data to be deleted -> localstorage -> 5mb [solved]
// features
// delete the card -> [solved]
// open the card -> [solved] 
// edit the card
