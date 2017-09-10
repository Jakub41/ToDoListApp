# The RESTFUL API

This API provides the backend functionality to the **To Do App**. It is using Node.js and MongoDb.

## Requirements

These are the main requirements one need to be able to run the API:

    Node >= v8.0.0
    MongoDB >= v3.0.0

**Useful Links:**

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/) 

## Getting Started

**Clone** the repo or download the zip to your machine:

    git clone https://github.com/Jakub41/ToDoListApp.git

Go to the **API** folder:

    cd <your folder> /ToDoListApp/API/

When in the **API** directory, run:

    npm install --save or -S

This should install all the **packages** which are used in this project.

If **errors** during the installation try to run (Mac or Linux users):

    sudo npm install --save or -S

This will install with **Root** privileges. 

For **Windows users** please check online the documentation about the issues you could have.

After the installation is completed be sure your **MongoDB** is set up and running:

    Please check online documentation regarding the system you are using to be sure all is set up correctly

To **run** the **API** use the next command:

    NODE_ENV=development nodemon server.js

    or

    NODE_ENV=production nodemon server.js

Server starts successfully on:

       localhost:3000   Development
       localhost:3001   Production

 Two environments can be specified: 'development', 'production' 

 ## Server Response

To check if the **API** is working correctly write in the URL to see the response:

    localhost:3000/ping

If everything is good, you will see a '200' response on the screen.

## Test the API

A good method to test the **API** it is using a tool like [Postman](https://www.getpostman.com/). A great tool which helps a lot during an API development.

However, in this project was implemented a testing API framework called [Swagger](https://swagger.io/). This framework provides great tools to develop an API and testing its end-points.

To test the end-points go to:

    localhost:3000/documentation

All the end-points are listed here. 

**Swagger View**:

![Swagger View](https://github.com/Jakub41/ToDoListApp/blob/master/API/doc/swaggerView.png)

**How To Test**:

After the **Swagger** is open as an example you can open the user registration end-point:

    Click on "POST /user Register User"
    Will extend and show the model and values
    On the top right corner click "Try It Out"
    Then you will see an editable schema of the User Model where will be possible to try it out
    Fill with yours values and hit execute and have fun testing the API

![Swagger Test](https://github.com/Jakub41/ToDoListApp/blob/master/API/doc/exampleSwagger.png)







     