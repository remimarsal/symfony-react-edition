'use strict';

var Route = ReactRouter.Route,
	Redirect = ReactRouter.Redirect,
	DefaultRoute = ReactRouter.DefaultRoute,

	App = require('./layout.jsx'),
	Home = require('./pages/home.jsx'),
	Posts = require('./pages/posts.jsx'),
	About = require('./pages/about.jsx');

var AppRoutes = (
	<Route name="/" handler={App}>
		<DefaultRoute name="home" handler={Home} />
		<Route name="posts" handler={Posts} />
		<Route name="about" handler={About} />
	</Route>
);  

module.exports = AppRoutes;