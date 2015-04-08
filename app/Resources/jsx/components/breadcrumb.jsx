'use strict';

var Breadcrumb = React.createClass({displayName: "Breadcrumb",
	mixins: [ReactRouter.State],
	render: function() {

		var routes, routeName;

		routes = this.getRoutes();
		routeName = routes[1].name;

		return (
			<span className="breadcrumb hide-on-small-only">&nbsp;/&nbsp;{routeName}</span>
		);

	}

});

module.exports = Breadcrumb;