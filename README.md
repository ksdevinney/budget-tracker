# Progressive Budget Tracker

## About 

This application allows the user to keep track of their finances, even while offline. The user can give each transaction a title and amount, then choose whether it is a deposit or withdrawl. If the user is offline, any transactions created will sync upon returning online.

## Development

Transaction data is stored using MongoDB, a NoSQL database. The online functions are simply added to the database. For the offline component, data is stored in the browser cache. Upon connecting to the internet, the transactions stored in the cache will add to the database and the cache will clear.