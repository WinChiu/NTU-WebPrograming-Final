import React, { useState } from "react";
import { Link } from "react-router-dom";
function Login({ setIsLogin }) {
  const [loginStage, setLoginStage] = useState("login type"); // "login type", "login", "register"
  const [memberType, setMembertype] = useState("not member"); // "not member", "student", "mentor"

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLogin(true);
  };

  const loginType = (
    <div className="login-type login-container">
      <div className="types">
        <div className="login-as-student-btn type">
          <div className="student-logo type-logo"></div>
          <button className="Im-student Im-btn btn btn-info" onClick={() => loginHandler("login", "student")}>
            我是學生
          </button>
        </div>
        <div className="login-as-mentor-btn type">
          <div className="mentor-logo type-logo"></div>
          <button className="Im-mentor Im-btn btn btn-info" onClick={() => loginHandler("login", "mentor")}>
            我是輔導員
          </button>
        </div>
      </div>
      <div className="not-member">
        <h5>我不是會員!</h5>
        <button
          type="button"
          className="btn btn-success register-btn "
          onClick={() => loginHandler("register", "not member")}
        >
          免費註冊帳號
        </button>
      </div>
    </div>
  );

  const login = (
    <div className="login-type login-container">
      <div className="login-logo"></div>
      <form className="form">
        <div class="form-group">
          <label for="exampleInputEmail1">電子郵件</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">密碼</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>

        <button
          type="submit"
          class="btn btn-success"
          onClick={(e) => {
            submitHandler(e);
          }}
        >
          <Link to="/account">登入</Link>
        </button>
        <button type="submit" class="btn btn-danger">
          重設密碼
        </button>
      </form>
    </div>
  );

  const register = (
    <div className="login-type login-container">
      <div className="register-logo"></div>
      <form className="form">
        <div class="form-group">
          <label for="exampleInputEmail1">電子郵件</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">設定密碼</label>
          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>

        <button type="submit" class="btn btn-success">
          註冊
        </button>
      </form>
    </div>
  );

  const loginHandler = (stage, member) => {
    setLoginStage(stage);
    setMembertype(member);
  };

  return (
    <section id="login">{loginStage === "login type" ? loginType : loginStage === "login" ? login : register}</section>
  );
}

export default Login;
