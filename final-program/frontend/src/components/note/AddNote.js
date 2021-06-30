import { useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';

// api
import {addNote} from "../../api/account_note"

//css
import "../../style/note.css"

// package
import { Input, Form, Button, Select, InputNumber, Switch,Tooltip,Typography, message,  Checkbox} from 'antd';
import Item from 'antd/lib/list/Item';
const { TextArea } = Input;

/* the schema of note
const noteSchema = new Schema({
  title: { type: String, require: true },
  grade: { type: String, require: true },
  subject: { type: String, require: true },
  // 連結到會員資料
  author: { type: mongoose.Types.ObjectId, require:true},
  rate: { type: Number, require: true },
  rate_count : {type : Number, require:true},
  price: { type: Number, require: true },
  hassold: { type: Number, require: true },
  img: { type: [String] },
  description: { type: String, require: true },
  pdffile:{type:String,require:true},
  pdffile_preview:{type:String}
});
*/


function AddNote({isLogin,memberName}) {
	const [item, setItem] = useState({ title: "" ,
					   grade:"" ,
					   subject:"",
					   author: "",
					   rate: -1,
					   //rate_count: -1,
					   price: -1,
					   hassold: 0,	
					   img: "", 
					   description:"",
					   pdffile:"",
					   pdffile_preview:"",
					   });
	const [preview,setPreview] = useState (true);

	// unfortunately, the require for checkbox in antd form doesn't return a desire oucome
	// so, we need to do this
	const [checked, setChecked] = useState(false);
	
	// use for reset form
	const [form] = Form.useForm();
	
	// test for fetch all data(all notes In MongoDB )
 	//const [items, setItems] = useState([])

	// for checkbox require
	const onCheckboxChange = async (e) => {
        	await setChecked(e.target.checked);
		console.log(e.target.checked)
		form.validateFields(['筆記檔案(請上傳PDF)']);
    	};

	// for checkbox require
	const validation = (rule, value, callback) => {
	    if (checked) {
	        return Promise.resolve();
	    }
	    return Promise.reject("若已上傳檔案，請打勾已確認");
	};



	const onSubmitHandler = async (e) => {
	  //e.preventDefault();
	  const data = await addNote(memberName,item);
	  if (data.msg === "Add a note successfully"){
	 	message.success("成功上傳   可至 會員中心-我的筆記 查看")
		await setChecked(false)
		setItem({ title: "" ,
		grade:"" ,
		subject:"",
		author: "",
		rate: -1,
		//rate_count: -1,
		price: -1,
		hassold: 0,	
		img: "", 
		description:"",
		pdffile:"",
		pdffile_preview:"",
		})
	  	form.resetFields()	
	  }
	  else
		message.error("筆記名已存在")

	}
	

	/* test for fetch all note
	useEffect(() => {
	  const fetchData = async () => {
	    const result = await getItems();
	    console.log('fetch data:', result)
	    setItems(result)
	}
	fetchData()
	}, [])*/
	
	// the content style
	const style = {
	  top: '20%',
          left: "20%",
	  position: "absolute",
	  backgroundColor:"white",
	}


	const handleFinish=(e)=>{
		onSubmitHandler(e)
		console.log(e)
	}

	const handleFinishFail = (error) => {
		console.log(error)
	}

	return (

	<div className="addNote" style={style}>
	{isLogin !== "notLogin"
	?
	  <>
	  <h3> 新增你的筆記 </h3>	
	  {/*
		In order to change the style of form label, we need to use style={{ color: "red" }} in form.item 
	  */}
	  <Form
             labelCol={{
          	span: 40,
             }}
	     // the size of the inputbox
             wrapperCol={{
                span: 1800,
             }}
             layout="vertical"
             size={"large"}
	     name="basic"
	     onFinish={handleFinish}
	     onFinishFailed={handleFinishFail}
	     form={form}
       	   >
		<Form.Item name="筆記名稱"   label="筆記名稱" wrapperCol={{ span: 700}} 
		rules={[{required: true,message:"筆記名稱不可為空"}]}>
			<Input allowClear={true} maxLength={15} onChange={e => setItem({...item,title:e.target.value})}/>
	        </Form.Item>  
		<Form.Item name="年級" label="年級" wrapperCol={{ span: 400}} rules={[{required: true,message:"筆記年級不可為空"}]}>
  		       <Select placeholder={"年級"} onChange={value => setItem({ ...item, grade: value })}>
 		           <Select.Option value={"小一"}>小一</Select.Option>
 		           <Select.Option value={"小二"}>小二</Select.Option>
 		           <Select.Option value={"小三"}>小三</Select.Option>
		            <Select.Option value={"小四"}>小四</Select.Option>
 		           <Select.Option value={"小五"}>小五</Select.Option>
 		           <Select.Option value={"小六"}>小六</Select.Option>
 		           <Select.Option value={"國一"}>國一</Select.Option>
 		           <Select.Option value={"國二"}>國二</Select.Option>
 		           <Select.Option value={"國三"}>國三</Select.Option>
 		           <Select.Option value={"高一"}>高一</Select.Option>
 		           <Select.Option value={"高二"}>高二</Select.Option>
 		           <Select.Option value={"高三"}>高三</Select.Option>
 		           <Select.Option value={"其它"}>其它</Select.Option>
 		         </Select>
	          </Form.Item>
	          <Form.Item name="科目" label="科目" wrapperCol={{ span: 400}} rules={[{required: true,message:"筆記科目不可為空"}]}>
  		        <Select placeholder={"科目"} onChange={value => setItem({ ...item, subject: value })}> 
       		           <Select.Option value={"國文"}>國文</Select.Option>
		            <Select.Option value={"英文"}>英文</Select.Option>
		            <Select.Option value={"數學"}>數學</Select.Option>
		            <Select.Option value={"物理"}>物理</Select.Option>
		            <Select.Option value={"化學"}>化學</Select.Option>
		            <Select.Option value={"歷史"}>歷史</Select.Option>
		            <Select.Option value={"地理"}>地理</Select.Option>
		            <Select.Option value={"公民"}>公民</Select.Option>
		            <Select.Option value={"網路服務程式"}>網路服務程式</Select.Option>
		            <Select.Option value={"其它"}>其它</Select.Option>
	                </Select>
	          </Form.Item>
        	  <Form.Item name="售價" label="售價" wrapperCol={{ span: 400}} rules={[{required: true,message:"筆記售價不可為空且須不小於0"}]}>
          		<InputNumber min={0} onChange={value =>{ 
			  if (value < 0){
				message.error("價格應該不小於 0")		
			  }
			  else
			  	setItem({ ...item, price: value })
			  }} />
        	  </Form.Item>

		<Form.Item name="介紹一下你的筆記吧" label="介紹一下你的筆記吧" rules={[{required: true,message:"筆記介紹不可為空"}]}>
	     		<TextArea showCount placeholder={"在此描述你的筆記內容..."} 
	    			maxLength={100} onChange={e => setItem({ ...item, description: e.target.value })}
	    		/>
	        </Form.Item>
		  <Form.Item label="筆記封面照" >
	    		<FileBase64
				type="file"
	     			multiple={false}
	     			onDone={({ base64 }) => {
	     				setItem({ ...item, img:base64 })
	     			}}
	     		/>
			{
				item.img !== ""
				?
				<img  style = {{height:"300px"}}src={item.img} alt={"Fail to preview the image"}/>	
				:
				<></>
			}	     	
	           </Form.Item>       
		  <Form.Item valuePropName="checked" name="筆記檔案(請上傳PDF)" label="筆記檔案(請上傳PDF)" rules={[{ validator: validation ,message:"筆記檔案不可為空 若已上傳請打勾"}]}>
		     {
		       // In documentation of form in antd, the checkbox doesn't work. Must use Checkbox
		       // the filebase64 doesn't work with the form of antd, Hence I need to use the checkbox to require the prdffile
		     }
		     {item.pdffile !== ""

		     ?	<>  
		     	<Checkbox defaultChecked onChange={onCheckboxChange}>已上傳</Checkbox>
		     	<Tooltip title="為了確保您有上傳 PDF">
		            <Typography.Link>上傳檔案後請打勾確認已上傳</Typography.Link>
		        </Tooltip>
			</>   
		     :
			<Checkbox defaultChecked={false} disabled>未上傳</Checkbox>
		     }
		     
	        	</Form.Item>
	     		<FileBase64
				type="file"
	 		    	multiple={false}
	 		    	onDone={({ base64 }) => {
	 			    	setItem({ ...item, pdffile:base64 })
	 		    	}}
		     	/>
		     <br/>
		     <Form.Item label="是否提供試閱筆記" >
			<Switch defaultChecked 
			onChange={(checked)=>{
				if(checked)
				    setPreview(true)
				else
				    setPreview(false)
				    setItem({...item,pdffile_preview:""})
				}}/>
			<Tooltip title="為了能夠讓大家更了解的你的筆記內容
			，不妨將筆記中最精彩的幾頁另存成一個單獨的 PDF 供大家試閱喔~">
		            <Typography.Link>為甚麼要提供試閱筆記?</Typography.Link>
		        </Tooltip>   
	        </Form.Item>
		{preview === true
		?
		<Form.Item label="預覽筆記檔案(請上傳PDF)">
		     <FileBase64
				type="file"
	 		    	multiple={false}
	 		    	onDone={({ base64 }) => {
	 			    	setItem({ ...item, pdffile_preview:base64 })
	 		    	}}
		   	/>    
	        </Form.Item>
		:
		<></>
		}		
		<Form.Item >
		          <Button type="primary" htmlType="submit">提交</Button>
	        </Form.Item>   

      		</Form>

	  {/* observe note data*/}
	  {/*<pre>{JSON.stringify(item, null, '\t')}</pre>*/}
		</>
	:
	(<h4 className="addnote-notlogin">請先登入再新增筆記</h4>)
	}
	</div>
	);
}

export default AddNote;