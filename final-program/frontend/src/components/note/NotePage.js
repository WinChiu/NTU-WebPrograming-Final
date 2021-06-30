import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

//files
//css file
import "../../style/note.css";
//The component of each note
import Note from "./Note";

//The fake data for test
import notes_fake from "../../data/notes.js";

//The api for fetch/post data from backend
import { getItems } from "../../api/note";
import { fetchMemberData } from "../../api/account";
import { testAddMoney, testResetMoney } from "../../api/account_note";

//package
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Button, message, Spin, Alert } from "antd";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(6.5),
      marginRight: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

/*
const tagsStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));
*/
// the fetch data(all notes in MongoDB) stores globally since we don't want to fetch too many times
// var allnotes = []
// var member = []

//remember the passing parameters is a object consist of all parameters
const NoteIndex = ({ memberName, isLogin }) => {
  // the fetch data(all notes in MongoDB) stores globally since we don't want to fetch too many times
  const [allnotes, setAllNotes] = useState([]);
  const [member, setMember] = useState({});

  // change after click search button
  const [keyword, setKeyword] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");

  // change before click search button but after input something
  const [tempkeyword, setTempKeyword] = useState("");
  const [tempgrade, setTempgrade] = useState("");
  const [tempsubject, setTempsubject] = useState("");

  // the notes displayed (filter by search)
  const [notes, setNotes] = useState([]);

  // the money the member have
  const [money, setMoney] = useState(-1);

  // the status whether finish fetch data
  const [finish, setFinish] = useState(false);

  const handleChange_keyword = (event) => {
    setTempKeyword(event.target.value);
  };

  const handleChange_grade = (event) => {
    setTempgrade(event.target.value);
  };

  const handleChange_subject = (event) => {
    setTempsubject(event.target.value);
  };

  const handleClick_search = async () => {
    setGrade(tempgrade);
    setSubject(tempsubject);
    setKeyword(tempkeyword);

    //這裡我們需要使用temp來判斷而非上面的state，因為setstate 可能尚未完成就會進行下列程式碼，而await 對setState 不起作用
    setNotes(
      allnotes.filter((note) => {
        return (
          (note.grade === tempgrade || tempgrade === "") &&
          (note.subject === tempsubject || tempsubject === "") &&
          (note.title.search(tempkeyword) !== -1 || tempkeyword === "")
        );
      })
    );
  };

  const handleClick_unLogin = () => {
    message.warning("要先登入才能開始販賣自己的筆記喔");
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getItems();
      console.log("fetch note:", result);
      setNotes(result);
      let member_temp;
      if (isLogin !== "notLogin") {
        member_temp = await fetchMemberData(memberName);
        setMember(member_temp);
        console.log("fetch member:", member_temp);
        setMoney(member_temp.money);
      }
      setAllNotes(result);
      setFinish(true);
    };
    fetchData();
  }, []);

  /* test for fake data
    useEffect(() => {
      setNotes(notes_fake);
    }, []);
    */

  const cp_rate = (a, b) => {
    if (a.rate < b.rate) return 1;
    else if (a.rate === b.rate) return 0;
    else return -1;
  };
  const cp_hassold = (a, b) => {
    if (a.hassold < b.hassold) return 1;
    else if (a.hassold === b.hassold) return 0;
    else return -1;
  };
  const cp_price = (a, b) => {
    if (a.price > b.price) return 1;
    else if (a.price === b.price) return 0;
    else return -1;
  };

  const handleClick_sort_by_rate = (event) => {
    //若使用 notes.sort(cp_rate) 會無法rerender
    setNotes([...notes].sort(cp_rate));
    console.log(notes.map((e) => e));
  };
  // 直接用filter 搜尋也可
  const handleClick_sort_by_hassold = (event) => {
    setNotes([...notes].sort(cp_hassold));
    console.log(notes.map((e) => e));
  };
  const handleClick_sort_by_price = (event) => {
    setNotes([...notes].sort(cp_price));
    console.log(notes.map((e) => e));
  };

  // only for the teacher and TAs test
  const add_money = async () => {
    let newMoney = await testAddMoney(memberName);
    setMember({ ...member, money: newMoney });
    setMoney(newMoney);
  };

  const reset_money = async () => {
    let newMoney = await testResetMoney(memberName);
    setMember({ ...member, money: newMoney });
    setMoney(newMoney);
  };

  return (
    <section id="note">
      <div className="search">
        <div className="form">
          <FormControl className={BootstrapInput.margin}>
            <InputLabel htmlFor="grade" style={{ color: "white", fontSize: "28px" }}>
              年級
            </InputLabel>
            <NativeSelect
              id="grade"
              value={tempgrade}
              onChange={handleChange_grade}
              input={<BootstrapInput/>}
            >
              <option aria-label="None" value="" />
              <option value={"小一"}>小一</option>
              <option value={"小二"}>小二</option>
              <option value={"小三"}>小三</option>
              <option value={"小四"}>小四</option>
              <option value={"小五"}>小五</option>
              <option value={"小六"}>小六</option>
              <option value={"國一"}>國一</option>
              <option value={"國二"}>國二</option>
              <option value={"國三"}>國三</option>
              <option value={"高一"}>高一</option>
              <option value={"高二"}>高二</option>
              <option value={"高三"}>高三</option>
              <option value={"其它"}>其它</option>
            </NativeSelect>
          </FormControl>
          <FormControl className={BootstrapInput.margin}>
            <InputLabel htmlFor="subject" style={{ color: "white", fontSize: "28px" }}>
              科目
            </InputLabel>
            <NativeSelect
              id="subject"
              value={tempsubject}
              onChange={handleChange_subject}
              input={<BootstrapInput placeholder="科目" />}
            >
              <option aria-label="None" value="" />
              <option value={"國文"}>國文</option>
              <option value={"英文"}>英文</option>
              <option value={"數學"}>數學</option>
              <option value={"物理"}>物理</option>
              <option value={"化學"}>化學</option>
              <option value={"歷史"}>歷史</option>
              <option value={"地理"}>地理</option>
              <option value={"公民"}>公民</option>
              <option value={"網路服務程式"}>網路服務程式</option>
              <option value={"其它"}>其它</option>
            </NativeSelect>
          </FormControl>

          <FormControl className={BootstrapInput.margin}>
            <InputLabel htmlFor="keyword" style={{ color: "black", fontSize: "28px", visibility: "visible" }}>
              關鍵字
            </InputLabel>
            <BootstrapInput id="keyword" onChange={handleChange_keyword} placeholder="關鍵字" />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className="button"
            startIcon={<SearchIcon />}
            onClick={handleClick_search}
          >
            搜尋筆記
          </Button>
        </div>
      </div>

      <div className="tags">
        <div className="tagtype" id="tagtype2">
          {" "}
          {" 排序方式 "}
          <Button type="primary" className="tag" onClick={handleClick_sort_by_rate}>
            評分從高到低
          </Button>{" "}
          <Button type="primary" className="tag" onClick={handleClick_sort_by_hassold}>
            觀看數從高到低
          </Button>{" "}
          <Button type="primary" className="tag" onClick={handleClick_sort_by_price}>
            價格從低到高
          </Button>
        </div>
      </div>
      {finish === true ? (
        <div className="notes">
          {notes !== undefined ? (
            notes.map((note, index) => (
              <Note
                note={note}
                key={index}
                isLogin={isLogin}
                memberName={memberName}
                money={money}
                setMoney={setMoney}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div>
        <div className="loading1">
          <Spin tip="Loading..."/>
        </div>
        {/*
        <div className="loading2">
            <Alert message="加載中..." description="因檔案較大，請稍候..." type="info" />
        </div>
        */
        }
          <div className="loading-scroll">loading</div>
        </div>
      )}
      <div className="enter_add_note">
        {isLogin !== "notLogin" ? (
          <>
            {money !== -1 ? (
              <div>你擁有的的錢: $ {money}</div>
            ) : (
              <div>
                你擁有的的錢: <Spin size="small" />
              </div>
            )}
            <Link to="/uploadNote">
              <Button type="primary" shape="round">
                販賣你自己的筆記!
              </Button>
            </Link>
          </>
        ) : (
          <Button type="primary" shape="round" onClick={handleClick_unLogin}>
            販賣你自己的筆記!
          </Button>
        )}
      </div>

      {/*only for the teacher and TAs test*/}
      {isLogin === "notLogin" ? (
        <></>
      ) : (
        <div className="money">
          <h6>測試時若錢不夠:</h6>

          <Button onClick={add_money}>加 500</Button>
          <Button onClick={reset_money}>重置成 0</Button>
        </div>
      )}

      {/*only for test scrolling*/}
      {/*
        <div className="test">
            1
        </div>
        */}
    </section>
  );
};

export default NoteIndex;