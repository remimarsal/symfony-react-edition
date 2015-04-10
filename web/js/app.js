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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcQ3JlYXRpdmVcXEFwcERhdGFcXFJvYW1pbmdcXG5wbVxcbm9kZV9tb2R1bGVzXFxicm93c2VyaWZ5XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxcYWN0aW9uc1xccG9zdExpc3QuanMiLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxcYXBwLXJvdXRlcy5qc3giLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxcYXBwLmpzeCIsIkQ6XFxEZXZcXHdhbXBcXHd3d1xcc3ltZm9ueS1yZWFjdC1lZGl0aW9uXFxhcHBcXFJlc291cmNlc1xcanN4XFxjb21wb25lbnRzXFxmb290ZXIuanN4IiwiRDpcXERldlxcd2FtcFxcd3d3XFxzeW1mb255LXJlYWN0LWVkaXRpb25cXGFwcFxcUmVzb3VyY2VzXFxqc3hcXGNvbXBvbmVudHNcXGhlYWRlci5qc3giLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxcY29tcG9uZW50c1xccG9zdC5qc3giLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxcY29tcG9uZW50c1xccG9zdExpc3QuanN4IiwiRDpcXERldlxcd2FtcFxcd3d3XFxzeW1mb255LXJlYWN0LWVkaXRpb25cXGFwcFxcUmVzb3VyY2VzXFxqc3hcXGxheW91dC5qc3giLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxccGFnZXNcXGFib3V0LmpzeCIsIkQ6XFxEZXZcXHdhbXBcXHd3d1xcc3ltZm9ueS1yZWFjdC1lZGl0aW9uXFxhcHBcXFJlc291cmNlc1xcanN4XFxwYWdlc1xcaG9tZS5qc3giLCJEOlxcRGV2XFx3YW1wXFx3d3dcXHN5bWZvbnktcmVhY3QtZWRpdGlvblxcYXBwXFxSZXNvdXJjZXNcXGpzeFxccGFnZXNcXHBvc3RzLmpzeCIsIkQ6XFxEZXZcXHdhbXBcXHd3d1xcc3ltZm9ueS1yZWFjdC1lZGl0aW9uXFxhcHBcXFJlc291cmNlc1xcanN4XFxzdG9yZXNcXHBvc3RMaXN0LmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXguanMiLCJub2RlX21vZHVsZXNcXHJlZmx1eFxcbm9kZV9tb2R1bGVzXFxuYXRpdmUtcHJvbWlzZS1vbmx5XFxucG8uanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9BY3Rpb25NZXRob2RzLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvS2VlcC5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL0xpc3RlbmVyTWV0aG9kcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL0xpc3RlbmVyTWl4aW4uanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9QdWJsaXNoZXJNZXRob2RzLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvU3RvcmVNZXRob2RzLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvYmluZE1ldGhvZHMuanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9jb25uZWN0LmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvY29ubmVjdEZpbHRlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL2NyZWF0ZUFjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL2NyZWF0ZVN0b3JlLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy9qb2lucy5qcyIsIm5vZGVfbW9kdWxlcy9yZWZsdXgvc3JjL2xpc3RlblRvLmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvbGlzdGVuVG9NYW55LmpzIiwibm9kZV9tb2R1bGVzL3JlZmx1eC9zcmMvbWl4ZXIuanMiLCJub2RlX21vZHVsZXMvcmVmbHV4L3NyYy91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9ub2RlX21vZHVsZXMvcmVkdWNlLWNvbXBvbmVudC9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRS9CLElBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7Q0FDMUMsVUFBVTtDQUNWLGFBQWE7Q0FDYixVQUFVO0NBQ1YsWUFBWTtDQUNaLFlBQVk7QUFDYixDQUFDLENBQUMsQ0FBQzs7QUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWU7OztBQ1poQyxZQUFZLENBQUM7O0FBRWIsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUs7Q0FDNUIsUUFBUSxHQUFHLFdBQVcsQ0FBQyxRQUFRO0FBQ2hDLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZOztDQUV2QyxHQUFHLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQztDQUM3QixJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO0NBQ2xDLEtBQUssR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUM7QUFDckMsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7O0FBRXRDLElBQUksU0FBUztDQUNaLG9CQUFDLEtBQUssRUFB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3JPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdmxDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4Jyk7XHJcblxyXG52YXIgUG9zdExpc3RBY3Rpb25zID0gUmVmbHV4LmNyZWF0ZUFjdGlvbnMoW1xyXG5cdFwiZ2V0UG9zdHNcIixcclxuXHRcImlucHV0Q2hhbmdlXCIsXHJcblx0XCJzZW5kUG9zdFwiLFxyXG5cdFwiZGVsZXRlUG9zdFwiLFxyXG5cdFwidXBkYXRlUG9zdFwiXHJcbl0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3N0TGlzdEFjdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJvdXRlID0gUmVhY3RSb3V0ZXIuUm91dGUsXHJcblx0UmVkaXJlY3QgPSBSZWFjdFJvdXRlci5SZWRpcmVjdCxcclxuXHREZWZhdWx0Um91dGUgPSBSZWFjdFJvdXRlci5EZWZhdWx0Um91dGUsXHJcblxyXG5cdEFwcCA9IHJlcXVpcmUoJy4vbGF5b3V0LmpzeCcpLFxyXG5cdEhvbWUgPSByZXF1aXJlKCcuL3BhZ2VzL2hvbWUuanN4JyksXHJcblx0UG9zdHMgPSByZXF1aXJlKCcuL3BhZ2VzL3Bvc3RzLmpzeCcpLFxyXG5cdEFib3V0ID0gcmVxdWlyZSgnLi9wYWdlcy9hYm91dC5qc3gnKTtcclxuXHJcbnZhciBBcHBSb3V0ZXMgPSAoXHJcblx0PFJvdXRlIG5hbWU9XCIvXCIgaGFuZGxlcj17QXBwfT5cclxuXHRcdDxEZWZhdWx0Um91dGUgbmFtZT1cImhvbWVcIiBoYW5kbGVyPXtIb21lfSAvPlxyXG5cdFx0PFJvdXRlIG5hbWU9XCJwb3N0c1wiIGhhbmRsZXI9e1Bvc3RzfSAvPlxyXG5cdFx0PFJvdXRlIG5hbWU9XCJhYm91dFwiIGhhbmRsZXI9e0Fib3V0fSAvPlxyXG5cdDwvUm91dGU+XHJcbik7ICBcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXBwUm91dGVzOyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbnZhciBBcHBSb3V0ZXMgPSByZXF1aXJlKCcuL2FwcC1yb3V0ZXMuanN4Jyk7XHJcblxyXG4vLyBOZWVkZWQgZm9yIFJlYWN0IERldmVsb3BlciBUb29sc1xyXG53aW5kb3cuUmVhY3QgPSBSZWFjdDtcclxuXHJcbi8vIFJ1biB0aGUgUmVhY3RSb3V0ZXJcclxuUmVhY3RSb3V0ZXJcclxuLmNyZWF0ZSh7XHJcblx0cm91dGVzOiBBcHBSb3V0ZXMsXHJcblx0c2Nyb2xsQmVoYXZpb3I6IFJlYWN0Um91dGVyLlNjcm9sbFRvVG9wQmVoYXZpb3JcclxufSlcclxuLnJ1bihmdW5jdGlvbiAoSGFuZGxlcikge1xyXG5cdCAgIC8vIFdoZW5ldmVyIHRoZSB1cmwgY2hhbmdlcywgdGhpcyBjYWxsYmFjayBpcyBjYWxsZWQgYWdhaW5cclxuXHQgICBSZWFjdC5yZW5kZXIoPEhhbmRsZXIgLz4sIGRvY3VtZW50LmJvZHkpO1xyXG59KTsiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgTGluayA9IFJlYWN0Um91dGVyLkxpbms7XHJcblxyXG52YXIgRm9vdGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkZvb3RlclwiLFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxmb290ZXIgY2xhc3NOYW1lPVwicGFnZS1mb290ZXIgZ3JleSBkYXJrZW4tNFwiPlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImNvbCBsNiBzMTJcIj5cclxuXHRcdFx0XHRcdFx0XHQ8aDUgY2xhc3NOYW1lPVwid2hpdGUtdGV4dFwiPkZvb3RlciBDb250ZW50PC9oNT5cclxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJncmV5LXRleHQgdGV4dC1saWdodGVuLTRcIj5TeW1mb255IFJlYWN0IEVkaXRpb24uPC9wPlxyXG5cdFx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJjb2wgbDQgb2Zmc2V0LWwyIHMxMlwiPlxyXG5cdFx0XHRcdFx0XHRcdDxoNSBjbGFzc05hbWU9XCJ3aGl0ZS10ZXh0XCI+TGlua3M8L2g1PlxyXG5cdFx0XHRcdFx0XHRcdDx1bD5cclxuXHRcdFx0XHRcdFx0XHRcdDxsaT5cclxuXHRcdFx0XHRcdFx0XHRcdFx0PExpbmsgdG89XCJob21lXCI+SG9tZTwvTGluaz5cclxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxMaW5rIHRvPVwicG9zdHNcIj5Qb3N0czwvTGluaz5cclxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdFx0XHRcdDxMaW5rIHRvPVwiYWJvdXRcIj5BYm91dDwvTGluaz5cclxuXHRcdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0PC91bD5cclxuXHRcdFx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZvb3Rlci1jb3B5cmlnaHRcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdMKpIDIwMTUgQ29weXJpZ2h0IFRleHRcclxuXHRcdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHQ8L2Zvb3Rlcj5cclxuXHRcdCk7XHJcblxyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb290ZXI7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIExpbmsgPSBSZWFjdFJvdXRlci5MaW5rO1xyXG5cclxudmFyIEhlYWRlciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcclxuXHJcblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0JChcIi5idXR0b24tY29sbGFwc2VcIikuc2lkZU5hdigpO1xyXG5cdH0sXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGhlYWRlcj5cclxuXHRcdFx0XHQ8bmF2IGNsYXNzTmFtZT1cImN5YW4gYWNjZW50LTNcIj5cclxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibmF2LXdyYXBwZXIgY29udGFpbmVyXCI+XHJcblx0XHRcdFx0XHRcdDxhIGhyZWY9XCIjXCIgZGF0YS1hY3RpdmF0ZXM9XCJzbGlkZS1vdXRcIiBjbGFzc05hbWU9XCJidXR0b24tY29sbGFwc2VcIj48aSBjbGFzc05hbWU9XCJtZGktbmF2aWdhdGlvbi1tZW51XCI+PC9pPjwvYT5cclxuXHRcdFx0XHRcdFx0PExpbmsgdG89XCJob21lXCIgY2xhc3NOYW1lPVwiYnJhbmQtbG9nb1wiPkxvZ288L0xpbms+XHJcblxyXG5cdFx0XHRcdFx0XHQ8dWwgY2xhc3NOYW1lPVwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cIj5cclxuXHRcdFx0XHRcdFx0XHQ8bGk+XHJcblx0XHRcdFx0XHRcdFx0XHQ8TGluayB0bz1cImhvbWVcIj5Ib21lPC9MaW5rPlxyXG5cdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHRcdFx0PExpbmsgdG89XCJwb3N0c1wiPlBvc3RzPC9MaW5rPlxyXG5cdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdFx0PGxpPlxyXG5cdFx0XHRcdFx0XHRcdFx0PExpbmsgdG89XCJhYm91dFwiPkFib3V0PC9MaW5rPlxyXG5cdFx0XHRcdFx0XHRcdDwvbGk+XHJcblx0XHRcdFx0XHRcdDwvdWw+XHJcblx0XHRcdFx0XHQ8L2Rpdj5cclxuXHRcdFx0XHQ8L25hdj5cclxuXHRcdFx0PC9oZWFkZXI+XHJcblx0XHQpO1xyXG5cclxuXHR9XHJcblxyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSGVhZGVyO1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUG9zdExpc3RBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9wb3N0TGlzdCcpO1xyXG5cclxudmFyIFBvc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XHJcblxyXG5cdGhhbmRsZURlbGV0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRQb3N0TGlzdEFjdGlvbnMuZGVsZXRlUG9zdCh0aGlzLnByb3BzLmlkKTtcclxuXHR9LFxyXG5cclxuXHRoYW5kbGVVcGRhdGU6IGZ1bmN0aW9uKCkge1xyXG5cdFx0UG9zdExpc3RBY3Rpb25zLnVwZGF0ZVBvc3QodGhpcy5wcm9wcy5jb250ZW50LCB0aGlzLnByb3BzLmlkKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxsaSBjbGFzc05hbWU9XCJjb2xsZWN0aW9uLWl0ZW1cIj5cclxuXHRcdFx0XHQ8c3Bhbj57dGhpcy5wcm9wcy5jb3VudH0gLSA8L3NwYW4+XHJcblx0XHRcdFx0e3RoaXMucHJvcHMuY29udGVudH1cclxuXHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1mbGF0IHNlY29uZGFyeS1jb250ZW50XCIgbmFtZT1cImRlbGV0ZVwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlRGVsZXRlfT5cclxuXHRcdFx0XHQgICAgPGkgY2xhc3NOYW1lPVwibWRpLWFjdGlvbi1kZWxldGVcIj48L2k+XHJcblx0XHRcdCAgICA8L2J1dHRvbj5cclxuXHRcdFx0XHQ8YnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1mbGF0IHNlY29uZGFyeS1jb250ZW50XCIgbmFtZT1cInVwZGF0ZVwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVXBkYXRlfT5cclxuXHRcdFx0XHQgICAgPGkgY2xhc3NOYW1lPVwibWRpLWVkaXRvci1ib3JkZXItY29sb3JcIj48L2k+XHJcblx0XHRcdCAgICA8L2J1dHRvbj5cclxuXHRcdFx0PC9saT5cclxuXHRcdCk7XHJcblxyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3N0O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4JyksXHJcblx0UG9zdExpc3RBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9wb3N0TGlzdCcpLFxyXG5cdHBvc3RMaXN0QWN0aW9uU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvcG9zdExpc3QnKSxcclxuXHRQb3N0ID0gcmVxdWlyZSgnLi9wb3N0LmpzeCcpO1xyXG5cclxudmFyIFBvc3RMaXN0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlBvc3RMaXN0XCIsXHJcblx0bWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QocG9zdExpc3RBY3Rpb25TdG9yZSldLFxyXG5cclxuXHRjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0UG9zdExpc3RBY3Rpb25zLmdldFBvc3RzKCk7XHJcblx0fSxcclxuXHJcblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcclxuXHJcblx0XHR2YXIgcG9zdHMgPSBbXTtcclxuXHJcblx0XHRfLmVhY2godGhpcy5zdGF0ZS5wb3N0cywgZnVuY3Rpb24ocG9zdCkge1xyXG5cdFx0XHRwb3N0cy5wdXNoKFxyXG5cdFx0XHRcdDxQb3N0IGtleT17cG9zdHMubGVuZ3RofSBpZD17cG9zdC5pZH0gY291bnQ9e3Bvc3RzLmxlbmd0aCArIDF9IGNvbnRlbnQ9e3Bvc3QuY29udGVudH0gLz5cclxuXHRcdFx0KTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDx1bCBjbGFzc05hbWU9XCJjb2wgczEyIGNvbGxlY3Rpb25cIj5cclxuXHRcdFx0XHQ8bGkgY2xhc3NOYW1lPVwiY29sbGVjdGlvbi1oZWFkZXJcIj48aDQ+UG9zdHM8L2g0PjwvbGk+XHJcblx0XHRcdFx0e3Bvc3RzfVxyXG5cdFx0XHQ8L3VsPlxyXG5cdFx0KTtcclxuXHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFBvc3RMaXN0O1xyXG4iLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUm91dGVIYW5kbGVyID0gUmVhY3RSb3V0ZXIuUm91dGVIYW5kbGVyLFxyXG5cdEhlYWRlciA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9oZWFkZXIuanN4JyksXHJcblx0Rm9vdGVyID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2Zvb3Rlci5qc3gnKTtcclxuXHJcbnZhciBMYXlvdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7ZGlzcGxheU5hbWU6IFwiTGF5b3V0XCIsXHJcblxyXG5cdHJlbmRlciA6IGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdDxkaXY+XHJcblx0XHRcdFx0PEhlYWRlciAvPlxyXG5cdFx0XHRcdDxtYWluIGlkPVwicGFnZVwiIGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxyXG5cdFx0XHRcdFx0PFJvdXRlSGFuZGxlciAvPlxyXG5cdFx0XHRcdDwvbWFpbj5cclxuXHRcdFx0XHQ8Rm9vdGVyIC8+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMYXlvdXQ7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIEFib3V0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIkFib3V0XCIsXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8aDE+QWJvdXQ8L2gxPlxyXG5cdFx0XHQ8L2Rpdj5cclxuXHRcdCk7XHJcblxyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBYm91dDsiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgSG9tZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtkaXNwbGF5TmFtZTogXCJIb21lXCIsXHJcblxyXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XHJcblxyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8aDE+SG9tZTwvaDE+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHJcblx0fVxyXG5cclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhvbWU7IiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxudmFyIFJlZmx1eCA9IHJlcXVpcmUoJ3JlZmx1eCcpLFxyXG5cdFBvc3RMaXN0QWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvcG9zdExpc3QnKSxcclxuXHRwb3N0TGlzdEFjdGlvblN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL3Bvc3RMaXN0JyksXHJcblx0UG9zdExpc3QgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL3Bvc3RMaXN0LmpzeCcpO1xyXG5cclxudmFyIFBvc3RzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe2Rpc3BsYXlOYW1lOiBcIlBvc3RzXCIsXHJcblx0bWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QocG9zdExpc3RBY3Rpb25TdG9yZSldLFxyXG5cclxuXHRoYW5kbGVDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHR0aGlzLnNldFN0YXRlKHtwb3N0SW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZX0pO1xyXG5cdFx0UG9zdExpc3RBY3Rpb25zLmlucHV0Q2hhbmdlKGV2ZW50LnRhcmdldC52YWx1ZSk7XHJcblx0fSxcclxuXHJcblx0aGFuZGxlU2VuZDogZnVuY3Rpb24oKSB7XHJcblx0XHRQb3N0TGlzdEFjdGlvbnMuc2VuZFBvc3QoKTtcclxuXHR9LFxyXG5cclxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0PGRpdj5cclxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0PFBvc3RMaXN0IGZyb209XCIvcG9zdC9cIiAvPlxyXG5cdFx0XHRcdDwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XHJcblx0XHRcdFx0ICAgIDxmb3JtIGNsYXNzTmFtZT1cImNvbCBzMTJcIj5cclxuXHRcdFx0XHRcdCAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxyXG5cdFx0XHRcdFx0XHQgICAgPGRpdiBjbGFzc05hbWU9XCJpbnB1dC1maWVsZCBjb2wgczEyXCI+XHJcblx0XHRcdFx0XHRcdFx0ICAgIDxpIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5lZGl0TW9kZSA/IFwibWRpLWVkaXRvci1ib3JkZXItY29sb3IgcHJlZml4XCIgOiBcIm1kaS1jb250ZW50LWFkZC1jaXJjbGUgcHJlZml4XCJ9PjwvaT5cclxuXHRcdFx0XHRcdFx0XHQgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJwb3N0LWNvbnRlbnRcIiB2YWx1ZT17dGhpcy5zdGF0ZS5wb3N0SW5wdXR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoYW5nZX0gLz5cclxuXHRcdFx0XHRcdFx0XHQgICAgPGxhYmVsIGNsYXNzTmFtZT1cImFjdGl2ZVwiIGh0bWxGb3I9XCJwb3N0LWNvbnRlbnRcIj57dGhpcy5zdGF0ZS5sYWJlbH08L2xhYmVsPlxyXG5cdFx0XHRcdFx0XHQgICAgPC9kaXY+XHJcblx0XHRcdFx0XHQgICAgPC9kaXY+XHJcblx0XHRcdFx0ICAgIDwvZm9ybT5cclxuXHRcdFx0XHQgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gd2F2ZXMtZWZmZWN0IGN5YW4gYWNjZW50LTNcIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cImFjdGlvblwiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VuZH0+U2VuZFxyXG5cdFx0XHRcdFx0ICAgIDxpIGNsYXNzTmFtZT1cIm1kaS1jb250ZW50LXNlbmQgcmlnaHRcIj48L2k+XHJcblx0XHRcdFx0ICAgIDwvYnV0dG9uPlxyXG5cdFx0XHQgICAgPC9kaXY+XHJcblx0XHRcdDwvZGl2PlxyXG5cdFx0KTtcclxuXHR9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3N0czsiLCIndXNlIHN0cmljdCc7XHJcblxyXG52YXIgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4JyksXHJcblx0UG9zdExpc3RBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9wb3N0TGlzdCcpLFxyXG5cdHJlcXVlc3QgPSByZXF1aXJlKCdzdXBlcmFnZW50Jyk7XHJcblxyXG52YXIgUG9zdExpc3RBY3Rpb25TdG9yZSA9IFJlZmx1eC5jcmVhdGVTdG9yZSh7XHJcblx0bGlzdGVuYWJsZXM6IFtQb3N0TGlzdEFjdGlvbnNdLFxyXG5cclxuXHRpbml0OiBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMucG9zdExpc3QgPSB7XHJcblx0XHRcdHVybDogJy9wb3N0LycsXHJcblx0XHRcdHBvc3RzOiBbXSxcclxuXHRcdFx0cG9zdElucHV0OiAnJyxcclxuXHRcdFx0ZWRpdE1vZGU6IGZhbHNlLFxyXG5cdFx0XHRlZGl0UG9zdEtleTogbnVsbCxcclxuXHRcdFx0bGFiZWw6ICcnLFxyXG5cdFx0XHRsYWJlbE5ld1Bvc3Q6ICdBZGQgYSBuZXcgcG9zdCcsXHJcblx0XHRcdGxhYmVsRWRpdFBvc3Q6ICdFZGl0IHBvc3QnXHJcblx0XHR9O1xyXG5cdFx0dGhpcy5wb3N0TGlzdC5sYWJlbCA9IHRoaXMucG9zdExpc3QubGFiZWxOZXdQb3N0O1xyXG5cdH0sXHJcblxyXG5cdG9uSW5wdXRDaGFuZ2U6IGZ1bmN0aW9uKGNvbnRlbnQpIHtcclxuXHRcdHRoaXMucG9zdExpc3QucG9zdElucHV0ID0gY29udGVudDtcclxuXHRcdHRoaXMudHJpZ2dlcih0aGlzLnBvc3RMaXN0KTtcclxuXHR9LFxyXG5cclxuXHRvblNlbmRQb3N0OiBmdW5jdGlvbigpIHtcclxuXHRcdGlmICh0aGlzLnBvc3RMaXN0LnBvc3RJbnB1dC5sZW5ndGggPCAxKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGlmICh0aGlzLnBvc3RMaXN0LmVkaXRNb2RlKSB7XHJcblx0XHRcdHJlcXVlc3QucHV0KHRoaXMucG9zdExpc3QudXJsK3RoaXMucG9zdExpc3QuZWRpdFBvc3RLZXkpLnNlbmQodGhpcy5wb3N0TGlzdC5wb3N0SW5wdXQpLmVuZChmdW5jdGlvbihlcnIsIHJlcykge1xyXG5cdFx0XHRcdF90aGlzLnBvc3RMaXN0LmVkaXRNb2RlID0gZmFsc2U7XHJcblx0XHRcdFx0X3RoaXMucG9zdExpc3QuZWRpdFBvc3RLZXkgPSBudWxsO1xyXG5cdFx0XHRcdF90aGlzLnBvc3RMaXN0LmxhYmVsID0gX3RoaXMucG9zdExpc3QubGFiZWxOZXdQb3N0O1xyXG5cdFx0XHRcdFBvc3RMaXN0QWN0aW9ucy5nZXRQb3N0cygpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHRyZXF1ZXN0LnBvc3QodGhpcy5wb3N0TGlzdC51cmwpLnNlbmQodGhpcy5wb3N0TGlzdC5wb3N0SW5wdXQpLmVuZChmdW5jdGlvbihlcnIsIHJlcykge1xyXG5cdFx0XHRcdFBvc3RMaXN0QWN0aW9ucy5nZXRQb3N0cygpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnBvc3RMaXN0LnBvc3RJbnB1dCA9ICcnO1xyXG5cdFx0dGhpcy50cmlnZ2VyKHRoaXMucG9zdExpc3QpO1xyXG5cdH0sXHJcblxyXG5cdG9uR2V0UG9zdHM6IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0XHRyZXF1ZXN0LmdldCh0aGlzLnBvc3RMaXN0LnVybCkuZW5kKGZ1bmN0aW9uKGVyciwgcmVzKSB7XHJcblx0XHRcdF90aGlzLnBvc3RMaXN0LnBvc3RzID0gW107XHJcblx0XHRcdF8uZWFjaChKU09OLnBhcnNlKHJlcy50ZXh0KSwgZnVuY3Rpb24ocG9zdCkge1xyXG5cdFx0XHRcdF90aGlzLnBvc3RMaXN0LnBvc3RzLnB1c2gocG9zdCk7XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0X3RoaXMudHJpZ2dlcihfdGhpcy5wb3N0TGlzdCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRvbkRlbGV0ZVBvc3Q6IGZ1bmN0aW9uKGtleSkge1xyXG5cdFx0cmVxdWVzdC5kZWwodGhpcy5wb3N0TGlzdC51cmwra2V5KS5lbmQoZnVuY3Rpb24oZXJyLCByZXMpIHtcclxuXHRcdFx0UG9zdExpc3RBY3Rpb25zLmdldFBvc3RzKCk7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRvblVwZGF0ZVBvc3Q6IGZ1bmN0aW9uKGNvbnRlbnQsIGtleSkge1xyXG5cdFx0aWYgKHRoaXMucG9zdExpc3QuZWRpdFBvc3RLZXkgPT09IGtleSkge1xyXG5cdFx0XHR0aGlzLnBvc3RMaXN0LmVkaXRNb2RlID0gZmFsc2U7XHJcblx0XHRcdHRoaXMucG9zdExpc3QuZWRpdFBvc3RLZXkgPSBudWxsO1xyXG5cdFx0XHR0aGlzLnBvc3RMaXN0LnBvc3RJbnB1dCA9ICcnO1xyXG5cdFx0XHR0aGlzLnBvc3RMaXN0LmxhYmVsID0gdGhpcy5wb3N0TGlzdC5sYWJlbE5ld1Bvc3Q7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5wb3N0TGlzdC5lZGl0TW9kZSA9IHRydWU7XHJcblx0XHRcdHRoaXMucG9zdExpc3QuZWRpdFBvc3RLZXkgPSBrZXk7XHJcblx0XHRcdHRoaXMucG9zdExpc3QucG9zdElucHV0ID0gY29udGVudDtcclxuXHRcdFx0dGhpcy5wb3N0TGlzdC5sYWJlbCA9IHRoaXMucG9zdExpc3QubGFiZWxFZGl0UG9zdDtcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Bvc3QtY29udGVudCcpLmZvY3VzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy50cmlnZ2VyKHRoaXMucG9zdExpc3QpO1xyXG5cdH0sXHJcblxyXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wb3N0TGlzdDtcclxuXHR9XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBQb3N0TGlzdEFjdGlvblN0b3JlOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zcmMnKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBFdmVudEVtaXR0ZXIgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRXZlbnQgaGFuZGxlciB0byBiZSBjYWxsZWQuXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IENvbnRleHQgZm9yIGZ1bmN0aW9uIGV4ZWN1dGlvbi5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IGVtaXQgb25jZVxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEVFKGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHRoaXMuZm4gPSBmbjtcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5vbmNlID0gb25jZSB8fCBmYWxzZTtcbn1cblxuLyoqXG4gKiBNaW5pbWFsIEV2ZW50RW1pdHRlciBpbnRlcmZhY2UgdGhhdCBpcyBtb2xkZWQgYWdhaW5zdCB0aGUgTm9kZS5qc1xuICogRXZlbnRFbWl0dGVyIGludGVyZmFjZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHsgLyogTm90aGluZyB0byBzZXQgKi8gfVxuXG4vKipcbiAqIEhvbGRzIHRoZSBhc3NpZ25lZCBFdmVudEVtaXR0ZXJzIGJ5IG5hbWUuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBSZXR1cm4gYSBsaXN0IG9mIGFzc2lnbmVkIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBsaXN0ZWQuXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyhldmVudCkge1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2ZW50XSkgcmV0dXJuIFtdO1xuICBpZiAodGhpcy5fZXZlbnRzW2V2ZW50XS5mbikgcmV0dXJuIFt0aGlzLl9ldmVudHNbZXZlbnRdLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuX2V2ZW50c1tldmVudF0ubGVuZ3RoLCBlZSA9IG5ldyBBcnJheShsKTsgaSA8IGw7IGkrKykge1xuICAgIGVlW2ldID0gdGhpcy5fZXZlbnRzW2V2ZW50XVtpXS5mbjtcbiAgfVxuXG4gIHJldHVybiBlZTtcbn07XG5cbi8qKlxuICogRW1pdCBhbiBldmVudCB0byBhbGwgcmVnaXN0ZXJlZCBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBuYW1lIG9mIHRoZSBldmVudC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBJbmRpY2F0aW9uIGlmIHdlJ3ZlIGVtaXR0ZWQgYW4gZXZlbnQuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2ZW50LCBhMSwgYTIsIGEzLCBhNCwgYTUpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1tldmVudF0pIHJldHVybiBmYWxzZTtcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2ZW50XVxuICAgICwgbGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgYXJnc1xuICAgICwgaTtcblxuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGxpc3RlbmVycy5mbikge1xuICAgIGlmIChsaXN0ZW5lcnMub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzLmZuLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHRydWUpO1xuXG4gICAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgICBjYXNlIDE6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0KTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMjogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExKTsgYnJlYWs7XG4gICAgICAgIGNhc2UgMzogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQsIGExLCBhMik7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghYXJncykgZm9yIChqID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaiAtIDFdID0gYXJndW1lbnRzW2pdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpc3RlbmVyc1tpXS5mbi5hcHBseShsaXN0ZW5lcnNbaV0uY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIFJlZ2lzdGVyIGEgbmV3IEV2ZW50TGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge0Z1bmN0b259IGZuIENhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtNaXhlZH0gY29udGV4dCBUaGUgY29udGV4dCBvZiB0aGUgZnVuY3Rpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCB0aGlzKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cykgdGhpcy5fZXZlbnRzID0ge307XG4gIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XSkgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IGxpc3RlbmVyO1xuICBlbHNlIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50c1tldmVudF0uZm4pIHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChsaXN0ZW5lcik7XG4gICAgZWxzZSB0aGlzLl9ldmVudHNbZXZlbnRdID0gW1xuICAgICAgdGhpcy5fZXZlbnRzW2V2ZW50XSwgbGlzdGVuZXJcbiAgICBdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZCBhbiBFdmVudExpc3RlbmVyIHRoYXQncyBvbmx5IGNhbGxlZCBvbmNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIENhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtNaXhlZH0gY29udGV4dCBUaGUgY29udGV4dCBvZiB0aGUgZnVuY3Rpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgdGhpcywgdHJ1ZSk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpIHRoaXMuX2V2ZW50cyA9IHt9O1xuICBpZiAoIXRoaXMuX2V2ZW50c1tldmVudF0pIHRoaXMuX2V2ZW50c1tldmVudF0gPSBsaXN0ZW5lcjtcbiAgZWxzZSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHNbZXZlbnRdLmZuKSB0aGlzLl9ldmVudHNbZXZlbnRdLnB1c2gobGlzdGVuZXIpO1xuICAgIGVsc2UgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IFtcbiAgICAgIHRoaXMuX2V2ZW50c1tldmVudF0sIGxpc3RlbmVyXG4gICAgXTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgZXZlbnQgd2Ugd2FudCB0byByZW1vdmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgdGhhdCB3ZSBuZWVkIHRvIGZpbmQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25jZSBsaXN0ZW5lcnMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBvbmNlKSB7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbZXZlbnRdKSByZXR1cm4gdGhpcztcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2ZW50XVxuICAgICwgZXZlbnRzID0gW107XG5cbiAgaWYgKGZuKSB7XG4gICAgaWYgKGxpc3RlbmVycy5mbiAmJiAobGlzdGVuZXJzLmZuICE9PSBmbiB8fCAob25jZSAmJiAhbGlzdGVuZXJzLm9uY2UpKSkge1xuICAgICAgZXZlbnRzLnB1c2gobGlzdGVuZXJzKTtcbiAgICB9XG4gICAgaWYgKCFsaXN0ZW5lcnMuZm4pIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChsaXN0ZW5lcnNbaV0uZm4gIT09IGZuIHx8IChvbmNlICYmICFsaXN0ZW5lcnNbaV0ub25jZSkpIHtcbiAgICAgICAgZXZlbnRzLnB1c2gobGlzdGVuZXJzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL1xuICAvLyBSZXNldCB0aGUgYXJyYXksIG9yIHJlbW92ZSBpdCBjb21wbGV0ZWx5IGlmIHdlIGhhdmUgbm8gbW9yZSBsaXN0ZW5lcnMuXG4gIC8vXG4gIGlmIChldmVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IGV2ZW50cy5sZW5ndGggPT09IDEgPyBldmVudHNbMF0gOiBldmVudHM7XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1tldmVudF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgb3Igb25seSB0aGUgbGlzdGVuZXJzIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgZXZlbnQgd2FudCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyhldmVudCkge1xuICBpZiAoIXRoaXMuX2V2ZW50cykgcmV0dXJuIHRoaXM7XG5cbiAgaWYgKGV2ZW50KSBkZWxldGUgdGhpcy5fZXZlbnRzW2V2ZW50XTtcbiAgZWxzZSB0aGlzLl9ldmVudHMgPSB7fTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gVGhpcyBmdW5jdGlvbiBkb2Vzbid0IGFwcGx5IGFueW1vcmUuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxuLy9cbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyMiA9IEV2ZW50RW1pdHRlcjtcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIzID0gRXZlbnRFbWl0dGVyO1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG4iLCIvKiEgTmF0aXZlIFByb21pc2UgT25seVxuICAgIHYwLjcuOC1hIChjKSBLeWxlIFNpbXBzb25cbiAgICBNSVQgTGljZW5zZTogaHR0cDovL2dldGlmeS5taXQtbGljZW5zZS5vcmdcbiovXG4hZnVuY3Rpb24odCxuLGUpe25bdF09blt0XXx8ZSgpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzP21vZHVsZS5leHBvcnRzPW5bdF06XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kJiZkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gblt0XX0pfShcIlByb21pc2VcIixcInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsP2dsb2JhbDp0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0LG4pe2wuYWRkKHQsbiksaHx8KGg9eShsLmRyYWluKSl9ZnVuY3Rpb24gbih0KXt2YXIgbixlPXR5cGVvZiB0O3JldHVybiBudWxsPT10fHxcIm9iamVjdFwiIT1lJiZcImZ1bmN0aW9uXCIhPWV8fChuPXQudGhlbiksXCJmdW5jdGlvblwiPT10eXBlb2Ygbj9uOiExfWZ1bmN0aW9uIGUoKXtmb3IodmFyIHQ9MDt0PHRoaXMuY2hhaW4ubGVuZ3RoO3QrKylvKHRoaXMsMT09PXRoaXMuc3RhdGU/dGhpcy5jaGFpblt0XS5zdWNjZXNzOnRoaXMuY2hhaW5bdF0uZmFpbHVyZSx0aGlzLmNoYWluW3RdKTt0aGlzLmNoYWluLmxlbmd0aD0wfWZ1bmN0aW9uIG8odCxlLG8pe3ZhciByLGk7dHJ5e2U9PT0hMT9vLnJlamVjdCh0Lm1zZyk6KHI9ZT09PSEwP3QubXNnOmUuY2FsbCh2b2lkIDAsdC5tc2cpLHI9PT1vLnByb21pc2U/by5yZWplY3QoVHlwZUVycm9yKFwiUHJvbWlzZS1jaGFpbiBjeWNsZVwiKSk6KGk9bihyKSk/aS5jYWxsKHIsby5yZXNvbHZlLG8ucmVqZWN0KTpvLnJlc29sdmUocikpfWNhdGNoKGMpe28ucmVqZWN0KGMpfX1mdW5jdGlvbiByKG8pe3ZhciBjLHUsYT10aGlzO2lmKCFhLnRyaWdnZXJlZCl7YS50cmlnZ2VyZWQ9ITAsYS5kZWYmJihhPWEuZGVmKTt0cnl7KGM9bihvKSk/KHU9bmV3IGYoYSksYy5jYWxsKG8sZnVuY3Rpb24oKXtyLmFwcGx5KHUsYXJndW1lbnRzKX0sZnVuY3Rpb24oKXtpLmFwcGx5KHUsYXJndW1lbnRzKX0pKTooYS5tc2c9byxhLnN0YXRlPTEsYS5jaGFpbi5sZW5ndGg+MCYmdChlLGEpKX1jYXRjaChzKXtpLmNhbGwodXx8bmV3IGYoYSkscyl9fX1mdW5jdGlvbiBpKG4pe3ZhciBvPXRoaXM7by50cmlnZ2VyZWR8fChvLnRyaWdnZXJlZD0hMCxvLmRlZiYmKG89by5kZWYpLG8ubXNnPW4sby5zdGF0ZT0yLG8uY2hhaW4ubGVuZ3RoPjAmJnQoZSxvKSl9ZnVuY3Rpb24gYyh0LG4sZSxvKXtmb3IodmFyIHI9MDtyPG4ubGVuZ3RoO3IrKykhZnVuY3Rpb24ocil7dC5yZXNvbHZlKG5bcl0pLnRoZW4oZnVuY3Rpb24odCl7ZShyLHQpfSxvKX0ocil9ZnVuY3Rpb24gZih0KXt0aGlzLmRlZj10LHRoaXMudHJpZ2dlcmVkPSExfWZ1bmN0aW9uIHUodCl7dGhpcy5wcm9taXNlPXQsdGhpcy5zdGF0ZT0wLHRoaXMudHJpZ2dlcmVkPSExLHRoaXMuY2hhaW49W10sdGhpcy5tc2c9dm9pZCAwfWZ1bmN0aW9uIGEobil7aWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbil0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtpZigwIT09dGhpcy5fX05QT19fKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIHByb21pc2VcIik7dGhpcy5fX05QT19fPTE7dmFyIG89bmV3IHUodGhpcyk7dGhpcy50aGVuPWZ1bmN0aW9uKG4scil7dmFyIGk9e3N1Y2Nlc3M6XCJmdW5jdGlvblwiPT10eXBlb2Ygbj9uOiEwLGZhaWx1cmU6XCJmdW5jdGlvblwiPT10eXBlb2Ygcj9yOiExfTtyZXR1cm4gaS5wcm9taXNlPW5ldyB0aGlzLmNvbnN0cnVjdG9yKGZ1bmN0aW9uKHQsbil7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgdHx8XCJmdW5jdGlvblwiIT10eXBlb2Ygbil0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtpLnJlc29sdmU9dCxpLnJlamVjdD1ufSksby5jaGFpbi5wdXNoKGkpLDAhPT1vLnN0YXRlJiZ0KGUsbyksaS5wcm9taXNlfSx0aGlzW1wiY2F0Y2hcIl09ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMudGhlbih2b2lkIDAsdCl9O3RyeXtuLmNhbGwodm9pZCAwLGZ1bmN0aW9uKHQpe3IuY2FsbChvLHQpfSxmdW5jdGlvbih0KXtpLmNhbGwobyx0KX0pfWNhdGNoKGMpe2kuY2FsbChvLGMpfX12YXIgcyxoLGwscD1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLHk9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNldEltbWVkaWF0ZT9mdW5jdGlvbih0KXtyZXR1cm4gc2V0SW1tZWRpYXRlKHQpfTpzZXRUaW1lb3V0O3RyeXtPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sXCJ4XCIse30pLHM9ZnVuY3Rpb24odCxuLGUsbyl7cmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LG4se3ZhbHVlOmUsd3JpdGFibGU6ITAsY29uZmlndXJhYmxlOm8hPT0hMX0pfX1jYXRjaChkKXtzPWZ1bmN0aW9uKHQsbixlKXtyZXR1cm4gdFtuXT1lLHR9fWw9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQsbil7dGhpcy5mbj10LHRoaXMuc2VsZj1uLHRoaXMubmV4dD12b2lkIDB9dmFyIG4sZSxvO3JldHVybnthZGQ6ZnVuY3Rpb24ocixpKXtvPW5ldyB0KHIsaSksZT9lLm5leHQ9bzpuPW8sZT1vLG89dm9pZCAwfSxkcmFpbjpmdW5jdGlvbigpe3ZhciB0PW47Zm9yKG49ZT1oPXZvaWQgMDt0Oyl0LmZuLmNhbGwodC5zZWxmKSx0PXQubmV4dH19fSgpO3ZhciBnPXMoe30sXCJjb25zdHJ1Y3RvclwiLGEsITEpO3JldHVybiBhLnByb3RvdHlwZT1nLHMoZyxcIl9fTlBPX19cIiwwLCExKSxzKGEsXCJyZXNvbHZlXCIsZnVuY3Rpb24odCl7dmFyIG49dGhpcztyZXR1cm4gdCYmXCJvYmplY3RcIj09dHlwZW9mIHQmJjE9PT10Ll9fTlBPX18/dDpuZXcgbihmdW5jdGlvbihuLGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIG58fFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgZnVuY3Rpb25cIik7bih0KX0pfSkscyhhLFwicmVqZWN0XCIsZnVuY3Rpb24odCl7cmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uKG4sZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbnx8XCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtlKHQpfSl9KSxzKGEsXCJhbGxcIixmdW5jdGlvbih0KXt2YXIgbj10aGlzO3JldHVyblwiW29iamVjdCBBcnJheV1cIiE9cC5jYWxsKHQpP24ucmVqZWN0KFR5cGVFcnJvcihcIk5vdCBhbiBhcnJheVwiKSk6MD09PXQubGVuZ3RoP24ucmVzb2x2ZShbXSk6bmV3IG4oZnVuY3Rpb24oZSxvKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBvKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO3ZhciByPXQubGVuZ3RoLGk9QXJyYXkociksZj0wO2Mobix0LGZ1bmN0aW9uKHQsbil7aVt0XT1uLCsrZj09PXImJmUoaSl9LG8pfSl9KSxzKGEsXCJyYWNlXCIsZnVuY3Rpb24odCl7dmFyIG49dGhpcztyZXR1cm5cIltvYmplY3QgQXJyYXldXCIhPXAuY2FsbCh0KT9uLnJlamVjdChUeXBlRXJyb3IoXCJOb3QgYW4gYXJyYXlcIikpOm5ldyBuKGZ1bmN0aW9uKGUsbyl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZXx8XCJmdW5jdGlvblwiIT10eXBlb2Ygbyl0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtjKG4sdCxmdW5jdGlvbih0LG4pe2Uobil9LG8pfSl9KSxhfSk7XG4iLCIvKipcbiAqIEEgbW9kdWxlIG9mIG1ldGhvZHMgdGhhdCB5b3Ugd2FudCB0byBpbmNsdWRlIGluIGFsbCBhY3Rpb25zLlxuICogVGhpcyBtb2R1bGUgaXMgY29uc3VtZWQgYnkgYGNyZWF0ZUFjdGlvbmAuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0ge1xufTtcbiIsImV4cG9ydHMuY3JlYXRlZFN0b3JlcyA9IFtdO1xuXG5leHBvcnRzLmNyZWF0ZWRBY3Rpb25zID0gW107XG5cbmV4cG9ydHMucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICB3aGlsZShleHBvcnRzLmNyZWF0ZWRTdG9yZXMubGVuZ3RoKSB7XG4gICAgICAgIGV4cG9ydHMuY3JlYXRlZFN0b3Jlcy5wb3AoKTtcbiAgICB9XG4gICAgd2hpbGUoZXhwb3J0cy5jcmVhdGVkQWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgZXhwb3J0cy5jcmVhdGVkQWN0aW9ucy5wb3AoKTtcbiAgICB9XG59O1xuIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyksXG4gICAgbWFrZXIgPSByZXF1aXJlKCcuL2pvaW5zJykuaW5zdGFuY2VKb2luQ3JlYXRvcjtcblxuLyoqXG4gKiBFeHRyYWN0IGNoaWxkIGxpc3RlbmFibGVzIGZyb20gYSBwYXJlbnQgZnJvbSB0aGVpclxuICogY2hpbGRyZW4gcHJvcGVydHkgYW5kIHJldHVybiB0aGVtIGluIGEga2V5ZWQgT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmFibGUgVGhlIHBhcmVudCBsaXN0ZW5hYmxlXG4gKi9cbnZhciBtYXBDaGlsZExpc3RlbmFibGVzID0gZnVuY3Rpb24obGlzdGVuYWJsZSkge1xuICAgIHZhciBpID0gMCwgY2hpbGRyZW4gPSB7fSwgY2hpbGROYW1lO1xuICAgIGZvciAoO2kgPCAobGlzdGVuYWJsZS5jaGlsZHJlbnx8W10pLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNoaWxkTmFtZSA9IGxpc3RlbmFibGUuY2hpbGRyZW5baV07XG4gICAgICAgIGlmKGxpc3RlbmFibGVbY2hpbGROYW1lXSl7XG4gICAgICAgICAgICBjaGlsZHJlbltjaGlsZE5hbWVdID0gbGlzdGVuYWJsZVtjaGlsZE5hbWVdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjaGlsZHJlbjtcbn07XG5cbi8qKlxuICogTWFrZSBhIGZsYXQgZGljdGlvbmFyeSBvZiBhbGwgbGlzdGVuYWJsZXMgaW5jbHVkaW5nIHRoZWlyXG4gKiBwb3NzaWJsZSBjaGlsZHJlbiAocmVjdXJzaXZlbHkpLCBjb25jYXRlbmF0aW5nIG5hbWVzIGluIGNhbWVsQ2FzZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuYWJsZXMgVGhlIHRvcC1sZXZlbCBsaXN0ZW5hYmxlc1xuICovXG52YXIgZmxhdHRlbkxpc3RlbmFibGVzID0gZnVuY3Rpb24obGlzdGVuYWJsZXMpIHtcbiAgICB2YXIgZmxhdHRlbmVkID0ge307XG4gICAgZm9yKHZhciBrZXkgaW4gbGlzdGVuYWJsZXMpe1xuICAgICAgICB2YXIgbGlzdGVuYWJsZSA9IGxpc3RlbmFibGVzW2tleV07XG4gICAgICAgIHZhciBjaGlsZE1hcCA9IG1hcENoaWxkTGlzdGVuYWJsZXMobGlzdGVuYWJsZSk7XG5cbiAgICAgICAgLy8gcmVjdXJzaXZlbHkgZmxhdHRlbiBjaGlsZHJlblxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBmbGF0dGVuTGlzdGVuYWJsZXMoY2hpbGRNYXApO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgcHJpbWFyeSBsaXN0ZW5hYmxlIGFuZCBjaGlscmVuXG4gICAgICAgIGZsYXR0ZW5lZFtrZXldID0gbGlzdGVuYWJsZTtcbiAgICAgICAgZm9yKHZhciBjaGlsZEtleSBpbiBjaGlsZHJlbil7XG4gICAgICAgICAgICB2YXIgY2hpbGRMaXN0ZW5hYmxlID0gY2hpbGRyZW5bY2hpbGRLZXldO1xuICAgICAgICAgICAgZmxhdHRlbmVkW2tleSArIF8uY2FwaXRhbGl6ZShjaGlsZEtleSldID0gY2hpbGRMaXN0ZW5hYmxlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZsYXR0ZW5lZDtcbn07XG5cbi8qKlxuICogQSBtb2R1bGUgb2YgbWV0aG9kcyByZWxhdGVkIHRvIGxpc3RlbmluZy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAvKipcbiAgICAgKiBBbiBpbnRlcm5hbCB1dGlsaXR5IGZ1bmN0aW9uIHVzZWQgYnkgYHZhbGlkYXRlTGlzdGVuaW5nYFxuICAgICAqXG4gICAgICogQHBhcmFtIHtBY3Rpb258U3RvcmV9IGxpc3RlbmFibGUgVGhlIGxpc3RlbmFibGUgd2Ugd2FudCB0byBzZWFyY2ggZm9yXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFRoZSByZXN1bHQgb2YgYSByZWN1cnNpdmUgc2VhcmNoIGFtb25nIGB0aGlzLnN1YnNjcmlwdGlvbnNgXG4gICAgICovXG4gICAgaGFzTGlzdGVuZXI6IGZ1bmN0aW9uKGxpc3RlbmFibGUpIHtcbiAgICAgICAgdmFyIGkgPSAwLCBqLCBsaXN0ZW5lciwgbGlzdGVuYWJsZXM7XG4gICAgICAgIGZvciAoO2kgPCAodGhpcy5zdWJzY3JpcHRpb25zfHxbXSkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxpc3RlbmFibGVzID0gW10uY29uY2F0KHRoaXMuc3Vic2NyaXB0aW9uc1tpXS5saXN0ZW5hYmxlKTtcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsaXN0ZW5hYmxlcy5sZW5ndGg7IGorKyl7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5hYmxlc1tqXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09IGxpc3RlbmFibGUgfHwgbGlzdGVuZXIuaGFzTGlzdGVuZXIgJiYgbGlzdGVuZXIuaGFzTGlzdGVuZXIobGlzdGVuYWJsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQSBjb252ZW5pZW5jZSBtZXRob2QgdGhhdCBsaXN0ZW5zIHRvIGFsbCBsaXN0ZW5hYmxlcyBpbiB0aGUgZ2l2ZW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmFibGVzIEFuIG9iamVjdCBvZiBsaXN0ZW5hYmxlcy4gS2V5cyB3aWxsIGJlIHVzZWQgYXMgY2FsbGJhY2sgbWV0aG9kIG5hbWVzLlxuICAgICAqL1xuICAgIGxpc3RlblRvTWFueTogZnVuY3Rpb24obGlzdGVuYWJsZXMpe1xuICAgICAgICB2YXIgYWxsTGlzdGVuYWJsZXMgPSBmbGF0dGVuTGlzdGVuYWJsZXMobGlzdGVuYWJsZXMpO1xuICAgICAgICBmb3IodmFyIGtleSBpbiBhbGxMaXN0ZW5hYmxlcyl7XG4gICAgICAgICAgICB2YXIgY2JuYW1lID0gXy5jYWxsYmFja05hbWUoa2V5KSxcbiAgICAgICAgICAgICAgICBsb2NhbG5hbWUgPSB0aGlzW2NibmFtZV0gPyBjYm5hbWUgOiB0aGlzW2tleV0gPyBrZXkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAobG9jYWxuYW1lKXtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlblRvKGFsbExpc3RlbmFibGVzW2tleV0sbG9jYWxuYW1lLHRoaXNbY2JuYW1lK1wiRGVmYXVsdFwiXXx8dGhpc1tsb2NhbG5hbWUrXCJEZWZhdWx0XCJdfHxsb2NhbG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBjb250ZXh0IGNhbiBsaXN0ZW4gdG8gdGhlIHN1cHBsaWVkIGxpc3RlbmFibGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QWN0aW9ufFN0b3JlfSBsaXN0ZW5hYmxlIEFuIEFjdGlvbiBvciBTdG9yZSB0aGF0IHNob3VsZCBiZVxuICAgICAqICBsaXN0ZW5lZCB0by5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfFVuZGVmaW5lZH0gQW4gZXJyb3IgbWVzc2FnZSwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIHdhcyBubyBwcm9ibGVtLlxuICAgICAqL1xuICAgIHZhbGlkYXRlTGlzdGVuaW5nOiBmdW5jdGlvbihsaXN0ZW5hYmxlKXtcbiAgICAgICAgaWYgKGxpc3RlbmFibGUgPT09IHRoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBcIkxpc3RlbmVyIGlzIG5vdCBhYmxlIHRvIGxpc3RlbiB0byBpdHNlbGZcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihsaXN0ZW5hYmxlLmxpc3RlbikpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5hYmxlICsgXCIgaXMgbWlzc2luZyBhIGxpc3RlbiBtZXRob2RcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdGVuYWJsZS5oYXNMaXN0ZW5lciAmJiBsaXN0ZW5hYmxlLmhhc0xpc3RlbmVyKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJMaXN0ZW5lciBjYW5ub3QgbGlzdGVuIHRvIHRoaXMgbGlzdGVuYWJsZSBiZWNhdXNlIG9mIGNpcmN1bGFyIGxvb3BcIjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgc3Vic2NyaXB0aW9uIHRvIHRoZSBnaXZlbiBsaXN0ZW5hYmxlIGZvciB0aGUgY29udGV4dCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QWN0aW9ufFN0b3JlfSBsaXN0ZW5hYmxlIEFuIEFjdGlvbiBvciBTdG9yZSB0aGF0IHNob3VsZCBiZVxuICAgICAqICBsaXN0ZW5lZCB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGV2ZW50IGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gZGVmYXVsdENhbGxiYWNrIFRoZSBjYWxsYmFjayB0byByZWdpc3RlciBhcyBkZWZhdWx0IGhhbmRsZXJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBIHN1YnNjcmlwdGlvbiBvYmogd2hlcmUgYHN0b3BgIGlzIGFuIHVuc3ViIGZ1bmN0aW9uIGFuZCBgbGlzdGVuYWJsZWAgaXMgdGhlIG9iamVjdCBiZWluZyBsaXN0ZW5lZCB0b1xuICAgICAqL1xuICAgIGxpc3RlblRvOiBmdW5jdGlvbihsaXN0ZW5hYmxlLCBjYWxsYmFjaywgZGVmYXVsdENhbGxiYWNrKSB7XG4gICAgICAgIHZhciBkZXN1YiwgdW5zdWJzY3JpYmVyLCBzdWJzY3JpcHRpb25vYmosIHN1YnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMgfHwgW107XG4gICAgICAgIF8udGhyb3dJZih0aGlzLnZhbGlkYXRlTGlzdGVuaW5nKGxpc3RlbmFibGUpKTtcbiAgICAgICAgdGhpcy5mZXRjaEluaXRpYWxTdGF0ZShsaXN0ZW5hYmxlLCBkZWZhdWx0Q2FsbGJhY2spO1xuICAgICAgICBkZXN1YiA9IGxpc3RlbmFibGUubGlzdGVuKHRoaXNbY2FsbGJhY2tdfHxjYWxsYmFjaywgdGhpcyk7XG4gICAgICAgIHVuc3Vic2NyaWJlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gc3Vicy5pbmRleE9mKHN1YnNjcmlwdGlvbm9iaik7XG4gICAgICAgICAgICBfLnRocm93SWYoaW5kZXggPT09IC0xLCdUcmllZCB0byByZW1vdmUgbGlzdGVuIGFscmVhZHkgZ29uZSBmcm9tIHN1YnNjcmlwdGlvbnMgbGlzdCEnKTtcbiAgICAgICAgICAgIHN1YnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGRlc3ViKCk7XG4gICAgICAgIH07XG4gICAgICAgIHN1YnNjcmlwdGlvbm9iaiA9IHtcbiAgICAgICAgICAgIHN0b3A6IHVuc3Vic2NyaWJlcixcbiAgICAgICAgICAgIGxpc3RlbmFibGU6IGxpc3RlbmFibGVcbiAgICAgICAgfTtcbiAgICAgICAgc3Vicy5wdXNoKHN1YnNjcmlwdGlvbm9iaik7XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb25vYmo7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3BzIGxpc3RlbmluZyB0byBhIHNpbmdsZSBsaXN0ZW5hYmxlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FjdGlvbnxTdG9yZX0gbGlzdGVuYWJsZSBUaGUgYWN0aW9uIG9yIHN0b3JlIHdlIG5vIGxvbmdlciB3YW50IHRvIGxpc3RlbiB0b1xuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIGEgc3Vic2NyaXB0aW9uIHdhcyBmb3VuZCBhbmQgcmVtb3ZlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHN0b3BMaXN0ZW5pbmdUbzogZnVuY3Rpb24obGlzdGVuYWJsZSl7XG4gICAgICAgIHZhciBzdWIsIGkgPSAwLCBzdWJzID0gdGhpcy5zdWJzY3JpcHRpb25zIHx8IFtdO1xuICAgICAgICBmb3IoO2kgPCBzdWJzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHN1YiA9IHN1YnNbaV07XG4gICAgICAgICAgICBpZiAoc3ViLmxpc3RlbmFibGUgPT09IGxpc3RlbmFibGUpe1xuICAgICAgICAgICAgICAgIHN1Yi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmKHN1YnMuaW5kZXhPZihzdWIpIT09LTEsJ0ZhaWxlZCB0byByZW1vdmUgbGlzdGVuIGZyb20gc3Vic2NyaXB0aW9ucyBsaXN0IScpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgYWxsIHN1YnNjcmlwdGlvbnMgYW5kIGVtcHRpZXMgc3Vic2NyaXB0aW9ucyBhcnJheVxuICAgICAqL1xuICAgIHN0b3BMaXN0ZW5pbmdUb0FsbDogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHJlbWFpbmluZywgc3VicyA9IHRoaXMuc3Vic2NyaXB0aW9ucyB8fCBbXTtcbiAgICAgICAgd2hpbGUoKHJlbWFpbmluZz1zdWJzLmxlbmd0aCkpe1xuICAgICAgICAgICAgc3Vic1swXS5zdG9wKCk7XG4gICAgICAgICAgICBfLnRocm93SWYoc3Vicy5sZW5ndGghPT1yZW1haW5pbmctMSwnRmFpbGVkIHRvIHJlbW92ZSBsaXN0ZW4gZnJvbSBzdWJzY3JpcHRpb25zIGxpc3QhJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXNlZCBpbiBgbGlzdGVuVG9gLiBGZXRjaGVzIGluaXRpYWwgZGF0YSBmcm9tIGEgcHVibGlzaGVyIGlmIGl0IGhhcyBhIGBnZXRJbml0aWFsU3RhdGVgIG1ldGhvZC5cbiAgICAgKiBAcGFyYW0ge0FjdGlvbnxTdG9yZX0gbGlzdGVuYWJsZSBUaGUgcHVibGlzaGVyIHdlIHdhbnQgdG8gZ2V0IGluaXRpYWwgc3RhdGUgZnJvbVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBkZWZhdWx0Q2FsbGJhY2sgVGhlIG1ldGhvZCB0byByZWNlaXZlIHRoZSBkYXRhXG4gICAgICovXG4gICAgZmV0Y2hJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIChsaXN0ZW5hYmxlLCBkZWZhdWx0Q2FsbGJhY2spIHtcbiAgICAgICAgZGVmYXVsdENhbGxiYWNrID0gKGRlZmF1bHRDYWxsYmFjayAmJiB0aGlzW2RlZmF1bHRDYWxsYmFja10pIHx8IGRlZmF1bHRDYWxsYmFjaztcbiAgICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihkZWZhdWx0Q2FsbGJhY2spICYmIF8uaXNGdW5jdGlvbihsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSkpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gbGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgICAgIGlmIChkYXRhICYmIF8uaXNGdW5jdGlvbihkYXRhLnRoZW4pKSB7XG4gICAgICAgICAgICAgICAgZGF0YS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q2FsbGJhY2suYXBwbHkobWUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRDYWxsYmFjay5jYWxsKHRoaXMsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBvbmNlIGFsbCBsaXN0ZW5hYmxlcyBoYXZlIHRyaWdnZXJlZCBhdCBsZWFzdCBvbmNlLlxuICAgICAqIEl0IHdpbGwgYmUgaW52b2tlZCB3aXRoIHRoZSBsYXN0IGVtaXNzaW9uIGZyb20gZWFjaCBsaXN0ZW5hYmxlLlxuICAgICAqIEBwYXJhbSB7Li4uUHVibGlzaGVyc30gcHVibGlzaGVycyBQdWJsaXNoZXJzIHRoYXQgc2hvdWxkIGJlIHRyYWNrZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGNhbGxiYWNrIFRoZSBtZXRob2QgdG8gY2FsbCB3aGVuIGFsbCBwdWJsaXNoZXJzIGhhdmUgZW1pdHRlZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEEgc3Vic2NyaXB0aW9uIG9iaiB3aGVyZSBgc3RvcGAgaXMgYW4gdW5zdWIgZnVuY3Rpb24gYW5kIGBsaXN0ZW5hYmxlYCBpcyBhbiBhcnJheSBvZiBsaXN0ZW5hYmxlc1xuICAgICAqL1xuICAgIGpvaW5UcmFpbGluZzogbWFrZXIoXCJsYXN0XCIpLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIG9uY2UgYWxsIGxpc3RlbmFibGVzIGhhdmUgdHJpZ2dlcmVkIGF0IGxlYXN0IG9uY2UuXG4gICAgICogSXQgd2lsbCBiZSBpbnZva2VkIHdpdGggdGhlIGZpcnN0IGVtaXNzaW9uIGZyb20gZWFjaCBsaXN0ZW5hYmxlLlxuICAgICAqIEBwYXJhbSB7Li4uUHVibGlzaGVyc30gcHVibGlzaGVycyBQdWJsaXNoZXJzIHRoYXQgc2hvdWxkIGJlIHRyYWNrZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGNhbGxiYWNrIFRoZSBtZXRob2QgdG8gY2FsbCB3aGVuIGFsbCBwdWJsaXNoZXJzIGhhdmUgZW1pdHRlZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEEgc3Vic2NyaXB0aW9uIG9iaiB3aGVyZSBgc3RvcGAgaXMgYW4gdW5zdWIgZnVuY3Rpb24gYW5kIGBsaXN0ZW5hYmxlYCBpcyBhbiBhcnJheSBvZiBsaXN0ZW5hYmxlc1xuICAgICAqL1xuICAgIGpvaW5MZWFkaW5nOiBtYWtlcihcImZpcnN0XCIpLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIG9uY2UgYWxsIGxpc3RlbmFibGVzIGhhdmUgdHJpZ2dlcmVkIGF0IGxlYXN0IG9uY2UuXG4gICAgICogSXQgd2lsbCBiZSBpbnZva2VkIHdpdGggYWxsIGVtaXNzaW9uIGZyb20gZWFjaCBsaXN0ZW5hYmxlLlxuICAgICAqIEBwYXJhbSB7Li4uUHVibGlzaGVyc30gcHVibGlzaGVycyBQdWJsaXNoZXJzIHRoYXQgc2hvdWxkIGJlIHRyYWNrZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGNhbGxiYWNrIFRoZSBtZXRob2QgdG8gY2FsbCB3aGVuIGFsbCBwdWJsaXNoZXJzIGhhdmUgZW1pdHRlZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEEgc3Vic2NyaXB0aW9uIG9iaiB3aGVyZSBgc3RvcGAgaXMgYW4gdW5zdWIgZnVuY3Rpb24gYW5kIGBsaXN0ZW5hYmxlYCBpcyBhbiBhcnJheSBvZiBsaXN0ZW5hYmxlc1xuICAgICAqL1xuICAgIGpvaW5Db25jYXQ6IG1ha2VyKFwiYWxsXCIpLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIG9uY2UgYWxsIGxpc3RlbmFibGVzIGhhdmUgdHJpZ2dlcmVkLlxuICAgICAqIElmIGEgY2FsbGJhY2sgdHJpZ2dlcnMgdHdpY2UgYmVmb3JlIHRoYXQgaGFwcGVucywgYW4gZXJyb3IgaXMgdGhyb3duLlxuICAgICAqIEBwYXJhbSB7Li4uUHVibGlzaGVyc30gcHVibGlzaGVycyBQdWJsaXNoZXJzIHRoYXQgc2hvdWxkIGJlIHRyYWNrZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGNhbGxiYWNrIFRoZSBtZXRob2QgdG8gY2FsbCB3aGVuIGFsbCBwdWJsaXNoZXJzIGhhdmUgZW1pdHRlZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEEgc3Vic2NyaXB0aW9uIG9iaiB3aGVyZSBgc3RvcGAgaXMgYW4gdW5zdWIgZnVuY3Rpb24gYW5kIGBsaXN0ZW5hYmxlYCBpcyBhbiBhcnJheSBvZiBsaXN0ZW5hYmxlc1xuICAgICAqL1xuICAgIGpvaW5TdHJpY3Q6IG1ha2VyKFwic3RyaWN0XCIpXG59O1xuIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyksXG4gICAgTGlzdGVuZXJNZXRob2RzID0gcmVxdWlyZSgnLi9MaXN0ZW5lck1ldGhvZHMnKTtcblxuLyoqXG4gKiBBIG1vZHVsZSBtZWFudCB0byBiZSBjb25zdW1lZCBhcyBhIG1peGluIGJ5IGEgUmVhY3QgY29tcG9uZW50LiBTdXBwbGllcyB0aGUgbWV0aG9kcyBmcm9tXG4gKiBgTGlzdGVuZXJNZXRob2RzYCBtaXhpbiBhbmQgdGFrZXMgY2FyZSBvZiB0ZWFyZG93biBvZiBzdWJzY3JpcHRpb25zLlxuICogTm90ZSB0aGF0IGlmIHlvdSdyZSB1c2luZyB0aGUgYGNvbm5lY3RgIG1peGluIHlvdSBkb24ndCBuZWVkIHRoaXMgbWl4aW4sIGFzIGNvbm5lY3Qgd2lsbFxuICogaW1wb3J0IGV2ZXJ5dGhpbmcgdGhpcyBtaXhpbiBjb250YWlucyFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfLmV4dGVuZCh7XG5cbiAgICAvKipcbiAgICAgKiBDbGVhbnMgdXAgYWxsIGxpc3RlbmVyIHByZXZpb3VzbHkgcmVnaXN0ZXJlZC5cbiAgICAgKi9cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogTGlzdGVuZXJNZXRob2RzLnN0b3BMaXN0ZW5pbmdUb0FsbFxuXG59LCBMaXN0ZW5lck1ldGhvZHMpO1xuIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogQSBtb2R1bGUgb2YgbWV0aG9kcyBmb3Igb2JqZWN0IHRoYXQgeW91IHdhbnQgdG8gYmUgYWJsZSB0byBsaXN0ZW4gdG8uXG4gKiBUaGlzIG1vZHVsZSBpcyBjb25zdW1lZCBieSBgY3JlYXRlU3RvcmVgIGFuZCBgY3JlYXRlQWN0aW9uYFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIC8qKlxuICAgICAqIEhvb2sgdXNlZCBieSB0aGUgcHVibGlzaGVyIHRoYXQgaXMgaW52b2tlZCBiZWZvcmUgZW1pdHRpbmdcbiAgICAgKiBhbmQgYmVmb3JlIGBzaG91bGRFbWl0YC4gVGhlIGFyZ3VtZW50cyBhcmUgdGhlIG9uZXMgdGhhdCB0aGUgYWN0aW9uXG4gICAgICogaXMgaW52b2tlZCB3aXRoLiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgc29tZXRoaW5nIG90aGVyIHRoYW5cbiAgICAgKiB1bmRlZmluZWQsIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gYXMgYXJndW1lbnRzIGZvciBzaG91bGRFbWl0IGFuZFxuICAgICAqIGVtaXNzaW9uLlxuICAgICAqL1xuICAgIHByZUVtaXQ6IGZ1bmN0aW9uKCkge30sXG5cbiAgICAvKipcbiAgICAgKiBIb29rIHVzZWQgYnkgdGhlIHB1Ymxpc2hlciBhZnRlciBgcHJlRW1pdGAgdG8gZGV0ZXJtaW5lIGlmIHRoZVxuICAgICAqIGV2ZW50IHNob3VsZCBiZSBlbWl0dGVkIHdpdGggZ2l2ZW4gYXJndW1lbnRzLiBUaGlzIG1heSBiZSBvdmVycmlkZGVuXG4gICAgICogaW4geW91ciBhcHBsaWNhdGlvbiwgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBhbHdheXMgcmV0dXJucyB0cnVlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgZXZlbnQgc2hvdWxkIGJlIGVtaXR0ZWRcbiAgICAgKi9cbiAgICBzaG91bGRFbWl0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0sXG5cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYWN0aW9uIHRyaWdnZXJlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGV2ZW50IGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge01peGVkfSBbb3B0aW9uYWxdIGJpbmRDb250ZXh0IFRoZSBjb250ZXh0IHRvIGJpbmQgdGhlIGNhbGxiYWNrIHdpdGhcbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IENhbGxiYWNrIHRoYXQgdW5zdWJzY3JpYmVzIHRoZSByZWdpc3RlcmVkIGV2ZW50IGhhbmRsZXJcbiAgICAgKi9cbiAgICBsaXN0ZW46IGZ1bmN0aW9uKGNhbGxiYWNrLCBiaW5kQ29udGV4dCkge1xuICAgICAgICBiaW5kQ29udGV4dCA9IGJpbmRDb250ZXh0IHx8IHRoaXM7XG4gICAgICAgIHZhciBldmVudEhhbmRsZXIgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgICBpZiAoYWJvcnRlZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkoYmluZENvbnRleHQsIGFyZ3MpO1xuICAgICAgICB9LCBtZSA9IHRoaXMsIGFib3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmFkZExpc3RlbmVyKHRoaXMuZXZlbnRMYWJlbCwgZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBtZS5lbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG1lLmV2ZW50TGFiZWwsIGV2ZW50SGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEF0dGFjaCBoYW5kbGVycyB0byBwcm9taXNlIHRoYXQgdHJpZ2dlciB0aGUgY29tcGxldGVkIGFuZCBmYWlsZWRcbiAgICAgKiBjaGlsZCBwdWJsaXNoZXJzLCBpZiBhdmFpbGFibGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gVGhlIHByb21pc2UgdG8gYXR0YWNoIHRvXG4gICAgICovXG4gICAgcHJvbWlzZTogZnVuY3Rpb24ocHJvbWlzZSkge1xuICAgICAgICB2YXIgbWUgPSB0aGlzO1xuXG4gICAgICAgIHZhciBjYW5IYW5kbGVQcm9taXNlID1cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uaW5kZXhPZignY29tcGxldGVkJykgPj0gMCAmJlxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5pbmRleE9mKCdmYWlsZWQnKSA+PSAwO1xuXG4gICAgICAgIGlmICghY2FuSGFuZGxlUHJvbWlzZSl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1B1Ymxpc2hlciBtdXN0IGhhdmUgXCJjb21wbGV0ZWRcIiBhbmQgXCJmYWlsZWRcIiBjaGlsZCBwdWJsaXNoZXJzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBtZS5jb21wbGV0ZWQocmVzcG9uc2UpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIG1lLmZhaWxlZChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYWN0aW9uIHRyaWdnZXJlZCwgd2hpY2ggc2hvdWxkXG4gICAgICogcmV0dXJuIGEgcHJvbWlzZSB0aGF0IGluIHR1cm4gaXMgcGFzc2VkIHRvIGB0aGlzLnByb21pc2VgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcmVnaXN0ZXIgYXMgZXZlbnQgaGFuZGxlclxuICAgICAqL1xuICAgIGxpc3RlbkFuZFByb21pc2U6IGZ1bmN0aW9uKGNhbGxiYWNrLCBiaW5kQ29udGV4dCkge1xuICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICBiaW5kQ29udGV4dCA9IGJpbmRDb250ZXh0IHx8IHRoaXM7XG4gICAgICAgIHRoaXMud2lsbENhbGxQcm9taXNlID0gKHRoaXMud2lsbENhbGxQcm9taXNlIHx8IDApICsgMTtcblxuICAgICAgICB2YXIgcmVtb3ZlTGlzdGVuID0gdGhpcy5saXN0ZW4oZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGEgcHJvbWlzZSBidXQgZ290ICcgKyBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBjYWxsYmFjay5hcHBseShiaW5kQ29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICByZXR1cm4gbWUucHJvbWlzZS5jYWxsKG1lLCBwcm9taXNlKTtcbiAgICAgICAgfSwgYmluZENvbnRleHQpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbWUud2lsbENhbGxQcm9taXNlLS07XG4gICAgICAgICAgcmVtb3ZlTGlzdGVuLmNhbGwobWUpO1xuICAgICAgICB9O1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFB1Ymxpc2hlcyBhbiBldmVudCB1c2luZyBgdGhpcy5lbWl0dGVyYCAoaWYgYHNob3VsZEVtaXRgIGFncmVlcylcbiAgICAgKi9cbiAgICB0cmlnZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgICAgICBwcmUgPSB0aGlzLnByZUVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGFyZ3MgPSBwcmUgPT09IHVuZGVmaW5lZCA/IGFyZ3MgOiBfLmlzQXJndW1lbnRzKHByZSkgPyBwcmUgOiBbXS5jb25jYXQocHJlKTtcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkRW1pdC5hcHBseSh0aGlzLCBhcmdzKSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQodGhpcy5ldmVudExhYmVsLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byBwdWJsaXNoIHRoZSBldmVudCBvbiB0aGUgbmV4dCB0aWNrXG4gICAgICovXG4gICAgdHJpZ2dlckFzeW5jOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxtZSA9IHRoaXM7XG4gICAgICAgIF8ubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZS50cmlnZ2VyLmFwcGx5KG1lLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBQcm9taXNlIGZvciB0aGUgdHJpZ2dlcmVkIGFjdGlvblxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKiAgIFJlc29sdmVkIGJ5IGNvbXBsZXRlZCBjaGlsZCBhY3Rpb24uXG4gICAgICogICBSZWplY3RlZCBieSBmYWlsZWQgY2hpbGQgYWN0aW9uLlxuICAgICAqICAgSWYgbGlzdGVuQW5kUHJvbWlzZSdkLCB0aGVuIHByb21pc2UgYXNzb2NpYXRlZCB0byB0aGlzIHRyaWdnZXIuXG4gICAgICogICBPdGhlcndpc2UsIHRoZSBwcm9taXNlIGlzIGZvciBuZXh0IGNoaWxkIGFjdGlvbiBjb21wbGV0aW9uLlxuICAgICAqL1xuICAgIHRyaWdnZXJQcm9taXNlOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICB2YXIgY2FuSGFuZGxlUHJvbWlzZSA9XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmluZGV4T2YoJ2NvbXBsZXRlZCcpID49IDAgJiZcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uaW5kZXhPZignZmFpbGVkJykgPj0gMDtcblxuICAgICAgICB2YXIgcHJvbWlzZSA9IF8uY3JlYXRlUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIC8vIElmIGBsaXN0ZW5BbmRQcm9taXNlYCBpcyBsaXN0ZW5pbmdcbiAgICAgICAgICAgIC8vIHBhdGNoIGBwcm9taXNlYCB3LyBjb250ZXh0LWxvYWRlZCByZXNvbHZlL3JlamVjdFxuICAgICAgICAgICAgaWYgKG1lLndpbGxDYWxsUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIF8ubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRfcHJvbWlzZV9tZXRob2QgPSBtZS5wcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICBtZS5wcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQmFjayB0byB5b3VyIHJlZ3VsYXJseSBzY2hlZHVsZSBwcm9ncmFtbWluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLnByb21pc2UgPSBvbGRfcHJvbWlzZV9tZXRob2Q7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWUucHJvbWlzZS5hcHBseShtZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgbWUudHJpZ2dlci5hcHBseShtZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FuSGFuZGxlUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHZhciByZW1vdmVTdWNjZXNzID0gbWUuY29tcGxldGVkLmxpc3RlbihmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRmFpbGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlRmFpbGVkID0gbWUuZmFpbGVkLmxpc3RlbihmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRmFpbGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChhcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWUudHJpZ2dlckFzeW5jLmFwcGx5KG1lLCBhcmdzKTtcblxuICAgICAgICAgICAgaWYgKCFjYW5IYW5kbGVQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG59O1xuIiwiLyoqXG4gKiBBIG1vZHVsZSBvZiBtZXRob2RzIHRoYXQgeW91IHdhbnQgdG8gaW5jbHVkZSBpbiBhbGwgc3RvcmVzLlxuICogVGhpcyBtb2R1bGUgaXMgY29uc3VtZWQgYnkgYGNyZWF0ZVN0b3JlYC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihzdG9yZSwgZGVmaW5pdGlvbikge1xuICBmb3IgKHZhciBuYW1lIGluIGRlZmluaXRpb24pIHtcbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgdmFyIHByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZGVmaW5pdGlvbiwgbmFtZSk7XG5cbiAgICAgICAgaWYgKCFwcm9wZXJ0eURlc2NyaXB0b3IudmFsdWUgfHwgdHlwZW9mIHByb3BlcnR5RGVzY3JpcHRvci52YWx1ZSAhPT0gJ2Z1bmN0aW9uJyB8fCAhZGVmaW5pdGlvbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBzdG9yZVtuYW1lXSA9IGRlZmluaXRpb25bbmFtZV0uYmluZChzdG9yZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHByb3BlcnR5ID0gZGVmaW5pdGlvbltuYW1lXTtcblxuICAgICAgICBpZiAodHlwZW9mIHByb3BlcnR5ICE9PSAnZnVuY3Rpb24nIHx8ICFkZWZpbml0aW9uLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3JlW25hbWVdID0gcHJvcGVydHkuYmluZChzdG9yZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN0b3JlO1xufTtcbiIsInZhciBSZWZsdXggPSByZXF1aXJlKCcuL2luZGV4JyksXG4gICAgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0ZW5hYmxlLGtleSl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgaWYgKCFfLmlzRnVuY3Rpb24obGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5vYmplY3QoW2tleV0sW2xpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKCldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBfLmV4dGVuZCh0aGlzLFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMpO1xuICAgICAgICAgICAgdmFyIG1lID0gdGhpcywgY2IgPSAoa2V5ID09PSB1bmRlZmluZWQgPyB0aGlzLnNldFN0YXRlIDogZnVuY3Rpb24odil7bWUuc2V0U3RhdGUoXy5vYmplY3QoW2tleV0sW3ZdKSk7fSk7XG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvKGxpc3RlbmFibGUsY2IpO1xuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnRXaWxsVW5tb3VudDogUmVmbHV4Lkxpc3RlbmVyTWl4aW4uY29tcG9uZW50V2lsbFVubW91bnRcbiAgICB9O1xufTtcbiIsInZhciBSZWZsdXggPSByZXF1aXJlKCcuL2luZGV4JyksXG4gIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdGVuYWJsZSwga2V5LCBmaWx0ZXJGdW5jKSB7XG4gICAgZmlsdGVyRnVuYyA9IF8uaXNGdW5jdGlvbihrZXkpID8ga2V5IDogZmlsdGVyRnVuYztcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFfLmlzRnVuY3Rpb24obGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzRnVuY3Rpb24oa2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJGdW5jLmNhbGwodGhpcywgbGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEZpbHRlciBpbml0aWFsIHBheWxvYWQgZnJvbSBzdG9yZS5cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmlsdGVyRnVuYy5jYWxsKHRoaXMsIGxpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKCkpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfLm9iamVjdChba2V5XSwgW3Jlc3VsdF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfLmV4dGVuZCh0aGlzLCBSZWZsdXguTGlzdGVuZXJNZXRob2RzKTtcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgY2IgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBtZS5zZXRTdGF0ZShmaWx0ZXJGdW5jLmNhbGwobWUsIHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZpbHRlckZ1bmMuY2FsbChtZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBtZS5zZXRTdGF0ZShfLm9iamVjdChba2V5XSwgW3Jlc3VsdF0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvKGxpc3RlbmFibGUsIGNiKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQ6IFJlZmx1eC5MaXN0ZW5lck1peGluLmNvbXBvbmVudFdpbGxVbm1vdW50XG4gICAgfTtcbn07XG5cbiIsInZhciBfID0gcmVxdWlyZSgnLi91dGlscycpLFxuICAgIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKSxcbiAgICBLZWVwID0gcmVxdWlyZSgnLi9LZWVwJyksXG4gICAgYWxsb3dlZCA9IHtwcmVFbWl0OjEsc2hvdWxkRW1pdDoxfTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFjdGlvbiBmdW5jdG9yIG9iamVjdC4gSXQgaXMgbWl4ZWQgaW4gd2l0aCBmdW5jdGlvbnNcbiAqIGZyb20gdGhlIGBQdWJsaXNoZXJNZXRob2RzYCBtaXhpbi4gYHByZUVtaXRgIGFuZCBgc2hvdWxkRW1pdGAgbWF5XG4gKiBiZSBvdmVycmlkZGVuIGluIHRoZSBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmaW5pdGlvbiBUaGUgYWN0aW9uIG9iamVjdCBkZWZpbml0aW9uXG4gKi9cbnZhciBjcmVhdGVBY3Rpb24gPSBmdW5jdGlvbihkZWZpbml0aW9uKSB7XG5cbiAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbiB8fCB7fTtcbiAgICBpZiAoIV8uaXNPYmplY3QoZGVmaW5pdGlvbikpe1xuICAgICAgICBkZWZpbml0aW9uID0ge2FjdGlvbk5hbWU6IGRlZmluaXRpb259O1xuICAgIH1cblxuICAgIGZvcih2YXIgYSBpbiBSZWZsdXguQWN0aW9uTWV0aG9kcyl7XG4gICAgICAgIGlmICghYWxsb3dlZFthXSAmJiBSZWZsdXguUHVibGlzaGVyTWV0aG9kc1thXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IG92ZXJyaWRlIEFQSSBtZXRob2QgXCIgKyBhICtcbiAgICAgICAgICAgICAgICBcIiBpbiBSZWZsdXguQWN0aW9uTWV0aG9kcy4gVXNlIGFub3RoZXIgbWV0aG9kIG5hbWUgb3Igb3ZlcnJpZGUgaXQgb24gUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHMgaW5zdGVhZC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcih2YXIgZCBpbiBkZWZpbml0aW9uKXtcbiAgICAgICAgaWYgKCFhbGxvd2VkW2RdICYmIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzW2RdKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgb3ZlcnJpZGUgQVBJIG1ldGhvZCBcIiArIGQgK1xuICAgICAgICAgICAgICAgIFwiIGluIGFjdGlvbiBjcmVhdGlvbi4gVXNlIGFub3RoZXIgbWV0aG9kIG5hbWUgb3Igb3ZlcnJpZGUgaXQgb24gUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHMgaW5zdGVhZC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlZmluaXRpb24uY2hpbGRyZW4gPSBkZWZpbml0aW9uLmNoaWxkcmVuIHx8IFtdO1xuICAgIGlmIChkZWZpbml0aW9uLmFzeW5jUmVzdWx0KXtcbiAgICAgICAgZGVmaW5pdGlvbi5jaGlsZHJlbiA9IGRlZmluaXRpb24uY2hpbGRyZW4uY29uY2F0KFtcImNvbXBsZXRlZFwiLFwiZmFpbGVkXCJdKTtcbiAgICB9XG5cbiAgICB2YXIgaSA9IDAsIGNoaWxkQWN0aW9ucyA9IHt9O1xuICAgIGZvciAoOyBpIDwgZGVmaW5pdGlvbi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbmFtZSA9IGRlZmluaXRpb24uY2hpbGRyZW5baV07XG4gICAgICAgIGNoaWxkQWN0aW9uc1tuYW1lXSA9IGNyZWF0ZUFjdGlvbihuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgY29udGV4dCA9IF8uZXh0ZW5kKHtcbiAgICAgICAgZXZlbnRMYWJlbDogXCJhY3Rpb25cIixcbiAgICAgICAgZW1pdHRlcjogbmV3IF8uRXZlbnRFbWl0dGVyKCksXG4gICAgICAgIF9pc0FjdGlvbjogdHJ1ZVxuICAgIH0sIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzLCBSZWZsdXguQWN0aW9uTWV0aG9kcywgZGVmaW5pdGlvbik7XG5cbiAgICB2YXIgZnVuY3RvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuY3RvcltmdW5jdG9yLnN5bmM/XCJ0cmlnZ2VyXCI6XCJ0cmlnZ2VyUHJvbWlzZVwiXS5hcHBseShmdW5jdG9yLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBfLmV4dGVuZChmdW5jdG9yLGNoaWxkQWN0aW9ucyxjb250ZXh0KTtcblxuICAgIEtlZXAuY3JlYXRlZEFjdGlvbnMucHVzaChmdW5jdG9yKTtcblxuICAgIHJldHVybiBmdW5jdG9yO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFjdGlvbjtcbiIsInZhciBfID0gcmVxdWlyZSgnLi91dGlscycpLFxuICAgIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKSxcbiAgICBLZWVwID0gcmVxdWlyZSgnLi9LZWVwJyksXG4gICAgbWl4ZXIgPSByZXF1aXJlKCcuL21peGVyJyksXG4gICAgYWxsb3dlZCA9IHtwcmVFbWl0OjEsc2hvdWxkRW1pdDoxfSxcbiAgICBiaW5kTWV0aG9kcyA9IHJlcXVpcmUoJy4vYmluZE1ldGhvZHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGV2ZW50IGVtaXR0aW5nIERhdGEgU3RvcmUuIEl0IGlzIG1peGVkIGluIHdpdGggZnVuY3Rpb25zXG4gKiBmcm9tIHRoZSBgTGlzdGVuZXJNZXRob2RzYCBhbmQgYFB1Ymxpc2hlck1ldGhvZHNgIG1peGlucy4gYHByZUVtaXRgXG4gKiBhbmQgYHNob3VsZEVtaXRgIG1heSBiZSBvdmVycmlkZGVuIGluIHRoZSBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmaW5pdGlvbiBUaGUgZGF0YSBzdG9yZSBvYmplY3QgZGVmaW5pdGlvblxuICogQHJldHVybnMge1N0b3JlfSBBIGRhdGEgc3RvcmUgaW5zdGFuY2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkZWZpbml0aW9uKSB7XG5cbiAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbiB8fCB7fTtcblxuICAgIGZvcih2YXIgYSBpbiBSZWZsdXguU3RvcmVNZXRob2RzKXtcbiAgICAgICAgaWYgKCFhbGxvd2VkW2FdICYmIChSZWZsdXguUHVibGlzaGVyTWV0aG9kc1thXSB8fCBSZWZsdXguTGlzdGVuZXJNZXRob2RzW2FdKSl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgb3ZlcnJpZGUgQVBJIG1ldGhvZCBcIiArIGEgK1xuICAgICAgICAgICAgICAgIFwiIGluIFJlZmx1eC5TdG9yZU1ldGhvZHMuIFVzZSBhbm90aGVyIG1ldGhvZCBuYW1lIG9yIG92ZXJyaWRlIGl0IG9uIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzIC8gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyBpbnN0ZWFkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKHZhciBkIGluIGRlZmluaXRpb24pe1xuICAgICAgICBpZiAoIWFsbG93ZWRbZF0gJiYgKFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzW2RdIHx8IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHNbZF0pKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBvdmVycmlkZSBBUEkgbWV0aG9kIFwiICsgZCArXG4gICAgICAgICAgICAgICAgXCIgaW4gc3RvcmUgY3JlYXRpb24uIFVzZSBhbm90aGVyIG1ldGhvZCBuYW1lIG9yIG92ZXJyaWRlIGl0IG9uIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzIC8gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyBpbnN0ZWFkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVmaW5pdGlvbiA9IG1peGVyKGRlZmluaXRpb24pO1xuXG4gICAgZnVuY3Rpb24gU3RvcmUoKSB7XG4gICAgICAgIHZhciBpPTAsIGFycjtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBfLkV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLmV2ZW50TGFiZWwgPSBcImNoYW5nZVwiO1xuICAgICAgICBiaW5kTWV0aG9kcyh0aGlzLCBkZWZpbml0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdCAmJiBfLmlzRnVuY3Rpb24odGhpcy5pbml0KSkge1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubGlzdGVuYWJsZXMpe1xuICAgICAgICAgICAgYXJyID0gW10uY29uY2F0KHRoaXMubGlzdGVuYWJsZXMpO1xuICAgICAgICAgICAgZm9yKDtpIDwgYXJyLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuVG9NYW55KGFycltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfLmV4dGVuZChTdG9yZS5wcm90b3R5cGUsIFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMsIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzLCBSZWZsdXguU3RvcmVNZXRob2RzLCBkZWZpbml0aW9uKTtcblxuICAgIHZhciBzdG9yZSA9IG5ldyBTdG9yZSgpO1xuICAgIEtlZXAuY3JlYXRlZFN0b3Jlcy5wdXNoKHN0b3JlKTtcblxuICAgIHJldHVybiBzdG9yZTtcbn07XG4iLCJleHBvcnRzLkFjdGlvbk1ldGhvZHMgPSByZXF1aXJlKCcuL0FjdGlvbk1ldGhvZHMnKTtcblxuZXhwb3J0cy5MaXN0ZW5lck1ldGhvZHMgPSByZXF1aXJlKCcuL0xpc3RlbmVyTWV0aG9kcycpO1xuXG5leHBvcnRzLlB1Ymxpc2hlck1ldGhvZHMgPSByZXF1aXJlKCcuL1B1Ymxpc2hlck1ldGhvZHMnKTtcblxuZXhwb3J0cy5TdG9yZU1ldGhvZHMgPSByZXF1aXJlKCcuL1N0b3JlTWV0aG9kcycpO1xuXG5leHBvcnRzLmNyZWF0ZUFjdGlvbiA9IHJlcXVpcmUoJy4vY3JlYXRlQWN0aW9uJyk7XG5cbmV4cG9ydHMuY3JlYXRlU3RvcmUgPSByZXF1aXJlKCcuL2NyZWF0ZVN0b3JlJyk7XG5cbmV4cG9ydHMuY29ubmVjdCA9IHJlcXVpcmUoJy4vY29ubmVjdCcpO1xuXG5leHBvcnRzLmNvbm5lY3RGaWx0ZXIgPSByZXF1aXJlKCcuL2Nvbm5lY3RGaWx0ZXInKTtcblxuZXhwb3J0cy5MaXN0ZW5lck1peGluID0gcmVxdWlyZSgnLi9MaXN0ZW5lck1peGluJyk7XG5cbmV4cG9ydHMubGlzdGVuVG8gPSByZXF1aXJlKCcuL2xpc3RlblRvJyk7XG5cbmV4cG9ydHMubGlzdGVuVG9NYW55ID0gcmVxdWlyZSgnLi9saXN0ZW5Ub01hbnknKTtcblxuXG52YXIgbWFrZXIgPSByZXF1aXJlKCcuL2pvaW5zJykuc3RhdGljSm9pbkNyZWF0b3I7XG5cbmV4cG9ydHMuam9pblRyYWlsaW5nID0gZXhwb3J0cy5hbGwgPSBtYWtlcihcImxhc3RcIik7IC8vIFJlZmx1eC5hbGwgYWxpYXMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcblxuZXhwb3J0cy5qb2luTGVhZGluZyA9IG1ha2VyKFwiZmlyc3RcIik7XG5cbmV4cG9ydHMuam9pblN0cmljdCA9IG1ha2VyKFwic3RyaWN0XCIpO1xuXG5leHBvcnRzLmpvaW5Db25jYXQgPSBtYWtlcihcImFsbFwiKTtcblxudmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmV4cG9ydHMuRXZlbnRFbWl0dGVyID0gXy5FdmVudEVtaXR0ZXI7XG5cbmV4cG9ydHMuUHJvbWlzZSA9IF8uUHJvbWlzZTtcblxuLyoqXG4gKiBDb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBzZXQgb2YgYWN0aW9uc1xuICpcbiAqIEBwYXJhbSBkZWZpbml0aW9ucyB0aGUgZGVmaW5pdGlvbnMgZm9yIHRoZSBhY3Rpb25zIHRvIGJlIGNyZWF0ZWRcbiAqIEByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGFjdGlvbnMgb2YgY29ycmVzcG9uZGluZyBhY3Rpb24gbmFtZXNcbiAqL1xuZXhwb3J0cy5jcmVhdGVBY3Rpb25zID0gZnVuY3Rpb24oZGVmaW5pdGlvbnMpIHtcbiAgICB2YXIgYWN0aW9ucyA9IHt9O1xuICAgIGZvciAodmFyIGsgaW4gZGVmaW5pdGlvbnMpe1xuICAgICAgICBpZiAoZGVmaW5pdGlvbnMuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBkZWZpbml0aW9uc1trXSxcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lID0gXy5pc09iamVjdCh2YWwpID8gayA6IHZhbDtcblxuICAgICAgICAgICAgYWN0aW9uc1thY3Rpb25OYW1lXSA9IGV4cG9ydHMuY3JlYXRlQWN0aW9uKHZhbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFjdGlvbnM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGV2ZW50bWl0dGVyIHRoYXQgUmVmbHV4IHVzZXNcbiAqL1xuZXhwb3J0cy5zZXRFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbihjdHgpIHtcbiAgICB2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbiAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IF8uRXZlbnRFbWl0dGVyID0gY3R4O1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIFByb21pc2UgbGlicmFyeSB0aGF0IFJlZmx1eCB1c2VzXG4gKi9cbmV4cG9ydHMuc2V0UHJvbWlzZSA9IGZ1bmN0aW9uKGN0eCkge1xuICAgIHZhciBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuICAgIGV4cG9ydHMuUHJvbWlzZSA9IF8uUHJvbWlzZSA9IGN0eDtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBQcm9taXNlIGZhY3RvcnkgdGhhdCBjcmVhdGVzIG5ldyBwcm9taXNlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZmFjdG9yeSBoYXMgdGhlIHNpZ25hdHVyZSBgZnVuY3Rpb24ocmVzb2x2ZXIpIHsgcmV0dXJuIFtuZXcgUHJvbWlzZV07IH1gXG4gKi9cbmV4cG9ydHMuc2V0UHJvbWlzZUZhY3RvcnkgPSBmdW5jdGlvbihmYWN0b3J5KSB7XG4gICAgdmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG4gICAgXy5jcmVhdGVQcm9taXNlID0gZmFjdG9yeTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBtZXRob2QgdXNlZCBmb3IgZGVmZXJyaW5nIGFjdGlvbnMgYW5kIHN0b3Jlc1xuICovXG5leHBvcnRzLm5leHRUaWNrID0gZnVuY3Rpb24obmV4dFRpY2spIHtcbiAgICB2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbiAgICBfLm5leHRUaWNrID0gbmV4dFRpY2s7XG59O1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBzZXQgb2YgY3JlYXRlZCBhY3Rpb25zIGFuZCBzdG9yZXMgZm9yIGludHJvc3BlY3Rpb25cbiAqL1xuZXhwb3J0cy5fX2tlZXAgPSByZXF1aXJlKCcuL0tlZXAnKTtcblxuLyoqXG4gKiBXYXJuIGlmIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIG5vdCBhdmFpbGFibGVcbiAqL1xuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICBjb25zb2xlLmVycm9yKFxuICAgICdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBub3QgYXZhaWxhYmxlLiAnICtcbiAgICAnRVM1IHNoaW0gcmVxdWlyZWQuICcgK1xuICAgICdodHRwczovL2dpdGh1Yi5jb20vc3BvaWtlL3JlZmx1eGpzI2VzNSdcbiAgKTtcbn1cbiIsIi8qKlxuICogSW50ZXJuYWwgbW9kdWxlIHVzZWQgdG8gY3JlYXRlIHN0YXRpYyBhbmQgaW5zdGFuY2Ugam9pbiBtZXRob2RzXG4gKi9cblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgIF8gPSByZXF1aXJlKFwiLi91dGlsc1wiKSxcbiAgICBjcmVhdGVTdG9yZSA9IHJlcXVpcmUoXCIuL2NyZWF0ZVN0b3JlXCIpLFxuICAgIHN0cmF0ZWd5TWV0aG9kTmFtZXMgPSB7XG4gICAgICAgIHN0cmljdDogXCJqb2luU3RyaWN0XCIsXG4gICAgICAgIGZpcnN0OiBcImpvaW5MZWFkaW5nXCIsXG4gICAgICAgIGxhc3Q6IFwiam9pblRyYWlsaW5nXCIsXG4gICAgICAgIGFsbDogXCJqb2luQ29uY2F0XCJcbiAgICB9O1xuXG4vKipcbiAqIFVzZWQgaW4gYGluZGV4LmpzYCB0byBjcmVhdGUgdGhlIHN0YXRpYyBqb2luIG1ldGhvZHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJhdGVneSBXaGljaCBzdHJhdGVneSB0byB1c2Ugd2hlbiB0cmFja2luZyBsaXN0ZW5hYmxlIHRyaWdnZXIgYXJndW1lbnRzXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgc3RhdGljIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBzdG9yZSB3aXRoIGEgam9pbiBsaXN0ZW4gb24gdGhlIGdpdmVuIGxpc3RlbmFibGVzIHVzaW5nIHRoZSBnaXZlbiBzdHJhdGVneVxuICovXG5leHBvcnRzLnN0YXRpY0pvaW5DcmVhdG9yID0gZnVuY3Rpb24oc3RyYXRlZ3kpe1xuICAgIHJldHVybiBmdW5jdGlvbigvKiBsaXN0ZW5hYmxlcy4uLiAqLykge1xuICAgICAgICB2YXIgbGlzdGVuYWJsZXMgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiBjcmVhdGVTdG9yZSh7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXNbc3RyYXRlZ3lNZXRob2ROYW1lc1tzdHJhdGVneV1dLmFwcGx5KHRoaXMsbGlzdGVuYWJsZXMuY29uY2F0KFwidHJpZ2dlckFzeW5jXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5cbi8qKlxuICogVXNlZCBpbiBgTGlzdGVuZXJNZXRob2RzLmpzYCB0byBjcmVhdGUgdGhlIGluc3RhbmNlIGpvaW4gbWV0aG9kc1xuICogQHBhcmFtIHtTdHJpbmd9IHN0cmF0ZWd5IFdoaWNoIHN0cmF0ZWd5IHRvIHVzZSB3aGVuIHRyYWNraW5nIGxpc3RlbmFibGUgdHJpZ2dlciBhcmd1bWVudHNcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQW4gaW5zdGFuY2UgbWV0aG9kIHdoaWNoIHNldHMgdXAgYSBqb2luIGxpc3RlbiBvbiB0aGUgZ2l2ZW4gbGlzdGVuYWJsZXMgdXNpbmcgdGhlIGdpdmVuIHN0cmF0ZWd5XG4gKi9cbmV4cG9ydHMuaW5zdGFuY2VKb2luQ3JlYXRvciA9IGZ1bmN0aW9uKHN0cmF0ZWd5KXtcbiAgICByZXR1cm4gZnVuY3Rpb24oLyogbGlzdGVuYWJsZXMuLi4sIGNhbGxiYWNrKi8pe1xuICAgICAgICBfLnRocm93SWYoYXJndW1lbnRzLmxlbmd0aCA8IDMsJ0Nhbm5vdCBjcmVhdGUgYSBqb2luIHdpdGggbGVzcyB0aGFuIDIgbGlzdGVuYWJsZXMhJyk7XG4gICAgICAgIHZhciBsaXN0ZW5hYmxlcyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbGlzdGVuYWJsZXMucG9wKCksXG4gICAgICAgICAgICBudW1iZXJPZkxpc3RlbmFibGVzID0gbGlzdGVuYWJsZXMubGVuZ3RoLFxuICAgICAgICAgICAgam9pbiA9IHtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkxpc3RlbmFibGVzOiBudW1iZXJPZkxpc3RlbmFibGVzLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB0aGlzW2NhbGxiYWNrXXx8Y2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgbGlzdGVuZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgc3RyYXRlZ3k6IHN0cmF0ZWd5XG4gICAgICAgICAgICB9LCBpLCBjYW5jZWxzID0gW10sIHN1Ym9iajtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bWJlck9mTGlzdGVuYWJsZXM7IGkrKykge1xuICAgICAgICAgICAgXy50aHJvd0lmKHRoaXMudmFsaWRhdGVMaXN0ZW5pbmcobGlzdGVuYWJsZXNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtYmVyT2ZMaXN0ZW5hYmxlczsgaSsrKSB7XG4gICAgICAgICAgICBjYW5jZWxzLnB1c2gobGlzdGVuYWJsZXNbaV0ubGlzdGVuKG5ld0xpc3RlbmVyKGksam9pbiksdGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHJlc2V0KGpvaW4pO1xuICAgICAgICBzdWJvYmogPSB7bGlzdGVuYWJsZTogbGlzdGVuYWJsZXN9O1xuICAgICAgICBzdWJvYmouc3RvcCA9IG1ha2VTdG9wcGVyKHN1Ym9iaixjYW5jZWxzLHRoaXMpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSAodGhpcy5zdWJzY3JpcHRpb25zIHx8IFtdKS5jb25jYXQoc3Vib2JqKTtcbiAgICAgICAgcmV0dXJuIHN1Ym9iajtcbiAgICB9O1xufTtcblxuLy8gLS0tLSBpbnRlcm5hbCBqb2luIGZ1bmN0aW9ucyAtLS0tXG5cbmZ1bmN0aW9uIG1ha2VTdG9wcGVyKHN1Ym9iaixjYW5jZWxzLGNvbnRleHQpe1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGksIHN1YnMgPSBjb250ZXh0LnN1YnNjcmlwdGlvbnMsXG4gICAgICAgICAgICBpbmRleCA9IChzdWJzID8gc3Vicy5pbmRleE9mKHN1Ym9iaikgOiAtMSk7XG4gICAgICAgIF8udGhyb3dJZihpbmRleCA9PT0gLTEsJ1RyaWVkIHRvIHJlbW92ZSBqb2luIGFscmVhZHkgZ29uZSBmcm9tIHN1YnNjcmlwdGlvbnMgbGlzdCEnKTtcbiAgICAgICAgZm9yKGk9MDtpIDwgY2FuY2Vscy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBjYW5jZWxzW2ldKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3Vicy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIHJlc2V0KGpvaW4pIHtcbiAgICBqb2luLmxpc3RlbmFibGVzRW1pdHRlZCA9IG5ldyBBcnJheShqb2luLm51bWJlck9mTGlzdGVuYWJsZXMpO1xuICAgIGpvaW4uYXJncyA9IG5ldyBBcnJheShqb2luLm51bWJlck9mTGlzdGVuYWJsZXMpO1xufVxuXG5mdW5jdGlvbiBuZXdMaXN0ZW5lcihpLGpvaW4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjYWxsYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKGpvaW4ubGlzdGVuYWJsZXNFbWl0dGVkW2ldKXtcbiAgICAgICAgICAgIHN3aXRjaChqb2luLnN0cmF0ZWd5KXtcbiAgICAgICAgICAgICAgICBjYXNlIFwic3RyaWN0XCI6IHRocm93IG5ldyBFcnJvcihcIlN0cmljdCBqb2luIGZhaWxlZCBiZWNhdXNlIGxpc3RlbmVyIHRyaWdnZXJlZCB0d2ljZS5cIik7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxhc3RcIjogam9pbi5hcmdzW2ldID0gY2FsbGFyZ3M7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhbGxcIjogam9pbi5hcmdzW2ldLnB1c2goY2FsbGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgam9pbi5saXN0ZW5hYmxlc0VtaXR0ZWRbaV0gPSB0cnVlO1xuICAgICAgICAgICAgam9pbi5hcmdzW2ldID0gKGpvaW4uc3RyYXRlZ3k9PT1cImFsbFwiP1tjYWxsYXJnc106Y2FsbGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVtaXRJZkFsbExpc3RlbmFibGVzRW1pdHRlZChqb2luKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBlbWl0SWZBbGxMaXN0ZW5hYmxlc0VtaXR0ZWQoam9pbikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgam9pbi5udW1iZXJPZkxpc3RlbmFibGVzOyBpKyspIHtcbiAgICAgICAgaWYgKCFqb2luLmxpc3RlbmFibGVzRW1pdHRlZFtpXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGpvaW4uY2FsbGJhY2suYXBwbHkoam9pbi5saXN0ZW5lcixqb2luLmFyZ3MpO1xuICAgIHJlc2V0KGpvaW4pO1xufVxuIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcblxuXG4vKipcbiAqIEEgbWl4aW4gZmFjdG9yeSBmb3IgYSBSZWFjdCBjb21wb25lbnQuIE1lYW50IGFzIGEgbW9yZSBjb252ZW5pZW50IHdheSBvZiB1c2luZyB0aGUgYExpc3RlbmVyTWl4aW5gLFxuICogd2l0aG91dCBoYXZpbmcgdG8gbWFudWFsbHkgc2V0IGxpc3RlbmVycyBpbiB0aGUgYGNvbXBvbmVudERpZE1vdW50YCBtZXRob2QuXG4gKlxuICogQHBhcmFtIHtBY3Rpb258U3RvcmV9IGxpc3RlbmFibGUgQW4gQWN0aW9uIG9yIFN0b3JlIHRoYXQgc2hvdWxkIGJlXG4gKiAgbGlzdGVuZWQgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGV2ZW50IGhhbmRsZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBkZWZhdWx0Q2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGRlZmF1bHQgaGFuZGxlclxuICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHRvIGJlIHVzZWQgYXMgYSBtaXhpbiwgd2hpY2ggc2V0cyB1cCB0aGUgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBsaXN0ZW5hYmxlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3RlbmFibGUsY2FsbGJhY2ssaW5pdGlhbCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB1cCB0aGUgbWl4aW4gYmVmb3JlIHRoZSBpbml0aWFsIHJlbmRlcmluZyBvY2N1cnMuIEltcG9ydCBtZXRob2RzIGZyb20gYExpc3RlbmVyTWV0aG9kc2BcbiAgICAgICAgICogYW5kIHRoZW4gbWFrZSB0aGUgY2FsbCB0byBgbGlzdGVuVG9gIHdpdGggdGhlIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZmFjdG9yeSBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yKHZhciBtIGluIFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzW21dICE9PSBSZWZsdXguTGlzdGVuZXJNZXRob2RzW21dKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbbV0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJDYW4ndCBoYXZlIG90aGVyIHByb3BlcnR5ICdcIittK1wiJyB3aGVuIHVzaW5nIFJlZmx1eC5saXN0ZW5UbyFcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzW21dID0gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kc1ttXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvKGxpc3RlbmFibGUsY2FsbGJhY2ssaW5pdGlhbCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhbnMgdXAgYWxsIGxpc3RlbmVyIHByZXZpb3VzbHkgcmVnaXN0ZXJlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBSZWZsdXguTGlzdGVuZXJNZXRob2RzLnN0b3BMaXN0ZW5pbmdUb0FsbFxuICAgIH07XG59O1xuIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcblxuLyoqXG4gKiBBIG1peGluIGZhY3RvcnkgZm9yIGEgUmVhY3QgY29tcG9uZW50LiBNZWFudCBhcyBhIG1vcmUgY29udmVuaWVudCB3YXkgb2YgdXNpbmcgdGhlIGBsaXN0ZW5lck1peGluYCxcbiAqIHdpdGhvdXQgaGF2aW5nIHRvIG1hbnVhbGx5IHNldCBsaXN0ZW5lcnMgaW4gdGhlIGBjb21wb25lbnREaWRNb3VudGAgbWV0aG9kLiBUaGlzIHZlcnNpb24gaXMgdXNlZFxuICogdG8gYXV0b21hdGljYWxseSBzZXQgdXAgYSBgbGlzdGVuVG9NYW55YCBjYWxsLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5hYmxlcyBBbiBvYmplY3Qgb2YgbGlzdGVuYWJsZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCB0byBiZSB1c2VkIGFzIGEgbWl4aW4sIHdoaWNoIHNldHMgdXAgdGhlIGxpc3RlbmVycyBmb3IgdGhlIGdpdmVuIGxpc3RlbmFibGVzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3RlbmFibGVzKXtcbiAgICByZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHVwIHRoZSBtaXhpbiBiZWZvcmUgdGhlIGluaXRpYWwgcmVuZGVyaW5nIG9jY3Vycy4gSW1wb3J0IG1ldGhvZHMgZnJvbSBgTGlzdGVuZXJNZXRob2RzYFxuICAgICAgICAgKiBhbmQgdGhlbiBtYWtlIHRoZSBjYWxsIHRvIGBsaXN0ZW5Ub2Agd2l0aCB0aGUgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBmYWN0b3J5IGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IodmFyIG0gaW4gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbbV0gIT09IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHNbbV0pe1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1ttXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbid0IGhhdmUgb3RoZXIgcHJvcGVydHkgJ1wiK20rXCInIHdoZW4gdXNpbmcgUmVmbHV4Lmxpc3RlblRvTWFueSFcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzW21dID0gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kc1ttXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvTWFueShsaXN0ZW5hYmxlcyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhbnMgdXAgYWxsIGxpc3RlbmVyIHByZXZpb3VzbHkgcmVnaXN0ZXJlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBSZWZsdXguTGlzdGVuZXJNZXRob2RzLnN0b3BMaXN0ZW5pbmdUb0FsbFxuICAgIH07XG59O1xuIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWl4KGRlZikge1xuICAgIHZhciBjb21wb3NlZCA9IHtcbiAgICAgICAgaW5pdDogW10sXG4gICAgICAgIHByZUVtaXQ6IFtdLFxuICAgICAgICBzaG91bGRFbWl0OiBbXVxuICAgIH07XG5cbiAgICB2YXIgdXBkYXRlZCA9IChmdW5jdGlvbiBtaXhEZWYobWl4aW4pIHtcbiAgICAgICAgdmFyIG1peGVkID0ge307XG4gICAgICAgIGlmIChtaXhpbi5taXhpbnMpIHtcbiAgICAgICAgICAgIG1peGluLm1peGlucy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJNaXhpbikge1xuICAgICAgICAgICAgICAgIF8uZXh0ZW5kKG1peGVkLCBtaXhEZWYoc3ViTWl4aW4pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIF8uZXh0ZW5kKG1peGVkLCBtaXhpbik7XG4gICAgICAgIE9iamVjdC5rZXlzKGNvbXBvc2VkKS5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb3NhYmxlKSB7XG4gICAgICAgICAgICBpZiAobWl4aW4uaGFzT3duUHJvcGVydHkoY29tcG9zYWJsZSkpIHtcbiAgICAgICAgICAgICAgICBjb21wb3NlZFtjb21wb3NhYmxlXS5wdXNoKG1peGluW2NvbXBvc2FibGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtaXhlZDtcbiAgICB9KGRlZikpO1xuXG4gICAgaWYgKGNvbXBvc2VkLmluaXQubGVuZ3RoID4gMSkge1xuICAgICAgICB1cGRhdGVkLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIGNvbXBvc2VkLmluaXQuZm9yRWFjaChmdW5jdGlvbiAoaW5pdCkge1xuICAgICAgICAgICAgICAgIGluaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKGNvbXBvc2VkLnByZUVtaXQubGVuZ3RoID4gMSkge1xuICAgICAgICB1cGRhdGVkLnByZUVtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcG9zZWQucHJlRW1pdC5yZWR1Y2UoZnVuY3Rpb24gKGFyZ3MsIHByZUVtaXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBwcmVFbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkID8gYXJncyA6IFtuZXdWYWx1ZV07XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChjb21wb3NlZC5zaG91bGRFbWl0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdXBkYXRlZC5zaG91bGRFbWl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICByZXR1cm4gIWNvbXBvc2VkLnNob3VsZEVtaXQuc29tZShmdW5jdGlvbiAoc2hvdWxkRW1pdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhc2hvdWxkRW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBPYmplY3Qua2V5cyhjb21wb3NlZCkuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9zYWJsZSkge1xuICAgICAgICBpZiAoY29tcG9zZWRbY29tcG9zYWJsZV0ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB1cGRhdGVkW2NvbXBvc2FibGVdID0gY29tcG9zZWRbY29tcG9zYWJsZV1bMF07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB1cGRhdGVkO1xufTtcbiIsIi8qXG4gKiBpc09iamVjdCwgZXh0ZW5kLCBpc0Z1bmN0aW9uLCBpc0FyZ3VtZW50cyBhcmUgdGFrZW4gZnJvbSB1bmRlc2NvcmUvbG9kYXNoIGluXG4gKiBvcmRlciB0byByZW1vdmUgdGhlIGRlcGVuZGVuY3lcbiAqL1xudmFyIGlzT2JqZWN0ID0gZXhwb3J0cy5pc09iamVjdCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciB0eXBlID0gdHlwZW9mIG9iajtcbiAgICByZXR1cm4gdHlwZSA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlID09PSAnb2JqZWN0JyAmJiAhIW9iajtcbn07XG5cbmV4cG9ydHMuZXh0ZW5kID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgaWYgKCFpc09iamVjdChvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuICAgIHZhciBzb3VyY2UsIHByb3A7XG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgICAgIGZvciAocHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwgcHJvcCk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwgcHJvcGVydHlEZXNjcmlwdG9yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW3Byb3BdID0gc291cmNlW3Byb3BdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG59O1xuXG5leHBvcnRzLmlzRnVuY3Rpb24gPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbic7XG59O1xuXG5leHBvcnRzLkV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50ZW1pdHRlcjMnKTtcblxuZXhwb3J0cy5uZXh0VGljayA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG59O1xuXG5leHBvcnRzLmNhcGl0YWxpemUgPSBmdW5jdGlvbihzdHJpbmcpe1xuICAgIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkrc3RyaW5nLnNsaWNlKDEpO1xufTtcblxuZXhwb3J0cy5jYWxsYmFja05hbWUgPSBmdW5jdGlvbihzdHJpbmcpe1xuICAgIHJldHVybiBcIm9uXCIrZXhwb3J0cy5jYXBpdGFsaXplKHN0cmluZyk7XG59O1xuXG5leHBvcnRzLm9iamVjdCA9IGZ1bmN0aW9uKGtleXMsdmFscyl7XG4gICAgdmFyIG89e30sIGk9MDtcbiAgICBmb3IoO2k8a2V5cy5sZW5ndGg7aSsrKXtcbiAgICAgICAgb1trZXlzW2ldXSA9IHZhbHNbaV07XG4gICAgfVxuICAgIHJldHVybiBvO1xufTtcblxuZXhwb3J0cy5Qcm9taXNlID0gcmVxdWlyZShcIm5hdGl2ZS1wcm9taXNlLW9ubHlcIik7XG5cbmV4cG9ydHMuY3JlYXRlUHJvbWlzZSA9IGZ1bmN0aW9uKHJlc29sdmVyKSB7XG4gICAgcmV0dXJuIG5ldyBleHBvcnRzLlByb21pc2UocmVzb2x2ZXIpO1xufTtcblxuZXhwb3J0cy5pc0FyZ3VtZW50cyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgKCdjYWxsZWUnIGluIHZhbHVlKSAmJiB0eXBlb2YgdmFsdWUubGVuZ3RoID09PSAnbnVtYmVyJztcbn07XG5cbmV4cG9ydHMudGhyb3dJZiA9IGZ1bmN0aW9uKHZhbCxtc2cpe1xuICAgIGlmICh2YWwpe1xuICAgICAgICB0aHJvdyBFcnJvcihtc2d8fHZhbCk7XG4gICAgfVxufTtcbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgRW1pdHRlciA9IHJlcXVpcmUoJ2VtaXR0ZXInKTtcbnZhciByZWR1Y2UgPSByZXF1aXJlKCdyZWR1Y2UnKTtcblxuLyoqXG4gKiBSb290IHJlZmVyZW5jZSBmb3IgaWZyYW1lcy5cbiAqL1xuXG52YXIgcm9vdCA9ICd1bmRlZmluZWQnID09IHR5cGVvZiB3aW5kb3dcbiAgPyB0aGlzXG4gIDogd2luZG93O1xuXG4vKipcbiAqIE5vb3AuXG4gKi9cblxuZnVuY3Rpb24gbm9vcCgpe307XG5cbi8qKlxuICogQ2hlY2sgaWYgYG9iamAgaXMgYSBob3N0IG9iamVjdCxcbiAqIHdlIGRvbid0IHdhbnQgdG8gc2VyaWFsaXplIHRoZXNlIDopXG4gKlxuICogVE9ETzogZnV0dXJlIHByb29mLCBtb3ZlIHRvIGNvbXBvZW50IGxhbmRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNIb3N0KG9iaikge1xuICB2YXIgc3RyID0ge30udG9TdHJpbmcuY2FsbChvYmopO1xuXG4gIHN3aXRjaCAoc3RyKSB7XG4gICAgY2FzZSAnW29iamVjdCBGaWxlXSc6XG4gICAgY2FzZSAnW29iamVjdCBCbG9iXSc6XG4gICAgY2FzZSAnW29iamVjdCBGb3JtRGF0YV0nOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG4vKipcbiAqIERldGVybWluZSBYSFIuXG4gKi9cblxucmVxdWVzdC5nZXRYSFIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChyb290LlhNTEh0dHBSZXF1ZXN0XG4gICAgJiYgKCdmaWxlOicgIT0gcm9vdC5sb2NhdGlvbi5wcm90b2NvbCB8fCAhcm9vdC5BY3RpdmVYT2JqZWN0KSkge1xuICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC42LjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuMy4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgYWRkZWQgdG8gc3VwcG9ydCBJRS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxudmFyIHRyaW0gPSAnJy50cmltXG4gID8gZnVuY3Rpb24ocykgeyByZXR1cm4gcy50cmltKCk7IH1cbiAgOiBmdW5jdGlvbihzKSB7IHJldHVybiBzLnJlcGxhY2UoLyheXFxzKnxcXHMqJCkvZywgJycpOyB9O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHJldHVybiBvYmogPT09IE9iamVjdChvYmopO1xufVxuXG4vKipcbiAqIFNlcmlhbGl6ZSB0aGUgZ2l2ZW4gYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaikge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gIHZhciBwYWlycyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKG51bGwgIT0gb2JqW2tleV0pIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSlcbiAgICAgICAgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcbn1cblxuLyoqXG4gKiBFeHBvc2Ugc2VyaWFsaXphdGlvbiBtZXRob2QuXG4gKi9cblxuIHJlcXVlc3Quc2VyaWFsaXplT2JqZWN0ID0gc2VyaWFsaXplO1xuXG4gLyoqXG4gICogUGFyc2UgdGhlIGdpdmVuIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBgc3RyYC5cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICogQGFwaSBwcml2YXRlXG4gICovXG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKHN0cikge1xuICB2YXIgb2JqID0ge307XG4gIHZhciBwYWlycyA9IHN0ci5zcGxpdCgnJicpO1xuICB2YXIgcGFydHM7XG4gIHZhciBwYWlyO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYWlycy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHBhaXIgPSBwYWlyc1tpXTtcbiAgICBwYXJ0cyA9IHBhaXIuc3BsaXQoJz0nKTtcbiAgICBvYmpbZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFydHNbMV0pO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBFeHBvc2UgcGFyc2VyLlxuICovXG5cbnJlcXVlc3QucGFyc2VTdHJpbmcgPSBwYXJzZVN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IE1JTUUgdHlwZSBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICovXG5cbnJlcXVlc3QudHlwZXMgPSB7XG4gIGh0bWw6ICd0ZXh0L2h0bWwnLFxuICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG4gIHhtbDogJ2FwcGxpY2F0aW9uL3htbCcsXG4gIHVybGVuY29kZWQ6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxuICAnZm9ybS1kYXRhJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbi8qKlxuICogRGVmYXVsdCBzZXJpYWxpemF0aW9uIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL3htbCddID0gZnVuY3Rpb24ob2JqKXtcbiAqICAgICAgIHJldHVybiAnZ2VuZXJhdGVkIHhtbCBoZXJlJztcbiAqICAgICB9O1xuICpcbiAqL1xuXG4gcmVxdWVzdC5zZXJpYWxpemUgPSB7XG4gICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogc2VyaWFsaXplLFxuICAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnN0cmluZ2lmeVxuIH07XG5cbiAvKipcbiAgKiBEZWZhdWx0IHBhcnNlcnMuXG4gICpcbiAgKiAgICAgc3VwZXJhZ2VudC5wYXJzZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihzdHIpe1xuICAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAgKiAgICAgfTtcbiAgKlxuICAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZVxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cikge1xuICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoL1xccj9cXG4vKTtcbiAgdmFyIGZpZWxkcyA9IHt9O1xuICB2YXIgaW5kZXg7XG4gIHZhciBsaW5lO1xuICB2YXIgZmllbGQ7XG4gIHZhciB2YWw7XG5cbiAgbGluZXMucG9wKCk7IC8vIHRyYWlsaW5nIENSTEZcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gbGluZXMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgaW5kZXggPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBmaWVsZCA9IGxpbmUuc2xpY2UoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdHJpbShsaW5lLnNsaWNlKGluZGV4ICsgMSkpO1xuICAgIGZpZWxkc1tmaWVsZF0gPSB2YWw7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgbWltZSB0eXBlIGZvciB0aGUgZ2l2ZW4gYHN0cmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gdHlwZShzdHIpe1xuICByZXR1cm4gc3RyLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCk7XG59O1xuXG4vKipcbiAqIFJldHVybiBoZWFkZXIgZmllbGQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJhbXMoc3RyKXtcbiAgcmV0dXJuIHJlZHVjZShzdHIuc3BsaXQoLyAqOyAqLyksIGZ1bmN0aW9uKG9iaiwgc3RyKXtcbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyAqPSAqLylcbiAgICAgICwga2V5ID0gcGFydHMuc2hpZnQoKVxuICAgICAgLCB2YWwgPSBwYXJ0cy5zaGlmdCgpO1xuXG4gICAgaWYgKGtleSAmJiB2YWwpIG9ialtrZXldID0gdmFsO1xuICAgIHJldHVybiBvYmo7XG4gIH0sIHt9KTtcbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VgIHdpdGggdGhlIGdpdmVuIGB4aHJgLlxuICpcbiAqICAtIHNldCBmbGFncyAoLm9rLCAuZXJyb3IsIGV0YylcbiAqICAtIHBhcnNlIGhlYWRlclxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICBBbGlhc2luZyBgc3VwZXJhZ2VudGAgYXMgYHJlcXVlc3RgIGlzIG5pY2U6XG4gKlxuICogICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudDtcbiAqXG4gKiAgV2UgY2FuIHVzZSB0aGUgcHJvbWlzZS1saWtlIEFQSSwgb3IgcGFzcyBjYWxsYmFja3M6XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnLycpLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICogICAgICByZXF1ZXN0LmdldCgnLycsIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIFNlbmRpbmcgZGF0YSBjYW4gYmUgY2hhaW5lZDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAuc2VuZCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5wb3N0KClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBPciBmdXJ0aGVyIHJlZHVjZWQgdG8gYSBzaW5nbGUgY2FsbCBmb3Igc2ltcGxlIGNhc2VzOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIEBwYXJhbSB7WE1MSFRUUFJlcXVlc3R9IHhoclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlKHJlcSwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgdGhpcy5yZXEgPSByZXE7XG4gIHRoaXMueGhyID0gdGhpcy5yZXEueGhyO1xuICAvLyByZXNwb25zZVRleHQgaXMgYWNjZXNzaWJsZSBvbmx5IGlmIHJlc3BvbnNlVHlwZSBpcyAnJyBvciAndGV4dCcgYW5kIG9uIG9sZGVyIGJyb3dzZXJzXG4gIHRoaXMudGV4dCA9ICgodGhpcy5yZXEubWV0aG9kICE9J0hFQUQnICYmICh0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICcnIHx8IHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnKSkgfHwgdHlwZW9mIHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgID8gdGhpcy54aHIucmVzcG9uc2VUZXh0XG4gICAgIDogbnVsbDtcbiAgdGhpcy5zdGF0dXNUZXh0ID0gdGhpcy5yZXEueGhyLnN0YXR1c1RleHQ7XG4gIHRoaXMuc2V0U3RhdHVzUHJvcGVydGllcyh0aGlzLnhoci5zdGF0dXMpO1xuICB0aGlzLmhlYWRlciA9IHRoaXMuaGVhZGVycyA9IHBhcnNlSGVhZGVyKHRoaXMueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKTtcbiAgLy8gZ2V0QWxsUmVzcG9uc2VIZWFkZXJzIHNvbWV0aW1lcyBmYWxzZWx5IHJldHVybnMgXCJcIiBmb3IgQ09SUyByZXF1ZXN0cywgYnV0XG4gIC8vIGdldFJlc3BvbnNlSGVhZGVyIHN0aWxsIHdvcmtzLiBzbyB3ZSBnZXQgY29udGVudC10eXBlIGV2ZW4gaWYgZ2V0dGluZ1xuICAvLyBvdGhlciBoZWFkZXJzIGZhaWxzLlxuICB0aGlzLmhlYWRlclsnY29udGVudC10eXBlJ10gPSB0aGlzLnhoci5nZXRSZXNwb25zZUhlYWRlcignY29udGVudC10eXBlJyk7XG4gIHRoaXMuc2V0SGVhZGVyUHJvcGVydGllcyh0aGlzLmhlYWRlcik7XG4gIHRoaXMuYm9keSA9IHRoaXMucmVxLm1ldGhvZCAhPSAnSEVBRCdcbiAgICA/IHRoaXMucGFyc2VCb2R5KHRoaXMudGV4dCA/IHRoaXMudGV4dCA6IHRoaXMueGhyLnJlc3BvbnNlKVxuICAgIDogbnVsbDtcbn1cblxuLyoqXG4gKiBHZXQgY2FzZS1pbnNlbnNpdGl2ZSBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICByZXR1cm4gdGhpcy5oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgcmVsYXRlZCBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBgLnR5cGVgIHRoZSBjb250ZW50IHR5cGUgd2l0aG91dCBwYXJhbXNcbiAqXG4gKiBBIHJlc3BvbnNlIG9mIFwiQ29udGVudC1UeXBlOiB0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04XCJcbiAqIHdpbGwgcHJvdmlkZSB5b3Ugd2l0aCBhIGAudHlwZWAgb2YgXCJ0ZXh0L3BsYWluXCIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnNldEhlYWRlclByb3BlcnRpZXMgPSBmdW5jdGlvbihoZWFkZXIpe1xuICAvLyBjb250ZW50LXR5cGVcbiAgdmFyIGN0ID0gdGhpcy5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICB0aGlzLnR5cGUgPSB0eXBlKGN0KTtcblxuICAvLyBwYXJhbXNcbiAgdmFyIG9iaiA9IHBhcmFtcyhjdCk7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHRoaXNba2V5XSA9IG9ialtrZXldO1xufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gYm9keSBgc3RyYC5cbiAqXG4gKiBVc2VkIGZvciBhdXRvLXBhcnNpbmcgb2YgYm9kaWVzLiBQYXJzZXJzXG4gKiBhcmUgZGVmaW5lZCBvbiB0aGUgYHN1cGVyYWdlbnQucGFyc2VgIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtNaXhlZH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlLnByb3RvdHlwZS5wYXJzZUJvZHkgPSBmdW5jdGlvbihzdHIpe1xuICB2YXIgcGFyc2UgPSByZXF1ZXN0LnBhcnNlW3RoaXMudHlwZV07XG4gIHJldHVybiBwYXJzZSAmJiBzdHIgJiYgKHN0ci5sZW5ndGggfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgID8gcGFyc2Uoc3RyKVxuICAgIDogbnVsbDtcbn07XG5cbi8qKlxuICogU2V0IGZsYWdzIHN1Y2ggYXMgYC5va2AgYmFzZWQgb24gYHN0YXR1c2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYSAyeHggcmVzcG9uc2Ugd2lsbCBnaXZlIHlvdSBhIGAub2tgIG9mIF9fdHJ1ZV9fXG4gKiB3aGVyZWFzIDV4eCB3aWxsIGJlIF9fZmFsc2VfXyBhbmQgYC5lcnJvcmAgd2lsbCBiZSBfX3RydWVfXy4gVGhlXG4gKiBgLmNsaWVudEVycm9yYCBhbmQgYC5zZXJ2ZXJFcnJvcmAgYXJlIGFsc28gYXZhaWxhYmxlIHRvIGJlIG1vcmVcbiAqIHNwZWNpZmljLCBhbmQgYC5zdGF0dXNUeXBlYCBpcyB0aGUgY2xhc3Mgb2YgZXJyb3IgcmFuZ2luZyBmcm9tIDEuLjVcbiAqIHNvbWV0aW1lcyB1c2VmdWwgZm9yIG1hcHBpbmcgcmVzcG9uZCBjb2xvcnMgZXRjLlxuICpcbiAqIFwic3VnYXJcIiBwcm9wZXJ0aWVzIGFyZSBhbHNvIGRlZmluZWQgZm9yIGNvbW1vbiBjYXNlcy4gQ3VycmVudGx5IHByb3ZpZGluZzpcbiAqXG4gKiAgIC0gLm5vQ29udGVudFxuICogICAtIC5iYWRSZXF1ZXN0XG4gKiAgIC0gLnVuYXV0aG9yaXplZFxuICogICAtIC5ub3RBY2NlcHRhYmxlXG4gKiAgIC0gLm5vdEZvdW5kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnNldFN0YXR1c1Byb3BlcnRpZXMgPSBmdW5jdGlvbihzdGF0dXMpe1xuICB2YXIgdHlwZSA9IHN0YXR1cyAvIDEwMCB8IDA7XG5cbiAgLy8gc3RhdHVzIC8gY2xhc3NcbiAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XG4gIHRoaXMuc3RhdHVzVHlwZSA9IHR5cGU7XG5cbiAgLy8gYmFzaWNzXG4gIHRoaXMuaW5mbyA9IDEgPT0gdHlwZTtcbiAgdGhpcy5vayA9IDIgPT0gdHlwZTtcbiAgdGhpcy5jbGllbnRFcnJvciA9IDQgPT0gdHlwZTtcbiAgdGhpcy5zZXJ2ZXJFcnJvciA9IDUgPT0gdHlwZTtcbiAgdGhpcy5lcnJvciA9ICg0ID09IHR5cGUgfHwgNSA9PSB0eXBlKVxuICAgID8gdGhpcy50b0Vycm9yKClcbiAgICA6IGZhbHNlO1xuXG4gIC8vIHN1Z2FyXG4gIHRoaXMuYWNjZXB0ZWQgPSAyMDIgPT0gc3RhdHVzO1xuICB0aGlzLm5vQ29udGVudCA9IDIwNCA9PSBzdGF0dXMgfHwgMTIyMyA9PSBzdGF0dXM7XG4gIHRoaXMuYmFkUmVxdWVzdCA9IDQwMCA9PSBzdGF0dXM7XG4gIHRoaXMudW5hdXRob3JpemVkID0gNDAxID09IHN0YXR1cztcbiAgdGhpcy5ub3RBY2NlcHRhYmxlID0gNDA2ID09IHN0YXR1cztcbiAgdGhpcy5ub3RGb3VuZCA9IDQwNCA9PSBzdGF0dXM7XG4gIHRoaXMuZm9yYmlkZGVuID0gNDAzID09IHN0YXR1cztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGBFcnJvcmAgcmVwcmVzZW50YXRpdmUgb2YgdGhpcyByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJuIHtFcnJvcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnRvRXJyb3IgPSBmdW5jdGlvbigpe1xuICB2YXIgcmVxID0gdGhpcy5yZXE7XG4gIHZhciBtZXRob2QgPSByZXEubWV0aG9kO1xuICB2YXIgdXJsID0gcmVxLnVybDtcblxuICB2YXIgbXNnID0gJ2Nhbm5vdCAnICsgbWV0aG9kICsgJyAnICsgdXJsICsgJyAoJyArIHRoaXMuc3RhdHVzICsgJyknO1xuICB2YXIgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IG1ldGhvZDtcbiAgZXJyLnVybCA9IHVybDtcblxuICByZXR1cm4gZXJyO1xufTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlc3BvbnNlYC5cbiAqL1xuXG5yZXF1ZXN0LlJlc3BvbnNlID0gUmVzcG9uc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdGAgd2l0aCB0aGUgZ2l2ZW4gYG1ldGhvZGAgYW5kIGB1cmxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdChtZXRob2QsIHVybCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIEVtaXR0ZXIuY2FsbCh0aGlzKTtcbiAgdGhpcy5fcXVlcnkgPSB0aGlzLl9xdWVyeSB8fCBbXTtcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmhlYWRlciA9IHt9O1xuICB0aGlzLl9oZWFkZXIgPSB7fTtcbiAgdGhpcy5vbignZW5kJywgZnVuY3Rpb24oKXtcbiAgICB2YXIgZXJyID0gbnVsbDtcbiAgICB2YXIgcmVzID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICByZXMgPSBuZXcgUmVzcG9uc2Uoc2VsZik7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoJ1BhcnNlciBpcyB1bmFibGUgdG8gcGFyc2UgdGhlIHJlc3BvbnNlJyk7XG4gICAgICBlcnIucGFyc2UgPSB0cnVlO1xuICAgICAgZXJyLm9yaWdpbmFsID0gZTtcbiAgICAgIHJldHVybiBzZWxmLmNhbGxiYWNrKGVycik7XG4gICAgfVxuXG4gICAgc2VsZi5lbWl0KCdyZXNwb25zZScsIHJlcyk7XG5cbiAgICBpZiAoZXJyKSB7XG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIsIHJlcyk7XG4gICAgfVxuXG4gICAgaWYgKHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgIHJldHVybiBzZWxmLmNhbGxiYWNrKGVyciwgcmVzKTtcbiAgICB9XG5cbiAgICB2YXIgbmV3X2VyciA9IG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dCB8fCAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnKTtcbiAgICBuZXdfZXJyLm9yaWdpbmFsID0gZXJyO1xuICAgIG5ld19lcnIucmVzcG9uc2UgPSByZXM7XG4gICAgbmV3X2Vyci5zdGF0dXMgPSByZXMuc3RhdHVzO1xuXG4gICAgc2VsZi5jYWxsYmFjayhlcnIgfHwgbmV3X2VyciwgcmVzKTtcbiAgfSk7XG59XG5cbi8qKlxuICogTWl4aW4gYEVtaXR0ZXJgLlxuICovXG5cbkVtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEFsbG93IGZvciBleHRlbnNpb25cbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbihmbikge1xuICBmbih0aGlzKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogU2V0IHRpbWVvdXQgdG8gYG1zYC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gbXNcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24obXMpe1xuICB0aGlzLl90aW1lb3V0ID0gbXM7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDbGVhciBwcmV2aW91cyB0aW1lb3V0LlxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbigpe1xuICB0aGlzLl90aW1lb3V0ID0gMDtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFib3J0IHRoZSByZXF1ZXN0LCBhbmQgY2xlYXIgcG90ZW50aWFsIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5hYm9ydGVkKSByZXR1cm47XG4gIHRoaXMuYWJvcnRlZCA9IHRydWU7XG4gIHRoaXMueGhyLmFib3J0KCk7XG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIHRoaXMuZW1pdCgnYWJvcnQnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgYGZpZWxkYCB0byBgdmFsYCwgb3IgbXVsdGlwbGUgZmllbGRzIHdpdGggb25lIG9iamVjdC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtQVBJLUtleSc6ICdmb29iYXInIH0pXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGZpZWxkLCB2YWwpe1xuICBpZiAoaXNPYmplY3QoZmllbGQpKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGZpZWxkKSB7XG4gICAgICB0aGlzLnNldChrZXksIGZpZWxkW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV0gPSB2YWw7XG4gIHRoaXMuaGVhZGVyW2ZpZWxkXSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBoZWFkZXIgYGZpZWxkYC5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnVuc2V0KCdVc2VyLUFnZW50JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgZGVsZXRlIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbiAgZGVsZXRlIHRoaXMuaGVhZGVyW2ZpZWxkXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZ2V0SGVhZGVyID0gZnVuY3Rpb24oZmllbGQpe1xuICByZXR1cm4gdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBTZXQgQ29udGVudC1UeXBlIHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLnhtbCA9ICdhcHBsaWNhdGlvbi94bWwnO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgneG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCdhcHBsaWNhdGlvbi94bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLnR5cGUgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0NvbnRlbnQtVHlwZScsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQWNjZXB0IHRvIGB0eXBlYCwgbWFwcGluZyB2YWx1ZXMgZnJvbSBgcmVxdWVzdC50eXBlc2AuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICBzdXBlcmFnZW50LnR5cGVzLmpzb24gPSAnYXBwbGljYXRpb24vanNvbic7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdqc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhY2NlcHRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hY2NlcHQgPSBmdW5jdGlvbih0eXBlKXtcbiAgdGhpcy5zZXQoJ0FjY2VwdCcsIHJlcXVlc3QudHlwZXNbdHlwZV0gfHwgdHlwZSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgQXV0aG9yaXphdGlvbiBmaWVsZCB2YWx1ZSB3aXRoIGB1c2VyYCBhbmQgYHBhc3NgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFzc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF1dGggPSBmdW5jdGlvbih1c2VyLCBwYXNzKXtcbiAgdmFyIHN0ciA9IGJ0b2EodXNlciArICc6JyArIHBhc3MpO1xuICB0aGlzLnNldCgnQXV0aG9yaXphdGlvbicsICdCYXNpYyAnICsgc3RyKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiogQWRkIHF1ZXJ5LXN0cmluZyBgdmFsYC5cbipcbiogRXhhbXBsZXM6XG4qXG4qICAgcmVxdWVzdC5nZXQoJy9zaG9lcycpXG4qICAgICAucXVlcnkoJ3NpemU9MTAnKVxuKiAgICAgLnF1ZXJ5KHsgY29sb3I6ICdibHVlJyB9KVxuKlxuKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IHZhbFxuKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiogQGFwaSBwdWJsaWNcbiovXG5cblJlcXVlc3QucHJvdG90eXBlLnF1ZXJ5ID0gZnVuY3Rpb24odmFsKXtcbiAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHZhbCA9IHNlcmlhbGl6ZSh2YWwpO1xuICBpZiAodmFsKSB0aGlzLl9xdWVyeS5wdXNoKHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBXcml0ZSB0aGUgZmllbGQgYG5hbWVgIGFuZCBgdmFsYCBmb3IgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCJcbiAqIHJlcXVlc3QgYm9kaWVzLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmZpZWxkKCdmb28nLCAnYmFyJylcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd8QmxvYnxGaWxlfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5maWVsZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbCl7XG4gIGlmICghdGhpcy5fZm9ybURhdGEpIHRoaXMuX2Zvcm1EYXRhID0gbmV3IHJvb3QuRm9ybURhdGEoKTtcbiAgdGhpcy5fZm9ybURhdGEuYXBwZW5kKG5hbWUsIHZhbCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBRdWV1ZSB0aGUgZ2l2ZW4gYGZpbGVgIGFzIGFuIGF0dGFjaG1lbnQgdG8gdGhlIHNwZWNpZmllZCBgZmllbGRgLFxuICogd2l0aCBvcHRpb25hbCBgZmlsZW5hbWVgLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmF0dGFjaChuZXcgQmxvYihbJzxhIGlkPVwiYVwiPjxiIGlkPVwiYlwiPmhleSE8L2I+PC9hPiddLCB7IHR5cGU6IFwidGV4dC9odG1sXCJ9KSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEBwYXJhbSB7QmxvYnxGaWxlfSBmaWxlXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsZW5hbWVcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbihmaWVsZCwgZmlsZSwgZmlsZW5hbWUpe1xuICBpZiAoIXRoaXMuX2Zvcm1EYXRhKSB0aGlzLl9mb3JtRGF0YSA9IG5ldyByb290LkZvcm1EYXRhKCk7XG4gIHRoaXMuX2Zvcm1EYXRhLmFwcGVuZChmaWVsZCwgZmlsZSwgZmlsZW5hbWUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2VuZCBgZGF0YWAsIGRlZmF1bHRpbmcgdGhlIGAudHlwZSgpYCB0byBcImpzb25cIiB3aGVuXG4gKiBhbiBvYmplY3QgaXMgZ2l2ZW4uXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gcXVlcnlzdHJpbmdcbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvc2VhcmNoJylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBtdWx0aXBsZSBkYXRhIFwid3JpdGVzXCJcbiAqICAgICAgIHJlcXVlc3QuZ2V0KCcvc2VhcmNoJylcbiAqICAgICAgICAgLnNlbmQoeyBzZWFyY2g6ICdxdWVyeScgfSlcbiAqICAgICAgICAgLnNlbmQoeyByYW5nZTogJzEuLjUnIH0pXG4gKiAgICAgICAgIC5zZW5kKHsgb3JkZXI6ICdkZXNjJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG1hbnVhbCBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2pzb24nKVxuICogICAgICAgICAuc2VuZCgne1wibmFtZVwiOlwidGpcIn0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoJ25hbWU9dGonKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0cyB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAgKiAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICAqICAgICAgICAuc2VuZCgnbmFtZT10b2JpJylcbiAgKiAgICAgICAgLnNlbmQoJ3NwZWNpZXM9ZmVycmV0JylcbiAgKiAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSl7XG4gIHZhciBvYmogPSBpc09iamVjdChkYXRhKTtcbiAgdmFyIHR5cGUgPSB0aGlzLmdldEhlYWRlcignQ29udGVudC1UeXBlJyk7XG5cbiAgLy8gbWVyZ2VcbiAgaWYgKG9iaiAmJiBpc09iamVjdCh0aGlzLl9kYXRhKSkge1xuICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICB0aGlzLl9kYXRhW2tleV0gPSBkYXRhW2tleV07XG4gICAgfVxuICB9IGVsc2UgaWYgKCdzdHJpbmcnID09IHR5cGVvZiBkYXRhKSB7XG4gICAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2Zvcm0nKTtcbiAgICB0eXBlID0gdGhpcy5nZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICgnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyA9PSB0eXBlKSB7XG4gICAgICB0aGlzLl9kYXRhID0gdGhpcy5fZGF0YVxuICAgICAgICA/IHRoaXMuX2RhdGEgKyAnJicgKyBkYXRhXG4gICAgICAgIDogZGF0YTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0YSA9ICh0aGlzLl9kYXRhIHx8ICcnKSArIGRhdGE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICB9XG5cbiAgaWYgKCFvYmogfHwgaXNIb3N0KGRhdGEpKSByZXR1cm4gdGhpcztcbiAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2pzb24nKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludm9rZSB0aGUgY2FsbGJhY2sgd2l0aCBgZXJyYCBhbmQgYHJlc2BcbiAqIGFuZCBoYW5kbGUgYXJpdHkgY2hlY2suXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNhbGxiYWNrID0gZnVuY3Rpb24oZXJyLCByZXMpe1xuICB2YXIgZm4gPSB0aGlzLl9jYWxsYmFjaztcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcbiAgZm4oZXJyLCByZXMpO1xufTtcblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB4LWRvbWFpbiBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jcm9zc0RvbWFpbkVycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIGVyciA9IG5ldyBFcnJvcignT3JpZ2luIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbicpO1xuICBlcnIuY3Jvc3NEb21haW4gPSB0cnVlO1xuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHRpbWVvdXQgZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudGltZW91dEVycm9yID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICB2YXIgZXJyID0gbmV3IEVycm9yKCd0aW1lb3V0IG9mICcgKyB0aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJyk7XG4gIGVyci50aW1lb3V0ID0gdGltZW91dDtcbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdHJhbnNtaXNzaW9uIG9mIGNvb2tpZXMgd2l0aCB4LWRvbWFpbiByZXF1ZXN0cy5cbiAqXG4gKiBOb3RlIHRoYXQgZm9yIHRoaXMgdG8gd29yayB0aGUgb3JpZ2luIG11c3Qgbm90IGJlXG4gKiB1c2luZyBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiIHdpdGggYSB3aWxkY2FyZCxcbiAqIGFuZCBhbHNvIG11c3Qgc2V0IFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIlxuICogdG8gXCJ0cnVlXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS53aXRoQ3JlZGVudGlhbHMgPSBmdW5jdGlvbigpe1xuICB0aGlzLl93aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogSW5pdGlhdGUgcmVxdWVzdCwgaW52b2tpbmcgY2FsbGJhY2sgYGZuKHJlcylgXG4gKiB3aXRoIGFuIGluc3RhbmNlb2YgYFJlc3BvbnNlYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmVuZCA9IGZ1bmN0aW9uKGZuKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgeGhyID0gdGhpcy54aHIgPSByZXF1ZXN0LmdldFhIUigpO1xuICB2YXIgcXVlcnkgPSB0aGlzLl9xdWVyeS5qb2luKCcmJyk7XG4gIHZhciB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgdmFyIGRhdGEgPSB0aGlzLl9mb3JtRGF0YSB8fCB0aGlzLl9kYXRhO1xuXG4gIC8vIHN0b3JlIGNhbGxiYWNrXG4gIHRoaXMuX2NhbGxiYWNrID0gZm4gfHwgbm9vcDtcblxuICAvLyBzdGF0ZSBjaGFuZ2VcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XG4gICAgaWYgKDQgIT0geGhyLnJlYWR5U3RhdGUpIHJldHVybjtcblxuICAgIC8vIEluIElFOSwgcmVhZHMgdG8gYW55IHByb3BlcnR5IChlLmcuIHN0YXR1cykgb2ZmIG9mIGFuIGFib3J0ZWQgWEhSIHdpbGxcbiAgICAvLyByZXN1bHQgaW4gdGhlIGVycm9yIFwiQ291bGQgbm90IGNvbXBsZXRlIHRoZSBvcGVyYXRpb24gZHVlIHRvIGVycm9yIGMwMGMwMjNmXCJcbiAgICB2YXIgc3RhdHVzO1xuICAgIHRyeSB7IHN0YXR1cyA9IHhoci5zdGF0dXMgfSBjYXRjaChlKSB7IHN0YXR1cyA9IDA7IH1cblxuICAgIGlmICgwID09IHN0YXR1cykge1xuICAgICAgaWYgKHNlbGYudGltZWRvdXQpIHJldHVybiBzZWxmLnRpbWVvdXRFcnJvcigpO1xuICAgICAgaWYgKHNlbGYuYWJvcnRlZCkgcmV0dXJuO1xuICAgICAgcmV0dXJuIHNlbGYuY3Jvc3NEb21haW5FcnJvcigpO1xuICAgIH1cbiAgICBzZWxmLmVtaXQoJ2VuZCcpO1xuICB9O1xuXG4gIC8vIHByb2dyZXNzXG4gIHRyeSB7XG4gICAgaWYgKHhoci51cGxvYWQgJiYgdGhpcy5oYXNMaXN0ZW5lcnMoJ3Byb2dyZXNzJykpIHtcbiAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnBlcmNlbnQgPSBlLmxvYWRlZCAvIGUudG90YWwgKiAxMDA7XG4gICAgICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgICAgIH07XG4gICAgfVxuICB9IGNhdGNoKGUpIHtcbiAgICAvLyBBY2Nlc3NpbmcgeGhyLnVwbG9hZCBmYWlscyBpbiBJRSBmcm9tIGEgd2ViIHdvcmtlciwgc28ganVzdCBwcmV0ZW5kIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgLy8gUmVwb3J0ZWQgaGVyZTpcbiAgICAvLyBodHRwczovL2Nvbm5lY3QubWljcm9zb2Z0LmNvbS9JRS9mZWVkYmFjay9kZXRhaWxzLzgzNzI0NS94bWxodHRwcmVxdWVzdC11cGxvYWQtdGhyb3dzLWludmFsaWQtYXJndW1lbnQtd2hlbi11c2VkLWZyb20td2ViLXdvcmtlci1jb250ZXh0XG4gIH1cblxuICAvLyB0aW1lb3V0XG4gIGlmICh0aW1lb3V0ICYmICF0aGlzLl90aW1lcikge1xuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgc2VsZi50aW1lZG91dCA9IHRydWU7XG4gICAgICBzZWxmLmFib3J0KCk7XG4gICAgfSwgdGltZW91dCk7XG4gIH1cblxuICAvLyBxdWVyeXN0cmluZ1xuICBpZiAocXVlcnkpIHtcbiAgICBxdWVyeSA9IHJlcXVlc3Quc2VyaWFsaXplT2JqZWN0KHF1ZXJ5KTtcbiAgICB0aGlzLnVybCArPSB+dGhpcy51cmwuaW5kZXhPZignPycpXG4gICAgICA/ICcmJyArIHF1ZXJ5XG4gICAgICA6ICc/JyArIHF1ZXJ5O1xuICB9XG5cbiAgLy8gaW5pdGlhdGUgcmVxdWVzdFxuICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUpO1xuXG4gIC8vIENPUlNcbiAgaWYgKHRoaXMuX3dpdGhDcmVkZW50aWFscykgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cbiAgLy8gYm9keVxuICBpZiAoJ0dFVCcgIT0gdGhpcy5tZXRob2QgJiYgJ0hFQUQnICE9IHRoaXMubWV0aG9kICYmICdzdHJpbmcnICE9IHR5cGVvZiBkYXRhICYmICFpc0hvc3QoZGF0YSkpIHtcbiAgICAvLyBzZXJpYWxpemUgc3R1ZmZcbiAgICB2YXIgc2VyaWFsaXplID0gcmVxdWVzdC5zZXJpYWxpemVbdGhpcy5nZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScpXTtcbiAgICBpZiAoc2VyaWFsaXplKSBkYXRhID0gc2VyaWFsaXplKGRhdGEpO1xuICB9XG5cbiAgLy8gc2V0IGhlYWRlciBmaWVsZHNcbiAgZm9yICh2YXIgZmllbGQgaW4gdGhpcy5oZWFkZXIpIHtcbiAgICBpZiAobnVsbCA9PSB0aGlzLmhlYWRlcltmaWVsZF0pIGNvbnRpbnVlO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCB0aGlzLmhlYWRlcltmaWVsZF0pO1xuICB9XG5cbiAgLy8gc2VuZCBzdHVmZlxuICB0aGlzLmVtaXQoJ3JlcXVlc3QnLCB0aGlzKTtcbiAgeGhyLnNlbmQoZGF0YSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlcXVlc3RgLlxuICovXG5cbnJlcXVlc3QuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogSXNzdWUgYSByZXF1ZXN0OlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgIHJlcXVlc3QoJ0dFVCcsICcvdXNlcnMnKS5lbmQoY2FsbGJhY2spXG4gKiAgICByZXF1ZXN0KCcvdXNlcnMnKS5lbmQoY2FsbGJhY2spXG4gKiAgICByZXF1ZXN0KCcvdXNlcnMnLCBjYWxsYmFjaylcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ3xGdW5jdGlvbn0gdXJsIG9yIGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiByZXF1ZXN0KG1ldGhvZCwgdXJsKSB7XG4gIC8vIGNhbGxiYWNrXG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiB1cmwpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QoJ0dFVCcsIG1ldGhvZCkuZW5kKHVybCk7XG4gIH1cblxuICAvLyB1cmwgZmlyc3RcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCgnR0VUJywgbWV0aG9kKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVxdWVzdChtZXRob2QsIHVybCk7XG59XG5cbi8qKlxuICogR0VUIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IGRhdGEgb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmdldCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnR0VUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIEhFQUQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gZGF0YSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuaGVhZCA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgZm4pe1xuICB2YXIgcmVxID0gcmVxdWVzdCgnSEVBRCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIERFTEVURSBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5kZWwgPSBmdW5jdGlvbih1cmwsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ0RFTEVURScsIHVybCk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBBVENIIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gZGF0YVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucGF0Y2ggPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BBVENIJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIGZuID0gZGF0YSwgZGF0YSA9IG51bGw7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUE9TVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IGRhdGFcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBvc3QgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BPU1QnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgZm4gPSBkYXRhLCBkYXRhID0gbnVsbDtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQVVQgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBkYXRhIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wdXQgPSBmdW5jdGlvbih1cmwsIGRhdGEsIGZuKXtcbiAgdmFyIHJlcSA9IHJlcXVlc3QoJ1BVVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSBmbiA9IGRhdGEsIGRhdGEgPSBudWxsO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIEV4cG9zZSBgcmVxdWVzdGAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1ZXN0O1xuIiwiXG4vKipcbiAqIEV4cG9zZSBgRW1pdHRlcmAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59O1xuXG4vKipcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub24gPVxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgKHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKVxuICAgIC5wdXNoKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgZnVuY3Rpb24gb24oKSB7XG4gICAgc2VsZi5vZmYoZXZlbnQsIG9uKTtcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgb24uZm4gPSBmbjtcbiAgdGhpcy5vbihldmVudCwgb24pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAvLyBhbGxcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcblxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gIHZhciBjYjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcblxuICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XG59O1xuIiwiXG4vKipcbiAqIFJlZHVjZSBgYXJyYCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtNaXhlZH0gaW5pdGlhbFxuICpcbiAqIFRPRE86IGNvbWJhdGlibGUgZXJyb3IgaGFuZGxpbmc/XG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcnIsIGZuLCBpbml0aWFsKXsgIFxuICB2YXIgaWR4ID0gMDtcbiAgdmFyIGxlbiA9IGFyci5sZW5ndGg7XG4gIHZhciBjdXJyID0gYXJndW1lbnRzLmxlbmd0aCA9PSAzXG4gICAgPyBpbml0aWFsXG4gICAgOiBhcnJbaWR4KytdO1xuXG4gIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICBjdXJyID0gZm4uY2FsbChudWxsLCBjdXJyLCBhcnJbaWR4XSwgKytpZHgsIGFycik7XG4gIH1cbiAgXG4gIHJldHVybiBjdXJyO1xufTsiXX0=
