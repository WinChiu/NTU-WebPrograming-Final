import {React , useState} from "react";
import "./note.css";
import { Input, Tooltip } from 'antd';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';




function AddNote() {
  const [note,setNote] =useState({});
  // e為第17行發出load之事件
  const fileLoad = (e) => {
    setNote({
      image: e.target.result // 讀取到DataURL後，儲存在result裡面，指定為img
    });
  };

  const handleChange_add = (e) => {
    const file = e.target.files.item(0); // 取得選中檔案們的一個檔案
    const fileReader = new FileReader(); // FileReader為瀏覽器內建類別，用途為讀取瀏覽器選中的檔案
    fileReader.addEventListener("load", fileLoad);
    fileReader.readAsDataURL(file); // 讀取完檔案後，變成URL
  };
 
   const handleClick_submit = () => {
    // json base64
    // 空間較大
    // axios.post("/img", { image: img });
  };
    return (
       <>
        <div className="Add-s">
        <h1>圖片預覽與檔案上傳</h1>
        <input type="file" onChange={handleChange_add} />
        <img width="100%" src={note.image} />
        <button onClick={handleClick_submit}>上傳</button>

        <Input
        placeholder="Enter your username"
        prefix={<UserOutlined className="site-form-item-icon" />}
        suffix={
        <Tooltip title="Extra information">
          <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
        }
        />
        <br />
        <br />
        <Input prefix="￥" suffix="RMB" />
       <br />
        <br />
        <Input prefix="￥" suffix="RMB" disabled />

        </div>
        </>
    );
    
}

export default AddNote;