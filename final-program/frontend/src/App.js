import "./style/index.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Account from "./components/Account";
//import Header from "./components/note/Header";
import Note from "./components/note/Note_index";
import AddNote from "./components/note/AddNote3";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [memberName, setMemberName] = useState("default name");

  return (
    <Router>
      <Navbar memberName={memberName} isLogin={isLogin} />
      <Switch>
        <Route exact path="/">
          <About />
        </Route>
        <Route path="/note">
          <Note />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/login">
          <Login memberName={memberName} setIsLogin={setIsLogin} />
        </Route>
        <Route path="/account">
          <Account />
        </Route>
        <Route path="/upload/note">
          <AddNote/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
