'use strict';

var Reflux = require('reflux'),
	PostListActions = require('../actions/postList'),
	postListActionStore = require('../stores/postList'),
	PostList = require('../components/postList.jsx');

var Posts = React.createClass({displayName: "Posts",
	mixins: [Reflux.connect(postListActionStore)],

	handleChange: function(event) {
		this.setState({postInput: event.target.value});
		PostListActions.inputChange(event.target.value);
	},

	handleSend: function() {
		PostListActions.sendPost();
	},

	render: function() {
		return (
			<div>
				<div className="row">
					<PostList from="/post/" />
				</div>
				<div className="row">
				    <form className="col s12">
					    <div className="row">
						    <div className="input-field col s12">
							    <i className={this.state.editMode ? "mdi-editor-border-color prefix" : "mdi-content-add-circle prefix"}></i>
							    <input type="text" id="post-content" value={this.state.postInput} onChange={this.handleChange} />
							    <label className="active" htmlFor="post-content">{this.state.label}</label>
						    </div>
					    </div>
				    </form>
				    <button className="btn waves-effect cyan accent-3" type="submit" name="action" onClick={this.handleSend}>Send
					    <i className="mdi-content-send right"></i>
				    </button>
			    </div>
			</div>
		);
	}
});

module.exports = Posts;