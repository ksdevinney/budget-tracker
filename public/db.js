let db;

// Create a new db request for a "budget" database.
const request = indexedDB.open('budgetDB', 1);

request.onupgradeneeded = function (e) {
  console.log('Upgrade needed in IndexDB');

  db = e.target.result;

    const budgetStore = db.createObjectStore('budgetStore', { 
      keyPath: "listID",
      autoIncrement: true 
    });
};

request.onsuccess = function (e) {
  console.log('success');
  db = e.target.result;

  // Check if app is online before reading from db
  if (navigator.onLine) {
    console.log('Backend online! 🗄️');
    checkDatabase();
  }
};

request.onerror = function (e) {
  console.log("whoops!" + e);
};

function checkDatabase() {
  console.log('check db invoked');

  // Open a transaction on your BudgetStore db
  const transaction = db.transaction([ 'budgetStore' ], 'readwrite');
  // access your BudgetStore object
  const budgetStore = transaction.objectStore('budgetStore');
  // Get all records from store and set to a variable
  const getAll = budgetStore.getAll();

  // If the request was successful
  getAll.onsuccess = function () {
    // If there are items in the store, we need to bulk add them when we are back online
    if (getAll.result.length > 0) {
      fetch('/api/transaction/bulk', {
        method: 'POST',
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((res) => {
          // If our returned response is not empty
          if (res.length !== 0) {
            // Open another transaction to BudgetStore with the ability to read and write
            const transaction = db.transaction([ 'budgetStore' ], 'readwrite');

            // Assign the current store to a variable
            const budgetStore = transaction.objectStore('budgetStore');

            // Clear existing entries because our bulk add was successful
            budgetStore.clear();
            console.log('Clearing store 🧹');
          }
        });
    }
  };
}

function saveRecord(record) {
  console.log('Save record invoked');
  // Create a transaction on the BudgetStore db with readwrite access
  const transaction = db.transaction([ 'budgetStore' ], 'readwrite');
  // Access your BudgetStore object store
  const budgetStore = transaction.objectStore('budgetStore');
  // Add record to your store with add method.
  budgetStore.add(record);
};

// Listen for app coming back online
window.addEventListener('online', checkDatabase);