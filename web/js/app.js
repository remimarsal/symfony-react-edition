(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"reflux":13}],2:[function(require,module,exports){
'use strict';

var Route = ReactRouter.Route,
	Redirect = ReactRouter.Redirect,
	DefaultRoute = ReactRouter.DefaultRoute,

	App = require('./layout.jsx'),
	Home = require('./pages/home.jsx'),
	Posts = require('./pages/posts.jsx'),
	About = require('./pages/about.jsx');

var AppRoutes = (
	React.createElement(Route, {name: "/", handler: App}, 
		React.createElement(DefaultRoute, {name: "home", handler: Home}), 
		React.createElement(Route, {name: "posts", handler: Posts}), 
		React.createElement(Route, {name: "about", handler: About})
	)
);  

module.exports = AppRoutes;

},{"./layout.jsx":8,"./pages/about.jsx":9,"./pages/home.jsx":10,"./pages/posts.jsx":11}],3:[function(require,module,exports){
'use strict';

var AppRoutes = require('./app-routes.jsx');

// Needed for React Developer Tools
window.React = React;

// Run the ReactRouter
ReactRouter
.create({
	routes: AppRoutes,
	scrollBehavior: ReactRouter.ScrollToTopBehavior
})
.run(function (Handler) {
	   // Whenever the url changes, this callback is called again
	   React.render(React.createElement(Handler, null), document.body);
});

},{"./app-routes.jsx":2}],4:[function(require,module,exports){
'use strict';

var Link = ReactRouter.Link;

var Footer = React.createClass({displayName: "Footer",

	render: function() {

		return (
			React.createElement("footer", {className: "page-footer grey darken-4"}, 
				React.createElement("div", {className: "container"}, 
					React.createElement("div", {className: "row"}, 
						React.createElement("div", {className: "col l6 s12"}, 
							React.createElement("h5", {className: "white-text"}, "Footer Content"), 
							React.createElement("p", {className: "grey-text text-lighten-4"}, "Symfony React Edition.")
						), 
						React.createElement("div", {className: "col l4 offset-l2 s12"}, 
							React.createElement("h5", {className: "white-text"}, "Links"), 
							React.createElement("ul", null, 
								React.createElement("li", null, 
									React.createElement(Link, {to: "home"}, "Home")
								), 
								React.createElement("li", null, 
									React.createElement(Link, {to: "posts"}, "Posts")
								), 
								React.createElement("li", null, 
									React.createElement(Link, {to: "about"}, "About")
								)
							)
						)
					)
				), 
				React.createElement("div", {className: "footer-copyright"}, 
					React.createElement("div", {className: "container"}, 
						"© 2015 Copyright Text"
					)
				)
			)
		);

	}

});

module.exports = Footer;

},{}],5:[function(require,module,exports){
'use strict';

var Link = ReactRouter.Link;

var Header = React.createClass({displayName: "Header",

	componentDidMount: function() {
		$(".button-collapse").sideNav();
	},

	render: function() {

		return (
			React.createElement("header", null, 
				React.createElement("nav", {className: "cyan accent-3"}, 
					React.createElement("div", {className: "nav-wrapper container"}, 
						React.createElement("a", {href: "#", "data-activates": "slide-out", className: "button-collapse"}, React.createElement("i", {className: "mdi-navigation-menu"})), 
						React.createElement(Link, {to: "home", className: "brand-logo"}, "Logo"), 

						React.createElement("ul", {className: "right hide-on-med-and-down"}, 
							React.createElement("li", null, 
								React.createElement(Link, {to: "home"}, "Home")
							), 
							React.createElement("li", null, 
								React.createElement(Link, {to: "posts"}, "Posts")
							), 
							React.createElement("li", null, 
								React.createElement(Link, {to: "about"}, "About")
							)
						)
					)
				)
			)
		);

	}

});

module.exports = Header;


},{}],6:[function(require,module,exports){
'use strict';

var PostListActions = require('../actions/postList');

var Post = React.createClass({displayName: "Post",

	handleDelete: function() {
		PostListActions.deletePost(this.props.id);
	},

	handleUpdate: function() {
		PostListActions.updatePost(this.props.content, this.props.id);
	},

	render: function() {

		return (
			React.createElement("li", {className: "collection-item"}, 
				React.createElement("span", null, this.props.count, " - "), 
				this.props.content, 
				React.createElement("button", {className: "btn-flat secondary-content", name: "delete", onClick: this.handleDelete}, 
				    React.createElement("i", {className: "mdi-action-delete"})
			    ), 
				React.createElement("button", {className: "btn-flat secondary-content", name: "update", onClick: this.handleUpdate}, 
				    React.createElement("i", {className: "mdi-editor-border-color"})
			    )
			)
		);

	}

});

module.exports = Post;


},{"../actions/postList":1}],7:[function(require,module,exports){
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
				React.createElement(Post, {key: posts.length, id: post.id, count: posts.length + 1, content: post.content})
			);
		});

		return (
			React.createElement("ul", {className: "col s12 collection"}, 
				React.createElement("li", {className: "collection-header"}, React.createElement("h4", null, "Posts")), 
				posts
			)
		);

	}

});

module.exports = PostList;


},{"../actions/postList":1,"../stores/postList":12,"./post.jsx":6,"reflux":13}],8:[function(require,module,exports){
'use strict';

var RouteHandler = ReactRouter.RouteHandler,
	Header = require('./components/header.jsx'),
	Footer = require('./components/footer.jsx');

var Layout = React.createClass({displayName: "Layout",

	render : function() {

		return (
			React.createElement("div", null, 
				React.createElement(Header, null), 
				React.createElement("main", {id: "page", className: "container"}, 
					React.createElement(RouteHandler, null)
				), 
				React.createElement(Footer, null)
			)
		);
	}
});

module.exports = Layout;

},{"./components/footer.jsx":4,"./components/header.jsx":5}],9:[function(require,module,exports){
'use strict';

var About = React.createClass({displayName: "About",

	render: function() {

		return (
			React.createElement("div", null, 
				React.createElement("h1", null, "About")
			)
		);

	}

});

module.exports = About;

},{}],10:[function(require,module,exports){
'use strict';

var Home = React.createClass({displayName: "Home",

	render: function() {

		return (
			React.createElement("div", null, 
				React.createElement("h1", null, "Home")
			)
		);

	}

});

module.exports = Home;

},{}],11:[function(require,module,exports){
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
			React.createElement("div", null, 
				React.createElement("div", {className: "row"}, 
					React.createElement(PostList, {from: "/post/"})
				), 
				React.createElement("div", {className: "row"}, 
				    React.createElement("form", {className: "col s12"}, 
					    React.createElement("div", {className: "row"}, 
						    React.createElement("div", {className: "input-field col s12"}, 
							    React.createElement("i", {className: this.state.editMode ? "mdi-editor-border-color prefix" : "mdi-content-add-circle prefix"}), 
							    React.createElement("input", {type: "text", id: "post-content", value: this.state.postInput, onChange: this.handleChange}), 
							    React.createElement("label", {className: "active", htmlFor: "post-content"}, this.state.label)
						    )
					    )
				    ), 
				    React.createElement("button", {className: "btn waves-effect cyan accent-3", type: "submit", name: "action", onClick: this.handleSend}, "Send", 
					    React.createElement("i", {className: "mdi-content-send right"})
				    )
			    )
			)
		);
	}
});

