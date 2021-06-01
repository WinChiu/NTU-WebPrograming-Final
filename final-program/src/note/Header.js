import { React, useState, useContext } from "react";

//import { div, Button } from "react-bootstrap"
import { Breadcrumbs,Link } from '@material-ui/core';
import "./note.css";

 
<link href="https://fonts.googleapis.com/earlyaccess/cwtexyen.css" rel="stylesheet"></link>

function Header() {
    return (
        <div className="header" >
        <div className="header-space" >
            {" "}
        </div>
        <Breadcrumbs aria-label="breadcrumb" className="header-nav">
            <Link color="textPrimary" href="/" className="font">
                關於我們
            </Link>
            <Link color="textPrimary" href="/getting-started/installation/" className="font">
                國內外升學資源
            </Link>
            <Link color="inherit" href="/tofix" className="font">
                高中生學習資源
            </Link>
            <Link color="textPrimary" href="/tofix" className="font">
                登入 / 註冊
            </Link>
        </Breadcrumbs>
        </div>
      );
  }
  
  export default Header;

