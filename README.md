# react-disqus-thread

React Disqus thread component

## Installing

```bash
$ npm install react-disqus-thread
# or
$ bower install react-disqus-thread
```

## Demo

http://mzabriskie.github.io/react-disqus-thread/example

## Example

```js
/** @jsx React.DOM */
var React = require('react');
var DisqusThread = require('react-disqus-thread');

var App = createClass({
	render: function () {
		return (
			<DisqusThread
				shortname="example"
				identifier="something-unique-12345"
				title="Example Thread"
				url="http://www.example.com/example-thread"
				category_id="123456"/>
		);
	}
});

React.renderComponent(<App/>, document.body);
```

## License

MIT