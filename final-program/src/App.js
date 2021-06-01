import './App.css';
import Header from "./note/Header";
import Note from "./note/Note_index";
import AddNote from "./note/AddNote";
import { React,useState } from 'react'

function App() {
  const [mode,setMode] =useState(2);
  
  const Index = (
    <div>
      test
    </div>

  )
  return (
    <>
      <Header/>
      <Note/>
    </>
    );
}

export default App;
