import mongo from './mongo';
import express from 'express';
import cors from 'cors';
//import routes from './routes';
import uploadnoteRoutes from './routes/note';



// gotta load in MONGO_URL before `mongo.connect()`
require('dotenv-defaults').config();
const app = express();
app.use(cors());
//app.use(express.json());
app.use(express.json({limit: "30mb",extended:true}));
app.use(express.urlencoded({limit: "30mb",extended:true}));
app.use('/note/upload', uploadnoteRoutes)
app.get('/',(req,res)=>{
  res.send('Hello')
})


//app.use('/', routes);

mongo.connect();

const server = app.listen(process.env.PORT || 4000, function () {
  console.log('Listening on port ' + server.address().port);
});
