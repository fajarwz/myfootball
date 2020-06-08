// open db
let dbPromised = idb.open("myfootballv1", 1, function(upgradeDb) {
  // define object store 
  let articlesObjectStore = upgradeDb.createObjectStore("standing", {
    // set unique id for article as keypath
    keyPath: "competition.id"
  });

  // index so we can search article based on title
  articlesObjectStore.createIndex("competition.name", "competition.name", { unique: false });  
});

function saveForLater(item) {
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      let tx = db.transaction("standing", "readwrite");
      let store = tx.objectStore("standing");

      // add or update
      store.put(item);

      return tx.complete;
    })
    .then(function() {
      resolve(M.toast({html: 'Saved / updated successfully!'}));
    })
    .catch(function(error) {
      M.toast({html: 'Already saved!'});
    });
  });
}

function deleteData(item) {
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      let tx = db.transaction("standing", "readwrite");
      let store = tx.objectStore("standing");
      // console.log(competition);

      // data object from API
      store.delete(item.competition.id);

      return tx.complete;
    })
    .then(function() {
      resolve(M.toast({html: 'Deleted successfully!'}));
    })
    .catch(function(error) {
      M.toast({html: 'Already deleted!'});
    });
  });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("standing", "readonly");
        let store = tx.objectStore("standing");
        // console.log(store.getAll());
        return store.getAll();
      })
      .then(function(competitions) {
        resolve(competitions);
      });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        let tx = db.transaction("standing", "readonly");
        let store = tx.objectStore("standing");
        // console.log(store.get(parseInt(id)));
        return store.get(parseInt(id));
      })
      .then(function(competition) {
        resolve(competition);
      });
  });
}