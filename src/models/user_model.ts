import mongoose from "mongoose";

export interface IUser{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
    userImageUrl:string;
    tokens:string[];
    userYear:number,
    userCountry:string,
    userInstitution:string
}

const userSchema = new mongoose.Schema<IUser>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{ //it a unique name of the user, not necessary its email
        type:String,
        required:true
    },
    password:{
        type:String,
        required:false
    },
    userImageUrl:{
        type:String,
        default: null
    },
    
    tokens:{
        type:[String]
    },
    userYear:{
        type:Number,
        required:false,
    },
    userCountry:{
        type:String,
        required:false,
    }
});

export default mongoose.model<IUser>("User",userSchema);