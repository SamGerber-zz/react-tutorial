var React = require('react'),
  ReactDOM = require('react-dom');

var names = ['Moe', 'Larry', 'Curly'];

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(
    <div>
      {
        names.map(function (name, i) {
          return <div key={i}>Hello, {name}!</div>;
        })
      }
    </div>,
    document.getElementById('list')
  );
});
