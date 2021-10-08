# OpenClassrooms_P6

# HOT TAKES #

## Installation ##

## Frontend ##

Clone this repo, `run npm install`, and `run npm install --save-dev run-script-os`.


## Usage ##

Run `npm start`. This should both run the local server and launch your browser.

If your browser fails to launch, or shows a 404 error, navigate your browser to http://localhost:8080.

The app should reload automatically when you make a change to a file.

Use `Ctrl+C` in the terminal to stop the local server.


## Backend ##

Run `npm i express`, then in the config.js file replace the DB_USERNAME, DB_PASSWORD, DATA_BASE_NAME by your own mongoDB username, password and database name.
Then run `node server`. It should work on port 3000.

For example :

DB_USERNAME : process.env.DB_USERNAME || 'username',
DB_PASSWORD : process.env.DB_PASSWORD || 'password',
DATA_BASE_NAME : process.env.DATA_BASE_NAME || 'database_name'.
