import { Link, useNavigate } from 'react-router-dom';
import Notepad from './components/Notepad';
import Sidebar from './components/Sidebar';
import Loader from './components/Loader';
import { useEffect, useState } from 'react';

export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
let intervalId;

function App() {
  const user = localStorage.getItem('User');
  const userId = localStorage.getItem('User-id');
  const navigate = useNavigate();

  function resetTimer() {
    clearInterval(intervalId);
    startTimer();
  }
  const updateToken = async () => {
    const response = await fetch(
      `https://noti-zo7n.onrender.com/api/token/refresh/`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          refresh: JSON.parse(localStorage.getItem('token')).refresh,
        }),
      }
    );
    const data = await response.json();
    localStorage.setItem('token', JSON.stringify(data));
  };
  function startTimer() {
    intervalId = setInterval(() => {
      updateToken();
    }, 15 * 1000);
  }
  if (localStorage.getItem('token')) resetTimer();
  if (!localStorage.getItem('token')) {
    return (
      <>
        <h1>403 Forbidden</h1>
        <Link to="/">Login</Link> to Noti.
      </>
    );
  }
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNotes = function () {
    fetch(`https://noti-zo7n.onrender.com/api/note-list/${userId}/`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization:
          'Bearer ' + JSON.parse(localStorage.getItem('token')).access,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setNotes([...data]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        navigate('/');
      });
  };

  useEffect(fetchNotes, []);

  if (loading) {
    return <Loader />;
  }

  const switchNote = (id) => {
    setCurrentNote(id);
  };

  const editNotes = (id, title, content) => {
    setLoading(true);
    const csrf_token = getCookie('csrftoken');

    fetch(`https://noti-zo7n.onrender.com/api/update-note/${id}/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrf_token,
      },
      body: JSON.stringify({ title: title, content: content }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        fetchNotes();
      });
  };

  const createNewNote = () => {
    setLoading(true);
    const newNote = {
      title: 'Untitled',
      content: '',
      user_id: userId,
    };

    const csrf_token = getCookie('csrftoken');

    fetch('https://noti-zo7n.onrender.com/api/create-note/', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrf_token,
      },
      body: JSON.stringify({
        title: newNote.title,
        content: newNote.content,
        user: newNote.user_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setNotes([...notes, data]);
        setCurrentNote(data.id);
      });
  };

  const deleteNote = (id) => {
    const note = notes.filter((note) => note.id === id);

    const csrf_token = getCookie('csrftoken');
    setLoading(true);
    fetch(`https://noti-zo7n.onrender.com/api/delete-note/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrf_token,
      },
      body: JSON.stringify({ title: note[0].title, content: note[0].content }),
    }).then(() => {
      fetchNotes();
      setLoading(false);
    });
  };

  return (
    <>
      <div className="container">
        <Sidebar
          user={user}
          notes={notes}
          currentNote={currentNote}
          onSwitch={switchNote}
          newNote={createNewNote}
          deleteNote={deleteNote}
        />
        <Notepad
          note={notes.filter((note) => note.id === currentNote)}
          editNotes={editNotes}
        />
      </div>
    </>
  );
}

export default App;
