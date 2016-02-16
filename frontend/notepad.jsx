var React = require('react'),
  ReactDOM = require('react-dom');

var NotesList = React.createClass({
  render: function(){
    var notes = this.props.notepad.notes;

    return (
      <div className="note-list">
        {
          notes.map(function(note){
            var title = note.content.substring(0,
              note.content.indexOf('\n')
            );
            title = title || note.content;

            return (
              <div key={note.id} className="note-summary">
                {title}
              </div>
            );
          })
        }
      </div>
    );
  }
});

var notepad = {
  notes: [
    {
      id: 1,
      content: "Hello, world!\nBoring.\nBoring.\nBoring."
    },
    {
      id: 2,
      content: "React is awesome.\nSeriously, it's the greatest"
    },
    {
      id: 3,
      content: "Robots are pretty cool\n" +
        "Robots are awesome, until they take over the world, that is."
    },
    {
      id: 4,
      content: "Mokeys.\nWho doesn't love monkeys?"
    },
  ]
};

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(
    <NotesList notepad={notepad}/>,
    document.getElementById('notepad')
  );
});

module.exports = NotesList;
