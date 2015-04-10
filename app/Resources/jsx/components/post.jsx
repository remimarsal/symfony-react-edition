'use strict';

var PostListActions = require('../actions/postList');

var Post = React.createClass({

	handleDelete: function() {
		PostListActions.deletePost(this.props.id);
	},

	handleUpdate: function() {
		PostListActions.updatePost(this.props.content, this.props.id);
	},

	render: function() {

		return (
			<li className="collection-item">
				<span>{this.props.count} - </span>
				{this.props.content}
				<button className="btn-flat secondary-content" name="delete" onClick={this.handleDelete}>
				    <i className="mdi-action-delete"></i>
			    </button>
				<button className="btn-flat secondary-content" name="update" onClick={this.handleUpdate}>
				    <i className="mdi-editor-border-color"></i>
			    </button>
			</li>
		);

	}

});

module.exports = Post;
