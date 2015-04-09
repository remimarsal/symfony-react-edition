'use strict';

var Link = ReactRouter.Link;

var Footer = React.createClass({displayName: "Footer",

	render: function() {

		return (
			<footer className="page-footer grey darken-4">
				<div className="container">
					<div className="row">
						<div className="col l6 s12">
							<h5 className="white-text">Footer Content</h5>
							<p className="grey-text text-lighten-4">Symfony React Edition.</p>
						</div>
						<div className="col l4 offset-l2 s12">
							<h5 className="white-text">Links</h5>
							<ul>
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
					</div>
				</div>
				<div className="footer-copyright">
					<div className="container">
						© 2015 Copyright Text
					</div>
				</div>
			</footer>
		);

	}

});

module.exports = Footer;