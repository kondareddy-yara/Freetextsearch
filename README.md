# Freetextsearch

## What is freetextsearch?

It means giving user the flexibility to search for a word in a database or articles etc without imposing any restrictions (like to search only for name of product) and the results should correspond to the user searched term

## What method did we use?

We have used the Elastic Search, which is free and open source.You can refer more about it here https://www.elastic.co/

You can find the architecture diagram in ./docs/ directory

## Setup

1. You need to have docker installed in your system
2. Create a .env file and keep this value

```
DBHOST=mongodb://localhost:27017/product
```

3. Run this command to bring up docker containers for mongo and elastic search

```
docker compose up
```

4. Seed the data

```
npm run seed
```

5. Start the application

```
npm start
```

6. You are good to explore the api now.

```
http://localhost:8000/api/v1/products?search=$SEARCHTERM
```
