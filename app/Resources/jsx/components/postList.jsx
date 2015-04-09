'use strict';

var Reflux = require('reflux'),
	PostListActions = require('../actions/postList'),
	postListActionStore = require('../stores/postList'),
	Post = require('./post.jsx');

var PostList = React.createClass({displayName: "PostList",
	mixins: [Reflux.connect(postListActionStore)],

	componentWillMount: function() {
		PostListActions.getPosts();
	},

	render: function() {

		var posts = [];

		_.each(this.state.posts, function(post) {
			posts.push(
				<Post key={post.id} id={post.id} content={post.content} />
			);
		});

		return (
			<ul className="col s12 collection">
				<li className="collection-header"><h4>Posts</h4></li>
				{posts}
			</ul>
		);

	}

});

module.exports = PostList;
