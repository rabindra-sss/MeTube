import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRouter from './routes/authRoute.js';
import videoRouter from './routes/videoRoute.js';
import commentRouter from './routes/commentRoute.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/userRoute.js';

const app = express();
app.use(cookieParser());
app.use(express.json());
dotenv.config();

//enable cross-origin requests with various options
const corsOptions = {
    // methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: 'http://localhost:3000',

    // exposedHeaders: ["set-cookie"],
    ///..other options
  };
app.use(cors(corsOptions));

const connect= ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        //console.log("connected to mongodb databse")
    })
    .catch((err)=>{
        throw(err);
        //console.log("couldn't connect to db")
    })
}

app.use('/api/auth',authRouter);
app.use('/api/video',videoRouter);
app.use('/api/comment',commentRouter);
app.use('/api/user',userRouter);

app.use((err,req,res,next)=>{
    const status= err.status || 500;
    const message= err.message|| 'something went wrong'
    //dev
    if(process.env.DEV_MODE== 'development')
    res.status(status).send({
        success: false,
        message,
    });
    //prod
})

app.listen(8800,()=>{
    connect();
    //console.log('app is connected in port 8800')
})