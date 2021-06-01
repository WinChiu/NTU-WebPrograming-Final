import { React, useState, useEffect } from "react";
import "../../style/note.css";
import noteimg from "./images/test.jpg"
//使用所有antd都需引入CSS
import 'antd/dist/antd.css';
import { Rate , Modal, Image , message} from 'antd';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { blue } from "@material-ui/core/colors";
<>
<link href="https://fonts.googleapis.com/earlyaccess/cwtexyen.css" rel="stylesheet"></link>
<link href="https://fonts.googleapis.com/earlyaccess/cwtexyen.css https://fonts.googleapis.com/css?family=Noto+Sans+TC" rel="stylesheet"></link>
</>

const imageStyles = makeStyles((theme) => ({
  root: {
    /*display: 'flex',
    flexWrap: 'wrap',*/
    minWidth: 200,
    /*width: '100%',*/
  },
  image: {
    margin:"40px",
    marginBottom:"180px",
    //position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    //position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  text:{
    position:"absolute",
    top:210,
    left:0,
    fontFamily:"'Noto Sans TC','Microsoft JhengHei ','cwTeXYen'",
    fontSize:"16px",
    marginLeft: "30px",
    marginRight: "10px",
    //使文字置中
    //top:"50%",
    //left: "50%",
    //transform: "translate(-50%, 0%)",

  },
  texttitle:{
    fontWeight:"bold",
    fontSize:"20px",
  },
  textsubject:{
    color:"blue",
  },
  rate:{
    position:"absolute",
    top: 360,
    left :12,
  }
}));


/*
Note = {
  title: "",
  grade: 0,
  subject: "",
  tag: "",
  img: "",(應小於16MB)
}

*/

const Note = (props) =>{
    const imgs = imageStyles();
    const [notetitle, setNotetitle] = useState('');
    const [notegrade, setNotegrade] = useState(-1);
    const [notesubject, setNotesubject] = useState('');
    const [notetag, setNotetag] = useState(["英文","數學","物理","網路服務程式設計"]);
    const [modal,setModal] = useState(false);
    //const [noteimg, setNoteimg] = useState({});

    const showModal = () => {
      setModal(true);
    };

    const handleOk = () => {
      setModal(false);
      message.success('購買成功');
    };

    const handleCancel = () => {
      setModal(false);
    };



    const handleChange_title = (event) => {
        setNotetitle(event.target.value);
    };

    const handleChange_grade = (event) => {
        setNotegrade(event.target.value);
    };

    const handleChange_subject = (event) => {
        setNotesubject(event.target.value);
    };


    useEffect(() => {
      setNotegrade(props.note.grade);
      setNotesubject(props.note.subject);
      setNotetitle(props.note.title);
      setNotetag(props.note.tag);
      //setNoteimg(props.note.img);
    }, []);


    return (
        <>
        <ButtonBase
          focusRipple
          key={props.note.title}
          className={imgs.image}
          focusVisibleClassName={imgs.focusVisible}
          style={{
            /*TOFIX*/
            /*width: props.note.width,*/
            width: "150px",
          }
          }
          onClick={showModal}
        >
          <span
            className={imgs.imageSrc}
            style={{
            backgroundImage: `url(${noteimg})`,
             //backgroundImage: `url(${props.note.url})`,
            }}
          />
          <span className={imgs.imageBackdrop} />
          <span className={imgs.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={imgs.imageTitle}
            >
              {props.note.title}
              <span className={imgs.imageMarked} />
            </Typography>
          </span>
          <span className={imgs.text}>
            <div className={imgs.texttitle}>
            {props.note.title}
            </div>
            <div className={imgs.textauthor}>
            {
            props.note.author.length >= 5
            ?
              `作者 : ${props.note.author}`
            :
              `作者 : ${props.note.author}
              `
            }
            </div>
            <div className={imgs.textgrade}>
            年級 : {props.note.grade}
            </div>
            <div className={imgs.textsubject}>
            {props.note.subject}
            </div>
            <div className={imgs.texthassold}>
            觀看次數 : {props.note.hassold}
            </div>
            <div className={imgs.textprice}>
            售價 : {props.note.price}
            </div>
          </span>
          <span className={imgs.rate}>
            <Rate disabled defaultValue={props.note.rate} allowHalf={true} />
          </span>
        </ButtonBase>
        <Modal title={"購買筆記"} visible={modal} okText="購買" cancelText="取消" width="600px"
                onOk={handleOk} onCancel={handleCancel} centered={true}
        >
          <div className="confirm">
          <div className="confrim_photo">
              <Image.PreviewGroup>
              <Image
                width={200}
              src={noteimg}
            />
          </Image.PreviewGroup>
          </div>
          <div className="confirm_buy">
            <p className="modal_texttitle">
            {props.note.title}
            </p>
            <div className="modal_textauthor">
            {
            props.note.author.length >= 5
            ?
              `作者 : ${props.note.author}`
            :
              `作者 : ${props.note.author}
              `
            }
            </div>
            <div className="modal_textgrade">
            年級 : {props.note.grade}
            </div>
            <div className="modal_textsubject">
            科目 : {props.note.subject}
            </div>
            <div className="modal_texthassold">
            觀看次數 : {props.note.hassold}
            </div>
            <div className="modal_textprice">
            售價 : {props.note.price}
            </div>
            <span className="modal_rate">
              <Rate disabled defaultValue={props.note.rate} allowHalf={true}/>
            </span>
          </div>
            </div>
          <p className="confirm_description">
            介紹: ......
          </p>
        </Modal>
        </>
      );
  }

  export default Note;












