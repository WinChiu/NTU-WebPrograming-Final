import { Router } from 'express';
import ScoreCard from '../models/schema';
import { getItems,createItem } from './getimage.js';

const router = Router();


router.get('/',getItems)
router.post('/',createItem);



router.post('/create-note', async function (req, res) {
 try {
    const name = req.body.name;
    const subject = req.body.subject;
    const score = req.body.score;
    const card = await ScoreCard.findOne({name:name, subject:subject });
    if (card){
      console.log("exist");
      card.score = score;
      card.save();
      let msg = `Updating (${name} , ${subject} , ${score})`;
      res.json({message:msg,card:card});
      console.log("exist");
    }
    else {
      console.log("none");
      const newcard = new ScoreCard({name:name, subject:subject, score:score})
      try { await newcard.save();
      }
      catch(e){
        throw new Error ("Message DB save error : " + e);
      }
      let msg = `Adding (${name} , ${subject} , ${score})`;
      res.json({message:msg , card: newcard});
      //res.send({newcard,msg});
    }
  } 
  catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
  let all = await ScoreCard.find({});
  console.log(all)
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/clear', async function(req,res){
  try{
    await ScoreCard.remove({});
    console.log(await ScoreCard.find());
    res.json({message:["Database cleared"]})
  }
  catch(e){
    res.json({message: "There is no data in database"})
  }
});

// TODO: implement the DB query
// route.xx(xxxx)

router.get("/query", async function(req,res){
  try{
    let type = req.query.queryType;
    let string = req.query.queryString;
    /*
    console.log(name)
    if (name != undefined && subject != undefined){
      const cards = await ScoreCard.find({name:name, subject:subject });    
      res.json({card:cards,message:"haha"})
    }
    else if (name != undefined){
      const cards = await ScoreCard.find({name:name});    
      res.json({card:cards,message:"haha"})
    }
    else if (subject != undefined){
      const cards = await ScoreCard.find({subject:subject });    
      res.json({card:cards,message:"haha"})
    }*/
    //console.log(req)
    //console.log(string)
    if (type == "name" && string){
      const cards = await ScoreCard.find({name:string});  
      //console.log(cards)  
      let messages = []

      cards.map (e=>{
        let data = "";
        data += "name: " + (e.name);
        data += "  |  subject: " + (e.subject);
        data += "  |  score: " + (e.score).toString() + "\n";
        if (data.length !==0)
          messages.push(data);
      })
        if (messages.length !== 0)
          res.json({message:"Finish",messages:messages})   
        else
          res.json ({message: `${type} ${string} not found!`})
    } 
    else if (type == "subject" && string){
      const cards = await ScoreCard.find({subject:string });    
      let messages = []
        cards.map (e=>{
          let data = "";
          data += "name: " + (e.name);
          data += "  |  subject: " + (e.subject);
          data += "  |  score: " + (e.score).toString() + "\n";
          if (data.length !== 0)
            messages.push(data);
        })
        if (messages.length !== 0)
          res.json({message:"Finish",messages:messages})   
        else
          res.json ({message: `${type} ${string} not found!`})
    }   
    else{
      res.json({message: "Please input the name or subject"})     
    }
  }
  catch(e){
    res.json({message: "There is no data meet the query"})
  }
}
)

export default router;
