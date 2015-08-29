var React = require('react');
var DOM = React.DOM;
var DISQUS_CONFIG = [
  'shortname', 'identifier', 'title', 'url', 'category_id'
];


var DISQUS_SCRIPT_ADDED = false;



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
    category_id: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      shortname: null,
      identifier: null,
      title: null,
      url: null,
      category_id: null
    };
  },

  addDisqusScript: function () {
    if (DISQUS_SCRIPT_ADDED) {
      return;
    }

    DISQUS_SCRIPT_ADDED = true;

    var child = document.createElement('script');
    var parent = document.getElementsByTagName('head')[0] ||
                 document.getElementsByTagName('body')[0];

    child.async = true;
    child.type = 'text/javascript';
    child.src = '//' + this.props.shortname + '.disqus.com/embed.js';

    parent.appendChild(child);
  },


  reloadDisqus: function() {
    var self = this;

    var availableProps = {};

    DISQUS_CONFIG.forEach(function(prop) {
      if (!!self.props[prop]) {
        availableProps[prop] = self.props[prop];
      }
    });

    // always set URL
    if (!availableProps.url || !availableProps.url.length) {
      availableProps.url = window.location.href;
    }

    if (typeof DISQUS !== "undefined") {
      DISQUS.reset({ 
        reload: true,
        config: function() {
          _page = this.page;

          Object.keys(availableProps).forEach(function(prop) {
            _page[prop] = availableProps[prop];
          });

          // Disqus needs hashbang URL, see https://help.disqus.com/customer/portal/articles/472107
          _page.url = _page.url.replace(/#/, '') + '#!newthread';
        }
      });
    } else {
      Object.keys(availableProps).forEach(function(prop) {
        window['disqus_' + prop] = availableProps[prop];
      });

      self.addDisqusScript();
    }
  },

  componentDidMount: function () {
    this.reloadDisqus();
  },

  componentDidUpdate: function () {
    this.reloadDisqus();
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
