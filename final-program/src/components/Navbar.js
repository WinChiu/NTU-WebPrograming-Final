import React from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import webLogo from "../images/webLogo.png";
export default function Navbar({ memberName, isLogin, setIsLogin, setMemberName }) {

  return (
    <nav>
      <img src={webLogo} alt="logo" className="logo" />
      <div className="tags">
        <Link to="/about" className="nav-link-container">
          <h5 className="nav-tag">關於我們</h5>
        </Link>
        <h5 className="nav-tag">國內外升學資源</h5>
        <Link to="/note">
          <h5 className="nav-tag">學習筆記專區</h5>
        </Link>
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
