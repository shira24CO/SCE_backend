import mongoose from "mongoose";

export interface Iitem{
    text:string
}

const itemSchema = new mongoose.Schema<Iitem>({
    text:{
        type:String,
        required:true
    }
})

export default mongoose.model<Iitem>("Item",itemSchema);