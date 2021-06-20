import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../components/Login";
import Account from "../components/Account";
function AccountPage({
  setIsLogin,
  isLogin,
  setMemberName,
  memberName,
  LOCALSTORAGE_LOGIN_STATUS,
  LOCALSTORAGE_LOGIN_MEMBER,
}) {
  return (
    <>
      {isLogin==="login" ? (
        <Account memberName={memberName} isLogin={isLogin} />
      ) : (
        <Login setIsLogin={setIsLogin} setMemberName={setMemberName} />
      )}
    </>
  );
}

export default AccountPage;
