(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactDisqusThread"] = factory(require("React"));
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

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(2);
	var DOM = React.DOM;
	var DISQUS_CONFIG = [
	  'shortname', 'identifier', 'title', 'url', 'category_id', 'onNewComment'
	];
	var __disqusAdded = false;
	
	function copyProps(context, props, prefix) {
	  if (typeof prefix === 'undefined') {
	    prefix = '';
	  }
	
	  Object.keys(props).forEach(function(prop) {
	    context[prefix + prop] = props[prop];
	  });
	
	  if (typeof props.onNewComment === 'function') {
	    context[prefix + 'config'] = function () {
	      this.callbacks.onNewComment = [
	        function (comment) {
	          props.onNewComment(comment);
	        }
	      ];
	    };
	  }
	}
	
	module.exports = React.createClass({
	  displayName: 'DisqusThread',
	
	  propTypes: {
	    /**
	     * `shortname` tells the Disqus service your forum's shortname,
	     * which is the unique identifier for your website as registered
	     * on Disqus. If undefined , the Disqus embed will not load.
	     */
	    shortname: React.PropTypes.string.isRequired,
	
	    /**
	     * `identifier` tells the Disqus service how to identify the
	     * current page. When the Disqus embed is loaded, the identifier
	     * is used to look up the correct thread. If disqus_identifier
	     * is undefined, the page's URL will be used. The URL can be
	     * unreliable, such as when renaming an article slug or changing
	     * domains, so we recommend using your own unique way of
	     * identifying a thread.
	     */
	    identifier: React.PropTypes.string,
	
	    /**
	     * `title` tells the Disqus service the title of the current page.
	     * This is used when creating the thread on Disqus for the first time.
	     * If undefined, Disqus will use the <title> attribute of the page.
	     * If that attribute could not be used, Disqus will use the URL of the page.
	     */
	    title: React.PropTypes.string,
	
	    /**
	     * `url` tells the Disqus service the URL of the current page.
	     * If undefined, Disqus will take the window.location.href.
	     * This URL is used to look up or create a thread if disqus_identifier
	     * is undefined. In addition, this URL is always saved when a thread is
	     * being created so that Disqus knows what page a thread belongs to.
	     */
	    url: React.PropTypes.string,
	
	    /**
	     * `category_id` tells the Disqus service the category to be used for
	     * the current page. This is used when creating the thread on Disqus
	     * for the first time.
	     */
	    category_id: React.PropTypes.string,
	
	    /**
	     * `onNewComment` function accepts one parameter `comment` which is a 
	     * JavaScript object with comment `id` and `text`. This allows you to track
	     * user comments and replies and run a script after a comment is posted.
	     */
	     onNewComment: React.PropTypes.func
	  },
	
	  getDefaultProps: function () {
	    return {
	      shortname: null,
	      identifier: null,
	      title: null,
	      url: null,
	      category_id: null,
	      onNewComment: null
	    };
	  },
	
	  addDisqusScript: function () {
	    if (__disqusAdded) {
	      return;
	    }
	
	    var child = this.disqus = document.createElement('script');
	    var parent = document.getElementsByTagName('head')[0] ||
	                 document.getElementsByTagName('body')[0];
	
	    child.async = true;
	    child.type = 'text/javascript';
	    child.src = '//' + this.props.shortname + '.disqus.com/embed.js';
	
	    parent.appendChild(child);
	    __disqusAdded = true;
	  },
	
	  loadDisqus: function() {
	    var props = {};
	
	    // Extract Disqus props that were supplied to this component
	    DISQUS_CONFIG.forEach(function(prop) {
	      if (!!this.props[prop]) {
	        props[prop] = this.props[prop];
	      }
	    }, this);
	
	    // Always set URL
	    if (!props.url || !props.url.length) {
	      props.url = window.location.href;
	    }
	
	    // If Disqus has already been added, reset it
	    if (typeof DISQUS !== 'undefined') {
	      DISQUS.reset({ 
	        reload: true,
	        config: function() {
	          copyProps(this.page, props);
	
	          // Disqus needs hashbang URL, see https://help.disqus.com/customer/portal/articles/472107
	          this.page.url = this.page.url.replace(/#/, '') + '#!newthread';
	        }
	      });
	    }
	    // Otherwise add Disqus to the page
	    else {
	      copyProps(window, props, 'disqus_');
	      this.addDisqusScript();
	    }
	  },
	
	  componentDidMount: function () {
	    this.loadDisqus();
	  },
	
	  componentDidUpdate: function () {
	    this.loadDisqus();
	  },
	
	  shouldComponentUpdate: function(newProps) {
	    return (newProps.id !== this.props.id || newProps.url !== this.props.url);
	  },
	
	  render: function () {
	    return (
	      DOM.div(this.props,
	        DOM.div({id:"disqus_thread"}),
	        DOM.noscript(null,
	          DOM.span(null,
	            'Please enable JavaScript to view the ',
	            DOM.a({href:"http://disqus.com/?ref_noscript"},
	              'comments powered by Disqus.'
	            )
	          )
	        ),
	        DOM.a({
	            href:"http://disqus.com",
	            className:"dsq-brlink"
	          },
	          'blog comments powered by ',
	          DOM.span({className:"logo-disqus"},
	            'Disqus'
	          )
	        )
	      )
	    );
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2ZGQ0MDFjMGQ1NzA2YTUwOWQ4OSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvZGlzcXVzLXRocmVhZC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJSZWFjdFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQSx5Qzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLG1CQUFtQjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsdUNBQXVDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0EscUJBQW9CLHdCQUF3QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7O0FDbkxELGdEIiwiZmlsZSI6Ii4vZGlzdC9yZWFjdC1kaXNxdXMtdGhyZWFkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiUmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiUmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVhY3REaXNxdXNUaHJlYWRcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJSZWFjdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUmVhY3REaXNxdXNUaHJlYWRcIl0gPSBmYWN0b3J5KHJvb3RbXCJSZWFjdFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNmRkNDAxYzBkNTcwNmE1MDlkODlcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2Rpc3F1cy10aHJlYWQnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIERPTSA9IFJlYWN0LkRPTTtcbnZhciBESVNRVVNfQ09ORklHID0gW1xuICAnc2hvcnRuYW1lJywgJ2lkZW50aWZpZXInLCAndGl0bGUnLCAndXJsJywgJ2NhdGVnb3J5X2lkJywgJ29uTmV3Q29tbWVudCdcbl07XG52YXIgX19kaXNxdXNBZGRlZCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBjb3B5UHJvcHMoY29udGV4dCwgcHJvcHMsIHByZWZpeCkge1xuICBpZiAodHlwZW9mIHByZWZpeCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBwcmVmaXggPSAnJztcbiAgfVxuXG4gIE9iamVjdC5rZXlzKHByb3BzKS5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICBjb250ZXh0W3ByZWZpeCArIHByb3BdID0gcHJvcHNbcHJvcF07XG4gIH0pO1xuXG4gIGlmICh0eXBlb2YgcHJvcHMub25OZXdDb21tZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29udGV4dFtwcmVmaXggKyAnY29uZmlnJ10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5vbk5ld0NvbW1lbnQgPSBbXG4gICAgICAgIGZ1bmN0aW9uIChjb21tZW50KSB7XG4gICAgICAgICAgcHJvcHMub25OZXdDb21tZW50KGNvbW1lbnQpO1xuICAgICAgICB9XG4gICAgICBdO1xuICAgIH07XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnRGlzcXVzVGhyZWFkJyxcblxuICBwcm9wVHlwZXM6IHtcbiAgICAvKipcbiAgICAgKiBgc2hvcnRuYW1lYCB0ZWxscyB0aGUgRGlzcXVzIHNlcnZpY2UgeW91ciBmb3J1bSdzIHNob3J0bmFtZSxcbiAgICAgKiB3aGljaCBpcyB0aGUgdW5pcXVlIGlkZW50aWZpZXIgZm9yIHlvdXIgd2Vic2l0ZSBhcyByZWdpc3RlcmVkXG4gICAgICogb24gRGlzcXVzLiBJZiB1bmRlZmluZWQgLCB0aGUgRGlzcXVzIGVtYmVkIHdpbGwgbm90IGxvYWQuXG4gICAgICovXG4gICAgc2hvcnRuYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG5cbiAgICAvKipcbiAgICAgKiBgaWRlbnRpZmllcmAgdGVsbHMgdGhlIERpc3F1cyBzZXJ2aWNlIGhvdyB0byBpZGVudGlmeSB0aGVcbiAgICAgKiBjdXJyZW50IHBhZ2UuIFdoZW4gdGhlIERpc3F1cyBlbWJlZCBpcyBsb2FkZWQsIHRoZSBpZGVudGlmaWVyXG4gICAgICogaXMgdXNlZCB0byBsb29rIHVwIHRoZSBjb3JyZWN0IHRocmVhZC4gSWYgZGlzcXVzX2lkZW50aWZpZXJcbiAgICAgKiBpcyB1bmRlZmluZWQsIHRoZSBwYWdlJ3MgVVJMIHdpbGwgYmUgdXNlZC4gVGhlIFVSTCBjYW4gYmVcbiAgICAgKiB1bnJlbGlhYmxlLCBzdWNoIGFzIHdoZW4gcmVuYW1pbmcgYW4gYXJ0aWNsZSBzbHVnIG9yIGNoYW5naW5nXG4gICAgICogZG9tYWlucywgc28gd2UgcmVjb21tZW5kIHVzaW5nIHlvdXIgb3duIHVuaXF1ZSB3YXkgb2ZcbiAgICAgKiBpZGVudGlmeWluZyBhIHRocmVhZC5cbiAgICAgKi9cbiAgICBpZGVudGlmaWVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogYHRpdGxlYCB0ZWxscyB0aGUgRGlzcXVzIHNlcnZpY2UgdGhlIHRpdGxlIG9mIHRoZSBjdXJyZW50IHBhZ2UuXG4gICAgICogVGhpcyBpcyB1c2VkIHdoZW4gY3JlYXRpbmcgdGhlIHRocmVhZCBvbiBEaXNxdXMgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICAgICAqIElmIHVuZGVmaW5lZCwgRGlzcXVzIHdpbGwgdXNlIHRoZSA8dGl0bGU+IGF0dHJpYnV0ZSBvZiB0aGUgcGFnZS5cbiAgICAgKiBJZiB0aGF0IGF0dHJpYnV0ZSBjb3VsZCBub3QgYmUgdXNlZCwgRGlzcXVzIHdpbGwgdXNlIHRoZSBVUkwgb2YgdGhlIHBhZ2UuXG4gICAgICovXG4gICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBgdXJsYCB0ZWxscyB0aGUgRGlzcXVzIHNlcnZpY2UgdGhlIFVSTCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICAgICAqIElmIHVuZGVmaW5lZCwgRGlzcXVzIHdpbGwgdGFrZSB0aGUgd2luZG93LmxvY2F0aW9uLmhyZWYuXG4gICAgICogVGhpcyBVUkwgaXMgdXNlZCB0byBsb29rIHVwIG9yIGNyZWF0ZSBhIHRocmVhZCBpZiBkaXNxdXNfaWRlbnRpZmllclxuICAgICAqIGlzIHVuZGVmaW5lZC4gSW4gYWRkaXRpb24sIHRoaXMgVVJMIGlzIGFsd2F5cyBzYXZlZCB3aGVuIGEgdGhyZWFkIGlzXG4gICAgICogYmVpbmcgY3JlYXRlZCBzbyB0aGF0IERpc3F1cyBrbm93cyB3aGF0IHBhZ2UgYSB0aHJlYWQgYmVsb25ncyB0by5cbiAgICAgKi9cbiAgICB1cmw6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBgY2F0ZWdvcnlfaWRgIHRlbGxzIHRoZSBEaXNxdXMgc2VydmljZSB0aGUgY2F0ZWdvcnkgdG8gYmUgdXNlZCBmb3JcbiAgICAgKiB0aGUgY3VycmVudCBwYWdlLiBUaGlzIGlzIHVzZWQgd2hlbiBjcmVhdGluZyB0aGUgdGhyZWFkIG9uIERpc3F1c1xuICAgICAqIGZvciB0aGUgZmlyc3QgdGltZS5cbiAgICAgKi9cbiAgICBjYXRlZ29yeV9pZDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIGBvbk5ld0NvbW1lbnRgIGZ1bmN0aW9uIGFjY2VwdHMgb25lIHBhcmFtZXRlciBgY29tbWVudGAgd2hpY2ggaXMgYSBcbiAgICAgKiBKYXZhU2NyaXB0IG9iamVjdCB3aXRoIGNvbW1lbnQgYGlkYCBhbmQgYHRleHRgLiBUaGlzIGFsbG93cyB5b3UgdG8gdHJhY2tcbiAgICAgKiB1c2VyIGNvbW1lbnRzIGFuZCByZXBsaWVzIGFuZCBydW4gYSBzY3JpcHQgYWZ0ZXIgYSBjb21tZW50IGlzIHBvc3RlZC5cbiAgICAgKi9cbiAgICAgb25OZXdDb21tZW50OiBSZWFjdC5Qcm9wVHlwZXMuZnVuY1xuICB9LFxuXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBzaG9ydG5hbWU6IG51bGwsXG4gICAgICBpZGVudGlmaWVyOiBudWxsLFxuICAgICAgdGl0bGU6IG51bGwsXG4gICAgICB1cmw6IG51bGwsXG4gICAgICBjYXRlZ29yeV9pZDogbnVsbCxcbiAgICAgIG9uTmV3Q29tbWVudDogbnVsbFxuICAgIH07XG4gIH0sXG5cbiAgYWRkRGlzcXVzU2NyaXB0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKF9fZGlzcXVzQWRkZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY2hpbGQgPSB0aGlzLmRpc3F1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHZhciBwYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdIHx8XG4gICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG5cbiAgICBjaGlsZC5hc3luYyA9IHRydWU7XG4gICAgY2hpbGQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIGNoaWxkLnNyYyA9ICcvLycgKyB0aGlzLnByb3BzLnNob3J0bmFtZSArICcuZGlzcXVzLmNvbS9lbWJlZC5qcyc7XG5cbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIF9fZGlzcXVzQWRkZWQgPSB0cnVlO1xuICB9LFxuXG4gIGxvYWREaXNxdXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwcm9wcyA9IHt9O1xuXG4gICAgLy8gRXh0cmFjdCBEaXNxdXMgcHJvcHMgdGhhdCB3ZXJlIHN1cHBsaWVkIHRvIHRoaXMgY29tcG9uZW50XG4gICAgRElTUVVTX0NPTkZJRy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIGlmICghIXRoaXMucHJvcHNbcHJvcF0pIHtcbiAgICAgICAgcHJvcHNbcHJvcF0gPSB0aGlzLnByb3BzW3Byb3BdO1xuICAgICAgfVxuICAgIH0sIHRoaXMpO1xuXG4gICAgLy8gQWx3YXlzIHNldCBVUkxcbiAgICBpZiAoIXByb3BzLnVybCB8fCAhcHJvcHMudXJsLmxlbmd0aCkge1xuICAgICAgcHJvcHMudXJsID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gICAgfVxuXG4gICAgLy8gSWYgRGlzcXVzIGhhcyBhbHJlYWR5IGJlZW4gYWRkZWQsIHJlc2V0IGl0XG4gICAgaWYgKHR5cGVvZiBESVNRVVMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBESVNRVVMucmVzZXQoeyBcbiAgICAgICAgcmVsb2FkOiB0cnVlLFxuICAgICAgICBjb25maWc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNvcHlQcm9wcyh0aGlzLnBhZ2UsIHByb3BzKTtcblxuICAgICAgICAgIC8vIERpc3F1cyBuZWVkcyBoYXNoYmFuZyBVUkwsIHNlZSBodHRwczovL2hlbHAuZGlzcXVzLmNvbS9jdXN0b21lci9wb3J0YWwvYXJ0aWNsZXMvNDcyMTA3XG4gICAgICAgICAgdGhpcy5wYWdlLnVybCA9IHRoaXMucGFnZS51cmwucmVwbGFjZSgvIy8sICcnKSArICcjIW5ld3RocmVhZCc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBPdGhlcndpc2UgYWRkIERpc3F1cyB0byB0aGUgcGFnZVxuICAgIGVsc2Uge1xuICAgICAgY29weVByb3BzKHdpbmRvdywgcHJvcHMsICdkaXNxdXNfJyk7XG4gICAgICB0aGlzLmFkZERpc3F1c1NjcmlwdCgpO1xuICAgIH1cbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubG9hZERpc3F1cygpO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubG9hZERpc3F1cygpO1xuICB9LFxuXG4gIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV3UHJvcHMpIHtcbiAgICByZXR1cm4gKG5ld1Byb3BzLmlkICE9PSB0aGlzLnByb3BzLmlkIHx8IG5ld1Byb3BzLnVybCAhPT0gdGhpcy5wcm9wcy51cmwpO1xuICB9LFxuXG4gIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoXG4gICAgICBET00uZGl2KHRoaXMucHJvcHMsXG4gICAgICAgIERPTS5kaXYoe2lkOlwiZGlzcXVzX3RocmVhZFwifSksXG4gICAgICAgIERPTS5ub3NjcmlwdChudWxsLFxuICAgICAgICAgIERPTS5zcGFuKG51bGwsXG4gICAgICAgICAgICAnUGxlYXNlIGVuYWJsZSBKYXZhU2NyaXB0IHRvIHZpZXcgdGhlICcsXG4gICAgICAgICAgICBET00uYSh7aHJlZjpcImh0dHA6Ly9kaXNxdXMuY29tLz9yZWZfbm9zY3JpcHRcIn0sXG4gICAgICAgICAgICAgICdjb21tZW50cyBwb3dlcmVkIGJ5IERpc3F1cy4nXG4gICAgICAgICAgICApXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICBET00uYSh7XG4gICAgICAgICAgICBocmVmOlwiaHR0cDovL2Rpc3F1cy5jb21cIixcbiAgICAgICAgICAgIGNsYXNzTmFtZTpcImRzcS1icmxpbmtcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgJ2Jsb2cgY29tbWVudHMgcG93ZXJlZCBieSAnLFxuICAgICAgICAgIERPTS5zcGFuKHtjbGFzc05hbWU6XCJsb2dvLWRpc3F1c1wifSxcbiAgICAgICAgICAgICdEaXNxdXMnXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApXG4gICAgKTtcbiAgfVxufSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliL2Rpc3F1cy10aHJlYWQuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJSZWFjdFwiXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==