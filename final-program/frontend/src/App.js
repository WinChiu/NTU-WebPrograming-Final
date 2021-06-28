import "./style/index.css";
import AboutPage from "./pages/AboutPage";
import AccountPage from "./pages/AccountPage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Account from "./components/Account";
// import Header from "./components/note/Header";
import Note from "./components/note/Note_index";
import AddNote from "./components/note/AddNote3";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const LOCALSTORAGE_LOGIN_STATUS = "isLoginPrev";
const LOCALSTORAGE_LOGIN_MEMBER = "memberNamePrev";

function App() {
  const isLoginPrev = localStorage.getItem(LOCALSTORAGE_LOGIN_STATUS);
  const memberNamePrev = localStorage.getItem(LOCALSTORAGE_LOGIN_MEMBER);
  console.log(isLoginPrev, memberNamePrev);
  const [isLogin, setIsLogin] = useState(isLoginPrev || "notLogin");
  const [memberName, setMemberName] = useState(memberNamePrev || "");

  localStorage.setItem(LOCALSTORAGE_LOGIN_STATUS, isLogin);
  localStorage.setItem(LOCALSTORAGE_LOGIN_MEMBER, memberName);

  return (
    <Router>
      <Navbar memberName={memberName} isLogin={isLogin} setIsLogin={setIsLogin} setMemberName={setMemberName} />
      <Switch>
        <Route exact path="/">
          <AboutPage />
        </Route>
        {/* <Route path="/note">
          <Header />
          <Note />
        </Route> */}
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/account">
          <AccountPage
            memberName={memberName}
            setMemberName={setMemberName}
            setIsLogin={setIsLogin}
            isLogin={isLogin}
            LOCALSTORAGE_LOGIN_STATUS={LOCALSTORAGE_LOGIN_STATUS}
            LOCALSTORAGE_LOGIN_MEMBER={LOCALSTORAGE_LOGIN_MEMBER}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
