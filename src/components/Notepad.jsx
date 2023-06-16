import Button from './Button';
import { useEffect, useState } from 'react';

const Notepad = ({ note, editNotes }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note[0]) {
      setTitle(note[0].title);
      setContent(note[0].content);
    }
  }, [note[0]]);

  if (!note[0]) {
    return <div>Get started by selecting a note or creating one.</div>;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title && !content) alert('Please enter title and content');

    editNotes(note[0].id, title, content);
  };

  return (
    <form onSubmit={onSubmit} className="form-control">
      <div className="notepad">
        <input
          className="title"
          type="text"
          value={title}
          placeholder="Add title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="content"
          value={content}
          placeholder="Add content"
          onChange={(e) => setContent(e.target.value)}
        />
        <Button value="Save" type="submit" />
      </div>
    </form>
  );
};

export default Notepad;
