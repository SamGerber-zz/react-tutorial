var React = require('react'),
  ReactDOM = require('react-dom');

var NoteSummary = React.createClass({
  render: function(){
    var note = this.props.note;
    var title = note.content;
    if (title.indexOf('\n') > 0) {
      title = note.content.substring(0, note.content.indexOf('\n'));
    }
    if (!title) {
      title = 'Untitled';
    }
    return (
      <div className="note-summary">{title}</div>
    );
  }
});

var NotesList = React.createClass({
  render: function(){
    var notes = this.props.notepad.notes;

    return (
      <div className="note-list">
        {
          notes.map(function(note){
            return (
              <NoteSummary key={note.id} note={note}/>
            );
          })
        }
      </div>
    );
  }
});

var NoteEditor = React.createClass({
  onChange: function (event) {
    this.props.onChange(this.props.note.id, event.target.value);
  },

  render: function () {
    return (
      <textarea rows={5} cols={40}
                value={this.props.note.content}
                onChange={this.onChange}>
      </textarea>
    );
  }
});

var Notepad = React.createClass({
  render: function() {
    var notepad = this.props.notepad;
    var editor = null;
    var selectedNote = notepad.notes.filter(function (n) {
        return n.id === notepad.selectedId;
    })[0];
    if (selectedNote) {
      editor = <NoteEditor note={selectedNote}
                           onChange={this.props.onChangeNote}/>;
    }
    return (
      <div id="notepad">
        <NotesList notepad={notepad}/>
        <div><button onClick={this.props.onAddNote}>Add note</button></div>
        {editor}
      </div>
    );
  }
});

var notepad = {
  notes: [],
  selectedId: null
};

var nextNodeId = 1;

var onAddNote = function () {
  var note = {id: nextNodeId, content: ''};
  nextNodeId++;
  notepad.notes.push(note);
  notepad.selectedId = note.id;
  onChange();
};

var onChangeNote = function (id, value) {
  var note = notepad.notes.filter(function (n) {
    return n.id === id;
  })[0];
  if (note) {
    note.content = value;
  }
  onChange();
};

var onChange = function () {
  ReactDOM.render(
    <Notepad notepad={notepad}
             onAddNote={onAddNote}
             onChangeNote={onChangeNote}/>,
    document.getElementById('reactive-notepad')
  );
};

document.addEventListener('DOMContentLoaded', function(){
  onChange();
});
