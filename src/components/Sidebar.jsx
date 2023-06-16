import Note from './Note';
import Button from './Button';

const Sidebar = ({ notes, currentNote, onSwitch, newNote, deleteNote }) => {
  return (
    <div className="sidebar">
      <h3>Hello, user</h3>
      <hr />
      {notes.map((note) => (
        <Note
          key={note.id}
          title={note.title}
          id={note.id}
          currentNote={currentNote}
          onSwitch={onSwitch}
          deleteNote={deleteNote}
        />
      ))}
      <Button value="New Note" type="button" onClick={newNote} />
    </div>
  );
};

export default Sidebar;
