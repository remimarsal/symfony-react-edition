'use strict';

var AppRoutes = require('./app-routes.jsx');

// Needed for React Developer Tools
window.React = React;

// Run the ReactRouter
ReactRouter
.create({
	routes: AppRoutes,
	scrollBehavior: ReactRouter.ScrollToTopBehavior
})
.run(function (Handler) {
	   // Whenever the url changes, this callback is called again
	   React.render(<Handler />, document.body);
});