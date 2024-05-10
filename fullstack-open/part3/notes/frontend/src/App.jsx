import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    // console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        // console.log('promise fulfilled')
        setNotes(initialNotes)
      })
  }, [])
  
  console.log('render', notes.length, 'notes')
  
  const addNote = (event) => {
    event.preventDefault()
    // console.log('button clicked', event.target)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: notes.length + 1,
    }

    noteService
      .create(noteObject)
      .then (returnedNote => {
        // console.log(response)
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleChange = (event) => {
    // console.log(event.target.value)
    setNewNote(event.target.value)
  }

  const toggleImportance = (id) => {
    // console.log(`importance of ${id} needs to be toggled`)
    const url = `http://localhost:3001/notes/${id}`
    const note = notes.find (
      note => note.id === id
    )

    const changedNote = { ...note, importance: !note.importance}

    noteService
      .update(id, changedNote)
      .then (returnedNote => {
        setNotes(notes.map (note => note.id !== id ? note : returnedNote))
      })
      .catch ( error =>
        alert (
          `the note '${note.content}' was already deleted from the server`
        ),
        setNotes(notes.filter(n => n.id !== id))
      )
  }

  const notesToShow = showAll 
  ? notes 
  : notes.filter((note) => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        { notesToShow.map((note) => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
          <input value={newNote} onChange={handleChange}/>
          <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App