import React, {useContext, useState} from "react";
import noteContext from './notes/noteContext'
import { ThemeContext } from "../App";

const AddNote = (props) => {
    const contest = useContext(ThemeContext)
    const context = useContext(noteContext)
    const {addNote} = context
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""})
        props.showAlert("Added Successfully", "success", "SUCCESS")

    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})

    }
  return (
    <div>
      <div className={`container my-2 text-${
          contest.mode === "light" ? "dark" : "light"
        }`}>
        <h2>Add a Note</h2>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name = "title"
              aria-describedby="emailHelp"
              onChange={onChange}
              minLength={5} required
              value={note.title}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              name = "description"
              id="description"
              onChange={onChange}
              minLength={5} required
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              name = "tag"
              id="tag"
              onChange={onChange}
              minLength={5} required
              value={note.tag}
            />
          </div>
          
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
