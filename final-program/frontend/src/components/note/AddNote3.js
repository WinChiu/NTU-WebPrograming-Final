import { useEffect, useState } from 'react';
import FileBase64 from 'react-file-base64';

// 路徑
import { createItem, getItems } from '../../api/addnote';

// antd
import { Input,Cascader } from 'antd';
const { TextArea } = Input;


/*
const noteSchema = new Schema({
  title: { type: String, require: true },
  grade: { type: String, require: true },
  subject: { type: String, require: true },
  // 連結到會員資料
  author: { type: mongoose.Types.ObjectId},
  rate: { type: Number, require: true },
  price: { type: Number, require: true },
  hassold: { type: Boolean, require: true },
  img: { type: [String] },
  description: { type: String, require: true },
});
*/

function App() {
	const [item, setItem] = useState({ title: "" ,
					   grade:"" ,
					   subject:"",
					   //author: "",
					   rate: -1,
					   price: -1,
					   hassold: 0,	
					   img: "", 
					   description:""
					   });
	const [items, setItems] = useState([])



	const options_grade = [
  	{
  	  value: '小一',
  	  label: '小一',
  	},
  	{
  	  value: '小二',
  	  label: '小二',
  	},
	{
  	  value: '小三',
  	  label: '小三',
  	},
  	{
  	  value: '小四',
  	  label: '小四',
  	},
  	{
  	  value: '小五',
  	  label: '小五',
  	},
  	{
  	  value: '小六',
  	  label: '小六',
  	},
  	{
  	  value: '國一',
  	  label: '國一',
  	},
  	{
  	  value: '國二',
  	  label: '國二',
  	},
  	{
  	  value: '國三',
  	  label: '國三',
  	},
  	{
  	  value: '高一',
  	  label: '高一',
  	},
  	{
  	  value: '高二',
  	  label: '高二',
  	},
  	{
  	  value: '高三',
  	  label: '高三',
  	},
  	{
  	  value: '其它',
  	  label: '其它',
  	},	
	];	
	const options_subject = [
  	{
  	  value: '國文',
  	  label: '國文',
  	},
  	{
  	  value: '英文',
  	  label: '英文',
  	},
	{
  	  value: '數學',
  	  label: '數學',
  	},
  	{
  	  value: '物理',
  	  label: '物理',
  	},
  	{
  	  value: '化學',
  	  label: '化學',
  	},
  	{
  	  value: '歷史',
  	  label: '歷史',
  	},
  	{
  	  value: '地理',
  	  label: '地理',
  	},
  	{
  	  value: '公民',
  	  label: '公民',
  	},
  	{
  	  value: '網路服務程式',
  	  label: '網路服務程式',
  	},
  	{
  	  value: '其它',
  	  label: '其它',
  	},
	];	


	const filter_grade = (inputValue, path) => {
 	   return path.some(option => option.label.indexOf(inputValue) > -1);
	}
	const filter_subject = (inputValue, path) => {
 	   return path.some(option => option.label.indexOf(inputValue) > -1);
	}

	const onSubmitHandler = async (e) => {
	  e.preventDefault();
	  const result = await createItem(item);
	  setItems([...items, result]);
	}
	useEffect(() => {
	  const fetchData = async () => {
	    const result = await getItems();
	    console.log('fetch data:', result)
	    setItems(result)
	}
	fetchData()
	}, [])
	const teststyle = {
	  top: '20%',
          left: "20%",
	  position: "fixed"
	}
	return (
	<div className="container" style={teststyle}>
	  <pre>{JSON.stringify(item, null, '\t')}</pre>

	  <form action="" onSubmit={onSubmitHandler}>
	    {"筆記名稱:"}
	    <input type="text" className="input-field"
	    onChange={e => setItem({ ...item, title: e.target.value })}
	    />
	    {"筆記對應年級:"}
	    <Cascader
    		options={options_grade}
	    	onChange={value => {
			 setItem({ ...item, grade: value[0]})
			 }}
    		placeholder="請選擇此筆記對應年級"
    		showSearch={{ filter_grade }}
  	    />
	    {"筆記科目:"}
	    <Cascader
    		options={options_subject}
	    	onChange={value => setItem({ ...item, subject: value[0] })}
    		//onChange={onChange_grade}
    		placeholder="請選擇此筆記科目"
    		showSearch={{ filter_subject }}
  	    />
	    {"筆記售價:"}
	    <input type="text" className="input-field"
	      onChange={e => setItem({ ...item, price: e.target.value })}
	    />
	    {"描述您的筆記內容:"}
	    <TextArea showCount placeholder={"在此描述你的筆記內容..."} 
	    	maxLength={100} onChange={e => setItem({ ...item, description: e.target.value })}
	    />
	    <FileBase64
		type="file"
	     	multiple={false}
	     	onDone={({ base64 }) => {
	     	setItem({ ...item, img:base64 })
		console.log(item)
	     	}}
	     />
	     <div className="right-align">
	        <button className="btn">submit</button>
	     </div>
	  </form>
	   {//item?.map    
	   }
	  {items?.map(item => (
	    <div className="card" key={item._id}>
	      <div className="card-image waves-effect waves-block waves-light">
		<img className="activator" style={{ width: '100%', height: 300 }} src={item.img} alt={"fail"}/>
	      </div>
	      <div className="card-content">
	      <span className="card-title activator grey-text text-darken-4">{item.title}</span>
	      </div>
	    </div>
	   ))}
	</div>
	);
}

export default App;