import Note from './Note';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
const Sidebar = ({
  user,
  notes,
  currentNote,
  onSwitch,
  newNote,
  deleteNote,
}) => {
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem('User');
    localStorage.removeItem('User-id');
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <div className="sidebar">
      <h3>Hello, {user}</h3>
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
      <br />
      <Button value="Logout" type="button" onClick={logoutUser} />
    </div>
  );
};

export default Sidebar;
