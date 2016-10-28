(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactDisqusThread"] = factory(require("react"));
	else
		root["ReactDisqusThread"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var DISQUS_PROPS = ['shortname', 'identifier', 'title', 'url', 'category_id'];
	var DISQUS_CONFIG_ONLY_PROPS = ['remote_auth_s3', 'api_key'];
	var DISQUS_CALLBACKS = ['onNewComment'];
	var __disqusAdded = false;
	
	function copyProps(context, props) {
	  var prefix = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
	
	  Object.keys(props).forEach(function (prop) {
	    context[prefix + prop] = props[prop];
	  });
	}
	
	module.exports = _react2['default'].createClass({
	  displayName: 'DisqusThread',
	
	  propTypes: {
	    id: _react2['default'].PropTypes.string,
	
	    /**
	     * `shortname` tells the Disqus service your forum's shortname,
	     * which is the unique identifier for your website as registered
	     * on Disqus. If undefined , the Disqus embed will not load.
	     */
	    shortname: _react2['default'].PropTypes.string.isRequired,
	
	    /**
	     * `identifier` tells the Disqus service how to identify the
	     * current page. When the Disqus embed is loaded, the identifier
	     * is used to look up the correct thread. If disqus_identifier
	     * is undefined, the page's URL will be used. The URL can be
	     * unreliable, such as when renaming an article slug or changing
	     * domains, so we recommend using your own unique way of
	     * identifying a thread.
	     */
	    identifier: _react2['default'].PropTypes.string,
	
	    /**
	     * `title` tells the Disqus service the title of the current page.
	     * This is used when creating the thread on Disqus for the first time.
	     * If undefined, Disqus will use the <title> attribute of the page.
	     * If that attribute could not be used, Disqus will use the URL of the page.
	     */
	    title: _react2['default'].PropTypes.string,
	
	    /**
	     * `url` tells the Disqus service the URL of the current page.
	     * If undefined, Disqus will take the window.location.href.
	     * This URL is used to look up or create a thread if disqus_identifier
	     * is undefined. In addition, this URL is always saved when a thread is
	     * being created so that Disqus knows what page a thread belongs to.
	     */
	    url: _react2['default'].PropTypes.string,
	
	    /**
	     * `category_id` tells the Disqus service the category to be used for
	     * the current page. This is used when creating the thread on Disqus
	     * for the first time.
	     */
	    category_id: _react2['default'].PropTypes.string,
	
	    /**
	     * `remote_auth_s3` is the generated payload which authenticates users with Disqus.
	     * Check https://help.disqus.com/customer/portal/articles/236206 for more.
	     */
	    remote_auth_s3: _react2['default'].PropTypes.string,
	
	    /**
	     * `api_key` is the public key for your Disqus application.
	     * Check https://help.disqus.com/customer/portal/articles/236206 for more.
	     */
	    api_key: _react2['default'].PropTypes.string,
	
	    /**
	     * `onNewComment` function accepts one parameter `comment` which is a
	     * JavaScript object with comment `id` and `text`. This allows you to track
	     * user comments and replies and run a script after a comment is posted.
	     */
	    onNewComment: _react2['default'].PropTypes.func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      shortname: null,
	      identifier: null,
	      title: null,
	      url: null,
	      category_id: null,
	      onNewComment: null
	    };
	  },
	
	  componentDidMount: function componentDidMount() {
	    this.loadDisqus();
	  },
	
	  componentDidUpdate: function componentDidUpdate() {
	    this.loadDisqus();
	  },
	
	  render: function render() {
	    return _react2['default'].createElement(
	      'div',
	      this.props,
	      _react2['default'].createElement('div', { id: 'disqus_thread' }),
	      _react2['default'].createElement(
	        'noscript',
	        null,
	        _react2['default'].createElement(
	          'span',
	          null,
	          'Please enable JavaScript to view the',
	          _react2['default'].createElement(
	            'a',
	            { href: 'http://disqus.com/?ref_noscript' },
	            'comments powered by Disqus.'
	          )
	        )
	      ),
	      _react2['default'].createElement(
	        'a',
	        { href: 'http://disqus.com', className: 'dsq-brlink' },
	        'Blog comments powered by ',
	        _react2['default'].createElement(
	          'span',
	          { className: 'logo-disqus' },
	          'Disqus'
	        ),
	        '.'
	      )
	    );
	  },
	
	  addDisqusScript: function addDisqusScript() {
	    if (__disqusAdded) {
	      return;
	    }
	
	    var child = this.disqus = document.createElement('script');
	    var parent = document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0];
	
	    child.async = true;
	    child.type = 'text/javascript';
	    child.src = '//' + this.props.shortname + '.disqus.com/embed.js';
	
	    parent.appendChild(child);
	    __disqusAdded = true;
	  },
	
	  loadDisqus: function loadDisqus() {
	    var _this = this;
	
	    var props = {};
	    DISQUS_PROPS.forEach(function (prop) {
	      if (!!_this.props[prop]) {
	        props[prop] = _this.props[prop];
	      }
	    });
	
	    // Always set URL
	    if (!props.url || !props.url.length) {
	      props.url = window.location.href;
	
	      // Disqus needs hashbang URL, see https://help.disqus.com/customer/portal/articles/472107
	      props.url = props.url.replace(/#/, '') + '#!newthread';
	    }
	
	    var configOnlyProps = {};
	    DISQUS_CONFIG_ONLY_PROPS.forEach(function (prop) {
	      if (!!_this.props[prop]) {
	        configOnlyProps[prop] = _this.props[prop];
	      }
	    });
	
	    var callbacks = {};
	    DISQUS_CALLBACKS.forEach(function (prop) {
	      if (typeof _this.props[prop] === 'function') {
	        callbacks[prop] = [_this.props[prop]];
	      }
	    });
	
	    // If Disqus has already been added, reset it
	    if (typeof DISQUS !== 'undefined') {
	      DISQUS.reset({
	        reload: true,
	        config: function config() {
	          copyProps(this.page, props);
	          copyProps(this.page, configOnlyProps);
	          copyProps(this.callbacks, callbacks);
	        }
	      });
	    } else {
	      // Otherwise add Disqus to the page
	      copyProps(window, props, 'disqus_');
	      copyProps(window, {
	        config: function config() {
	          copyProps(this.page, configOnlyProps);
	          copyProps(this.callbacks, callbacks);
	        }
	      }, 'disqus_');
	      this.addDisqusScript();
	    }
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-disqus-thread.js.map