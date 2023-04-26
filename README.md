# JSON Editor

This project was done as a task which was assigned to me when I applied for the role of Frontend Dev Intern at [TrueFoundry](https://www.truefoundry.com/).

In this project, I developed a JSON editor from which useful information can be parsed to create dynamically generated forms. For the development of this project, I've made use of Redux - to store the parsed JSON that has been input by the user, and React - to design the whole interface of the website. 

## Work Flow
Initally, the parsed JSON from the user input was stored globally in the redux store which was then use by the form component to find certain elements in the JSON array and create a dynamic form accordingly. As the user submits the dynamically generated form, the data that has to be sent in the form of JSON to the backend server, is shown to the user. 

## Setting-Up

## Clone the repo:

### `git clone https://github.com/mihir224/TrueFoundry`

## In the project directory, run: 

### `npm start`

to run the app in the development mode and open [http://localhost:3000](http://localhost:3000) to view it in your browser.

