import React from 'react'
import { useContext, useEffect } from 'react'
import noteContext from './notes/noteContext'
import { ThemeContext } from '../App'


export const About = () => {
    const contest = useContext(ThemeContext)
    // const a = useContext(noteContext)
    // useEffect(() => {
    //    a.update();
    //    //eslint-disable-next-line
    // }, [])
    return (
        <div className={`container my-2 text-${
            contest.mode === "light" ? "dark" : "light"
          }`}>
            <h1>This is about section</h1>
        </div>
    ) 
}
