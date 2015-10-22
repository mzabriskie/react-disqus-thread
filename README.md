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
var React = require('react');
var ReactDisqusThread = require('react-disqus-thread');

var App = createClass({
	
	handleNewComment: function(comment) {
		console.log(comment.text);
	}

	render: function () {
		return (
			<ReactDisqusThread
				shortname="example"
				identifier="something-unique-12345"
				title="Example Thread"
				url="http://www.example.com/example-thread"
				category_id="123456"
				onNewComment={this.handleNewComment}/>
		);
	}
});

React.render(<App/>, document.getElementById('container'));
```

## License

MIT
