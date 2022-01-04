import React from "react";
//import noteContext from "./noteContext";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
    const notesInitital = [
        // {
        //   "_id": "61cd7fe9627d99cec9f734c0",
        //   "user": "61cd3fb68e4a9b9fd337735f",
        //   "title": "Chemistry note",
        //   "description": "Acid reacts with base to give salt and water",
        //   "tag": "Chemistry",
        //   "date": "2021-12-30T09:46:17.583Z",
        //   "__v": 0
        // },
        // {
        //   "_id": "61cd8008627d99cec9f734c2",
        //   "user": "61cd3fb68e4a9b9fd337735f",
        //   "title": "Reminder",
        //   "description": "Solve 10 questions everyday",
        //   "tag": "Leetcode",
        //   "date": "2021-12-30T09:46:48.751Z",
        //   "__v": 0
        // }
        
      ]
      
      const [notes, setnotes] = useState(notesInitital)

      const getNote = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            //"auth-token": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMjEwOTkxYmRjNGIwMjZjYmEyZWQ5In0sImlhdCI6MTY0MTE1Njc3Nn0.SwV7QDTDpKFff2NiCg-71ZJK_J_nMkiANjbnvqc-L9U'
            'auth-token' : localStorage.getItem('token')
            // 'Content-Type': 'application/x-www-form-urlencoded',
          }
         
          //body: JSON.stringify({title, description, tag})
        });
        console.log("hello")
        console.log(localStorage.getItem('token'))
        const json = await response.json();
        console.log(json)
        setnotes(json);
        
      }



    // const s1 = {
    //     "name": "Harry",
    //     "class": "5b"
    // }
    // const [state, setstate] = useState(s1);
    // const update = () =>{
    //     setTimeout(()=>{
    //         setstate({
    //             "name": "Larry",
    //             "class": "10b"
    //         })
    //     }, 1000);
    // }

    

    // return (
    //     <NoteContext.Provider value = {{state, update}}>
    //         {props.children}
    //     </NoteContext.Provider>

    //Add a Note
    const addNote = async (title, description, tag) => {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          //'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMjEwOTkxYmRjNGIwMjZjYmEyZWQ5In0sImlhdCI6MTY0MTE1Njc3Nn0.SwV7QDTDpKFff2NiCg-71ZJK_J_nMkiANjbnvqc-L9U'
          'auth-token': localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
       
        body: JSON.stringify({title, description, tag})
      });
      
      const note = await response.json();
      console.log(localStorage.getItem('token'))
      //console.log(json)
      console.log("Adding a new note")
      console.log(tag);
      
      setnotes(notes.concat(note))
    }
    //Delete a Note
    const deleteNote = async (id) => {
      //API CALL
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          //'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMjEwOTkxYmRjNGIwMjZjYmEyZWQ5In0sImlhdCI6MTY0MTE1Njc3Nn0.SwV7QDTDpKFff2NiCg-71ZJK_J_nMkiANjbnvqc-L9U'
          'auth-token': localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
       
        //body: JSON.stringify({title, description, tag})
      });
      const json = response.json();
      console.log(json)


      console.log("Deleting the node with id" +id)
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setnotes(newNotes)

    }
    //Edit a Note
    const editNote = async (id, title, description, tag) => {
      //API CALL
      

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          //'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMjEwOTkxYmRjNGIwMjZjYmEyZWQ5In0sImlhdCI6MTY0MTE1Njc3Nn0.SwV7QDTDpKFff2NiCg-71ZJK_J_nMkiANjbnvqc-L9U'
          'auth-token': localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
       
        body: JSON.stringify({title, description, tag})
      });
      //const json = response.json();
      const json = await response.json();
      console.log(json)
    

     let newNotes = JSON.parse(JSON.stringify(notes))
      //Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id)
        {
          newNotes[index].title = title;
          newNotes[index].description = description; 
          newNotes[index].tag = tag;
          break;
        }
        
        
        
      }
      console.log(newNotes)
      setnotes(newNotes);

    }

    return (
        <NoteContext.Provider value = {{notes, addNote, deleteNote, editNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;