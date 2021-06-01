import { React, useState, useEffect } from "react";

//import { div, Button } from "react-bootstrap"
import "./note.css"
import Note from "./Note"
import { Modal} from 'antd';
import searchbackground from "./images/search-background.jpg";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import SIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
      marginRight:  theme.spacing(3),
    },
  },
  input: {

    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },

}))(InputBase);


const tagsStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const images = [
  {
    title: '123英文',
    grade: "小一",
    subject: "英文",
    author: "小白小子",
    rate: 2.5,
    price: 100,
    hassold: 9,
  },
  {
    title: '數學',
        grade: "小一",
    subject: "數學",
    author: "小黑",
    rate: 2.5,
    price: 100,
    hassold: 9,
    tag: [],
  },
  {
    title: '數學',
        grade: "小一",
    subject: "數學",
    author: "小黃",
    rate: 4.5,
    hassold: 9,
    price: 100,
  },
    {
    title: '物理',
        grade: "國二",
    subject: "物理",
    author: "小藍",
    rate: 2,
    hassold: 9,
    price: 100000,
  },
    {
    title: '網服',
        grade: "小五",
    subject: "網路服務程式",
    author: "小紫",
    rate: 5,
    hassold: 9,
    price: 500,
  },
    {
    title: '數學',
        grade: "小六",
    subject: "英文",
    author: "小白",
    rate: 2.5,
    hassold: 9,
    price: 100,
  },
    {
    title: '國文',
        grade: "國三",
    subject: "英文",
    author: "小白",
    rate: 2.5,
    hassold: 97,
    price: 100,
  },
    {
    title: '歷史',
    grade: "小二",
    subject: "英文",
    author: "小白",
    rate: 2.5,
    hassold: 89,
    price: 100,
  },
    {
    title: '生物',
    grade: "高三",
    subject: "英文",
    author: "小白",
    rate: 2.5,
    hassold: 1,
    price: 100,
  },
];


const NoteIndex = () =>{
    const classes = tagsStyles();
    const [keyword, setKeyword] = useState('');
    const [grade, setGrade] = useState("");
    const [subject, setSubject] = useState('');
    const [tempkeyword, setTempKeyword] = useState("");
    const [tempgrade, setTempgrade] = useState("");
    const [tempsubject, setTempsubject] = useState('');    
    const [hottag, setHottag] = useState(["英文","數學","物理","網路服務程式設計"]);
    const [notes, setNotes] = useState([]);
    const handleChange_keyword = (event) => {
        setTempKeyword(event.target.value);
    };

    const handleChange_grade = (event) => {
        setTempgrade(event.target.value);
    };
    
    const handleChange_subject = (event) => {
        setTempsubject(event.target.value);
    };

    const handleClick_search = async ()=>{

        setGrade(tempgrade);
        setSubject(tempsubject);
        setKeyword(tempkeyword);
        //這裡我們需要使用temp來判斷而非上面的state，因為setstate 可能尚未完成就會進行下列程式碼，而await 對setState 不起作用
        setNotes(images.filter(note=>
            (note.grade === tempgrade || tempgrade === "") && (note.subject === tempsubject || tempsubject === "") && (note.title.search(tempkeyword)!==-1 || tempkeyword === "")
          
          )
        )
    }

    useEffect(() => {
      setNotes(images);
    }, []);    

    const cp_rate= (a,b) =>{
        if (a.rate < b.rate)
          return 1
        else if (a.rate === b.rate)
          return 0
        else 
          return -1
    }
    const cp_hassold = (a,b) => {
        if (a.hassold < b.hassold)
          return 1
        else if (a.hassold === b.hassold)
          return 0
        else 
          return -1

     }
     const cp_price = (a,b) => {
        if (a.price > b.price)
          return 1
        else if (a.price === b.price)
          return 0
        else 
          return -1

      }
    

    const handleClick_sort_by_rate = (event) => {
      //若使用 notes.sort(cp_rate) 會無法rerender
      setNotes([...notes].sort(cp_rate))
      console.log(notes.map(e=>e))
    }
    // 直接用filter 搜尋也可
    const handleClick_sort_by_hassold = (event) => {
      setNotes([...notes].sort(cp_hassold))
      console.log(notes.map(e=>e))
    }
    const handleClick_sort_by_price = (event) => {
      setNotes([...notes].sort(cp_price))
      console.log(notes.map(e=>e))
    }
    return (
        <>
        <div className="search" style={{backgroundImage:`url(${searchbackground})`, backgroundSize:"contain"}}>
        <div className="form">
          <FormControl className={BootstrapInput.margin}>
            <InputLabel htmlFor="grade" style={{color: 'white', fontSize:"28px" }}>年級</InputLabel>
            <NativeSelect
              id="grade"
              value={tempgrade}
              onChange={handleChange_grade}
              input={<BootstrapInput placeholder="年級"/>}
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
            </NativeSelect>
        </FormControl>
        <FormControl className={BootstrapInput.margin}>
            <InputLabel htmlFor="subject" style={{ color: 'white', fontSize:"28px"}}>科目</InputLabel>
            <NativeSelect
              id="subject"
              value={tempsubject}
              onChange={handleChange_subject}
              input={<BootstrapInput placeholder="科目"/>}
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
            </NativeSelect>
        </FormControl>
        
        <FormControl className={BootstrapInput.margin} >
            <InputLabel htmlFor="keyword"  style={{ color: 'black', fontSize:"28px" ,visibility:"visible"}}>關鍵字</InputLabel>
            <BootstrapInput id="keyword" onChange={handleChange_keyword} placeholder="關鍵字"/>
        </FormControl> 
        </div>
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
        <div className="tags" >
            <div className="tagtype" id="tagtype1"> 熱門標籤{"  "}
            {/* TOFIX
            hottag.map((e,index)=>{
                <div>e</div>
            })*/
            }
            {/*borderRadius無效*/}
            <Button variant="contained" className="tag">英文</Button>
            {" "}
            <Button variant="contained" className="tag">數學</Button>
            {" "}
            <Button variant="contained" className="tag">網路服務程式設計</Button>

            </div>
            <div className="tagtype" id="tagtype2">  {" 排序方式 "}
            <Button variant="contained" className="tag" onClick={handleClick_sort_by_rate}>評分從高到低</Button>
            {" "}
            <Button variant="contained" className="tag" onClick={handleClick_sort_by_hassold}>觀看數從高到低</Button>
            {" "}
            <Button variant="contained" className="tag" onClick={handleClick_sort_by_price}>價格從低到高</Button>

            </div>
        </div>
        <div className="notes">
        {/*subject === ""
        ?
        grade === ""
          ? // 不指定科目與年級
          notes.map((note,index)=>(
            <>
            <Note note={note} key={index}/>
            <div></div>
            </>
          ))
          : // 只指定年級
          notes.map((note,index)=>(
            note.grade === grade
              ?
              <Note note={note} key={index}/>
              :
              <div></div> 
          ))
        :
        grade === ""
          ?// 只指定科目
          notes.map((note,index)=>(
              note.subject === subject
              ?
              <Note note={note} key={index}/>
              :
              <div></div>
          ))
          ://指定科目與年級d
          notes.map((note,index)=>(
              note.subject === subject && note.grade === grade
              ?
              <Note note={note} key={index}/>
              :<div></div>
          ))
        
         */}
          {notes.map((note,index)=>(

            <Note note={note} key={index}/>
          ))}
        </div>
        
        {/*only for test scrolling*/}
        
        <div className="test">
            1
        </div>
        </>
      );
  }
  
  export default NoteIndex;

