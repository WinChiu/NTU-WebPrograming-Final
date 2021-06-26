import React from "react";
import { Link } from "react-router-dom";
export default function Navbar({ memberName, isLogin }) {
  console.log(memberName);
  return (
    <nav>
      <img src="https://www.ntu.edu.tw/images/logo.png" alt="logo" className="logo" />
      <div className="tags">
        <Link to="/about">
          <h5 className="nav-tag">關於我們</h5>
        </Link>
        <h5 className="nav-tag">國內外升學資源</h5>
        <Link to="/note">
          <h5 className="nav-tag">高中生學習資源</h5>
        </Link>
        <Link to="/login">
          <h5 className="nav-tag">{isLogin ? memberName + " 您好" : "登入 / 註冊"}</h5>
        </Link>
      </div>
    </nav>
  );
}
