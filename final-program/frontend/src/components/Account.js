import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button, List, Typography, Divider, Timeline } from "antd";
import { Card, Col, Row } from "antd";
import { fetchMemberData } from "../api/account";
import { v4 as uuidv4 } from "uuid";

// I add
import NOTE from "./note/Note"
import { Spin } from "antd";
function Account({ memberName, isLogin }) {
  const { Meta } = Card;
  const { Column, ColumnGroup } = Table;
  const [dataType, setDatatype] = useState("member data"); //'member data', 'reservation', 'activity'
  const [memberData, setMemberData] = useState([]);
  const [ownNoteData, setOwnNoteData] = useState([]);
  const [buyNoteData, setBuyNoteData] = useState([]);
  const [activityRecordData, setActivityRecordData] = useState([]);
  const [reservationRecordData, setReservationRecordData] = useState([]);

  // I add
  // of no use, only need to make the note 
  const [money,setMoney] = useState(-1)
  const [finishBuyNote,setFinishBuyNote] = useState(false)
  const [finishOwnNote,setFinishOwnNote] = useState(false)

  // eslint-disable-next-line no-extend-native
  Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小時
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      S: this.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return fmt;
  };

  useEffect(() => {
    const fetchData = async () => {
      const memberDataFetch = await fetchMemberData(memberName);

      setMemberData([memberDataFetch.name, memberDataFetch.memberType, memberDataFetch.email, memberDataFetch.money]);
      setOwnNoteData(memberDataFetch.ownNote);
      setFinishOwnNote(true)
      setBuyNoteData(memberDataFetch.noteBuy);
      setFinishBuyNote(true)
      setActivityRecordData(memberDataFetch.attendActivity);
      setReservationRecordData(memberDataFetch.reservation);
    };
    if (memberName !== "") fetchData();
  }, [memberName]);

  const reservationRecord = (
    <Table dataSource={reservationRecordData}>
      <Column title="輔導種類" dataIndex="title" key="title" />
      <Column
        title="活動時間"
        dataIndex="date"
        key="date"
        render={(date) => {
          return <>{new Date(date).format("yyyy-MM-dd hh:mm:ss")}</>;
        }}
      />
      <Column
        title="輔導員"
        dataIndex="mentor"
        key="mentor"
        render={(mentor) => {
          return <>{mentor.name}</>;
        }}
      />
      <Column
        title="狀態"
        dataIndex="status"
        key="status"
        render={(status) => <Tag color={status === "已完成" ? "green" : "red"}>{status}</Tag>}
      />
    </Table>
  );

  const activityRecord = (
    <Table dataSource={activityRecordData}>
      <Column title="活動名稱" dataIndex="title" key="title" />
      <Column
        title="活動時間"
        dataIndex="time"
        key="time"
        render={(time) => {
          return <>{new Date(time).format("yyyy-MM-dd hh:mm:ss")}</>;
        }}
      />
      <Column title="活動地點" dataIndex="location" key="location" />
      <Column
        title="活動簡介"
        dataIndex="description"
        key="description"
        render={(text, record) => (
          <Space size="middle">
            <a href={text}>{text}</a>
          </Space>
        )}
      />
      <Column
        title="狀態"
        dataIndex="status"
        key="status"
        render={(status) => <Tag color={status === "已完成" ? "green" : "red"}>{status}</Tag>}
      />
    </Table>
  );

  const member = (
    <List
      itemLayout="horizontal"
      dataSource={memberData}
      renderItem={(item, id) => (
        <List.Item>
          <List.Item.Meta
            title={id === 0 ? "姓名" : id === 1 ? "身分" : id === 2 ? "電子信箱" : "錢包"}
            description={item}
          />
        </List.Item>
      )}
    />
  );
  // I add
  const ownNote = (
    <div className="site-card-wrapper">
      { finishOwnNote
      ?
      (
      ownNoteData.map((note, id) => {
        if (id % 4 === 0) {
          return (
            <Row gutter={8} key={uuidv4()}>
              {ownNoteData.map((note, id2) => {
                if (id2 >= id && id2 < id + 4) {
                  return (
                    <Col span={6} key={uuidv4()}>
                      <NOTE note={note} isLogin={isLogin} memberName={memberName} money={money} setMoney={setMoney}/>
                      {/*
                      <Card
                        hoverable
                        cover={
                          <div style={{ width: "100%", overflow: "hidden" }}>
                            <img
                              alt="example"
                              style={{ width: "100%", height: "80%" }}
                              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                            />
                          </div>
                        }
                      >
                        <Meta title={`${note.title}`} description={`${note.grade}`} />
                      </Card>
                      */
                      }
                    </Col>
                  );
                }
              })}
            </Row>
          );
        }
      })
      )
      :
      ( <Spin tip={"loading..."} style={{position:"absolute", left:"50%", top:"50%"}}/>)
      }
    </div>
  );
  // I add
  const buyNote = (
    <div className="site-card-wrapper">
      {finishBuyNote
      ?
       ( buyNoteData.map((note, id) => {
        if (id % 4 === 0) {
          return (
            <Row gutter={8} key={uuidv4()}>
              {buyNoteData.map((note, id2) => {
                if (id2 >= id && id2 < id + 4) {
                  return (
                    <Col span={6} key={uuidv4()}>
                      <NOTE note={note} isLogin={isLogin} memberName={memberName} money={money} setMoney={setMoney}/>
                      {/*
                      <Card
                        hoverable
                        cover={
                          <div style={{ width: "100%", overflow: "hidden" }}>
                            <img
                              alt="example"
                              style={{ width: "100%", height: "80%" }}
                              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                            />
                          </div>
                        }
                      >
                        <Meta title={`${note.title}`} description={`${note.grade}`} />
                      </Card>
                      */}
                    </Col>
                  );
                }
              })}
            </Row>
          );
        }
      }))
        :
      ( <Spin tip={"loading..."} style={{position:"absolute", left:"50%", top:"50%"}}/>)
      }
    </div>
  );

  return (
    <section id="account-management">
      <div className="management-container">
        <h1>會員中心</h1>
        <div className="btn-container">
          <Space size="small">
            <Button type="primary" onClick={() => setDatatype("member data")}>
              基本資料
            </Button>
            <Button type="primary" onClick={() => setDatatype("reservation")}>
              輔導預約紀錄
            </Button>
            <Button type="primary" onClick={() => setDatatype("activity")}>
              活動紀錄
            </Button>
            <Button type="primary" onClick={() => setDatatype("buyNote")}>
              已購筆記
            </Button>
            <Button type="primary" onClick={() => setDatatype("ownNote")}>
              我的筆記
            </Button>
          </Space>
        </div>
        <article className="dash-board">
          {dataType === "member data"
            ? member
            : dataType === "reservation"
            ? reservationRecord
            : dataType === "activity"
            ? activityRecord
            : dataType === "ownNote"
            ? ownNote
            : buyNote}
        </article>
      </div>
    </section>
  );
}

export default Account;
