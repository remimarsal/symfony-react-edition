symfony-react-edition
========================

Symfony as a web service fuels React for the View.

This sample app allows you to create/read/update/delete posts using a REST API with Symfony2 on the backend. The frontend is powered by React with Flux framework to keep a neat unidirectional data flow.

### Introduction

Using latest SensioLabs recommandations, this installation only uses one bundle `AppBundle` which will solely contain the logic of your application such as controllers or entities.

The assets live in the `app/Resources` directory. This is where for instance you will find the JSX for React but also the basic views for the initial request.

The sample application uses Sass and Bower but these are not required. I also slightly customized Bower and Composer directories to have a consistent naming in the root directory like:

- bower_modules
- composer_modules
- node_modules

A Gruntfile has also been setup which makes Assetic superfluous. Grunt will first copy assets in the web directory then watch for changes in Twig, Sass, JSX files, rebuild if necessary, and automatically reload the page which I find pretty awesome. The Gruntfile would have to be customized to fit the specific needs of your application.

The routing for the REST API is defined with annotations in the `AppBundle/Controller/Front/PostController` but for the frontend the routing happens in `app/Resources/jsx/app-routes.jsx` which loads pages as CommonJS modules from the pages directory thanks to Browserify.

![alt tag](https://cloud.githubusercontent.com/assets/8236496/7091178/4ea71734-dfa8-11e4-998f-2f8bdad73365.jpg)

 Installing Symfony React Edition
---------------------------------------------

### Requirements

- [Set a virtual host](http://httpd.apache.org/docs/2.2/en/vhosts/examples.html) (for example: dev.symfony-react.com)
- [npm](https://nodejs.org/download/)
- [Ruby](http://rubyinstaller.org/)

```
curl -s http://getcomposer.org/installer | php
npm install browserify -g
npm install bower -g
gem install sass
```

### Installation

    php composer.phar install
    bower install
    npm install

    php app/console doctrine:database:create
    php app/console doctrine:schema:update --force

### Usage (Assetic replacement + Livereload)

- `grunt`
- Open a new tab with your virtual host (for example: dev.symfony-react.com/app_dev.php/)