'use strict';

var Reflux = require('reflux'),
	PostListActions = require('../actions/postList'),
	request = require('superagent');

var PostListActionStore = Reflux.createStore({
	listenables: [PostListActions],

	init: function() {
		this.postList = {
			url: '/post/',
			posts: [],
			postInput: '',
			editMode: false,
			editPostKey: null,
			label: '',
			labelNewPost: 'Add a new post',
			labelEditPost: 'Edit post'
		};
		this.postList.label = this.postList.labelNewPost;
	},

	onInputChange: function(content) {
		this.postList.postInput = content;
		this.trigger(this.postList);
	},

	onSendPost: function() {
		if (this.postList.postInput.length < 1) {
			return;
		}

		var _this = this;

		if (this.postList.editMode) {
			request.put(this.postList.url+this.postList.editPostKey).send(this.postList.postInput).end(function(err, res) {
				_this.postList.editMode = false;
				_this.postList.editPostKey = null;
				_this.postList.label = _this.postList.labelNewPost;
				PostListActions.getPosts();
			});
		}
		else {
			request.post(this.postList.url).send(this.postList.postInput).end(function(err, res) {
				PostListActions.getPosts();
			});
		}

		this.postList.postInput = '';
		this.trigger(this.postList);
	},

	onGetPosts: function() {
		var _this = this;

		request.get(this.postList.url).end(function(err, res) {
			_this.postList.posts = [];
			_.each(JSON.parse(res.text), function(post) {
				_this.postList.posts.push(post);
			});

			_this.trigger(_this.postList);
		});
	},

	onDeletePost: function(key) {
		request.del(this.postList.url+key).end(function(err, res) {
			PostListActions.getPosts();
		});
	},

	onUpdatePost: function(content, key) {
		if (this.postList.editPostKey === key) {
			this.postList.editMode = false;
			this.postList.editPostKey = null;
			this.postList.postInput = '';
			this.postList.label = this.postList.labelNewPost;
		}
		else {
			this.postList.editMode = true;
			this.postList.editPostKey = key;
			this.postList.postInput = content;
			this.postList.label = this.postList.labelEditPost;
			document.getElementById('post-content').focus();
		}

		this.trigger(this.postList);
	},

	getInitialState: function() {
		return this.postList;
	}
});

module.exports = PostListActionStore;