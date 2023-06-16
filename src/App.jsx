import Notepad from "./components/Notepad";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNotes = function () {
    fetch("http://127.0.0.1:8000/api/note-list/")
      .then((response) => response.json())
      .then((data) => {
        setNotes([...data]);
        setLoading(false);
      });
  };

  useEffect(fetchNotes, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const switchNote = (id) => {
    setCurrentNote(id);
  };

  const editNotes = (id, title, content) => {
    const csrf_token = getCookie("csrftoken");

    fetch(`http://127.0.0.1:8000/api/update-note/${id}/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrf_token,
      },
      body: JSON.stringify({ title: title, content: content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchNotes();
      });
    console.log("Edited successfully");
  };

  const createNewNote = () => {
    const newNote = {
      title: "Untitled",
      content: "",
    };

    const csrf_token = getCookie("csrftoken");

    fetch("http://127.0.0.1:8000/api/create-note/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrf_token,
      },
      body: JSON.stringify({ title: newNote.title, content: newNote.content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNotes([...notes, data]);
        setCurrentNote(data.id);
      });
  };

  const deleteNote = (id) => {
    const note = notes.filter((note) => note.id === id);
    console.log(note);

    const csrf_token = getCookie("csrftoken");

    fetch(`http://127.0.0.1:8000/api/delete-note/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken": csrf_token,
      },
      body: JSON.stringify({ title: note[0].title, content: note[0].content }),
    }).then((response) => {
      fetchNotes();
    });
  };

  return (
    <div className="container">
      <Sidebar
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
  );
}

export default App;
