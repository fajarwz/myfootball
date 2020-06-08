document.addEventListener("DOMContentLoaded", function() {
  let urlParams = new URLSearchParams(window.location.search);
  let isFromSaved = urlParams.get("saved");

  let btnSave = document.getElementById("save");
  btnSave.style.display = 'none';

  let btnDelete = document.getElementById("delete");
  btnDelete.style.display = 'none';

  let item;

  if (isFromSaved) {
    // get data
    item = getSavedCompetitionById();
    // console.log(item);

    // Show delete fab if it loaded from indexed db
    btnDelete.style.display = 'block';
  } else {
    // get data 
    item = getCompetitionById();

    // check if item / data is exists, if it exists then show the save fab
    // if no then it still hidden
    item.then(function(data) {
      if(!isEmpty(data.standings)) {
        // Show save fab if it loaded from api
        btnSave.style.display = 'block';
      }
    });
  }

  btnSave.onclick = function() {
    item.then(function(data) {
      saveForLater(data).then(function(result) {
        if(result) {
          btnSave.style.display = 'none';
          btnDelete.style.display = 'block';
        }
      });
    });
  };

  btnDelete.onclick = function() {
    item.then(function(item) {
      deleteData(item).then(function(result) {
        if(result) {
          btnDelete.style.display = 'none';
          btnSave.style.display = 'block';
        }
      });
    });
  };

});