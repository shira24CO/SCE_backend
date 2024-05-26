import mongoose from "mongoose";


export interface IPost{
    _id:number,
    postText:string,
    owner:string,
    postImageUrl:string
}
const postSchema = new mongoose.Schema<IPost>({
    _id:{
        type:Number,
        required:true
    },
    postText:{
        type:String,
        required:true
    },
    owner:{ //user who upload post
        type:String,
        required:true
    },
    postImageUrl:{
        type:String,
        required:true
    }
    

    
})

export default mongoose.model<IPost>("Post",postSchema);