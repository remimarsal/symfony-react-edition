'use strict';

var PostListActions = require('../actions/postList');

var Post = React.createClass({

	handleDelete: function() {
		PostListActions.deletePost(this.props.id);
	},

	render: function() {

		return (
			<li className="collection-item">
				<span>{this.props.id} - </span>
				{this.props.content}
				<button className="btn-flat waves-effect secondary-content" name="delete" onClick={this.handleDelete}>
				    <i className="mdi-action-delete"></i>
			    </button>
				<button className="btn-flat waves-effect secondary-content" name="update" onClick={this.handleUpdate}>
				    <i className="mdi-editor-border-color" onClick={this.handleUpdate}></i>
			    </button>
			</li>
		);

	}

});

module.exports = Post;
