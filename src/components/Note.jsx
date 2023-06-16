import { FaTimes } from 'react-icons/fa';

const Note = ({ title, onSwitch, id, currentNote, deleteNote }) => {
  return (
    <div className="note-link">
      <div
        className={`link ' + ${currentNote === id ? 'focused' : ''}`}
        onClick={() => onSwitch(id)}
        style={{ cursor: 'pointer' }}
      >
        {title}
      </div>
      <FaTimes
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={() => deleteNote(id)}
      />
    </div>
  );
};

export default Note;
