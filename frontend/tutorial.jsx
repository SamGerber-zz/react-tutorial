var React = require('react'),
  ReactDOM = require('react-dom');

require('./list');
require('./notepad');

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(
    <div>
      Hello, world!
      {React.createElement('div', {}, 'Hello World 2!!')/*alternate syntax*/}
    </div>,
      document.getElementById("hello-world")
    );
});
