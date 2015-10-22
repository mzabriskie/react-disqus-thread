import React from 'react';
import ReactDOM from 'react-dom';
import DisqusThread from '../../lib/main';

const App = React.createClass({
  handleNewComment(comment) {
    /* eslint no-console:0 */
    console.log(comment);
  },

  render() {
    return (
      <div>
        <h1>React Disqus thread component</h1>
        <DisqusThread
          shortname="mzabriskie"
          identifier="react-disqus-thread"
          title="React Disqus thread component"
          onNewComment={this.handleNewComment}
        />
      </div>
    );
  }
});

ReactDOM.render(<App/>, document.getElementById('example'));

