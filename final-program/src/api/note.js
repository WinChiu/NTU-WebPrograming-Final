//import axios from "../../api"
import axios from 'axios';

const geturl = "http://localhost:4000/note"
const uploadurl = "http://localhost:4000/note"

// const geturl = "https://ntu-webprograming-project.herokuapp.com/note";
// const uploadurl = "https://ntu-webprograming-project.herokuapp.com/note";

// const geturl = "note/";
// const uploadurl = "note/";

const getitems = () => axios.get(geturl);
const createitem = (item) => axios.post(uploadurl,item);


export const getItems = async()=>{
	try {
		const {data} = await getitems();
		return data
	}
	catch (error) {
		console.log(error)
	}
}
export const createItem = async(todo)=>{
	try {
		console.log (todo)
		const {data} = await createitem(todo);
		console.log(data)
		return data
	} catch (error) {
	console.log(error)
}
}