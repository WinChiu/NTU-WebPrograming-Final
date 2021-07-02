import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginAccount, registerAccount } from "../api/login.js";
import { Form, Input, Button, Checkbox, Select } from "antd";
import studentAvatar from "../images/student_avatar.png";
import mentorAvatar from "../images/mentor_avatar.png";

function Login({ setIsLogin, setMemberName }) {
  const history = useHistory();
  const [loginStage, setLoginStage] = useState("login type"); // "login type", "login", "register"
  const [memberType, setMembertype] = useState("not member"); // "not member", "student", "mentor"
  const [warningMsg, setWarningMsg] = useState("");

  const loginHandler = (stage, member) => {
    setLoginStage(stage);
    setMembertype(member);
  };

  const loginType = (
    <div className="login-type login-container">
      <div className="types">
        <div className="login-as-student-btn type">
          <img className="student-logo type-logo" src={studentAvatar} alt="student_avatar" />

          <Button
            type="primary"
            className="Im-student Im-btn btn btn-info"
            onClick={() => loginHandler("login", "student")}
          >
            我是學生
          </Button>
        </div>
        <div className="login-as-mentor-btn type">
          <img className="mentor-logo type-logo" src={mentorAvatar} alt="student_avatar" />
          <Button
            type="primary"
            className="Im-mentor Im-btn btn btn-info"
            onClick={() => loginHandler("login", "mentor")}
          >
            我是輔導員
          </Button>
        </div>
      </div>
      <div className="not-member">
        <h5>我不是會員!</h5>
        <Button
          type="primary"
          className="btn btn-success register-btn "
          onClick={() => loginHandler("register", "not member")}
        >
          免費註冊帳號
        </Button>
      </div>
    </div>
  );

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 2,
      span: 16,
    },
  };
  const onFinish = async (values) => {
    setWarningMsg("");
    const msg = await loginAccount(values.username, values.password, memberType);
    if (msg === "Account not exist") {
      setWarningMsg("帳號不存在");
    } else if (msg === "Password error") {
      setWarningMsg("密碼錯誤");
    } else {
      setWarningMsg("");
      setIsLogin("login");
      setMemberName(values.username);
      history.push("/about");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const toLoginType = () => {
    setLoginStage("login type");
    setMembertype("not member");
    setWarningMsg("");
  };
  const login = (
    <div className="login-type login-container">
      <img className="login-logo" src={memberType === "student" ? studentAvatar : mentorAvatar} alt="" />
      <p style={{ color: "red", fontWeight: "bold" }}>{warningMsg}</p>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="default" style={{ marginRight: "8px" }} onClick={toLoginType}>
            上一頁
          </Button>
          <Button type="primary" htmlType="submit">
            登入
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  const onFinishRegister = async (values) => {
    const msg = await registerAccount(values.username, values.password, values.memberType, values.email, 3000);
    if (msg === "Account exist") {
      setWarningMsg("存在相同名稱或信箱");
    } else {
      setIsLogin("login");
      setMemberName(values.username);
      history.push("/about");
    }
  };
  const onFinishFailedRegister = (errorInfo) => {
    console.log(errorInfo);
  };
  const register = (
    <div className="login-type login-container">
      <div className="register-logo"></div>
      <p style={{ color: "red", fontWeight: "bold" }}>{warningMsg}</p>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinishRegister}
        onFinishFailed={onFinishFailedRegister}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "Please input your email!",
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Member Type" name="memberType" rules={[{ required: true }]}>
          <Select>
            <Select.Option value="student">student</Select.Option>
            <Select.Option value="mentor">mentor</Select.Option>
          </Select>
        </Form.Item>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          註冊
        </Button>
        <Button type="default" style={{ float: "right", marginRight: "8px" }} onClick={toLoginType}>
          上一頁
        </Button>
      </Form>
    </div>
  );

  return (
    <section id="login">{loginStage === "login type" ? loginType : loginStage === "login" ? login : register}</section>
  );
}

export default Login;
