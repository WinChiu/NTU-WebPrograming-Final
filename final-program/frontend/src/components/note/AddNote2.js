import React, { useState } from 'react';
import { Upload,Select } from 'antd';
import ImgCrop from 'antd-img-crop';
import axios from "axios";
import "../../style/note.css";


const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
}

function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}




function AddNote ()  {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: "./images/test.jpg",
    },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', fileList)
        axios.post("http://localhost:4000/api/user-profile", formData, {
        }).then(res => {
            console.log(res)
        })
    }

  return (
    <div className = "Add-c">
      <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a person"
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        //option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        option.props.value.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0

      }
      >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="tom">Tom</Option>
    </Select>
    <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {//fileList.length < 5 && '+ Upload'
          "+ Upload"
        }
      </Upload>
    </ImgCrop>
    <div>
      {fileList.map(e=> (e))}
    </div>
    {//<button onClick={onSubmit}>提交</button>
}
    </div>

  );
};

export default AddNote;