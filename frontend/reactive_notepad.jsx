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
    var notepad = this.props.notepad;
    var notes = notepad.notes;

    return (
      <div className="note-list">
        {
          notes.map(function(note){
            return (
              <div key={note.id} className={
                  notepad.selectedId === note.id ? 'note-selected' : ''
                }>
                <a href="#" onClick={
                    this.props.onSelectNote.bind(null, note.id)
                }>
                  <NoteSummary note={note}/>
                </a>
              </div>
            );
          }.bind(this))
        }
      </div>
    );
  }
});

var NoteEditor = React.createClass({
  getInitialState: function () {
    return {
      isConfirming: false
    };
  },

  onChange: function (event) {
    this.props.onChange(this.props.note.id, event.target.value);
  },

  onDelete: function () {
    if (this.state.isConfirming) {
      this.props.onDeleteNote(this.props.note.id);
      this.setState({isConfirming: false});
    } else {
      this.setState({isConfirming: true});
    }
  },

  onCancelDelete: function () {
    this.setState({isConfirming: false});
  },

  render: function () {
    return (
      <div>
        <div>
          <textarea rows={5} cols={40}
            value={this.props.note.content}
            onChange={this.onChange}>
          </textarea>
        </div>
        <button onClick={this.onDelete}>
          {
            this.state.isConfirming ? 'Confirm' : 'Delete note'
          }
        </button>
        {
          this.state.isConfirming ?
            <button onClick={this.onCancelDelete}>Cancel</button> : null
        }
      </div>
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
                           onChange={this.props.onChangeNote}
                           onDeleteNote={this.props.onDeleteNote}/>;
    }
    return (
      <div id="notepad">
        <NotesList notepad={notepad}
                   onSelectNote={this.props.onSelectNote}/>
        <div>
          <button onClick={this.props.onAddNote}>Add note</button>
        </div>
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

var onSelectNote = function (id) {
  notepad.selectedId = id;
  onChange();
};

var onDeleteNote = function (id) {
  var note = notepad.notes.filter(function(n) {
    return n.id === id;
  })[0];
  if (note) {
    notepad.notes = notepad.notes.filter(function (n) {
      return n.id !== id;
    });
  }
  if (notepad.selectedId === id) {
    notepad.selectedId = null;
  }
  onChange();
};


var onChange = function () {
  ReactDOM.render(
    <Notepad notepad={notepad}
             onAddNote={onAddNote}
             onChangeNote={onChangeNote}
             onDeleteNote={onDeleteNote}
             onSelectNote={onSelectNote}/>,
    document.getElementById('reactive-notepad')
  );
};


document.addEventListener('DOMContentLoaded', function(){
  onChange();
});
