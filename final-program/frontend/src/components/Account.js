import React, { useState } from "react";

function Account() {
  const [dataType, setDatatype] = useState("memeber data"); //'member data', 'reservation', 'activity'

  const reservationRecord = (
    <table class="table table-striped mentorReservationRecord-table">
      <thead>
        <tr>
          <th scope="col">預約項目</th>
          <th scope="col">預約時間</th>
          <th scope="col">輔導員</th>
          <th scope="col">地點</th>
          <th scope="col">狀態</th>
          <th scope="col">編號</th>
          <th scope="col">取消預約</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">[國內大學]一對一備審資料輔導</th>
          <td>2021/05/31</td>
          <td>Mark</td>
          <td>國立台灣大學圖書館</td>
          <td className="tutor-state">未完成</td>
          <td>0001</td>
          <td>
            <button className="btn btn-danger">取消</button>
          </td>
        </tr>
        <tr>
          <th scope="row">[國外大學]一對一考試準備輔導</th>
          <td>2021/06/05</td>
          <td>Fred</td>
          <td>線上</td>
          <td className="tutor-state">已完成</td>
          <td>0002</td>
          <td>
            <button className="btn btn-secondary" disabled>
              已完成
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
  const activityRecord = (
    <table class="table table-striped activity-table">
      <thead>
        <tr>
          <th scope="col">活動名稱</th>
          <th scope="col">活動時間</th>
          <th scope="col">活動地點</th>
          <th scope="col">活動簡介</th>
          <th scope="col">狀態</th>
          <th scope="col">編號</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">香港科技大學學長姐分享會</th>
          <td>2021/05/31</td>
          <td>國立台灣大學博雅教學館201教室</td>
          <td>
            <a>活動連結</a>
          </td>
          <td className="tutor-state">未開始</td>
          <td>0001</td>
        </tr>
        <tr>
          <th scope="row">香港科技大學學長姐分享會</th>
          <td>2021/05/31</td>
          <td>國立台灣大學博雅教學館201教室</td>
          <td>
            <a>活動連結</a>
          </td>
          <td className="tutor-state">已結束</td>
          <td>0001</td>
        </tr>
      </tbody>
    </table>
  );

  const memberData = (
    <div className="memberData-container">
      <ul class="list-group">
        <li class="list-group-item">姓名</li>
        <li class="list-group-item">身分</li>
        <li class="list-group-item">電子郵件</li>
      </ul>
      <ul class="list-group">
        <li class="list-group-item">王曉明</li>
        <li class="list-group-item">輔導員</li>
        <li class="list-group-item">example@gmail.com</li>
      </ul>
    </div>
  );

  return (
    <section id="account-management">
      <div className="management-container">
        <h1>會員中心</h1>
        <div className="btn-container">
          <button className="btn btn-primary" onClick={() => setDatatype("member data")}>
            基本資料
          </button>
          <button className="btn btn-primary" onClick={() => setDatatype("reservation")}>
            輔導預約紀錄
          </button>
          <button className="btn btn-primary" onClick={() => setDatatype("activity")}>
            活動紀錄
          </button>
        </div>
        <article className="dash-board">
          {dataType === "member data" ? memberData : dataType === "reservation" ? reservationRecord : activityRecord}
        </article>
      </div>
    </section>
  );
}

export default Account;
