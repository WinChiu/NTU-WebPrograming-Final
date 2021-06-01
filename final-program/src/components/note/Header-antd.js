import { React, useState, useContext } from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import "../../style/note.css";

<link href="https://fonts.googleapis.com/earlyaccess/cwtexyen.css" rel="stylesheet"></link>

function Header() {
    return (
         <Layout className="layout">
        <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
         </Menu>
        </Header>
        </Layout>


      );
  }

  export default Header;

