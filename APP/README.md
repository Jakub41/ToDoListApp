# The To Do App FrontEnd

The frontend of the app is using a lightweight simple library called **Backbone.js** and **Marionette.js** for adding extra functionality. 

The decision to use this library was due to the fact that this technology is simple, light weight and a good solution for a small application which has no heavy complexity.

The frontend is also connected to the **API** backend. 

**Useful Links:**

- [Backbone.js](http://backbonejs.org/) 

- [Marionette.js](https://marionettejs.com/)

## Requirements

For be able to run the frontend,you should have:

    Node.js     
    Gulp.js     V 4

For instruction to use **Gulp 4** please check the following link or try to find a solution online:

- [Gulp 4 instructions](https://www.liquidlight.co.uk/blog/article/how-do-i-update-to-gulp-4/)

## Getting started

First **clone** the project to your machine:

    git clone https://github.com/Jakub41/ToDoListApp.git

Go to the **APP** folder:

    cd <your folder> /ToDoListApp/APP/

When in the **APP** directory, run:

    npm install 

This should install all the packages which are used in this project.

If **errors** during the installation try to run (Mac or Linux users):

    sudo npm install

This will install with **Root** privileges.

For **Windows** users please check online the documentation about the issues you could have.

To **build** the **APP** and **run** in one stance use the next command:

    gulp

This will build the APP into the **Public** folder and run at this URL:

    http://localhost:8000

To **buld** the **APP** only and for **production**:

    gulp prod

This will build a **production** version of the app under the folder **Public**.

Then to **run**:  

    npm run serve

This should start the **static server** at this URL:

    http://localhost:9080/

If you want to clean the **Public** folder run this command:

    gulp clean

It will clean all the content of the **Public** folder

## The APP structure

The structure is more less standard for a **Backbone/Marionette** application:

- Root: contains the config files only

- Src: contains the app itself
    
  - app
    - collections
    - models
    - templates
    - views
  - fonts
  - scss
  - test

The **Main** app configurations is located `src/app/main.js`

**Backbone** is configured in `src/app/backboneConfig.js`

**API** connection is set up in `src/app/api.js`

**Data** is stored in models and collections in `src/app/models` and `src/app/collections`

**Gulp** is used as a task runner and **Webpack** as js compiler. `gulpfile.js` and `webpack.config.js` 

**Routes** are set in `src/app/router.js` and Backbone function `execute` is used to restrict user access.

There are three main pages **View**: 
- HomeView
- LoginView
- RegisterView

They are loaded from router. All nested views loaded in view directly. Data is stored in models and collections and fetched in views.

## Packages

- Models validation made with help of [Backbone Validations plugin](http://thedersen.com/projects/backbone-validation/) wich is rather flexible.

- Data bindings made with [backbone.stickit](https://github.com/NYTimes/backbone.stickit). It helps avoid unnecessary renders which makes app more responsive.

- [jquery](https://jquery.com/)

- [moment.js](https://momentjs.com/): Validation for Dates and Time

- [noty.js](https://ned.im/noty/#/): Notification library

- [purecss](https://purecss.io/): Light weight css modules and responsive design

- [underscore.js](http://underscorejs.org/): Helper library 

- [Datepicker](https://github.com/fengyuanchen/datepicker): A simple Jquery plugin

**Dev Dependencies**:

- [Babel](https://babeljs.io/): Js compiler for ES6 standard

- [Del](https://www.npmjs.com/package/del): Delete files and folders using globs

- [expect.js](https://github.com/Automattic/expect.js?files=1): Test toolkit

- [Gulp](https://gulpjs.com/): task runner
  
  - [autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)
  - [plumber](https://www.npmjs.com/package/gulp-plumber)
  - [rename](https://www.npmjs.com/package/gulp-rename)
  - [sass](https://www.npmjs.com/package/gulp-sass)
  - [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
  - [util](https://www.npmjs.com/package/gulp-util)
  - [webserver](https://www.npmjs.com/package/gulp-webserver)

- [mocha](https://github.com/mochajs/mocha): Increase test coverage on Node.js and browser

- [webpack](https://webpack.github.io/): Module Dependencies  

- [sinon](http://sinonjs.org/): A tool for unit test

- [yargs](https://github.com/yargs/yargs): A command line tool




    