'use strict';

var Reflux = require('reflux'),
	PostActions = require('../actions/post'),
	postActionStore = require('../stores/post');

var Post = React.createClass({displayName: "Post",
	mixins: [Reflux.connect(postActionStore)],

	componentDidMount: function() {
		PostActions.requestForm();
	},

	render: function() {
		return (
			<div>
				<h1>Posts</h1>
				<div className="row">
				    <form className="col s12">
					    <div className="row">
						    <div className="input-field col s12">
							    <input type="text" id="post-content"/>
							    <label for="post-content">Add a new post</label>
						    </div>
					    </div>
				    </form>
				    <a className="waves-effect btn-flat">Send</a>
			    </div>
			</div>
		);
	}
});

module.exports = Post;