import {noteModel} from "../models/schema.js";

export const getItems = async(req,res)=>{
	console.log('get items')
	try {
		const item =await noteModel.find()
		res.status(200).json(item);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
	}

export const createItem = async(req,res)=>{
	console.log("test")
	const item = new noteModel(req.body);
	try {
		await item.save();
		res.status(201).json(item);
	} 
	catch (error) {
		console.log(error)
	}
}