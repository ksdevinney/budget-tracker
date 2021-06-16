# Progressive Budget Tracker

## About 

This application allows the user to keep track of their finances, even while offline. The user can give each transaction a title and amount, then choose whether it is a deposit or withdrawl. If the user is offline, any transactions created will sync upon returning online.

## Development

Transaction data is stored using MongoDB, a NoSQL database. The online functions are simply added to the database. For the offline component, data is stored in the browser cache. Upon connecting to the internet, the transactions stored in the cache will add to the database and the cache will clear.

## How to Use

This application can be run locally, and is [deployed on Heroku](https://fast-fortress-79737.herokuapp.com/).

To run locally, `git clone` the code on your machine, then `npm i` to install dependencies and `npm start` to initialize the application. A MongoDB server should be running in the background.