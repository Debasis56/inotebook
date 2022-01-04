import React from 'react'
import { useContext, useEffect } from 'react'
import noteContext from './notes/noteContext'


export const About = () => {
    // const a = useContext(noteContext)
    // useEffect(() => {
    //    a.update();
    //    //eslint-disable-next-line
    // }, [])
    return (
        <div>
            <h1>This is about</h1>
        </div>
    ) 
}
