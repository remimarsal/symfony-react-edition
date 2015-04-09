'use strict';

var Reflux = require('reflux');

var PostListActions = Reflux.createActions([
	"getPosts",
	"inputChange",
	"sendPost",
	"deletePost",
	"updatePost"
]);

module.exports = PostListActions;