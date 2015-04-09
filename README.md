symfony-react-edition
========================

Symfony as a web service fuels React for the View. 
This sample app allows you to create/read/update/delete posts using a REST API with Symfony2 on the backend. The frontend is powered by React with Flux framework to keep a neat unidirectional data flow.

 Installing Symfony React Edition
---------------------------------------------

### Requirements

    curl -s http://getcomposer.org/installer | php
    npm install bower -g
    npm install browserify -g

### Installation

    php composer.phar install
    bower install
    npm install

    php app/console doctrine:database:create
    php app/console doctrine:schema:update --force

### Usage (Assetic replacement + Livereload)

    grunt