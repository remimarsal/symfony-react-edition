'use strict';

var Link = ReactRouter.Link;

var Header = React.createClass({

	componentDidMount: function() {
		$(".button-collapse").sideNav();
	},

	render: function() {

		return (
			<header>
				<nav className="cyan accent-3">
					<div className="nav-wrapper container">
						<a href="#" data-activates="slide-out" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
						<Link to="home" className="brand-logo">Logo</Link>

						<ul className="right hide-on-med-and-down">
							<li>
								<Link to="home">Home</Link>
							</li>
							<li>
								<Link to="posts">Posts</Link>
							</li>
							<li>
								<Link to="about">About</Link>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		);

	}

});

module.exports = Header;
