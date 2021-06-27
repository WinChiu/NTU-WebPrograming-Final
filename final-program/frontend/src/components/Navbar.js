import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
export default function Navbar({ memberName, isLogin, setIsLogin, setMemberName }) {
  console.log(isLogin);
  return (
    <nav>
      <img src="https://www.ntu.edu.tw/images/logo.png" alt="logo" className="logo" />
      <div className="tags">
        <Link to="/about" className="nav-link-container">
          <h5 className="nav-tag">關於我們</h5>
        </Link>
        <h5 className="nav-tag">國內外升學資源</h5>
        <h5 className="nav-tag">高中生學習資源</h5>
        <Link to="/account">
          <h5 className="nav-tag">{isLogin === "login" ? memberName + " 您好" : "登入 / 註冊"}</h5>
        </Link>
        {isLogin === "login" ? (
          <Button
            type="primary"
            danger
            onClick={() => {
              setIsLogin("notLogin");
              setMemberName("");
            }}
          >
            登出
          </Button>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
}
