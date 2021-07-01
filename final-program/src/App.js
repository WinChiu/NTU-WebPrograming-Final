import "./style/index.css";
import AboutPage from "./pages/AboutPage";
import AccountPage from "./pages/AccountPage";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Account from "./components/Account";
import Note from "./components/note/NotePage";
import AddNote from "./components/note/AddNote";

import Activity from "./components/pages/Activity/Activity";
import MentorPlans from "./components/pages/MentorPlan/MentorPlans";
import Mentors from "./components/pages/Mentors/Mentors";
import Reservation from "./components/pages/reservation/index";
import UniHome from "./components/pages/UniHome/UniMenu";

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const LOCALSTORAGE_LOGIN_STATUS = "isLoginPrev";
const LOCALSTORAGE_LOGIN_MEMBER = "memberNamePrev";

function App() {
  const isLoginPrev = localStorage.getItem(LOCALSTORAGE_LOGIN_STATUS);
  const memberNamePrev = localStorage.getItem(LOCALSTORAGE_LOGIN_MEMBER);

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
        <Route path="/note">
          <Note memberName={memberName} isLogin={isLogin} />
        </Route>
        <Route path="/uploadNote">
          <AddNote memberName={memberName} isLogin={isLogin} />
        </Route>
        <Route path="/UniHome" exact component={UniHome} />
        <Route path="/reservation" exact component={Reservation} />
        <Route path="/activities" component={Activity} />
        <Route path="/mentorPlan" component={MentorPlans} />
        <Route path="/mentorIntro" component={Mentors} />

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

        <Route path="/signup1" component={() => (window.location = "https://forms.gle/fKwkyj59GGok8nec9")} />
        <Route path="/signup2" component={() => (window.location = "https://forms.gle/PXQUruGyN7f1Yhf18")} />
        <Route path='/confirm' component={() => window.location = 'https://forms.gle/ZfY7hRVA2xpzXJbp7'}/>
      </Switch>
    </Router>
  );
}

export default App;
