import React, {useContext} from 'react'
import noteContext from './notes/noteContext'
const NoteItem = (props) => {
  const context = useContext(noteContext)
  const { deleteNote } = context;
    const {note, updateNote} = props; 

    return (
      
        <div className = "col-lg-3">
            <div className="card my-3">

  <div className ="card-body">
    <div className="d-flex align-items-center">
    <h5 className ="card-title">{note.title}</h5>
    <i className="fas fa-trash mx-2" onClick={() => {deleteNote(note._id);
     props.showAlert("Deleted Successfully", "warning", "SUCCESS")}}></i>
    <i className="fas fa-edit mx-2" onClick={() => {updateNote(note)}}></i>
    </div>
    
    <p className ="card-text">{note.description}</p>
   
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
            
        </div>
    )
}

export default NoteItem
