import { React, useState, useEffect } from "react";
import "../../style/note.css";


//data
import noteimg from "../../data/images/test.jpg"

//api for backend
import {buyNote,fetchAuthor,checkHaveBuy} from "../../api/account_note"

// package
import 'antd/dist/antd.css';
import { Rate , Modal, Image , message,Button} from 'antd';
import { makeStyles} from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';


// font-family
<>
<link href="https://fonts.googleapis.com/earlyaccess/cwtexyen.css" rel="stylesheet"></link>
<link href="https://fonts.googleapis.com/css?family=Noto+Sans+TC" rel="stylesheet"></link>
</>

// style for the note button
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


const Note = (props) =>{
    const imgs = imageStyles();
    const [hassold,setHasSold] = useState(-1);
    const [modal,setModal] = useState(false);
    const [author, setAuthor] = useState("");
    const [haveBuy, setHaveBuy] = useState("");
    const [haveRate,setHaveRate] = useState(false);

    const showModal = () => {
      setModal(true);
    };

    const handleBuy = async() => {
      if (props.isLogin !== "notLogin"){
          if(props.money < props.note.price){
            message.error("您的剩餘金錢不夠喔~")
          }
        else {
          let msg = await buyNote(props.memberName,props.note.title)
          setModal(false);
          props.setMoney(props.money - props.note.price)
          console.log(props.money - props.note.price)
          console.log(msg)
          setHasSold(hassold + 1)
          setHaveBuy("buy")
          message.success('購買成功');
        }
      }
      else 
        message.warning("請先登入後再購買")
    };

    const handleDownload = () => {
      //
      window.open(`${props.note.title}.pdf`)
    }

    const handleCancel = () => {
      setModal(false);
    };

    const handleUnLogin = () => {
        message.warning("需要先登入才可購買")
    }



    useEffect( async () => {
      if(props.note.author){
        let temp = await fetchAuthor(props.note.author)
        setAuthor(temp);
      }
      setHasSold(props.note.hassold);
      if(props.isLogin!=="notLogin"){
        setHaveBuy(await checkHaveBuy(props.note._id,props.memberName))
        /*
        if(HaveBuy){
          setHaveRate(await checkHaveRate(props.note._id,props.memberName))
        }
        */
      }
    }, []);


    return (
        <>
        <ButtonBase
          focusRipple
          key={props.note.title}
          className={imgs.image}
          focusVisibleClassName={imgs.focusVisible}
          style={{
            width: "150px",
          }
          }
          onClick={showModal}
        >
          <span
            className={imgs.imageSrc}
            style={
              props.note.img === ""
              ?    
              {
                backgroundImage: `url(${noteimg})`,
              }
              :
              {
                backgroundImage: `url(${props.note.img})`
              }
            }
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
            author.length >= 5
            ?
              `作者 : ${author}`
            :
              `作者 : ${author}
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
            觀看次數 : {hassold}
            </div>
            <div className={imgs.textprice}>
            售價 : {props.note.price}
            </div>
          </span>
          {/*
          <span className={imgs.rate}>
            {props.note.rate !== -1
            ?
              <Rate disabled defaultValue={props.note.rate} allowHalf={true}/>
            :
              "此筆記還沒有評價喔~"
            }
          </span>
          */
          }
        </ButtonBase>
          <Modal title={"購買筆記"} visible={modal} okText={"購買"} cancelText="取消" width="600px" height="600px"
                onOk={handleBuy} okButtonProps={(haveBuy === "own" || haveBuy === "buy")?{disabled:true}:{disabled:false}} onCancel={handleCancel} centered={true}>
          <div className="confirm">
          <div className="confrim_photo">
              <Image.PreviewGroup>
              <Image
                width={200}
                src={ props.note.img 
                ?
                props.note.img
                :
                noteimg
                }
            />
          </Image.PreviewGroup>
          </div>
          <div className="confirm_buy">
            <p className="modal_texttitle">
            {props.note.title}
            </p>
            <div className="modal_textauthor">
            {
            author.length >= 5 
            ?
              `作者 : ${author}`
            :
              `作者 : ${author}
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
            觀看次數 : {hassold}
            </div>
            <div className="modal_textprice">
            售價 : {props.note.price}
            </div>
            {/*
            <span className="modal_rate">
              {
                isLogin !== "notLogin"
                ?
                (
                haveRate === true
                ?
                  <>
                  <div>你已經給予評價</div>
                  <Rate disabled defaultValue={props.note.rate} allowHalf={true}/>
                  </>
                :
                  <>
                  <div>你還沒有給予評價喔~</div>
                  <Rate allowHalf={true} allowClear onChange={handleRate}/>
                  </>
                )
                :
                <></>
              }
            </span>
            */
            }
            {props.note.pdffile_preview
            ?
            <div className="note-preview">
              <div>此筆記提供試閱</div>
              <Button type="primary"><a download={`${props.note.title}_preview.pdf`} href={props.note.pdffile_preview}>試閱筆記</a></Button>
            </div>
            :
            <></>
            }
            {props.note.pdffile && (haveBuy == "own" || haveBuy == "buy")
            // if the member has bought the note or he/she is the owner of the note, he/she can download the note
            ?
            <div className="download-note">
            <div>你已擁有此筆記</div>
            <Button type="primary"><a download={`${props.note.title}.pdf`} href={props.note.pdffile}>下載筆記</a></Button>
            </div>
            :
            <></>
            }
            
          </div>
            </div>
          <p className="confirm_description">
            介紹:{props.note.description}
          </p>
        </Modal>
        </>
      );
  }

  export default Note;
