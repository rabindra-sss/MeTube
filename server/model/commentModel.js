import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({

    userId:{
        type: String,
        required: true,
    },
    videoId:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    likes:{
        type: [String],
        default: []
    },
    dislikes:{
        type: [String],
        default: []
    }
},{timestamps: true})

export default mongoose.model('comment', CommentSchema);