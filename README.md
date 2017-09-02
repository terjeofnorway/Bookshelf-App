# MyReads Project

This app lets the user search for books and put them into designated shelves for later.

## Install instructions
1. Git clone  the project
2. Run `npm install` to install dependencies.
3. Run `npm run start` to start the application.

Appliation require online access.

## Architecture
The application architecture is built into the following components:

| Component | Comment |
|-----------|---------|
| App       | The root App holding states and routes.|
| Bookshelf | An individual shelf in which a Book can be placed. |
| Book  | the actual book to be placed into a shelf.  |


## BooksAPI
The Books API searches books.google.com for books, while storing the ones saved by the user into a separate cloud udacity.com storage.