module.exports = Posts;

},{"../actions/postList":1,"../components/postList.jsx":7,"../stores/postList":12,"reflux":13}],12:[function(require,module,exports){
'use strict';

var Reflux = require('reflux'),
	PostListActions = require('../actions/postList'),
	request = require('superagent');

var PostListActionStore = Reflux.createStore({
	listenables: [PostListActions],

	init: function() {
		var url = window.location.href;

		url = url.substring(0, url.indexOf('#'))+'post/';
		this.postList = {
			url: url,
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

},{"../actions/postList":1,"reflux":13,"superagent":33}],13:[function(require,module,exports){
module.exports = require('./src');

},{"./src":27}],14:[function(require,module,exports){
'use strict';

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @returns {Array}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  if (!this._events || !this._events[event]) return [];
  if (this._events[event].fn) return [this._events[event].fn];

  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
    ee[i] = this._events[event][i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  if (!this._events || !this._events[event]) return false;

  var listeners = this._events[event]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true);

  if (!this._events) this._events = {};
  if (!this._events[event]) this._events[event] = listener;
  else {
    if (!this._events[event].fn) this._events[event].push(listener);
    else this._events[event] = [
      this._events[event], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
  if (!this._events || !this._events[event]) return this;

  var listeners = this._events[event]
    , events = [];

  if (fn) {
    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
      events.push(listeners);
    }
    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
        events.push(listeners[i]);
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[event] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[event];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[event];
  else this._events = {};

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the module.
//
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.EventEmitter2 = EventEmitter;
EventEmitter.EventEmitter3 = EventEmitter;

//
// Expose the module.
//
module.exports = EventEmitter;

},{}],15:[function(require,module,exports){
(function (global){
/*! Native Promise Only
    v0.7.8-a (c) Kyle Simpson
    MIT License: http://getify.mit-license.org
*/
!function(t,n,e){n[t]=n[t]||e(),"undefined"!=typeof module&&module.exports?module.exports=n[t]:"function"==typeof define&&define.amd&&define(function(){return n[t]})}("Promise","undefined"!=typeof global?global:this,function(){"use strict";function t(t,n){l.add(t,n),h||(h=y(l.drain))}function n(t){var n,e=typeof t;return null==t||"object"!=e&&"function"!=e||(n=t.then),"function"==typeof n?n:!1}function e(){for(var t=0;t<this.chain.length;t++)o(this,1===this.state?this.chain[t].success:this.chain[t].failure,this.chain[t]);this.chain.length=0}function o(t,e,o){var r,i;try{e===!1?o.reject(t.msg):(r=e===!0?t.msg:e.call(void 0,t.msg),r===o.promise?o.reject(TypeError("Promise-chain cycle")):(i=n(r))?i.call(r,o.resolve,o.reject):o.resolve(r))}catch(c){o.reject(c)}}function r(o){var c,u,a=this;if(!a.triggered){a.triggered=!0,a.def&&(a=a.def);try{(c=n(o))?(u=new f(a),c.call(o,function(){r.apply(u,arguments)},function(){i.apply(u,arguments)})):(a.msg=o,a.state=1,a.chain.length>0&&t(e,a))}catch(s){i.call(u||new f(a),s)}}}function i(n){var o=this;o.triggered||(o.triggered=!0,o.def&&(o=o.def),o.msg=n,o.state=2,o.chain.length>0&&t(e,o))}function c(t,n,e,o){for(var r=0;r<n.length;r++)!function(r){t.resolve(n[r]).then(function(t){e(r,t)},o)}(r)}function f(t){this.def=t,this.triggered=!1}function u(t){this.promise=t,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function a(n){if("function"!=typeof n)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var o=new u(this);this.then=function(n,r){var i={success:"function"==typeof n?n:!0,failure:"function"==typeof r?r:!1};return i.promise=new this.constructor(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");i.resolve=t,i.reject=n}),o.chain.push(i),0!==o.state&&t(e,o),i.promise},this["catch"]=function(t){return this.then(void 0,t)};try{n.call(void 0,function(t){r.call(o,t)},function(t){i.call(o,t)})}catch(c){i.call(o,c)}}var s,h,l,p=Object.prototype.toString,y="undefined"!=typeof setImmediate?function(t){return setImmediate(t)}:setTimeout;try{Object.defineProperty({},"x",{}),s=function(t,n,e,o){return Object.defineProperty(t,n,{value:e,writable:!0,configurable:o!==!1})}}catch(d){s=function(t,n,e){return t[n]=e,t}}l=function(){function t(t,n){this.fn=t,this.self=n,this.next=void 0}var n,e,o;return{add:function(r,i){o=new t(r,i),e?e.next=o:n=o,e=o,o=void 0},drain:function(){var t=n;for(n=e=h=void 0;t;)t.fn.call(t.self),t=t.next}}}();var g=s({},"constructor",a,!1);return a.prototype=g,s(g,"__NPO__",0,!1),s(a,"resolve",function(t){var n=this;return t&&"object"==typeof t&&1===t.__NPO__?t:new n(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");n(t)})}),s(a,"reject",function(t){return new this(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");e(t)})}),s(a,"all",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):0===t.length?n.resolve([]):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");var r=t.length,i=Array(r),f=0;c(n,t,function(t,n){i[t]=n,++f===r&&e(i)},o)})}),s(a,"race",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");c(n,t,function(t,n){e(n)},o)})}),a});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],16:[function(require,module,exports){
/**
 * A module of methods that you want to include in all actions.
 * This module is consumed by `createAction`.
 */
module.exports = {
};

},{}],17:[function(require,module,exports){
exports.createdStores = [];

exports.createdActions = [];

exports.reset = function() {
    while(exports.createdStores.length) {
        exports.createdStores.pop();
    }
    while(exports.createdActions.length) {
        exports.createdActions.pop();
    }
};

},{}],18:[function(require,module,exports){
var _ = require('./utils'),
    maker = require('./joins').instanceJoinCreator;

/**
 * Extract child listenables from a parent from their
 * children property and return them in a keyed Object
 *
 * @param {Object} listenable The parent listenable
 */
var mapChildListenables = function(listenable) {
    var i = 0, children = {}, childName;
    for (;i < (listenable.children||[]).length; ++i) {
        childName = listenable.children[i];
        if(listenable[childName]){
            children[childName] = listenable[childName];
        }
    }
    return children;
};

/**
 * Make a flat dictionary of all listenables including their
 * possible children (recursively), concatenating names in camelCase.
 *
 * @param {Object} listenables The top-level listenables
 */
var flattenListenables = function(listenables) {
    var flattened = {};
    for(var key in listenables){
        var listenable = listenables[key];
        var childMap = mapChildListenables(listenable);

        // recursively flatten children
        var children = flattenListenables(childMap);

        // add the primary listenable and chilren
        flattened[key] = listenable;
        for(var childKey in children){
            var childListenable = children[childKey];
            flattened[key + _.capitalize(childKey)] = childListenable;
        }
    }

    return flattened;
};

/**
 * A module of methods related to listening.
 */
module.exports = {

    /**
     * An internal utility function used by `validateListening`
     *
     * @param {Action|Store} listenable The listenable we want to search for
     * @returns {Boolean} The result of a recursive search among `this.subscriptions`
     */
    hasListener: function(listenable) {
        var i = 0, j, listener, listenables;
        for (;i < (this.subscriptions||[]).length; ++i) {
            listenables = [].concat(this.subscriptions[i].listenable);
            for (j = 0; j < listenables.length; j++){
                listener = listenables[j];
                if (listener === listenable || listener.hasListener && listener.hasListener(listenable)) {
                    return true;
                }
            }
        }
        return false;
    },

    /**
     * A convenience method that listens to all listenables in the given object.
     *
     * @param {Object} listenables An object of listenables. Keys will be used as callback method names.
     */
    listenToMany: function(listenables){
        var allListenables = flattenListenables(listenables);
        for(var key in allListenables){
            var cbname = _.callbackName(key),
                localname = this[cbname] ? cbname : this[key] ? key : undefined;
            if (localname){
                this.listenTo(allListenables[key],localname,this[cbname+"Default"]||this[localname+"Default"]||localname);
            }
        }
    },

    /**
     * Checks if the current context can listen to the supplied listenable
     *
     * @param {Action|Store} listenable An Action or Store that should be
     *  listened to.
     * @returns {String|Undefined} An error message, or undefined if there was no problem.
     */
    validateListening: function(listenable){
        if (listenable === this) {
            return "Listener is not able to listen to itself";
        }
        if (!_.isFunction(listenable.listen)) {
            return listenable + " is missing a listen method";
        }
        if (listenable.hasListener && listenable.hasListener(this)) {
            return "Listener cannot listen to this listenable because of circular loop";
        }
    },

    /**
     * Sets up a subscription to the given listenable for the context object
     *
     * @param {Action|Store} listenable An Action or Store that should be
     *  listened to.
     * @param {Function|String} callback The callback to register as event handler
     * @param {Function|String} defaultCallback The callback to register as default handler
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is the object being listened to
     */
    listenTo: function(listenable, callback, defaultCallback) {
        var desub, unsubscriber, subscriptionobj, subs = this.subscriptions = this.subscriptions || [];
        _.throwIf(this.validateListening(listenable));
        this.fetchInitialState(listenable, defaultCallback);
        desub = listenable.listen(this[callback]||callback, this);
        unsubscriber = function() {
            var index = subs.indexOf(subscriptionobj);
            _.throwIf(index === -1,'Tried to remove listen already gone from subscriptions list!');
            subs.splice(index, 1);
            desub();
        };
        subscriptionobj = {
            stop: unsubscriber,
            listenable: listenable
        };
        subs.push(subscriptionobj);
        return subscriptionobj;
    },

    /**
     * Stops listening to a single listenable
     *
     * @param {Action|Store} listenable The action or store we no longer want to listen to
     * @returns {Boolean} True if a subscription was found and removed, otherwise false.
     */
    stopListeningTo: function(listenable){
        var sub, i = 0, subs = this.subscriptions || [];
        for(;i < subs.length; i++){
            sub = subs[i];
            if (sub.listenable === listenable){
                sub.stop();
                _.throwIf(subs.indexOf(sub)!==-1,'Failed to remove listen from subscriptions list!');
                return true;
            }
        }
        return false;
    },

    /**
     * Stops all subscriptions and empties subscriptions array
     */
    stopListeningToAll: function(){
        var remaining, subs = this.subscriptions || [];
        while((remaining=subs.length)){
            subs[0].stop();
            _.throwIf(subs.length!==remaining-1,'Failed to remove listen from subscriptions list!');
        }
    },

    /**
     * Used in `listenTo`. Fetches initial data from a publisher if it has a `getInitialState` method.
     * @param {Action|Store} listenable The publisher we want to get initial state from
     * @param {Function|String} defaultCallback The method to receive the data
     */
    fetchInitialState: function (listenable, defaultCallback) {
        defaultCallback = (defaultCallback && this[defaultCallback]) || defaultCallback;
        var me = this;
        if (_.isFunction(defaultCallback) && _.isFunction(listenable.getInitialState)) {
            var data = listenable.getInitialState();
            if (data && _.isFunction(data.then)) {
                data.then(function() {
                    defaultCallback.apply(me, arguments);
                });
            } else {
                defaultCallback.call(this, data);
            }
        }
    },

    /**
     * The callback will be called once all listenables have triggered at least once.
     * It will be invoked with the last emission from each listenable.
     * @param {...Publishers} publishers Publishers that should be tracked.
     * @param {Function|String} callback The method to call when all publishers have emitted
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
     */
    joinTrailing: maker("last"),

    /**
     * The callback will be called once all listenables have triggered at least once.
     * It will be invoked with the first emission from each listenable.
     * @param {...Publishers} publishers Publishers that should be tracked.
     * @param {Function|String} callback The method to call when all publishers have emitted
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
     */
    joinLeading: maker("first"),

    /**
     * The callback will be called once all listenables have triggered at least once.
     * It will be invoked with all emission from each listenable.
     * @param {...Publishers} publishers Publishers that should be tracked.
     * @param {Function|String} callback The method to call when all publishers have emitted
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
     */
    joinConcat: maker("all"),

    /**
     * The callback will be called once all listenables have triggered.
     * If a callback triggers twice before that happens, an error is thrown.
     * @param {...Publishers} publishers Publishers that should be tracked.
     * @param {Function|String} callback The method to call when all publishers have emitted
     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
     */
    joinStrict: maker("strict")
};

},{"./joins":28,"./utils":32}],19:[function(require,module,exports){
var _ = require('./utils'),
    ListenerMethods = require('./ListenerMethods');

/**
 * A module meant to be consumed as a mixin by a React component. Supplies the methods from
 * `ListenerMethods` mixin and takes care of teardown of subscriptions.
 * Note that if you're using the `connect` mixin you don't need this mixin, as connect will
 * import everything this mixin contains!
 */
module.exports = _.extend({

    /**
     * Cleans up all listener previously registered.
     */
    componentWillUnmount: ListenerMethods.stopListeningToAll

}, ListenerMethods);

},{"./ListenerMethods":18,"./utils":32}],20:[function(require,module,exports){
var _ = require('./utils');

/**
 * A module of methods for object that you want to be able to listen to.
 * This module is consumed by `createStore` and `createAction`
 */
module.exports = {

    /**
     * Hook used by the publisher that is invoked before emitting
     * and before `shouldEmit`. The arguments are the ones that the action
     * is invoked with. If this function returns something other than
     * undefined, that will be passed on as arguments for shouldEmit and
     * emission.
     */
    preEmit: function() {},

    /**
     * Hook used by the publisher after `preEmit` to determine if the
     * event should be emitted with given arguments. This may be overridden
     * in your application, default implementation always returns true.
     *
     * @returns {Boolean} true if event should be emitted
     */
    shouldEmit: function() { return true; },

    /**
     * Subscribes the given callback for action triggered
     *
     * @param {Function} callback The callback to register as event handler
     * @param {Mixed} [optional] bindContext The context to bind the callback with
     * @returns {Function} Callback that unsubscribes the registered event handler
     */
    listen: function(callback, bindContext) {
        bindContext = bindContext || this;
        var eventHandler = function(args) {
            if (aborted){
                return;
            }
            callback.apply(bindContext, args);
        }, me = this, aborted = false;
        this.emitter.addListener(this.eventLabel, eventHandler);
        return function() {
            aborted = true;
            me.emitter.removeListener(me.eventLabel, eventHandler);
        };
    },

    /**
     * Attach handlers to promise that trigger the completed and failed
     * child publishers, if available.
     *
     * @param {Object} The promise to attach to
     */
    promise: function(promise) {
        var me = this;

        var canHandlePromise =
            this.children.indexOf('completed') >= 0 &&
            this.children.indexOf('failed') >= 0;

        if (!canHandlePromise){
            throw new Error('Publisher must have "completed" and "failed" child publishers');
        }

        promise.then(function(response) {
            return me.completed(response);
        }, function(error) {
            return me.failed(error);
        });
    },

    /**
     * Subscribes the given callback for action triggered, which should
     * return a promise that in turn is passed to `this.promise`
     *
     * @param {Function} callback The callback to register as event handler
     */
    listenAndPromise: function(callback, bindContext) {
        var me = this;
        bindContext = bindContext || this;
        this.willCallPromise = (this.willCallPromise || 0) + 1;

        var removeListen = this.listen(function() {

            if (!callback) {
                throw new Error('Expected a function returning a promise but got ' + callback);
            }

            var args = arguments,
                promise = callback.apply(bindContext, args);
            return me.promise.call(me, promise);
        }, bindContext);

        return function () {
          me.willCallPromise--;
          removeListen.call(me);
        };

    },

    /**
     * Publishes an event using `this.emitter` (if `shouldEmit` agrees)
     */
    trigger: function() {
        var args = arguments,
            pre = this.preEmit.apply(this, args);
        args = pre === undefined ? args : _.isArguments(pre) ? pre : [].concat(pre);
        if (this.shouldEmit.apply(this, args)) {
            this.emitter.emit(this.eventLabel, args);
        }
    },

    /**
     * Tries to publish the event on the next tick
     */
    triggerAsync: function(){
        var args = arguments,me = this;
        _.nextTick(function() {
            me.trigger.apply(me, args);
        });
    },

    /**
     * Returns a Promise for the triggered action
     *
     * @return {Promise}
     *   Resolved by completed child action.
     *   Rejected by failed child action.
     *   If listenAndPromise'd, then promise associated to this trigger.
     *   Otherwise, the promise is for next child action completion.
     */
    triggerPromise: function(){
        var me = this;
        var args = arguments;

        var canHandlePromise =
            this.children.indexOf('completed') >= 0 &&
            this.children.indexOf('failed') >= 0;

        var promise = _.createPromise(function(resolve, reject) {
            // If `listenAndPromise` is listening
            // patch `promise` w/ context-loaded resolve/reject
            if (me.willCallPromise) {
                _.nextTick(function() {
                    var old_promise_method = me.promise;
                    me.promise = function (promise) {
                        promise.then(resolve, reject);
                        // Back to your regularly schedule programming.
                        me.promise = old_promise_method;
                        return me.promise.apply(me, arguments);
                    };
                    me.trigger.apply(me, args);
                });
                return;
            }

            if (canHandlePromise) {
                var removeSuccess = me.completed.listen(function(args) {
                    removeSuccess();
                    removeFailed();
                    resolve(args);
                });

                var removeFailed = me.failed.listen(function(args) {
                    removeSuccess();
                    removeFailed();
                    reject(args);
                });
            }

            me.triggerAsync.apply(me, args);

            if (!canHandlePromise) {
                resolve();
            }
        });

        return promise;
    }
};

},{"./utils":32}],21:[function(require,module,exports){
/**
 * A module of methods that you want to include in all stores.
 * This module is consumed by `createStore`.
 */
module.exports = {
};

},{}],22:[function(require,module,exports){
module.exports = function(store, definition) {
  for (var name in definition) {
    if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(definition, name);

        if (!propertyDescriptor.value || typeof propertyDescriptor.value !== 'function' || !definition.hasOwnProperty(name)) {
            continue;
        }

        store[name] = definition[name].bind(store);
    } else {
        var property = definition[name];

        if (typeof property !== 'function' || !definition.hasOwnProperty(name)) {
            continue;
        }

        store[name] = property.bind(store);
    }
  }

  return store;
};

},{}],23:[function(require,module,exports){
var Reflux = require('./index'),
    _ = require('./utils');

module.exports = function(listenable,key){
    return {
        getInitialState: function(){
            if (!_.isFunction(listenable.getInitialState)) {
                return {};
            } else if (key === undefined) {
                return listenable.getInitialState();
            } else {
                return _.object([key],[listenable.getInitialState()]);
            }
        },
        componentDidMount: function(){
            _.extend(this,Reflux.ListenerMethods);
            var me = this, cb = (key === undefined ? this.setState : function(v){me.setState(_.object([key],[v]));});
            this.listenTo(listenable,cb);
        },
        componentWillUnmount: Reflux.ListenerMixin.componentWillUnmount
    };
};

},{"./index":27,"./utils":32}],24:[function(require,module,exports){
var Reflux = require('./index'),
  _ = require('./utils');

module.exports = function(listenable, key, filterFunc) {
    filterFunc = _.isFunction(key) ? key : filterFunc;
    return {
        getInitialState: function() {
            if (!_.isFunction(listenable.getInitialState)) {
                return {};
            } else if (_.isFunction(key)) {
                return filterFunc.call(this, listenable.getInitialState());
            } else {
                // Filter initial payload from store.
                var result = filterFunc.call(this, listenable.getInitialState());
                if (result) {
                  return _.object([key], [result]);
                } else {
                  return {};
                }
            }
        },
        componentDidMount: function() {
            _.extend(this, Reflux.ListenerMethods);
            var me = this;
            var cb = function(value) {
                if (_.isFunction(key)) {
                    me.setState(filterFunc.call(me, value));
                } else {
                    var result = filterFunc.call(me, value);
                    me.setState(_.object([key], [result]));
                }
            };

            this.listenTo(listenable, cb);
        },
        componentWillUnmount: Reflux.ListenerMixin.componentWillUnmount
    };
};


},{"./index":27,"./utils":32}],25:[function(require,module,exports){
var _ = require('./utils'),
    Reflux = require('./index'),
    Keep = require('./Keep'),
    allowed = {preEmit:1,shouldEmit:1};

/**
 * Creates an action functor object. It is mixed in with functions
 * from the `PublisherMethods` mixin. `preEmit` and `shouldEmit` may
 * be overridden in the definition object.
 *
 * @param {Object} definition The action object definition
 */
var createAction = function(definition) {

    definition = definition || {};
    if (!_.isObject(definition)){
        definition = {actionName: definition};
    }

    for(var a in Reflux.ActionMethods){
        if (!allowed[a] && Reflux.PublisherMethods[a]) {
            throw new Error("Cannot override API method " + a +
                " in Reflux.ActionMethods. Use another method name or override it on Reflux.PublisherMethods instead."
            );
        }
    }

    for(var d in definition){
        if (!allowed[d] && Reflux.PublisherMethods[d]) {
            throw new Error("Cannot override API method " + d +
                " in action creation. Use another method name or override it on Reflux.PublisherMethods instead."
            );
        }
    }

    definition.children = definition.children || [];
    if (definition.asyncResult){
        definition.children = definition.children.concat(["completed","failed"]);
    }

    var i = 0, childActions = {};
    for (; i < definition.children.length; i++) {
        var name = definition.children[i];
        childActions[name] = createAction(name);
    }

    var context = _.extend({
        eventLabel: "action",
        emitter: new _.EventEmitter(),
        _isAction: true
    }, Reflux.PublisherMethods, Reflux.ActionMethods, definition);

    var functor = function() {
        return functor[functor.sync?"trigger":"triggerPromise"].apply(functor, arguments);
    };

    _.extend(functor,childActions,context);

    Keep.createdActions.push(functor);

    return functor;

};

module.exports = createAction;

},{"./Keep":17,"./index":27,"./utils":32}],26:[function(require,module,exports){
var _ = require('./utils'),
    Reflux = require('./index'),
    Keep = require('./Keep'),
    mixer = require('./mixer'),
    allowed = {preEmit:1,shouldEmit:1},
    bindMethods = require('./bindMethods');

/**
 * Creates an event emitting Data Store. It is mixed in with functions
 * from the `ListenerMethods` and `PublisherMethods` mixins. `preEmit`
 * and `shouldEmit` may be overridden in the definition object.
 *
 * @param {Object} definition The data store object definition
 * @returns {Store} A data store instance
 */
module.exports = function(definition) {

    definition = definition || {};

    for(var a in Reflux.StoreMethods){
        if (!allowed[a] && (Reflux.PublisherMethods[a] || Reflux.ListenerMethods[a])){
            throw new Error("Cannot override API method " + a +
                " in Reflux.StoreMethods. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead."
            );
        }
    }

    for(var d in definition){
        if (!allowed[d] && (Reflux.PublisherMethods[d] || Reflux.ListenerMethods[d])){
            throw new Error("Cannot override API method " + d +
                " in store creation. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead."
            );
        }
    }

    definition = mixer(definition);

    function Store() {
        var i=0, arr;
        this.subscriptions = [];
        this.emitter = new _.EventEmitter();
        this.eventLabel = "change";
        bindMethods(this, definition);
        if (this.init && _.isFunction(this.init)) {
            this.init();
        }
        if (this.listenables){
            arr = [].concat(this.listenables);
            for(;i < arr.length;i++){
                this.listenToMany(arr[i]);
            }
        }
    }

    _.extend(Store.prototype, Reflux.ListenerMethods, Reflux.PublisherMethods, Reflux.StoreMethods, definition);

    var store = new Store();
    Keep.createdStores.push(store);

    return store;
};

},{"./Keep":17,"./bindMethods":22,"./index":27,"./mixer":31,"./utils":32}],27:[function(require,module,exports){
exports.ActionMethods = require('./ActionMethods');

exports.ListenerMethods = require('./ListenerMethods');

exports.PublisherMethods = require('./PublisherMethods');

exports.StoreMethods = require('./StoreMethods');

exports.createAction = require('./createAction');

exports.createStore = require('./createStore');

exports.connect = require('./connect');

exports.connectFilter = require('./connectFilter');

exports.ListenerMixin = require('./ListenerMixin');

exports.listenTo = require('./listenTo');

exports.listenToMany = require('./listenToMany');


var maker = require('./joins').staticJoinCreator;

exports.joinTrailing = exports.all = maker("last"); // Reflux.all alias for backward compatibility

exports.joinLeading = maker("first");

exports.joinStrict = maker("strict");

exports.joinConcat = maker("all");

var _ = require('./utils');

exports.EventEmitter = _.EventEmitter;

exports.Promise = _.Promise;

/**
 * Convenience function for creating a set of actions
 *
 * @param definitions the definitions for the actions to be created
 * @returns an object with actions of corresponding action names
 */
exports.createActions = function(definitions) {
    var actions = {};
    for (var k in definitions){
        if (definitions.hasOwnProperty(k)) {
            var val = definitions[k],
                actionName = _.isObject(val) ? k : val;

            actions[actionName] = exports.createAction(val);
        }
    }
    return actions;
};

/**
 * Sets the eventmitter that Reflux uses
 */
exports.setEventEmitter = function(ctx) {
    var _ = require('./utils');
    exports.EventEmitter = _.EventEmitter = ctx;
};


/**
 * Sets the Promise library that Reflux uses
 */
exports.setPromise = function(ctx) {
    var _ = require('./utils');
    exports.Promise = _.Promise = ctx;
};


/**
 * Sets the Promise factory that creates new promises
 * @param {Function} factory has the signature `function(resolver) { return [new Promise]; }`
 */
exports.setPromiseFactory = function(factory) {
    var _ = require('./utils');
    _.createPromise = factory;
};


/**
 * Sets the method used for deferring actions and stores
 */
exports.nextTick = function(nextTick) {
    var _ = require('./utils');
    _.nextTick = nextTick;
};

/**
 * Provides the set of created actions and stores for introspection
 */
exports.__keep = require('./Keep');

/**
 * Warn if Function.prototype.bind not available
 */
if (!Function.prototype.bind) {
  console.error(
    'Function.prototype.bind not available. ' +
    'ES5 shim required. ' +
    'https://github.com/spoike/refluxjs#es5'
  );
}

},{"./ActionMethods":16,"./Keep":17,"./ListenerMethods":18,"./ListenerMixin":19,"./PublisherMethods":20,"./StoreMethods":21,"./connect":23,"./connectFilter":24,"./createAction":25,"./createStore":26,"./joins":28,"./listenTo":29,"./listenToMany":30,"./utils":32}],28:[function(require,module,exports){
/**
 * Internal module used to create static and instance join methods
 */

var slice = Array.prototype.slice,
    _ = require("./utils"),
    createStore = require("./createStore"),
    strategyMethodNames = {
        strict: "joinStrict",
        first: "joinLeading",
        last: "joinTrailing",
        all: "joinConcat"
    };

/**
 * Used in `index.js` to create the static join methods
 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
 * @returns {Function} A static function which returns a store with a join listen on the given listenables using the given strategy
 */
exports.staticJoinCreator = function(strategy){
    return function(/* listenables... */) {
        var listenables = slice.call(arguments);
        return createStore({
            init: function(){
                this[strategyMethodNames[strategy]].apply(this,listenables.concat("triggerAsync"));
            }
        });
    };
};

/**
 * Used in `ListenerMethods.js` to create the instance join methods
 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
 * @returns {Function} An instance method which sets up a join listen on the given listenables using the given strategy
 */
exports.instanceJoinCreator = function(strategy){
    return function(/* listenables..., callback*/){
        _.throwIf(arguments.length < 3,'Cannot create a join with less than 2 listenables!');
        var listenables = slice.call(arguments),
            callback = listenables.pop(),
            numberOfListenables = listenables.length,
            join = {
                numberOfListenables: numberOfListenables,
                callback: this[callback]||callback,
                listener: this,
                strategy: strategy
            }, i, cancels = [], subobj;
        for (i = 0; i < numberOfListenables; i++) {
            _.throwIf(this.validateListening(listenables[i]));
        }
        for (i = 0; i < numberOfListenables; i++) {
            cancels.push(listenables[i].listen(newListener(i,join),this));
        }
        reset(join);
        subobj = {listenable: listenables};
        subobj.stop = makeStopper(subobj,cancels,this);
        this.subscriptions = (this.subscriptions || []).concat(subobj);
        return subobj;
    };
};

// ---- internal join functions ----

function makeStopper(subobj,cancels,context){
    return function() {
        var i, subs = context.subscriptions,
            index = (subs ? subs.indexOf(subobj) : -1);
        _.throwIf(index === -1,'Tried to remove join already gone from subscriptions list!');
        for(i=0;i < cancels.length; i++){
            cancels[i]();
        }
        subs.splice(index, 1);
    };
}

function reset(join) {
    join.listenablesEmitted = new Array(join.numberOfListenables);
    join.args = new Array(join.numberOfListenables);
}

function newListener(i,join) {
    return function() {
        var callargs = slice.call(arguments);
        if (join.listenablesEmitted[i]){
            switch(join.strategy){
                case "strict": throw new Error("Strict join failed because listener triggered twice.");
                case "last": join.args[i] = callargs; break;
                case "all": join.args[i].push(callargs);
            }
        } else {
            join.listenablesEmitted[i] = true;
            join.args[i] = (join.strategy==="all"?[callargs]:callargs);
        }
        emitIfAllListenablesEmitted(join);
    };
}

function emitIfAllListenablesEmitted(join) {
    for (var i = 0; i < join.numberOfListenables; i++) {
        if (!join.listenablesEmitted[i]) {
            return;
        }
    }
    join.callback.apply(join.listener,join.args);
    reset(join);
}

},{"./createStore":26,"./utils":32}],29:[function(require,module,exports){
var Reflux = require('./index');


/**
 * A mixin factory for a React component. Meant as a more convenient way of using the `ListenerMixin`,
 * without having to manually set listeners in the `componentDidMount` method.
 *
 * @param {Action|Store} listenable An Action or Store that should be
 *  listened to.
 * @param {Function|String} callback The callback to register as event handler
 * @param {Function|String} defaultCallback The callback to register as default handler
 * @returns {Object} An object to be used as a mixin, which sets up the listener for the given listenable.
 */
module.exports = function(listenable,callback,initial){
    return {
        /**
         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
         * and then make the call to `listenTo` with the arguments provided to the factory function
         */
        componentDidMount: function() {
            for(var m in Reflux.ListenerMethods){
                if (this[m] !== Reflux.ListenerMethods[m]){
                    if (this[m]){
                        throw "Can't have other property '"+m+"' when using Reflux.listenTo!";
                    }
                    this[m] = Reflux.ListenerMethods[m];
                }
            }
            this.listenTo(listenable,callback,initial);
        },
        /**
         * Cleans up all listener previously registered.
         */
        componentWillUnmount: Reflux.ListenerMethods.stopListeningToAll
    };
};

},{"./index":27}],30:[function(require,module,exports){
var Reflux = require('./index');

/**
 * A mixin factory for a React component. Meant as a more convenient way of using the `listenerMixin`,
 * without having to manually set listeners in the `componentDidMount` method. This version is used
 * to automatically set up a `listenToMany` call.
 *
 * @param {Object} listenables An object of listenables
 * @returns {Object} An object to be used as a mixin, which sets up the listeners for the given listenables.
 */
module.exports = function(listenables){
    return {
        /**
         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
         * and then make the call to `listenTo` with the arguments provided to the factory function
         */
        componentDidMount: function() {
            for(var m in Reflux.ListenerMethods){
                if (this[m] !== Reflux.ListenerMethods[m]){
                    if (this[m]){
                        throw "Can't have other property '"+m+"' when using Reflux.listenToMany!";
                    }
                    this[m] = Reflux.ListenerMethods[m];
                }
            }
            this.listenToMany(listenables);
        },
        /**
         * Cleans up all listener previously registered.
         */
        componentWillUnmount: Reflux.ListenerMethods.stopListeningToAll
    };
};

},{"./index":27}],31:[function(require,module,exports){
var _ = require('./utils');

module.exports = function mix(def) {
    var composed = {
        init: [],
        preEmit: [],
        shouldEmit: []
    };

    var updated = (function mixDef(mixin) {
        var mixed = {};
        if (mixin.mixins) {
            mixin.mixins.forEach(function (subMixin) {
                _.extend(mixed, mixDef(subMixin));
            });
        }
        _.extend(mixed, mixin);
        Object.keys(composed).forEach(function (composable) {
            if (mixin.hasOwnProperty(composable)) {
                composed[composable].push(mixin[composable]);
            }
        });
        return mixed;
    }(def));

    if (composed.init.length > 1) {
        updated.init = function () {
            var args = arguments;
            composed.init.forEach(function (init) {
                init.apply(this, args);
            }, this);
        };
    }
    if (composed.preEmit.length > 1) {
        updated.preEmit = function () {
            return composed.preEmit.reduce(function (args, preEmit) {
                var newValue = preEmit.apply(this, args);
                return newValue === undefined ? args : [newValue];
            }.bind(this), arguments);
        };
    }
    if (composed.shouldEmit.length > 1) {
        updated.shouldEmit = function () {
            var args = arguments;
            return !composed.shouldEmit.some(function (shouldEmit) {
                return !shouldEmit.apply(this, args);
            }, this);
        };
    }
    Object.keys(composed).forEach(function (composable) {
        if (composed[composable].length === 1) {
            updated[composable] = composed[composable][0];
        }
    });

    return updated;
};

},{"./utils":32}],32:[function(require,module,exports){
/*
 * isObject, extend, isFunction, isArguments are taken from undescore/lodash in
 * order to remove the dependency
 */
var isObject = exports.isObject = function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
};

exports.extend = function(obj) {
    if (!isObject(obj)) {
        return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
        source = arguments[i];
        for (prop in source) {
            if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
                var propertyDescriptor = Object.getOwnPropertyDescriptor(source, prop);
                Object.defineProperty(obj, prop, propertyDescriptor);
            } else {
                obj[prop] = source[prop];
            }
        }
    }
    return obj;
};

exports.isFunction = function(value) {
    return typeof value === 'function';
};

exports.EventEmitter = require('eventemitter3');

exports.nextTick = function(callback) {
    setTimeout(callback, 0);
};

exports.capitalize = function(string){
    return string.charAt(0).toUpperCase()+string.slice(1);
};

exports.callbackName = function(string){
    return "on"+exports.capitalize(string);
};

exports.object = function(keys,vals){
    var o={}, i=0;
    for(;i<keys.length;i++){
        o[keys[i]] = vals[i];
    }
    return o;
};

exports.Promise = require("native-promise-only");

exports.createPromise = function(resolver) {
    return new exports.Promise(resolver);
};

exports.isArguments = function(value) {
    return typeof value === 'object' && ('callee' in value) && typeof value.length === 'number';
};

exports.throwIf = function(val,msg){
    if (val){
        throw Error(msg||val);
    }
};

},{"eventemitter3":14,"native-promise-only":15}],33:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var reduce = require('reduce');

/**
 * Root reference for iframes.
 */

var root = 'undefined' == typeof window
  ? this
  : window;

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
    && ('file:' != root.location.protocol || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(obj[key]));
    }
  }
  return pairs.join('&');
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  var type = status / 100 | 0;

  // status / class
  this.status = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status || 1223 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      return self.callback(err);
    }

    self.emit('response', res);

    if (err) {
      return self.callback(err, res);
    }

    if (res.status >= 200 && res.status < 300) {
      return self.callback(err, res);
    }

    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
    new_err.original = err;
    new_err.response = res;
    new_err.status = res.status;

    self.callback(err || new_err, res);
  });
}

/**
 * Mixin `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Allow for extension
 */

