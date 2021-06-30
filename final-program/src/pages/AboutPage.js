import React from "react";
import fakeMemberData from "../data/members";
import { v4 as uuidv4 } from "uuid";
const About = () => {
  return (
    <section id="about">
      <header className="about-header">
        <h1>關於我們</h1>
      </header>
      <div className="logo-container">
        <img src="https://www.ntu.edu.tw/images/logo.png" alt="ntu" className="school-logo" />
        <img src="https://www.ntu.edu.tw/images/logo.png" alt="ntu" className="school-logo" />
        <img src="https://www.ntu.edu.tw/images/logo.png" alt="ntu" className="school-logo" />
        <img src="https://www.ntu.edu.tw/images/logo.png" alt="ntu" className="school-logo" />
        <img src="https://www.ntu.edu.tw/images/logo.png" alt="ntu" className="school-logo" />
        <img src="https://www.ntu.edu.tw/images/logo.png" alt="ntu" className="school-logo" />
      </div>
      <article className="found-purpose">
        <div className="purpose-container">
          <h2>成立宗旨</h2>
          <p className="body1">
            在台灣的升學體制以考試成績為最優先的評比標準，學生們在努力取得好成績的同時，難以花更多的時間去了解國內外大學的學系資訊。往往到了課業繁重的高三才真正開始思考自己究竟想要讀甚麼，而網路上的資料雜亂且制式，無法解答自己的疑惑。因此我們希望透過一對一的交流，來分享我們自身的求學經驗，幫助到更多迷惘的學生。
          </p>
        </div>
        <div className="purposeImg"></div>
      </article>
      <article className="team-intro">
        <div className="intro-content-container">
          <h2>團隊成員</h2>
          <p className="body1">
            我們是一群國內外大學的大學生，熱衷於將我們自身的升學經驗分享給高中生們，期待大家都可以申請到自己想要的大學。
          </p>
        </div>
        <div className="members">
          <div className="member-column-left member-column">
            {fakeMemberData.map((member, id) => {
              if (id % 2 === 0) {
                return (
                  <div key={uuidv4()} className="member-data">
                    <div className="member-photo" style={{ backgroundImage: `url(${member.photo})` }}></div>
                    <div className="member-description">
                      <h4 style={{ marginBottom: "12px" }}>{member.name}</h4>
                      <p className="body1">
                        <span style={{ fontWeight: "bold" }}>{member.school}</span>
                        <br />
                        {member.description}
                      </p>
                    </div>
                  </div>
                );
              } else {
                return <></>;
              }
            })}
          </div>
          <div className="member-column-right member-column">
            {fakeMemberData.map((member, id) => {
              if (id % 2 === 1) {
                return (
                  <div key={uuidv4()} className="member-data">
                    <div className="member-photo" style={{ backgroundImage: `url(${member.photo})` }}></div>
                    <div className="member-description">
                      <h4 style={{ marginBottom: "12px" }}>{member.name}</h4>
                      <p className="body1">
                        <span style={{ fontWeight: "bold" }}>{member.school}</span>
                        <br />
                        {member.description}
                      </p>
                    </div>
                  </div>
                );
              } else {
                return <></>;
              }
            })}
          </div>
        </div>
      </article>
    </section>
  );
};

export default About;
