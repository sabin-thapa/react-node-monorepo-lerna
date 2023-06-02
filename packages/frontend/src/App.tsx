import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNotes, setShowAddNotes] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
        console.log("fetched");
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);


  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id)
      setNotes(notes.filter(existingNode => existingNode._id !== note._id))
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  return (
    <>
      <Container>
        <h1>TODO APP</h1>

        <Button onClick={() => setShowAddNotes(true)} className="mb-4">Add Note</Button>

        <Row xs={1} md={2} lg={3} className="g-3">
          {notes?.map((note) => (
            <Col key={note._id}>
              <Note note={note} className={styles.note} onDeleteNoteClicked={deleteNote}/>
            </Col>
          ))}
        </Row>
        {showAddNotes && <AddNoteDialog onDismiss={() => setShowAddNotes(false)} onNoteSaved={(newNote) => {
          
          setNotes([...notes, newNote])
          setShowAddNotes(false);
        }} />}
      </Container>
    </>
  );
}

export default App;
