'use strict';

var RouteHandler = ReactRouter.RouteHandler,
	Header = require('./components/header.jsx'),
	Footer = require('./components/footer.jsx');

var Layout = React.createClass({displayName: "Layout",

	render : function() {

		return (
			<body data-id="app">
				<Header />
				<main id="page" className="container">
					<RouteHandler />
				</main>
				<Footer />
			</body>
		);
	}
});

module.exports = Layout;