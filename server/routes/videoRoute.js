import express from "express";
import { uservideo, createvideo, deletevideo, getbyTag, getvideo, randomvideo, search, subscriptions, trendvideo, updatevideo } from "../controllers/videoController.js";
import { authUser } from "../middlewares/authMiddleware.js";

const videoRouter = express();

// cross origin requests
// videoRouter.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

// get user videos
videoRouter.get('/your-videos',authUser,uservideo);

// create video
videoRouter.post('/create',authUser,createvideo);
// delete video
videoRouter.delete('/delete/:id',authUser,deletevideo);

// update video
videoRouter.put('/update/:id',authUser,updatevideo);
//get a video
videoRouter.get('/get/:id',getvideo);

//random videos
videoRouter.get('/random',randomvideo);
//trending videos
videoRouter.get('/trend',trendvideo);
// subscribed videos
videoRouter.get('/subscriptions',authUser,subscriptions);
// get by tags
videoRouter.get('/tags',getbyTag);
//search 
videoRouter.get('/search',search);





export default videoRouter;