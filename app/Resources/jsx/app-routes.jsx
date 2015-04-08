'use strict';

var Route = ReactRouter.Route,
	Redirect = ReactRouter.Redirect,
	DefaultRoute = ReactRouter.DefaultRoute,

	App = require('./layout.jsx'),
	Home = require('./pages/home.jsx'),
	Post = require('./pages/post.jsx'),
	About = require('./pages/about.jsx');

var AppRoutes = (
	<Route name="/" handler={App}>
		<DefaultRoute name="home" handler={Home} />
		<Route name="post" handler={Post} />
		<Route name="about" handler={About} />
	</Route>
);  

module.exports = AppRoutes;