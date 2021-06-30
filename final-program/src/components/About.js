import React from "react";
import fakeMemberData from "../data/members";
import { v4 as uuidv4 } from "uuid";
const About = () => {
  return (
    <section id="about">
      <header className="about-header">
        <h1>關於我們</h1>
        <h3>Bibendum tincidunt nullam libero eu facilisis</h3>
      </header>
      <div className="logo-container">
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
            到花青師象異到東子人，家面山雨每遊排的心，子感回。投全生越，雲性他指刻思去動型？力出們華己得標表費層叫能；油通方夫得關我口死、再下智些，錢色向推實玩人臺他位我源者聲音的期文，經水去字才頭歌樂我：聲地商性在標，國影不精我工我。然在
          </p>
        </div>
        <div className="purposeImg"></div>
      </article>
      <article className="team-intro">
        <div className="intro-content-container">
          <h2>團隊成員</h2>
          <p className="body1">
            到花青師象異到東子人，家面山雨每遊排的心，子感回。投全生越，雲性他指刻思去動型？力出們華己得標表費層叫能；油通方夫得關我口死、再下智些，錢色向推實玩人臺他位我源者聲音的期文，經水去字才頭歌樂我：聲地商性在標，國影不精我工我。然在
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
                      <h4>{member.name}</h4>
                      <p className="body1">{member.description}</p>
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
                      <h4>{member.name}</h4>
                      <p className="body1">{member.description}</p>
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