Request.prototype.use = function(fn) {
  fn(this);
  return this;
}

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.timeout = function(ms){
  this._timeout = ms;
  return this;
};

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.clearTimeout = function(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set header `field` to `val`, or multiple fields with one object.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Get case-insensitive header `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api private
 */

Request.prototype.getHeader = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass){
  var str = btoa(user + ':' + pass);
  this.set('Authorization', 'Basic ' + str);
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.field = function(name, val){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(name, val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(field, file, filename);
  return this;
};

/**
 * Send `data`, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // querystring
 *       request.get('/search')
 *         .end(callback)
 *
 *       // multiple data "writes"
 *       request.get('/search')
 *         .send({ search: 'query' })
 *         .send({ range: '1..5' })
 *         .send({ order: 'desc' })
 *         .end(callback)
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"})
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this.getHeader('Content-Type');

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this.getHeader('Content-Type');
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || isHost(data)) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
  err.crossDomain = true;
  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self.timeoutError();
      if (self.aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = function(e){
        e.percent = e.loaded / e.total * 100;
        self.emit('progress', e);
      };
    }
  } catch(e) {
    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
    // Reported here:
    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  xhr.open(this.method, this.url, true);

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var serialize = request.serialize[this.getHeader('Content-Type')];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  this.emit('request', this);
  xhr.send(data);
  return this;
};

/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(method, url) {
  // callback
  if ('function' == typeof url) {
    return new Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new Request('GET', method);
  }

  return new Request(method, url);
}

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.del = function(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * Expose `request`.
 */

module.exports = request;

},{"emitter":34,"reduce":35}],34:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],35:[function(require,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQ3JlYXRpdmVcXEFwcERhdGFcXFJvYW1pbmdcXG5wbVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxcYWN0aW9uc1xccG9zdExpc3QuanMiLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxcYXBwLXJvdXRlcy5qc3giLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxcYXBwLmpzeCIsIkQ6XFxEZXZcXHdhbXBcXHd3d1xcc3ltZm9ueS1yZWFjdC1lZGl0aW9uXFxhcHBcXFJlc291cmNlc1xcanN4XFxjb21wb25lbnRzXFxmb290ZXIuanN4IiwiRDpcXERldlxcd2FtcFxcd3d3XFxzeW1mb255LXJlYWN0LWVkaXRpb25cXGFwcFxcUmVzb3VyY2VzXFxqc3hcXGNvbXBvbmVudHNcXGhlYWRlci5qc3giLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxcY29tcG9uZW50c1xccG9zdC5qc3giLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxcY29tcG9uZW50c1xccG9zdExpc3QuanN4IiwiRDpcXERldlxcd2FtcFxcd3d3XFxzeW1mb255LXJlYWN0LWVkaXRpb25cXGFwcFxcUmVzb3VyY2VzXFxqc3hcXGxheW91dC5qc3giLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxccGFnZXNcXGFib3V0LmpzeCIsIkQ6XFxEZXZcXHdhbXBcXHd3d1xcc3ltZm9ueS1yZWFjdC1lZGl0aW9uXFxhcHBcXFJlc291cmNlc1xcanN4XFxwYWdlc1xcaG9tZS5qc3giLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxccGFnZXNcXHBvc3RzLmpzeCIsIkQ6XFxEZXZcXHdhbXBcXHd3d1xcc3ltZm9ueS1yZWFjdC1lZGl0aW9uXFxhcHBcXFJlc291cmNlc1xcanN4XFxzdG9yZXNcXHBvc3RMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXguanMiLCJub2RlX21vZHVsZXNcXHJlZmx1eFxcbm9kZV9tb2R1bGVzXFxuYXRpdmUtcHJvbWlzZS1vbmx5XFxucG8uanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9BY3Rpb25NZXRob2RzLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvS2VlcC5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL0xpc3RlbmVyTWV0aG9kcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL0xpc3RlbmVyTWl4aW4uanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9QdWJsaXNoZXJNZXRob2RzLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvU3RvcmVNZXRob2RzLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvYmluZE1ldGhvZHMuanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9jb25uZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvY29ubmVjdEZpbHRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL2NyZWF0ZUFjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL2NyZWF0ZVN0b3JlLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9qb2lucy5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL2xpc3RlblRvLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvbGlzdGVuVG9NYW55LmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvbWl4ZXIuanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvcmVkdWNlLWNvbXBvbmVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRS9CLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7Q0FDMUMsVUFBVTtDQUNWLGFBQWE7Q0FDYixVQUFVO0NBQ1YsWUFBWTtDQUNaLFlBQVk7QUFDYixDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWU7OztBQ1poQyxZQUFZLENBQUM7O0FBRWIsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUs7Q0FDNUIsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRO0FBQ2hDLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZOztDQUV2QyxHQUFHLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQztDQUM3QixJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO0NBQ2xDLEtBQUssR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUM7QUFDckMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7O0FBRXRDLElBQUksU0FBUztDQUNaLG9CQUFDLEtBQUssRUFB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4Jyk7XHJcblxyXG52YXIgUG9zdExpc3RBY3Rpb25zID0gUmVmbHV4LmNyZWF0ZUFjdGlvbnMoW1xyXG5cdFwiZ2V0UG9zdHNcIixcclxuXHRcImlucHV0Q2hhbmdlXCIsXHJcblx0XCJzZW5kUG9zdFwiLFxyXG5cdFwiZGVsZXRlUG9zdFwiLFxyXG5cdFwidXBkYXRlUG9zdFwiXHJcbl0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3N0TGlzdEFjdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJvdXRlID0gUmVhY3RSb3V0ZXIuUm91dGUsXHJcblx0UmVkaXJlY3QgPSBSZWFjdFJvdXRlci5SZWRpcmVjdCxcclxuXHREZWZhdWx0Um91dGUgPSBSZWFjdFJvdXRlci5EZWZhdWx0Um91dGUsXHJcblxyXG5cdEFwcCA9IHJlcXVpcmUoJy4vbGF5b3V0LmpzeCcpLFxyXG5cdEhvbWUgPSByZXF1aXJlKCcuL3BhZ2VzL2hvbWUuanN4JyksXHJcblx0UG9zdHMgPSByZXF1aXJlKCcuL3BhZ2VzL3Bvc3RzLmpzeCcpLFxyXG5cdEFib3V0ID0gcmVxdWlyZSgnLi9wYWdlcy9hYm91dC5qc3gnKTtcclxuXHJcbnZhciBBcHBSb3V0ZXMgPSAoXHJcblx0PFJvdXRlIG5hbWU9XCIvXCIgaGFuZGxlcj17QXBwfT5cclxuXHRcdDxEZWZhdWx0Um91dGUgbmFtZT1cImhvbWVcIiBoYW5kbGVyPXtIb21lfSAvPlxyXG5cdFx0PFJvdXRlIG5hbWU9XCJwb3N0c1wiIGhhbmRsZXI9e1Bvc3RzfSAvPlxyXG5cdFx0PFJvdXRlIG5hbWU9XCJhYm91dFwiIGhhbmRsZXI9e0Fib3V0fSAvPlxyXG5cdDwvUm91dGU+XHJcbik7ICBcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXBwUm91dGVzOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBBcHBSb3V0ZXMgPSByZXF1aXJlKCcuL2FwcC1yb3V0ZXMuanN4Jyk7XHJcblxyXG4vLyBOZWVkZWQgZm9yIFJlYWN0IERldmVsb3BlciBUb29sc1xyXG53aW5kb3cuUmVhY3QgPSBSZWFjdDtcclxuXHJcbi8vIFJ1biB0aGUgUmVhY3RSb3V0ZXJcclxuUmVhY3RSb3V0ZXJcclxuLmNyZWF0ZSh7XHJcblx0cm91dGVzOiBBcHBSb3V0ZXMsXHJcblx0c2Nyb2xsQmVoYXZpb3I6IFJlYWN0Um91dGVyLlNjcm9sbFRvVG9wQmVoYXZpb3JcclxufSlcclxuLnJ1bihmdW5jdGlvbiAoSGFuZGxlcikge1xyXG5cdCAgIC8vIFdoZW5ldmVyIHRoZSB1cmwgY2hhbmdlcywgdGhpcyBjYWxsYmFjayBpcyBjYWxsZWQgYWdhaW5cclxuXHQgICBSZWFjdC5yZW5kZXIoPEhhbmRsZXIgLz4sIGRvY3VtZW50LmJvZHkpO1xyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgTGluayA9IFJlYWN0Um91dGVyLkxpbms7XHJcblxyXG52YXIgRm9vdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkZvb3RlclwiLFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxmb290ZXIgY2xhc3NOYW1lPVwicGFnZS1mb290ZXIgZ3JleSBkYXJrZW4tNFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbCBsNiBzMTJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aDUgY2xhc3NOYW1lPVwid2hpdGUtdGV4dFwiPkZvb3RlciBDb250ZW50PC9oNT5cclxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJncmV5LXRleHQgdGV4dC1saWdodGVuLTRcIj5TeW1mb255IFJlYWN0IEVkaXRpb24uPC9wPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wgbDQgb2Zmc2V0LWwyIHMxMlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNSBjbGFzc05hbWU9XCJ3aGl0ZS10ZXh0XCI+TGlua3M8L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDx1bD5cclxuXHRcdFx0XHRcdFx0XHRcdDxsaT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PExpbmsgdG89XCJob21lXCI+SG9tZTwvTGluaz5cclxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxMaW5rIHRvPVwicG9zdHNcIj5Qb3N0czwvTGluaz5cclxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxMaW5rIHRvPVwiYWJvdXRcIj5BYm91dDwvTGluaz5cclxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0PC91bD5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvb3Rlci1jb3B5cmlnaHRcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdMKpIDIwMTUgQ29weXJpZ2h0IFRleHRcclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Zvb3Rlcj5cclxuXHRcdCk7XHJcblxyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIExpbmsgPSBSZWFjdFJvdXRlci5MaW5rO1xyXG5cclxudmFyIEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0JChcIi5idXR0b24tY29sbGFwc2VcIikuc2lkZU5hdigpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGhlYWRlcj5cclxuXHRcdFx0XHQ8bmF2IGNsYXNzTmFtZT1cImN5YW4gYWNjZW50LTNcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibmF2LXdyYXBwZXIgY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdDxhIGhyZWY9XCIjXCIgZGF0YS1hY3RpdmF0ZXM9XCJzbGlkZS1vdXRcIiBjbGFzc05hbWU9XCJidXR0b24tY29sbGFwc2VcIj48aSBjbGFzc05hbWU9XCJtZGktbmF2aWdhdGlvbi1tZW51XCI+PC9pPjwvYT5cclxuXHRcdFx0XHRcdFx0PExpbmsgdG89XCJob21lXCIgY2xhc3NOYW1lPVwiYnJhbmQtbG9nb1wiPkxvZ288L0xpbms+XHJcblxyXG5cdFx0XHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cIj5cclxuXHRcdFx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdFx0XHQ8TGluayB0bz1cImhvbWVcIj5Ib21lPC9MaW5rPlxyXG5cdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHRcdFx0PExpbmsgdG89XCJwb3N0c1wiPlBvc3RzPC9MaW5rPlxyXG5cdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHRcdFx0PExpbmsgdG89XCJhYm91dFwiPkFib3V0PC9MaW5rPlxyXG5cdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdDwvdWw+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L25hdj5cclxuXHRcdFx0PC9oZWFkZXI+XHJcblx0XHQpO1xyXG5cclxuXHR9XHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUG9zdExpc3RBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9wb3N0TGlzdCcpO1xyXG5cclxudmFyIFBvc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG5cdGhhbmRsZURlbGV0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRQb3N0TGlzdEFjdGlvbnMuZGVsZXRlUG9zdCh0aGlzLnByb3BzLmlkKTtcclxuXHR9LFxyXG5cclxuXHRoYW5kbGVVcGRhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0UG9zdExpc3RBY3Rpb25zLnVwZGF0ZVBvc3QodGhpcy5wcm9wcy5jb250ZW50LCB0aGlzLnByb3BzLmlkKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxsaSBjbGFzc05hbWU9XCJjb2xsZWN0aW9uLWl0ZW1cIj5cclxuXHRcdFx0XHQ8c3Bhbj57dGhpcy5wcm9wcy5jb3VudH0gLSA8L3NwYW4+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuY29udGVudH1cclxuXHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1mbGF0IHNlY29uZGFyeS1jb250ZW50XCIgbmFtZT1cImRlbGV0ZVwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGVsZXRlfT5cclxuXHRcdFx0XHQgICAgPGkgY2xhc3NOYW1lPVwibWRpLWFjdGlvbi1kZWxldGVcIj48L2k+XHJcblx0XHRcdCAgICA8L2J1dHRvbj5cclxuXHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1mbGF0IHNlY29uZGFyeS1jb250ZW50XCIgbmFtZT1cInVwZGF0ZVwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVXBkYXRlfT5cclxuXHRcdFx0XHQgICAgPGkgY2xhc3NOYW1lPVwibWRpLWVkaXRvci1ib3JkZXItY29sb3JcIj48L2k+XHJcblx0XHRcdCAgICA8L2J1dHRvbj5cclxuXHRcdFx0PC9saT5cclxuXHRcdCk7XHJcblxyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3N0O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4JyksXHJcblx0UG9zdExpc3RBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9wb3N0TGlzdCcpLFxyXG5cdHBvc3RMaXN0QWN0aW9uU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvcG9zdExpc3QnKSxcclxuXHRQb3N0ID0gcmVxdWlyZSgnLi9wb3N0LmpzeCcpO1xyXG5cclxudmFyIFBvc3RMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlBvc3RMaXN0XCIsXHJcblx0bWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QocG9zdExpc3RBY3Rpb25TdG9yZSldLFxyXG5cclxuXHRjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0UG9zdExpc3RBY3Rpb25zLmdldFBvc3RzKCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXIgcG9zdHMgPSBbXTtcclxuXHJcblx0XHRfLmVhY2godGhpcy5zdGF0ZS5wb3N0cywgZnVuY3Rpb24ocG9zdCkge1xyXG5cdFx0XHRwb3N0cy5wdXNoKFxyXG5cdFx0XHRcdDxQb3N0IGtleT17cG9zdHMubGVuZ3RofSBpZD17cG9zdC5pZH0gY291bnQ9e3Bvc3RzLmxlbmd0aCArIDF9IGNvbnRlbnQ9e3Bvc3QuY29udGVudH0gLz5cclxuXHRcdFx0KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDx1bCBjbGFzc05hbWU9XCJjb2wgczEyIGNvbGxlY3Rpb25cIj5cclxuXHRcdFx0XHQ8bGkgY2xhc3NOYW1lPVwiY29sbGVjdGlvbi1oZWFkZXJcIj48aDQ+UG9zdHM8L2g0PjwvbGk+XHJcblx0XHRcdFx0e3Bvc3RzfVxyXG5cdFx0XHQ8L3VsPlxyXG5cdFx0KTtcclxuXHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RMaXN0O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUm91dGVIYW5kbGVyID0gUmVhY3RSb3V0ZXIuUm91dGVIYW5kbGVyLFxyXG5cdEhlYWRlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9oZWFkZXIuanN4JyksXHJcblx0Rm9vdGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2Zvb3Rlci5qc3gnKTtcclxuXHJcbnZhciBMYXlvdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTGF5b3V0XCIsXHJcblxyXG5cdHJlbmRlciA6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PEhlYWRlciAvPlxyXG5cdFx0XHRcdDxtYWluIGlkPVwicGFnZVwiIGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdFx0PFJvdXRlSGFuZGxlciAvPlxyXG5cdFx0XHRcdDwvbWFpbj5cclxuXHRcdFx0XHQ8Rm9vdGVyIC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXQ7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIEFib3V0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkFib3V0XCIsXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8aDE+QWJvdXQ8L2gxPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblxyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBYm91dDsiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgSG9tZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJIb21lXCIsXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8aDE+SG9tZTwvaDE+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWU7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJlZmx1eCA9IHJlcXVpcmUoJ3JlZmx1eCcpLFxyXG5cdFBvc3RMaXN0QWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvcG9zdExpc3QnKSxcclxuXHRwb3N0TGlzdEFjdGlvblN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL3Bvc3RMaXN0JyksXHJcblx0UG9zdExpc3QgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3Bvc3RMaXN0LmpzeCcpO1xyXG5cclxudmFyIFBvc3RzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlBvc3RzXCIsXHJcblx0bWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QocG9zdExpc3RBY3Rpb25TdG9yZSldLFxyXG5cclxuXHRoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtwb3N0SW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0pO1xyXG5cdFx0UG9zdExpc3RBY3Rpb25zLmlucHV0Q2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlU2VuZDogZnVuY3Rpb24oKSB7XHJcblx0XHRQb3N0TGlzdEFjdGlvbnMuc2VuZFBvc3QoKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0PFBvc3RMaXN0IGZyb209XCIvcG9zdC9cIiAvPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0ICAgIDxmb3JtIGNsYXNzTmFtZT1cImNvbCBzMTJcIj5cclxuXHRcdFx0XHRcdCAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHQgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XHJcblx0XHRcdFx0XHRcdFx0ICAgIDxpIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5lZGl0TW9kZSA/IFwibWRpLWVkaXRvci1ib3JkZXItY29sb3IgcHJlZml4XCIgOiBcIm1kaS1jb250ZW50LWFkZC1jaXJjbGUgcHJlZml4XCJ9PjwvaT5cclxuXHRcdFx0XHRcdFx0XHQgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwb3N0LWNvbnRlbnRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5wb3N0SW5wdXR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cclxuXHRcdFx0XHRcdFx0XHQgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFjdGl2ZVwiIGh0bWxGb3I9XCJwb3N0LWNvbnRlbnRcIj57dGhpcy5zdGF0ZS5sYWJlbH08L2xhYmVsPlxyXG5cdFx0XHRcdFx0XHQgICAgPC9kaXY+XHJcblx0XHRcdFx0XHQgICAgPC9kaXY+XHJcblx0XHRcdFx0ICAgIDwvZm9ybT5cclxuXHRcdFx0XHQgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gd2F2ZXMtZWZmZWN0IGN5YW4gYWNjZW50LTNcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VuZH0+U2VuZFxyXG5cdFx0XHRcdFx0ICAgIDxpIGNsYXNzTmFtZT1cIm1kaS1jb250ZW50LXNlbmQgcmlnaHRcIj48L2k+XHJcblx0XHRcdFx0ICAgIDwvYnV0dG9uPlxyXG5cdFx0XHQgICAgPC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3N0czsiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4JyksXHJcblx0UG9zdExpc3RBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9wb3N0TGlzdCcpLFxyXG5cdHJlcXVlc3QgPSByZXF1aXJlKCdzdXBlcmFnZW50Jyk7XHJcblxyXG52YXIgUG9zdExpc3RBY3Rpb25TdG9yZSA9IFJlZmx1eC5jcmVhdGVTdG9yZSh7XHJcblx0bGlzdGVuYWJsZXM6IFtQb3N0TGlzdEFjdGlvbnNdLFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHRcdHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuXHJcblx0XHR1cmwgPSB1cmwuc3Vic3RyaW5nKDAsIHVybC5pbmRleE9mKCcjJykpKydwb3N0Lyc7XHJcblx0XHR0aGlzLnBvc3RMaXN0ID0ge1xyXG5cdFx0XHR1cmw6IHVybCxcclxuXHRcdFx0cG9zdHM6IFtdLFxyXG5cdFx0XHRwb3N0SW5wdXQ6ICcnLFxyXG5cdFx0XHRlZGl0TW9kZTogZmFsc2UsXHJcblx0XHRcdGVkaXRQb3N0S2V5OiBudWxsLFxyXG5cdFx0XHRsYWJlbDogJycsXHJcblx0XHRcdGxhYmVsTmV3UG9zdDogJ0FkZCBhIG5ldyBwb3N0JyxcclxuXHRcdFx0bGFiZWxFZGl0UG9zdDogJ0VkaXQgcG9zdCdcclxuXHRcdH07XHJcblx0XHR0aGlzLnBvc3RMaXN0LmxhYmVsID0gdGhpcy5wb3N0TGlzdC5sYWJlbE5ld1Bvc3Q7XHJcblx0fSxcclxuXHJcblx0b25JbnB1dENoYW5nZTogZnVuY3Rpb24oY29udGVudCkge1xyXG5cdFx0dGhpcy5wb3N0TGlzdC5wb3N0SW5wdXQgPSBjb250ZW50O1xyXG5cdFx0dGhpcy50cmlnZ2VyKHRoaXMucG9zdExpc3QpO1xyXG5cdH0sXHJcblxyXG5cdG9uU2VuZFBvc3Q6IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKHRoaXMucG9zdExpc3QucG9zdElucHV0Lmxlbmd0aCA8IDEpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0aWYgKHRoaXMucG9zdExpc3QuZWRpdE1vZGUpIHtcclxuXHRcdFx0cmVxdWVzdC5wdXQodGhpcy5wb3N0TGlzdC51cmwrdGhpcy5wb3N0TGlzdC5lZGl0UG9zdEtleSkuc2VuZCh0aGlzLnBvc3RMaXN0LnBvc3RJbnB1dCkuZW5kKGZ1bmN0aW9uKGVyciwgcmVzKSB7XHJcblx0XHRcdFx0X3RoaXMucG9zdExpc3QuZWRpdE1vZGUgPSBmYWxzZTtcclxuXHRcdFx0XHRfdGhpcy5wb3N0TGlzdC5lZGl0UG9zdEtleSA9IG51bGw7XHJcblx0XHRcdFx0X3RoaXMucG9zdExpc3QubGFiZWwgPSBfdGhpcy5wb3N0TGlzdC5sYWJlbE5ld1Bvc3Q7XHJcblx0XHRcdFx0UG9zdExpc3RBY3Rpb25zLmdldFBvc3RzKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHJlcXVlc3QucG9zdCh0aGlzLnBvc3RMaXN0LnVybCkuc2VuZCh0aGlzLnBvc3RMaXN0LnBvc3RJbnB1dCkuZW5kKGZ1bmN0aW9uKGVyciwgcmVzKSB7XHJcblx0XHRcdFx0UG9zdExpc3RBY3Rpb25zLmdldFBvc3RzKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMucG9zdExpc3QucG9zdElucHV0ID0gJyc7XHJcblx0XHR0aGlzLnRyaWdnZXIodGhpcy5wb3N0TGlzdCk7XHJcblx0fSxcclxuXHJcblx0b25HZXRQb3N0czogZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdHJlcXVlc3QuZ2V0KHRoaXMucG9zdExpc3QudXJsKS5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcclxuXHRcdFx0X3RoaXMucG9zdExpc3QucG9zdHMgPSBbXTtcclxuXHRcdFx0Xy5lYWNoKEpTT04ucGFyc2UocmVzLnRleHQpLCBmdW5jdGlvbihwb3N0KSB7XHJcblx0XHRcdFx0X3RoaXMucG9zdExpc3QucG9zdHMucHVzaChwb3N0KTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRfdGhpcy50cmlnZ2VyKF90aGlzLnBvc3RMaXN0KTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdG9uRGVsZXRlUG9zdDogZnVuY3Rpb24oa2V5KSB7XHJcblx0XHRyZXF1ZXN0LmRlbCh0aGlzLnBvc3RMaXN0LnVybCtrZXkpLmVuZChmdW5jdGlvbihlcnIsIHJlcykge1xyXG5cdFx0XHRQb3N0TGlzdEFjdGlvbnMuZ2V0UG9zdHMoKTtcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdG9uVXBkYXRlUG9zdDogZnVuY3Rpb24oY29udGVudCwga2V5KSB7XHJcblx0XHRpZiAodGhpcy5wb3N0TGlzdC5lZGl0UG9zdEtleSA9PT0ga2V5KSB7XHJcblx0XHRcdHRoaXMucG9zdExpc3QuZWRpdE1vZGUgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5wb3N0TGlzdC5lZGl0UG9zdEtleSA9IG51bGw7XHJcblx0XHRcdHRoaXMucG9zdExpc3QucG9zdElucHV0ID0gJyc7XHJcblx0XHRcdHRoaXMucG9zdExpc3QubGFiZWwgPSB0aGlzLnBvc3RMaXN0LmxhYmVsTmV3UG9zdDtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLnBvc3RMaXN0LmVkaXRNb2RlID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5wb3N0TGlzdC5lZGl0UG9zdEtleSA9IGtleTtcclxuXHRcdFx0dGhpcy5wb3N0TGlzdC5wb3N0SW5wdXQgPSBjb250ZW50O1xyXG5cdFx0XHR0aGlzLnBvc3RMaXN0LmxhYmVsID0gdGhpcy5wb3N0TGlzdC5sYWJlbEVkaXRQb3N0O1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9zdC1jb250ZW50JykuZm9jdXMoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnRyaWdnZXIodGhpcy5wb3N0TGlzdCk7XHJcblx0fSxcclxuXHJcblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiB0aGlzLnBvc3RMaXN0O1xyXG5cdH1cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RMaXN0QWN0aW9uU3RvcmU7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NyYycpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIEV2ZW50RW1pdHRlciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBFdmVudCBoYW5kbGVyIHRvIGJlIGNhbGxlZC5cbiAqIEBwYXJhbSB7TWl4ZWR9IGNvbnRleHQgQ29udGV4dCBmb3IgZnVuY3Rpb24gZXhlY3V0aW9uLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIE9ubHkgZW1pdCBvbmNlXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIE1pbmltYWwgRXZlbnRFbWl0dGVyIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBFdmVudEVtaXR0ZXIgaW50ZXJmYWNlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkgeyAvKiBOb3RoaW5nIHRvIHNldCAqLyB9XG5cbi8qKlxuICogSG9sZHMgdGhlIGFzc2lnbmVkIEV2ZW50RW1pdHRlcnMgYnkgbmFtZS5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuXG4vKipcbiAqIFJldHVybiBhIGxpc3Qgb2YgYXNzaWduZWQgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgZXZlbnRzIHRoYXQgc2hvdWxkIGJlIGxpc3RlZC5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbZXZlbnRdKSByZXR1cm4gW107XG4gIGlmICh0aGlzLl9ldmVudHNbZXZlbnRdLmZuKSByZXR1cm4gW3RoaXMuX2V2ZW50c1tldmVudF0uZm5dO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5fZXZlbnRzW2V2ZW50XS5sZW5ndGgsIGVlID0gbmV3IEFycmF5KGwpOyBpIDwgbDsgaSsrKSB7XG4gICAgZWVbaV0gPSB0aGlzLl9ldmVudHNbZXZlbnRdW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBFbWl0IGFuIGV2ZW50IHRvIGFsbCByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHJldHVybnMge0Jvb2xlYW59IEluZGljYXRpb24gaWYgd2UndmUgZW1pdHRlZCBhbiBldmVudC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2ZW50XSkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgbGlzdGVuZXJzLmZuKSB7XG4gICAgaWYgKGxpc3RlbmVycy5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnMuZm4sIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFhcmdzKSBmb3IgKGogPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgYXJnc1tqIC0gMV0gPSBhcmd1bWVudHNbal07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBuZXcgRXZlbnRMaXN0ZW5lciBmb3IgdGhlIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rvbn0gZm4gQ2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IFRoZSBjb250ZXh0IG9mIHRoZSBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgdmFyIGxpc3RlbmVyID0gbmV3IEVFKGZuLCBjb250ZXh0IHx8IHRoaXMpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKSB0aGlzLl9ldmVudHMgPSB7fTtcbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZlbnRdKSB0aGlzLl9ldmVudHNbZXZlbnRdID0gbGlzdGVuZXI7XG4gIGVsc2Uge1xuICAgIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XS5mbikgdGhpcy5fZXZlbnRzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcbiAgICBlbHNlIHRoaXMuX2V2ZW50c1tldmVudF0gPSBbXG4gICAgICB0aGlzLl9ldmVudHNbZXZlbnRdLCBsaXN0ZW5lclxuICAgIF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkIGFuIEV2ZW50TGlzdGVuZXIgdGhhdCdzIG9ubHkgY2FsbGVkIG9uY2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQ2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IFRoZSBjb250ZXh0IG9mIHRoZSBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCB0aGlzLCB0cnVlKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cykgdGhpcy5fZXZlbnRzID0ge307XG4gIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XSkgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IGxpc3RlbmVyO1xuICBlbHNlIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50c1tldmVudF0uZm4pIHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChsaXN0ZW5lcik7XG4gICAgZWxzZSB0aGlzLl9ldmVudHNbZXZlbnRdID0gW1xuICAgICAgdGhpcy5fZXZlbnRzW2V2ZW50XSwgbGlzdGVuZXJcbiAgICBdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudCB3ZSB3YW50IHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciB0aGF0IHdlIG5lZWQgdG8gZmluZC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmNlIGxpc3RlbmVycy5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIG9uY2UpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1tldmVudF0pIHJldHVybiB0aGlzO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG4gICAgLCBldmVudHMgPSBbXTtcblxuICBpZiAoZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLmZuICYmIChsaXN0ZW5lcnMuZm4gIT09IGZuIHx8IChvbmNlICYmICFsaXN0ZW5lcnMub25jZSkpKSB7XG4gICAgICBldmVudHMucHVzaChsaXN0ZW5lcnMpO1xuICAgIH1cbiAgICBpZiAoIWxpc3RlbmVycy5mbikgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHwgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIFJlc2V0IHRoZSBhcnJheSwgb3IgcmVtb3ZlIGl0IGNvbXBsZXRlbHkgaWYgd2UgaGF2ZSBubyBtb3JlIGxpc3RlbmVycy5cbiAgLy9cbiAgaWYgKGV2ZW50cy5sZW5ndGgpIHtcbiAgICB0aGlzLl9ldmVudHNbZXZlbnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW2V2ZW50XTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycyBvciBvbmx5IHRoZSBsaXN0ZW5lcnMgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudCB3YW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvci5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50KSB7XG4gIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gdGhpcztcblxuICBpZiAoZXZlbnQpIGRlbGV0ZSB0aGlzLl9ldmVudHNbZXZlbnRdO1xuICBlbHNlIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBUaGlzIGZ1bmN0aW9uIGRvZXNuJ3QgYXBwbHkgYW55bW9yZS5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIyID0gRXZlbnRFbWl0dGVyO1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlcjMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbiIsIi8qISBOYXRpdmUgUHJvbWlzZSBPbmx5XG4gICAgdjAuNy44LWEgKGMpIEt5bGUgU2ltcHNvblxuICAgIE1JVCBMaWNlbnNlOiBodHRwOi8vZ2V0aWZ5Lm1pdC1saWNlbnNlLm9yZ1xuKi9cbiFmdW5jdGlvbih0LG4sZSl7blt0XT1uW3RdfHxlKCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9blt0XTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShmdW5jdGlvbigpe3JldHVybiBuW3RdfSl9KFwiUHJvbWlzZVwiLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOnRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQsbil7bC5hZGQodCxuKSxofHwoaD15KGwuZHJhaW4pKX1mdW5jdGlvbiBuKHQpe3ZhciBuLGU9dHlwZW9mIHQ7cmV0dXJuIG51bGw9PXR8fFwib2JqZWN0XCIhPWUmJlwiZnVuY3Rpb25cIiE9ZXx8KG49dC50aGVuKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuP246ITF9ZnVuY3Rpb24gZSgpe2Zvcih2YXIgdD0wO3Q8dGhpcy5jaGFpbi5sZW5ndGg7dCsrKW8odGhpcywxPT09dGhpcy5zdGF0ZT90aGlzLmNoYWluW3RdLnN1Y2Nlc3M6dGhpcy5jaGFpblt0XS5mYWlsdXJlLHRoaXMuY2hhaW5bdF0pO3RoaXMuY2hhaW4ubGVuZ3RoPTB9ZnVuY3Rpb24gbyh0LGUsbyl7dmFyIHIsaTt0cnl7ZT09PSExP28ucmVqZWN0KHQubXNnKToocj1lPT09ITA/dC5tc2c6ZS5jYWxsKHZvaWQgMCx0Lm1zZykscj09PW8ucHJvbWlzZT9vLnJlamVjdChUeXBlRXJyb3IoXCJQcm9taXNlLWNoYWluIGN5Y2xlXCIpKTooaT1uKHIpKT9pLmNhbGwocixvLnJlc29sdmUsby5yZWplY3QpOm8ucmVzb2x2ZShyKSl9Y2F0Y2goYyl7by5yZWplY3QoYyl9fWZ1bmN0aW9uIHIobyl7dmFyIGMsdSxhPXRoaXM7aWYoIWEudHJpZ2dlcmVkKXthLnRyaWdnZXJlZD0hMCxhLmRlZiYmKGE9YS5kZWYpO3RyeXsoYz1uKG8pKT8odT1uZXcgZihhKSxjLmNhbGwobyxmdW5jdGlvbigpe3IuYXBwbHkodSxhcmd1bWVudHMpfSxmdW5jdGlvbigpe2kuYXBwbHkodSxhcmd1bWVudHMpfSkpOihhLm1zZz1vLGEuc3RhdGU9MSxhLmNoYWluLmxlbmd0aD4wJiZ0KGUsYSkpfWNhdGNoKHMpe2kuY2FsbCh1fHxuZXcgZihhKSxzKX19fWZ1bmN0aW9uIGkobil7dmFyIG89dGhpcztvLnRyaWdnZXJlZHx8KG8udHJpZ2dlcmVkPSEwLG8uZGVmJiYobz1vLmRlZiksby5tc2c9bixvLnN0YXRlPTIsby5jaGFpbi5sZW5ndGg+MCYmdChlLG8pKX1mdW5jdGlvbiBjKHQsbixlLG8pe2Zvcih2YXIgcj0wO3I8bi5sZW5ndGg7cisrKSFmdW5jdGlvbihyKXt0LnJlc29sdmUobltyXSkudGhlbihmdW5jdGlvbih0KXtlKHIsdCl9LG8pfShyKX1mdW5jdGlvbiBmKHQpe3RoaXMuZGVmPXQsdGhpcy50cmlnZ2VyZWQ9ITF9ZnVuY3Rpb24gdSh0KXt0aGlzLnByb21pc2U9dCx0aGlzLnN0YXRlPTAsdGhpcy50cmlnZ2VyZWQ9ITEsdGhpcy5jaGFpbj1bXSx0aGlzLm1zZz12b2lkIDB9ZnVuY3Rpb24gYShuKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2lmKDAhPT10aGlzLl9fTlBPX18pdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgcHJvbWlzZVwiKTt0aGlzLl9fTlBPX189MTt2YXIgbz1uZXcgdSh0aGlzKTt0aGlzLnRoZW49ZnVuY3Rpb24obixyKXt2YXIgaT17c3VjY2VzczpcImZ1bmN0aW9uXCI9PXR5cGVvZiBuP246ITAsZmFpbHVyZTpcImZ1bmN0aW9uXCI9PXR5cGVvZiByP3I6ITF9O3JldHVybiBpLnByb21pc2U9bmV3IHRoaXMuY29uc3RydWN0b3IoZnVuY3Rpb24odCxuKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0fHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2kucmVzb2x2ZT10LGkucmVqZWN0PW59KSxvLmNoYWluLnB1c2goaSksMCE9PW8uc3RhdGUmJnQoZSxvKSxpLnByb21pc2V9LHRoaXNbXCJjYXRjaFwiXT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy50aGVuKHZvaWQgMCx0KX07dHJ5e24uY2FsbCh2b2lkIDAsZnVuY3Rpb24odCl7ci5jYWxsKG8sdCl9LGZ1bmN0aW9uKHQpe2kuY2FsbChvLHQpfSl9Y2F0Y2goYyl7aS5jYWxsKG8sYyl9fXZhciBzLGgsbCxwPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcseT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygc2V0SW1tZWRpYXRlP2Z1bmN0aW9uKHQpe3JldHVybiBzZXRJbW1lZGlhdGUodCl9OnNldFRpbWVvdXQ7dHJ5e09iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSxcInhcIix7fSkscz1mdW5jdGlvbih0LG4sZSxvKXtyZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbix7dmFsdWU6ZSx3cml0YWJsZTohMCxjb25maWd1cmFibGU6byE9PSExfSl9fWNhdGNoKGQpe3M9ZnVuY3Rpb24odCxuLGUpe3JldHVybiB0W25dPWUsdH19bD1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCxuKXt0aGlzLmZuPXQsdGhpcy5zZWxmPW4sdGhpcy5uZXh0PXZvaWQgMH12YXIgbixlLG87cmV0dXJue2FkZDpmdW5jdGlvbihyLGkpe289bmV3IHQocixpKSxlP2UubmV4dD1vOm49byxlPW8sbz12b2lkIDB9LGRyYWluOmZ1bmN0aW9uKCl7dmFyIHQ9bjtmb3Iobj1lPWg9dm9pZCAwO3Q7KXQuZm4uY2FsbCh0LnNlbGYpLHQ9dC5uZXh0fX19KCk7dmFyIGc9cyh7fSxcImNvbnN0cnVjdG9yXCIsYSwhMSk7cmV0dXJuIGEucHJvdG90eXBlPWcscyhnLFwiX19OUE9fX1wiLDAsITEpLHMoYSxcInJlc29sdmVcIixmdW5jdGlvbih0KXt2YXIgbj10aGlzO3JldHVybiB0JiZcIm9iamVjdFwiPT10eXBlb2YgdCYmMT09PXQuX19OUE9fXz90Om5ldyBuKGZ1bmN0aW9uKG4sZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbnx8XCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtuKHQpfSl9KSxzKGEsXCJyZWplY3RcIixmdW5jdGlvbih0KXtyZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24obixlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBufHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2UodCl9KX0pLHMoYSxcImFsbFwiLGZ1bmN0aW9uKHQpe3ZhciBuPXRoaXM7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiIT1wLmNhbGwodCk/bi5yZWplY3QoVHlwZUVycm9yKFwiTm90IGFuIGFycmF5XCIpKTowPT09dC5sZW5ndGg/bi5yZXNvbHZlKFtdKTpuZXcgbihmdW5jdGlvbihlLG8pe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGV8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIG8pdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgZnVuY3Rpb25cIik7dmFyIHI9dC5sZW5ndGgsaT1BcnJheShyKSxmPTA7YyhuLHQsZnVuY3Rpb24odCxuKXtpW3RdPW4sKytmPT09ciYmZShpKX0sbyl9KX0pLHMoYSxcInJhY2VcIixmdW5jdGlvbih0KXt2YXIgbj10aGlzO3JldHVyblwiW29iamVjdCBBcnJheV1cIiE9cC5jYWxsKHQpP24ucmVqZWN0KFR5cGVFcnJvcihcIk5vdCBhbiBhcnJheVwiKSk6bmV3IG4oZnVuY3Rpb24oZSxvKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBvKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2Mobix0LGZ1bmN0aW9uKHQsbil7ZShuKX0sbyl9KX0pLGF9KTtcbiIsIi8qKlxuICogQSBtb2R1bGUgb2YgbWV0aG9kcyB0aGF0IHlvdSB3YW50IHRvIGluY2x1ZGUgaW4gYWxsIGFjdGlvbnMuXG4gKiBUaGlzIG1vZHVsZSBpcyBjb25zdW1lZCBieSBgY3JlYXRlQWN0aW9uYC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG59O1xuIiwiZXhwb3J0cy5jcmVhdGVkU3RvcmVzID0gW107XG5cbmV4cG9ydHMuY3JlYXRlZEFjdGlvbnMgPSBbXTtcblxuZXhwb3J0cy5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgIHdoaWxlKGV4cG9ydHMuY3JlYXRlZFN0b3Jlcy5sZW5ndGgpIHtcbiAgICAgICAgZXhwb3J0cy5jcmVhdGVkU3RvcmVzLnBvcCgpO1xuICAgIH1cbiAgICB3aGlsZShleHBvcnRzLmNyZWF0ZWRBY3Rpb25zLmxlbmd0aCkge1xuICAgICAgICBleHBvcnRzLmNyZWF0ZWRBY3Rpb25zLnBvcCgpO1xuICAgIH1cbn07XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKSxcbiAgICBtYWtlciA9IHJlcXVpcmUoJy4vam9pbnMnKS5pbnN0YW5jZUpvaW5DcmVhdG9yO1xuXG4vKipcbiAqIEV4dHJhY3QgY2hpbGQgbGlzdGVuYWJsZXMgZnJvbSBhIHBhcmVudCBmcm9tIHRoZWlyXG4gKiBjaGlsZHJlbiBwcm9wZXJ0eSBhbmQgcmV0dXJuIHRoZW0gaW4gYSBrZXllZCBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuYWJsZSBUaGUgcGFyZW50IGxpc3RlbmFibGVcbiAqL1xudmFyIG1hcENoaWxkTGlzdGVuYWJsZXMgPSBmdW5jdGlvbihsaXN0ZW5hYmxlKSB7XG4gICAgdmFyIGkgPSAwLCBjaGlsZHJlbiA9IHt9LCBjaGlsZE5hbWU7XG4gICAgZm9yICg7aSA8IChsaXN0ZW5hYmxlLmNoaWxkcmVufHxbXSkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2hpbGROYW1lID0gbGlzdGVuYWJsZS5jaGlsZHJlbltpXTtcbiAgICAgICAgaWYobGlzdGVuYWJsZVtjaGlsZE5hbWVdKXtcbiAgICAgICAgICAgIGNoaWxkcmVuW2NoaWxkTmFtZV0gPSBsaXN0ZW5hYmxlW2NoaWxkTmFtZV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xufTtcblxuLyoqXG4gKiBNYWtlIGEgZmxhdCBkaWN0aW9uYXJ5IG9mIGFsbCBsaXN0ZW5hYmxlcyBpbmNsdWRpbmcgdGhlaXJcbiAqIHBvc3NpYmxlIGNoaWxkcmVuIChyZWN1cnNpdmVseSksIGNvbmNhdGVuYXRpbmcgbmFtZXMgaW4gY2FtZWxDYXNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5hYmxlcyBUaGUgdG9wLWxldmVsIGxpc3RlbmFibGVzXG4gKi9cbnZhciBmbGF0dGVuTGlzdGVuYWJsZXMgPSBmdW5jdGlvbihsaXN0ZW5hYmxlcykge1xuICAgIHZhciBmbGF0dGVuZWQgPSB7fTtcbiAgICBmb3IodmFyIGtleSBpbiBsaXN0ZW5hYmxlcyl7XG4gICAgICAgIHZhciBsaXN0ZW5hYmxlID0gbGlzdGVuYWJsZXNba2V5XTtcbiAgICAgICAgdmFyIGNoaWxkTWFwID0gbWFwQ2hpbGRMaXN0ZW5hYmxlcyhsaXN0ZW5hYmxlKTtcblxuICAgICAgICAvLyByZWN1cnNpdmVseSBmbGF0dGVuIGNoaWxkcmVuXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IGZsYXR0ZW5MaXN0ZW5hYmxlcyhjaGlsZE1hcCk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBwcmltYXJ5IGxpc3RlbmFibGUgYW5kIGNoaWxyZW5cbiAgICAgICAgZmxhdHRlbmVkW2tleV0gPSBsaXN0ZW5hYmxlO1xuICAgICAgICBmb3IodmFyIGNoaWxkS2V5IGluIGNoaWxkcmVuKXtcbiAgICAgICAgICAgIHZhciBjaGlsZExpc3RlbmFibGUgPSBjaGlsZHJlbltjaGlsZEtleV07XG4gICAgICAgICAgICBmbGF0dGVuZWRba2V5ICsgXy5jYXBpdGFsaXplKGNoaWxkS2V5KV0gPSBjaGlsZExpc3RlbmFibGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmxhdHRlbmVkO1xufTtcblxuLyoqXG4gKiBBIG1vZHVsZSBvZiBtZXRob2RzIHJlbGF0ZWQgdG8gbGlzdGVuaW5nLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIC8qKlxuICAgICAqIEFuIGludGVybmFsIHV0aWxpdHkgZnVuY3Rpb24gdXNlZCBieSBgdmFsaWRhdGVMaXN0ZW5pbmdgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FjdGlvbnxTdG9yZX0gbGlzdGVuYWJsZSBUaGUgbGlzdGVuYWJsZSB3ZSB3YW50IHRvIHNlYXJjaCBmb3JcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVGhlIHJlc3VsdCBvZiBhIHJlY3Vyc2l2ZSBzZWFyY2ggYW1vbmcgYHRoaXMuc3Vic2NyaXB0aW9uc2BcbiAgICAgKi9cbiAgICBoYXNMaXN0ZW5lcjogZnVuY3Rpb24obGlzdGVuYWJsZSkge1xuICAgICAgICB2YXIgaSA9IDAsIGosIGxpc3RlbmVyLCBsaXN0ZW5hYmxlcztcbiAgICAgICAgZm9yICg7aSA8ICh0aGlzLnN1YnNjcmlwdGlvbnN8fFtdKS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGlzdGVuYWJsZXMgPSBbXS5jb25jYXQodGhpcy5zdWJzY3JpcHRpb25zW2ldLmxpc3RlbmFibGUpO1xuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxpc3RlbmFibGVzLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmFibGVzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuYWJsZSB8fCBsaXN0ZW5lci5oYXNMaXN0ZW5lciAmJiBsaXN0ZW5lci5oYXNMaXN0ZW5lcihsaXN0ZW5hYmxlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBIGNvbnZlbmllbmNlIG1ldGhvZCB0aGF0IGxpc3RlbnMgdG8gYWxsIGxpc3RlbmFibGVzIGluIHRoZSBnaXZlbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuYWJsZXMgQW4gb2JqZWN0IG9mIGxpc3RlbmFibGVzLiBLZXlzIHdpbGwgYmUgdXNlZCBhcyBjYWxsYmFjayBtZXRob2QgbmFtZXMuXG4gICAgICovXG4gICAgbGlzdGVuVG9NYW55OiBmdW5jdGlvbihsaXN0ZW5hYmxlcyl7XG4gICAgICAgIHZhciBhbGxMaXN0ZW5hYmxlcyA9IGZsYXR0ZW5MaXN0ZW5hYmxlcyhsaXN0ZW5hYmxlcyk7XG4gICAgICAgIGZvcih2YXIga2V5IGluIGFsbExpc3RlbmFibGVzKXtcbiAgICAgICAgICAgIHZhciBjYm5hbWUgPSBfLmNhbGxiYWNrTmFtZShrZXkpLFxuICAgICAgICAgICAgICAgIGxvY2FsbmFtZSA9IHRoaXNbY2JuYW1lXSA/IGNibmFtZSA6IHRoaXNba2V5XSA/IGtleSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChsb2NhbG5hbWUpe1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuVG8oYWxsTGlzdGVuYWJsZXNba2V5XSxsb2NhbG5hbWUsdGhpc1tjYm5hbWUrXCJEZWZhdWx0XCJdfHx0aGlzW2xvY2FsbmFtZStcIkRlZmF1bHRcIl18fGxvY2FsbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IGNvbnRleHQgY2FuIGxpc3RlbiB0byB0aGUgc3VwcGxpZWQgbGlzdGVuYWJsZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtBY3Rpb258U3RvcmV9IGxpc3RlbmFibGUgQW4gQWN0aW9uIG9yIFN0b3JlIHRoYXQgc2hvdWxkIGJlXG4gICAgICogIGxpc3RlbmVkIHRvLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd8VW5kZWZpbmVkfSBBbiBlcnJvciBtZXNzYWdlLCBvciB1bmRlZmluZWQgaWYgdGhlcmUgd2FzIG5vIHByb2JsZW0uXG4gICAgICovXG4gICAgdmFsaWRhdGVMaXN0ZW5pbmc6IGZ1bmN0aW9uKGxpc3RlbmFibGUpe1xuICAgICAgICBpZiAobGlzdGVuYWJsZSA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIFwiTGlzdGVuZXIgaXMgbm90IGFibGUgdG8gbGlzdGVuIHRvIGl0c2VsZlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICghXy5pc0Z1bmN0aW9uKGxpc3RlbmFibGUubGlzdGVuKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmFibGUgKyBcIiBpcyBtaXNzaW5nIGEgbGlzdGVuIG1ldGhvZFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5hYmxlLmhhc0xpc3RlbmVyICYmIGxpc3RlbmFibGUuaGFzTGlzdGVuZXIodGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBcIkxpc3RlbmVyIGNhbm5vdCBsaXN0ZW4gdG8gdGhpcyBsaXN0ZW5hYmxlIGJlY2F1c2Ugb2YgY2lyY3VsYXIgbG9vcFwiO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBzdWJzY3JpcHRpb24gdG8gdGhlIGdpdmVuIGxpc3RlbmFibGUgZm9yIHRoZSBjb250ZXh0IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtBY3Rpb258U3RvcmV9IGxpc3RlbmFibGUgQW4gQWN0aW9uIG9yIFN0b3JlIHRoYXQgc2hvdWxkIGJlXG4gICAgICogIGxpc3RlbmVkIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcmVnaXN0ZXIgYXMgZXZlbnQgaGFuZGxlclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBkZWZhdWx0Q2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGRlZmF1bHQgaGFuZGxlclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEEgc3Vic2NyaXB0aW9uIG9iaiB3aGVyZSBgc3RvcGAgaXMgYW4gdW5zdWIgZnVuY3Rpb24gYW5kIGBsaXN0ZW5hYmxlYCBpcyB0aGUgb2JqZWN0IGJlaW5nIGxpc3RlbmVkIHRvXG4gICAgICovXG4gICAgbGlzdGVuVG86IGZ1bmN0aW9uKGxpc3RlbmFibGUsIGNhbGxiYWNrLCBkZWZhdWx0Q2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGRlc3ViLCB1bnN1YnNjcmliZXIsIHN1YnNjcmlwdGlvbm9iaiwgc3VicyA9IHRoaXMuc3Vic2NyaXB0aW9ucyA9IHRoaXMuc3Vic2NyaXB0aW9ucyB8fCBbXTtcbiAgICAgICAgXy50aHJvd0lmKHRoaXMudmFsaWRhdGVMaXN0ZW5pbmcobGlzdGVuYWJsZSkpO1xuICAgICAgICB0aGlzLmZldGNoSW5pdGlhbFN0YXRlKGxpc3RlbmFibGUsIGRlZmF1bHRDYWxsYmFjayk7XG4gICAgICAgIGRlc3ViID0gbGlzdGVuYWJsZS5saXN0ZW4odGhpc1tjYWxsYmFja118fGNhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgdW5zdWJzY3JpYmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBzdWJzLmluZGV4T2Yoc3Vic2NyaXB0aW9ub2JqKTtcbiAgICAgICAgICAgIF8udGhyb3dJZihpbmRleCA9PT0gLTEsJ1RyaWVkIHRvIHJlbW92ZSBsaXN0ZW4gYWxyZWFkeSBnb25lIGZyb20gc3Vic2NyaXB0aW9ucyBsaXN0IScpO1xuICAgICAgICAgICAgc3Vicy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZGVzdWIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc3Vic2NyaXB0aW9ub2JqID0ge1xuICAgICAgICAgICAgc3RvcDogdW5zdWJzY3JpYmVyLFxuICAgICAgICAgICAgbGlzdGVuYWJsZTogbGlzdGVuYWJsZVxuICAgICAgICB9O1xuICAgICAgICBzdWJzLnB1c2goc3Vic2NyaXB0aW9ub2JqKTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbm9iajtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgbGlzdGVuaW5nIHRvIGEgc2luZ2xlIGxpc3RlbmFibGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QWN0aW9ufFN0b3JlfSBsaXN0ZW5hYmxlIFRoZSBhY3Rpb24gb3Igc3RvcmUgd2Ugbm8gbG9uZ2VyIHdhbnQgdG8gbGlzdGVuIHRvXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgYSBzdWJzY3JpcHRpb24gd2FzIGZvdW5kIGFuZCByZW1vdmVkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgc3RvcExpc3RlbmluZ1RvOiBmdW5jdGlvbihsaXN0ZW5hYmxlKXtcbiAgICAgICAgdmFyIHN1YiwgaSA9IDAsIHN1YnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMgfHwgW107XG4gICAgICAgIGZvcig7aSA8IHN1YnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgc3ViID0gc3Vic1tpXTtcbiAgICAgICAgICAgIGlmIChzdWIubGlzdGVuYWJsZSA9PT0gbGlzdGVuYWJsZSl7XG4gICAgICAgICAgICAgICAgc3ViLnN0b3AoKTtcbiAgICAgICAgICAgICAgICBfLnRocm93SWYoc3Vicy5pbmRleE9mKHN1YikhPT0tMSwnRmFpbGVkIHRvIHJlbW92ZSBsaXN0ZW4gZnJvbSBzdWJzY3JpcHRpb25zIGxpc3QhJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhbGwgc3Vic2NyaXB0aW9ucyBhbmQgZW1wdGllcyBzdWJzY3JpcHRpb25zIGFycmF5XG4gICAgICovXG4gICAgc3RvcExpc3RlbmluZ1RvQWxsOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcmVtYWluaW5nLCBzdWJzID0gdGhpcy5zdWJzY3JpcHRpb25zIHx8IFtdO1xuICAgICAgICB3aGlsZSgocmVtYWluaW5nPXN1YnMubGVuZ3RoKSl7XG4gICAgICAgICAgICBzdWJzWzBdLnN0b3AoKTtcbiAgICAgICAgICAgIF8udGhyb3dJZihzdWJzLmxlbmd0aCE9PXJlbWFpbmluZy0xLCdGYWlsZWQgdG8gcmVtb3ZlIGxpc3RlbiBmcm9tIHN1YnNjcmlwdGlvbnMgbGlzdCEnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGluIGBsaXN0ZW5Ub2AuIEZldGNoZXMgaW5pdGlhbCBkYXRhIGZyb20gYSBwdWJsaXNoZXIgaWYgaXQgaGFzIGEgYGdldEluaXRpYWxTdGF0ZWAgbWV0aG9kLlxuICAgICAqIEBwYXJhbSB7QWN0aW9ufFN0b3JlfSBsaXN0ZW5hYmxlIFRoZSBwdWJsaXNoZXIgd2Ugd2FudCB0byBnZXQgaW5pdGlhbCBzdGF0ZSBmcm9tXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGRlZmF1bHRDYWxsYmFjayBUaGUgbWV0aG9kIHRvIHJlY2VpdmUgdGhlIGRhdGFcbiAgICAgKi9cbiAgICBmZXRjaEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKGxpc3RlbmFibGUsIGRlZmF1bHRDYWxsYmFjaykge1xuICAgICAgICBkZWZhdWx0Q2FsbGJhY2sgPSAoZGVmYXVsdENhbGxiYWNrICYmIHRoaXNbZGVmYXVsdENhbGxiYWNrXSkgfHwgZGVmYXVsdENhbGxiYWNrO1xuICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGRlZmF1bHRDYWxsYmFjaykgJiYgXy5pc0Z1bmN0aW9uKGxpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSgpO1xuICAgICAgICAgICAgaWYgKGRhdGEgJiYgXy5pc0Z1bmN0aW9uKGRhdGEudGhlbikpIHtcbiAgICAgICAgICAgICAgICBkYXRhLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDYWxsYmFjay5hcHBseShtZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdENhbGxiYWNrLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIG9uY2UgYWxsIGxpc3RlbmFibGVzIGhhdmUgdHJpZ2dlcmVkIGF0IGxlYXN0IG9uY2UuXG4gICAgICogSXQgd2lsbCBiZSBpbnZva2VkIHdpdGggdGhlIGxhc3QgZW1pc3Npb24gZnJvbSBlYWNoIGxpc3RlbmFibGUuXG4gICAgICogQHBhcmFtIHsuLi5QdWJsaXNoZXJzfSBwdWJsaXNoZXJzIFB1Ymxpc2hlcnMgdGhhdCBzaG91bGQgYmUgdHJhY2tlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gYWxsIHB1Ymxpc2hlcnMgaGF2ZSBlbWl0dGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gQSBzdWJzY3JpcHRpb24gb2JqIHdoZXJlIGBzdG9wYCBpcyBhbiB1bnN1YiBmdW5jdGlvbiBhbmQgYGxpc3RlbmFibGVgIGlzIGFuIGFycmF5IG9mIGxpc3RlbmFibGVzXG4gICAgICovXG4gICAgam9pblRyYWlsaW5nOiBtYWtlcihcImxhc3RcIiksXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgb25jZSBhbGwgbGlzdGVuYWJsZXMgaGF2ZSB0cmlnZ2VyZWQgYXQgbGVhc3Qgb25jZS5cbiAgICAgKiBJdCB3aWxsIGJlIGludm9rZWQgd2l0aCB0aGUgZmlyc3QgZW1pc3Npb24gZnJvbSBlYWNoIGxpc3RlbmFibGUuXG4gICAgICogQHBhcmFtIHsuLi5QdWJsaXNoZXJzfSBwdWJsaXNoZXJzIFB1Ymxpc2hlcnMgdGhhdCBzaG91bGQgYmUgdHJhY2tlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gYWxsIHB1Ymxpc2hlcnMgaGF2ZSBlbWl0dGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gQSBzdWJzY3JpcHRpb24gb2JqIHdoZXJlIGBzdG9wYCBpcyBhbiB1bnN1YiBmdW5jdGlvbiBhbmQgYGxpc3RlbmFibGVgIGlzIGFuIGFycmF5IG9mIGxpc3RlbmFibGVzXG4gICAgICovXG4gICAgam9pbkxlYWRpbmc6IG1ha2VyKFwiZmlyc3RcIiksXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgb25jZSBhbGwgbGlzdGVuYWJsZXMgaGF2ZSB0cmlnZ2VyZWQgYXQgbGVhc3Qgb25jZS5cbiAgICAgKiBJdCB3aWxsIGJlIGludm9rZWQgd2l0aCBhbGwgZW1pc3Npb24gZnJvbSBlYWNoIGxpc3RlbmFibGUuXG4gICAgICogQHBhcmFtIHsuLi5QdWJsaXNoZXJzfSBwdWJsaXNoZXJzIFB1Ymxpc2hlcnMgdGhhdCBzaG91bGQgYmUgdHJhY2tlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gYWxsIHB1Ymxpc2hlcnMgaGF2ZSBlbWl0dGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gQSBzdWJzY3JpcHRpb24gb2JqIHdoZXJlIGBzdG9wYCBpcyBhbiB1bnN1YiBmdW5jdGlvbiBhbmQgYGxpc3RlbmFibGVgIGlzIGFuIGFycmF5IG9mIGxpc3RlbmFibGVzXG4gICAgICovXG4gICAgam9pbkNvbmNhdDogbWFrZXIoXCJhbGxcIiksXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgb25jZSBhbGwgbGlzdGVuYWJsZXMgaGF2ZSB0cmlnZ2VyZWQuXG4gICAgICogSWYgYSBjYWxsYmFjayB0cmlnZ2VycyB0d2ljZSBiZWZvcmUgdGhhdCBoYXBwZW5zLCBhbiBlcnJvciBpcyB0aHJvd24uXG4gICAgICogQHBhcmFtIHsuLi5QdWJsaXNoZXJzfSBwdWJsaXNoZXJzIFB1Ymxpc2hlcnMgdGhhdCBzaG91bGQgYmUgdHJhY2tlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gYWxsIHB1Ymxpc2hlcnMgaGF2ZSBlbWl0dGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gQSBzdWJzY3JpcHRpb24gb2JqIHdoZXJlIGBzdG9wYCBpcyBhbiB1bnN1YiBmdW5jdGlvbiBhbmQgYGxpc3RlbmFibGVgIGlzIGFuIGFycmF5IG9mIGxpc3RlbmFibGVzXG4gICAgICovXG4gICAgam9pblN0cmljdDogbWFrZXIoXCJzdHJpY3RcIilcbn07XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKSxcbiAgICBMaXN0ZW5lck1ldGhvZHMgPSByZXF1aXJlKCcuL0xpc3RlbmVyTWV0aG9kcycpO1xuXG4vKipcbiAqIEEgbW9kdWxlIG1lYW50IHRvIGJlIGNvbnN1bWVkIGFzIGEgbWl4aW4gYnkgYSBSZWFjdCBjb21wb25lbnQuIFN1cHBsaWVzIHRoZSBtZXRob2RzIGZyb21cbiAqIGBMaXN0ZW5lck1ldGhvZHNgIG1peGluIGFuZCB0YWtlcyBjYXJlIG9mIHRlYXJkb3duIG9mIHN1YnNjcmlwdGlvbnMuXG4gKiBOb3RlIHRoYXQgaWYgeW91J3JlIHVzaW5nIHRoZSBgY29ubmVjdGAgbWl4aW4geW91IGRvbid0IG5lZWQgdGhpcyBtaXhpbiwgYXMgY29ubmVjdCB3aWxsXG4gKiBpbXBvcnQgZXZlcnl0aGluZyB0aGlzIG1peGluIGNvbnRhaW5zIVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IF8uZXh0ZW5kKHtcblxuICAgIC8qKlxuICAgICAqIENsZWFucyB1cCBhbGwgbGlzdGVuZXIgcHJldmlvdXNseSByZWdpc3RlcmVkLlxuICAgICAqL1xuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBMaXN0ZW5lck1ldGhvZHMuc3RvcExpc3RlbmluZ1RvQWxsXG5cbn0sIExpc3RlbmVyTWV0aG9kcyk7XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuLyoqXG4gKiBBIG1vZHVsZSBvZiBtZXRob2RzIGZvciBvYmplY3QgdGhhdCB5b3Ugd2FudCB0byBiZSBhYmxlIHRvIGxpc3RlbiB0by5cbiAqIFRoaXMgbW9kdWxlIGlzIGNvbnN1bWVkIGJ5IGBjcmVhdGVTdG9yZWAgYW5kIGBjcmVhdGVBY3Rpb25gXG4gKi9cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gICAgLyoqXG4gICAgICogSG9vayB1c2VkIGJ5IHRoZSBwdWJsaXNoZXIgdGhhdCBpcyBpbnZva2VkIGJlZm9yZSBlbWl0dGluZ1xuICAgICAqIGFuZCBiZWZvcmUgYHNob3VsZEVtaXRgLiBUaGUgYXJndW1lbnRzIGFyZSB0aGUgb25lcyB0aGF0IHRoZSBhY3Rpb25cbiAgICAgKiBpcyBpbnZva2VkIHdpdGguIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyBzb21ldGhpbmcgb3RoZXIgdGhhblxuICAgICAqIHVuZGVmaW5lZCwgdGhhdCB3aWxsIGJlIHBhc3NlZCBvbiBhcyBhcmd1bWVudHMgZm9yIHNob3VsZEVtaXQgYW5kXG4gICAgICogZW1pc3Npb24uXG4gICAgICovXG4gICAgcHJlRW1pdDogZnVuY3Rpb24oKSB7fSxcblxuICAgIC8qKlxuICAgICAqIEhvb2sgdXNlZCBieSB0aGUgcHVibGlzaGVyIGFmdGVyIGBwcmVFbWl0YCB0byBkZXRlcm1pbmUgaWYgdGhlXG4gICAgICogZXZlbnQgc2hvdWxkIGJlIGVtaXR0ZWQgd2l0aCBnaXZlbiBhcmd1bWVudHMuIFRoaXMgbWF5IGJlIG92ZXJyaWRkZW5cbiAgICAgKiBpbiB5b3VyIGFwcGxpY2F0aW9uLCBkZWZhdWx0IGltcGxlbWVudGF0aW9uIGFsd2F5cyByZXR1cm5zIHRydWUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gdHJ1ZSBpZiBldmVudCBzaG91bGQgYmUgZW1pdHRlZFxuICAgICAqL1xuICAgIHNob3VsZEVtaXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSxcblxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZXMgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBhY3Rpb24gdHJpZ2dlcmVkXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcmVnaXN0ZXIgYXMgZXZlbnQgaGFuZGxlclxuICAgICAqIEBwYXJhbSB7TWl4ZWR9IFtvcHRpb25hbF0gYmluZENvbnRleHQgVGhlIGNvbnRleHQgdG8gYmluZCB0aGUgY2FsbGJhY2sgd2l0aFxuICAgICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQ2FsbGJhY2sgdGhhdCB1bnN1YnNjcmliZXMgdGhlIHJlZ2lzdGVyZWQgZXZlbnQgaGFuZGxlclxuICAgICAqL1xuICAgIGxpc3RlbjogZnVuY3Rpb24oY2FsbGJhY2ssIGJpbmRDb250ZXh0KSB7XG4gICAgICAgIGJpbmRDb250ZXh0ID0gYmluZENvbnRleHQgfHwgdGhpcztcbiAgICAgICAgdmFyIGV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICAgIGlmIChhYm9ydGVkKXtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseShiaW5kQ29udGV4dCwgYXJncyk7XG4gICAgICAgIH0sIG1lID0gdGhpcywgYWJvcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVtaXR0ZXIuYWRkTGlzdGVuZXIodGhpcy5ldmVudExhYmVsLCBldmVudEhhbmRsZXIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhYm9ydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG1lLmVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobWUuZXZlbnRMYWJlbCwgZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoIGhhbmRsZXJzIHRvIHByb21pc2UgdGhhdCB0cmlnZ2VyIHRoZSBjb21wbGV0ZWQgYW5kIGZhaWxlZFxuICAgICAqIGNoaWxkIHB1Ymxpc2hlcnMsIGlmIGF2YWlsYWJsZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBUaGUgcHJvbWlzZSB0byBhdHRhY2ggdG9cbiAgICAgKi9cbiAgICBwcm9taXNlOiBmdW5jdGlvbihwcm9taXNlKSB7XG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG5cbiAgICAgICAgdmFyIGNhbkhhbmRsZVByb21pc2UgPVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5pbmRleE9mKCdjb21wbGV0ZWQnKSA+PSAwICYmXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmluZGV4T2YoJ2ZhaWxlZCcpID49IDA7XG5cbiAgICAgICAgaWYgKCFjYW5IYW5kbGVQcm9taXNlKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUHVibGlzaGVyIG11c3QgaGF2ZSBcImNvbXBsZXRlZFwiIGFuZCBcImZhaWxlZFwiIGNoaWxkIHB1Ymxpc2hlcnMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgcmV0dXJuIG1lLmNvbXBsZXRlZChyZXNwb25zZSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gbWUuZmFpbGVkKGVycm9yKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZXMgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBhY3Rpb24gdHJpZ2dlcmVkLCB3aGljaCBzaG91bGRcbiAgICAgKiByZXR1cm4gYSBwcm9taXNlIHRoYXQgaW4gdHVybiBpcyBwYXNzZWQgdG8gYHRoaXMucHJvbWlzZWBcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byByZWdpc3RlciBhcyBldmVudCBoYW5kbGVyXG4gICAgICovXG4gICAgbGlzdGVuQW5kUHJvbWlzZTogZnVuY3Rpb24oY2FsbGJhY2ssIGJpbmRDb250ZXh0KSB7XG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgIGJpbmRDb250ZXh0ID0gYmluZENvbnRleHQgfHwgdGhpcztcbiAgICAgICAgdGhpcy53aWxsQ2FsbFByb21pc2UgPSAodGhpcy53aWxsQ2FsbFByb21pc2UgfHwgMCkgKyAxO1xuXG4gICAgICAgIHZhciByZW1vdmVMaXN0ZW4gPSB0aGlzLmxpc3RlbihmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSBmdW5jdGlvbiByZXR1cm5pbmcgYSBwcm9taXNlIGJ1dCBnb3QgJyArIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgICAgICAgICAgcHJvbWlzZSA9IGNhbGxiYWNrLmFwcGx5KGJpbmRDb250ZXh0LCBhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiBtZS5wcm9taXNlLmNhbGwobWUsIHByb21pc2UpO1xuICAgICAgICB9LCBiaW5kQ29udGV4dCk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBtZS53aWxsQ2FsbFByb21pc2UtLTtcbiAgICAgICAgICByZW1vdmVMaXN0ZW4uY2FsbChtZSk7XG4gICAgICAgIH07XG5cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHVibGlzaGVzIGFuIGV2ZW50IHVzaW5nIGB0aGlzLmVtaXR0ZXJgIChpZiBgc2hvdWxkRW1pdGAgYWdyZWVzKVxuICAgICAqL1xuICAgIHRyaWdnZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgICAgIHByZSA9IHRoaXMucHJlRW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgYXJncyA9IHByZSA9PT0gdW5kZWZpbmVkID8gYXJncyA6IF8uaXNBcmd1bWVudHMocHJlKSA/IHByZSA6IFtdLmNvbmNhdChwcmUpO1xuICAgICAgICBpZiAodGhpcy5zaG91bGRFbWl0LmFwcGx5KHRoaXMsIGFyZ3MpKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXR0ZXIuZW1pdCh0aGlzLmV2ZW50TGFiZWwsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRyaWVzIHRvIHB1Ymxpc2ggdGhlIGV2ZW50IG9uIHRoZSBuZXh0IHRpY2tcbiAgICAgKi9cbiAgICB0cmlnZ2VyQXN5bmM6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLG1lID0gdGhpcztcbiAgICAgICAgXy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1lLnRyaWdnZXIuYXBwbHkobWUsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIFByb21pc2UgZm9yIHRoZSB0cmlnZ2VyZWQgYWN0aW9uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfVxuICAgICAqICAgUmVzb2x2ZWQgYnkgY29tcGxldGVkIGNoaWxkIGFjdGlvbi5cbiAgICAgKiAgIFJlamVjdGVkIGJ5IGZhaWxlZCBjaGlsZCBhY3Rpb24uXG4gICAgICogICBJZiBsaXN0ZW5BbmRQcm9taXNlJ2QsIHRoZW4gcHJvbWlzZSBhc3NvY2lhdGVkIHRvIHRoaXMgdHJpZ2dlci5cbiAgICAgKiAgIE90aGVyd2lzZSwgdGhlIHByb21pc2UgaXMgZm9yIG5leHQgY2hpbGQgYWN0aW9uIGNvbXBsZXRpb24uXG4gICAgICovXG4gICAgdHJpZ2dlclByb21pc2U6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICAgIHZhciBjYW5IYW5kbGVQcm9taXNlID1cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uaW5kZXhPZignY29tcGxldGVkJykgPj0gMCAmJlxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5pbmRleE9mKCdmYWlsZWQnKSA+PSAwO1xuXG4gICAgICAgIHZhciBwcm9taXNlID0gXy5jcmVhdGVQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgLy8gSWYgYGxpc3RlbkFuZFByb21pc2VgIGlzIGxpc3RlbmluZ1xuICAgICAgICAgICAgLy8gcGF0Y2ggYHByb21pc2VgIHcvIGNvbnRleHQtbG9hZGVkIHJlc29sdmUvcmVqZWN0XG4gICAgICAgICAgICBpZiAobWUud2lsbENhbGxQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgXy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9sZF9wcm9taXNlX21ldGhvZCA9IG1lLnByb21pc2U7XG4gICAgICAgICAgICAgICAgICAgIG1lLnByb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBCYWNrIHRvIHlvdXIgcmVndWxhcmx5IHNjaGVkdWxlIHByb2dyYW1taW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgbWUucHJvbWlzZSA9IG9sZF9wcm9taXNlX21ldGhvZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtZS5wcm9taXNlLmFwcGx5KG1lLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBtZS50cmlnZ2VyLmFwcGx5KG1lLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjYW5IYW5kbGVQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZVN1Y2Nlc3MgPSBtZS5jb21wbGV0ZWQubGlzdGVuKGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVGYWlsZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShhcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciByZW1vdmVGYWlsZWQgPSBtZS5mYWlsZWQubGlzdGVuKGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlU3VjY2VzcygpO1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVGYWlsZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZS50cmlnZ2VyQXN5bmMuYXBwbHkobWUsIGFyZ3MpO1xuXG4gICAgICAgICAgICBpZiAoIWNhbkhhbmRsZVByb21pc2UpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbn07XG4iLCIvKipcbiAqIEEgbW9kdWxlIG9mIG1ldGhvZHMgdGhhdCB5b3Ugd2FudCB0byBpbmNsdWRlIGluIGFsbCBzdG9yZXMuXG4gKiBUaGlzIG1vZHVsZSBpcyBjb25zdW1lZCBieSBgY3JlYXRlU3RvcmVgLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0b3JlLCBkZWZpbml0aW9uKSB7XG4gIGZvciAodmFyIG5hbWUgaW4gZGVmaW5pdGlvbikge1xuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICB2YXIgcHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkZWZpbml0aW9uLCBuYW1lKTtcblxuICAgICAgICBpZiAoIXByb3BlcnR5RGVzY3JpcHRvci52YWx1ZSB8fCB0eXBlb2YgcHJvcGVydHlEZXNjcmlwdG9yLnZhbHVlICE9PSAnZnVuY3Rpb24nIHx8ICFkZWZpbml0aW9uLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3JlW25hbWVdID0gZGVmaW5pdGlvbltuYW1lXS5iaW5kKHN0b3JlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcHJvcGVydHkgPSBkZWZpbml0aW9uW25hbWVdO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgIT09ICdmdW5jdGlvbicgfHwgIWRlZmluaXRpb24uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcmVbbmFtZV0gPSBwcm9wZXJ0eS5iaW5kKHN0b3JlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RvcmU7XG59O1xuIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKSxcbiAgICBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3RlbmFibGUsa2V5KXtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLm9iamVjdChba2V5XSxbbGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUoKV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIF8uZXh0ZW5kKHRoaXMsUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyk7XG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLCBjYiA9IChrZXkgPT09IHVuZGVmaW5lZCA/IHRoaXMuc2V0U3RhdGUgOiBmdW5jdGlvbih2KXttZS5zZXRTdGF0ZShfLm9iamVjdChba2V5XSxbdl0pKTt9KTtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG8obGlzdGVuYWJsZSxjYik7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBSZWZsdXguTGlzdGVuZXJNaXhpbi5jb21wb25lbnRXaWxsVW5tb3VudFxuICAgIH07XG59O1xuIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKSxcbiAgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0ZW5hYmxlLCBrZXksIGZpbHRlckZ1bmMpIHtcbiAgICBmaWx0ZXJGdW5jID0gXy5pc0Z1bmN0aW9uKGtleSkgPyBrZXkgOiBmaWx0ZXJGdW5jO1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9IGVsc2UgaWYgKF8uaXNGdW5jdGlvbihrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlckZ1bmMuY2FsbCh0aGlzLCBsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIGluaXRpYWwgcGF5bG9hZCBmcm9tIHN0b3JlLlxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBmaWx0ZXJGdW5jLmNhbGwodGhpcywgbGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUoKSk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIF8ub2JqZWN0KFtrZXldLCBbcmVzdWx0XSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF8uZXh0ZW5kKHRoaXMsIFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMpO1xuICAgICAgICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgICAgICAgIHZhciBjYiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lLnNldFN0YXRlKGZpbHRlckZ1bmMuY2FsbChtZSwgdmFsdWUpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmlsdGVyRnVuYy5jYWxsKG1lLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG1lLnNldFN0YXRlKF8ub2JqZWN0KFtrZXldLCBbcmVzdWx0XSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG8obGlzdGVuYWJsZSwgY2IpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudDogUmVmbHV4Lkxpc3RlbmVyTWl4aW4uY29tcG9uZW50V2lsbFVubW91bnRcbiAgICB9O1xufTtcblxuIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyksXG4gICAgUmVmbHV4ID0gcmVxdWlyZSgnLi9pbmRleCcpLFxuICAgIEtlZXAgPSByZXF1aXJlKCcuL0tlZXAnKSxcbiAgICBhbGxvd2VkID0ge3ByZUVtaXQ6MSxzaG91bGRFbWl0OjF9O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYWN0aW9uIGZ1bmN0b3Igb2JqZWN0LiBJdCBpcyBtaXhlZCBpbiB3aXRoIGZ1bmN0aW9uc1xuICogZnJvbSB0aGUgYFB1Ymxpc2hlck1ldGhvZHNgIG1peGluLiBgcHJlRW1pdGAgYW5kIGBzaG91bGRFbWl0YCBtYXlcbiAqIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGRlZmluaXRpb24gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZpbml0aW9uIFRoZSBhY3Rpb24gb2JqZWN0IGRlZmluaXRpb25cbiAqL1xudmFyIGNyZWF0ZUFjdGlvbiA9IGZ1bmN0aW9uKGRlZmluaXRpb24pIHtcblxuICAgIGRlZmluaXRpb24gPSBkZWZpbml0aW9uIHx8IHt9O1xuICAgIGlmICghXy5pc09iamVjdChkZWZpbml0aW9uKSl7XG4gICAgICAgIGRlZmluaXRpb24gPSB7YWN0aW9uTmFtZTogZGVmaW5pdGlvbn07XG4gICAgfVxuXG4gICAgZm9yKHZhciBhIGluIFJlZmx1eC5BY3Rpb25NZXRob2RzKXtcbiAgICAgICAgaWYgKCFhbGxvd2VkW2FdICYmIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzW2FdKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgb3ZlcnJpZGUgQVBJIG1ldGhvZCBcIiArIGEgK1xuICAgICAgICAgICAgICAgIFwiIGluIFJlZmx1eC5BY3Rpb25NZXRob2RzLiBVc2UgYW5vdGhlciBtZXRob2QgbmFtZSBvciBvdmVycmlkZSBpdCBvbiBSZWZsdXguUHVibGlzaGVyTWV0aG9kcyBpbnN0ZWFkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKHZhciBkIGluIGRlZmluaXRpb24pe1xuICAgICAgICBpZiAoIWFsbG93ZWRbZF0gJiYgUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHNbZF0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBvdmVycmlkZSBBUEkgbWV0aG9kIFwiICsgZCArXG4gICAgICAgICAgICAgICAgXCIgaW4gYWN0aW9uIGNyZWF0aW9uLiBVc2UgYW5vdGhlciBtZXRob2QgbmFtZSBvciBvdmVycmlkZSBpdCBvbiBSZWZsdXguUHVibGlzaGVyTWV0aG9kcyBpbnN0ZWFkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVmaW5pdGlvbi5jaGlsZHJlbiA9IGRlZmluaXRpb24uY2hpbGRyZW4gfHwgW107XG4gICAgaWYgKGRlZmluaXRpb24uYXN5bmNSZXN1bHQpe1xuICAgICAgICBkZWZpbml0aW9uLmNoaWxkcmVuID0gZGVmaW5pdGlvbi5jaGlsZHJlbi5jb25jYXQoW1wiY29tcGxldGVkXCIsXCJmYWlsZWRcIl0pO1xuICAgIH1cblxuICAgIHZhciBpID0gMCwgY2hpbGRBY3Rpb25zID0ge307XG4gICAgZm9yICg7IGkgPCBkZWZpbml0aW9uLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBuYW1lID0gZGVmaW5pdGlvbi5jaGlsZHJlbltpXTtcbiAgICAgICAgY2hpbGRBY3Rpb25zW25hbWVdID0gY3JlYXRlQWN0aW9uKG5hbWUpO1xuICAgIH1cblxuICAgIHZhciBjb250ZXh0ID0gXy5leHRlbmQoe1xuICAgICAgICBldmVudExhYmVsOiBcImFjdGlvblwiLFxuICAgICAgICBlbWl0dGVyOiBuZXcgXy5FdmVudEVtaXR0ZXIoKSxcbiAgICAgICAgX2lzQWN0aW9uOiB0cnVlXG4gICAgfSwgUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHMsIFJlZmx1eC5BY3Rpb25NZXRob2RzLCBkZWZpbml0aW9uKTtcblxuICAgIHZhciBmdW5jdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmdW5jdG9yW2Z1bmN0b3Iuc3luYz9cInRyaWdnZXJcIjpcInRyaWdnZXJQcm9taXNlXCJdLmFwcGx5KGZ1bmN0b3IsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIF8uZXh0ZW5kKGZ1bmN0b3IsY2hpbGRBY3Rpb25zLGNvbnRleHQpO1xuXG4gICAgS2VlcC5jcmVhdGVkQWN0aW9ucy5wdXNoKGZ1bmN0b3IpO1xuXG4gICAgcmV0dXJuIGZ1bmN0b3I7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQWN0aW9uO1xuIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyksXG4gICAgUmVmbHV4ID0gcmVxdWlyZSgnLi9pbmRleCcpLFxuICAgIEtlZXAgPSByZXF1aXJlKCcuL0tlZXAnKSxcbiAgICBtaXhlciA9IHJlcXVpcmUoJy4vbWl4ZXInKSxcbiAgICBhbGxvd2VkID0ge3ByZUVtaXQ6MSxzaG91bGRFbWl0OjF9LFxuICAgIGJpbmRNZXRob2RzID0gcmVxdWlyZSgnLi9iaW5kTWV0aG9kcycpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gZXZlbnQgZW1pdHRpbmcgRGF0YSBTdG9yZS4gSXQgaXMgbWl4ZWQgaW4gd2l0aCBmdW5jdGlvbnNcbiAqIGZyb20gdGhlIGBMaXN0ZW5lck1ldGhvZHNgIGFuZCBgUHVibGlzaGVyTWV0aG9kc2AgbWl4aW5zLiBgcHJlRW1pdGBcbiAqIGFuZCBgc2hvdWxkRW1pdGAgbWF5IGJlIG92ZXJyaWRkZW4gaW4gdGhlIGRlZmluaXRpb24gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZpbml0aW9uIFRoZSBkYXRhIHN0b3JlIG9iamVjdCBkZWZpbml0aW9uXG4gKiBAcmV0dXJucyB7U3RvcmV9IEEgZGF0YSBzdG9yZSBpbnN0YW5jZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRlZmluaXRpb24pIHtcblxuICAgIGRlZmluaXRpb24gPSBkZWZpbml0aW9uIHx8IHt9O1xuXG4gICAgZm9yKHZhciBhIGluIFJlZmx1eC5TdG9yZU1ldGhvZHMpe1xuICAgICAgICBpZiAoIWFsbG93ZWRbYV0gJiYgKFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzW2FdIHx8IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHNbYV0pKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBvdmVycmlkZSBBUEkgbWV0aG9kIFwiICsgYSArXG4gICAgICAgICAgICAgICAgXCIgaW4gUmVmbHV4LlN0b3JlTWV0aG9kcy4gVXNlIGFub3RoZXIgbWV0aG9kIG5hbWUgb3Igb3ZlcnJpZGUgaXQgb24gUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHMgLyBSZWZsdXguTGlzdGVuZXJNZXRob2RzIGluc3RlYWQuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IodmFyIGQgaW4gZGVmaW5pdGlvbil7XG4gICAgICAgIGlmICghYWxsb3dlZFtkXSAmJiAoUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHNbZF0gfHwgUmVmbHV4Lkxpc3RlbmVyTWV0aG9kc1tkXSkpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IG92ZXJyaWRlIEFQSSBtZXRob2QgXCIgKyBkICtcbiAgICAgICAgICAgICAgICBcIiBpbiBzdG9yZSBjcmVhdGlvbi4gVXNlIGFub3RoZXIgbWV0aG9kIG5hbWUgb3Igb3ZlcnJpZGUgaXQgb24gUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHMgLyBSZWZsdXguTGlzdGVuZXJNZXRob2RzIGluc3RlYWQuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWZpbml0aW9uID0gbWl4ZXIoZGVmaW5pdGlvbik7XG5cbiAgICBmdW5jdGlvbiBTdG9yZSgpIHtcbiAgICAgICAgdmFyIGk9MCwgYXJyO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgICAgdGhpcy5lbWl0dGVyID0gbmV3IF8uRXZlbnRFbWl0dGVyKCk7XG4gICAgICAgIHRoaXMuZXZlbnRMYWJlbCA9IFwiY2hhbmdlXCI7XG4gICAgICAgIGJpbmRNZXRob2RzKHRoaXMsIGRlZmluaXRpb24pO1xuICAgICAgICBpZiAodGhpcy5pbml0ICYmIF8uaXNGdW5jdGlvbih0aGlzLmluaXQpKSB7XG4gICAgICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5saXN0ZW5hYmxlcyl7XG4gICAgICAgICAgICBhcnIgPSBbXS5jb25jYXQodGhpcy5saXN0ZW5hYmxlcyk7XG4gICAgICAgICAgICBmb3IoO2kgPCBhcnIubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5Ub01hbnkoYXJyW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF8uZXh0ZW5kKFN0b3JlLnByb3RvdHlwZSwgUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcywgUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHMsIFJlZmx1eC5TdG9yZU1ldGhvZHMsIGRlZmluaXRpb24pO1xuXG4gICAgdmFyIHN0b3JlID0gbmV3IFN0b3JlKCk7XG4gICAgS2VlcC5jcmVhdGVkU3RvcmVzLnB1c2goc3RvcmUpO1xuXG4gICAgcmV0dXJuIHN0b3JlO1xufTtcbiIsImV4cG9ydHMuQWN0aW9uTWV0aG9kcyA9IHJlcXVpcmUoJy4vQWN0aW9uTWV0aG9kcycpO1xuXG5leHBvcnRzLkxpc3RlbmVyTWV0aG9kcyA9IHJlcXVpcmUoJy4vTGlzdGVuZXJNZXRob2RzJyk7XG5cbmV4cG9ydHMuUHVibGlzaGVyTWV0aG9kcyA9IHJlcXVpcmUoJy4vUHVibGlzaGVyTWV0aG9kcycpO1xuXG5leHBvcnRzLlN0b3JlTWV0aG9kcyA9IHJlcXVpcmUoJy4vU3RvcmVNZXRob2RzJyk7XG5cbmV4cG9ydHMuY3JlYXRlQWN0aW9uID0gcmVxdWlyZSgnLi9jcmVhdGVBY3Rpb24nKTtcblxuZXhwb3J0cy5jcmVhdGVTdG9yZSA9IHJlcXVpcmUoJy4vY3JlYXRlU3RvcmUnKTtcblxuZXhwb3J0cy5jb25uZWN0ID0gcmVxdWlyZSgnLi9jb25uZWN0Jyk7XG5cbmV4cG9ydHMuY29ubmVjdEZpbHRlciA9IHJlcXVpcmUoJy4vY29ubmVjdEZpbHRlcicpO1xuXG5leHBvcnRzLkxpc3RlbmVyTWl4aW4gPSByZXF1aXJlKCcuL0xpc3RlbmVyTWl4aW4nKTtcblxuZXhwb3J0cy5saXN0ZW5UbyA9IHJlcXVpcmUoJy4vbGlzdGVuVG8nKTtcblxuZXhwb3J0cy5saXN0ZW5Ub01hbnkgPSByZXF1aXJlKCcuL2xpc3RlblRvTWFueScpO1xuXG5cbnZhciBtYWtlciA9IHJlcXVpcmUoJy4vam9pbnMnKS5zdGF0aWNKb2luQ3JlYXRvcjtcblxuZXhwb3J0cy5qb2luVHJhaWxpbmcgPSBleHBvcnRzLmFsbCA9IG1ha2VyKFwibGFzdFwiKTsgLy8gUmVmbHV4LmFsbCBhbGlhcyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuXG5leHBvcnRzLmpvaW5MZWFkaW5nID0gbWFrZXIoXCJmaXJzdFwiKTtcblxuZXhwb3J0cy5qb2luU3RyaWN0ID0gbWFrZXIoXCJzdHJpY3RcIik7XG5cbmV4cG9ydHMuam9pbkNvbmNhdCA9IG1ha2VyKFwiYWxsXCIpO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBfLkV2ZW50RW1pdHRlcjtcblxuZXhwb3J0cy5Qcm9taXNlID0gXy5Qcm9taXNlO1xuXG4vKipcbiAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIHNldCBvZiBhY3Rpb25zXG4gKlxuICogQHBhcmFtIGRlZmluaXRpb25zIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFjdGlvbnMgdG8gYmUgY3JlYXRlZFxuICogQHJldHVybnMgYW4gb2JqZWN0IHdpdGggYWN0aW9ucyBvZiBjb3JyZXNwb25kaW5nIGFjdGlvbiBuYW1lc1xuICovXG5leHBvcnRzLmNyZWF0ZUFjdGlvbnMgPSBmdW5jdGlvbihkZWZpbml0aW9ucykge1xuICAgIHZhciBhY3Rpb25zID0ge307XG4gICAgZm9yICh2YXIgayBpbiBkZWZpbml0aW9ucyl7XG4gICAgICAgIGlmIChkZWZpbml0aW9ucy5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IGRlZmluaXRpb25zW2tdLFxuICAgICAgICAgICAgICAgIGFjdGlvbk5hbWUgPSBfLmlzT2JqZWN0KHZhbCkgPyBrIDogdmFsO1xuXG4gICAgICAgICAgICBhY3Rpb25zW2FjdGlvbk5hbWVdID0gZXhwb3J0cy5jcmVhdGVBY3Rpb24odmFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWN0aW9ucztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgZXZlbnRtaXR0ZXIgdGhhdCBSZWZsdXggdXNlc1xuICovXG5leHBvcnRzLnNldEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKGN0eCkge1xuICAgIHZhciBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuICAgIGV4cG9ydHMuRXZlbnRFbWl0dGVyID0gXy5FdmVudEVtaXR0ZXIgPSBjdHg7XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgUHJvbWlzZSBsaWJyYXJ5IHRoYXQgUmVmbHV4IHVzZXNcbiAqL1xuZXhwb3J0cy5zZXRQcm9taXNlID0gZnVuY3Rpb24oY3R4KSB7XG4gICAgdmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG4gICAgZXhwb3J0cy5Qcm9taXNlID0gXy5Qcm9taXNlID0gY3R4O1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIFByb21pc2UgZmFjdG9yeSB0aGF0IGNyZWF0ZXMgbmV3IHByb21pc2VzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmYWN0b3J5IGhhcyB0aGUgc2lnbmF0dXJlIGBmdW5jdGlvbihyZXNvbHZlcikgeyByZXR1cm4gW25ldyBQcm9taXNlXTsgfWBcbiAqL1xuZXhwb3J0cy5zZXRQcm9taXNlRmFjdG9yeSA9IGZ1bmN0aW9uKGZhY3RvcnkpIHtcbiAgICB2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbiAgICBfLmNyZWF0ZVByb21pc2UgPSBmYWN0b3J5O1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIG1ldGhvZCB1c2VkIGZvciBkZWZlcnJpbmcgYWN0aW9ucyBhbmQgc3RvcmVzXG4gKi9cbmV4cG9ydHMubmV4dFRpY2sgPSBmdW5jdGlvbihuZXh0VGljaykge1xuICAgIHZhciBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuICAgIF8ubmV4dFRpY2sgPSBuZXh0VGljaztcbn07XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIHNldCBvZiBjcmVhdGVkIGFjdGlvbnMgYW5kIHN0b3JlcyBmb3IgaW50cm9zcGVjdGlvblxuICovXG5leHBvcnRzLl9fa2VlcCA9IHJlcXVpcmUoJy4vS2VlcCcpO1xuXG4vKipcbiAqIFdhcm4gaWYgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgbm90IGF2YWlsYWJsZVxuICovXG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIG5vdCBhdmFpbGFibGUuICcgK1xuICAgICdFUzUgc2hpbSByZXF1aXJlZC4gJyArXG4gICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9zcG9pa2UvcmVmbHV4anMjZXM1J1xuICApO1xufVxuIiwiLyoqXG4gKiBJbnRlcm5hbCBtb2R1bGUgdXNlZCB0byBjcmVhdGUgc3RhdGljIGFuZCBpbnN0YW5jZSBqb2luIG1ldGhvZHNcbiAqL1xuXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UsXG4gICAgXyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpLFxuICAgIGNyZWF0ZVN0b3JlID0gcmVxdWlyZShcIi4vY3JlYXRlU3RvcmVcIiksXG4gICAgc3RyYXRlZ3lNZXRob2ROYW1lcyA9IHtcbiAgICAgICAgc3RyaWN0OiBcImpvaW5TdHJpY3RcIixcbiAgICAgICAgZmlyc3Q6IFwiam9pbkxlYWRpbmdcIixcbiAgICAgICAgbGFzdDogXCJqb2luVHJhaWxpbmdcIixcbiAgICAgICAgYWxsOiBcImpvaW5Db25jYXRcIlxuICAgIH07XG5cbi8qKlxuICogVXNlZCBpbiBgaW5kZXguanNgIHRvIGNyZWF0ZSB0aGUgc3RhdGljIGpvaW4gbWV0aG9kc1xuICogQHBhcmFtIHtTdHJpbmd9IHN0cmF0ZWd5IFdoaWNoIHN0cmF0ZWd5IHRvIHVzZSB3aGVuIHRyYWNraW5nIGxpc3RlbmFibGUgdHJpZ2dlciBhcmd1bWVudHNcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBzdGF0aWMgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIHN0b3JlIHdpdGggYSBqb2luIGxpc3RlbiBvbiB0aGUgZ2l2ZW4gbGlzdGVuYWJsZXMgdXNpbmcgdGhlIGdpdmVuIHN0cmF0ZWd5XG4gKi9cbmV4cG9ydHMuc3RhdGljSm9pbkNyZWF0b3IgPSBmdW5jdGlvbihzdHJhdGVneSl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKC8qIGxpc3RlbmFibGVzLi4uICovKSB7XG4gICAgICAgIHZhciBsaXN0ZW5hYmxlcyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVN0b3JlKHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpc1tzdHJhdGVneU1ldGhvZE5hbWVzW3N0cmF0ZWd5XV0uYXBwbHkodGhpcyxsaXN0ZW5hYmxlcy5jb25jYXQoXCJ0cmlnZ2VyQXN5bmNcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufTtcblxuLyoqXG4gKiBVc2VkIGluIGBMaXN0ZW5lck1ldGhvZHMuanNgIHRvIGNyZWF0ZSB0aGUgaW5zdGFuY2Ugam9pbiBtZXRob2RzXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyYXRlZ3kgV2hpY2ggc3RyYXRlZ3kgdG8gdXNlIHdoZW4gdHJhY2tpbmcgbGlzdGVuYWJsZSB0cmlnZ2VyIGFyZ3VtZW50c1xuICogQHJldHVybnMge0Z1bmN0aW9ufSBBbiBpbnN0YW5jZSBtZXRob2Qgd2hpY2ggc2V0cyB1cCBhIGpvaW4gbGlzdGVuIG9uIHRoZSBnaXZlbiBsaXN0ZW5hYmxlcyB1c2luZyB0aGUgZ2l2ZW4gc3RyYXRlZ3lcbiAqL1xuZXhwb3J0cy5pbnN0YW5jZUpvaW5DcmVhdG9yID0gZnVuY3Rpb24oc3RyYXRlZ3kpe1xuICAgIHJldHVybiBmdW5jdGlvbigvKiBsaXN0ZW5hYmxlcy4uLiwgY2FsbGJhY2sqLyl7XG4gICAgICAgIF8udGhyb3dJZihhcmd1bWVudHMubGVuZ3RoIDwgMywnQ2Fubm90IGNyZWF0ZSBhIGpvaW4gd2l0aCBsZXNzIHRoYW4gMiBsaXN0ZW5hYmxlcyEnKTtcbiAgICAgICAgdmFyIGxpc3RlbmFibGVzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpLFxuICAgICAgICAgICAgY2FsbGJhY2sgPSBsaXN0ZW5hYmxlcy5wb3AoKSxcbiAgICAgICAgICAgIG51bWJlck9mTGlzdGVuYWJsZXMgPSBsaXN0ZW5hYmxlcy5sZW5ndGgsXG4gICAgICAgICAgICBqb2luID0ge1xuICAgICAgICAgICAgICAgIG51bWJlck9mTGlzdGVuYWJsZXM6IG51bWJlck9mTGlzdGVuYWJsZXMsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHRoaXNbY2FsbGJhY2tdfHxjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcjogdGhpcyxcbiAgICAgICAgICAgICAgICBzdHJhdGVneTogc3RyYXRlZ3lcbiAgICAgICAgICAgIH0sIGksIGNhbmNlbHMgPSBbXSwgc3Vib2JqO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtYmVyT2ZMaXN0ZW5hYmxlczsgaSsrKSB7XG4gICAgICAgICAgICBfLnRocm93SWYodGhpcy52YWxpZGF0ZUxpc3RlbmluZyhsaXN0ZW5hYmxlc1tpXSkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1iZXJPZkxpc3RlbmFibGVzOyBpKyspIHtcbiAgICAgICAgICAgIGNhbmNlbHMucHVzaChsaXN0ZW5hYmxlc1tpXS5saXN0ZW4obmV3TGlzdGVuZXIoaSxqb2luKSx0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzZXQoam9pbik7XG4gICAgICAgIHN1Ym9iaiA9IHtsaXN0ZW5hYmxlOiBsaXN0ZW5hYmxlc307XG4gICAgICAgIHN1Ym9iai5zdG9wID0gbWFrZVN0b3BwZXIoc3Vib2JqLGNhbmNlbHMsdGhpcyk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9ICh0aGlzLnN1YnNjcmlwdGlvbnMgfHwgW10pLmNvbmNhdChzdWJvYmopO1xuICAgICAgICByZXR1cm4gc3Vib2JqO1xuICAgIH07XG59O1xuXG4vLyAtLS0tIGludGVybmFsIGpvaW4gZnVuY3Rpb25zIC0tLS1cblxuZnVuY3Rpb24gbWFrZVN0b3BwZXIoc3Vib2JqLGNhbmNlbHMsY29udGV4dCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSwgc3VicyA9IGNvbnRleHQuc3Vic2NyaXB0aW9ucyxcbiAgICAgICAgICAgIGluZGV4ID0gKHN1YnMgPyBzdWJzLmluZGV4T2Yoc3Vib2JqKSA6IC0xKTtcbiAgICAgICAgXy50aHJvd0lmKGluZGV4ID09PSAtMSwnVHJpZWQgdG8gcmVtb3ZlIGpvaW4gYWxyZWFkeSBnb25lIGZyb20gc3Vic2NyaXB0aW9ucyBsaXN0IScpO1xuICAgICAgICBmb3IoaT0wO2kgPCBjYW5jZWxzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGNhbmNlbHNbaV0oKTtcbiAgICAgICAgfVxuICAgICAgICBzdWJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gcmVzZXQoam9pbikge1xuICAgIGpvaW4ubGlzdGVuYWJsZXNFbWl0dGVkID0gbmV3IEFycmF5KGpvaW4ubnVtYmVyT2ZMaXN0ZW5hYmxlcyk7XG4gICAgam9pbi5hcmdzID0gbmV3IEFycmF5KGpvaW4ubnVtYmVyT2ZMaXN0ZW5hYmxlcyk7XG59XG5cbmZ1bmN0aW9uIG5ld0xpc3RlbmVyKGksam9pbikge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNhbGxhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICBpZiAoam9pbi5saXN0ZW5hYmxlc0VtaXR0ZWRbaV0pe1xuICAgICAgICAgICAgc3dpdGNoKGpvaW4uc3RyYXRlZ3kpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHJpY3RcIjogdGhyb3cgbmV3IEVycm9yKFwiU3RyaWN0IGpvaW4gZmFpbGVkIGJlY2F1c2UgbGlzdGVuZXIgdHJpZ2dlcmVkIHR3aWNlLlwiKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwibGFzdFwiOiBqb2luLmFyZ3NbaV0gPSBjYWxsYXJnczsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFsbFwiOiBqb2luLmFyZ3NbaV0ucHVzaChjYWxsYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBqb2luLmxpc3RlbmFibGVzRW1pdHRlZFtpXSA9IHRydWU7XG4gICAgICAgICAgICBqb2luLmFyZ3NbaV0gPSAoam9pbi5zdHJhdGVneT09PVwiYWxsXCI/W2NhbGxhcmdzXTpjYWxsYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZW1pdElmQWxsTGlzdGVuYWJsZXNFbWl0dGVkKGpvaW4pO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGVtaXRJZkFsbExpc3RlbmFibGVzRW1pdHRlZChqb2luKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqb2luLm51bWJlck9mTGlzdGVuYWJsZXM7IGkrKykge1xuICAgICAgICBpZiAoIWpvaW4ubGlzdGVuYWJsZXNFbWl0dGVkW2ldKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgam9pbi5jYWxsYmFjay5hcHBseShqb2luLmxpc3RlbmVyLGpvaW4uYXJncyk7XG4gICAgcmVzZXQoam9pbik7XG59XG4iLCJ2YXIgUmVmbHV4ID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuXG5cbi8qKlxuICogQSBtaXhpbiBmYWN0b3J5IGZvciBhIFJlYWN0IGNvbXBvbmVudC4gTWVhbnQgYXMgYSBtb3JlIGNvbnZlbmllbnQgd2F5IG9mIHVzaW5nIHRoZSBgTGlzdGVuZXJNaXhpbmAsXG4gKiB3aXRob3V0IGhhdmluZyB0byBtYW51YWxseSBzZXQgbGlzdGVuZXJzIGluIHRoZSBgY29tcG9uZW50RGlkTW91bnRgIG1ldGhvZC5cbiAqXG4gKiBAcGFyYW0ge0FjdGlvbnxTdG9yZX0gbGlzdGVuYWJsZSBBbiBBY3Rpb24gb3IgU3RvcmUgdGhhdCBzaG91bGQgYmVcbiAqICBsaXN0ZW5lZCB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcmVnaXN0ZXIgYXMgZXZlbnQgaGFuZGxlclxuICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGRlZmF1bHRDYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcmVnaXN0ZXIgYXMgZGVmYXVsdCBoYW5kbGVyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvYmplY3QgdG8gYmUgdXNlZCBhcyBhIG1peGluLCB3aGljaCBzZXRzIHVwIHRoZSBsaXN0ZW5lciBmb3IgdGhlIGdpdmVuIGxpc3RlbmFibGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdGVuYWJsZSxjYWxsYmFjayxpbml0aWFsKXtcbiAgICByZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHVwIHRoZSBtaXhpbiBiZWZvcmUgdGhlIGluaXRpYWwgcmVuZGVyaW5nIG9jY3Vycy4gSW1wb3J0IG1ldGhvZHMgZnJvbSBgTGlzdGVuZXJNZXRob2RzYFxuICAgICAgICAgKiBhbmQgdGhlbiBtYWtlIHRoZSBjYWxsIHRvIGBsaXN0ZW5Ub2Agd2l0aCB0aGUgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBmYWN0b3J5IGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IodmFyIG0gaW4gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbbV0gIT09IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHNbbV0pe1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1ttXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbid0IGhhdmUgb3RoZXIgcHJvcGVydHkgJ1wiK20rXCInIHdoZW4gdXNpbmcgUmVmbHV4Lmxpc3RlblRvIVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbV0gPSBSZWZsdXguTGlzdGVuZXJNZXRob2RzW21dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG8obGlzdGVuYWJsZSxjYWxsYmFjayxpbml0aWFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFucyB1cCBhbGwgbGlzdGVuZXIgcHJldmlvdXNseSByZWdpc3RlcmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQ6IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMuc3RvcExpc3RlbmluZ1RvQWxsXG4gICAgfTtcbn07XG4iLCJ2YXIgUmVmbHV4ID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuXG4vKipcbiAqIEEgbWl4aW4gZmFjdG9yeSBmb3IgYSBSZWFjdCBjb21wb25lbnQuIE1lYW50IGFzIGEgbW9yZSBjb252ZW5pZW50IHdheSBvZiB1c2luZyB0aGUgYGxpc3RlbmVyTWl4aW5gLFxuICogd2l0aG91dCBoYXZpbmcgdG8gbWFudWFsbHkgc2V0IGxpc3RlbmVycyBpbiB0aGUgYGNvbXBvbmVudERpZE1vdW50YCBtZXRob2QuIFRoaXMgdmVyc2lvbiBpcyB1c2VkXG4gKiB0byBhdXRvbWF0aWNhbGx5IHNldCB1cCBhIGBsaXN0ZW5Ub01hbnlgIGNhbGwuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmFibGVzIEFuIG9iamVjdCBvZiBsaXN0ZW5hYmxlc1xuICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHRvIGJlIHVzZWQgYXMgYSBtaXhpbiwgd2hpY2ggc2V0cyB1cCB0aGUgbGlzdGVuZXJzIGZvciB0aGUgZ2l2ZW4gbGlzdGVuYWJsZXMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdGVuYWJsZXMpe1xuICAgIHJldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdXAgdGhlIG1peGluIGJlZm9yZSB0aGUgaW5pdGlhbCByZW5kZXJpbmcgb2NjdXJzLiBJbXBvcnQgbWV0aG9kcyBmcm9tIGBMaXN0ZW5lck1ldGhvZHNgXG4gICAgICAgICAqIGFuZCB0aGVuIG1ha2UgdGhlIGNhbGwgdG8gYGxpc3RlblRvYCB3aXRoIHRoZSBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGZhY3RvcnkgZnVuY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvcih2YXIgbSBpbiBSZWZsdXguTGlzdGVuZXJNZXRob2RzKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpc1ttXSAhPT0gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kc1ttXSl7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW21dKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiQ2FuJ3QgaGF2ZSBvdGhlciBwcm9wZXJ0eSAnXCIrbStcIicgd2hlbiB1c2luZyBSZWZsdXgubGlzdGVuVG9NYW55IVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbV0gPSBSZWZsdXguTGlzdGVuZXJNZXRob2RzW21dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG9NYW55KGxpc3RlbmFibGVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFucyB1cCBhbGwgbGlzdGVuZXIgcHJldmlvdXNseSByZWdpc3RlcmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQ6IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMuc3RvcExpc3RlbmluZ1RvQWxsXG4gICAgfTtcbn07XG4iLCJ2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtaXgoZGVmKSB7XG4gICAgdmFyIGNvbXBvc2VkID0ge1xuICAgICAgICBpbml0OiBbXSxcbiAgICAgICAgcHJlRW1pdDogW10sXG4gICAgICAgIHNob3VsZEVtaXQ6IFtdXG4gICAgfTtcblxuICAgIHZhciB1cGRhdGVkID0gKGZ1bmN0aW9uIG1peERlZihtaXhpbikge1xuICAgICAgICB2YXIgbWl4ZWQgPSB7fTtcbiAgICAgICAgaWYgKG1peGluLm1peGlucykge1xuICAgICAgICAgICAgbWl4aW4ubWl4aW5zLmZvckVhY2goZnVuY3Rpb24gKHN1Yk1peGluKSB7XG4gICAgICAgICAgICAgICAgXy5leHRlbmQobWl4ZWQsIG1peERlZihzdWJNaXhpbikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXy5leHRlbmQobWl4ZWQsIG1peGluKTtcbiAgICAgICAgT2JqZWN0LmtleXMoY29tcG9zZWQpLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvc2FibGUpIHtcbiAgICAgICAgICAgIGlmIChtaXhpbi5oYXNPd25Qcm9wZXJ0eShjb21wb3NhYmxlKSkge1xuICAgICAgICAgICAgICAgIGNvbXBvc2VkW2NvbXBvc2FibGVdLnB1c2gobWl4aW5bY29tcG9zYWJsZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG1peGVkO1xuICAgIH0oZGVmKSk7XG5cbiAgICBpZiAoY29tcG9zZWQuaW5pdC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHVwZGF0ZWQuaW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgY29tcG9zZWQuaW5pdC5mb3JFYWNoKGZ1bmN0aW9uIChpbml0KSB7XG4gICAgICAgICAgICAgICAgaW5pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoY29tcG9zZWQucHJlRW1pdC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHVwZGF0ZWQucHJlRW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBjb21wb3NlZC5wcmVFbWl0LnJlZHVjZShmdW5jdGlvbiAoYXJncywgcHJlRW1pdCkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdWYWx1ZSA9IHByZUVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbHVlID09PSB1bmRlZmluZWQgPyBhcmdzIDogW25ld1ZhbHVlXTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKGNvbXBvc2VkLnNob3VsZEVtaXQubGVuZ3RoID4gMSkge1xuICAgICAgICB1cGRhdGVkLnNob3VsZEVtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIHJldHVybiAhY29tcG9zZWQuc2hvdWxkRW1pdC5zb21lKGZ1bmN0aW9uIChzaG91bGRFbWl0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFzaG91bGRFbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIE9iamVjdC5rZXlzKGNvbXBvc2VkKS5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb3NhYmxlKSB7XG4gICAgICAgIGlmIChjb21wb3NlZFtjb21wb3NhYmxlXS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHVwZGF0ZWRbY29tcG9zYWJsZV0gPSBjb21wb3NlZFtjb21wb3NhYmxlXVswXTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHVwZGF0ZWQ7XG59O1xuIiwiLypcbiAqIGlzT2JqZWN0LCBleHRlbmQsIGlzRnVuY3Rpb24sIGlzQXJndW1lbnRzIGFyZSB0YWtlbiBmcm9tIHVuZGVzY29yZS9sb2Rhc2ggaW5cbiAqIG9yZGVyIHRvIHJlbW92ZSB0aGUgZGVwZW5kZW5jeVxuICovXG52YXIgaXNPYmplY3QgPSBleHBvcnRzLmlzT2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhb2JqO1xufTtcblxuZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgdmFyIHNvdXJjZSwgcHJvcDtcbiAgICBmb3IgKHZhciBpID0gMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yIChwcm9wIGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBwcm9wKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBwcm9wZXJ0eURlc2NyaXB0b3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbmV4cG9ydHMuRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpO1xuXG5leHBvcnRzLm5leHRUaWNrID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcbn07XG5cbmV4cG9ydHMuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKHN0cmluZyl7XG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKStzdHJpbmcuc2xpY2UoMSk7XG59O1xuXG5leHBvcnRzLmNhbGxiYWNrTmFtZSA9IGZ1bmN0aW9uKHN0cmluZyl7XG4gICAgcmV0dXJuIFwib25cIitleHBvcnRzLmNhcGl0YWxpemUoc3RyaW5nKTtcbn07XG5cbmV4cG9ydHMub2JqZWN0ID0gZnVuY3Rpb24oa2V5cyx2YWxzKXtcbiAgICB2YXIgbz17fSwgaT0wO1xuICAgIGZvcig7aTxrZXlzLmxlbmd0aDtpKyspe1xuICAgICAgICBvW2tleXNbaV1dID0gdmFsc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIG87XG59O1xuXG5leHBvcnRzLlByb21pc2UgPSByZXF1aXJlKFwibmF0aXZlLXByb21pc2Utb25seVwiKTtcblxuZXhwb3J0cy5jcmVhdGVQcm9taXNlID0gZnVuY3Rpb24ocmVzb2x2ZXIpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUHJvbWlzZShyZXNvbHZlcik7XG59O1xuXG5leHBvcnRzLmlzQXJndW1lbnRzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAoJ2NhbGxlZScgaW4gdmFsdWUpICYmIHR5cGVvZiB2YWx1ZS5sZW5ndGggPT09ICdudW1iZXInO1xufTtcblxuZXhwb3J0cy50aHJvd0lmID0gZnVuY3Rpb24odmFsLG1zZyl7XG4gICAgaWYgKHZhbCl7XG4gICAgICAgIHRocm93IEVycm9yKG1zZ3x8dmFsKTtcbiAgICB9XG59O1xuIiwiLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbnZhciBFbWl0dGVyID0gcmVxdWlyZSgnZW1pdHRlcicpO1xudmFyIHJlZHVjZSA9IHJlcXVpcmUoJ3JlZHVjZScpO1xuXG4vKipcbiAqIFJvb3QgcmVmZXJlbmNlIGZvciBpZnJhbWVzLlxuICovXG5cbnZhciByb290ID0gJ3VuZGVmaW5lZCcgPT0gdHlwZW9mIHdpbmRvd1xuICA/IHRoaXNcbiAgOiB3aW5kb3c7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBub29wKCl7fTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcbiAqXG4gKiBUT0RPOiBmdXR1cmUgcHJvb2YsIG1vdmUgdG8gY29tcG9lbnQgbGFuZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0hvc3Qob2JqKSB7XG4gIHZhciBzdHIgPSB7fS50b1N0cmluZy5jYWxsKG9iaik7XG5cbiAgc3dpdGNoIChzdHIpIHtcbiAgICBjYXNlICdbb2JqZWN0IEZpbGVdJzpcbiAgICBjYXNlICdbb2JqZWN0IEJsb2JdJzpcbiAgICBjYXNlICdbb2JqZWN0IEZvcm1EYXRhXSc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIFhIUi5cbiAqL1xuXG5yZXF1ZXN0LmdldFhIUiA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3RcbiAgICAmJiAoJ2ZpbGU6JyAhPSByb290LmxvY2F0aW9uLnByb3RvY29sIHx8ICFyb290LkFjdGl2ZVhPYmplY3QpKSB7XG4gICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtcbiAgfSBlbHNlIHtcbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC4zLjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLCBhZGRlZCB0byBzdXBwb3J0IElFLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG52YXIgdHJpbSA9ICcnLnRyaW1cbiAgPyBmdW5jdGlvbihzKSB7IHJldHVybiBzLnRyaW0oKTsgfVxuICA6IGZ1bmN0aW9uKHMpIHsgcmV0dXJuIHMucmVwbGFjZSgvKF5cXHMqfFxccyokKS9nLCAnJyk7IH07XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIG9iaiA9PT0gT2JqZWN0KG9iaik7XG59XG5cbi8qKlxuICogU2VyaWFsaXplIHRoZSBnaXZlbiBgb2JqYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzZXJpYWxpemUob2JqKSB7XG4gIGlmICghaXNPYmplY3Qob2JqKSkgcmV0dXJuIG9iajtcbiAgdmFyIHBhaXJzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAobnVsbCAhPSBvYmpba2V5XSkge1xuICAgICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KVxuICAgICAgICArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGFpcnMuam9pbignJicpO1xufVxuXG4vKipcbiAqIEV4cG9zZSBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemVPYmplY3QgPSBzZXJpYWxpemU7XG5cbiAvKipcbiAgKiBQYXJzZSB0aGUgZ2l2ZW4geC13d3ctZm9ybS11cmxlbmNvZGVkIGBzdHJgLlxuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAqIEByZXR1cm4ge09iamVjdH1cbiAgKiBAYXBpIHByaXZhdGVcbiAgKi9cblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoc3RyKSB7XG4gIHZhciBvYmogPSB7fTtcbiAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KCcmJyk7XG4gIHZhciBwYXJ0cztcbiAgdmFyIHBhaXI7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcGFpciA9IHBhaXJzW2ldO1xuICAgIHBhcnRzID0gcGFpci5zcGxpdCgnPScpO1xuICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFydHNbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0c1sxXSk7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEV4cG9zZSBwYXJzZXIuXG4gKi9cblxucmVxdWVzdC5wYXJzZVN0cmluZyA9IHBhcnNlU3RyaW5nO1xuXG4vKipcbiAqIERlZmF1bHQgTUlNRSB0eXBlIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKi9cblxucmVxdWVzdC50eXBlcyA9IHtcbiAgaHRtbDogJ3RleHQvaHRtbCcsXG4gIGpzb246ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgeG1sOiAnYXBwbGljYXRpb24veG1sJyxcbiAgdXJsZW5jb2RlZDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtLWRhdGEnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IHNlcmlhbGl6YXRpb24gbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihvYmope1xuICogICAgICAgcmV0dXJuICdnZW5lcmF0ZWQgeG1sIGhlcmUnO1xuICogICAgIH07XG4gKlxuICovXG5cbiByZXF1ZXN0LnNlcmlhbGl6ZSA9IHtcbiAgICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBzZXJpYWxpemUsXG4gICAnYXBwbGljYXRpb24vanNvbic6IEpTT04uc3RyaW5naWZ5XG4gfTtcblxuIC8qKlxuICAqIERlZmF1bHQgcGFyc2Vycy5cbiAgKlxuICAqICAgICBzdXBlcmFnZW50LnBhcnNlWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKHN0cil7XG4gICogICAgICAgcmV0dXJuIHsgb2JqZWN0IHBhcnNlZCBmcm9tIHN0ciB9O1xuICAqICAgICB9O1xuICAqXG4gICovXG5cbnJlcXVlc3QucGFyc2UgPSB7XG4gICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBwYXJzZVN0cmluZyxcbiAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnBhcnNlXG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBoZWFkZXIgYHN0cmAgaW50b1xuICogYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1hcHBlZCBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VIZWFkZXIoc3RyKSB7XG4gIHZhciBsaW5lcyA9IHN0ci5zcGxpdCgvXFxyP1xcbi8pO1xuICB2YXIgZmllbGRzID0ge307XG4gIHZhciBpbmRleDtcbiAgdmFyIGxpbmU7XG4gIHZhciBmaWVsZDtcbiAgdmFyIHZhbDtcblxuICBsaW5lcy5wb3AoKTsgLy8gdHJhaWxpbmcgQ1JMRlxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBpbmRleCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGZpZWxkID0gbGluZS5zbGljZSgwLCBpbmRleCkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB0cmltKGxpbmUuc2xpY2UoaW5kZXggKyAxKSk7XG4gICAgZmllbGRzW2ZpZWxkXSA9IHZhbDtcbiAgfVxuXG4gIHJldHVybiBmaWVsZHM7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBtaW1lIHR5cGUgZm9yIHRoZSBnaXZlbiBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiB0eXBlKHN0cil7XG4gIHJldHVybiBzdHIuc3BsaXQoLyAqOyAqLykuc2hpZnQoKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGhlYWRlciBmaWVsZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcmFtcyhzdHIpe1xuICByZXR1cm4gcmVkdWNlKHN0ci5zcGxpdCgvICo7ICovKSwgZnVuY3Rpb24ob2JqLCBzdHIpe1xuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvICo9ICovKVxuICAgICAgLCBrZXkgPSBwYXJ0cy5zaGlmdCgpXG4gICAgICAsIHZhbCA9IHBhcnRzLnNoaWZ0KCk7XG5cbiAgICBpZiAoa2V5ICYmIHZhbCkgb2JqW2tleV0gPSB2YWw7XG4gICAgcmV0dXJuIG9iajtcbiAgfSwge30pO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZWAgd2l0aCB0aGUgZ2l2ZW4gYHhocmAuXG4gKlxuICogIC0gc2V0IGZsYWdzICgub2ssIC5lcnJvciwgZXRjKVxuICogIC0gcGFyc2UgaGVhZGVyXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogIEFsaWFzaW5nIGBzdXBlcmFnZW50YCBhcyBgcmVxdWVzdGAgaXMgbmljZTpcbiAqXG4gKiAgICAgIHJlcXVlc3QgPSBzdXBlcmFnZW50O1xuICpcbiAqICBXZSBjYW4gdXNlIHRoZSBwcm9taXNlLWxpa2UgQVBJLCBvciBwYXNzIGNhbGxiYWNrczpcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJykuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvJywgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgU2VuZGluZyBkYXRhIGNhbiBiZSBjaGFpbmVkOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5zZW5kKClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnBvc3QoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIE9yIGZ1cnRoZXIgcmVkdWNlZCB0byBhIHNpbmdsZSBjYWxsIGZvciBzaW1wbGUgY2FzZXM6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJywgeyBuYW1lOiAndGonIH0sIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogQHBhcmFtIHtYTUxIVFRQUmVxdWVzdH0geGhyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2UocmVxLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLnJlcSA9IHJlcTtcbiAgdGhpcy54aHIgPSB0aGlzLnJlcS54aHI7XG4gIC8vIHJlc3BvbnNlVGV4dCBpcyBhY2Nlc3NpYmxlIG9ubHkgaWYgcmVzcG9uc2VUeXBlIGlzICcnIG9yICd0ZXh0JyBhbmQgb24gb2xkZXIgYnJvd3NlcnNcbiAgdGhpcy50ZXh0ID0gKCh0aGlzLnJlcS5tZXRob2QgIT0nSEVBRCcgJiYgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpKSB8fCB0eXBlb2YgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJylcbiAgICAgPyB0aGlzLnhoci5yZXNwb25zZVRleHRcbiAgICAgOiBudWxsO1xuICB0aGlzLnN0YXR1c1RleHQgPSB0aGlzLnJlcS54aHIuc3RhdHVzVGV4dDtcbiAgdGhpcy5zZXRTdGF0dXNQcm9wZXJ0aWVzKHRoaXMueGhyLnN0YXR1cyk7XG4gIHRoaXMuaGVhZGVyID0gdGhpcy5oZWFkZXJzID0gcGFyc2VIZWFkZXIodGhpcy54aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAvLyBnZXRBbGxSZXNwb25zZUhlYWRlcnMgc29tZXRpbWVzIGZhbHNlbHkgcmV0dXJucyBcIlwiIGZvciBDT1JTIHJlcXVlc3RzLCBidXRcbiAgLy8gZ2V0UmVzcG9uc2VIZWFkZXIgc3RpbGwgd29ya3MuIHNvIHdlIGdldCBjb250ZW50LXR5cGUgZXZlbiBpZiBnZXR0aW5nXG4gIC8vIG90aGVyIGhlYWRlcnMgZmFpbHMuXG4gIHRoaXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKTtcbiAgdGhpcy5zZXRIZWFkZXJQcm9wZXJ0aWVzKHRoaXMuaGVhZGVyKTtcbiAgdGhpcy5ib2R5ID0gdGhpcy5yZXEubWV0aG9kICE9ICdIRUFEJ1xuICAgID8gdGhpcy5wYXJzZUJvZHkodGhpcy50ZXh0ID8gdGhpcy50ZXh0IDogdGhpcy54aHIucmVzcG9uc2UpXG4gICAgOiBudWxsO1xufVxuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLmhlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciByZWxhdGVkIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGAudHlwZWAgdGhlIGNvbnRlbnQgdHlwZSB3aXRob3V0IHBhcmFtc1xuICpcbiAqIEEgcmVzcG9uc2Ugb2YgXCJDb250ZW50LVR5cGU6IHRleHQvcGxhaW47IGNoYXJzZXQ9dXRmLThcIlxuICogd2lsbCBwcm92aWRlIHlvdSB3aXRoIGEgYC50eXBlYCBvZiBcInRleHQvcGxhaW5cIi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuc2V0SGVhZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uKGhlYWRlcil7XG4gIC8vIGNvbnRlbnQtdHlwZVxuICB2YXIgY3QgPSB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gfHwgJyc7XG4gIHRoaXMudHlwZSA9IHR5cGUoY3QpO1xuXG4gIC8vIHBhcmFtc1xuICB2YXIgb2JqID0gcGFyYW1zKGN0KTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikgdGhpc1trZXldID0gb2JqW2tleV07XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBib2R5IGBzdHJgLlxuICpcbiAqIFVzZWQgZm9yIGF1dG8tcGFyc2luZyBvZiBib2RpZXMuIFBhcnNlcnNcbiAqIGFyZSBkZWZpbmVkIG9uIHRoZSBgc3VwZXJhZ2VudC5wYXJzZWAgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnBhcnNlQm9keSA9IGZ1bmN0aW9uKHN0cil7XG4gIHZhciBwYXJzZSA9IHJlcXVlc3QucGFyc2VbdGhpcy50eXBlXTtcbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiAoc3RyLmxlbmd0aCB8fCBzdHIgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBTZXQgZmxhZ3Mgc3VjaCBhcyBgLm9rYCBiYXNlZCBvbiBgc3RhdHVzYC5cbiAqXG4gKiBGb3IgZXhhbXBsZSBhIDJ4eCByZXNwb25zZSB3aWxsIGdpdmUgeW91IGEgYC5va2Agb2YgX190cnVlX19cbiAqIHdoZXJlYXMgNXh4IHdpbGwgYmUgX19mYWxzZV9fIGFuZCBgLmVycm9yYCB3aWxsIGJlIF9fdHJ1ZV9fLiBUaGVcbiAqIGAuY2xpZW50RXJyb3JgIGFuZCBgLnNlcnZlckVycm9yYCBhcmUgYWxzbyBhdmFpbGFibGUgdG8gYmUgbW9yZVxuICogc3BlY2lmaWMsIGFuZCBgLnN0YXR1c1R5cGVgIGlzIHRoZSBjbGFzcyBvZiBlcnJvciByYW5naW5nIGZyb20gMS4uNVxuICogc29tZXRpbWVzIHVzZWZ1bCBmb3IgbWFwcGluZyByZXNwb25kIGNvbG9ycyBldGMuXG4gKlxuICogXCJzdWdhclwiIHByb3BlcnRpZXMgYXJlIGFsc28gZGVmaW5lZCBmb3IgY29tbW9uIGNhc2VzLiBDdXJyZW50bHkgcHJvdmlkaW5nOlxuICpcbiAqICAgLSAubm9Db250ZW50XG4gKiAgIC0gLmJhZFJlcXVlc3RcbiAqICAgLSAudW5hdXRob3JpemVkXG4gKiAgIC0gLm5vdEFjY2VwdGFibGVcbiAqICAgLSAubm90Rm91bmRcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc3RhdHVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cyl7XG4gIHZhciB0eXBlID0gc3RhdHVzIC8gMTAwIHwgMDtcblxuICAvLyBzdGF0dXMgLyBjbGFzc1xuICB0aGlzLnN0YXR1cyA9IHN0YXR1cztcbiAgdGhpcy5zdGF0dXNUeXBlID0gdHlwZTtcblxuICAvLyBiYXNpY3NcbiAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICB0aGlzLm9rID0gMiA9PSB0eXBlO1xuICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICB0aGlzLnNlcnZlckVycm9yID0gNSA9PSB0eXBlO1xuICB0aGlzLmVycm9yID0gKDQgPT0gdHlwZSB8fCA1ID09IHR5cGUpXG4gICAgPyB0aGlzLnRvRXJyb3IoKVxuICAgIDogZmFsc2U7XG5cbiAgLy8gc3VnYXJcbiAgdGhpcy5hY2NlcHRlZCA9IDIwMiA9PSBzdGF0dXM7XG4gIHRoaXMubm9Db250ZW50ID0gMjA0ID09IHN0YXR1cyB8fCAxMjIzID09IHN0YXR1cztcbiAgdGhpcy5iYWRSZXF1ZXN0ID0gNDAwID09IHN0YXR1cztcbiAgdGhpcy51bmF1dGhvcml6ZWQgPSA0MDEgPT0gc3RhdHVzO1xuICB0aGlzLm5vdEFjY2VwdGFibGUgPSA0MDYgPT0gc3RhdHVzO1xuICB0aGlzLm5vdEZvdW5kID0gNDA0ID09IHN0YXR1cztcbiAgdGhpcy5mb3JiaWRkZW4gPSA0MDMgPT0gc3RhdHVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIHZhciByZXEgPSB0aGlzLnJlcTtcbiAgdmFyIG1ldGhvZCA9IHJlcS5tZXRob2Q7XG4gIHZhciB1cmwgPSByZXEudXJsO1xuXG4gIHZhciBtc2cgPSAnY2Fubm90ICcgKyBtZXRob2QgKyAnICcgKyB1cmwgKyAnICgnICsgdGhpcy5zdGF0dXMgKyAnKSc7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICBlcnIubWV0aG9kID0gbWV0aG9kO1xuICBlcnIudXJsID0gdXJsO1xuXG4gIHJldHVybiBlcnI7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VgLlxuICovXG5cbnJlcXVlc3QuUmVzcG9uc2UgPSBSZXNwb25zZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0YCB3aXRoIHRoZSBnaXZlbiBgbWV0aG9kYCBhbmQgYHVybGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgRW1pdHRlci5jYWxsKHRoaXMpO1xuICB0aGlzLl9xdWVyeSA9IHRoaXMuX3F1ZXJ5IHx8IFtdO1xuICB0aGlzLm1ldGhvZCA9IG1ldGhvZDtcbiAgdGhpcy51cmwgPSB1cmw7XG4gIHRoaXMuaGVhZGVyID0ge307XG4gIHRoaXMuX2hlYWRlciA9IHt9O1xuICB0aGlzLm9uKCdlbmQnLCBmdW5jdGlvbigpe1xuICAgIHZhciBlcnIgPSBudWxsO1xuICAgIHZhciByZXMgPSBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJlcyA9IG5ldyBSZXNwb25zZShzZWxmKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcignUGFyc2VyIGlzIHVuYWJsZSB0byBwYXJzZSB0aGUgcmVzcG9uc2UnKTtcbiAgICAgIGVyci5wYXJzZSA9IHRydWU7XG4gICAgICBlcnIub3JpZ2luYWwgPSBlO1xuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyKTtcbiAgICB9XG5cbiAgICBzZWxmLmVtaXQoJ3Jlc3BvbnNlJywgcmVzKTtcblxuICAgIGlmIChlcnIpIHtcbiAgICAgIHJldHVybiBzZWxmLmNhbGxiYWNrKGVyciwgcmVzKTtcbiAgICB9XG5cbiAgICBpZiAocmVzLnN0YXR1cyA+PSAyMDAgJiYgcmVzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgcmV0dXJuIHNlbGYuY2FsbGJhY2soZXJyLCByZXMpO1xuICAgIH1cblxuICAgIHZhciBuZXdfZXJyID0gbmV3IEVycm9yKHJlcy5zdGF0dXNUZXh0IHx8ICdVbnN1Y2Nlc3NmdWwgSFRUUCByZXNwb25zZScpO1xuICAgIG5ld19lcnIub3JpZ2luYWwgPSBlcnI7XG4gICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICBuZXdfZXJyLnN0YXR1cyA9IHJlcy5zdGF0dXM7XG5cbiAgICBzZWxmLmNhbGxiYWNrKGVyciB8fCBuZXdfZXJyLCByZXMpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBNaXhpbiBgRW1pdHRlcmAuXG4gKi9cblxuRW1pdHRlcihSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uKGZuKSB7XG4gIGZuKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBTZXQgdGltZW91dCB0byBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbihtcyl7XG4gIHRoaXMuX3RpbWVvdXQgPSBtcztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENsZWFyIHByZXZpb3VzIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuX3RpbWVvdXQgPSAwO1xuICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWJvcnQgdGhlIHJlcXVlc3QsIGFuZCBjbGVhciBwb3RlbnRpYWwgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCl7XG4gIGlmICh0aGlzLmFib3J0ZWQpIHJldHVybjtcbiAgdGhpcy5hYm9ydGVkID0gdHJ1ZTtcbiAgdGhpcy54aHIuYWJvcnQoKTtcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgdGhpcy5lbWl0KCdhYm9ydCcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IGhlYWRlciBgZmllbGRgIHRvIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0LlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5zZXQoJ1gtQVBJLUtleScsICdmb29iYXInKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCh7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1BUEktS2V5JzogJ2Zvb2JhcicgfSlcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24oZmllbGQsIHZhbCl7XG4gIGlmIChpc09iamVjdChmaWVsZCkpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gZmllbGQpIHtcbiAgICAgIHRoaXMuc2V0KGtleSwgZmllbGRba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXSA9IHZhbDtcbiAgdGhpcy5oZWFkZXJbZmllbGRdID0gdmFsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGhlYWRlciBgZmllbGRgLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAudW5zZXQoJ1VzZXItQWdlbnQnKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICBkZWxldGUgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xuICBkZWxldGUgdGhpcy5oZWFkZXJbZmllbGRdO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgaGVhZGVyIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5nZXRIZWFkZXIgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBDb250ZW50LVR5cGUgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCd4bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ2FwcGxpY2F0aW9uL3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudHlwZSA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQ29udGVudC1UeXBlJywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBY2NlcHQgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMuanNvbiA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjY2VwdFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQWNjZXB0JywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBdXRob3JpemF0aW9uIGZpZWxkIHZhbHVlIHdpdGggYHVzZXJgIGFuZCBgcGFzc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXNzXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uKHVzZXIsIHBhc3Mpe1xuICB2YXIgc3RyID0gYnRvYSh1c2VyICsgJzonICsgcGFzcyk7XG4gIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgJ0Jhc2ljICcgKyBzdHIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuKiBBZGQgcXVlcnktc3RyaW5nIGB2YWxgLlxuKlxuKiBFeGFtcGxlczpcbipcbiogICByZXF1ZXN0LmdldCgnL3Nob2VzJylcbiogICAgIC5xdWVyeSgnc2l6ZT0xMCcpXG4qICAgICAucXVlcnkoeyBjb2xvcjogJ2JsdWUnIH0pXG4qXG4qIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gdmFsXG4qIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuKiBAYXBpIHB1YmxpY1xuKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbih2YWwpe1xuICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkgdmFsID0gc2VyaWFsaXplKHZhbCk7XG4gIGlmICh2YWwpIHRoaXMuX3F1ZXJ5LnB1c2godmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlIHRoZSBmaWVsZCBgbmFtZWAgYW5kIGB2YWxgIGZvciBcIm11bHRpcGFydC9mb3JtLWRhdGFcIlxuICogcmVxdWVzdCBib2RpZXMuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoJ2ZvbycsICdiYXInKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ3xCbG9ifEZpbGV9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmZpZWxkID0gZnVuY3Rpb24obmFtZSwgdmFsKXtcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSkgdGhpcy5fZm9ybURhdGEgPSBuZXcgcm9vdC5Gb3JtRGF0YSgpO1xuICB0aGlzLl9mb3JtRGF0YS5hcHBlbmQobmFtZSwgdmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFF1ZXVlIHRoZSBnaXZlbiBgZmlsZWAgYXMgYW4gYXR0YWNobWVudCB0byB0aGUgc3BlY2lmaWVkIGBmaWVsZGAsXG4gKiB3aXRoIG9wdGlvbmFsIGBmaWxlbmFtZWAuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuYXR0YWNoKG5ldyBCbG9iKFsnPGEgaWQ9XCJhXCI+PGIgaWQ9XCJiXCI+aGV5ITwvYj48L2E+J10sIHsgdHlwZTogXCJ0ZXh0L2h0bWxcIn0pKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtCbG9ifEZpbGV9IGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uKGZpZWxkLCBmaWxlLCBmaWxlbmFtZSl7XG4gIGlmICghdGhpcy5fZm9ybURhdGEpIHRoaXMuX2Zvcm1EYXRhID0gbmV3IHJvb3QuRm9ybURhdGEoKTtcbiAgdGhpcy5fZm9ybURhdGEuYXBwZW5kKGZpZWxkLCBmaWxlLCBmaWxlbmFtZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZW5kIGBkYXRhYCwgZGVmYXVsdGluZyB0aGUgYC50eXBlKClgIHRvIFwianNvblwiIHdoZW5cbiAqIGFuIG9iamVjdCBpcyBnaXZlbi5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBxdWVyeXN0cmluZ1xuICogICAgICAgcmVxdWVzdC5nZXQoJy9zZWFyY2gnKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG11bHRpcGxlIGRhdGEgXCJ3cml0ZXNcIlxuICogICAgICAgcmVxdWVzdC5nZXQoJy9zZWFyY2gnKVxuICogICAgICAgICAuc2VuZCh7IHNlYXJjaDogJ3F1ZXJ5JyB9KVxuICogICAgICAgICAuc2VuZCh7IHJhbmdlOiAnMS4uNScgfSlcbiAqICAgICAgICAgLnNlbmQoeyBvcmRlcjogJ2Rlc2MnIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtYW51YWwgeC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCgnbmFtZT10aicpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGRlZmF1bHRzIHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gICogICAgICAgIC5zZW5kKCduYW1lPXRvYmknKVxuICAqICAgICAgICAuc2VuZCgnc3BlY2llcz1mZXJyZXQnKVxuICAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbihkYXRhKXtcbiAgdmFyIG9iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICB2YXIgdHlwZSA9IHRoaXMuZ2V0SGVhZGVyKCdDb250ZW50LVR5cGUnKTtcblxuICAvLyBtZXJnZVxuICBpZiAob2JqICYmIGlzT2JqZWN0KHRoaXMuX2RhdGEpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnZm9ybScpO1xuICAgIHR5cGUgPSB0aGlzLmdldEhlYWRlcignQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnID09IHR5cGUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9kYXRhXG4gICAgICAgID8gdGhpcy5fZGF0YSArICcmJyArIGRhdGFcbiAgICAgICAgOiBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhID0gKHRoaXMuX2RhdGEgfHwgJycpICsgZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gIH1cblxuICBpZiAoIW9iaiB8fCBpc0hvc3QoZGF0YSkpIHJldHVybiB0aGlzO1xuICBpZiAoIXR5cGUpIHRoaXMudHlwZSgnanNvbicpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIGBlcnJgIGFuZCBgcmVzYFxuICogYW5kIGhhbmRsZSBhcml0eSBjaGVjay5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IHJlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY2FsbGJhY2sgPSBmdW5jdGlvbihlcnIsIHJlcyl7XG4gIHZhciBmbiA9IHRoaXMuX2NhbGxiYWNrO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICBmbihlcnIsIHJlcyk7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHgtZG9tYWluIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyb3NzRG9tYWluRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCdPcmlnaW4gaXMgbm90IGFsbG93ZWQgYnkgQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJyk7XG4gIGVyci5jcm9zc0RvbWFpbiA9IHRydWU7XG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggdGltZW91dCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50aW1lb3V0RXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gIHZhciBlcnIgPSBuZXcgRXJyb3IoJ3RpbWVvdXQgb2YgJyArIHRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnKTtcbiAgZXJyLnRpbWVvdXQgPSB0aW1lb3V0O1xuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vKipcbiAqIEVuYWJsZSB0cmFuc21pc3Npb24gb2YgY29va2llcyB3aXRoIHgtZG9tYWluIHJlcXVlc3RzLlxuICpcbiAqIE5vdGUgdGhhdCBmb3IgdGhpcyB0byB3b3JrIHRoZSBvcmlnaW4gbXVzdCBub3QgYmVcbiAqIHVzaW5nIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIgd2l0aCBhIHdpbGRjYXJkLFxuICogYW5kIGFsc28gbXVzdCBzZXQgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiXG4gKiB0byBcInRydWVcIi5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuX3dpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbml0aWF0ZSByZXF1ZXN0LCBpbnZva2luZyBjYWxsYmFjayBgZm4ocmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oZm4pe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciB4aHIgPSB0aGlzLnhociA9IHJlcXVlc3QuZ2V0WEhSKCk7XG4gIHZhciBxdWVyeSA9IHRoaXMuX3F1ZXJ5LmpvaW4oJyYnKTtcbiAgdmFyIHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICB2YXIgZGF0YSA9IHRoaXMuX2Zvcm1EYXRhIHx8IHRoaXMuX2RhdGE7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIC8vIHN0YXRlIGNoYW5nZVxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKXtcbiAgICBpZiAoNCAhPSB4aHIucmVhZHlTdGF0ZSkgcmV0dXJuO1xuXG4gICAgLy8gSW4gSUU5LCByZWFkcyB0byBhbnkgcHJvcGVydHkgKGUuZy4gc3RhdHVzKSBvZmYgb2YgYW4gYWJvcnRlZCBYSFIgd2lsbFxuICAgIC8vIHJlc3VsdCBpbiB0aGUgZXJyb3IgXCJDb3VsZCBub3QgY29tcGxldGUgdGhlIG9wZXJhdGlvbiBkdWUgdG8gZXJyb3IgYzAwYzAyM2ZcIlxuICAgIHZhciBzdGF0dXM7XG4gICAgdHJ5IHsgc3RhdHVzID0geGhyLnN0YXR1cyB9IGNhdGNoKGUpIHsgc3RhdHVzID0gMDsgfVxuXG4gICAgaWYgKDAgPT0gc3RhdHVzKSB7XG4gICAgICBpZiAoc2VsZi50aW1lZG91dCkgcmV0dXJuIHNlbGYudGltZW91dEVycm9yKCk7XG4gICAgICBpZiAoc2VsZi5hYm9ydGVkKSByZXR1cm47XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgnZW5kJyk7XG4gIH07XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgdHJ5IHtcbiAgICBpZiAoeGhyLnVwbG9hZCAmJiB0aGlzLmhhc0xpc3RlbmVycygncHJvZ3Jlc3MnKSkge1xuICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucGVyY2VudCA9IGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMDtcbiAgICAgICAgc2VsZi5lbWl0KCdwcm9ncmVzcycsIGUpO1xuICAgICAgfTtcbiAgICB9XG4gIH0gY2F0Y2goZSkge1xuICAgIC8vIEFjY2Vzc2luZyB4aHIudXBsb2FkIGZhaWxzIGluIElFIGZyb20gYSB3ZWIgd29ya2VyLCBzbyBqdXN0IHByZXRlbmQgaXQgZG9lc24ndCBleGlzdC5cbiAgICAvLyBSZXBvcnRlZCBoZXJlOlxuICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODM3MjQ1L3htbGh0dHByZXF1ZXN0LXVwbG9hZC10aHJvd3MtaW52YWxpZC1hcmd1bWVudC13aGVuLXVzZWQtZnJvbS13ZWItd29ya2VyLWNvbnRleHRcbiAgfVxuXG4gIC8vIHRpbWVvdXRcbiAgaWYgKHRpbWVvdXQgJiYgIXRoaXMuX3RpbWVyKSB7XG4gICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICBzZWxmLnRpbWVkb3V0ID0gdHJ1ZTtcbiAgICAgIHNlbGYuYWJvcnQoKTtcbiAgICB9LCB0aW1lb3V0KTtcbiAgfVxuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIGlmIChxdWVyeSkge1xuICAgIHF1ZXJ5ID0gcmVxdWVzdC5zZXJpYWxpemVPYmplY3QocXVlcnkpO1xuICAgIHRoaXMudXJsICs9IH50aGlzLnVybC5pbmRleE9mKCc/JylcbiAgICAgID8gJyYnICsgcXVlcnlcbiAgICAgIDogJz8nICsgcXVlcnk7XG4gIH1cblxuICAvLyBpbml0aWF0ZSByZXF1ZXN0XG4gIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVybCwgdHJ1ZSk7XG5cbiAgLy8gQ09SU1xuICBpZiAodGhpcy5fd2l0aENyZWRlbnRpYWxzKSB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcblxuICAvLyBib2R5XG4gIGlmICgnR0VUJyAhPSB0aGlzLm1ldGhvZCAmJiAnSEVBRCcgIT0gdGhpcy5tZXRob2QgJiYgJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgJiYgIWlzSG9zdChkYXRhKSkge1xuICAgIC8vIHNlcmlhbGl6ZSBzdHVmZlxuICAgIHZhciBzZXJpYWxpemUgPSByZXF1ZXN0LnNlcmlhbGl6ZVt0aGlzLmdldEhlYWRlcignQ29udGVudC1UeXBlJyldO1xuICAgIGlmIChzZXJpYWxpemUpIGRhdGEgPSBzZXJpYWxpemUoZGF0YSk7XG4gIH1cblxuICAvLyBzZXQgaGVhZGVyIGZpZWxkc1xuICBmb3IgKHZhciBmaWVsZCBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmIChudWxsID09IHRoaXMuaGVhZGVyW2ZpZWxkXSkgY29udGludWU7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIHRoaXMuaGVhZGVyW2ZpZWxkXSk7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuICB4aHIuc2VuZChkYXRhKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgUmVxdWVzdGAuXG4gKi9cblxucmVxdWVzdC5SZXF1ZXN0ID0gUmVxdWVzdDtcblxuLyoqXG4gKiBJc3N1ZSBhIHJlcXVlc3Q6XG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgcmVxdWVzdCgnR0VUJywgJy91c2VycycpLmVuZChjYWxsYmFjaylcbiAqICAgIHJlcXVlc3QoJy91c2VycycpLmVuZChjYWxsYmFjaylcbiAqICAgIHJlcXVlc3QoJy91c2VycycsIGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfEZ1bmN0aW9ufSB1cmwgb3IgY2FsbGJhY2tcbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHJlcXVlc3QobWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHVybCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCgnR0VUJywgbWV0aG9kKS5lbmQodXJsKTtcbiAgfVxuXG4gIC8vIHVybCBmaXJzdFxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KCdHRVQnLCBtZXRob2QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbn1cblxuLyoqXG4gKiBHRVQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gZGF0YSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuZ2V0ID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdHRVQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogSEVBRCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBkYXRhIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5oZWFkID0gZnVuY3Rpb24odXJsLCBkYXRhLCBmbil7XG4gIHZhciByZXEgPSByZXF1ZXN0KCdIRUFEJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogREVMRVRFIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmRlbCA9IGZ1bmN0aW9uKHVybCwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnREVMRVRFJywgdXJsKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUEFUQ0ggYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBkYXRhXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wYXRjaCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUEFUQ0gnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQT1NUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBVVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IGRhdGEgb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0YC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVlc3Q7XG4iLCJcbi8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn07XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzW2V2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICBmdW5jdGlvbiBvbigpIHtcbiAgICBzZWxmLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuXG4gIGlmIChjYWxsYmFja3MpIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbn07XG4iLCJcbi8qKlxuICogUmVkdWNlIGBhcnJgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge01peGVkfSBpbml0aWFsXG4gKlxuICogVE9ETzogY29tYmF0aWJsZSBlcnJvciBoYW5kbGluZz9cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFyciwgZm4sIGluaXRpYWwpeyAgXG4gIHZhciBpZHggPSAwO1xuICB2YXIgbGVuID0gYXJyLmxlbmd0aDtcbiAgdmFyIGN1cnIgPSBhcmd1bWVudHMubGVuZ3RoID09IDNcbiAgICA/IGluaXRpYWxcbiAgICA6IGFycltpZHgrK107XG5cbiAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgIGN1cnIgPSBmbi5jYWxsKG51bGwsIGN1cnIsIGFycltpZHhdLCArK2lkeCwgYXJyKTtcbiAgfVxuICBcbiAgcmV0dXJuIGN1cnI7XG59OyJdfQ==
