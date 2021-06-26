//import axios from "../../api"
import axios from 'axios';

const url = "http://localhost:4000/note/upload"
const getitems = () => axios.get(url);
const createitem = (item) => axios.post(url,item);


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
		return data
	} catch (error) {
	console.log(error)
}
}