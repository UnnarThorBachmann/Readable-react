28th of Septemer 2017

# Readable: A content and commenting app

This page is the work of Unnar Thor Bachmann.

This is a project in the Udacity's React Nanodegree program.

This project is a React front-end project with a Node backend. User is able to post content as well as comments. Posts come in three categories: react, redux and udacity. Posts can be sorted by number of comments, time and number of votes. Each content can be voted up or down, edited and deleted. 

## How this project is implemented.

This projected is implemented in React using JSX, React Router, Redux and Webpack. The development environment was NPM and Facebook's Create React App. A [starter](https://github.com/udacity/reactnd-project-readable-starter) template was provided. The original code was refactored into a proper React-Redux project. 

The main changes made to the starter template included

1. Created the project with Facebook's Create React App inside the front-end directory.
2. Created the store insdie App.js and wrapped the root component inside BrowserRouter and Provider to avoid prop threading.
3. Inside src. Added directories for actions, reducers, components and helpers to implement the redux pattern of actions-reducers-store. 

6. Inside components. Added components and connected to the store using the connect function and mapped the store state to the components via mapToStateProps function when neccessary. 
7. Inside helpers. Added comparators to assist with sorting as well as a random string generator (using Knuth shuffle).

Files added to the project:

### Inside reducers

* index.js - Added reducers and combined them with a root reducers via combinReducers.

### Inside actions - Added action creators as well as defining actions.

* index.js - Added reducers and combined them with a root reducers via combinReducers.

### Inside components.
* button.js - functional component to render a single link to the /new route.
* change.js - Component inherited by the New component and the Edit component to avoid code duplication.
* comment.js - Component which renders a comment.
* commentForm.js - Inline component of comment to allow editing of a comment (body and author). Uses prop threating for save.
* commentHeader.js - Inline coponent of comment which displays author and body of a commment when it is not being edited.
* edit.js - Renders a form for editing a post.
* new.js - Renders a form for creating a new post.
* post.js - 
* postDetailed.js - Renders a detailed view of a post with comments.
* posts.js - Renders a block of posts sorted and filtered by category.
* tab.js - Renders the tab bar for filtering by categories. 
Files modified

* App.js - Adding Router and Link components to allow routing. Removing routing with a state variable. Adding `books` state variable and connecting it to the database (BooksAPI.js). Components used to refactor the App.js into compent instead of hard coding the HTML.
*  index.js - Adding ReactRouter and wrap the App component to allow routing with ReactRouter.
* App.css - Modified the file to style the search page.


## How to run on a computer

1. Make sure [NPM](https://www.npmjs.com/get-npm) is installed.
2. Clone and download this repository and save in a directory.
3. To start the server: In the root directory write `cd api-server`, `npm install` and `node server`
4. To run the app: In the root directory write `cd front-end` and `npm  start`
5. Interact with the program in a browser using the url localhost:3000.

Node packages installed:

* react-reducer: `npm install --save react-redux`
* react-router-dom: `npm install --save react-router-dom`
* 


