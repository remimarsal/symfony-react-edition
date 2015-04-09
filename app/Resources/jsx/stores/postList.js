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
			newPost: ''
		};
	},

	onInputChange: function(content) {
		this.postList.newPost = content;
		this.trigger(this.postList);
	},

	onSendPost: function() {
		if (this.postList.newPost.length < 1) {
			return;
		}

		request.post(this.postList.url).send(this.postList.newPost).end(function(err, res) {
			PostListActions.getPosts();
		});

		this.postList.newPost = '';
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
		console.log(this.postList.posts);
		request.del(this.postList.url+key).end(function(err, res) {
			PostListActions.getPosts();
		});
	},

	getInitialState: function() {
		return this.postList;
	}
});

module.exports = PostListActionStore;