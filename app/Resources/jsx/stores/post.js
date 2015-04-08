'use strict';

var Reflux = require('reflux'),
	PostActions = require('../actions/post'),
	localStorageKey = "post",
	request = require('superagent');

var PostActionStore = Reflux.createStore({
	listenables: [PostActions],

	init: function() {
		var loadedPosts = localStorage.getItem(localStorageKey);

		if (!loadedPosts) {
			this.post = {
				open: true
			};
		} else {
			this.post = _.map(JSON.parse(loadedPosts));
		}
	},

	onRequestForm: function() {
		console.log(Routing.generate('post_new'));

		request.get(Routing.generate('post_new')).end(function(err, res) {
			console.log(JSON.parse(res.text));
		});
	},

	getInitialState: function() {
		return this.post;
	}
});

module.exports = PostActionStore;